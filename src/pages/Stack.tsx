import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Stack() {
    return (
      <PageContainer title="Stack & Positioned" subtitle="Empilhar widgets uns sobre os outros — perfeito para overlays." difficulty="iniciante" timeToRead="7 min">
        <h2>Exemplo</h2>
      <CodeBlock title="stack" code="Stack(\n  children: [\n    Image.network(url, fit: BoxFit.cover),\n    const Positioned(\n      bottom: 16,\n      right: 16,\n      child: Icon(Icons.favorite, color: Colors.red, size: 32),\n    ),\n  ],\n)" />
      <h2>Alignment & fit</h2>
      <p> <code>alignment</code> define onde os filhos sem Positioned vão. <code>fit: StackFit.expand</code> faz a Stack ocupar tudo que o pai oferece.</p>
      <AlertBox type="info" title="Use sparingly">Stack é poderoso mas frágil para layout responsivo. Para layouts complexos, prefira combinar Row/Column/Wrap.</AlertBox>
      </PageContainer>
    );
  }
  