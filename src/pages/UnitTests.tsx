import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function UnitTests() {
  return (
    <PageContainer
      title="Unit Tests"
      subtitle="Testando lógica pura em Dart — sem widgets, sem device, sem desculpa."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Todo app de verdade tem partes que não são UI: cálculo de preço, validação de formulário, parsing de JSON, regras de negócio, repositórios. Essa lógica precisa <strong>funcionar e continuar funcionando</strong> mesmo depois de mil refatorações.
      </p>
      <p>
        Unit tests são a primeira linha de defesa: testes <strong>rápidos</strong> (milissegundos), <strong>isolados</strong> (não dependem de internet, banco ou UI) e <strong>determinísticos</strong>. Se você só vai escrever um tipo de teste, escreva esse.
      </p>

      <h2>O conceito</h2>
      <p>
        Um unit test segue o padrão <strong>Arrange / Act / Assert</strong> (preparar / executar / verificar):
      </p>
      <ul>
        <li><strong>Arrange</strong>: monta os dados de entrada e dependências (mockadas).</li>
        <li><strong>Act</strong>: chama a função que você quer testar.</li>
        <li><strong>Assert</strong>: confere que a saída é o esperado, usando <code>expect(...)</code>.</li>
      </ul>
      <p>
        No Flutter, tudo isso vive na pasta <code>test/</code> da raiz do projeto. Cada arquivo termina em <code>_test.dart</code> e expõe um <code>void main()</code>. O comando <code>flutter test</code> roda todos.
      </p>

      <AlertBox type="info" title="flutter_test ou test?">
        Para projetos Flutter, sempre <code>package:flutter_test/flutter_test.dart</code>. Ele inclui o <code>package:test</code> + helpers de widget. Para package Dart puro (sem Flutter), use <code>package:test/test.dart</code> direto.
      </AlertBox>

      <h2>Como Flutter faz</h2>

      <CodeBlock title="lib/calc.dart" code={`// código sob teste — função pura, fácil de testar
int soma(int a, int b) => a + b;

double mediaPonderada(List<double> notas, List<double> pesos) {
  if (notas.length != pesos.length || notas.isEmpty) {
    throw ArgumentError('notas e pesos devem ter o mesmo tamanho');
  }
  double somaProduto = 0;
  double somaPesos = 0;
  for (var i = 0; i < notas.length; i++) {
    somaProduto += notas[i] * pesos[i];
    somaPesos += pesos[i];
  }
  return somaProduto / somaPesos;
}`} />

      <CodeBlock title="test/calc_test.dart" code={`import 'package:flutter_test/flutter_test.dart';
import 'package:meu_app/calc.dart';

void main() {
  // group agrupa testes relacionados — vira contexto na saída
  group('soma', () {
    test('positivos', () {
      expect(soma(2, 3), 5);          // valor exato
    });

    test('com negativo', () {
      expect(soma(-1, 4), 3);
    });

    test('zero é neutro', () {
      expect(soma(0, 9), 9);
    });
  });

  group('mediaPonderada', () {
    test('média simples (todos pesos = 1)', () {
      // closeTo: aceita pequena imprecisão de double
      expect(mediaPonderada([8, 6, 10], [1, 1, 1]), closeTo(8, 0.001));
    });

    test('lança quando listas têm tamanhos diferentes', () {
      expect(
        () => mediaPonderada([8, 6], [1]),
        throwsA(isA<ArgumentError>()),
      );
    });

    test('lança quando lista vazia', () {
      expect(() => mediaPonderada([], []), throwsArgumentError);
    });
  });
}`} />

      <p>Rode com <code>flutter test</code>. Saída esperada: três grupos, todos verdes em &lt; 1 segundo.</p>

      <h2>Exemplo prático: testando com mocks</h2>
      <p>
        Lógica real costuma depender de <strong>repositórios</strong>, <strong>APIs</strong>, <strong>banco</strong>. Você não quer chamar a internet em cada teste. Solução: passe a dependência por construtor (injeção) e use um <em>mock</em> nos testes. O pacote <code>mocktail</code> torna isso trivial.
      </p>

      <CodeBlock title="lib/usuarios_service.dart" code={`abstract class UsuariosRepo {
  Future<String> nomePorId(int id);
}

class UsuariosService {
  final UsuariosRepo repo;
  UsuariosService(this.repo);

  Future<String> saudacao(int id) async {
    final nome = await repo.nomePorId(id);
    return 'Olá, \$nome!';
  }
}`} />

      <CodeBlock title="test/usuarios_service_test.dart" code={`import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:meu_app/usuarios_service.dart';

// 1) classe mock — herda de Mock + implementa a interface real
class MockRepo extends Mock implements UsuariosRepo {}

void main() {
  late MockRepo repo;
  late UsuariosService service;

  // setUp roda antes de cada test — garante estado limpo
  setUp(() {
    repo = MockRepo();
    service = UsuariosService(repo);
  });

  test('monta saudação a partir do nome do repo', () async {
    // configura comportamento do mock
    when(() => repo.nomePorId(1))
        .thenAnswer((_) async => 'Ana');

    final resultado = await service.saudacao(1);

    expect(resultado, 'Olá, Ana!');
    // verifica que o repo foi chamado exatamente 1 vez com id=1
    verify(() => repo.nomePorId(1)).called(1);
  });

  test('propaga erro do repo', () async {
    when(() => repo.nomePorId(any()))
        .thenThrow(Exception('sem rede'));

    expect(() => service.saudacao(99), throwsException);
  });
}`} />

      <h2>Matchers úteis</h2>
      <ul>
        <li><code>equals(x)</code> ou só <code>x</code> — igualdade.</li>
        <li><code>isNull</code>, <code>isNotNull</code>, <code>isTrue</code>, <code>isFalse</code>, <code>isEmpty</code>.</li>
        <li><code>greaterThan(0)</code>, <code>lessThan(10)</code>, <code>inInclusiveRange(0, 100)</code>.</li>
        <li><code>contains('foo')</code> para strings/listas.</li>
        <li><code>throwsA(isA&lt;FormatException&gt;())</code> para verificar exceção específica.</li>
        <li><code>closeTo(3.14, 0.01)</code> para doubles.</li>
        <li><code>orderedEquals([1, 2, 3])</code> e <code>unorderedEquals(...)</code> para listas.</li>
      </ul>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Teste depende de hora do sistema</strong>: <code>DateTime.now()</code> vira flaky. Injete um relógio (<code>Clock</code>) ou use <code>fakeAsync</code>.</li>
        <li><strong>Teste depende da ordem de execução</strong>: cada teste deve funcionar isolado. Use <code>setUp</code>/<code>tearDown</code>.</li>
        <li><strong>Esquecer <code>await</code></strong>: teste async sem <code>await</code> pode passar mesmo com erro. Sempre marque a função <code>async</code> e use <code>await</code> ou retorne o <code>Future</code>.</li>
        <li><strong>Mock retornando <code>null</code> por engano</strong>: configure <code>when(...).thenAnswer(...)</code> antes da chamada, ou registre fallback com <code>registerFallbackValue</code>.</li>
        <li><strong>Misturar lógica e UI</strong>: se sua função criou um <code>Widget</code>, não é mais unit — vire <code>testWidgets</code>.</li>
      </ul>

      <AlertBox type="warning" title="Cobertura não é tudo">
        100% de cobertura num código mal projetado ainda deixa bugs entrarem. Foque em testar <strong>regras de negócio</strong> e <strong>caminhos de erro</strong>, não em chegar num número mágico.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Nomeie testes como frases">
        <code>test('lança quando email está vazio', ...)</code> é melhor que <code>test('test1', ...)</code>. Quando o teste falha, a mensagem já conta a história.
      </AlertBox>
      <ul>
        <li>Um <code>expect</code> por intenção. Vários asserts num teste só dificulta diagnosticar a falha.</li>
        <li>Prefira código <em>testável</em>: funções puras, dependências por construtor, sem singletons globais.</li>
        <li>Cobertura: <code>flutter test --coverage</code> gera <code>coverage/lcov.info</code>.</li>
        <li>CI: rode <code>flutter test</code> em todo PR. Falha vermelha = bloqueio do merge.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Lógica pura, ok. Mas e a UI? Como verificar que o botão está lá, que o texto aparece quando carrego, que o tap incrementa o contador? Para isso existe outra ferramenta: <strong>Widget Tests</strong>.
      </p>
      <AlertBox type="success" title="Continue para Widget Tests">
        Próxima página: renderizar widgets em ambiente headless e simular interações com <code>tester</code>.
      </AlertBox>
    </PageContainer>
  );
}
