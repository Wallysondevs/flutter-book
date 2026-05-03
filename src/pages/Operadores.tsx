import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Operadores() {
    return (
      <PageContainer title="Operadores" subtitle="Aritméticos, lógicos, bitwise, cascade e null-aware." difficulty="iniciante" timeToRead="7 min">
        <h2>Aritméticos e lógicos</h2>
      <CodeBlock title="básicos" code="int a = 10, b = 3;\nprint(a ~/ b);  // 3 (divisão inteira)\nprint(a % b);   // 1\nprint(a == b);  // false\nprint(a > b && b > 0); // true" />
      <h2>Operadores especiais do Dart</h2>
      <ul>
        <li><code>~/</code> divisão inteira</li>
        <li><code>??</code> retorna o lado direito se o esquerdo for null</li>
        <li><code>??=</code> atribui só se for null</li>
        <li><code>?.</code> chamada segura em variável nullable</li>
        <li><code>..</code> cascade — encadeia chamadas no mesmo objeto</li>
      </ul>
      <CodeBlock title="cascade" code="// Sem cascade:\nfinal btn = Button();\nbtn.color = Colors.blue;\nbtn.label = 'Ok';\n\n// Com cascade:\nfinal btn = Button()\n  ..color = Colors.blue\n  ..label = 'Ok';" />
      <AlertBox type="info" title="Cascade brilha em UI">Útil para configurar objetos com muitas propriedades sem repetir o nome da variável.</AlertBox>
      </PageContainer>
    );
  }
  