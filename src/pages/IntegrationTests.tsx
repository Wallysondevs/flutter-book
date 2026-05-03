import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function IntegrationTests() {
  return (
    <PageContainer
      title="Integration Tests"
      subtitle="Testes end-to-end — app real rodando em emulador, device ou navegador."
      difficulty="avancado"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Unit tests garantem que cada peça funciona. Widget tests garantem que cada tela funciona. Mas só <strong>integration tests</strong> garantem que tudo <em>junto</em> funciona: login → dashboard → adicionar item → salvar no banco → ver na lista. É o teste que mais se aproxima do que o usuário vai fazer.
      </p>
      <p>
        Eles rodam o app <strong>de verdade</strong> em emulador/device, atravessando navegação real, plugins nativos (câmera, GPS, biometria), banco de dados local e APIs HTTP. Lentos comparados aos outros (segundos a minutos), mas insubstituíveis para validar fluxos críticos antes do release.
      </p>

      <h2>O conceito</h2>
      <p>
        O Flutter expõe o pacote <code>integration_test</code> (oficial) que combina o motor de widget tests com a capacidade de iniciar o app inteiro. A API é a mesma do widget test (<code>tester</code>, <code>find</code>, <code>expect</code>), mas:
      </p>
      <ul>
        <li>Você chama <code>app.main()</code> de verdade — o ponto de entrada do seu app real.</li>
        <li>Roda no device/emulador — vê plugins nativos, GPU, fontes, fontes do sistema.</li>
        <li>É <strong>idempotente sob risco</strong>: se um teste deixa lixo no banco, o próximo pega esse estado. Limpe sempre.</li>
      </ul>

      <AlertBox type="info" title="Onde os arquivos vão">
        Crie a pasta <code>integration_test/</code> na raiz do projeto (mesmo nível de <code>test/</code> e <code>lib/</code>). Adicione no <code>pubspec.yaml</code>: <code>dev_dependencies: integration_test:</code> com <code>sdk: flutter</code>.
      </AlertBox>

      <h2>Como Flutter faz</h2>

      <CodeBlock title="integration_test/app_test.dart" code={`import 'package:integration_test/integration_test.dart';
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
}`} />

      <p>Rode em emulador/device conectado:</p>

      <CodeBlock title="terminal" code={`# precisa de um device/emulador rodando
flutter devices

# roda um arquivo específico
flutter test integration_test/app_test.dart

# roda todos
flutter test integration_test/`} />

      <h2>Exemplo prático: testando um fluxo de CRUD</h2>

      <CodeBlock title="adicionar e remover item" code={`testWidgets('adiciona, vê na lista e remove', (tester) async {
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
});`} />

      <h2>Rodando em CI</h2>
      <p>
        Para rodar em pipeline (GitHub Actions, GitLab, Bitrise), você precisa de um emulador headless. Soluções comuns:
      </p>
      <ul>
        <li><strong>Android</strong>: <code>reactivecircus/android-emulator-runner</code> no GitHub Actions.</li>
        <li><strong>iOS</strong>: macOS runner + <code>xcrun simctl</code>.</li>
        <li><strong>Firebase Test Lab</strong>: roda em centenas de devices reais por demanda. Comando: <code>gcloud firebase test android run</code>.</li>
        <li><strong>Web</strong>: <code>flutter drive --driver=test_driver/integration_test.dart --target=integration_test/app_test.dart -d chrome</code>.</li>
      </ul>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer <code>ensureInitialized()</code></strong>: o teste nem inicia. Erro confuso sobre binding.</li>
        <li><strong>Estado vazado entre testes</strong>: SharedPreferences, banco local, cache HTTP. Limpe no <code>setUp</code> ou crie um endpoint/flag de "reset" só pra testes.</li>
        <li><strong>Esperar tempo fixo demais</strong>: <code>Future.delayed(seconds: 10)</code> torna teste lento e ainda flaky. Prefira <code>pumpAndSettle</code> com timeout, ou polling com <code>tester.pump</code>.</li>
        <li><strong>Depender de servidor de produção</strong>: teste em ambiente de staging ou mocke a camada de rede com um servidor local.</li>
        <li><strong>Permissões nativas</strong>: câmera, localização exigem aprovação do sistema. Use <code>--dart-define</code> para forçar mocks, ou ferramentas como <code>patrol</code> que automatizam diálogos do SO.</li>
        <li><strong>Animações infinitas</strong>: <code>pumpAndSettle</code> trava. Use <code>pump(Duration(...))</code> e quebre o loop manualmente nos testes.</li>
      </ul>

      <AlertBox type="warning" title="Custo: tempo + manutenção">
        Integration tests são poderosos mas frágeis: qualquer mudança de UX pode quebrar vários ao mesmo tempo. Cubra apenas <strong>fluxos críticos</strong> (login, checkout, fluxo principal do produto). O resto fica em widget/unit tests.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="A pirâmide de testes">
        Muitos unit tests (rápidos, baratos) na base. Vários widget tests no meio. <strong>Poucos</strong> integration tests no topo. Inverter essa pirâmide deixa o CI lento e a equipe frustrada.
      </AlertBox>
      <ul>
        <li>Use <code>Key</code>s em todos os widgets de fluxo crítico — sem isso o teste vira jogo de adivinhação.</li>
        <li>Escreva um <code>RobotPattern</code>/Page Object: classes com métodos como <code>fazerLogin(...)</code> que escondem a manipulação do <code>tester</code>. Os testes ficam legíveis.</li>
        <li>Configure o app com flag de "modo teste" — desabilita animações longas, força banco em memória, mock de pagamento.</li>
        <li>Capture screenshots em pontos-chave (<code>binding.takeScreenshot('passo')</code>) para diagnóstico em CI.</li>
        <li>Considere <code>patrol</code> (pacote da LeanCode): API mais ergonômica, automatiza permissões nativas e funciona em fluxos com WebView.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Com unit + widget + integration tests, você tem confiança de subir releases sem segurar respiração. O capítulo final dessa pirâmide é integrar tudo num pipeline de CI/CD: build, teste, distribuição.
      </p>
      <AlertBox type="success" title="O que vem por aí">
        Próximos capítulos: deploy contínuo, fastlane, distribuição via TestFlight e Firebase App Distribution.
      </AlertBox>
    </PageContainer>
  );
}
