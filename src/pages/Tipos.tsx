import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Tipos() {
    return (
      <PageContainer title="Tipos & Variáveis" subtitle="int, double, String, bool e os modificadores var/final/const." difficulty="iniciante" timeToRead="10 min">
        <h2>Tipos primitivos</h2>
      <CodeBlock title="exemplos" code="int idade = 30;\ndouble altura = 1.75;\nString nome = 'Maria';\nbool ativo = true;\nList<int> notas = [8, 9, 10];\nMap<String, int> idades = {'Ana': 25, 'Bruno': 30};" />
      <h2>var, final, const</h2>
      <ul>
        <li><code>var</code> — tipo inferido, valor pode mudar</li>
        <li><code>final</code> — valor atribuído uma vez (em runtime)</li>
        <li><code>const</code> — constante de tempo de compilação</li>
      </ul>
      <CodeBlock title="diferença" code="var x = 10;       // mutável\nfinal y = DateTime.now(); // imutável após init\nconst pi = 3.14;  // calculado em compile-time" />
      <AlertBox type="warning" title="Prefira final">Em Flutter, use <code>final</code> sempre que possível. Variáveis mutáveis indicam estado, e estado deve ficar em StatefulWidget ou em providers.</AlertBox>
      </PageContainer>
    );
  }
  