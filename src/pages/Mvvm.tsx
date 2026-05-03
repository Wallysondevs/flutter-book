import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Mvvm() {
  return (
    <PageContainer
      title="MVVM"
      subtitle="Model–View–ViewModel: a separação de responsabilidades mais usada em Flutter."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Sem padrão, é tentador colocar tudo dentro do widget: chamada HTTP,
        validação, formatação, estado. Em duas semanas, esse <code>build</code> tem
        300 linhas e ninguém consegue alterar nada. <strong>MVVM</strong> separa
        a tela (View) do que ela mostra/faz (ViewModel) e dos dados puros
        (Model). É o padrão preferido em Flutter porque encaixa naturalmente em
        Provider, Riverpod e ChangeNotifier.
      </p>

      <h2>O conceito</h2>
      <ul>
        <li><strong>Model</strong> — entidades imutáveis do domínio (ex: <code>Usuario</code>, <code>Pedido</code>). Não conhece UI nem estado.</li>
        <li><strong>View</strong> — widget. Apenas renderiza o estado da ViewModel e dispara ações.</li>
        <li><strong>ViewModel</strong> — guarda estado da tela e expõe ações (<code>carregar</code>, <code>salvar</code>). Não importa <code>flutter/material</code> além do necessário (<code>ChangeNotifier</code> de <code>foundation</code>).</li>
      </ul>
      <p>
        Comunicação:
      </p>
      <ul>
        <li>View → ViewModel: chamando métodos (<code>vm.carregar()</code>).</li>
        <li>ViewModel → View: notificando mudança (<code>notifyListeners()</code>) e a View se reconstrói.</li>
        <li>ViewModel ↔ Model: a VM consome dados via Repository.</li>
      </ul>

      <h2>Como o Flutter faz</h2>
      <p>
        A forma mais simples é <code>ChangeNotifier</code> + <code>provider</code>.
        A VM herda de <code>ChangeNotifier</code>; o widget consome com
        <code>context.watch&lt;HomeVM&gt;()</code>.
      </p>

      <CodeBlock title="Model imutável" code={`class Usuario {
  final int id;
  final String nome;
  final String email;
  const Usuario({required this.id, required this.nome, required this.email});
}`} />

      <CodeBlock title="ViewModel" code={`import 'package:flutter/foundation.dart';

class HomeVM extends ChangeNotifier {
  final UsuarioRepository repo;
  HomeVM(this.repo);

  // Estado
  bool carregando = false;
  String? erro;
  List<Usuario> usuarios = [];

  // Ação
  Future<void> carregar() async {
    carregando = true;
    erro = null;
    notifyListeners();

    try {
      usuarios = await repo.listar();
    } catch (e) {
      erro = 'Não foi possível carregar: \$e';
    } finally {
      carregando = false;
      notifyListeners();
    }
  }
}`} />

      <h2>Exemplo prático: tela completa com Provider</h2>

      <CodeBlock title="main.dart — registro" code={`void main() {
  runApp(
    MultiProvider(
      providers: [
        Provider<UsuarioRepository>(
          create: (_) => UsuarioRepositoryImpl(api: ApiClient()),
        ),
        ChangeNotifierProvider<HomeVM>(
          create: (ctx) => HomeVM(ctx.read<UsuarioRepository>())..carregar(),
        ),
      ],
      child: const MyApp(),
    ),
  );
}`} />

      <CodeBlock title="View (widget burro)" code={`class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<HomeVM>();   // observa mudanças

    if (vm.carregando) {
      return const Center(child: CircularProgressIndicator());
    }
    if (vm.erro != null) {
      return Center(child: Text(vm.erro!));
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Usuários')),
      body: ListView.builder(
        itemCount: vm.usuarios.length,
        itemBuilder: (_, i) => ListTile(title: Text(vm.usuarios[i].nome)),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.read<HomeVM>().carregar(),
        child: const Icon(Icons.refresh),
      ),
    );
  }
}`} />

      <p>
        Repare: a View não sabe de HTTP, não sabe nem que existe banco. Só
        chama <code>vm.carregar()</code> e mostra o estado. Trocar Provider por
        Riverpod, ou ChangeNotifier por StateNotifier, é cirúrgico.
      </p>

      <h2>MVVM com Riverpod</h2>
      <p>
        Em Riverpod o "ViewModel" geralmente é um <code>Notifier</code> ou
        <code>AsyncNotifier</code>:
      </p>

      <CodeBlock title="Riverpod" code={`final homeProvider = AsyncNotifierProvider<HomeNotifier, List<Usuario>>(
  HomeNotifier.new,
);

class HomeNotifier extends AsyncNotifier<List<Usuario>> {
  @override
  Future<List<Usuario>> build() async {
    final repo = ref.read(usuarioRepoProvider);
    return repo.listar();
  }

  Future<void> recarregar() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() => ref.read(usuarioRepoProvider).listar());
  }
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer notifyListeners</strong> — estado muda mas tela não atualiza.</li>
        <li><strong>Chamar notifyListeners no build</strong> — loop infinito de rebuild. Notifique sempre <em>fora</em> do build.</li>
        <li><strong>VM virar God Object</strong> — uma VM por tela é o ideal. Compartilhe lógica via Repository.</li>
        <li><strong>Acessar BuildContext na VM</strong> — VM não conhece widget. Para navegar, exponha um callback ou use <code>GlobalKey</code> de Navigator.</li>
        <li><strong>Estado mutável visível</strong> — exponha listas via <code>List&lt;Usuario&gt; get usuarios =&gt; List.unmodifiable(_usuarios)</code> para evitar mutação acidental pela View.</li>
      </ul>

      <AlertBox type="info" title="Combina com Provider e Riverpod">
        <code>ChangeNotifierProvider</code> expõe a VM e a View consome via
        <code>Consumer</code>, <code>context.watch</code> ou
        <code>Selector</code>. Em Riverpod, use <code>NotifierProvider</code>.
      </AlertBox>

      <AlertBox type="warning" title="ChangeNotifier não é tipado">
        <code>notifyListeners</code> reconstrói tudo que ouve. Para casos com
        muitos estados, prefira <code>ValueNotifier&lt;T&gt;</code>,
        <code>StateNotifier</code> ou Bloc — mais granulares.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Mantenha a View "burra": só renderiza e dispara eventos.</li>
          <li>Encapsule estado em uma classe (<code>HomeState</code>) para evitar 10 campos públicos na VM.</li>
          <li>Teste a ViewModel com mocks do Repository — não precisa de Flutter.</li>
          <li>Use <code>Selector</code> ou <code>context.select</code> para reconstruir só o que mudou.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Veja <em>Repository Pattern</em> para entender quem fornece dados à VM,
        e <em>Clean Architecture</em> para encaixar tudo num projeto grande.
      </p>
      <AlertBox type="success">
        Apps com MVVM bem feito mudam de visual sem mexer em lógica e mudam de
        backend sem mexer em telas.
      </AlertBox>
    </PageContainer>
  );
}
