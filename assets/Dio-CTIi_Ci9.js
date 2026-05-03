import{j as e}from"./index-D9yRYXwO.js";import{P as a,C as o,A as r}from"./AlertBox-B2Rl5ETq.js";function s(){return e.jsxs(a,{title:"Dio",subtitle:"Cliente HTTP poderoso — interceptors, retry, cancelamento e upload com progresso.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["O pacote ",e.jsx("code",{children:"http"})," resolve o básico, mas em apps reais você logo precisa de coisas como: ",e.jsx("strong",{children:"injetar um token de autenticação em toda chamada"}),", ",e.jsx("strong",{children:"renovar token quando expira"}),", ",e.jsx("strong",{children:"tentar de novo quando a rede cai"}),", ",e.jsx("strong",{children:"cancelar uma busca quando o usuário digita outra coisa"}),", ",e.jsx("strong",{children:"mostrar o progresso de um upload"}),". Reescrever isso à mão é tedioso e fonte de bugs. O Dio é a ferramenta que praticamente todo app Flutter de produção usa para essa camada."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Pense no Dio como um ",e.jsx("em",{children:"http com superpoderes"}),":"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"BaseOptions"})," — configurações globais (URL base, timeouts, headers)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Interceptors"}),' — funções que você pluga em "antes da requisição", "depois da resposta" e "no erro". É onde mora a mágica.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"CancelToken"})," — objeto que cancela uma chamada em andamento."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Adapters"})," — trocam o transporte por baixo (útil em testes)."]})]}),e.jsx("h2",{children:"Como Flutter/Dart faz"}),e.jsxs("p",{children:["Adicione no ",e.jsx("code",{children:"pubspec.yaml"}),":"]}),e.jsx(o,{title:"pubspec.yaml",code:`dependencies:
  dio: ^5.4.0`}),e.jsxs("p",{children:["Crie ",e.jsx("strong",{children:"uma única instância"})," do Dio e reaproveite no app inteiro:"]}),e.jsx(o,{title:"lib/api/dio_client.dart",code:`import 'package:dio/dio.dart';

// Singleton simples — em apps maiores use injeção (get_it, riverpod).
final Dio dio = Dio(
  BaseOptions(
    baseUrl: 'https://api.exemplo.com',
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 15),
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    // 4xx/5xx normalmente viram DioException. Se você quiser
    // tratar manualmente, defina validateStatus.
  ),
);`}),e.jsx("h2",{children:"Exemplo prático: interceptor de autenticação"}),e.jsx("p",{children:"Esse padrão resolve 80% dos casos: anexar o token automaticamente e renovar quando recebe 401."}),e.jsx(o,{title:"lib/api/auth_interceptor.dart",code:`import 'package:dio/dio.dart';

class AuthInterceptor extends Interceptor {
  final Future<String?> Function() obterToken;
  final Future<String?> Function() renovarToken;

  AuthInterceptor({required this.obterToken, required this.renovarToken});

  @override
  Future<void> onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final token = await obterToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options); // segue o fluxo normal
  }

  @override
  Future<void> onError(
    DioException err,
    ErrorInterceptorHandler handler,
  ) async {
    // 401 = token expirou. Tentamos renovar e refazer a chamada UMA vez.
    if (err.response?.statusCode == 401) {
      final novo = await renovarToken();
      if (novo != null) {
        final req = err.requestOptions;
        req.headers['Authorization'] = 'Bearer $novo';
        try {
          final resposta = await Dio().fetch(req);
          return handler.resolve(resposta);
        } catch (_) {
          // se falhar de novo, deixa o erro original seguir
        }
      }
    }
    handler.next(err);
  }
}

// Uso:
// dio.interceptors.add(AuthInterceptor(
//   obterToken: () => storage.read('token'),
//   renovarToken: () => authRepo.refresh(),
// ));`}),e.jsx("h2",{children:"Cancelando uma busca"}),e.jsx("p",{children:"Cenário clássico: o usuário digita em um campo de busca, você dispara uma chamada por letra; quando ele digita a próxima, a anterior precisa ser cancelada."}),e.jsx(o,{title:"busca com cancelamento",code:`CancelToken? _token;

Future<List<dynamic>> buscar(String termo) async {
  // Cancela a busca anterior, se houver.
  _token?.cancel('Nova busca iniciada');
  _token = CancelToken();

  try {
    final r = await dio.get(
      '/produtos',
      queryParameters: {'q': termo},
      cancelToken: _token,
    );
    return r.data as List;
  } on DioException catch (e) {
    if (CancelToken.isCancel(e)) return const []; // ignorado
    rethrow;
  }
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Criar um Dio novo a cada chamada"}),": perde connection pool e fica mais lento."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer de tratar ",e.jsx("code",{children:"DioException"})]}),": erros de rede viram exceção e crasham a tela."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar ",e.jsx("code",{children:"response.data"})," sem cast"]}),": ele é ",e.jsx("code",{children:"dynamic"}),"; force o tipo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Loop infinito no interceptor de auth"}),": se o endpoint de refresh também der 401, você entra em looping. Marque a request original."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Misturar ",e.jsx("code",{children:"http"})," e ",e.jsx("code",{children:"dio"})]}),": escolha um para o app inteiro — manutenção fica mais limpa."]})]}),e.jsxs(r,{type:"danger",title:"Não logue corpos sensíveis em produção",children:["O ",e.jsx("code",{children:"LogInterceptor"})," é ótimo em dev, mas pode imprimir senhas, tokens e dados pessoais. Habilite só com flag de debug."]}),e.jsxs(r,{type:"tip",title:"Combine com Retrofit (dio_retrofit)",children:["Para apps grandes, ",e.jsx("code",{children:"retrofit"})," + ",e.jsx("code",{children:"dio"})," deixam você declarar a API como uma interface anotada e gera o cliente automaticamente."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Uma instância de Dio por app, configurada na inicialização."}),e.jsx("li",{children:"Camada de repositório por cima — a UI nunca conhece o Dio."}),e.jsxs("li",{children:["Sempre defina ",e.jsx("code",{children:"connectTimeout"})," e ",e.jsx("code",{children:"receiveTimeout"}),"."]}),e.jsxs("li",{children:["Trate ",e.jsx("code",{children:"DioExceptionType"})," (connectionTimeout, badResponse, cancel...) com mensagens amigáveis."]}),e.jsxs("li",{children:["Em testes, troque o ",e.jsx("code",{children:"httpClientAdapter"})," por um mock — você nunca bate na rede de verdade."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Combine com o capítulo de ",e.jsx("strong",{children:"JSON & Serialização"})," para mapear respostas em modelos tipados, e com ",e.jsx("strong",{children:"FutureBuilder"})," ou um gerenciador de estado para exibir os dados."]}),e.jsx(r,{type:"success",title:"Você já consegue",children:"Montar uma camada HTTP profissional: autenticação automática, cancelamento e tratamento de erros centralizado."})]})}export{s as default};
