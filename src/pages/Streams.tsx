import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Streams() {
  return (
    <PageContainer
      title="Streams"
      subtitle="Sequência assíncrona de valores ao longo do tempo — coração de chats, sensores, Firebase e BLoC."
      difficulty="avancado"
      timeToRead="15 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Um <code>Future</code> entrega <strong>um</strong> valor e acaba. Mas e quando os valores chegam ao longo do tempo? Mensagens novas num chat, posições do GPS a cada segundo, leituras de um sensor, eventos do Firebase, cliques de um botão — tudo isso é uma <strong>sequência</strong>.
      </p>
      <p>
        <code>Stream&lt;T&gt;</code> é o tipo do Dart para isso. Sem ele, você acaba com gambiarra de timers e listeners manuais. Com ele, todo o ecossistema Flutter (StreamBuilder, BLoC, Riverpod) ganha sentido.
      </p>

      <h2>O conceito</h2>
      <p>
        Pense num <strong>cano de água</strong>: você abre a torneira, e a água vai pingando. Você não sabe quantas gotas vão sair, nem quando — só sabe que enquanto a torneira estiver aberta, vão chegando.
      </p>
      <ul>
        <li>O cano é o <code>Stream</code>.</li>
        <li>Cada gota de água é um <strong>evento</strong> (um valor).</li>
        <li>Quem está embaixo coletando é o <strong>listener</strong> (consumidor).</li>
        <li>A torneira pode <strong>fechar</strong> (stream terminou) ou <strong>vazar óleo</strong> (erro).</li>
      </ul>
      <p>
        Comparações úteis: equivalente a <code>Observable</code> do RxJS, <code>Flow</code> do Kotlin, <code>AsyncIterable</code> do Python/JS moderno.
      </p>

      <h2>Como Dart faz</h2>
      <CodeBlock title="contar.dart" code={`// async* + yield = a função produz uma Stream.
Stream<int> contar(int n) async* {
  for (var i = 1; i <= n; i++) {
    await Future.delayed(const Duration(seconds: 1));
    yield i; // emite um evento
  }
  // ao sair da função, a stream se fecha sozinha.
}

void main() {
  // .listen registra um callback para cada evento.
  contar(5).listen(
    (valor) => print('chegou: \$valor'),
    onError: (e) => print('erro: \$e'),
    onDone: () => print('acabou'),
  );
}

// Saída (1 por segundo):
// chegou: 1
// chegou: 2
// chegou: 3
// chegou: 4
// chegou: 5
// acabou`} />

      <p>
        Repare nos pontos-chave: <code>async*</code> (com asterisco) marca função geradora de stream, e <code>yield</code> emite cada valor. Toda iteração do loop manda um evento para quem estiver ouvindo.
      </p>

      <AlertBox type="info" title="await for: consumir como um for">
        Dentro de uma função <code>async</code>, você pode iterar uma stream como se fosse uma lista: <code>await for (final v in stream) {'{'} print(v); {'}'}</code>. Cada iteração espera o próximo evento.
      </AlertBox>

      <h2>Single vs Broadcast</h2>
      <p>
        Existem dois sabores de Stream:
      </p>
      <ul>
        <li><strong>Single-subscription</strong> (padrão): só <em>um</em> listener pode escutar. Ideal para arquivos, requisições. Tentar dois <code>.listen</code> é erro em runtime.</li>
        <li><strong>Broadcast</strong>: vários listeners simultâneos. Ideal para eventos globais (clicks, mensagens). Crie com <code>StreamController.broadcast()</code> ou <code>stream.asBroadcastStream()</code>.</li>
      </ul>

      <h2>Exemplo prático: StreamBuilder no Flutter</h2>
      <p>
        Em UI, você quase nunca usa <code>.listen</code> diretamente. Usa <strong>StreamBuilder</strong>, que reconstrói o widget a cada novo evento.
      </p>

      <CodeBlock title="cronometro_screen.dart" code={`import 'package:flutter/material.dart';

Stream<int> tickEverySecond() async* {
  var s = 0;
  while (true) {
    await Future.delayed(const Duration(seconds: 1));
    yield ++s;
  }
}

class CronometroScreen extends StatelessWidget {
  const CronometroScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Cronômetro')),
      body: Center(
        child: StreamBuilder<int>(
          stream: tickEverySecond(),
          initialData: 0,
          builder: (context, snap) {
            if (snap.hasError) {
              return Text('Erro: \${snap.error}');
            }
            return Text(
              '\${snap.data} segundos',
              style: const TextStyle(fontSize: 48),
            );
          },
        ),
      ),
    );
  }
}`} />

      <AlertBox type="warning" title="Cuidado: stream nova a cada build">
        No exemplo acima, <code>tickEverySecond()</code> é chamada dentro de <code>build()</code>. A cada rebuild do pai, uma stream nova é criada e a antiga vaza. Em código real, guarde a stream em um <code>StatefulWidget</code> (campo de classe inicializado em <code>initState</code>) ou em um provider.
      </AlertBox>

      <h2>StreamController: criando streams na mão</h2>
      <p>
        Quando você precisa empurrar eventos manualmente (ex: notificar mudanças de um objeto), use um <code>StreamController</code>.
      </p>

      <CodeBlock title="contador_service.dart" code={`import 'dart:async';

class ContadorService {
  int _valor = 0;
  // broadcast = vários listeners (UI + analytics, por ex)
  final _ctrl = StreamController<int>.broadcast();

  // exposta como Stream (read-only) para fora.
  Stream<int> get changes => _ctrl.stream;
  int get valor => _valor;

  void incrementar() {
    _valor++;
    _ctrl.add(_valor); // empurra evento
  }

  // SEMPRE feche para evitar vazamento.
  void dispose() => _ctrl.close();
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer <code>cancel()</code></strong>: <code>final sub = stream.listen(...);</code> precisa de <code>sub.cancel()</code> no <code>dispose</code> do widget. Sem isso, o callback continua rodando após o widget sair.</li>
        <li><strong>Esquecer <code>controller.close()</code></strong>: vaza memória e impede testes de finalizarem.</li>
        <li><strong>Dois listeners em single-subscription</strong>: erro em runtime <em>"Stream has already been listened to"</em>. Converta com <code>asBroadcastStream()</code> se precisar.</li>
        <li><strong>Streams quentes vs frias</strong>: streams criadas com <code>async*</code> são "frias" — começam a produzir só quando alguém escuta. Broadcast streams são "quentes" — eventos perdidos se ninguém estiver ouvindo.</li>
        <li><strong>Confundir Stream com Iterable</strong>: stream é assíncrona; iterable é síncrona. Não use <code>.toList()</code> esperando ser instantâneo — ele aguarda a stream completar inteira.</li>
      </ul>

      <AlertBox type="danger" title="Loops infinitos sem await">
        <code>while (true) yield i++;</code> sem <code>await</code> trava a thread. Sempre coloque um <code>await Future.delayed</code> ou <code>await algumOutroFuture</code> dentro do loop.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use <code>StreamBuilder</code> para UI; <code>.listen</code> só fora de widgets ou em <code>initState</code>.</li>
          <li>Sempre cancele subscriptions no <code>dispose</code>.</li>
          <li>Operadores úteis: <code>.where</code>, <code>.map</code>, <code>.distinct</code>, <code>.debounce</code> (via <code>rxdart</code>) — transformam streams como listas.</li>
          <li>Para apps complexos, considere <code>flutter_bloc</code> ou <code>riverpod</code> — eles abstraem o boilerplate de StreamController.</li>
          <li>Se você só vai consumir um valor inicial e não atualizar mais, use <code>FutureBuilder</code>, não Stream.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Streams resolvem o problema de "muitos eventos no tempo". Mas tudo isso ainda roda na thread principal. Quando o trabalho é <strong>pesado de CPU</strong> (parse de JSON gigante, processamento de imagem), nem async/await nem stream salvam — você precisa de outra thread de verdade.
      </p>
      <AlertBox type="success">
        Próximo capítulo: <strong>Isolates</strong> — paralelismo real em Dart para tarefas CPU-bound.
      </AlertBox>
    </PageContainer>
  );
}
