import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Sealed() {
    return (
      <PageContainer title="Sealed Classes" subtitle="Hierarquias fechadas — perfeito para estados e resultados." difficulty="intermediario" timeToRead="8 min">
        <h2>Definição</h2>
      <CodeBlock title="sealed" code="sealed class Estado {}\nclass Carregando extends Estado {}\nclass Sucesso extends Estado { final List<String> dados; Sucesso(this.dados); }\nclass Erro extends Estado { final String msg; Erro(this.msg); }" />
      <h2>Pattern matching exaustivo</h2>
      <CodeBlock title="match" code="Widget build(BuildContext c) {\n  return switch (estado) {\n    Carregando() => const CircularProgressIndicator(),\n    Sucesso(:final dados) => ListView(children: dados.map(Text.new).toList()),\n    Erro(:final msg) => Text('Erro: $msg'),\n  };\n}" />
      <AlertBox type="success" title="Por que sealed brilha">O compilador exige que você cubra todos os casos. Adicionar um novo estado quebra o switch — você é forçado a tratar.</AlertBox>
      </PageContainer>
    );
  }
  