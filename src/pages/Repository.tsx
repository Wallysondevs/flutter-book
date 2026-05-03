import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Repository() {
  return (
    <PageContainer
      title="Repository Pattern"
      subtitle="Esconda API, cache e banco atrás de uma única interface limpa."
      difficulty="intermediario"
      timeToRead="11 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Imagine que sua tela de produtos chama <code>http.get(...)</code>
        direto. Amanhã você quer adicionar cache offline. Depois, trocar de
        REST para GraphQL. Cada mudança espalha consequências por dezenas de
        arquivos. O <strong>Repository Pattern</strong> resolve isso: a UI
        conversa com uma <em>interface</em>, e quem decide se busca da rede,
        cache ou banco é uma classe escondida atrás dela.
      </p>

      <h2>O conceito</h2>
      <p>
        Um <strong>Repository</strong> é uma fachada para acessar dados de uma
        entidade do seu domínio (Usuário, Pedido, Produto). Ele pode combinar
        múltiplas fontes (<em>datasources</em>): API remota, cache em memória,
        banco local. A regra é:
      </p>
      <ul>
        <li>A <strong>interface</strong> mora no domínio (puro Dart).</li>
        <li>A <strong>implementação</strong> mora na camada de dados.</li>
        <li>A UI/ViewModel só conhece a interface — nunca a implementação.</li>
      </ul>
      <p>
        Analogia: pense num atendente de banco. Você pede "extrato"; ele decide
        se busca no sistema, no cache ou no microfilme. Você não quer saber.
      </p>

      <h2>Como o Flutter faz</h2>
      <p>
        Em Dart, a interface é uma <code>abstract class</code> ou
        <code>interface class</code> (Dart 3+). A implementação injeta os
        datasources via construtor.
      </p>

      <CodeBlock title="domain — interface" code={`abstract class UsuarioRepository {
  Future<Usuario> buscar(int id);
  Future<List<Usuario>> listar();
  Future<void> salvar(Usuario u);
}`} />

      <h2>Exemplo prático: cache + remoto + offline</h2>
      <p>
        Implementação real: tenta cache em memória, depois banco local, depois
        rede. Salva a resposta da rede no banco para uso offline futuro.
      </p>

      <CodeBlock title="data — implementação" code={`class UsuarioRepositoryImpl implements UsuarioRepository {
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
}`} />

      <CodeBlock title="uso na ViewModel" code={`class HomeViewModel extends ChangeNotifier {
  final UsuarioRepository repo;   // depende da INTERFACE
  HomeViewModel(this.repo);

  List<Usuario> usuarios = [];
  bool carregando = false;

  Future<void> carregar() async {
    carregando = true; notifyListeners();
    usuarios = await repo.listar();
    carregando = false; notifyListeners();
  }
}`} />

      <h2>Testabilidade</h2>
      <p>
        Como a ViewModel depende da interface, no teste você passa um mock que
        retorna dados controlados. Sem precisar de mock de HTTP, sem banco real.
      </p>

      <CodeBlock title="test/home_viewmodel_test.dart" code={`class _RepoFake implements UsuarioRepository {
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
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Vazar tipos da rede</strong> — não devolva <code>UsuarioJson</code> ao chamador. Converta para <code>Usuario</code> (entidade do domínio).</li>
        <li><strong>Repository virar pote de tudo</strong> — se está com 30 métodos, divida por contexto (ex: <code>UsuarioAuthRepository</code> + <code>UsuarioPerfilRepository</code>).</li>
        <li><strong>Misturar regra de UI no repo</strong> — formatação de data e tradução são da camada de apresentação.</li>
        <li><strong>Cachear sem expirar</strong> — adicione TTL ou estratégia de invalidação ou seu app mostra dados velhos para sempre.</li>
        <li><strong>Esquecer de tratar offline</strong> — sem fallback ao DB local, o app trava sem internet.</li>
      </ul>

      <AlertBox type="success" title="Testabilidade é o maior ganho">
        Como tudo depende da interface, mockar fica trivial. Testes de
        ViewModel/Bloc rodam sem rede, sem device, em milissegundos.
      </AlertBox>

      <AlertBox type="warning" title="Não confunda com DAO">
        DAO (Data Access Object) é específico de banco. Repository é mais
        amplo: pode combinar DAO + cliente HTTP + cache + WebSocket. Pense no
        repo como porta única para "obter dados de X".
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Devolva <code>Stream</code> em vez de <code>Future</code> quando os dados podem mudar (Firestore, WebSocket).</li>
          <li>Combine com <em>Clean Architecture</em>: interface no domain, impl em data.</li>
          <li>Use <code>get_it</code>/<code>provider</code>/<code>riverpod</code> para injetar a impl correta no app real e o fake nos testes.</li>
          <li>Trate erros aqui (timeout, 4xx, 5xx) e suba <code>Failure</code>s tipados — não <code>HttpException</code>.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Veja <em>Clean Architecture</em> para encaixar o Repository no quadro
        completo, e <em>MVVM</em> para conectar com a UI.
      </p>
      <AlertBox type="info">
        Repository é uma das peças mais reusáveis de qualquer app sério. Vale
        praticar isso cedo.
      </AlertBox>
    </PageContainer>
  );
}
