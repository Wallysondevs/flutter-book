import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Navigator2() {
  return (
    <PageContainer
      title="Navigator 2.0"
      subtitle="A API declarativa de navegação — você descreve a pilha de telas como dado."
      difficulty="avancado"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Navigator 1.0 (push/pop) tem limites: não dá para voltar de uma tela específica via URL no navegador, abrir o app pelo deep link já em uma tela profunda, ou sincronizar a navegação com algum estado global. O Flutter resolveu isso introduzindo o <strong>Navigator 2.0</strong> — uma API <em>declarativa</em>.
      </p>
      <p>
        Mesmo que você acabe usando <code>go_router</code> (e provavelmente vai), entender Navigator 2.0 é importante porque <em>go_router é construído em cima dele</em>. Saber o conceito ajuda a debugar quando algo dá errado.
      </p>

      <h2>O conceito</h2>
      <p>
        Em Navigator 1.0 você dá comandos: "empilhe esta tela", "remova aquela". É <strong>imperativo</strong>.
      </p>
      <p>
        Em Navigator 2.0 você descreve <em>como deve ser a pilha agora</em>, baseada em algum estado. É <strong>declarativo</strong> — igual ao próprio Flutter para UI: você não move pixels, descreve a árvore de widgets.
      </p>
      <p>
        Analogia: em vez de dizer ao garçom "traga uma cerveja, depois leve esse copo, depois traga outra cerveja", você mostra uma foto da mesa como deve ficar: "duas cervejas e nenhum copo vazio". O garçom calcula a diferença.
      </p>

      <h2>Como Flutter faz</h2>
      <p>
        Você fornece ao widget <code>Navigator</code> uma <strong>lista de Pages</strong> (geralmente <code>MaterialPage</code>) que reflete o estado atual. O Flutter compara com a lista anterior e anima entradas/saídas.
      </p>

      <CodeBlock title="estrutura mínima" code={`Navigator(
  // Lista declarativa de telas. Mude o estado e a lista
  // muda — o Navigator anima a transição.
  pages: [
    const MaterialPage(
      key: ValueKey('home'),
      child: HomePage(),
    ),
    if (idSelecionado != null)
      MaterialPage(
        key: ValueKey('detalhe-\$idSelecionado'),
        child: DetalhePage(id: idSelecionado!),
      ),
  ],

  // Chamado quando o usuário aperta voltar (Android)
  // ou faz swipe (iOS). Você decide o que fazer.
  onPopPage: (route, result) {
    if (!route.didPop(result)) return false;
    setState(() => idSelecionado = null);
    return true;
  },
)`} />

      <p>
        Note: a navegação agora é <strong>função do estado</strong>. Mudou <code>idSelecionado</code> de <code>null</code> para <code>42</code>? Aparece a tela de detalhe. Voltou para <code>null</code>? Some.
      </p>

      <h2>Exemplo prático: app declarativo simples</h2>
      <p>
        Um app com lista e detalhe, sem usar <code>go_router</code>:
      </p>

      <CodeBlock title="lib/main.dart" code={`import 'package:flutter/material.dart';

void main() => runApp(const MeuApp());

class MeuApp extends StatefulWidget {
  const MeuApp({super.key});
  @override
  State<MeuApp> createState() => _MeuAppState();
}

class _MeuAppState extends State<MeuApp> {
  int? produtoSelecionado;

  void selecionar(int id) {
    setState(() => produtoSelecionado = id);
  }

  void fecharDetalhe() {
    setState(() => produtoSelecionado = null);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Navigator(
        pages: [
          // Sempre mostra a lista no fundo.
          MaterialPage(
            key: const ValueKey('lista'),
            child: ListaPage(onSelecionar: selecionar),
          ),
          // Empilha o detalhe quando há produto.
          if (produtoSelecionado != null)
            MaterialPage(
              key: ValueKey('detalhe-\$produtoSelecionado'),
              child: DetalhePage(id: produtoSelecionado!),
            ),
        ],
        onPopPage: (route, result) {
          if (!route.didPop(result)) return false;
          fecharDetalhe();
          return true;
        },
      ),
    );
  }
}`} />

      <p>
        Resultado: o usuário toca em um produto → <code>selecionar</code> atualiza o estado → o Navigator percebe que a lista de pages mudou → empilha o detalhe com animação. Aperta voltar → <code>onPopPage</code> dispara → setState para null → some.
      </p>

      <AlertBox type="info" title="A chave (key) importa">
        O <code>ValueKey</code> em cada page diz ao Navigator "esta page tem identidade X". Sem ela, mudar parâmetros (ex: id 42 → 43) faria o Flutter recriar tudo em vez de apenas atualizar.
      </AlertBox>

      <h2>RouterDelegate e RouteInformationParser</h2>
      <p>
        Para suportar URLs do navegador e deep links, Navigator 2.0 introduz duas classes que você implementa:
      </p>
      <ul>
        <li><strong>RouterDelegate</strong> — guarda o estado da navegação e constrói o widget Navigator.</li>
        <li><strong>RouteInformationParser</strong> — converte uma URL (ex: <code>/produto/42</code>) em um objeto de estado.</li>
      </ul>
      <p>
        Você plugga ambos no <code>MaterialApp.router</code>:
      </p>

      <CodeBlock title="MaterialApp.router" code={`MaterialApp.router(
  routerDelegate: meuDelegate,
  routeInformationParser: meuParser,
)`} />

      <p>
        Implementar isso à mão dá fácil <strong>200 linhas</strong> de boilerplate por app. É por isso que existe <code>go_router</code>.
      </p>

      <AlertBox type="warning" title="Verboso ao extremo">
        Implementar Navigator 2.0 cru é difícil até para devs experientes. Erros comuns: esquecer de notificar listeners, recriar pages sem key estável, loops infinitos. Use <code>go_router</code> a menos que tenha razão muito forte para não usar.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Pages sem key:</strong> sem <code>ValueKey</code>, o Flutter pode recriar widgets desnecessariamente, perdendo estado e animação.</li>
        <li><strong>Esquecer <code>onPopPage</code>:</strong> sem ele, voltar não funciona — a tela fica empilhada para sempre.</li>
        <li><strong>Mutação dentro do <code>build</code>:</strong> alterar o estado de navegação durante o build causa loop infinito.</li>
        <li><strong>Não chamar <code>didPop</code>:</strong> retornar <code>true</code> em <code>onPopPage</code> sem chamar <code>route.didPop(result)</code> deixa o resultado da page perdido.</li>
        <li><strong>Tentar misturar com push imperativo:</strong> dá para fazer, mas vira confusão. Escolha um modelo por app.</li>
      </ul>

      <AlertBox type="danger" title="Não comece um projeto novo com Navigator 2.0 cru">
        A menos que você esteja escrevendo um framework de roteamento (caso de <code>go_router</code> ou <code>auto_route</code>), use uma biblioteca pronta. O custo de manutenção do Navigator 2.0 cru é altíssimo.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use <code>go_router</code>. Sério.</li>
          <li>Se for usar Navigator 2.0 direto, isole o RouterDelegate em um arquivo próprio com testes unitários.</li>
          <li>Sempre use <code>ValueKey</code> ou <code>ObjectKey</code> em cada <code>MaterialPage</code>.</li>
          <li>Modele o estado de navegação como classe imutável (com <code>copyWith</code>) — fica fácil de testar.</li>
          <li>Lembre que o estado de navegação é parte do estado do app: pode persistir, sincronizar, etc.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Agora que você entende a base declarativa, o capítulo de <strong>go_router</strong> mostra como ter todo esse poder com 10x menos código. Para gerenciamento de estado, veja <strong>Provider</strong>, <strong>Riverpod</strong> ou <strong>BLoC</strong>.
      </p>

      <AlertBox type="success" title="Vale entender, não vale implementar">
        Entender Navigator 2.0 te ajuda a debugar problemas de roteamento. Mas escrever um do zero raramente vale a pena — confie nos pacotes da comunidade.
      </AlertBox>
    </PageContainer>
  );
}
