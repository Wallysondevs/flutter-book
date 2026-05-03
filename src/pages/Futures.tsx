import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Futures() {
  return (
    <PageContainer
      title="Futures"
      subtitle="O tipo do Dart para representar 'um valor que ainda vai chegar' — base de tudo que é assíncrono."
      difficulty="intermediario"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Toda vez que seu app conversa com a internet, lê um arquivo, consulta um banco ou aguarda o usuário, ele <strong>não pode parar e esperar</strong>. Se travasse, a tela congelaria. A solução universal é o <em>código assíncrono</em>: você dispara a tarefa e segue a vida; quando o resultado chegar, alguém te avisa.
      </p>
      <p>
        Em Dart, esse "vai chegar depois" é representado por <code>Future&lt;T&gt;</code>. Conhecer Futures é <strong>obrigatório</strong> para fazer qualquer app real em Flutter. É o equivalente da <code>Promise</code> do JavaScript ou do <code>Task</code> do C#.
      </p>

      <h2>O conceito</h2>
      <p>
        Pense num pedido de delivery: você abre o app, faz o pedido, recebe um número. Você não fica olhando o cozinheiro — vai fazer outras coisas. Quando a comida chega, o entregador toca a campainha.
      </p>
      <ul>
        <li>O <strong>número do pedido</strong> é o <code>Future</code> — uma promessa de que algo vem.</li>
        <li>A <strong>comida</strong> é o valor <code>T</code> dentro do Future.</li>
        <li>Você pode <strong>cancelar planos</strong>, ler outros apps, fazer outra coisa enquanto espera.</li>
        <li>Se o restaurante quebra, você recebe um <strong>erro</strong> em vez do prato.</li>
      </ul>
      <p>
        Um <code>Future&lt;T&gt;</code> tem três estados: <em>pendente</em>, <em>completou com valor</em>, ou <em>completou com erro</em>. Ele só transita uma vez — concluiu, acabou.
      </p>

      <h2>Como Dart faz</h2>
      <CodeBlock title="primeiro_future.dart" code={`// Future<String> = "vai chegar uma String depois".
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
  buscarUsuario().then((nome) => print('Olá, \$nome'));
  print('depois');
}

// Saída:
// antes
// depois
// Olá, Ana   <-- 1 segundo depois`} />

      <p>
        Repare na ordem da saída: <strong>"depois" sai antes de "Olá, Ana"</strong>. Isso é o coração da programação assíncrona — o programa não para na chamada, segue executando o resto.
      </p>

      <AlertBox type="info" title="Future != Thread">
        Um Future <strong>não</strong> roda em outra thread. Dart é single-threaded por padrão. O que acontece é que a thread principal vai resolvendo tarefas curtas; quando o Future completa, ela volta e roda o callback.
      </AlertBox>

      <h2>Os três métodos básicos</h2>
      <CodeBlock title="api_methods.dart" code={`// 1) .then — o que fazer com o sucesso
buscarUsuario().then((nome) {
  print('Sucesso: \$nome');
});

// 2) .catchError — o que fazer com erro
buscarUsuario()
    .then((nome) => print(nome))
    .catchError((e, stack) {
      print('Falhou: \$e');
      return 'fallback'; // valor de recuperação
    });

// 3) .whenComplete — sempre roda (sucesso OU erro),
//    como o 'finally' do try/catch.
buscarUsuario()
    .then((nome) => print(nome))
    .catchError((e) => print('erro: \$e'))
    .whenComplete(() => print('terminou'));`} />

      <h2>Exemplo prático: chamada HTTP</h2>
      <p>
        Caso real: buscar usuários de uma API REST com o pacote <code>http</code>.
      </p>

      <CodeBlock title="usuario_service.dart" code={`import 'dart:convert';
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
  final url = Uri.parse('https://jsonplaceholder.typicode.com/users/\$id');

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
      .catchError((e) => print('Deu ruim: \$e'));
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer de retornar o Future</strong>: se uma função sua chama outra função async e não retorna, o chamador acha que terminou. Sempre <code>return</code>.</li>
        <li><strong>Misturar <code>.then</code> com <code>print</code> direto</strong>: <code>print(buscarUsuario())</code> imprime <code>Instance of '_Future&lt;String&gt;'</code>, não o valor.</li>
        <li><strong>Callback hell</strong>: <code>.then(...).then(...).then(...)</code> aninhados ficam ilegíveis. Use <code>async/await</code> (próximo capítulo).</li>
        <li><strong>Engolir exceções</strong>: sem <code>.catchError</code>, um erro vira "uncaught exception" e crasha em modo debug.</li>
        <li><strong>Future já completo</strong>: <code>Future.value(42)</code> cria um future que já está pronto. Útil em testes; use com cuidado em produção.</li>
      </ul>

      <AlertBox type="danger" title="Future dentro de build()">
        Nunca chame <code>buscarUsuario()</code> dentro do <code>build()</code> de um Widget — todo rebuild dispararia uma nova requisição. Use <code>FutureBuilder</code>, <code>initState</code> de um StatefulWidget ou um gerenciador de estado.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Sempre tipe explicitamente: <code>Future&lt;Usuario&gt;</code>, não <code>Future</code> sem tipo.</li>
          <li>Use <code>async/await</code> em vez de <code>.then</code> sempre que possível — fica mais legível.</li>
          <li>Adicione timeout: <code>future.timeout(Duration(seconds: 10))</code>.</li>
          <li>Para várias chamadas em paralelo, <code>Future.wait([f1, f2, f3])</code> é seu amigo.</li>
          <li>Em testes, use <code>Future.value(...)</code> para resultados imediatos sem mockar HTTP.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        <code>.then</code> funciona, mas vira espaguete quando você precisa de várias chamadas em sequência. A solução idiomática é <code>async/await</code>: o mesmo código fica linear, parece síncrono, e o tratamento de erro vira <code>try/catch</code> normal.
      </p>
      <AlertBox type="success">
        Próximo capítulo: <strong>async/await</strong> — escrever código assíncrono que parece síncrono.
      </AlertBox>
    </PageContainer>
  );
}
