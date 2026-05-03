import{j as e}from"./index-D4AOhXGO.js";import{P as a,C as o,A as r}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(a,{title:"Futures",subtitle:"O tipo do Dart para representar 'um valor que ainda vai chegar' — base de tudo que é assíncrono.",difficulty:"intermediario",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Toda vez que seu app conversa com a internet, lê um arquivo, consulta um banco ou aguarda o usuário, ele ",e.jsx("strong",{children:"não pode parar e esperar"}),". Se travasse, a tela congelaria. A solução universal é o ",e.jsx("em",{children:"código assíncrono"}),": você dispara a tarefa e segue a vida; quando o resultado chegar, alguém te avisa."]}),e.jsxs("p",{children:['Em Dart, esse "vai chegar depois" é representado por ',e.jsx("code",{children:"Future<T>"}),". Conhecer Futures é ",e.jsx("strong",{children:"obrigatório"})," para fazer qualquer app real em Flutter. É o equivalente da ",e.jsx("code",{children:"Promise"})," do JavaScript ou do ",e.jsx("code",{children:"Task"})," do C#."]}),e.jsx("h2",{children:"O conceito"}),e.jsx("p",{children:"Pense num pedido de delivery: você abre o app, faz o pedido, recebe um número. Você não fica olhando o cozinheiro — vai fazer outras coisas. Quando a comida chega, o entregador toca a campainha."}),e.jsxs("ul",{children:[e.jsxs("li",{children:["O ",e.jsx("strong",{children:"número do pedido"})," é o ",e.jsx("code",{children:"Future"})," — uma promessa de que algo vem."]}),e.jsxs("li",{children:["A ",e.jsx("strong",{children:"comida"})," é o valor ",e.jsx("code",{children:"T"})," dentro do Future."]}),e.jsxs("li",{children:["Você pode ",e.jsx("strong",{children:"cancelar planos"}),", ler outros apps, fazer outra coisa enquanto espera."]}),e.jsxs("li",{children:["Se o restaurante quebra, você recebe um ",e.jsx("strong",{children:"erro"})," em vez do prato."]})]}),e.jsxs("p",{children:["Um ",e.jsx("code",{children:"Future<T>"})," tem três estados: ",e.jsx("em",{children:"pendente"}),", ",e.jsx("em",{children:"completou com valor"}),", ou ",e.jsx("em",{children:"completou com erro"}),". Ele só transita uma vez — concluiu, acabou."]}),e.jsx("h2",{children:"Como Dart faz"}),e.jsx(o,{title:"primeiro_future.dart",code:`// Future<String> = "vai chegar uma String depois".
Future<String> buscarUsuario() {
  // Future.delayed simula latência de rede.
  return Future.delayed(
    const Duration(seconds: 1),
    () => 'Ana',
  );
}

void main() {
  print('antes');
  // .then registra o que fazer quando o valor chegar.
  buscarUsuario().then((nome) => print('Olá, $nome'));
  print('depois');
}

// Saída:
// antes
// depois
// Olá, Ana   <-- 1 segundo depois`}),e.jsxs("p",{children:["Repare na ordem da saída: ",e.jsx("strong",{children:'"depois" sai antes de "Olá, Ana"'}),". Isso é o coração da programação assíncrona — o programa não para na chamada, segue executando o resto."]}),e.jsxs(r,{type:"info",title:"Future != Thread",children:["Um Future ",e.jsx("strong",{children:"não"})," roda em outra thread. Dart é single-threaded por padrão. O que acontece é que a thread principal vai resolvendo tarefas curtas; quando o Future completa, ela volta e roda o callback."]}),e.jsx("h2",{children:"Os três métodos básicos"}),e.jsx(o,{title:"api_methods.dart",code:`// 1) .then — o que fazer com o sucesso
buscarUsuario().then((nome) {
  print('Sucesso: $nome');
});

// 2) .catchError — o que fazer com erro
buscarUsuario()
    .then((nome) => print(nome))
    .catchError((e, stack) {
      print('Falhou: $e');
      return 'fallback'; // valor de recuperação
    });

// 3) .whenComplete — sempre roda (sucesso OU erro),
//    como o 'finally' do try/catch.
buscarUsuario()
    .then((nome) => print(nome))
    .catchError((e) => print('erro: $e'))
    .whenComplete(() => print('terminou'));`}),e.jsx("h2",{children:"Exemplo prático: chamada HTTP"}),e.jsxs("p",{children:["Caso real: buscar usuários de uma API REST com o pacote ",e.jsx("code",{children:"http"}),"."]}),e.jsx(o,{title:"usuario_service.dart",code:`import 'dart:convert';
import 'package:http/http.dart' as http;

class Usuario {
  final int id;
  final String nome;
  Usuario({required this.id, required this.nome});

  factory Usuario.fromJson(Map<String, dynamic> j) =>
      Usuario(id: j['id'], nome: j['name']);
}

// Retorna Future<Usuario> = "vou te entregar 1 Usuario".
Future<Usuario> buscarUsuario(int id) {
  final url = Uri.parse('https://jsonplaceholder.typicode.com/users/$id');

  return http.get(url).then((resposta) {
    if (resposta.statusCode != 200) {
      // Lançar exceção dispara o canal de erro do Future.
      throw Exception('HTTP \${resposta.statusCode}');
    }
    final json = jsonDecode(resposta.body) as Map<String, dynamic>;
    return Usuario.fromJson(json);
  });
}

// Uso:
void main() {
  buscarUsuario(1)
      .then((u) => print('Recebi \${u.nome}'))
      .catchError((e) => print('Deu ruim: $e'));
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer de retornar o Future"}),": se uma função sua chama outra função async e não retorna, o chamador acha que terminou. Sempre ",e.jsx("code",{children:"return"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Misturar ",e.jsx("code",{children:".then"})," com ",e.jsx("code",{children:"print"})," direto"]}),": ",e.jsx("code",{children:"print(buscarUsuario())"})," imprime ",e.jsx("code",{children:"Instance of '_Future<String>'"}),", não o valor."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Callback hell"}),": ",e.jsx("code",{children:".then(...).then(...).then(...)"})," aninhados ficam ilegíveis. Use ",e.jsx("code",{children:"async/await"})," (próximo capítulo)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Engolir exceções"}),": sem ",e.jsx("code",{children:".catchError"}),', um erro vira "uncaught exception" e crasha em modo debug.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Future já completo"}),": ",e.jsx("code",{children:"Future.value(42)"})," cria um future que já está pronto. Útil em testes; use com cuidado em produção."]})]}),e.jsxs(r,{type:"danger",title:"Future dentro de build()",children:["Nunca chame ",e.jsx("code",{children:"buscarUsuario()"})," dentro do ",e.jsx("code",{children:"build()"})," de um Widget — todo rebuild dispararia uma nova requisição. Use ",e.jsx("code",{children:"FutureBuilder"}),", ",e.jsx("code",{children:"initState"})," de um StatefulWidget ou um gerenciador de estado."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(r,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Sempre tipe explicitamente: ",e.jsx("code",{children:"Future<Usuario>"}),", não ",e.jsx("code",{children:"Future"})," sem tipo."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"async/await"})," em vez de ",e.jsx("code",{children:".then"})," sempre que possível — fica mais legível."]}),e.jsxs("li",{children:["Adicione timeout: ",e.jsx("code",{children:"future.timeout(Duration(seconds: 10))"}),"."]}),e.jsxs("li",{children:["Para várias chamadas em paralelo, ",e.jsx("code",{children:"Future.wait([f1, f2, f3])"})," é seu amigo."]}),e.jsxs("li",{children:["Em testes, use ",e.jsx("code",{children:"Future.value(...)"})," para resultados imediatos sem mockar HTTP."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:[e.jsx("code",{children:".then"})," funciona, mas vira espaguete quando você precisa de várias chamadas em sequência. A solução idiomática é ",e.jsx("code",{children:"async/await"}),": o mesmo código fica linear, parece síncrono, e o tratamento de erro vira ",e.jsx("code",{children:"try/catch"})," normal."]}),e.jsxs(r,{type:"success",children:["Próximo capítulo: ",e.jsx("strong",{children:"async/await"})," — escrever código assíncrono que parece síncrono."]})]})}export{n as default};
