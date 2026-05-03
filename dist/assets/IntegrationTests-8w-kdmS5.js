import{j as e}from"./index-D4AOhXGO.js";import{P as s,A as t,C as i}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(s,{title:"Integration Tests",subtitle:"Testes end-to-end — app real rodando em emulador, device ou navegador.",difficulty:"avancado",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Unit tests garantem que cada peça funciona. Widget tests garantem que cada tela funciona. Mas só ",e.jsx("strong",{children:"integration tests"})," garantem que tudo ",e.jsx("em",{children:"junto"})," funciona: login → dashboard → adicionar item → salvar no banco → ver na lista. É o teste que mais se aproxima do que o usuário vai fazer."]}),e.jsxs("p",{children:["Eles rodam o app ",e.jsx("strong",{children:"de verdade"})," em emulador/device, atravessando navegação real, plugins nativos (câmera, GPS, biometria), banco de dados local e APIs HTTP. Lentos comparados aos outros (segundos a minutos), mas insubstituíveis para validar fluxos críticos antes do release."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["O Flutter expõe o pacote ",e.jsx("code",{children:"integration_test"})," (oficial) que combina o motor de widget tests com a capacidade de iniciar o app inteiro. A API é a mesma do widget test (",e.jsx("code",{children:"tester"}),", ",e.jsx("code",{children:"find"}),", ",e.jsx("code",{children:"expect"}),"), mas:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Você chama ",e.jsx("code",{children:"app.main()"})," de verdade — o ponto de entrada do seu app real."]}),e.jsx("li",{children:"Roda no device/emulador — vê plugins nativos, GPU, fontes, fontes do sistema."}),e.jsxs("li",{children:["É ",e.jsx("strong",{children:"idempotente sob risco"}),": se um teste deixa lixo no banco, o próximo pega esse estado. Limpe sempre."]})]}),e.jsxs(t,{type:"info",title:"Onde os arquivos vão",children:["Crie a pasta ",e.jsx("code",{children:"integration_test/"})," na raiz do projeto (mesmo nível de ",e.jsx("code",{children:"test/"})," e ",e.jsx("code",{children:"lib/"}),"). Adicione no ",e.jsx("code",{children:"pubspec.yaml"}),": ",e.jsx("code",{children:"dev_dependencies: integration_test:"})," com ",e.jsx("code",{children:"sdk: flutter"}),"."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(i,{title:"integration_test/app_test.dart",code:`import 'package:integration_test/integration_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:meu_app/main.dart' as app;

void main() {
  // OBRIGATÓRIO — inicializa a "ponte" entre o test runner e o app real
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Fluxo de login completo', () {
    testWidgets('login com sucesso leva ao dashboard', (tester) async {
      // 1) inicia o app de verdade (roda main() do projeto)
      app.main();
      // 2) espera renderização inicial + animações terminarem
      await tester.pumpAndSettle();

      // 3) interage como usuário
      await tester.enterText(
        find.byKey(const Key('email')), 'demo@exemplo.com',
      );
      await tester.enterText(
        find.byKey(const Key('senha')), 'senha123',
      );
      await tester.tap(find.text('Entrar'));

      // 4) espera resposta da API + transição de tela
      await tester.pumpAndSettle(const Duration(seconds: 5));

      // 5) confirma que está no dashboard
      expect(find.text('Bem-vindo, demo'), findsOneWidget);
    });

    testWidgets('credencial inválida mostra erro', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      await tester.enterText(
        find.byKey(const Key('email')), 'errado@exemplo.com',
      );
      await tester.enterText(
        find.byKey(const Key('senha')), 'xxx',
      );
      await tester.tap(find.text('Entrar'));
      await tester.pumpAndSettle(const Duration(seconds: 5));

      expect(find.textContaining('inválid'), findsWidgets);
    });
  });
}`}),e.jsx("p",{children:"Rode em emulador/device conectado:"}),e.jsx(i,{title:"terminal",code:`# precisa de um device/emulador rodando
flutter devices

# roda um arquivo específico
flutter test integration_test/app_test.dart

# roda todos
flutter test integration_test/`}),e.jsx("h2",{children:"Exemplo prático: testando um fluxo de CRUD"}),e.jsx(i,{title:"adicionar e remover item",code:`testWidgets('adiciona, vê na lista e remove', (tester) async {
  app.main();
  await tester.pumpAndSettle();

  // garante estado limpo: limpa banco antes
  await tester.tap(find.byKey(const Key('menu')));
  await tester.pumpAndSettle();
  await tester.tap(find.text('Limpar tudo'));
  await tester.pumpAndSettle();

  expect(find.text('Lista vazia'), findsOneWidget);

  // adiciona
  await tester.tap(find.byIcon(Icons.add));
  await tester.pumpAndSettle();
  await tester.enterText(
    find.byKey(const Key('campo-titulo')), 'Comprar leite',
  );
  await tester.tap(find.text('Salvar'));
  await tester.pumpAndSettle();

  // confirma na lista
  expect(find.text('Comprar leite'), findsOneWidget);

  // remove (long press dispara o menu)
  await tester.longPress(find.text('Comprar leite'));
  await tester.pumpAndSettle();
  await tester.tap(find.text('Excluir'));
  await tester.pumpAndSettle();

  expect(find.text('Comprar leite'), findsNothing);
  expect(find.text('Lista vazia'), findsOneWidget);
});`}),e.jsx("h2",{children:"Rodando em CI"}),e.jsx("p",{children:"Para rodar em pipeline (GitHub Actions, GitLab, Bitrise), você precisa de um emulador headless. Soluções comuns:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Android"}),": ",e.jsx("code",{children:"reactivecircus/android-emulator-runner"})," no GitHub Actions."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"iOS"}),": macOS runner + ",e.jsx("code",{children:"xcrun simctl"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Firebase Test Lab"}),": roda em centenas de devices reais por demanda. Comando: ",e.jsx("code",{children:"gcloud firebase test android run"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Web"}),": ",e.jsx("code",{children:"flutter drive --driver=test_driver/integration_test.dart --target=integration_test/app_test.dart -d chrome"}),"."]})]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"ensureInitialized()"})]}),": o teste nem inicia. Erro confuso sobre binding."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Estado vazado entre testes"}),": SharedPreferences, banco local, cache HTTP. Limpe no ",e.jsx("code",{children:"setUp"}),' ou crie um endpoint/flag de "reset" só pra testes.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esperar tempo fixo demais"}),": ",e.jsx("code",{children:"Future.delayed(seconds: 10)"})," torna teste lento e ainda flaky. Prefira ",e.jsx("code",{children:"pumpAndSettle"})," com timeout, ou polling com ",e.jsx("code",{children:"tester.pump"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Depender de servidor de produção"}),": teste em ambiente de staging ou mocke a camada de rede com um servidor local."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Permissões nativas"}),": câmera, localização exigem aprovação do sistema. Use ",e.jsx("code",{children:"--dart-define"})," para forçar mocks, ou ferramentas como ",e.jsx("code",{children:"patrol"})," que automatizam diálogos do SO."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Animações infinitas"}),": ",e.jsx("code",{children:"pumpAndSettle"})," trava. Use ",e.jsx("code",{children:"pump(Duration(...))"})," e quebre o loop manualmente nos testes."]})]}),e.jsxs(t,{type:"warning",title:"Custo: tempo + manutenção",children:["Integration tests são poderosos mas frágeis: qualquer mudança de UX pode quebrar vários ao mesmo tempo. Cubra apenas ",e.jsx("strong",{children:"fluxos críticos"})," (login, checkout, fluxo principal do produto). O resto fica em widget/unit tests."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(t,{type:"tip",title:"A pirâmide de testes",children:["Muitos unit tests (rápidos, baratos) na base. Vários widget tests no meio. ",e.jsx("strong",{children:"Poucos"})," integration tests no topo. Inverter essa pirâmide deixa o CI lento e a equipe frustrada."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Key"}),"s em todos os widgets de fluxo crítico — sem isso o teste vira jogo de adivinhação."]}),e.jsxs("li",{children:["Escreva um ",e.jsx("code",{children:"RobotPattern"}),"/Page Object: classes com métodos como ",e.jsx("code",{children:"fazerLogin(...)"})," que escondem a manipulação do ",e.jsx("code",{children:"tester"}),". Os testes ficam legíveis."]}),e.jsx("li",{children:'Configure o app com flag de "modo teste" — desabilita animações longas, força banco em memória, mock de pagamento.'}),e.jsxs("li",{children:["Capture screenshots em pontos-chave (",e.jsx("code",{children:"binding.takeScreenshot('passo')"}),") para diagnóstico em CI."]}),e.jsxs("li",{children:["Considere ",e.jsx("code",{children:"patrol"})," (pacote da LeanCode): API mais ergonômica, automatiza permissões nativas e funciona em fluxos com WebView."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsx("p",{children:"Com unit + widget + integration tests, você tem confiança de subir releases sem segurar respiração. O capítulo final dessa pirâmide é integrar tudo num pipeline de CI/CD: build, teste, distribuição."}),e.jsx(t,{type:"success",title:"O que vem por aí",children:"Próximos capítulos: deploy contínuo, fastlane, distribuição via TestFlight e Firebase App Distribution."})]})}export{n as default};
