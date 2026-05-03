import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Http() {
  return (
    <PageContainer
      title="Pacote http"
      subtitle="O cliente HTTP oficial do Dart team — simples, suficiente e ótimo para começar."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quase todo app real precisa <strong>conversar com um servidor</strong>: buscar uma lista de produtos, fazer login, enviar um formulário. Esse "conversar" acontece via HTTP. O pacote <code>http</code>, mantido pela equipe do Dart, é o caminho mais direto para fazer isso. Antes de partir para clientes mais robustos como o Dio, é importante entender o básico — porque o Dio resolve dores que só fazem sentido depois que você sentiu.
      </p>

      <h2>O conceito</h2>
      <p>
        Uma requisição HTTP é só uma <em>mensagem</em>: você diz o método (GET, POST, PUT, DELETE), uma URL, headers (metadados) e, opcionalmente, um corpo. O servidor responde com um <strong>status code</strong> (200, 404, 500…), headers e um corpo (geralmente JSON). Como rede demora, toda chamada é <code>async</code> e devolve um <code>Future</code>.
      </p>

      <AlertBox type="info" title="Future em uma frase">
        Um <code>Future&lt;T&gt;</code> é uma promessa de que, em algum momento, vai existir um valor do tipo <code>T</code>. Você espera com <code>await</code>.
      </AlertBox>

      <h2>Setup</h2>
      <p>
        Adicione a dependência no <code>pubspec.yaml</code> e rode <code>flutter pub get</code>:
      </p>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  http: ^1.2.0`} />

      <p>
        Em apps Android, declare a permissão de internet em <code>android/app/src/main/AndroidManifest.xml</code>:
      </p>

      <CodeBlock title="AndroidManifest.xml" code={`<uses-permission android:name="android.permission.INTERNET" />`} />

      <h2>Como Flutter/Dart faz</h2>
      <p>
        O exemplo mínimo: GET em uma API pública e decodificação do JSON.
      </p>

      <CodeBlock title="GET básico" code={`import 'dart:convert';
import 'package:http/http.dart' as http;

// Importamos com prefixo 'as http' para deixar claro de onde vêm
// as funções (http.get, http.post...).

Future<List<dynamic>> buscarPosts() async {
  final url = Uri.parse('https://jsonplaceholder.typicode.com/posts');

  // Faz a requisição e espera (await) a resposta voltar.
  final resposta = await http.get(url);

  // Status fora da faixa 2xx significa erro de negócio ou servidor.
  if (resposta.statusCode != 200) {
    throw Exception('Falha ao buscar posts: \${resposta.statusCode}');
  }

  // resposta.body é uma String — precisamos decodificar para Dart.
  return jsonDecode(resposta.body) as List<dynamic>;
}`} />

      <h2>Exemplo prático: GET + POST com timeout</h2>
      <p>
        Em produção você quase nunca quer uma chamada que pode pendurar para sempre. Use <code>.timeout()</code>:
      </p>

      <CodeBlock title="lib/api/posts_api.dart" code={`import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class PostsApi {
  final String baseUrl;
  final http.Client _client;

  // Receber o Client por injeção facilita testar com mocks.
  PostsApi({this.baseUrl = 'https://jsonplaceholder.typicode.com',
            http.Client? client})
      : _client = client ?? http.Client();

  Future<List<Map<String, dynamic>>> listar() async {
    final r = await _client
        .get(Uri.parse('\$baseUrl/posts'))
        .timeout(const Duration(seconds: 10));

    if (r.statusCode != 200) {
      throw HttpException('GET /posts falhou: \${r.statusCode}');
    }
    final data = jsonDecode(r.body) as List;
    return data.cast<Map<String, dynamic>>();
  }

  Future<Map<String, dynamic>> criar({
    required String titulo,
    required String corpo,
  }) async {
    final r = await _client.post(
      Uri.parse('\$baseUrl/posts'),
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: jsonEncode({'title': titulo, 'body': corpo, 'userId': 1}),
    );

    if (r.statusCode != 201) {
      throw HttpException('POST /posts falhou: \${r.statusCode}');
    }
    return jsonDecode(r.body) as Map<String, dynamic>;
  }

  // Sempre feche o Client quando terminar (ex: dispose do Bloc/Provider).
  void dispose() => _client.close();
}`} />

      <p>
        Resultado esperado: <code>listar()</code> devolve uma <code>List</code> de mapas; <code>criar()</code> devolve o objeto criado, com o <code>id</code> gerado pelo servidor.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer o <code>await</code></strong>: você recebe um <code>Future</code> em vez do dado e tudo quebra.</li>
        <li><strong>Não checar <code>statusCode</code></strong>: 404 e 500 não lançam exceção sozinhos.</li>
        <li><strong>Faltou Content-Type no POST</strong>: muitas APIs respondem 415 sem esse header.</li>
        <li><strong>Decodificar com tipo errado</strong>: <code>jsonDecode</code> devolve <code>dynamic</code>; faça o cast certo.</li>
        <li><strong>Bloquear a UI</strong>: a chamada já é assíncrona, mas <em>processar</em> JSON gigante na thread principal trava. Use <code>compute()</code>.</li>
      </ul>

      <AlertBox type="warning" title="HTTPS no iOS e Android">
        Conexões em <code>http://</code> (sem TLS) são bloqueadas por padrão em ambas as plataformas. Sempre use <code>https://</code> em produção.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Receita para ficar feliz">
        <ul>
          <li>Isole as chamadas em uma classe de "API" (ou repositório). A UI nunca chama <code>http.get</code> diretamente.</li>
          <li>Sempre use <code>Uri.parse</code> ou <code>Uri.https(...)</code> para escapar query params corretamente.</li>
          <li>Defina um <code>timeout</code> em toda chamada.</li>
          <li>Crie um único <code>http.Client</code> e reaproveite — ele mantém connection pool.</li>
          <li>Centralize o tratamento de erros e nunca confie só no <code>statusCode == 200</code>; aceite a faixa <code>2xx</code>.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Quando precisar de interceptors (injetar token), retry automático, upload com progresso ou cancelamento, suba um nível para o capítulo de <strong>Dio</strong>.
      </p>

      <AlertBox type="success" title="Você já consegue">
        Buscar dados reais de uma API e enviar formulários para o backend. Combine com <code>FutureBuilder</code> (capítulo de async) para mostrar tudo na tela.
      </AlertBox>
    </PageContainer>
  );
}
