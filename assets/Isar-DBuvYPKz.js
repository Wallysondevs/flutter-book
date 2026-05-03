import{j as e}from"./index-D9yRYXwO.js";import{P as s,A as r,C as a}from"./AlertBox-B2Rl5ETq.js";function n(){return e.jsxs(s,{title:"Isar",subtitle:"Banco moderno em Dart — queries indexadas, full-text search e performance absurda.",difficulty:"avancado",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quando o Hive resolve seu problema, fique no Hive. Mas quando você precisa ",e.jsx("strong",{children:"filtrar centenas de milhares de registros"}),", fazer ",e.jsx("strong",{children:"busca textual"}),", garantir ",e.jsx("strong",{children:"transações ACID"})," e ainda manter o app fluido a 60/120fps, o Isar é a escolha que mais aparece em apps Flutter sérios. Ele foi escrito do zero pensando em mobile e em Dart."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Isar é um banco ",e.jsx("strong",{children:"NoSQL orientado a documentos"})," com:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Coleções"}),' tipadas (cada classe vira uma "tabela").']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Índices"})," declarativos para acelerar buscas."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Queries fluentes"})," em Dart puro — sem strings de SQL."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Transações"})," síncronas e assíncronas com garantia ACID."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Watchers"})," que emitem mudanças em tempo real."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cross-platform"})," incluindo desktop e web (com WASM)."]})]}),e.jsx(r,{type:"info",title:"Hive vs Isar (mesmo autor)",children:"Mesmo time, evolução da ideia. Hive = chave-valor simples. Isar = banco completo com queries e índices."}),e.jsx("h2",{children:"Como Flutter/Dart faz"}),e.jsx(a,{title:"pubspec.yaml",code:`dependencies:
  isar: ^3.1.0
  isar_flutter_libs: ^3.1.0
  path_provider: ^2.1.0

dev_dependencies:
  isar_generator: ^3.1.0
  build_runner: ^2.4.0`}),e.jsx("p",{children:"Defina uma coleção com anotações:"}),e.jsx(a,{title:"lib/models/usuario.dart",code:`import 'package:isar/isar.dart';

part 'usuario.g.dart'; // gerado pelo build_runner

@collection
class Usuario {
  Id id = Isar.autoIncrement; // chave primária

  late String nome;

  @Index(caseSensitive: false) // acelera buscas por email
  late String email;

  @Index(type: IndexType.value, composite: [CompositeIndex('nome')])
  late int idade;
}`}),e.jsx("p",{children:"Gere o código:"}),e.jsx(a,{title:"terminal",code:"dart run build_runner build --delete-conflicting-outputs"}),e.jsx("h2",{children:"Inicializando e usando"}),e.jsx(a,{title:"lib/db/isar_service.dart",code:`import 'package:isar/isar.dart';
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
}`}),e.jsx("h2",{children:"Exemplo prático: query com índice"}),e.jsx("p",{children:"O grande pulo do gato do Isar é a query tipada. O autocomplete da IDE te guia campo a campo:"}),e.jsx(a,{title:"queries comuns",code:`// Adultos ordenados por idade
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
});`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"writeTxn"})]}),": escritas fora de transação lançam exceção."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mudar tipo de campo entre versões"}),": pode corromper o banco. Migre com cuidado."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esperar joins relacionais"}),": Isar tem ",e.jsx("code",{children:"links"}),", mas o modelo é diferente de SQL — pense em referências."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Criar índices de tudo"}),": índices ocupam espaço e desaceleram escritas. Indexe só o que você consulta."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Não rodar o build_runner"}),": nada compila, e o erro pode ser confuso."]})]}),e.jsx(r,{type:"warning",title:"Isar v3 vs v4",children:"A versão 4 está em beta com mudanças significativas. Para apps em produção hoje (2024-2025), v3 é a escolha estável."}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(r,{type:"tip",title:"Padrões que escalam",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Encapsule o Isar em um ",e.jsx("code",{children:"IsarService"})," singleton e injete pelo app."]}),e.jsxs("li",{children:["Sempre faça escritas dentro de ",e.jsx("code",{children:"writeTxn"})," — agrupe quando possível."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"watch()"})," em vez de re-buscar manualmente quando a UI precisa atualizar."]}),e.jsxs("li",{children:["Habilite o ",e.jsx("strong",{children:"Isar Inspector"})," em debug — é como um DevTools para o banco."]}),e.jsx("li",{children:"Para apps multiplataforma com web, inclua o pacote correto e teste cedo."})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Combine com Riverpod ou Bloc para expor os ",e.jsx("code",{children:"Stream"}),'s do Isar como estado reativo. Para sincronização com backend, modele uma camada de "repositório" que decida quando ler do Isar (cache) e quando bater na API.']}),e.jsx(r,{type:"success",title:"Você já consegue",children:"Persistir e consultar grandes volumes de dados com performance de produção, queries tipadas e UI reativa."})]})}export{n as default};
