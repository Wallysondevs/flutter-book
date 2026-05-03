import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Sqflite() {
  return (
    <PageContainer
      title="sqflite"
      subtitle="SQLite local — para listas, relacionamentos e queries de verdade dentro do app."
      difficulty="intermediario"
      timeToRead="15 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quando o app precisa funcionar <strong>offline</strong>, guardar <strong>centenas ou milhares de registros</strong> ou fazer <strong>buscas filtradas</strong> (ex.: "todos os pedidos não enviados nos últimos 7 dias"), <code>SharedPreferences</code> não dá conta. SQLite é o banco mais usado no mundo — está em todo iPhone e Android — e <code>sqflite</code> é o pacote que expõe ele para Flutter, com a sintaxe SQL que você (talvez) já conhece.
      </p>

      <h2>O conceito</h2>
      <p>
        SQLite é um banco relacional <strong>embutido</strong> — não há servidor, é apenas um arquivo no dispositivo. Você abre, executa SQL, fecha. O <code>sqflite</code> traz isso para o Dart com:
      </p>
      <ul>
        <li><code>openDatabase</code> — abre/cria o arquivo do banco.</li>
        <li><code>onCreate</code> — roda só na primeira vez (cria tabelas).</li>
        <li><code>onUpgrade</code> — roda quando você sobe a <code>version</code> (migrations).</li>
        <li><code>insert/update/delete/query</code> — helpers tipados em vez de SQL puro.</li>
        <li><code>rawQuery</code> — quando o helper não basta, escreve SQL na mão.</li>
      </ul>

      <AlertBox type="info" title="Quem é Drift?">
        Se SQL na mão te assusta, <code>drift</code> (antigo moor) é uma camada por cima do sqflite que gera código tipado e queries seguras em compile time. Vale conhecer depois.
      </AlertBox>

      <h2>Como Flutter/Dart faz</h2>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  sqflite: ^2.3.0
  path: ^1.9.0`} />

      <CodeBlock title="lib/db/database.dart" code={`import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

Future<Database> abrirBanco() async {
  // Caminho seguro multiplataforma para o arquivo do banco.
  final dir = await getDatabasesPath();
  final caminho = join(dir, 'meu_app.db');

  return openDatabase(
    caminho,
    version: 1,
    onCreate: (db, versao) async {
      await db.execute('''
        CREATE TABLE tarefas(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT NOT NULL,
          feita INTEGER NOT NULL DEFAULT 0,
          criada_em TEXT NOT NULL
        )
      ''');
    },
  );
}`} />

      <h2>Exemplo prático: repositório de tarefas</h2>
      <p>
        Sempre encapsule o banco atrás de um repositório. A UI nunca deve enxergar SQL.
      </p>

      <CodeBlock title="lib/db/tarefas_repo.dart" code={`import 'package:sqflite/sqflite.dart';

class Tarefa {
  final int? id;
  final String titulo;
  final bool feita;
  final DateTime criadaEm;

  Tarefa({
    this.id,
    required this.titulo,
    this.feita = false,
    required this.criadaEm,
  });

  Map<String, Object?> toMap() => {
        'id': id,
        'titulo': titulo,
        'feita': feita ? 1 : 0,        // SQLite não tem bool nativo
        'criada_em': criadaEm.toIso8601String(),
      };

  factory Tarefa.fromMap(Map<String, Object?> m) => Tarefa(
        id: m['id'] as int?,
        titulo: m['titulo'] as String,
        feita: (m['feita'] as int) == 1,
        criadaEm: DateTime.parse(m['criada_em'] as String),
      );
}

class TarefasRepo {
  final Database db;
  TarefasRepo(this.db);

  Future<int> criar(Tarefa t) =>
      db.insert('tarefas', t.toMap()..remove('id'));

  Future<List<Tarefa>> listarPendentes() async {
    final linhas = await db.query(
      'tarefas',
      where: 'feita = ?',
      whereArgs: [0],
      orderBy: 'criada_em DESC',
    );
    return linhas.map(Tarefa.fromMap).toList();
  }

  Future<int> marcarFeita(int id) => db.update(
        'tarefas',
        {'feita': 1},
        where: 'id = ?',
        whereArgs: [id],
      );

  Future<int> remover(int id) =>
      db.delete('tarefas', where: 'id = ?', whereArgs: [id]);
}`} />

      <h2>Migrations: evoluindo o schema</h2>
      <p>
        Quando você precisa adicionar uma coluna nova depois do app já estar nas mãos dos usuários, suba a <code>version</code> e implemente <code>onUpgrade</code>:
      </p>

      <CodeBlock title="onUpgrade" code={`openDatabase(
  caminho,
  version: 2, // antes era 1
  onCreate: (db, v) async { /* ... */ },
  onUpgrade: (db, antiga, nova) async {
    if (antiga < 2) {
      await db.execute(
        'ALTER TABLE tarefas ADD COLUMN prioridade INTEGER DEFAULT 0',
      );
    }
  },
);`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Usar <code>?</code> com interpolação em vez de <code>whereArgs</code></strong>: vira SQL injection. Sempre use placeholders.</li>
        <li><strong>Esquecer de subir a <code>version</code></strong>: <code>onUpgrade</code> nunca roda.</li>
        <li><strong>Booleano e DateTime</strong>: SQLite não tem; converta para <code>int</code> e <code>String ISO</code>.</li>
        <li><strong>Operações pesadas no isolate principal</strong>: para muitas inserções, use <code>db.transaction()</code>.</li>
        <li><strong>Abrir o banco várias vezes</strong>: mantenha um singleton.</li>
      </ul>

      <AlertBox type="warning" title="Web não é suportado nativamente">
        <code>sqflite</code> roda em mobile e desktop. Para web, use <code>sqflite_common_ffi_web</code> ou troque por Hive/Isar.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Padrões úteis">
        <ul>
          <li>Use <code>{`db.transaction((txn) async { ... })`}</code> para operações em lote — fica muito mais rápido.</li>
          <li>Indexe colunas usadas em <code>WHERE</code> com <code>CREATE INDEX</code>.</li>
          <li>Mantenha um arquivo de migrations versionado e teste cada um.</li>
          <li>Encapsule SQL no repositório — UI fala em <code>Tarefa</code>, não em <code>Map</code>.</li>
          <li>Se o app é multiplataforma com web, considere <strong>Drift</strong> ou <strong>Isar</strong> desde o início.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Combine com o capítulo de <strong>FutureBuilder</strong> para listar dados na UI ou com Riverpod/Bloc para reatividade. Para um banco mais "dart-friendly" sem SQL, veja <strong>Hive</strong> e <strong>Isar</strong>.
      </p>

      <AlertBox type="success" title="Você já consegue">
        Guardar listas grandes, fazer queries filtradas e evoluir o schema sem perder dados dos usuários.
      </AlertBox>
    </PageContainer>
  );
}
