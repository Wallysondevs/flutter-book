import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function SetPage() {
    return (
      <PageContainer title="Set" subtitle="Coleção sem duplicados — útil para tags, IDs únicos." difficulty="iniciante" timeToRead="5 min">
        <h2>Criando</h2>
      <CodeBlock title="cria" code="final tags = <String>{'flutter', 'dart', 'mobile'};\ntags.add('flutter'); // ignora — já existe\nprint(tags.length);  // 3" />
      <h2>Operações de conjunto</h2>
      <CodeBlock title="ops" code="final a = {1, 2, 3};\nfinal b = {2, 3, 4};\nprint(a.union(b));        // {1,2,3,4}\nprint(a.intersection(b)); // {2,3}\nprint(a.difference(b));   // {1}" />
      <AlertBox type="info" title="Performance">Set tem lookup O(1) com hash. Para checar se algo já existe entre milhares de itens, é muito mais rápido que List.</AlertBox>
      </PageContainer>
    );
  }
  