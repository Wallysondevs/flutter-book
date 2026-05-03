import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Navigator1() {
    return (
      <PageContainer title="Navigator 1.0" subtitle="Stack imperativa de páginas — push/pop." difficulty="iniciante" timeToRead="7 min">
        <h2>Sintaxe</h2>
      <CodeBlock title="push" code="Navigator.push(\n  context,\n  MaterialPageRoute(builder: (c) => const DetalhesPage()),\n);\n\nNavigator.pop(context);  // volta\nNavigator.pop(context, 'resultado');  // volta com valor" />
      <h2>Esperando resultado</h2>
      <CodeBlock title="await" code="final result = await Navigator.push<String>(\n  context,\n  MaterialPageRoute(builder: (c) => const SelecionaPage()),\n);\nprint(result);" />
      <AlertBox type="info" title="Quando basta">Apps pequenos com navegação simples. Para deep links, web e fluxos complexos, use <code>go_router</code>.</AlertBox>
      </PageContainer>
    );
  }
  