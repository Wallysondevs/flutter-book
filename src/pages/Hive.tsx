import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Hive() {
  return (
    <PageContainer
      title="Hive"
      subtitle="Banco NoSQL puro Dart — rápido, leve e ideal quando você não precisa de SQL."
      difficulty="intermediario"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Nem todo dado merece uma tabela com colunas. Às vezes você só quer salvar uma <strong>lista de favoritos</strong>, um <strong>cache de respostas da API</strong> ou um objeto de <strong>perfil do usuário</strong>. Para esses casos, abrir um SQLite, criar tabela, escrever <code>INSERT</code>... é exagero. O <strong>Hive</strong> entrega persistência <em>chave-valor</em> em puro Dart, ridiculamente rápido e sem dependências nativas.
      </p>

      <h2>O conceito</h2>
      <p>
        Pense no Hive como um <em>Map persistente</em>. A unidade básica é a <strong>Box</strong>: um arquivo no disco que se comporta como um <code>Map</code>. Você abre uma box, faz <code>put/get</code>, e pronto.
      </p>
      <ul>
        <li><strong>Box tipada</strong>: <code>Box&lt;String&gt;</code>, <code>Box&lt;int&gt;</code> ou <code>Box&lt;MeuObjeto&gt;</code>.</li>
        <li><strong>TypeAdapter</strong>: para guardar objetos próprios, você ensina o Hive a serializar (geralmente via code-gen).</li>
        <li><strong>LazyBox</strong>: carrega valores sob demanda — para dados grandes.</li>
        <li><strong>Sem SQL</strong>: queries são <code>box.values.where(...)</code> em Dart puro.</li>
      </ul>

      <AlertBox type="info" title="Quando Hive brilha">
        Cache de API, configurações estruturadas, listas de favoritos, sincronização offline simples. Para relacionamentos complexos com joins, prefira sqflite/Drift/Isar.
      </AlertBox>

      <h2>Como Flutter/Dart faz</h2>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  hive: ^2.2.3
  hive_flutter: ^1.1.0

dev_dependencies:
  hive_generator: ^2.0.1
  build_runner: ^2.4.0`} />

      <p>
        Inicialize uma vez no <code>main()</code>:
      </p>

      <CodeBlock title="lib/main.dart" code={`import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Cria a pasta de dados do Hive (caminho específico de cada plataforma).
  await Hive.initFlutter();

  // Abre boxes que vão ficar disponíveis durante todo o app.
  await Hive.openBox<String>('settings');

  runApp(const MeuApp());
}`} />

      <h2>Uso básico de uma Box</h2>

      <CodeBlock title="settings simples" code={`final box = Hive.box<String>('settings');

await box.put('idioma', 'pt-BR');
await box.put('tema', 'escuro');

final idioma = box.get('idioma'); // 'pt-BR'

// Apagar
await box.delete('tema');

// Iterar
for (final chave in box.keys) {
  print('\$chave => \${box.get(chave)}');
}`} />

      <h2>Exemplo prático: guardando objetos próprios</h2>
      <p>
        Para guardar um <code>Tarefa</code>, você precisa de um <strong>TypeAdapter</strong>. O <code>hive_generator</code> escreve isso para você:
      </p>

      <CodeBlock title="lib/models/tarefa.dart" code={`import 'package:hive/hive.dart';

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
}`} />

      <CodeBlock title="registrando o adapter" code={`Future<void> bootstrap() async {
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
await t.save();`} />

      <p>
        Para reagir a mudanças na UI, use <code>ValueListenableBuilder</code>:
      </p>

      <CodeBlock title="UI reativa" code={`ValueListenableBuilder(
  valueListenable: Hive.box<Tarefa>('tarefas').listenable(),
  builder: (context, Box<Tarefa> box, _) {
    final tarefas = box.values.toList();
    return ListView.builder(
      itemCount: tarefas.length,
      itemBuilder: (_, i) => ListTile(title: Text(tarefas[i].titulo)),
    );
  },
)`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Mudar <code>typeId</code> ou índices de campos</strong>: corrompe os dados existentes. Trate como contrato imutável.</li>
        <li><strong>Esquecer de registrar o adapter</strong>: erro em runtime "no adapter for type X".</li>
        <li><strong>Abrir a box com tipo errado</strong>: <code>Hive.box&lt;String&gt;('x')</code> quando você gravou <code>Tarefa</code> = crash.</li>
        <li><strong>Usar Hive como cache de tela sem migration</strong>: ao publicar nova versão com campos novos, dê valores default.</li>
        <li><strong>Esperar full-text search</strong>: Hive não indexa. Para isso, vá de Isar.</li>
      </ul>

      <AlertBox type="warning" title="Hive não criptografa por padrão">
        Use <code>Hive.openBox(name, encryptionCipher: HiveAesCipher(key))</code> para criptografar — e guarde a chave no <code>flutter_secure_storage</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Receita estável">
        <ul>
          <li>Abra as boxes que o app inteiro usa no <code>main()</code> — depois é só <code>Hive.box(...)</code> síncrono.</li>
          <li>Uma box por "agregado" (tarefas, cache, settings) — não jogue tudo numa só.</li>
          <li>Documente os <code>typeId</code> em uma constante central.</li>
          <li>Para apps que precisam de queries complexas ou full-text, considere <strong>Isar</strong>.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Se sentir falta de queries indexadas, transações ACID e busca textual, o próximo passo natural é <strong>Isar</strong>. Para dados relacionais com joins, fique com <strong>sqflite</strong> ou <strong>Drift</strong>.
      </p>

      <AlertBox type="success" title="Você já consegue">
        Persistir objetos Dart de forma rápida, com UI reativa, sem escrever uma linha de SQL.
      </AlertBox>
    </PageContainer>
  );
}
