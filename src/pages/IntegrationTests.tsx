import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function IntegrationTests() {
    return (
      <PageContainer title="Integration Tests" subtitle="Teste end-to-end — app real rodando em emulador/device." difficulty="avancado" timeToRead="8 min">
        <CodeBlock title="exemplo" code="// integration_test/app_test.dart\nimport 'package:integration_test/integration_test.dart';\nimport 'package:flutter_test/flutter_test.dart';\nimport 'package:meu_app/main.dart' as app;\n\nvoid main() {\n  IntegrationTestWidgetsFlutterBinding.ensureInitialized();\n\n  testWidgets('fluxo de login', (tester) async {\n    app.main();\n    await tester.pumpAndSettle();\n\n    await tester.enterText(find.byKey(const Key('email')), 'a@b.com');\n    await tester.enterText(find.byKey(const Key('senha')), '123');\n    await tester.tap(find.text('Entrar'));\n    await tester.pumpAndSettle();\n\n    expect(find.text('Bem-vindo'), findsOneWidget);\n  });\n}" />
      <CodeBlock title="run" code="flutter test integration_test/app_test.dart" />
      <AlertBox type="info" title="Lento, mas necessário">Use para validar fluxos críticos antes do release.</AlertBox>
      </PageContainer>
    );
  }
  