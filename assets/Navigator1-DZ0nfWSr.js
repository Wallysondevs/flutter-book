import{j as e}from"./index-D9yRYXwO.js";import{P as t,C as o,A as a}from"./AlertBox-B2Rl5ETq.js";function s(){return e.jsxs(t,{title:"Navigator 1.0",subtitle:"A API imperativa de navegação — empilhe e desempilhe telas com push e pop.",difficulty:"iniciante",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['Quase todo app tem mais de uma tela: lista → detalhe, login → home, formulário → confirmação. Você precisa de uma forma de "ir para outra tela" e "voltar". No Flutter, isso é trabalho do ',e.jsx("strong",{children:"Navigator"}),"."]}),e.jsxs("p",{children:["Navigator 1.0 é a API mais antiga e simples. É o suficiente para apps pequenos e médios, e ainda é a base sobre a qual ",e.jsx("code",{children:"go_router"})," e Navigator 2.0 funcionam."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Pense no Navigator como uma ",e.jsx("em",{children:"pilha de cartas"}),": cada tela é uma carta. Você empilha (",e.jsx("code",{children:"push"}),") uma nova carta no topo e a vê. Para voltar, tira a carta do topo (",e.jsx("code",{children:"pop"}),") e revê a anterior."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"push"})," — adiciona uma tela no topo (anima entrando da direita)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"pop"})," — remove a tela do topo (anima saindo). O botão de voltar do Android e o gesto do iOS chamam pop automaticamente."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"pushReplacement"})," — substitui a tela atual (ex: login → home, sem deixar voltar para login)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"pushAndRemoveUntil"})," — empilha e limpa o histórico (logout total)."]})]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsxs("p",{children:["A forma básica usa ",e.jsx("code",{children:"MaterialPageRoute"}),", que cria a animação de slide automática:"]}),e.jsx(o,{title:"navegação básica",code:`// Ir para uma nova tela.
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (ctx) => const DetalhesPage(),
  ),
);

// Voltar para a tela anterior.
Navigator.pop(context);

// Voltar passando um valor (ex: item escolhido).
Navigator.pop(context, 'pizza');`}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"builder"})," recebe um ",e.jsx("code",{children:"BuildContext"})," e retorna a nova tela. O Flutter cuida da animação, do botão de voltar e do gesto de swipe no iOS."]}),e.jsx("h2",{children:"Exemplo prático: lista → detalhe → resultado"}),e.jsx("p",{children:'Cenário comum: o usuário escolhe um item de uma lista, vai para uma tela de detalhe e a tela retorna um valor (ex: "marcado como favorito").'}),e.jsx(o,{title:"lib/lista_page.dart",code:`import 'package:flutter/material.dart';

class ListaPage extends StatefulWidget {
  const ListaPage({super.key});

  @override
  State<ListaPage> createState() => _ListaPageState();
}

class _ListaPageState extends State<ListaPage> {
  String? mensagem;

  Future<void> abrirDetalhe(String produto) async {
    // push retorna um Future com o valor passado em pop.
    final resultado = await Navigator.push<bool>(
      context,
      MaterialPageRoute(
        builder: (ctx) => DetalhePage(produto: produto),
      ),
    );

    // Quando a tela de detalhe der pop, caímos aqui.
    if (resultado == true) {
      setState(() => mensagem = '$produto favoritado!');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Produtos')),
      body: Column(
        children: [
          if (mensagem != null)
            Padding(
              padding: const EdgeInsets.all(16),
              child: Text(mensagem!),
            ),
          Expanded(
            child: ListView(
              children: [
                for (final p in const ['Camisa', 'Tênis', 'Boné'])
                  ListTile(
                    title: Text(p),
                    onTap: () => abrirDetalhe(p),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class DetalhePage extends StatelessWidget {
  final String produto;
  const DetalhePage({super.key, required this.produto});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(produto)),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.pop(context, true),
          child: const Text('Favoritar e voltar'),
        ),
      ),
    );
  }
}`}),e.jsxs("p",{children:["Repare no ",e.jsx("strong",{children:"tipo genérico"})," em ",e.jsx("code",{children:"Navigator.push<bool>"}),": ele garante que o ",e.jsx("code",{children:"resultado"})," seja ",e.jsx("code",{children:"bool?"}),". Se o usuário só apertar voltar (sem clicar no botão), o resultado vem ",e.jsx("code",{children:"null"}),"."]}),e.jsx("h2",{children:"Rotas nomeadas (alternativa)"}),e.jsx("p",{children:"Em vez de passar a classe da tela em todo push, você pode registrar nomes:"}),e.jsx(o,{title:"rotas nomeadas",code:`MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (ctx) => const HomePage(),
    '/perfil': (ctx) => const PerfilPage(),
    '/sobre': (ctx) => const SobrePage(),
  },
);

// Para navegar:
Navigator.pushNamed(context, '/perfil');`}),e.jsxs(a,{type:"info",title:"Rotas nomeadas têm limite",children:["Funcionam bem para apps simples, mas não suportam parâmetros tipados nem deep links com facilidade. Para isso, prefira ",e.jsx("code",{children:"go_router"}),"."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"await"}),":"]})," se você quer o valor retornado por pop, precisa marcar a função como ",e.jsx("code",{children:"async"})," e usar ",e.jsx("code",{children:"await"})," no push."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Usar context errado:"})," chamar Navigator com um ",e.jsx("code",{children:"context"})," que está acima do ",e.jsx("code",{children:"MaterialApp"})," (ou desmontado) lança erro. Use o ",e.jsx("code",{children:"context"})," da tela atual."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"pop em tela única:"})," dar pop quando só existe uma tela na pilha fecha o app no Android. Cheque com ",e.jsx("code",{children:"Navigator.canPop(context)"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Memory leak:"})," manter referência de uma tela antiga (ex: passar callback que captura um ",e.jsx("code",{children:"State"})," velho) impede o garbage collector de limpar."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"setState após dispose:"})," quando voltar de uma tela e tentar setState em widget já desmontado, dá erro. Cheque ",e.jsx("code",{children:"if (!mounted) return;"})," antes."]})]}),e.jsxs(a,{type:"warning",title:"async + context = cuidado",children:["Após um ",e.jsx("code",{children:"await"}),", o widget pode ter sido desmontado. Antes de usar ",e.jsx("code",{children:"context"})," de novo, verifique ",e.jsx("code",{children:"if (!mounted) return;"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(a,{type:"tip",children:e.jsxs("ul",{children:[e.jsx("li",{children:"Para apps pequenos, Navigator 1.0 é suficiente — não complique."}),e.jsxs("li",{children:["Tipifique o retorno do push: ",e.jsx("code",{children:"Navigator.push<TipoDoResultado>"}),"."]}),e.jsxs("li",{children:["Para apps com muitas telas, deep links ou web, migre cedo para ",e.jsx("code",{children:"go_router"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"pushReplacement"})," quando o usuário não deve voltar (ex: depois do login)."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"pushAndRemoveUntil"})," para logout — limpa todo o histórico."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Próximo capítulo: ",e.jsx("strong",{children:"Navigator 2.0"})," — a API declarativa, mais poderosa mas verbosa. Depois, ",e.jsx("strong",{children:"go_router"}),", que é o que você vai usar de verdade no dia a dia."]}),e.jsx(a,{type:"success",title:"Resumo prático",children:"99% dos apps pequenos vivem felizes com push e pop. Não se sinta obrigado a migrar para coisas complexas se Navigator 1.0 resolve seu caso."})]})}export{s as default};
