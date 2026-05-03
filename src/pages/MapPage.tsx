import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function MapPage() {
    return (
      <PageContainer title="Map" subtitle="Pares chave-valor — base de JSON e configurações." difficulty="iniciante" timeToRead="8 min">
        <h2>Criando</h2>
      <CodeBlock title="cria" code="final idades = <String, int>{\n  'Ana': 30,\n  'Bruno': 25,\n};\n\nidades['Cris'] = 28;\nfinal anaIdade = idades['Ana']; // int? (pode ser null)" />
      <h2>Iteração</h2>
      <CodeBlock title="iter" code="idades.forEach((nome, idade) {\n  print('$nome tem $idade anos');\n});\n\nfor (final entry in idades.entries) {\n  print('${entry.key} → ${entry.value}');\n}" />
      <h2>Útil para JSON</h2>
      <CodeBlock title="json" code="final json = jsonDecode(resposta) as Map<String, dynamic>;\nfinal nome = json['nome'] as String;\nfinal idade = json['idade'] as int;" />
      <AlertBox type="warning" title="Map<String, dynamic>">É o tipo padrão de JSON parseado. Sempre faça cast explícito ao ler campos para preservar a segurança de tipos.</AlertBox>
      </PageContainer>
    );
  }
  