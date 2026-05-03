import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function RowColumn() {
    return (
      <PageContainer title="Row & Column" subtitle="Os widgets de layout linear mais usados em Flutter." difficulty="iniciante" timeToRead="9 min">
        <h2>Sintaxe</h2>
      <CodeBlock title="exemplo" code="Row(\n  mainAxisAlignment: MainAxisAlignment.spaceBetween,\n  crossAxisAlignment: CrossAxisAlignment.center,\n  children: [\n    Icon(Icons.home),\n    Text('Início'),\n    Icon(Icons.settings),\n  ],\n)" />
      <h2>Conceitos-chave</h2>
      <ul>
        <li><code>mainAxis</code> = direção principal (horizontal em Row, vertical em Column)</li>
        <li><code>crossAxis</code> = perpendicular</li>
        <li><code>MainAxisAlignment</code>: start, end, center, spaceBetween, spaceAround, spaceEvenly</li>
        <li><code>CrossAxisAlignment</code>: start, end, center, stretch, baseline</li>
      </ul>
      <h2>Erro clássico: overflow</h2>
      <p>Row tem largura infinita por padrão. Se um filho for grande demais, dá overflow. Use <code>Expanded</code> ou <code>Flexible</code>, ou envelope em <code>SingleChildScrollView</code>.</p>
      <AlertBox type="warning" title="Yellow & black tape">Aquela barra listrada amarela e preta significa overflow. Sempre trate antes de subir o app.</AlertBox>
      </PageContainer>
    );
  }
  