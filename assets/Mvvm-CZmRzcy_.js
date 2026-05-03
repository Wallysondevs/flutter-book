import{j as e}from"./index-D9yRYXwO.js";import{P as o,C as i,A as r}from"./AlertBox-B2Rl5ETq.js";function d(){return e.jsxs(o,{title:"MVVM",subtitle:"Model–View–ViewModel: a separação de responsabilidades mais usada em Flutter.",difficulty:"intermediario",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Sem padrão, é tentador colocar tudo dentro do widget: chamada HTTP, validação, formatação, estado. Em duas semanas, esse ",e.jsx("code",{children:"build"})," tem 300 linhas e ninguém consegue alterar nada. ",e.jsx("strong",{children:"MVVM"})," separa a tela (View) do que ela mostra/faz (ViewModel) e dos dados puros (Model). É o padrão preferido em Flutter porque encaixa naturalmente em Provider, Riverpod e ChangeNotifier."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Model"})," — entidades imutáveis do domínio (ex: ",e.jsx("code",{children:"Usuario"}),", ",e.jsx("code",{children:"Pedido"}),"). Não conhece UI nem estado."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"View"})," — widget. Apenas renderiza o estado da ViewModel e dispara ações."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ViewModel"})," — guarda estado da tela e expõe ações (",e.jsx("code",{children:"carregar"}),", ",e.jsx("code",{children:"salvar"}),"). Não importa ",e.jsx("code",{children:"flutter/material"})," além do necessário (",e.jsx("code",{children:"ChangeNotifier"})," de ",e.jsx("code",{children:"foundation"}),")."]})]}),e.jsx("p",{children:"Comunicação:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["View → ViewModel: chamando métodos (",e.jsx("code",{children:"vm.carregar()"}),")."]}),e.jsxs("li",{children:["ViewModel → View: notificando mudança (",e.jsx("code",{children:"notifyListeners()"}),") e a View se reconstrói."]}),e.jsx("li",{children:"ViewModel ↔ Model: a VM consome dados via Repository."})]}),e.jsx("h2",{children:"Como o Flutter faz"}),e.jsxs("p",{children:["A forma mais simples é ",e.jsx("code",{children:"ChangeNotifier"})," + ",e.jsx("code",{children:"provider"}),". A VM herda de ",e.jsx("code",{children:"ChangeNotifier"}),"; o widget consome com",e.jsx("code",{children:"context.watch<HomeVM>()"}),"."]}),e.jsx(i,{title:"Model imutável",code:`class Usuario {
  final int id;
  final String nome;
  final String email;
  const Usuario({required this.id, required this.nome, required this.email});
}`}),e.jsx(i,{title:"ViewModel",code:`import 'package:flutter/foundation.dart';

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
      erro = 'Não foi possível carregar: $e';
    } finally {
      carregando = false;
      notifyListeners();
    }
  }
}`}),e.jsx("h2",{children:"Exemplo prático: tela completa com Provider"}),e.jsx(i,{title:"main.dart — registro",code:`void main() {
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
}`}),e.jsx(i,{title:"View (widget burro)",code:`class HomePage extends StatelessWidget {
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
}`}),e.jsxs("p",{children:["Repare: a View não sabe de HTTP, não sabe nem que existe banco. Só chama ",e.jsx("code",{children:"vm.carregar()"})," e mostra o estado. Trocar Provider por Riverpod, ou ChangeNotifier por StateNotifier, é cirúrgico."]}),e.jsx("h2",{children:"MVVM com Riverpod"}),e.jsxs("p",{children:['Em Riverpod o "ViewModel" geralmente é um ',e.jsx("code",{children:"Notifier"})," ou",e.jsx("code",{children:"AsyncNotifier"}),":"]}),e.jsx(i,{title:"Riverpod",code:`final homeProvider = AsyncNotifierProvider<HomeNotifier, List<Usuario>>(
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
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer notifyListeners"})," — estado muda mas tela não atualiza."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Chamar notifyListeners no build"})," — loop infinito de rebuild. Notifique sempre ",e.jsx("em",{children:"fora"})," do build."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"VM virar God Object"})," — uma VM por tela é o ideal. Compartilhe lógica via Repository."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Acessar BuildContext na VM"})," — VM não conhece widget. Para navegar, exponha um callback ou use ",e.jsx("code",{children:"GlobalKey"})," de Navigator."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Estado mutável visível"})," — exponha listas via ",e.jsx("code",{children:"List<Usuario> get usuarios => List.unmodifiable(_usuarios)"})," para evitar mutação acidental pela View."]})]}),e.jsxs(r,{type:"info",title:"Combina com Provider e Riverpod",children:[e.jsx("code",{children:"ChangeNotifierProvider"})," expõe a VM e a View consome via",e.jsx("code",{children:"Consumer"}),", ",e.jsx("code",{children:"context.watch"})," ou",e.jsx("code",{children:"Selector"}),". Em Riverpod, use ",e.jsx("code",{children:"NotifierProvider"}),"."]}),e.jsxs(r,{type:"warning",title:"ChangeNotifier não é tipado",children:[e.jsx("code",{children:"notifyListeners"})," reconstrói tudo que ouve. Para casos com muitos estados, prefira ",e.jsx("code",{children:"ValueNotifier<T>"}),",",e.jsx("code",{children:"StateNotifier"})," ou Bloc — mais granulares."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(r,{type:"tip",children:e.jsxs("ul",{children:[e.jsx("li",{children:'Mantenha a View "burra": só renderiza e dispara eventos.'}),e.jsxs("li",{children:["Encapsule estado em uma classe (",e.jsx("code",{children:"HomeState"}),") para evitar 10 campos públicos na VM."]}),e.jsx("li",{children:"Teste a ViewModel com mocks do Repository — não precisa de Flutter."}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Selector"})," ou ",e.jsx("code",{children:"context.select"})," para reconstruir só o que mudou."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Veja ",e.jsx("em",{children:"Repository Pattern"})," para entender quem fornece dados à VM, e ",e.jsx("em",{children:"Clean Architecture"})," para encaixar tudo num projeto grande."]}),e.jsx(r,{type:"success",children:"Apps com MVVM bem feito mudam de visual sem mexer em lógica e mudam de backend sem mexer em telas."})]})}export{d as default};
