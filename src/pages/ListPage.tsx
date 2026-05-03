import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function ListPage() {
    return (
      <PageContainer title="List" subtitle="A coleção mais usada em Flutter — desenho de listas, models, etc." difficulty="iniciante" timeToRead="8 min">
        <h2>Criando listas</h2>
      <CodeBlock title="cria" code="final fixa = const [1, 2, 3];        // imutável\nfinal vazia = <int>[];               // mutável vazia\nfinal nomes = ['Ana', 'Bruno', 'Cris'];\n\nnomes.add('Diego');\nnomes.removeAt(0);" />
      <h2>Operações funcionais</h2>
      <CodeBlock title="funcional" code="final n = [1, 2, 3, 4, 5];\nfinal pares = n.where((x) => x.isEven).toList();   // [2, 4]\nfinal dobrados = n.map((x) => x * 2).toList();      // [2,4,6,8,10]\nfinal soma = n.reduce((a, b) => a + b);             // 15\nfinal contemTres = n.contains(3);                    // true" />
      <h2>Spread e collection-if</h2>
      <CodeBlock title="spread" code="final base = [1, 2, 3];\nfinal completa = [\n  0,\n  ...base,         // 1, 2, 3\n  if (incluirQuatro) 4,\n  for (var i = 5; i <= 7; i++) i,\n];" />
      <AlertBox type="info" title="List em Flutter">É a estrutura por trás de <code>ListView.builder</code>, <code>Column</code> children, etc.</AlertBox>
      </PageContainer>
    );
  }
  