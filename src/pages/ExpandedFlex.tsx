import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function ExpandedFlex() {
    return (
      <PageContainer title="Expanded & Flex" subtitle="Como dividir o espaço disponível em Row e Column." difficulty="iniciante" timeToRead="6 min">
        <h2>Expanded</h2>
      <CodeBlock title="exemplo" code="Row(\n  children: [\n    const Icon(Icons.menu),\n    Expanded(child: TextField()),  // ocupa o resto\n    const Icon(Icons.send),\n  ],\n)" />
      <h2>flex factor</h2>
      <CodeBlock title="factor" code="Row(\n  children: [\n    Expanded(flex: 2, child: Container(color: Colors.red)),\n    Expanded(flex: 3, child: Container(color: Colors.blue)),\n  ],\n)\n// Vermelho ocupa 2/5, azul 3/5" />
      <AlertBox type="info" title="Flexible vs Expanded"><code>Expanded</code> força o filho a ocupar todo o espaço do flex. <code>Flexible</code> permite que ele seja menor se quiser.</AlertBox>
      </PageContainer>
    );
  }
  