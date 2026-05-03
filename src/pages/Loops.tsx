import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Loops() {
    return (
      <PageContainer title="Loops" subtitle="for, for-in, while e métodos funcionais." difficulty="iniciante" timeToRead="6 min">
        <h2>Sintaxes</h2>
      <CodeBlock title="for" code="for (int i = 0; i < 5; i++) print(i);\n\nfor (final item in lista) print(item);\n\nint i = 0;\nwhile (i < 3) { print(i); i++; }" />
      <h2>Estilo funcional</h2>
      <CodeBlock title="funcional" code="// Em vez de for + if, prefira:\nfinal pares = numeros.where((n) => n.isEven).toList();\nfinal dobrados = numeros.map((n) => n * 2).toList();\nnumeros.forEach(print);" />
      <AlertBox type="info" title="Quando usar cada um">Use <code>for-in</code> para clareza, <code>map/where/forEach</code> para cadeias funcionais. <code>for (int i)</code> só quando você precisa do índice.</AlertBox>
      </PageContainer>
    );
  }
  