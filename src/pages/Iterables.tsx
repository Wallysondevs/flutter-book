import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Iterables() {
    return (
      <PageContainer title="Iterables & Spread" subtitle="List, Set, Map e a interface comum por trás deles." difficulty="intermediario" timeToRead="6 min">
        <h2>Iterable é a interface mãe</h2>
      <p>Tudo que você itera com <code>for-in</code> implementa <code>Iterable</code>: <code>List</code>, <code>Set</code>, valores de <code>Map</code>, ranges gerados etc.</p>
      <CodeBlock title="exemplo" code="Iterable<int> contar(int n) sync* {\n  for (var i = 1; i <= n; i++) yield i;\n}\n\nfor (final i in contar(5)) print(i);" />
      <h2>Lazy vs eager</h2>
      <p>Métodos como <code>map</code> e <code>where</code> retornam um <code>Iterable</code> lazy — só computa quando você itera. Chame <code>.toList()</code> para materializar.</p>
      <AlertBox type="info" title="Cuidado">Iterar duas vezes um Iterable lazy executa duas vezes o pipeline. Materialize com <code>toList()</code> se vai reusar.</AlertBox>
      </PageContainer>
    );
  }
  