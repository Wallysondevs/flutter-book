import{j as e}from"./index-D9yRYXwO.js";import{P as r,C as a,A as o}from"./AlertBox-B2Rl5ETq.js";function t(){return e.jsxs(r,{title:"Repository Pattern",subtitle:"Esconda API, cache e banco atrás de uma única interface limpa.",difficulty:"intermediario",timeToRead:"11 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Imagine que sua tela de produtos chama ",e.jsx("code",{children:"http.get(...)"}),"direto. Amanhã você quer adicionar cache offline. Depois, trocar de REST para GraphQL. Cada mudança espalha consequências por dezenas de arquivos. O ",e.jsx("strong",{children:"Repository Pattern"})," resolve isso: a UI conversa com uma ",e.jsx("em",{children:"interface"}),", e quem decide se busca da rede, cache ou banco é uma classe escondida atrás dela."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um ",e.jsx("strong",{children:"Repository"})," é uma fachada para acessar dados de uma entidade do seu domínio (Usuário, Pedido, Produto). Ele pode combinar múltiplas fontes (",e.jsx("em",{children:"datasources"}),"): API remota, cache em memória, banco local. A regra é:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["A ",e.jsx("strong",{children:"interface"})," mora no domínio (puro Dart)."]}),e.jsxs("li",{children:["A ",e.jsx("strong",{children:"implementação"})," mora na camada de dados."]}),e.jsx("li",{children:"A UI/ViewModel só conhece a interface — nunca a implementação."})]}),e.jsx("p",{children:'Analogia: pense num atendente de banco. Você pede "extrato"; ele decide se busca no sistema, no cache ou no microfilme. Você não quer saber.'}),e.jsx("h2",{children:"Como o Flutter faz"}),e.jsxs("p",{children:["Em Dart, a interface é uma ",e.jsx("code",{children:"abstract class"})," ou",e.jsx("code",{children:"interface class"})," (Dart 3+). A implementação injeta os datasources via construtor."]}),e.jsx(a,{title:"domain — interface",code:`abstract class UsuarioRepository {
  Future<Usuario> buscar(int id);
  Future<List<Usuario>> listar();
  Future<void> salvar(Usuario u);
}`}),e.jsx("h2",{children:"Exemplo prático: cache + remoto + offline"}),e.jsx("p",{children:"Implementação real: tenta cache em memória, depois banco local, depois rede. Salva a resposta da rede no banco para uso offline futuro."}),e.jsx(a,{title:"data — implementação",code:`class UsuarioRepositoryImpl implements UsuarioRepository {
  final ApiClient api;
  final UsuarioLocalDb db;
  final Map<int, Usuario> _memoria = {};

  UsuarioRepositoryImpl({required this.api, required this.db});

  @override
  Future<Usuario> buscar(int id) async {
    // 1) cache em memória — instantâneo
    if (_memoria.containsKey(id)) return _memoria[id]!;

    // 2) banco local — rápido, funciona offline
    final local = await db.buscar(id);
    if (local != null) {
      _memoria[id] = local;
      return local;
    }

    // 3) rede — última opção
    final fresco = await api.usuario(id);
    await db.salvar(fresco);   // alimenta cache offline
    _memoria[id] = fresco;
    return fresco;
  }

  @override
  Future<List<Usuario>> listar() async {
    try {
      final remotos = await api.listarUsuarios();
      await db.salvarTodos(remotos);
      return remotos;
    } catch (_) {
      // Se a rede caiu, devolve o que tem em cache
      return db.listar();
    }
  }

  @override
  Future<void> salvar(Usuario u) async {
    await api.salvar(u);
    await db.salvar(u);
    _memoria[u.id] = u;
  }
}`}),e.jsx(a,{title:"uso na ViewModel",code:`class HomeViewModel extends ChangeNotifier {
  final UsuarioRepository repo;   // depende da INTERFACE
  HomeViewModel(this.repo);

  List<Usuario> usuarios = [];
  bool carregando = false;

  Future<void> carregar() async {
    carregando = true; notifyListeners();
    usuarios = await repo.listar();
    carregando = false; notifyListeners();
  }
}`}),e.jsx("h2",{children:"Testabilidade"}),e.jsx("p",{children:"Como a ViewModel depende da interface, no teste você passa um mock que retorna dados controlados. Sem precisar de mock de HTTP, sem banco real."}),e.jsx(a,{title:"test/home_viewmodel_test.dart",code:`class _RepoFake implements UsuarioRepository {
  @override
  Future<List<Usuario>> listar() async => [
    const Usuario(id: 1, nome: 'Ana'),
  ];
  @override Future<Usuario> buscar(int id) async => const Usuario(id: 1, nome: 'Ana');
  @override Future<void> salvar(Usuario u) async {}
}

void main() {
  test('carrega usuários', () async {
    final vm = HomeViewModel(_RepoFake());
    await vm.carregar();
    expect(vm.usuarios.length, 1);
    expect(vm.usuarios.first.nome, 'Ana');
  });
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Vazar tipos da rede"})," — não devolva ",e.jsx("code",{children:"UsuarioJson"})," ao chamador. Converta para ",e.jsx("code",{children:"Usuario"})," (entidade do domínio)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Repository virar pote de tudo"})," — se está com 30 métodos, divida por contexto (ex: ",e.jsx("code",{children:"UsuarioAuthRepository"})," + ",e.jsx("code",{children:"UsuarioPerfilRepository"}),")."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Misturar regra de UI no repo"})," — formatação de data e tradução são da camada de apresentação."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cachear sem expirar"})," — adicione TTL ou estratégia de invalidação ou seu app mostra dados velhos para sempre."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer de tratar offline"})," — sem fallback ao DB local, o app trava sem internet."]})]}),e.jsx(o,{type:"success",title:"Testabilidade é o maior ganho",children:"Como tudo depende da interface, mockar fica trivial. Testes de ViewModel/Bloc rodam sem rede, sem device, em milissegundos."}),e.jsx(o,{type:"warning",title:"Não confunda com DAO",children:'DAO (Data Access Object) é específico de banco. Repository é mais amplo: pode combinar DAO + cliente HTTP + cache + WebSocket. Pense no repo como porta única para "obter dados de X".'}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(o,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Devolva ",e.jsx("code",{children:"Stream"})," em vez de ",e.jsx("code",{children:"Future"})," quando os dados podem mudar (Firestore, WebSocket)."]}),e.jsxs("li",{children:["Combine com ",e.jsx("em",{children:"Clean Architecture"}),": interface no domain, impl em data."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"get_it"}),"/",e.jsx("code",{children:"provider"}),"/",e.jsx("code",{children:"riverpod"})," para injetar a impl correta no app real e o fake nos testes."]}),e.jsxs("li",{children:["Trate erros aqui (timeout, 4xx, 5xx) e suba ",e.jsx("code",{children:"Failure"}),"s tipados — não ",e.jsx("code",{children:"HttpException"}),"."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Veja ",e.jsx("em",{children:"Clean Architecture"})," para encaixar o Repository no quadro completo, e ",e.jsx("em",{children:"MVVM"})," para conectar com a UI."]}),e.jsx(o,{type:"info",children:"Repository é uma das peças mais reusáveis de qualquer app sério. Vale praticar isso cedo."})]})}export{t as default};
