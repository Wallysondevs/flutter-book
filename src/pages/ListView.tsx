import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function ListView() {
    return (
      <PageContainer title="ListView & GridView" subtitle="Listas e grids roláveis — com versão lazy para listas grandes." difficulty="iniciante" timeToRead="9 min">
        <h2>ListView.builder (lazy)</h2>
      <CodeBlock title="builder" code="ListView.builder(\n  itemCount: items.length,\n  itemBuilder: (ctx, i) => ListTile(\n    title: Text(items[i].nome),\n    subtitle: Text(items[i].subtitulo),\n  ),\n)" />
      <h2>GridView.builder</h2>
      <CodeBlock title="grid" code="GridView.builder(\n  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(\n    crossAxisCount: 3,\n    crossAxisSpacing: 8,\n    mainAxisSpacing: 8,\n  ),\n  itemBuilder: (ctx, i) => Image.network(urls[i]),\n)" />
      <AlertBox type="warning" title="Sempre builder em listas grandes">Nunca use <code>ListView(children: [...])</code> com 100+ itens — ele renderiza tudo de uma vez. <code>builder</code> só renderiza o que está visível.</AlertBox>
      </PageContainer>
    );
  }
  