import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Slivers() {
    return (
      <PageContainer title="Slivers" subtitle="Layouts roláveis customizados — header colapsável, AppBar dinâmica." difficulty="avancado" timeToRead="10 min">
        <h2>Conceito</h2>
      <p>Slivers são pedaços roláveis que vivem dentro de um <code>CustomScrollView</code>. Cada sliver pode ter um comportamento de scroll diferente.</p>
      <CodeBlock title="exemplo" code="CustomScrollView(\n  slivers: [\n    SliverAppBar(\n      expandedHeight: 200,\n      pinned: true,\n      flexibleSpace: FlexibleSpaceBar(\n        title: const Text('Galeria'),\n        background: Image.network(banner, fit: BoxFit.cover),\n      ),\n    ),\n    SliverGrid.count(\n      crossAxisCount: 3,\n      children: items.map((u) => Image.network(u)).toList(),\n    ),\n  ],\n)" />
      <AlertBox type="info" title="Onde brilha">Telas que misturam header colapsável + lista + grid + footer. Sem slivers, fica complicado coordenar scrolls.</AlertBox>
      </PageContainer>
    );
  }
  