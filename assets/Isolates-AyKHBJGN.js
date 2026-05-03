import{j as e}from"./index-D9yRYXwO.js";import{P as s,C as r,A as a}from"./AlertBox-B2Rl5ETq.js";function n(){return e.jsxs(s,{title:"Isolates",subtitle:"Threads de verdade em Dart — para trabalho pesado de CPU sem travar a UI.",difficulty:"avancado",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Você já sabe que ",e.jsx("code",{children:"async/await"})," e Streams resolvem operações que ",e.jsx("em",{children:"esperam"})," algo (rede, disco). Mas e quando o problema é ",e.jsx("strong",{children:"processamento"})," mesmo? Decodificar um JSON de 10MB, redimensionar uma foto, criptografar um arquivo, calcular SHA-256 numa lista enorme."]}),e.jsxs("p",{children:["Tudo isso ocupa a CPU. E como Dart é ",e.jsx("strong",{children:"single-threaded"})," por padrão, enquanto seu cálculo roda, a UI ",e.jsx("em",{children:"congela"})," — animações param, toques não respondem, o usuário vê travamento. ",e.jsx("code",{children:"async"})," não ajuda aqui: ele só ajuda a esperar; ainda roda na mesma thread."]}),e.jsxs("p",{children:["A solução são os ",e.jsx("strong",{children:"Isolates"}),": threads de verdade, com seu próprio heap, que rodam em paralelo à thread principal. Use-os toda vez que perceber jank em operações pesadas."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um Isolate é como um ",e.jsx("strong",{children:"processo dentro do seu app"}),": tem sua própria memória, seu próprio event loop, e ",e.jsx("strong",{children:"não compartilha variáveis"})," com ninguém. Para conversar entre Isolates, você manda ",e.jsx("em",{children:"mensagens"})," (que são copiadas)."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Sem shared state"})," — não existe race condition, mutex, deadlock. Calmaria."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mensagens são cópias"})," — você manda dados, não referências. Para objetos pequenos, é instantâneo. Para objetos enormes, a cópia custa tempo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Custo de criação"})," — abrir um Isolate é mais caro que disparar um Future. Use para tarefas longas, não para coisinhas."]})]}),e.jsxs("p",{children:["Em Flutter, 99% dos casos são resolvidos por uma única função: ",e.jsx("code",{children:"compute()"}),". Ela cria um isolate descartável, roda sua função lá, devolve o resultado e fecha. Limpa e simples."]}),e.jsx("h2",{children:"Como Flutter faz: compute()"}),e.jsx(r,{title:"parser_pesado.dart",code:`import 'dart:convert';
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
}`}),e.jsxs("p",{children:["Pronto. Sem precisar entender de portas, mensagens, send/receive — ",e.jsx("code",{children:"compute"})," esconde tudo. A UI continua responsiva mesmo se o JSON tiver 50MB."]}),e.jsx(a,{type:"info",title:"Como saber se preciso de isolate?",children:"Rode em um device real (não emulador) e olhe o DevTools de performance. Se uma função única consome >16ms na thread principal, ela está causando jank. Mover para um isolate elimina esse engasgo."}),e.jsx("h2",{children:"Exemplo prático: hash de arquivo grande"}),e.jsxs("p",{children:["Calcular SHA-256 de um arquivo de centenas de MB trava a UI por segundos. Com ",e.jsx("code",{children:"compute"}),", vira invisível."]}),e.jsx(r,{title:"hash_service.dart",code:`import 'dart:io';
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
// O usuário pode rolar a tela enquanto o hash calcula.`}),e.jsx("h2",{children:"Quando compute() não basta: Isolate.spawn"}),e.jsxs("p",{children:[e.jsx("code",{children:"compute"}),' é "uma tarefa, um resultado, fim". Quando você precisa de comunicação contínua (ex: um isolate worker que recebe vários trabalhos ao longo do tempo), use ',e.jsx("code",{children:"Isolate.spawn"})," com ",e.jsx("code",{children:"SendPort"})," e ",e.jsx("code",{children:"ReceivePort"}),":"]}),e.jsx(r,{title:"worker_continuo.dart",code:`import 'dart:isolate';

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
}`}),e.jsxs(a,{type:"warning",title:"Não compartilham memória",children:["Tudo que cruza a fronteira entre isolates é ",e.jsx("strong",{children:"copiado"}),'. Você não pode "passar uma referência" para o widget tree. Para objetos imensos, considere ',e.jsx("code",{children:"TransferableTypedData"})," (cópia zero de bytes) ou pacotes como ",e.jsx("code",{children:"isar"})," que já lidam com isso."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Função não top-level"}),": ",e.jsx("code",{children:"compute(_parse, raw)"})," falha se ",e.jsx("code",{children:"_parse"})," for método de instância ou closure. Tem que ser top-level ou static."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tipos não-serializáveis"}),": você não pode mandar um ",e.jsx("code",{children:"BuildContext"}),", um ",e.jsx("code",{children:"Widget"})," ou um socket aberto. Só dados (primitivos, listas, mapas, classes simples)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Custo de cópia"}),": passar uma lista de 1 milhão de objetos custa caro só na transferência. Em alguns casos, parsear o JSON dentro do isolate (passando só a String) é mais rápido."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Usar isolate para coisinha"}),": criar um isolate para somar dois números é desperdício. O setup leva milissegundos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer de fechar"}),": ",e.jsx("code",{children:"Isolate.spawn"})," manual exige ",e.jsx("code",{children:"isolate.kill()"})," quando termina. Caso contrário, vaza."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Plugins do Flutter no isolate"}),": a maioria dos plugins (camera, geolocator, etc.) só funciona na thread principal. Não tente chamar ",e.jsx("code",{children:"MethodChannel"})," de dentro de um isolate spawn comum (existem APIs específicas para isso)."]})]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(a,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Comece sempre com ",e.jsx("code",{children:"compute()"})," — só vá para ",e.jsx("code",{children:"Isolate.spawn"})," se realmente precisar de comunicação contínua."]}),e.jsx("li",{children:"Meça antes de otimizar: nem todo parse é lento. Use o DevTools."}),e.jsxs("li",{children:["Para parsear JSON, considere passar só a String e deixar o ",e.jsx("code",{children:"jsonDecode"})," rodar no isolate."]}),e.jsxs("li",{children:["Em apps que dependem disso de forma intensa, pacotes como ",e.jsx("code",{children:"worker_manager"})," oferecem pool de isolates reutilizáveis."]}),e.jsxs("li",{children:["Lembre que a primeira chamada de ",e.jsx("code",{children:"compute"})," tem latência de spawn (~10-50ms). Para microtasks repetidas, mantenha um isolate aberto via ",e.jsx("code",{children:"Isolate.spawn"}),"."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com Isolates, você fecha o trio do assincronismo em Dart: ",e.jsx("strong",{children:"Future"})," (1 valor depois), ",e.jsx("strong",{children:"Stream"})," (vários valores depois) e ",e.jsx("strong",{children:"Isolate"})," (computação em paralelo). Domine essas três ferramentas e poucos problemas de performance vão te assustar."]}),e.jsxs(a,{type:"success",children:["Próximos passos sugeridos: gerenciamento de estado em Flutter (",e.jsx("strong",{children:"Provider"}),", ",e.jsx("strong",{children:"Riverpod"}),", ",e.jsx("strong",{children:"BLoC"}),") — onde Futures e Streams encontram a UI de verdade."]})]})}export{n as default};
