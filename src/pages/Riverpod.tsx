import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Riverpod() {
  return (
    <PageContainer
      title="Riverpod"
      subtitle="Provider repensado — segurança em compile-time, sem BuildContext, com auto-dispose."
      difficulty="intermediario"
      timeToRead="16 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Provider funciona, mas tem dores de crescimento: depende de <code>BuildContext</code>, erros aparecem só em runtime (<code>ProviderNotFoundException</code>), e gerenciar dispose de estados temporários é manual. O autor do Provider, Remi Rousselet, criou o <strong>Riverpod</strong> para resolver tudo isso com uma API mais previsível.
      </p>
      <p>
        Hoje Riverpod é uma das escolhas mais populares em projetos novos: ele oferece <em>type safety</em> de verdade, testes mais fáceis e composição limpa de estados.
      </p>

      <h2>O conceito</h2>
      <p>
        Tudo gira em torno de <strong>providers</strong> — objetos globais que descrevem como criar um valor. Você lê esses providers via um objeto chamado <code>ref</code> (ou via <code>WidgetRef</code> em widgets). O Riverpod cuida de criar, cachear e descartar.
      </p>
      <ul>
        <li><strong>Sem BuildContext</strong>: providers são variáveis globais. Acesso fora de widgets é trivial (testes, services).</li>
        <li><strong>Compile-time safe</strong>: cada provider é tipado. Se o tipo não bater, o compilador grita.</li>
        <li><strong>Auto-dispose</strong>: providers podem se autodescartar quando ninguém os usa.</li>
        <li><strong>Family</strong>: parametrize providers (um provider de "usuário por id" cria instâncias por id).</li>
        <li><strong>Composição</strong>: um provider pode ler outros via <code>ref.watch</code>.</li>
      </ul>

      <h2>Setup</h2>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.0`} />

      <p>
        Envolva o app em <code>ProviderScope</code>:
      </p>

      <CodeBlock title="lib/main.dart" code={`import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(const ProviderScope(child: MeuApp()));
}`} />

      <h2>Como Flutter faz com Riverpod</h2>
      <p>
        Existem vários tipos de provider. Os mais usados:
      </p>
      <ul>
        <li><code>Provider</code> — valor imutável (configs, services).</li>
        <li><code>StateProvider</code> — valor simples mutável (contador, bool).</li>
        <li><code>StateNotifierProvider</code> — estado complexo com lógica encapsulada.</li>
        <li><code>FutureProvider</code> — resultado de uma operação assíncrona.</li>
        <li><code>StreamProvider</code> — escuta um Stream.</li>
      </ul>

      <CodeBlock title="exemplo simples: contador" code={`import 'package:flutter_riverpod/flutter_riverpod.dart';

// Define um provider global de int, valor inicial 0.
final contadorProvider = StateProvider<int>((ref) => 0);

class ContadorPage extends ConsumerWidget {
  const ContadorPage({super.key});

  // ConsumerWidget ganha um WidgetRef no build.
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // ref.watch ESCUTA: rebuilda quando o valor muda.
    final n = ref.watch(contadorProvider);

    return Scaffold(
      body: Center(child: Text('\$n', style: const TextStyle(fontSize: 48))),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // ref.read em callback: pega o notifier e muta.
          ref.read(contadorProvider.notifier).state++;
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}`} />

      <h2>Exemplo prático: estado complexo com Notifier</h2>
      <p>
        Para lógica mais elaborada (carrinho de compras, login), use <code>Notifier</code> ou <code>AsyncNotifier</code>:
      </p>

      <CodeBlock title="lib/carrinho_provider.dart" code={`import 'package:flutter_riverpod/flutter_riverpod.dart';

class Item {
  final String nome;
  final double preco;
  const Item(this.nome, this.preco);
}

// Notifier guarda um estado e expõe métodos para mudá-lo.
class CarrinhoNotifier extends Notifier<List<Item>> {
  @override
  List<Item> build() => []; // estado inicial

  void adicionar(Item i) {
    // Sempre crie uma nova lista (estado imutável).
    state = [...state, i];
  }

  void remover(Item i) {
    state = state.where((x) => x != i).toList();
  }

  double get total => state.fold(0, (s, i) => s + i.preco);
}

final carrinhoProvider =
    NotifierProvider<CarrinhoNotifier, List<Item>>(
  CarrinhoNotifier.new,
);

// Uso na UI:
class CarrinhoBadge extends ConsumerWidget {
  const CarrinhoBadge({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final items = ref.watch(carrinhoProvider);
    return Text('🛒 \${items.length}');
  }
}

class BotaoAdicionar extends ConsumerWidget {
  const BotaoAdicionar({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ElevatedButton(
      onPressed: () {
        ref.read(carrinhoProvider.notifier)
           .adicionar(const Item('Pizza', 35));
      },
      child: const Text('Adicionar pizza'),
    );
  }
}`} />

      <h2>Async com FutureProvider</h2>
      <p>
        Carregar dados de uma API e tratar loading/erro fica trivial:
      </p>

      <CodeBlock title="FutureProvider" code={`final usuarioProvider = FutureProvider<Usuario>((ref) async {
  final response = await http.get(Uri.parse('/api/me'));
  return Usuario.fromJson(jsonDecode(response.body));
});

class PerfilPage extends ConsumerWidget {
  const PerfilPage({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncUsuario = ref.watch(usuarioProvider);

    // .when trata os 3 estados de uma vez.
    return asyncUsuario.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, st) => Center(child: Text('Erro: \$e')),
      data: (u) => Text('Olá, \${u.nome}'),
    );
  }
}`} />

      <AlertBox type="success" title="O .when é lindo">
        Em uma chamada você cobre loading, erro e sucesso — sem if/else espalhado, sem flag <code>isLoading</code> manual. É um dos pontos altos do Riverpod.
      </AlertBox>

      <h2>Family: providers parametrizados</h2>
      <p>
        Para "carregar usuário por id" você não cria um provider para cada id — usa <code>family</code>:
      </p>

      <CodeBlock title="family" code={`final usuarioPorIdProvider =
    FutureProvider.family<Usuario, String>((ref, id) async {
  final response = await http.get(Uri.parse('/api/users/\$id'));
  return Usuario.fromJson(jsonDecode(response.body));
});

// Uso:
final asyncU = ref.watch(usuarioPorIdProvider('42'));`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer o <code>ProviderScope</code>:</strong> sem ele, todos os providers explodem em runtime. Sempre envolva o <code>runApp</code>.</li>
        <li><strong>Mutar estado direto:</strong> <code>state.add(item)</code> não dispara rebuild — Riverpod compara por referência. Crie nova lista: <code>state = [...state, item]</code>.</li>
        <li><strong>watch fora do build:</strong> em callbacks use <code>ref.read</code>; <code>ref.watch</code> só faz sentido onde o rebuild importa.</li>
        <li><strong>Misturar <code>provider</code> e <code>flutter_riverpod</code>:</strong> são pacotes diferentes. Não importe ambos no mesmo arquivo.</li>
        <li><strong>StateProvider para coisas complexas:</strong> use só para valores simples. Para lógica, prefira <code>NotifierProvider</code>.</li>
        <li><strong>Não usar autoDispose quando deveria:</strong> dados de uma tela específica devem se descartar quando ninguém escuta — use <code>.autoDispose</code>.</li>
      </ul>

      <AlertBox type="warning" title="Imutabilidade é obrigatória">
        Riverpod detecta mudança comparando referências de objetos. Se você mutar a mesma lista/map/objeto, o estado parece igual. Sempre crie uma <em>nova</em> instância.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Coloque providers em arquivos próprios (<code>lib/providers/carrinho_provider.dart</code>).</li>
          <li>Para apps grandes, use <code>riverpod_generator</code> + <code>build_runner</code> para gerar providers a partir de anotações <code>@riverpod</code> — fica ainda mais limpo.</li>
          <li>Use <code>AsyncNotifier</code> para chamadas de API com mutação (login, save).</li>
          <li>Combine providers com <code>ref.watch</code> dentro de outros providers para reatividade em cadeia.</li>
          <li>Teste providers sem widget: <code>ProviderContainer().read(meuProvider)</code>.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Para apps muito grandes, com times grandes ou que vêm do mundo Redux, vale conhecer o <strong>BLoC</strong> — outro padrão consolidado. Para o conceito que está por baixo de tudo isso, leia <strong>InheritedWidget</strong>.
      </p>

      <AlertBox type="info" title="Riverpod ou Provider?">
        Para projetos novos pequenos: Provider serve. Para projetos novos médios/grandes ou que vão crescer: Riverpod. Para projetos legados que já usam Provider: não precisa migrar à força.
      </AlertBox>
    </PageContainer>
  );
}
