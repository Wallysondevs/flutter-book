import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Provider() {
  return (
    <PageContainer
      title="Provider"
      subtitle="O gerenciador de estado mais simples e historicamente recomendado pelo time Flutter."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quando o estado precisa ser visto por mais de um widget (carrinho de compras visível na home e no checkout, usuário logado em todas as telas, tema do app), <code>setState</code> não basta. Você teria que passar callbacks e dados por dezenas de níveis — o famoso <em>"prop drilling"</em>.
      </p>
      <p>
        O <code>provider</code> resolve isso fornecendo dados em algum ponto da árvore e permitindo que <strong>qualquer descendente</strong> os leia ou escute mudanças. É a recomendação oficial mais antiga, simples e ainda muito usada.
      </p>

      <h2>O conceito</h2>
      <p>
        Três peças se encaixam:
      </p>
      <ul>
        <li><strong>ChangeNotifier</strong> — uma classe Dart simples que guarda dados e chama <code>notifyListeners()</code> quando algo muda.</li>
        <li><strong>ChangeNotifierProvider</strong> — um widget que cria o ChangeNotifier e o disponibiliza para descendentes.</li>
        <li><strong>Consumer</strong> / <strong>context.watch</strong> / <strong>context.read</strong> — formas de acessar o ChangeNotifier de dentro de qualquer widget filho.</li>
      </ul>
      <p>
        Por baixo dos panos, <code>provider</code> é só uma camada amigável sobre <code>InheritedWidget</code>.
      </p>

      <h2>Setup</h2>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.0`} />

      <h2>Como Flutter faz</h2>
      <p>
        Primeiro, crie o modelo herdando de <code>ChangeNotifier</code>:
      </p>

      <CodeBlock title="lib/carrinho.dart" code={`import 'package:flutter/foundation.dart';

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
}`} />

      <p>
        Em seguida, disponibilize esse Carrinho na raiz do app:
      </p>

      <CodeBlock title="lib/main.dart" code={`import 'package:flutter/material.dart';
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
}`} />

      <h2>Lendo o estado em qualquer widget descendente</h2>

      <CodeBlock title="acesso ao Carrinho" code={`// 1) context.watch — OUVINTE: rebuilda quando muda.
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
    return Text('Total: R\\\$ \${carrinho.total.toStringAsFixed(2)}');
  },
)

// 4) Selector — rebuilda só quando UM CAMPO específico muda.
Selector<Carrinho, int>(
  selector: (_, c) => c.items.length,
  builder: (ctx, qtd, _) => Text('\$qtd item(ns)'),
)`} />

      <h2>Exemplo prático: contador de carrinho na AppBar</h2>

      <CodeBlock title="lib/home_page.dart" code={`class HomePage extends StatelessWidget {
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
}`} />

      <AlertBox type="info" title="watch vs read — regra prática">
        <strong>watch</strong> dentro de <code>build</code> (precisa rebuildar quando muda). <strong>read</strong> dentro de callbacks como <code>onPressed</code> (só pega o valor para chamar um método, não precisa escutar).
      </AlertBox>

      <h2>Múltiplos providers</h2>
      <p>
        Quando seu app tem vários estados globais (Auth, Carrinho, Tema), use <code>MultiProvider</code>:
      </p>

      <CodeBlock title="MultiProvider" code={`MultiProvider(
  providers: [
    ChangeNotifierProvider(create: (_) => AuthService()),
    ChangeNotifierProvider(create: (_) => Carrinho()),
    ChangeNotifierProvider(create: (_) => TemaConfig()),
  ],
  child: const MeuApp(),
)`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer <code>notifyListeners()</code>:</strong> alterar dados sem chamar essa função não atualiza nenhum widget. Bug clássico de "mudei mas não aparece".</li>
        <li><strong>Usar <code>watch</code> em callback:</strong> <code>onPressed: () =&gt; context.watch&lt;Carrinho&gt;().adicionar(...)</code> dá erro. <code>watch</code> só dentro de build.</li>
        <li><strong>Usar <code>read</code> em build:</strong> tecnicamente funciona mas não escuta mudanças — vira bug silencioso.</li>
        <li><strong>Criar Provider dentro do build:</strong> <code>ChangeNotifierProvider(create: ...)</code> dentro de um widget que rebuilda recria o estado a cada vez. Coloque na raiz do app.</li>
        <li><strong>Mutar listas/maps direto:</strong> alterar uma lista exposta sem usar os métodos do ChangeNotifier escapa do controle. Sempre encapsule mutações em métodos que chamam <code>notifyListeners</code>.</li>
        <li><strong>Esquecer <code>dispose</code>:</strong> <code>ChangeNotifierProvider</code> chama dispose automaticamente. Mas se você instanciar manualmente, precisa cuidar.</li>
      </ul>

      <AlertBox type="warning" title="Performance: granularidade importa">
        Se você usa <code>context.watch</code> num widget grande, qualquer mudança rebuilda tudo. Prefira <code>Consumer</code> ou <code>Selector</code> envolvendo só o pedaço que depende daquele dado.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Mantenha os ChangeNotifiers focados em <strong>um domínio</strong>: Carrinho, Auth, Tema. Não crie um "AppState" gigante.</li>
          <li>Exponha listas como <code>List.unmodifiable(...)</code> para evitar mutação externa.</li>
          <li>Use <code>Selector</code> para evitar rebuilds desnecessários quando só um campo importa.</li>
          <li>Para lógica assíncrona (chamadas de API), trate o estado de loading/erro como campos do ChangeNotifier.</li>
          <li>Para lógica mais complexa ou apps grandes, avalie <strong>Riverpod</strong> ou <strong>BLoC</strong>.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Provider é simples e resolve a maioria dos casos. Se você quer mais segurança em compile-time, testabilidade sem BuildContext e auto-dispose, dê uma olhada em <strong>Riverpod</strong>. Para apps muito grandes com times grandes, <strong>BLoC</strong>.
      </p>
    </PageContainer>
  );
}
