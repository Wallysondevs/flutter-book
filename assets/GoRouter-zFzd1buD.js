import{j as e}from"./index-D9yRYXwO.js";import{P as r,C as o,A as a}from"./AlertBox-B2Rl5ETq.js";function s(){return e.jsxs(r,{title:"go_router",subtitle:"O pacote oficial recomendado para navegação declarativa, deep links e suporte web.",difficulty:"intermediario",timeToRead:"15 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Mesmo apps móveis hoje recebem deep links: notificações que abrem uma tela específica, links compartilhados (",e.jsx("code",{children:"meuapp://produto/42"}),"), redirecionamentos após login. E se seu app roda na web, cada tela precisa de uma URL real (",e.jsx("code",{children:"/produto/42"}),") que funciona com botão voltar do navegador."]}),e.jsxs("p",{children:["Resolver isso com Navigator 1.0 é frágil. Com Navigator 2.0 cru é infernal. Por isso o time Flutter mantém o ",e.jsx("strong",{children:"go_router"})," — pacote oficial que cobre tudo isso com sintaxe legível."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Você descreve as ",e.jsx("em",{children:"rotas"})," do app como uma árvore: caminho (URL) → widget. O ",e.jsx("code",{children:"go_router"})," traduz isso em um router declarativo, gerencia a pilha e expõe métodos simples (",e.jsx("code",{children:"context.go"}),", ",e.jsx("code",{children:"context.push"}),", ",e.jsx("code",{children:"context.pop"}),")."]}),e.jsxs("p",{children:["Pense como o sistema de rotas de um framework web (Express, Next.js, Vue Router): você lista ",e.jsx("em",{children:'"se a URL for X, mostre o widget Y"'}),"."]}),e.jsx("h2",{children:"Setup"}),e.jsx(o,{title:"pubspec.yaml",code:`dependencies:
  flutter:
    sdk: flutter
  go_router: ^14.0.0`}),e.jsxs("p",{children:["Rode ",e.jsx("code",{children:"flutter pub get"})," e importe onde for usar:"]}),e.jsx(o,{title:"import",code:"import 'package:go_router/go_router.dart';"}),e.jsx("h2",{children:"Como Flutter faz com go_router"}),e.jsxs("p",{children:["Defina o router fora do ",e.jsx("code",{children:"MaterialApp"})," e passe via ",e.jsx("code",{children:"MaterialApp.router"}),":"]}),e.jsx(o,{title:"lib/main.dart",code:`import 'package:flutter/material.dart';
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
}`}),e.jsx("h2",{children:"Navegando entre telas"}),e.jsxs("p",{children:["Em qualquer widget, use os métodos de extensão no ",e.jsx("code",{children:"BuildContext"}),":"]}),e.jsx(o,{title:"navegação",code:`// Substitui a tela atual (URL muda, sem empilhar).
context.go('/usuario/42');

// Empilha por cima (URL muda e dá pra voltar).
context.push('/sobre');

// Volta uma tela.
context.pop();

// Passar query parameters.
context.go('/usuario/42?aba=fotos');

// Ler query parameters dentro da página:
// state.uri.queryParameters['aba']`}),e.jsx("h2",{children:"Exemplo prático: app com bottom nav persistente"}),e.jsxs("p",{children:["Um padrão muito comum: três abas inferiores (Home, Buscar, Perfil) que ficam visíveis enquanto você navega dentro de cada uma. Para isso existe o ",e.jsx("code",{children:"StatefulShellRoute"}),":"]}),e.jsx(o,{title:"StatefulShellRoute",code:`final _router = GoRouter(
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
);`}),e.jsx("p",{children:'Cada aba mantém sua pilha de navegação independente. Se o usuário navegar 3 telas dentro de "Buscar" e trocar para "Perfil", ao voltar para "Buscar" ele continua na 3ª tela.'}),e.jsx("h2",{children:"Redirect (proteção de rotas)"}),e.jsxs("p",{children:["Para forçar login antes de acessar telas privadas, use ",e.jsx("code",{children:"redirect"}),":"]}),e.jsx(o,{title:"redirect de auth",code:`final _router = GoRouter(
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
);`}),e.jsx(a,{type:"success",title:"Por que escolher go_router",children:"Deep links automáticos no Android e iOS, URLs reais na web, redirect declarativo, ShellRoute para layouts persistentes, animações customizáveis, suporte oficial do time Flutter. É praticamente o padrão da comunidade hoje."}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"go vs push:"})," ",e.jsx("code",{children:"go"})," substitui a pilha (URL pula direto), ",e.jsx("code",{children:"push"})," empilha (botão voltar funciona). Confundir os dois quebra a navegação."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"!"})," em pathParameters:"]})," ",e.jsx("code",{children:"state.pathParameters['id']"})," retorna ",e.jsx("code",{children:"String?"}),". Como você sabe que existe (é parte da rota), use ",e.jsx("code",{children:"!"})," ou trate o nulo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Definir o router dentro do build:"})," recria o router a cada rebuild, perdendo histórico. Defina como variável global ou via DI."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Misturar Navigator.push do Material:"})," ainda funciona, mas a URL não atualiza na web e o redirect do go_router não roda."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Redirect em loop:"})," esquecer a checagem ",e.jsx("code",{children:"indoParaLogin"})," faz ",e.jsx("code",{children:"/login"})," redirecionar para ",e.jsx("code",{children:"/login"})," infinitamente."]})]}),e.jsxs(a,{type:"warning",title:"Atualizações de versão",children:["A API do go_router mudou bastante entre as versões 5, 6 e 14. Sempre cheque a documentação correspondente à versão que você instalou. Tutoriais antigos podem usar APIs depreciadas (",e.jsx("code",{children:"GoRouter.of(context).goNamed"})," mudou para ",e.jsx("code",{children:"context.goNamed"}),", etc.)."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(a,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("strong",{children:"rotas nomeadas"})," (",e.jsx("code",{children:"name: 'usuario'"}),") e ",e.jsx("code",{children:"context.goNamed('usuario', pathParameters: {'id': '42'})"}),": refatorar URL não quebra os links."]}),e.jsxs("li",{children:["Centralize as constantes de rota em ",e.jsx("code",{children:"lib/router/routes.dart"}),"."]}),e.jsxs("li",{children:["Combine ",e.jsx("code",{children:"redirect"})," com seu state management (Provider/Riverpod) para reagir a login/logout em tempo real (",e.jsx("code",{children:"refreshListenable"}),")."]}),e.jsxs("li",{children:["Para deep links, configure ",e.jsx("code",{children:"android/app/src/main/AndroidManifest.xml"})," e ",e.jsx("code",{children:"ios/Runner/Info.plist"})," com os intent filters / URL schemes corretos."]}),e.jsxs("li",{children:["Teste a navegação com ",e.jsx("code",{children:"WidgetTester"})," chamando ",e.jsx("code",{children:"tester.tap"})," e verificando rotas."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com navegação resolvida, o próximo grande tema é ",e.jsx("strong",{children:"gerenciamento de estado"}),". Veja ",e.jsx("strong",{children:"setState"})," (local), ",e.jsx("strong",{children:"Provider"})," (simples e oficial), ",e.jsx("strong",{children:"Riverpod"})," (mais moderno) e ",e.jsx("strong",{children:"BLoC"})," (apps grandes)."]})]})}export{s as default};
