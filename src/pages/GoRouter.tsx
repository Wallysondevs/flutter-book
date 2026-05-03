import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function GoRouter() {
  return (
    <PageContainer
      title="go_router"
      subtitle="O pacote oficial recomendado para navegação declarativa, deep links e suporte web."
      difficulty="intermediario"
      timeToRead="15 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Mesmo apps móveis hoje recebem deep links: notificações que abrem uma tela específica, links compartilhados (<code>meuapp://produto/42</code>), redirecionamentos após login. E se seu app roda na web, cada tela precisa de uma URL real (<code>/produto/42</code>) que funciona com botão voltar do navegador.
      </p>
      <p>
        Resolver isso com Navigator 1.0 é frágil. Com Navigator 2.0 cru é infernal. Por isso o time Flutter mantém o <strong>go_router</strong> — pacote oficial que cobre tudo isso com sintaxe legível.
      </p>

      <h2>O conceito</h2>
      <p>
        Você descreve as <em>rotas</em> do app como uma árvore: caminho (URL) → widget. O <code>go_router</code> traduz isso em um router declarativo, gerencia a pilha e expõe métodos simples (<code>context.go</code>, <code>context.push</code>, <code>context.pop</code>).
      </p>
      <p>
        Pense como o sistema de rotas de um framework web (Express, Next.js, Vue Router): você lista <em>"se a URL for X, mostre o widget Y"</em>.
      </p>

      <h2>Setup</h2>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  flutter:
    sdk: flutter
  go_router: ^14.0.0`} />

      <p>
        Rode <code>flutter pub get</code> e importe onde for usar:
      </p>

      <CodeBlock title="import" code={`import 'package:go_router/go_router.dart';`} />

      <h2>Como Flutter faz com go_router</h2>
      <p>
        Defina o router fora do <code>MaterialApp</code> e passe via <code>MaterialApp.router</code>:
      </p>

      <CodeBlock title="lib/main.dart" code={`import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final _router = GoRouter(
  initialLocation: '/',
  routes: [
    // Rota raiz: home.
    GoRoute(
      path: '/',
      builder: (ctx, state) => const HomePage(),
    ),

    // Rota com parâmetro de caminho.
    GoRoute(
      path: '/usuario/:id',
      builder: (ctx, state) {
        // pathParameters é Map<String, String>.
        final id = state.pathParameters['id']!;
        return UsuarioPage(id: id);
      },
    ),

    // Rota com sub-rota aninhada.
    GoRoute(
      path: '/sobre',
      builder: (ctx, state) => const SobrePage(),
      routes: [
        GoRoute(
          path: 'time', // vira /sobre/time
          builder: (ctx, state) => const TimePage(),
        ),
      ],
    ),
  ],
);

void main() => runApp(const MeuApp());

class MeuApp extends StatelessWidget {
  const MeuApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
    );
  }
}`} />

      <h2>Navegando entre telas</h2>
      <p>
        Em qualquer widget, use os métodos de extensão no <code>BuildContext</code>:
      </p>

      <CodeBlock title="navegação" code={`// Substitui a tela atual (URL muda, sem empilhar).
context.go('/usuario/42');

// Empilha por cima (URL muda e dá pra voltar).
context.push('/sobre');

// Volta uma tela.
context.pop();

// Passar query parameters.
context.go('/usuario/42?aba=fotos');

// Ler query parameters dentro da página:
// state.uri.queryParameters['aba']`} />

      <h2>Exemplo prático: app com bottom nav persistente</h2>
      <p>
        Um padrão muito comum: três abas inferiores (Home, Buscar, Perfil) que ficam visíveis enquanto você navega dentro de cada uma. Para isso existe o <code>StatefulShellRoute</code>:
      </p>

      <CodeBlock title="StatefulShellRoute" code={`final _router = GoRouter(
  initialLocation: '/home',
  routes: [
    StatefulShellRoute.indexedStack(
      // Constrói o "casco" com a bottom navigation.
      builder: (ctx, state, navigationShell) {
        return Scaffold(
          body: navigationShell,
          bottomNavigationBar: NavigationBar(
            selectedIndex: navigationShell.currentIndex,
            onDestinationSelected: (i) =>
                navigationShell.goBranch(i),
            destinations: const [
              NavigationDestination(
                icon: Icon(Icons.home),
                label: 'Home',
              ),
              NavigationDestination(
                icon: Icon(Icons.search),
                label: 'Buscar',
              ),
              NavigationDestination(
                icon: Icon(Icons.person),
                label: 'Perfil',
              ),
            ],
          ),
        );
      },
      branches: [
        StatefulShellBranch(routes: [
          GoRoute(
            path: '/home',
            builder: (c, s) => const HomePage(),
          ),
        ]),
        StatefulShellBranch(routes: [
          GoRoute(
            path: '/buscar',
            builder: (c, s) => const BuscarPage(),
          ),
        ]),
        StatefulShellBranch(routes: [
          GoRoute(
            path: '/perfil',
            builder: (c, s) => const PerfilPage(),
          ),
        ]),
      ],
    ),
  ],
);`} />

      <p>
        Cada aba mantém sua pilha de navegação independente. Se o usuário navegar 3 telas dentro de "Buscar" e trocar para "Perfil", ao voltar para "Buscar" ele continua na 3ª tela.
      </p>

      <h2>Redirect (proteção de rotas)</h2>
      <p>
        Para forçar login antes de acessar telas privadas, use <code>redirect</code>:
      </p>

      <CodeBlock title="redirect de auth" code={`final _router = GoRouter(
  redirect: (ctx, state) {
    final logado = AuthService.instance.estaLogado;
    final indoParaLogin = state.matchedLocation == '/login';

    // Não logado e não vai para login → manda pra login.
    if (!logado && !indoParaLogin) return '/login';

    // Logado e tentando ir pra login → manda pra home.
    if (logado && indoParaLogin) return '/';

    // Tudo ok, segue.
    return null;
  },
  routes: [/* ... */],
);`} />

      <AlertBox type="success" title="Por que escolher go_router">
        Deep links automáticos no Android e iOS, URLs reais na web, redirect declarativo, ShellRoute para layouts persistentes, animações customizáveis, suporte oficial do time Flutter. É praticamente o padrão da comunidade hoje.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>go vs push:</strong> <code>go</code> substitui a pilha (URL pula direto), <code>push</code> empilha (botão voltar funciona). Confundir os dois quebra a navegação.</li>
        <li><strong>Esquecer <code>!</code> em pathParameters:</strong> <code>state.pathParameters['id']</code> retorna <code>String?</code>. Como você sabe que existe (é parte da rota), use <code>!</code> ou trate o nulo.</li>
        <li><strong>Definir o router dentro do build:</strong> recria o router a cada rebuild, perdendo histórico. Defina como variável global ou via DI.</li>
        <li><strong>Misturar Navigator.push do Material:</strong> ainda funciona, mas a URL não atualiza na web e o redirect do go_router não roda.</li>
        <li><strong>Redirect em loop:</strong> esquecer a checagem <code>indoParaLogin</code> faz <code>/login</code> redirecionar para <code>/login</code> infinitamente.</li>
      </ul>

      <AlertBox type="warning" title="Atualizações de versão">
        A API do go_router mudou bastante entre as versões 5, 6 e 14. Sempre cheque a documentação correspondente à versão que você instalou. Tutoriais antigos podem usar APIs depreciadas (<code>GoRouter.of(context).goNamed</code> mudou para <code>context.goNamed</code>, etc.).
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use <strong>rotas nomeadas</strong> (<code>name: 'usuario'</code>) e <code>{`context.goNamed('usuario', pathParameters: {'id': '42'})`}</code>: refatorar URL não quebra os links.</li>
          <li>Centralize as constantes de rota em <code>lib/router/routes.dart</code>.</li>
          <li>Combine <code>redirect</code> com seu state management (Provider/Riverpod) para reagir a login/logout em tempo real (<code>refreshListenable</code>).</li>
          <li>Para deep links, configure <code>android/app/src/main/AndroidManifest.xml</code> e <code>ios/Runner/Info.plist</code> com os intent filters / URL schemes corretos.</li>
          <li>Teste a navegação com <code>WidgetTester</code> chamando <code>tester.tap</code> e verificando rotas.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com navegação resolvida, o próximo grande tema é <strong>gerenciamento de estado</strong>. Veja <strong>setState</strong> (local), <strong>Provider</strong> (simples e oficial), <strong>Riverpod</strong> (mais moderno) e <strong>BLoC</strong> (apps grandes).
      </p>
    </PageContainer>
  );
}
