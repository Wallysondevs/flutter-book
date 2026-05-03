import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Keys() {
    return (
      <PageContainer title="Keys" subtitle="Como o Flutter identifica widgets entre rebuilds." difficulty="avancado" timeToRead="8 min">
        <h2>Por que existem</h2>
      <p>Quando a widget tree muda, o Flutter precisa decidir quais elementos reaproveitar. Para widgets idênticos no mesmo lugar, ele usa o tipo. Para listas de widgets do mesmo tipo, sem key ele se confunde.</p>
      <CodeBlock title="exemplo" code="// Sem key — ao reordenar, o Flutter pode misturar estados\nColumn(children: [TodoItem(), TodoItem(), TodoItem()])\n\n// Com key — ele preserva o estado correto\nColumn(children: items.map((t) => TodoItem(key: ValueKey(t.id))).toList())" />
      <h2>Tipos de Key</h2>
      <ul>
        <li><code>ValueKey</code> — baseada em valor (id, string)</li>
        <li><code>ObjectKey</code> — baseada na identidade do objeto</li>
        <li><code>UniqueKey</code> — sempre única (cuidado, força recriação)</li>
        <li><code>GlobalKey</code> — acessa State de qualquer lugar (use raramente)</li>
      </ul>
      <AlertBox type="warning" title="Use ValueKey em listas reordenáveis">Sem key correta, o estado dos itens (scroll, animações) embaralha visualmente.</AlertBox>
      </PageContainer>
    );
  }
  