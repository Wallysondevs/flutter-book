import{j as e}from"./index-D4AOhXGO.js";import{P as r,A as a,C as i}from"./AlertBox-Dyf2wdSA.js";function t(){return e.jsxs(r,{title:"sqflite",subtitle:"SQLite local — para listas, relacionamentos e queries de verdade dentro do app.",difficulty:"intermediario",timeToRead:"15 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quando o app precisa funcionar ",e.jsx("strong",{children:"offline"}),", guardar ",e.jsx("strong",{children:"centenas ou milhares de registros"})," ou fazer ",e.jsx("strong",{children:"buscas filtradas"}),' (ex.: "todos os pedidos não enviados nos últimos 7 dias"), ',e.jsx("code",{children:"SharedPreferences"})," não dá conta. SQLite é o banco mais usado no mundo — está em todo iPhone e Android — e ",e.jsx("code",{children:"sqflite"})," é o pacote que expõe ele para Flutter, com a sintaxe SQL que você (talvez) já conhece."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["SQLite é um banco relacional ",e.jsx("strong",{children:"embutido"})," — não há servidor, é apenas um arquivo no dispositivo. Você abre, executa SQL, fecha. O ",e.jsx("code",{children:"sqflite"})," traz isso para o Dart com:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"openDatabase"})," — abre/cria o arquivo do banco."]}),e.jsxs("li",{children:[e.jsx("code",{children:"onCreate"})," — roda só na primeira vez (cria tabelas)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"onUpgrade"})," — roda quando você sobe a ",e.jsx("code",{children:"version"})," (migrations)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"insert/update/delete/query"})," — helpers tipados em vez de SQL puro."]}),e.jsxs("li",{children:[e.jsx("code",{children:"rawQuery"})," — quando o helper não basta, escreve SQL na mão."]})]}),e.jsxs(a,{type:"info",title:"Quem é Drift?",children:["Se SQL na mão te assusta, ",e.jsx("code",{children:"drift"})," (antigo moor) é uma camada por cima do sqflite que gera código tipado e queries seguras em compile time. Vale conhecer depois."]}),e.jsx("h2",{children:"Como Flutter/Dart faz"}),e.jsx(i,{title:"pubspec.yaml",code:`dependencies:
  sqflite: ^2.3.0
  path: ^1.9.0`}),e.jsx(i,{title:"lib/db/database.dart",code:`import 'package:path/path.dart';
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
}`}),e.jsx("h2",{children:"Exemplo prático: repositório de tarefas"}),e.jsx("p",{children:"Sempre encapsule o banco atrás de um repositório. A UI nunca deve enxergar SQL."}),e.jsx(i,{title:"lib/db/tarefas_repo.dart",code:`import 'package:sqflite/sqflite.dart';

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
}`}),e.jsx("h2",{children:"Migrations: evoluindo o schema"}),e.jsxs("p",{children:["Quando você precisa adicionar uma coluna nova depois do app já estar nas mãos dos usuários, suba a ",e.jsx("code",{children:"version"})," e implemente ",e.jsx("code",{children:"onUpgrade"}),":"]}),e.jsx(i,{title:"onUpgrade",code:`openDatabase(
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
);`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar ",e.jsx("code",{children:"?"})," com interpolação em vez de ",e.jsx("code",{children:"whereArgs"})]}),": vira SQL injection. Sempre use placeholders."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer de subir a ",e.jsx("code",{children:"version"})]}),": ",e.jsx("code",{children:"onUpgrade"})," nunca roda."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Booleano e DateTime"}),": SQLite não tem; converta para ",e.jsx("code",{children:"int"})," e ",e.jsx("code",{children:"String ISO"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Operações pesadas no isolate principal"}),": para muitas inserções, use ",e.jsx("code",{children:"db.transaction()"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Abrir o banco várias vezes"}),": mantenha um singleton."]})]}),e.jsxs(a,{type:"warning",title:"Web não é suportado nativamente",children:[e.jsx("code",{children:"sqflite"})," roda em mobile e desktop. Para web, use ",e.jsx("code",{children:"sqflite_common_ffi_web"})," ou troque por Hive/Isar."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(a,{type:"tip",title:"Padrões úteis",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"db.transaction((txn) async { ... })"})," para operações em lote — fica muito mais rápido."]}),e.jsxs("li",{children:["Indexe colunas usadas em ",e.jsx("code",{children:"WHERE"})," com ",e.jsx("code",{children:"CREATE INDEX"}),"."]}),e.jsx("li",{children:"Mantenha um arquivo de migrations versionado e teste cada um."}),e.jsxs("li",{children:["Encapsule SQL no repositório — UI fala em ",e.jsx("code",{children:"Tarefa"}),", não em ",e.jsx("code",{children:"Map"}),"."]}),e.jsxs("li",{children:["Se o app é multiplataforma com web, considere ",e.jsx("strong",{children:"Drift"})," ou ",e.jsx("strong",{children:"Isar"})," desde o início."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Combine com o capítulo de ",e.jsx("strong",{children:"FutureBuilder"}),' para listar dados na UI ou com Riverpod/Bloc para reatividade. Para um banco mais "dart-friendly" sem SQL, veja ',e.jsx("strong",{children:"Hive"})," e ",e.jsx("strong",{children:"Isar"}),"."]}),e.jsx(a,{type:"success",title:"Você já consegue",children:"Guardar listas grandes, fazer queries filtradas e evoluir o schema sem perder dados dos usuários."})]})}export{t as default};
