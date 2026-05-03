import{j as e}from"./index-D4AOhXGO.js";import{P as r,A as s,C as o}from"./AlertBox-Dyf2wdSA.js";function i(){return e.jsxs(r,{title:"Unit Tests",subtitle:"Testando lógica pura em Dart — sem widgets, sem device, sem desculpa.",difficulty:"intermediario",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Todo app de verdade tem partes que não são UI: cálculo de preço, validação de formulário, parsing de JSON, regras de negócio, repositórios. Essa lógica precisa ",e.jsx("strong",{children:"funcionar e continuar funcionando"})," mesmo depois de mil refatorações."]}),e.jsxs("p",{children:["Unit tests são a primeira linha de defesa: testes ",e.jsx("strong",{children:"rápidos"})," (milissegundos), ",e.jsx("strong",{children:"isolados"})," (não dependem de internet, banco ou UI) e ",e.jsx("strong",{children:"determinísticos"}),". Se você só vai escrever um tipo de teste, escreva esse."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um unit test segue o padrão ",e.jsx("strong",{children:"Arrange / Act / Assert"})," (preparar / executar / verificar):"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Arrange"}),": monta os dados de entrada e dependências (mockadas)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Act"}),": chama a função que você quer testar."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Assert"}),": confere que a saída é o esperado, usando ",e.jsx("code",{children:"expect(...)"}),"."]})]}),e.jsxs("p",{children:["No Flutter, tudo isso vive na pasta ",e.jsx("code",{children:"test/"})," da raiz do projeto. Cada arquivo termina em ",e.jsx("code",{children:"_test.dart"})," e expõe um ",e.jsx("code",{children:"void main()"}),". O comando ",e.jsx("code",{children:"flutter test"})," roda todos."]}),e.jsxs(s,{type:"info",title:"flutter_test ou test?",children:["Para projetos Flutter, sempre ",e.jsx("code",{children:"package:flutter_test/flutter_test.dart"}),". Ele inclui o ",e.jsx("code",{children:"package:test"})," + helpers de widget. Para package Dart puro (sem Flutter), use ",e.jsx("code",{children:"package:test/test.dart"})," direto."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(o,{title:"lib/calc.dart",code:`// código sob teste — função pura, fácil de testar
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
}`}),e.jsx(o,{title:"test/calc_test.dart",code:`import 'package:flutter_test/flutter_test.dart';
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
}`}),e.jsxs("p",{children:["Rode com ",e.jsx("code",{children:"flutter test"}),". Saída esperada: três grupos, todos verdes em < 1 segundo."]}),e.jsx("h2",{children:"Exemplo prático: testando com mocks"}),e.jsxs("p",{children:["Lógica real costuma depender de ",e.jsx("strong",{children:"repositórios"}),", ",e.jsx("strong",{children:"APIs"}),", ",e.jsx("strong",{children:"banco"}),". Você não quer chamar a internet em cada teste. Solução: passe a dependência por construtor (injeção) e use um ",e.jsx("em",{children:"mock"})," nos testes. O pacote ",e.jsx("code",{children:"mocktail"})," torna isso trivial."]}),e.jsx(o,{title:"lib/usuarios_service.dart",code:`abstract class UsuariosRepo {
  Future<String> nomePorId(int id);
}

class UsuariosService {
  final UsuariosRepo repo;
  UsuariosService(this.repo);

  Future<String> saudacao(int id) async {
    final nome = await repo.nomePorId(id);
    return 'Olá, $nome!';
  }
}`}),e.jsx(o,{title:"test/usuarios_service_test.dart",code:`import 'package:flutter_test/flutter_test.dart';
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
}`}),e.jsx("h2",{children:"Matchers úteis"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"equals(x)"})," ou só ",e.jsx("code",{children:"x"})," — igualdade."]}),e.jsxs("li",{children:[e.jsx("code",{children:"isNull"}),", ",e.jsx("code",{children:"isNotNull"}),", ",e.jsx("code",{children:"isTrue"}),", ",e.jsx("code",{children:"isFalse"}),", ",e.jsx("code",{children:"isEmpty"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"greaterThan(0)"}),", ",e.jsx("code",{children:"lessThan(10)"}),", ",e.jsx("code",{children:"inInclusiveRange(0, 100)"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"contains('foo')"})," para strings/listas."]}),e.jsxs("li",{children:[e.jsx("code",{children:"throwsA(isA<FormatException>())"})," para verificar exceção específica."]}),e.jsxs("li",{children:[e.jsx("code",{children:"closeTo(3.14, 0.01)"})," para doubles."]}),e.jsxs("li",{children:[e.jsx("code",{children:"orderedEquals([1, 2, 3])"})," e ",e.jsx("code",{children:"unorderedEquals(...)"})," para listas."]})]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Teste depende de hora do sistema"}),": ",e.jsx("code",{children:"DateTime.now()"})," vira flaky. Injete um relógio (",e.jsx("code",{children:"Clock"}),") ou use ",e.jsx("code",{children:"fakeAsync"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Teste depende da ordem de execução"}),": cada teste deve funcionar isolado. Use ",e.jsx("code",{children:"setUp"}),"/",e.jsx("code",{children:"tearDown"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"await"})]}),": teste async sem ",e.jsx("code",{children:"await"})," pode passar mesmo com erro. Sempre marque a função ",e.jsx("code",{children:"async"})," e use ",e.jsx("code",{children:"await"})," ou retorne o ",e.jsx("code",{children:"Future"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Mock retornando ",e.jsx("code",{children:"null"})," por engano"]}),": configure ",e.jsx("code",{children:"when(...).thenAnswer(...)"})," antes da chamada, ou registre fallback com ",e.jsx("code",{children:"registerFallbackValue"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Misturar lógica e UI"}),": se sua função criou um ",e.jsx("code",{children:"Widget"}),", não é mais unit — vire ",e.jsx("code",{children:"testWidgets"}),"."]})]}),e.jsxs(s,{type:"warning",title:"Cobertura não é tudo",children:["100% de cobertura num código mal projetado ainda deixa bugs entrarem. Foque em testar ",e.jsx("strong",{children:"regras de negócio"})," e ",e.jsx("strong",{children:"caminhos de erro"}),", não em chegar num número mágico."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(s,{type:"tip",title:"Nomeie testes como frases",children:[e.jsx("code",{children:"test('lança quando email está vazio', ...)"})," é melhor que ",e.jsx("code",{children:"test('test1', ...)"}),". Quando o teste falha, a mensagem já conta a história."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Um ",e.jsx("code",{children:"expect"})," por intenção. Vários asserts num teste só dificulta diagnosticar a falha."]}),e.jsxs("li",{children:["Prefira código ",e.jsx("em",{children:"testável"}),": funções puras, dependências por construtor, sem singletons globais."]}),e.jsxs("li",{children:["Cobertura: ",e.jsx("code",{children:"flutter test --coverage"})," gera ",e.jsx("code",{children:"coverage/lcov.info"}),"."]}),e.jsxs("li",{children:["CI: rode ",e.jsx("code",{children:"flutter test"})," em todo PR. Falha vermelha = bloqueio do merge."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Lógica pura, ok. Mas e a UI? Como verificar que o botão está lá, que o texto aparece quando carrego, que o tap incrementa o contador? Para isso existe outra ferramenta: ",e.jsx("strong",{children:"Widget Tests"}),"."]}),e.jsxs(s,{type:"success",title:"Continue para Widget Tests",children:["Próxima página: renderizar widgets em ambiente headless e simular interações com ",e.jsx("code",{children:"tester"}),"."]})]})}export{i as default};
