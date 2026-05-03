import{j as e}from"./index-D4AOhXGO.js";import{P as r,A as i,C as a}from"./AlertBox-Dyf2wdSA.js";function t(){return e.jsxs(r,{title:"Hive",subtitle:"Banco NoSQL puro Dart — rápido, leve e ideal quando você não precisa de SQL.",difficulty:"intermediario",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Nem todo dado merece uma tabela com colunas. Às vezes você só quer salvar uma ",e.jsx("strong",{children:"lista de favoritos"}),", um ",e.jsx("strong",{children:"cache de respostas da API"})," ou um objeto de ",e.jsx("strong",{children:"perfil do usuário"}),". Para esses casos, abrir um SQLite, criar tabela, escrever ",e.jsx("code",{children:"INSERT"}),"... é exagero. O ",e.jsx("strong",{children:"Hive"})," entrega persistência ",e.jsx("em",{children:"chave-valor"})," em puro Dart, ridiculamente rápido e sem dependências nativas."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Pense no Hive como um ",e.jsx("em",{children:"Map persistente"}),". A unidade básica é a ",e.jsx("strong",{children:"Box"}),": um arquivo no disco que se comporta como um ",e.jsx("code",{children:"Map"}),". Você abre uma box, faz ",e.jsx("code",{children:"put/get"}),", e pronto."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Box tipada"}),": ",e.jsx("code",{children:"Box<String>"}),", ",e.jsx("code",{children:"Box<int>"})," ou ",e.jsx("code",{children:"Box<MeuObjeto>"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"TypeAdapter"}),": para guardar objetos próprios, você ensina o Hive a serializar (geralmente via code-gen)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"LazyBox"}),": carrega valores sob demanda — para dados grandes."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sem SQL"}),": queries são ",e.jsx("code",{children:"box.values.where(...)"})," em Dart puro."]})]}),e.jsx(i,{type:"info",title:"Quando Hive brilha",children:"Cache de API, configurações estruturadas, listas de favoritos, sincronização offline simples. Para relacionamentos complexos com joins, prefira sqflite/Drift/Isar."}),e.jsx("h2",{children:"Como Flutter/Dart faz"}),e.jsx(a,{title:"pubspec.yaml",code:`dependencies:
  hive: ^2.2.3
  hive_flutter: ^1.1.0

dev_dependencies:
  hive_generator: ^2.0.1
  build_runner: ^2.4.0`}),e.jsxs("p",{children:["Inicialize uma vez no ",e.jsx("code",{children:"main()"}),":"]}),e.jsx(a,{title:"lib/main.dart",code:`import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Cria a pasta de dados do Hive (caminho específico de cada plataforma).
  await Hive.initFlutter();

  // Abre boxes que vão ficar disponíveis durante todo o app.
  await Hive.openBox<String>('settings');

  runApp(const MeuApp());
}`}),e.jsx("h2",{children:"Uso básico de uma Box"}),e.jsx(a,{title:"settings simples",code:`final box = Hive.box<String>('settings');

await box.put('idioma', 'pt-BR');
await box.put('tema', 'escuro');

final idioma = box.get('idioma'); // 'pt-BR'

// Apagar
await box.delete('tema');

// Iterar
for (final chave in box.keys) {
  print('$chave => \${box.get(chave)}');
}`}),e.jsx("h2",{children:"Exemplo prático: guardando objetos próprios"}),e.jsxs("p",{children:["Para guardar um ",e.jsx("code",{children:"Tarefa"}),", você precisa de um ",e.jsx("strong",{children:"TypeAdapter"}),". O ",e.jsx("code",{children:"hive_generator"})," escreve isso para você:"]}),e.jsx(a,{title:"lib/models/tarefa.dart",code:`import 'package:hive/hive.dart';

part 'tarefa.g.dart'; // gerado pelo build_runner

@HiveType(typeId: 0) // ID único por classe — nunca mude depois de publicar!
class Tarefa extends HiveObject {
  @HiveField(0)
  String titulo;

  @HiveField(1)
  bool feita;

  @HiveField(2)
  DateTime criadaEm;

  Tarefa({
    required this.titulo,
    this.feita = false,
    required this.criadaEm,
  });
}`}),e.jsx(a,{title:"registrando o adapter",code:`Future<void> bootstrap() async {
  await Hive.initFlutter();
  Hive.registerAdapter(TarefaAdapter()); // gerado em tarefa.g.dart
  await Hive.openBox<Tarefa>('tarefas');
}

// Uso
final box = Hive.box<Tarefa>('tarefas');

await box.add(Tarefa(
  titulo: 'Estudar Hive',
  criadaEm: DateTime.now(),
));

final pendentes = box.values.where((t) => !t.feita).toList();

// HiveObject permite salvar mudanças in-place:
final t = box.getAt(0)!;
t.feita = true;
await t.save();`}),e.jsxs("p",{children:["Para reagir a mudanças na UI, use ",e.jsx("code",{children:"ValueListenableBuilder"}),":"]}),e.jsx(a,{title:"UI reativa",code:`ValueListenableBuilder(
  valueListenable: Hive.box<Tarefa>('tarefas').listenable(),
  builder: (context, Box<Tarefa> box, _) {
    final tarefas = box.values.toList();
    return ListView.builder(
      itemCount: tarefas.length,
      itemBuilder: (_, i) => ListTile(title: Text(tarefas[i].titulo)),
    );
  },
)`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Mudar ",e.jsx("code",{children:"typeId"})," ou índices de campos"]}),": corrompe os dados existentes. Trate como contrato imutável."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer de registrar o adapter"}),': erro em runtime "no adapter for type X".']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Abrir a box com tipo errado"}),": ",e.jsx("code",{children:"Hive.box<String>('x')"})," quando você gravou ",e.jsx("code",{children:"Tarefa"})," = crash."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Usar Hive como cache de tela sem migration"}),": ao publicar nova versão com campos novos, dê valores default."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esperar full-text search"}),": Hive não indexa. Para isso, vá de Isar."]})]}),e.jsxs(i,{type:"warning",title:"Hive não criptografa por padrão",children:["Use ",e.jsx("code",{children:"Hive.openBox(name, encryptionCipher: HiveAesCipher(key))"})," para criptografar — e guarde a chave no ",e.jsx("code",{children:"flutter_secure_storage"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(i,{type:"tip",title:"Receita estável",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Abra as boxes que o app inteiro usa no ",e.jsx("code",{children:"main()"})," — depois é só ",e.jsx("code",{children:"Hive.box(...)"})," síncrono."]}),e.jsx("li",{children:'Uma box por "agregado" (tarefas, cache, settings) — não jogue tudo numa só.'}),e.jsxs("li",{children:["Documente os ",e.jsx("code",{children:"typeId"})," em uma constante central."]}),e.jsxs("li",{children:["Para apps que precisam de queries complexas ou full-text, considere ",e.jsx("strong",{children:"Isar"}),"."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Se sentir falta de queries indexadas, transações ACID e busca textual, o próximo passo natural é ",e.jsx("strong",{children:"Isar"}),". Para dados relacionais com joins, fique com ",e.jsx("strong",{children:"sqflite"})," ou ",e.jsx("strong",{children:"Drift"}),"."]}),e.jsx(i,{type:"success",title:"Você já consegue",children:"Persistir objetos Dart de forma rápida, com UI reativa, sem escrever uma linha de SQL."})]})}export{t as default};
