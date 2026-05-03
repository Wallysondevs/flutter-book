import{j as e}from"./index-D9yRYXwO.js";import{P as r,C as o,A as a}from"./AlertBox-B2Rl5ETq.js";function s(){return e.jsxs(r,{title:"Navigator 2.0",subtitle:"A API declarativa de navegação — você descreve a pilha de telas como dado.",difficulty:"avancado",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Navigator 1.0 (push/pop) tem limites: não dá para voltar de uma tela específica via URL no navegador, abrir o app pelo deep link já em uma tela profunda, ou sincronizar a navegação com algum estado global. O Flutter resolveu isso introduzindo o ",e.jsx("strong",{children:"Navigator 2.0"})," — uma API ",e.jsx("em",{children:"declarativa"}),"."]}),e.jsxs("p",{children:["Mesmo que você acabe usando ",e.jsx("code",{children:"go_router"})," (e provavelmente vai), entender Navigator 2.0 é importante porque ",e.jsx("em",{children:"go_router é construído em cima dele"}),". Saber o conceito ajuda a debugar quando algo dá errado."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:['Em Navigator 1.0 você dá comandos: "empilhe esta tela", "remova aquela". É ',e.jsx("strong",{children:"imperativo"}),"."]}),e.jsxs("p",{children:["Em Navigator 2.0 você descreve ",e.jsx("em",{children:"como deve ser a pilha agora"}),", baseada em algum estado. É ",e.jsx("strong",{children:"declarativo"})," — igual ao próprio Flutter para UI: você não move pixels, descreve a árvore de widgets."]}),e.jsx("p",{children:'Analogia: em vez de dizer ao garçom "traga uma cerveja, depois leve esse copo, depois traga outra cerveja", você mostra uma foto da mesa como deve ficar: "duas cervejas e nenhum copo vazio". O garçom calcula a diferença.'}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsxs("p",{children:["Você fornece ao widget ",e.jsx("code",{children:"Navigator"})," uma ",e.jsx("strong",{children:"lista de Pages"})," (geralmente ",e.jsx("code",{children:"MaterialPage"}),") que reflete o estado atual. O Flutter compara com a lista anterior e anima entradas/saídas."]}),e.jsx(o,{title:"estrutura mínima",code:`Navigator(
  // Lista declarativa de telas. Mude o estado e a lista
  // muda — o Navigator anima a transição.
  pages: [
    const MaterialPage(
      key: ValueKey('home'),
      child: HomePage(),
    ),
    if (idSelecionado != null)
      MaterialPage(
        key: ValueKey('detalhe-$idSelecionado'),
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
)`}),e.jsxs("p",{children:["Note: a navegação agora é ",e.jsx("strong",{children:"função do estado"}),". Mudou ",e.jsx("code",{children:"idSelecionado"})," de ",e.jsx("code",{children:"null"})," para ",e.jsx("code",{children:"42"}),"? Aparece a tela de detalhe. Voltou para ",e.jsx("code",{children:"null"}),"? Some."]}),e.jsx("h2",{children:"Exemplo prático: app declarativo simples"}),e.jsxs("p",{children:["Um app com lista e detalhe, sem usar ",e.jsx("code",{children:"go_router"}),":"]}),e.jsx(o,{title:"lib/main.dart",code:`import 'package:flutter/material.dart';

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
              key: ValueKey('detalhe-$produtoSelecionado'),
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
}`}),e.jsxs("p",{children:["Resultado: o usuário toca em um produto → ",e.jsx("code",{children:"selecionar"})," atualiza o estado → o Navigator percebe que a lista de pages mudou → empilha o detalhe com animação. Aperta voltar → ",e.jsx("code",{children:"onPopPage"})," dispara → setState para null → some."]}),e.jsxs(a,{type:"info",title:"A chave (key) importa",children:["O ",e.jsx("code",{children:"ValueKey"}),' em cada page diz ao Navigator "esta page tem identidade X". Sem ela, mudar parâmetros (ex: id 42 → 43) faria o Flutter recriar tudo em vez de apenas atualizar.']}),e.jsx("h2",{children:"RouterDelegate e RouteInformationParser"}),e.jsx("p",{children:"Para suportar URLs do navegador e deep links, Navigator 2.0 introduz duas classes que você implementa:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"RouterDelegate"})," — guarda o estado da navegação e constrói o widget Navigator."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"RouteInformationParser"})," — converte uma URL (ex: ",e.jsx("code",{children:"/produto/42"}),") em um objeto de estado."]})]}),e.jsxs("p",{children:["Você plugga ambos no ",e.jsx("code",{children:"MaterialApp.router"}),":"]}),e.jsx(o,{title:"MaterialApp.router",code:`MaterialApp.router(
  routerDelegate: meuDelegate,
  routeInformationParser: meuParser,
)`}),e.jsxs("p",{children:["Implementar isso à mão dá fácil ",e.jsx("strong",{children:"200 linhas"})," de boilerplate por app. É por isso que existe ",e.jsx("code",{children:"go_router"}),"."]}),e.jsxs(a,{type:"warning",title:"Verboso ao extremo",children:["Implementar Navigator 2.0 cru é difícil até para devs experientes. Erros comuns: esquecer de notificar listeners, recriar pages sem key estável, loops infinitos. Use ",e.jsx("code",{children:"go_router"})," a menos que tenha razão muito forte para não usar."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Pages sem key:"})," sem ",e.jsx("code",{children:"ValueKey"}),", o Flutter pode recriar widgets desnecessariamente, perdendo estado e animação."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"onPopPage"}),":"]})," sem ele, voltar não funciona — a tela fica empilhada para sempre."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Mutação dentro do ",e.jsx("code",{children:"build"}),":"]})," alterar o estado de navegação durante o build causa loop infinito."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Não chamar ",e.jsx("code",{children:"didPop"}),":"]})," retornar ",e.jsx("code",{children:"true"})," em ",e.jsx("code",{children:"onPopPage"})," sem chamar ",e.jsx("code",{children:"route.didPop(result)"})," deixa o resultado da page perdido."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tentar misturar com push imperativo:"})," dá para fazer, mas vira confusão. Escolha um modelo por app."]})]}),e.jsxs(a,{type:"danger",title:"Não comece um projeto novo com Navigator 2.0 cru",children:["A menos que você esteja escrevendo um framework de roteamento (caso de ",e.jsx("code",{children:"go_router"})," ou ",e.jsx("code",{children:"auto_route"}),"), use uma biblioteca pronta. O custo de manutenção do Navigator 2.0 cru é altíssimo."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(a,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"go_router"}),". Sério."]}),e.jsx("li",{children:"Se for usar Navigator 2.0 direto, isole o RouterDelegate em um arquivo próprio com testes unitários."}),e.jsxs("li",{children:["Sempre use ",e.jsx("code",{children:"ValueKey"})," ou ",e.jsx("code",{children:"ObjectKey"})," em cada ",e.jsx("code",{children:"MaterialPage"}),"."]}),e.jsxs("li",{children:["Modele o estado de navegação como classe imutável (com ",e.jsx("code",{children:"copyWith"}),") — fica fácil de testar."]}),e.jsx("li",{children:"Lembre que o estado de navegação é parte do estado do app: pode persistir, sincronizar, etc."})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Agora que você entende a base declarativa, o capítulo de ",e.jsx("strong",{children:"go_router"})," mostra como ter todo esse poder com 10x menos código. Para gerenciamento de estado, veja ",e.jsx("strong",{children:"Provider"}),", ",e.jsx("strong",{children:"Riverpod"})," ou ",e.jsx("strong",{children:"BLoC"}),"."]}),e.jsx(a,{type:"success",title:"Vale entender, não vale implementar",children:"Entender Navigator 2.0 te ajuda a debugar problemas de roteamento. Mas escrever um do zero raramente vale a pena — confie nos pacotes da comunidade."})]})}export{s as default};
