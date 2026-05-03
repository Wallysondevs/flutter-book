import{j as e}from"./index-D4AOhXGO.js";import{P as i,C as r,A as o}from"./AlertBox-Dyf2wdSA.js";function a(){return e.jsxs(i,{title:"Riverpod",subtitle:"Provider repensado — segurança em compile-time, sem BuildContext, com auto-dispose.",difficulty:"intermediario",timeToRead:"16 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Provider funciona, mas tem dores de crescimento: depende de ",e.jsx("code",{children:"BuildContext"}),", erros aparecem só em runtime (",e.jsx("code",{children:"ProviderNotFoundException"}),"), e gerenciar dispose de estados temporários é manual. O autor do Provider, Remi Rousselet, criou o ",e.jsx("strong",{children:"Riverpod"})," para resolver tudo isso com uma API mais previsível."]}),e.jsxs("p",{children:["Hoje Riverpod é uma das escolhas mais populares em projetos novos: ele oferece ",e.jsx("em",{children:"type safety"})," de verdade, testes mais fáceis e composição limpa de estados."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Tudo gira em torno de ",e.jsx("strong",{children:"providers"})," — objetos globais que descrevem como criar um valor. Você lê esses providers via um objeto chamado ",e.jsx("code",{children:"ref"})," (ou via ",e.jsx("code",{children:"WidgetRef"})," em widgets). O Riverpod cuida de criar, cachear e descartar."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Sem BuildContext"}),": providers são variáveis globais. Acesso fora de widgets é trivial (testes, services)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Compile-time safe"}),": cada provider é tipado. Se o tipo não bater, o compilador grita."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Auto-dispose"}),": providers podem se autodescartar quando ninguém os usa."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Family"}),': parametrize providers (um provider de "usuário por id" cria instâncias por id).']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Composição"}),": um provider pode ler outros via ",e.jsx("code",{children:"ref.watch"}),"."]})]}),e.jsx("h2",{children:"Setup"}),e.jsx(r,{title:"pubspec.yaml",code:`dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.0`}),e.jsxs("p",{children:["Envolva o app em ",e.jsx("code",{children:"ProviderScope"}),":"]}),e.jsx(r,{title:"lib/main.dart",code:`import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(const ProviderScope(child: MeuApp()));
}`}),e.jsx("h2",{children:"Como Flutter faz com Riverpod"}),e.jsx("p",{children:"Existem vários tipos de provider. Os mais usados:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Provider"})," — valor imutável (configs, services)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"StateProvider"})," — valor simples mutável (contador, bool)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"StateNotifierProvider"})," — estado complexo com lógica encapsulada."]}),e.jsxs("li",{children:[e.jsx("code",{children:"FutureProvider"})," — resultado de uma operação assíncrona."]}),e.jsxs("li",{children:[e.jsx("code",{children:"StreamProvider"})," — escuta um Stream."]})]}),e.jsx(r,{title:"exemplo simples: contador",code:`import 'package:flutter_riverpod/flutter_riverpod.dart';

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
      body: Center(child: Text('$n', style: const TextStyle(fontSize: 48))),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // ref.read em callback: pega o notifier e muta.
          ref.read(contadorProvider.notifier).state++;
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}`}),e.jsx("h2",{children:"Exemplo prático: estado complexo com Notifier"}),e.jsxs("p",{children:["Para lógica mais elaborada (carrinho de compras, login), use ",e.jsx("code",{children:"Notifier"})," ou ",e.jsx("code",{children:"AsyncNotifier"}),":"]}),e.jsx(r,{title:"lib/carrinho_provider.dart",code:`import 'package:flutter_riverpod/flutter_riverpod.dart';

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
}`}),e.jsx("h2",{children:"Async com FutureProvider"}),e.jsx("p",{children:"Carregar dados de uma API e tratar loading/erro fica trivial:"}),e.jsx(r,{title:"FutureProvider",code:`final usuarioProvider = FutureProvider<Usuario>((ref) async {
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
      error: (e, st) => Center(child: Text('Erro: $e')),
      data: (u) => Text('Olá, \${u.nome}'),
    );
  }
}`}),e.jsxs(o,{type:"success",title:"O .when é lindo",children:["Em uma chamada você cobre loading, erro e sucesso — sem if/else espalhado, sem flag ",e.jsx("code",{children:"isLoading"})," manual. É um dos pontos altos do Riverpod."]}),e.jsx("h2",{children:"Family: providers parametrizados"}),e.jsxs("p",{children:['Para "carregar usuário por id" você não cria um provider para cada id — usa ',e.jsx("code",{children:"family"}),":"]}),e.jsx(r,{title:"family",code:`final usuarioPorIdProvider =
    FutureProvider.family<Usuario, String>((ref, id) async {
  final response = await http.get(Uri.parse('/api/users/$id'));
  return Usuario.fromJson(jsonDecode(response.body));
});

// Uso:
final asyncU = ref.watch(usuarioPorIdProvider('42'));`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer o ",e.jsx("code",{children:"ProviderScope"}),":"]})," sem ele, todos os providers explodem em runtime. Sempre envolva o ",e.jsx("code",{children:"runApp"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mutar estado direto:"})," ",e.jsx("code",{children:"state.add(item)"})," não dispara rebuild — Riverpod compara por referência. Crie nova lista: ",e.jsx("code",{children:"state = [...state, item]"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"watch fora do build:"})," em callbacks use ",e.jsx("code",{children:"ref.read"}),"; ",e.jsx("code",{children:"ref.watch"})," só faz sentido onde o rebuild importa."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Misturar ",e.jsx("code",{children:"provider"})," e ",e.jsx("code",{children:"flutter_riverpod"}),":"]})," são pacotes diferentes. Não importe ambos no mesmo arquivo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"StateProvider para coisas complexas:"})," use só para valores simples. Para lógica, prefira ",e.jsx("code",{children:"NotifierProvider"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Não usar autoDispose quando deveria:"})," dados de uma tela específica devem se descartar quando ninguém escuta — use ",e.jsx("code",{children:".autoDispose"}),"."]})]}),e.jsxs(o,{type:"warning",title:"Imutabilidade é obrigatória",children:["Riverpod detecta mudança comparando referências de objetos. Se você mutar a mesma lista/map/objeto, o estado parece igual. Sempre crie uma ",e.jsx("em",{children:"nova"})," instância."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(o,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Coloque providers em arquivos próprios (",e.jsx("code",{children:"lib/providers/carrinho_provider.dart"}),")."]}),e.jsxs("li",{children:["Para apps grandes, use ",e.jsx("code",{children:"riverpod_generator"})," + ",e.jsx("code",{children:"build_runner"})," para gerar providers a partir de anotações ",e.jsx("code",{children:"@riverpod"})," — fica ainda mais limpo."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"AsyncNotifier"})," para chamadas de API com mutação (login, save)."]}),e.jsxs("li",{children:["Combine providers com ",e.jsx("code",{children:"ref.watch"})," dentro de outros providers para reatividade em cadeia."]}),e.jsxs("li",{children:["Teste providers sem widget: ",e.jsx("code",{children:"ProviderContainer().read(meuProvider)"}),"."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Para apps muito grandes, com times grandes ou que vêm do mundo Redux, vale conhecer o ",e.jsx("strong",{children:"BLoC"})," — outro padrão consolidado. Para o conceito que está por baixo de tudo isso, leia ",e.jsx("strong",{children:"InheritedWidget"}),"."]}),e.jsx(o,{type:"info",title:"Riverpod ou Provider?",children:"Para projetos novos pequenos: Provider serve. Para projetos novos médios/grandes ou que vão crescer: Riverpod. Para projetos legados que já usam Provider: não precisa migrar à força."})]})}export{a as default};
