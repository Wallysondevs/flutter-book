import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function WidgetTests() {
    return (
      <PageContainer title="Widget Tests" subtitle="Renderize um widget e simule interações sem precisar de device." difficulty="intermediario" timeToRead="10 min">
        <CodeBlock title="exemplo" code="testWidgets('contador incrementa', (tester) async {\n  await tester.pumpWidget(const MaterialApp(home: Contador()));\n\n  expect(find.text('0'), findsOneWidget);\n\n  await tester.tap(find.byIcon(Icons.add));\n  await tester.pump();\n\n  expect(find.text('1'), findsOneWidget);\n});" />
      <AlertBox type="success" title="Rápido!">Widget tests rodam num ambiente headless — em milissegundos. Use generosamente.</AlertBox>
      </PageContainer>
    );
  }
  