import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Isolates() {
  return (
    <PageContainer
      title="Isolates"
      subtitle="Threads de verdade em Dart — para trabalho pesado de CPU sem travar a UI."
      difficulty="avancado"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Você já sabe que <code>async/await</code> e Streams resolvem operações que <em>esperam</em> algo (rede, disco). Mas e quando o problema é <strong>processamento</strong> mesmo? Decodificar um JSON de 10MB, redimensionar uma foto, criptografar um arquivo, calcular SHA-256 numa lista enorme.
      </p>
      <p>
        Tudo isso ocupa a CPU. E como Dart é <strong>single-threaded</strong> por padrão, enquanto seu cálculo roda, a UI <em>congela</em> — animações param, toques não respondem, o usuário vê travamento. <code>async</code> não ajuda aqui: ele só ajuda a esperar; ainda roda na mesma thread.
      </p>
      <p>
        A solução são os <strong>Isolates</strong>: threads de verdade, com seu próprio heap, que rodam em paralelo à thread principal. Use-os toda vez que perceber jank em operações pesadas.
      </p>

      <h2>O conceito</h2>
      <p>
        Um Isolate é como um <strong>processo dentro do seu app</strong>: tem sua própria memória, seu próprio event loop, e <strong>não compartilha variáveis</strong> com ninguém. Para conversar entre Isolates, você manda <em>mensagens</em> (que são copiadas).
      </p>
      <ul>
        <li><strong>Sem shared state</strong> — não existe race condition, mutex, deadlock. Calmaria.</li>
        <li><strong>Mensagens são cópias</strong> — você manda dados, não referências. Para objetos pequenos, é instantâneo. Para objetos enormes, a cópia custa tempo.</li>
        <li><strong>Custo de criação</strong> — abrir um Isolate é mais caro que disparar um Future. Use para tarefas longas, não para coisinhas.</li>
      </ul>
      <p>
        Em Flutter, 99% dos casos são resolvidos por uma única função: <code>compute()</code>. Ela cria um isolate descartável, roda sua função lá, devolve o resultado e fecha. Limpa e simples.
      </p>

      <h2>Como Flutter faz: compute()</h2>
      <CodeBlock title="parser_pesado.dart" code={`import 'dart:convert';
import 'package:flutter/foundation.dart'; // compute()

class Item {
  final int id;
  final String nome;
  Item({required this.id, required this.nome});

  factory Item.fromJson(Map<String, dynamic> j) =>
      Item(id: j['id'], nome: j['name']);
}

// Função TOP-LEVEL ou estática — exigência do compute().
// Não pode ser closure que captura variáveis de fora.
List<Item> _parseItens(String raw) {
  final lista = jsonDecode(raw) as List;
  return lista
      .map((j) => Item.fromJson(j as Map<String, dynamic>))
      .toList();
}

// Wrapper público, async, fácil de usar.
Future<List<Item>> parsearItens(String raw) {
  // compute() = "rode esta função num isolate
  // separado, me devolva o resultado".
  return compute(_parseItens, raw);
}`} />

      <p>
        Pronto. Sem precisar entender de portas, mensagens, send/receive — <code>compute</code> esconde tudo. A UI continua responsiva mesmo se o JSON tiver 50MB.
      </p>

      <AlertBox type="info" title="Como saber se preciso de isolate?">
        Rode em um device real (não emulador) e olhe o DevTools de performance. Se uma função única consome &gt;16ms na thread principal, ela está causando jank. Mover para um isolate elimina esse engasgo.
      </AlertBox>

      <h2>Exemplo prático: hash de arquivo grande</h2>
      <p>
        Calcular SHA-256 de um arquivo de centenas de MB trava a UI por segundos. Com <code>compute</code>, vira invisível.
      </p>

      <CodeBlock title="hash_service.dart" code={`import 'dart:io';
import 'package:crypto/crypto.dart';
import 'package:flutter/foundation.dart';

// Função top-level: recebe o caminho, devolve o hash.
String _calcularHash(String path) {
  final bytes = File(path).readAsBytesSync();
  return sha256.convert(bytes).toString();
}

class HashService {
  Future<String> hashDoArquivo(String path) {
    return compute(_calcularHash, path);
  }
}

// Na UI:
// final h = await HashService().hashDoArquivo(meuPath);
// O usuário pode rolar a tela enquanto o hash calcula.`} />

      <h2>Quando compute() não basta: Isolate.spawn</h2>
      <p>
        <code>compute</code> é "uma tarefa, um resultado, fim". Quando você precisa de comunicação contínua (ex: um isolate worker que recebe vários trabalhos ao longo do tempo), use <code>Isolate.spawn</code> com <code>SendPort</code> e <code>ReceivePort</code>:
      </p>

      <CodeBlock title="worker_continuo.dart" code={`import 'dart:isolate';

void _worker(SendPort enviarParaPrincipal) {
  final receberAqui = ReceivePort();
  // Avisa o main qual porta usar para nos mandar trabalho.
  enviarParaPrincipal.send(receberAqui.sendPort);

  receberAqui.listen((mensagem) {
    if (mensagem is int) {
      final resultado = mensagem * mensagem;
      enviarParaPrincipal.send(resultado);
    }
  });
}

Future<void> rodar() async {
  final receberDoWorker = ReceivePort();
  await Isolate.spawn(_worker, receberDoWorker.sendPort);

  // Primeira mensagem é a porta de envio do worker.
  final iter = StreamIterator(receberDoWorker);
  await iter.moveNext();
  final mandarParaWorker = iter.current as SendPort;

  mandarParaWorker.send(7);
  await iter.moveNext();
  print('Quadrado de 7 = \${iter.current}'); // 49
}`} />

      <AlertBox type="warning" title="Não compartilham memória">
        Tudo que cruza a fronteira entre isolates é <strong>copiado</strong>. Você não pode "passar uma referência" para o widget tree. Para objetos imensos, considere <code>TransferableTypedData</code> (cópia zero de bytes) ou pacotes como <code>isar</code> que já lidam com isso.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Função não top-level</strong>: <code>compute(_parse, raw)</code> falha se <code>_parse</code> for método de instância ou closure. Tem que ser top-level ou static.</li>
        <li><strong>Tipos não-serializáveis</strong>: você não pode mandar um <code>BuildContext</code>, um <code>Widget</code> ou um socket aberto. Só dados (primitivos, listas, mapas, classes simples).</li>
        <li><strong>Custo de cópia</strong>: passar uma lista de 1 milhão de objetos custa caro só na transferência. Em alguns casos, parsear o JSON dentro do isolate (passando só a String) é mais rápido.</li>
        <li><strong>Usar isolate para coisinha</strong>: criar um isolate para somar dois números é desperdício. O setup leva milissegundos.</li>
        <li><strong>Esquecer de fechar</strong>: <code>Isolate.spawn</code> manual exige <code>isolate.kill()</code> quando termina. Caso contrário, vaza.</li>
        <li><strong>Plugins do Flutter no isolate</strong>: a maioria dos plugins (camera, geolocator, etc.) só funciona na thread principal. Não tente chamar <code>MethodChannel</code> de dentro de um isolate spawn comum (existem APIs específicas para isso).</li>
      </ul>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Comece sempre com <code>compute()</code> — só vá para <code>Isolate.spawn</code> se realmente precisar de comunicação contínua.</li>
          <li>Meça antes de otimizar: nem todo parse é lento. Use o DevTools.</li>
          <li>Para parsear JSON, considere passar só a String e deixar o <code>jsonDecode</code> rodar no isolate.</li>
          <li>Em apps que dependem disso de forma intensa, pacotes como <code>worker_manager</code> oferecem pool de isolates reutilizáveis.</li>
          <li>Lembre que a primeira chamada de <code>compute</code> tem latência de spawn (~10-50ms). Para microtasks repetidas, mantenha um isolate aberto via <code>Isolate.spawn</code>.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com Isolates, você fecha o trio do assincronismo em Dart: <strong>Future</strong> (1 valor depois), <strong>Stream</strong> (vários valores depois) e <strong>Isolate</strong> (computação em paralelo). Domine essas três ferramentas e poucos problemas de performance vão te assustar.
      </p>
      <AlertBox type="success">
        Próximos passos sugeridos: gerenciamento de estado em Flutter (<strong>Provider</strong>, <strong>Riverpod</strong>, <strong>BLoC</strong>) — onde Futures e Streams encontram a UI de verdade.
      </AlertBox>
    </PageContainer>
  );
}
