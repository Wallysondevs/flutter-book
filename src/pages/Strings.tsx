import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Strings() {
    return (
      <PageContainer title="Strings & Interpolação" subtitle="Aspas simples, duplas, raw e multilinha." difficulty="iniciante" timeToRead="6 min">
        <h2>Sintaxe</h2>
      <CodeBlock title="exemplos" code="String simples = 'olá';\nString dupla = \"olá\";\nString multilinha = '''\nLinha 1\nLinha 2\n''';\nString raw = r'C:\\Users\\Ana';  // sem escape" />
      <h2>Interpolação</h2>
      <CodeBlock title="interp" code="final nome = 'Ana';\nfinal idade = 30;\nprint('Olá, $nome! Você tem $idade anos.');\nprint('Próximo ano: ${idade + 1}');" />
      <h2>Métodos úteis</h2>
      <ul>
        <li><code>nome.toUpperCase()</code> / <code>toLowerCase()</code></li>
        <li><code>nome.split(',')</code> retorna List&lt;String&gt;</li>
        <li><code>nome.contains('an')</code></li>
        <li><code>nome.replaceAll('a', 'X')</code></li>
        <li><code>'  ola  '.trim()</code></li>
      </ul>
      <AlertBox type="info" title="Performance">Para concatenar muitas strings em loop, use <code>StringBuffer</code> em vez de <code>+=</code>.</AlertBox>
      </PageContainer>
    );
  }
  