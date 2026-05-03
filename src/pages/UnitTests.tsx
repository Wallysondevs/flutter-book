import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function UnitTests() {
    return (
      <PageContainer title="Unit Tests" subtitle="Testando lógica pura — sem widgets." difficulty="intermediario" timeToRead="8 min">
        <CodeBlock title="exemplo" code="// test/calc_test.dart\nimport 'package:flutter_test/flutter_test.dart';\nimport '../lib/calc.dart';\n\nvoid main() {\n  group('Calculadora', () {\n    test('soma dois positivos', () {\n      expect(soma(2, 3), 5);\n    });\n\n    test('soma com negativo', () {\n      expect(soma(-1, 4), 3);\n    });\n  });\n}" />
      <CodeBlock title="run" code="flutter test" />
      <AlertBox type="info" title="Pacote mockito ou mocktail">Para testes que precisam de mocks (de repositórios, APIs), use <code>mocktail</code> — mais simples que mockito.</AlertBox>
      </PageContainer>
    );
  }
  