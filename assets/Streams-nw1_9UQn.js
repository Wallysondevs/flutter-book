import{j as e}from"./index-D9yRYXwO.js";import{P as s,C as a,A as r}from"./AlertBox-B2Rl5ETq.js";function n(){return e.jsxs(s,{title:"Streams",subtitle:"Sequência assíncrona de valores ao longo do tempo — coração de chats, sensores, Firebase e BLoC.",difficulty:"avancado",timeToRead:"15 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Um ",e.jsx("code",{children:"Future"})," entrega ",e.jsx("strong",{children:"um"})," valor e acaba. Mas e quando os valores chegam ao longo do tempo? Mensagens novas num chat, posições do GPS a cada segundo, leituras de um sensor, eventos do Firebase, cliques de um botão — tudo isso é uma ",e.jsx("strong",{children:"sequência"}),"."]}),e.jsxs("p",{children:[e.jsx("code",{children:"Stream<T>"})," é o tipo do Dart para isso. Sem ele, você acaba com gambiarra de timers e listeners manuais. Com ele, todo o ecossistema Flutter (StreamBuilder, BLoC, Riverpod) ganha sentido."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Pense num ",e.jsx("strong",{children:"cano de água"}),": você abre a torneira, e a água vai pingando. Você não sabe quantas gotas vão sair, nem quando — só sabe que enquanto a torneira estiver aberta, vão chegando."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["O cano é o ",e.jsx("code",{children:"Stream"}),"."]}),e.jsxs("li",{children:["Cada gota de água é um ",e.jsx("strong",{children:"evento"})," (um valor)."]}),e.jsxs("li",{children:["Quem está embaixo coletando é o ",e.jsx("strong",{children:"listener"})," (consumidor)."]}),e.jsxs("li",{children:["A torneira pode ",e.jsx("strong",{children:"fechar"})," (stream terminou) ou ",e.jsx("strong",{children:"vazar óleo"})," (erro)."]})]}),e.jsxs("p",{children:["Comparações úteis: equivalente a ",e.jsx("code",{children:"Observable"})," do RxJS, ",e.jsx("code",{children:"Flow"})," do Kotlin, ",e.jsx("code",{children:"AsyncIterable"})," do Python/JS moderno."]}),e.jsx("h2",{children:"Como Dart faz"}),e.jsx(a,{title:"contar.dart",code:`// async* + yield = a função produz uma Stream.
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
    (valor) => print('chegou: $valor'),
    onError: (e) => print('erro: $e'),
    onDone: () => print('acabou'),
  );
}

// Saída (1 por segundo):
// chegou: 1
// chegou: 2
// chegou: 3
// chegou: 4
// chegou: 5
// acabou`}),e.jsxs("p",{children:["Repare nos pontos-chave: ",e.jsx("code",{children:"async*"})," (com asterisco) marca função geradora de stream, e ",e.jsx("code",{children:"yield"})," emite cada valor. Toda iteração do loop manda um evento para quem estiver ouvindo."]}),e.jsxs(r,{type:"info",title:"await for: consumir como um for",children:["Dentro de uma função ",e.jsx("code",{children:"async"}),", você pode iterar uma stream como se fosse uma lista: ",e.jsxs("code",{children:["await for (final v in stream) ","{"," print(v); ","}"]}),". Cada iteração espera o próximo evento."]}),e.jsx("h2",{children:"Single vs Broadcast"}),e.jsx("p",{children:"Existem dois sabores de Stream:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Single-subscription"})," (padrão): só ",e.jsx("em",{children:"um"})," listener pode escutar. Ideal para arquivos, requisições. Tentar dois ",e.jsx("code",{children:".listen"})," é erro em runtime."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Broadcast"}),": vários listeners simultâneos. Ideal para eventos globais (clicks, mensagens). Crie com ",e.jsx("code",{children:"StreamController.broadcast()"})," ou ",e.jsx("code",{children:"stream.asBroadcastStream()"}),"."]})]}),e.jsx("h2",{children:"Exemplo prático: StreamBuilder no Flutter"}),e.jsxs("p",{children:["Em UI, você quase nunca usa ",e.jsx("code",{children:".listen"})," diretamente. Usa ",e.jsx("strong",{children:"StreamBuilder"}),", que reconstrói o widget a cada novo evento."]}),e.jsx(a,{title:"cronometro_screen.dart",code:`import 'package:flutter/material.dart';

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
}`}),e.jsxs(r,{type:"warning",title:"Cuidado: stream nova a cada build",children:["No exemplo acima, ",e.jsx("code",{children:"tickEverySecond()"})," é chamada dentro de ",e.jsx("code",{children:"build()"}),". A cada rebuild do pai, uma stream nova é criada e a antiga vaza. Em código real, guarde a stream em um ",e.jsx("code",{children:"StatefulWidget"})," (campo de classe inicializado em ",e.jsx("code",{children:"initState"}),") ou em um provider."]}),e.jsx("h2",{children:"StreamController: criando streams na mão"}),e.jsxs("p",{children:["Quando você precisa empurrar eventos manualmente (ex: notificar mudanças de um objeto), use um ",e.jsx("code",{children:"StreamController"}),"."]}),e.jsx(a,{title:"contador_service.dart",code:`import 'dart:async';

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
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"cancel()"})]}),": ",e.jsx("code",{children:"final sub = stream.listen(...);"})," precisa de ",e.jsx("code",{children:"sub.cancel()"})," no ",e.jsx("code",{children:"dispose"})," do widget. Sem isso, o callback continua rodando após o widget sair."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"controller.close()"})]}),": vaza memória e impede testes de finalizarem."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Dois listeners em single-subscription"}),": erro em runtime ",e.jsx("em",{children:'"Stream has already been listened to"'}),". Converta com ",e.jsx("code",{children:"asBroadcastStream()"})," se precisar."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Streams quentes vs frias"}),": streams criadas com ",e.jsx("code",{children:"async*"}),' são "frias" — começam a produzir só quando alguém escuta. Broadcast streams são "quentes" — eventos perdidos se ninguém estiver ouvindo.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Confundir Stream com Iterable"}),": stream é assíncrona; iterable é síncrona. Não use ",e.jsx("code",{children:".toList()"})," esperando ser instantâneo — ele aguarda a stream completar inteira."]})]}),e.jsxs(r,{type:"danger",title:"Loops infinitos sem await",children:[e.jsx("code",{children:"while (true) yield i++;"})," sem ",e.jsx("code",{children:"await"})," trava a thread. Sempre coloque um ",e.jsx("code",{children:"await Future.delayed"})," ou ",e.jsx("code",{children:"await algumOutroFuture"})," dentro do loop."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(r,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"StreamBuilder"})," para UI; ",e.jsx("code",{children:".listen"})," só fora de widgets ou em ",e.jsx("code",{children:"initState"}),"."]}),e.jsxs("li",{children:["Sempre cancele subscriptions no ",e.jsx("code",{children:"dispose"}),"."]}),e.jsxs("li",{children:["Operadores úteis: ",e.jsx("code",{children:".where"}),", ",e.jsx("code",{children:".map"}),", ",e.jsx("code",{children:".distinct"}),", ",e.jsx("code",{children:".debounce"})," (via ",e.jsx("code",{children:"rxdart"}),") — transformam streams como listas."]}),e.jsxs("li",{children:["Para apps complexos, considere ",e.jsx("code",{children:"flutter_bloc"})," ou ",e.jsx("code",{children:"riverpod"})," — eles abstraem o boilerplate de StreamController."]}),e.jsxs("li",{children:["Se você só vai consumir um valor inicial e não atualizar mais, use ",e.jsx("code",{children:"FutureBuilder"}),", não Stream."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:['Streams resolvem o problema de "muitos eventos no tempo". Mas tudo isso ainda roda na thread principal. Quando o trabalho é ',e.jsx("strong",{children:"pesado de CPU"})," (parse de JSON gigante, processamento de imagem), nem async/await nem stream salvam — você precisa de outra thread de verdade."]}),e.jsxs(r,{type:"success",children:["Próximo capítulo: ",e.jsx("strong",{children:"Isolates"})," — paralelismo real em Dart para tarefas CPU-bound."]})]})}export{n as default};
