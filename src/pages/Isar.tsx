import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Isar() {
  return (
    <PageContainer
      title="Isar"
      subtitle="Banco moderno em Dart — queries indexadas, full-text search e performance absurda."
      difficulty="avancado"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quando o Hive resolve seu problema, fique no Hive. Mas quando você precisa <strong>filtrar centenas de milhares de registros</strong>, fazer <strong>busca textual</strong>, garantir <strong>transações ACID</strong> e ainda manter o app fluido a 60/120fps, o Isar é a escolha que mais aparece em apps Flutter sérios. Ele foi escrito do zero pensando em mobile e em Dart.
      </p>

      <h2>O conceito</h2>
      <p>
        Isar é um banco <strong>NoSQL orientado a documentos</strong> com:
      </p>
      <ul>
        <li><strong>Coleções</strong> tipadas (cada classe vira uma "tabela").</li>
        <li><strong>Índices</strong> declarativos para acelerar buscas.</li>
        <li><strong>Queries fluentes</strong> em Dart puro — sem strings de SQL.</li>
        <li><strong>Transações</strong> síncronas e assíncronas com garantia ACID.</li>
        <li><strong>Watchers</strong> que emitem mudanças em tempo real.</li>
        <li><strong>Cross-platform</strong> incluindo desktop e web (com WASM).</li>
      </ul>

      <AlertBox type="info" title="Hive vs Isar (mesmo autor)">
        Mesmo time, evolução da ideia. Hive = chave-valor simples. Isar = banco completo com queries e índices.
      </AlertBox>

      <h2>Como Flutter/Dart faz</h2>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  isar: ^3.1.0
  isar_flutter_libs: ^3.1.0
  path_provider: ^2.1.0

dev_dependencies:
  isar_generator: ^3.1.0
  build_runner: ^2.4.0`} />

      <p>
        Defina uma coleção com anotações:
      </p>

      <CodeBlock title="lib/models/usuario.dart" code={`import 'package:isar/isar.dart';

part 'usuario.g.dart'; // gerado pelo build_runner

@collection
class Usuario {
  Id id = Isar.autoIncrement; // chave primária

  late String nome;

  @Index(caseSensitive: false) // acelera buscas por email
  late String email;

  @Index(type: IndexType.value, composite: [CompositeIndex('nome')])
  late int idade;
}`} />

      <p>
        Gere o código:
      </p>

      <CodeBlock title="terminal" code={`dart run build_runner build --delete-conflicting-outputs`} />

      <h2>Inicializando e usando</h2>

      <CodeBlock title="lib/db/isar_service.dart" code={`import 'package:isar/isar.dart';
import 'package:path_provider/path_provider.dart';

class IsarService {
  late final Future<Isar> _db;

  IsarService() {
    _db = _abrir();
  }

  Future<Isar> _abrir() async {
    final dir = await getApplicationDocumentsDirectory();
    return Isar.open(
      [UsuarioSchema], // schema gerado pelo isar_generator
      directory: dir.path,
      inspector: true, // habilita Isar Inspector em debug
    );
  }

  Future<int> criar(Usuario u) async {
    final isar = await _db;
    return isar.writeTxn(() => isar.usuarios.put(u));
  }

  Future<List<Usuario>> buscarPorNome(String parcial) async {
    final isar = await _db;
    return isar.usuarios
        .filter()
        .nomeContains(parcial, caseSensitive: false)
        .sortByNome()
        .findAll();
  }

  Stream<List<Usuario>> assistirTodos() async* {
    final isar = await _db;
    yield* isar.usuarios.where().watch(fireImmediately: true);
  }
}`} />

      <h2>Exemplo prático: query com índice</h2>
      <p>
        O grande pulo do gato do Isar é a query tipada. O autocomplete da IDE te guia campo a campo:
      </p>

      <CodeBlock title="queries comuns" code={`// Adultos ordenados por idade
final adultos = await isar.usuarios
    .filter()
    .idadeGreaterThan(17)
    .sortByIdade()
    .findAll();

// Por email exato (índice acelera)
final user = await isar.usuarios
    .filter()
    .emailEqualTo('ana@x.com')
    .findFirst();

// Combinando filtros
final filtrados = await isar.usuarios
    .filter()
    .nomeStartsWith('A')
    .and()
    .idadeBetween(18, 30)
    .limit(50)
    .findAll();

// Atualização em transação
await isar.writeTxn(() async {
  user!.nome = 'Ana Silva';
  await isar.usuarios.put(user);
});

// Reagindo a mudanças (perfeito para StreamBuilder)
isar.usuarios.where().watch().listen((todos) {
  print('agora há \${todos.length} usuários');
});`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer <code>writeTxn</code></strong>: escritas fora de transação lançam exceção.</li>
        <li><strong>Mudar tipo de campo entre versões</strong>: pode corromper o banco. Migre com cuidado.</li>
        <li><strong>Esperar joins relacionais</strong>: Isar tem <code>links</code>, mas o modelo é diferente de SQL — pense em referências.</li>
        <li><strong>Criar índices de tudo</strong>: índices ocupam espaço e desaceleram escritas. Indexe só o que você consulta.</li>
        <li><strong>Não rodar o build_runner</strong>: nada compila, e o erro pode ser confuso.</li>
      </ul>

      <AlertBox type="warning" title="Isar v3 vs v4">
        A versão 4 está em beta com mudanças significativas. Para apps em produção hoje (2024-2025), v3 é a escolha estável.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Padrões que escalam">
        <ul>
          <li>Encapsule o Isar em um <code>IsarService</code> singleton e injete pelo app.</li>
          <li>Sempre faça escritas dentro de <code>writeTxn</code> — agrupe quando possível.</li>
          <li>Use <code>watch()</code> em vez de re-buscar manualmente quando a UI precisa atualizar.</li>
          <li>Habilite o <strong>Isar Inspector</strong> em debug — é como um DevTools para o banco.</li>
          <li>Para apps multiplataforma com web, inclua o pacote correto e teste cedo.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Combine com Riverpod ou Bloc para expor os <code>Stream</code>s do Isar como estado reativo. Para sincronização com backend, modele uma camada de "repositório" que decida quando ler do Isar (cache) e quando bater na API.
      </p>

      <AlertBox type="success" title="Você já consegue">
        Persistir e consultar grandes volumes de dados com performance de produção, queries tipadas e UI reativa.
      </AlertBox>
    </PageContainer>
  );
}
