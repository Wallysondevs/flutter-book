import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Navigator2() {
    return (
      <PageContainer title="Navigator 2.0" subtitle="API declarativa — você descreve a stack como dado." difficulty="avancado" timeToRead="12 min">
        <h2>A ideia</h2>
      <p>Em vez de empurrar telas, você fornece uma <strong>lista</strong> de páginas que reflete o estado atual. O Navigator se encarrega de animar entradas e saídas.</p>
      <CodeBlock title="exemplo" code="Navigator(\n  pages: [\n    const MaterialPage(child: HomePage()),\n    if (selectedId != null)\n      MaterialPage(child: DetalhesPage(id: selectedId!)),\n  ],\n  onPopPage: (route, result) {\n    if (!route.didPop(result)) return false;\n    setState(() => selectedId = null);\n    return true;\n  },\n)" />
      <AlertBox type="warning" title="Verboso">Na prática, quase ninguém usa Navigator 2.0 cru. Use <code>go_router</code> que abstrai tudo isso.</AlertBox>
      </PageContainer>
    );
  }
  