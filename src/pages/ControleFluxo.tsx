import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function ControleFluxo() {
    return (
      <PageContainer title="Controle de Fluxo" subtitle="if, switch expression e pattern matching." difficulty="iniciante" timeToRead="8 min">
        <h2>if / else</h2>
      <CodeBlock title="if" code="if (idade >= 18) {\n  print('adulto');\n} else if (idade >= 13) {\n  print('adolescente');\n} else {\n  print('criança');\n}" />
      <h2>Switch expression (Dart 3+)</h2>
      <CodeBlock title="switch" code="final mensagem = switch (status) {\n  'ok' => 'Tudo certo',\n  'erro' => 'Algo falhou',\n  _ => 'Desconhecido',\n};" />
      <h2>Pattern matching</h2>
      <CodeBlock title="pattern" code="sealed class Resultado {}\nclass Sucesso extends Resultado { final String dados; Sucesso(this.dados); }\nclass Falha extends Resultado { final String erro; Falha(this.erro); }\n\nfinal texto = switch (resultado) {\n  Sucesso(:final dados) => 'OK: $dados',\n  Falha(:final erro) => 'Erro: $erro',\n};" />
      <AlertBox type="success" title="Switch expression é game changer">Em Dart 3, ele substitui muito if/else encadeado e força você a cobrir todos os casos.</AlertBox>
      </PageContainer>
    );
  }
  