import{j as e}from"./index-D9yRYXwO.js";import{P as a,C as r,A as i}from"./AlertBox-B2Rl5ETq.js";function d(){return e.jsxs(a,{title:"Provider",subtitle:"O gerenciador de estado mais simples e historicamente recomendado pelo time Flutter.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quando o estado precisa ser visto por mais de um widget (carrinho de compras visível na home e no checkout, usuário logado em todas as telas, tema do app), ",e.jsx("code",{children:"setState"})," não basta. Você teria que passar callbacks e dados por dezenas de níveis — o famoso ",e.jsx("em",{children:'"prop drilling"'}),"."]}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"provider"})," resolve isso fornecendo dados em algum ponto da árvore e permitindo que ",e.jsx("strong",{children:"qualquer descendente"})," os leia ou escute mudanças. É a recomendação oficial mais antiga, simples e ainda muito usada."]}),e.jsx("h2",{children:"O conceito"}),e.jsx("p",{children:"Três peças se encaixam:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"ChangeNotifier"})," — uma classe Dart simples que guarda dados e chama ",e.jsx("code",{children:"notifyListeners()"})," quando algo muda."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ChangeNotifierProvider"})," — um widget que cria o ChangeNotifier e o disponibiliza para descendentes."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Consumer"})," / ",e.jsx("strong",{children:"context.watch"})," / ",e.jsx("strong",{children:"context.read"})," — formas de acessar o ChangeNotifier de dentro de qualquer widget filho."]})]}),e.jsxs("p",{children:["Por baixo dos panos, ",e.jsx("code",{children:"provider"})," é só uma camada amigável sobre ",e.jsx("code",{children:"InheritedWidget"}),"."]}),e.jsx("h2",{children:"Setup"}),e.jsx(r,{title:"pubspec.yaml",code:`dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.0`}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsxs("p",{children:["Primeiro, crie o modelo herdando de ",e.jsx("code",{children:"ChangeNotifier"}),":"]}),e.jsx(r,{title:"lib/carrinho.dart",code:`import 'package:flutter/foundation.dart';

class Item {
  final String nome;
  final double preco;
  const Item(this.nome, this.preco);
}

class Carrinho extends ChangeNotifier {
  final List<Item> _items = [];

  // Expor SOMENTE leitura (lista imutável).
  List<Item> get items => List.unmodifiable(_items);

  double get total =>
      _items.fold(0, (soma, i) => soma + i.preco);

  void adicionar(Item i) {
    _items.add(i);
    notifyListeners(); // avisa todos os ouvintes
  }

  void remover(Item i) {
    _items.remove(i);
    notifyListeners();
  }

  void limpar() {
    _items.clear();
    notifyListeners();
  }
}`}),e.jsx("p",{children:"Em seguida, disponibilize esse Carrinho na raiz do app:"}),e.jsx(r,{title:"lib/main.dart",code:`import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'carrinho.dart';

void main() {
  runApp(
    // Cria o Carrinho UMA VEZ e fornece para toda a árvore.
    ChangeNotifierProvider(
      create: (_) => Carrinho(),
      child: const MeuApp(),
    ),
  );
}

class MeuApp extends StatelessWidget {
  const MeuApp({super.key});
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: HomePage());
  }
}`}),e.jsx("h2",{children:"Lendo o estado em qualquer widget descendente"}),e.jsx(r,{title:"acesso ao Carrinho",code:`// 1) context.watch — OUVINTE: rebuilda quando muda.
@override
Widget build(BuildContext context) {
  final carrinho = context.watch<Carrinho>();
  return Text('Itens: \${carrinho.items.length}');
}

// 2) context.read — APENAS LÊ uma vez (não escuta).
//    Use em callbacks de botão, NÃO em build.
ElevatedButton(
  onPressed: () {
    context.read<Carrinho>().adicionar(const Item('Pizza', 35));
  },
  child: const Text('Adicionar pizza'),
)

// 3) Consumer — alternativa que rebuilda só uma parte.
Consumer<Carrinho>(
  builder: (ctx, carrinho, _) {
    return Text('Total: R\\$ \${carrinho.total.toStringAsFixed(2)}');
  },
)

// 4) Selector — rebuilda só quando UM CAMPO específico muda.
Selector<Carrinho, int>(
  selector: (_, c) => c.items.length,
  builder: (ctx, qtd, _) => Text('$qtd item(ns)'),
)`}),e.jsx("h2",{children:"Exemplo prático: contador de carrinho na AppBar"}),e.jsx(r,{title:"lib/home_page.dart",code:`class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Loja'),
        actions: [
          // Só rebuilda esse pedaço quando length muda.
          Consumer<Carrinho>(
            builder: (ctx, c, _) => Padding(
              padding: const EdgeInsets.all(16),
              child: Text('🛒 \${c.items.length}'),
            ),
          ),
        ],
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // read em callback — não precisa escutar.
            context.read<Carrinho>().adicionar(
              const Item('Pizza', 35),
            );
          },
          child: const Text('Adicionar pizza'),
        ),
      ),
    );
  }
}`}),e.jsxs(i,{type:"info",title:"watch vs read — regra prática",children:[e.jsx("strong",{children:"watch"})," dentro de ",e.jsx("code",{children:"build"})," (precisa rebuildar quando muda). ",e.jsx("strong",{children:"read"})," dentro de callbacks como ",e.jsx("code",{children:"onPressed"})," (só pega o valor para chamar um método, não precisa escutar)."]}),e.jsx("h2",{children:"Múltiplos providers"}),e.jsxs("p",{children:["Quando seu app tem vários estados globais (Auth, Carrinho, Tema), use ",e.jsx("code",{children:"MultiProvider"}),":"]}),e.jsx(r,{title:"MultiProvider",code:`MultiProvider(
  providers: [
    ChangeNotifierProvider(create: (_) => AuthService()),
    ChangeNotifierProvider(create: (_) => Carrinho()),
    ChangeNotifierProvider(create: (_) => TemaConfig()),
  ],
  child: const MeuApp(),
)`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"notifyListeners()"}),":"]}),' alterar dados sem chamar essa função não atualiza nenhum widget. Bug clássico de "mudei mas não aparece".']}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar ",e.jsx("code",{children:"watch"})," em callback:"]})," ",e.jsx("code",{children:"onPressed: () => context.watch<Carrinho>().adicionar(...)"})," dá erro. ",e.jsx("code",{children:"watch"})," só dentro de build."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar ",e.jsx("code",{children:"read"})," em build:"]})," tecnicamente funciona mas não escuta mudanças — vira bug silencioso."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Criar Provider dentro do build:"})," ",e.jsx("code",{children:"ChangeNotifierProvider(create: ...)"})," dentro de um widget que rebuilda recria o estado a cada vez. Coloque na raiz do app."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mutar listas/maps direto:"})," alterar uma lista exposta sem usar os métodos do ChangeNotifier escapa do controle. Sempre encapsule mutações em métodos que chamam ",e.jsx("code",{children:"notifyListeners"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"dispose"}),":"]})," ",e.jsx("code",{children:"ChangeNotifierProvider"})," chama dispose automaticamente. Mas se você instanciar manualmente, precisa cuidar."]})]}),e.jsxs(i,{type:"warning",title:"Performance: granularidade importa",children:["Se você usa ",e.jsx("code",{children:"context.watch"})," num widget grande, qualquer mudança rebuilda tudo. Prefira ",e.jsx("code",{children:"Consumer"})," ou ",e.jsx("code",{children:"Selector"})," envolvendo só o pedaço que depende daquele dado."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(i,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Mantenha os ChangeNotifiers focados em ",e.jsx("strong",{children:"um domínio"}),': Carrinho, Auth, Tema. Não crie um "AppState" gigante.']}),e.jsxs("li",{children:["Exponha listas como ",e.jsx("code",{children:"List.unmodifiable(...)"})," para evitar mutação externa."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Selector"})," para evitar rebuilds desnecessários quando só um campo importa."]}),e.jsx("li",{children:"Para lógica assíncrona (chamadas de API), trate o estado de loading/erro como campos do ChangeNotifier."}),e.jsxs("li",{children:["Para lógica mais complexa ou apps grandes, avalie ",e.jsx("strong",{children:"Riverpod"})," ou ",e.jsx("strong",{children:"BLoC"}),"."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Provider é simples e resolve a maioria dos casos. Se você quer mais segurança em compile-time, testabilidade sem BuildContext e auto-dispose, dê uma olhada em ",e.jsx("strong",{children:"Riverpod"}),". Para apps muito grandes com times grandes, ",e.jsx("strong",{children:"BLoC"}),"."]})]})}export{d as default};
