import{j as e}from"./index-D9yRYXwO.js";import{P as r,A as o,C as s}from"./AlertBox-B2Rl5ETq.js";function i(){return e.jsxs(r,{title:"Pacote http",subtitle:"O cliente HTTP oficial do Dart team — simples, suficiente e ótimo para começar.",difficulty:"intermediario",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quase todo app real precisa ",e.jsx("strong",{children:"conversar com um servidor"}),': buscar uma lista de produtos, fazer login, enviar um formulário. Esse "conversar" acontece via HTTP. O pacote ',e.jsx("code",{children:"http"}),", mantido pela equipe do Dart, é o caminho mais direto para fazer isso. Antes de partir para clientes mais robustos como o Dio, é importante entender o básico — porque o Dio resolve dores que só fazem sentido depois que você sentiu."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Uma requisição HTTP é só uma ",e.jsx("em",{children:"mensagem"}),": você diz o método (GET, POST, PUT, DELETE), uma URL, headers (metadados) e, opcionalmente, um corpo. O servidor responde com um ",e.jsx("strong",{children:"status code"})," (200, 404, 500…), headers e um corpo (geralmente JSON). Como rede demora, toda chamada é ",e.jsx("code",{children:"async"})," e devolve um ",e.jsx("code",{children:"Future"}),"."]}),e.jsxs(o,{type:"info",title:"Future em uma frase",children:["Um ",e.jsx("code",{children:"Future<T>"})," é uma promessa de que, em algum momento, vai existir um valor do tipo ",e.jsx("code",{children:"T"}),". Você espera com ",e.jsx("code",{children:"await"}),"."]}),e.jsx("h2",{children:"Setup"}),e.jsxs("p",{children:["Adicione a dependência no ",e.jsx("code",{children:"pubspec.yaml"})," e rode ",e.jsx("code",{children:"flutter pub get"}),":"]}),e.jsx(s,{title:"pubspec.yaml",code:`dependencies:
  http: ^1.2.0`}),e.jsxs("p",{children:["Em apps Android, declare a permissão de internet em ",e.jsx("code",{children:"android/app/src/main/AndroidManifest.xml"}),":"]}),e.jsx(s,{title:"AndroidManifest.xml",code:'<uses-permission android:name="android.permission.INTERNET" />'}),e.jsx("h2",{children:"Como Flutter/Dart faz"}),e.jsx("p",{children:"O exemplo mínimo: GET em uma API pública e decodificação do JSON."}),e.jsx(s,{title:"GET básico",code:`import 'dart:convert';
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
}`}),e.jsx("h2",{children:"Exemplo prático: GET + POST com timeout"}),e.jsxs("p",{children:["Em produção você quase nunca quer uma chamada que pode pendurar para sempre. Use ",e.jsx("code",{children:".timeout()"}),":"]}),e.jsx(s,{title:"lib/api/posts_api.dart",code:`import 'dart:convert';
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
        .get(Uri.parse('$baseUrl/posts'))
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
      Uri.parse('$baseUrl/posts'),
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
}`}),e.jsxs("p",{children:["Resultado esperado: ",e.jsx("code",{children:"listar()"})," devolve uma ",e.jsx("code",{children:"List"})," de mapas; ",e.jsx("code",{children:"criar()"})," devolve o objeto criado, com o ",e.jsx("code",{children:"id"})," gerado pelo servidor."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer o ",e.jsx("code",{children:"await"})]}),": você recebe um ",e.jsx("code",{children:"Future"})," em vez do dado e tudo quebra."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Não checar ",e.jsx("code",{children:"statusCode"})]}),": 404 e 500 não lançam exceção sozinhos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Faltou Content-Type no POST"}),": muitas APIs respondem 415 sem esse header."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Decodificar com tipo errado"}),": ",e.jsx("code",{children:"jsonDecode"})," devolve ",e.jsx("code",{children:"dynamic"}),"; faça o cast certo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Bloquear a UI"}),": a chamada já é assíncrona, mas ",e.jsx("em",{children:"processar"})," JSON gigante na thread principal trava. Use ",e.jsx("code",{children:"compute()"}),"."]})]}),e.jsxs(o,{type:"warning",title:"HTTPS no iOS e Android",children:["Conexões em ",e.jsx("code",{children:"http://"})," (sem TLS) são bloqueadas por padrão em ambas as plataformas. Sempre use ",e.jsx("code",{children:"https://"})," em produção."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(o,{type:"tip",title:"Receita para ficar feliz",children:e.jsxs("ul",{children:[e.jsxs("li",{children:['Isole as chamadas em uma classe de "API" (ou repositório). A UI nunca chama ',e.jsx("code",{children:"http.get"})," diretamente."]}),e.jsxs("li",{children:["Sempre use ",e.jsx("code",{children:"Uri.parse"})," ou ",e.jsx("code",{children:"Uri.https(...)"})," para escapar query params corretamente."]}),e.jsxs("li",{children:["Defina um ",e.jsx("code",{children:"timeout"})," em toda chamada."]}),e.jsxs("li",{children:["Crie um único ",e.jsx("code",{children:"http.Client"})," e reaproveite — ele mantém connection pool."]}),e.jsxs("li",{children:["Centralize o tratamento de erros e nunca confie só no ",e.jsx("code",{children:"statusCode == 200"}),"; aceite a faixa ",e.jsx("code",{children:"2xx"}),"."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Quando precisar de interceptors (injetar token), retry automático, upload com progresso ou cancelamento, suba um nível para o capítulo de ",e.jsx("strong",{children:"Dio"}),"."]}),e.jsxs(o,{type:"success",title:"Você já consegue",children:["Buscar dados reais de uma API e enviar formulários para o backend. Combine com ",e.jsx("code",{children:"FutureBuilder"})," (capítulo de async) para mostrar tudo na tela."]})]})}export{i as default};
