import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Dio() {
  return (
    <PageContainer
      title="Dio"
      subtitle="Cliente HTTP poderoso — interceptors, retry, cancelamento e upload com progresso."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        O pacote <code>http</code> resolve o básico, mas em apps reais você logo precisa de coisas como: <strong>injetar um token de autenticação em toda chamada</strong>, <strong>renovar token quando expira</strong>, <strong>tentar de novo quando a rede cai</strong>, <strong>cancelar uma busca quando o usuário digita outra coisa</strong>, <strong>mostrar o progresso de um upload</strong>. Reescrever isso à mão é tedioso e fonte de bugs. O Dio é a ferramenta que praticamente todo app Flutter de produção usa para essa camada.
      </p>

      <h2>O conceito</h2>
      <p>
        Pense no Dio como um <em>http com superpoderes</em>:
      </p>
      <ul>
        <li><strong>BaseOptions</strong> — configurações globais (URL base, timeouts, headers).</li>
        <li><strong>Interceptors</strong> — funções que você pluga em "antes da requisição", "depois da resposta" e "no erro". É onde mora a mágica.</li>
        <li><strong>CancelToken</strong> — objeto que cancela uma chamada em andamento.</li>
        <li><strong>Adapters</strong> — trocam o transporte por baixo (útil em testes).</li>
      </ul>

      <h2>Como Flutter/Dart faz</h2>
      <p>
        Adicione no <code>pubspec.yaml</code>:
      </p>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  dio: ^5.4.0`} />

      <p>
        Crie <strong>uma única instância</strong> do Dio e reaproveite no app inteiro:
      </p>

      <CodeBlock title="lib/api/dio_client.dart" code={`import 'package:dio/dio.dart';

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
);`} />

      <h2>Exemplo prático: interceptor de autenticação</h2>
      <p>
        Esse padrão resolve 80% dos casos: anexar o token automaticamente e renovar quando recebe 401.
      </p>

      <CodeBlock title="lib/api/auth_interceptor.dart" code={`import 'package:dio/dio.dart';

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
      options.headers['Authorization'] = 'Bearer \$token';
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
        req.headers['Authorization'] = 'Bearer \$novo';
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
// ));`} />

      <h2>Cancelando uma busca</h2>
      <p>
        Cenário clássico: o usuário digita em um campo de busca, você dispara uma chamada por letra; quando ele digita a próxima, a anterior precisa ser cancelada.
      </p>

      <CodeBlock title="busca com cancelamento" code={`CancelToken? _token;

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
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Criar um Dio novo a cada chamada</strong>: perde connection pool e fica mais lento.</li>
        <li><strong>Esquecer de tratar <code>DioException</code></strong>: erros de rede viram exceção e crasham a tela.</li>
        <li><strong>Usar <code>response.data</code> sem cast</strong>: ele é <code>dynamic</code>; force o tipo.</li>
        <li><strong>Loop infinito no interceptor de auth</strong>: se o endpoint de refresh também der 401, você entra em looping. Marque a request original.</li>
        <li><strong>Misturar <code>http</code> e <code>dio</code></strong>: escolha um para o app inteiro — manutenção fica mais limpa.</li>
      </ul>

      <AlertBox type="danger" title="Não logue corpos sensíveis em produção">
        O <code>LogInterceptor</code> é ótimo em dev, mas pode imprimir senhas, tokens e dados pessoais. Habilite só com flag de debug.
      </AlertBox>

      <AlertBox type="tip" title="Combine com Retrofit (dio_retrofit)">
        Para apps grandes, <code>retrofit</code> + <code>dio</code> deixam você declarar a API como uma interface anotada e gera o cliente automaticamente.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Uma instância de Dio por app, configurada na inicialização.</li>
        <li>Camada de repositório por cima — a UI nunca conhece o Dio.</li>
        <li>Sempre defina <code>connectTimeout</code> e <code>receiveTimeout</code>.</li>
        <li>Trate <code>DioExceptionType</code> (connectionTimeout, badResponse, cancel...) com mensagens amigáveis.</li>
        <li>Em testes, troque o <code>httpClientAdapter</code> por um mock — você nunca bate na rede de verdade.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Combine com o capítulo de <strong>JSON & Serialização</strong> para mapear respostas em modelos tipados, e com <strong>FutureBuilder</strong> ou um gerenciador de estado para exibir os dados.
      </p>

      <AlertBox type="success" title="Você já consegue">
        Montar uma camada HTTP profissional: autenticação automática, cancelamento e tratamento de erros centralizado.
      </AlertBox>
    </PageContainer>
  );
}
