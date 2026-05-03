import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Mixins() {
    return (
      <PageContainer title="Mixins" subtitle="Reutilização horizontal de comportamento." difficulty="intermediario" timeToRead="10 min">
        <h2>Definição</h2>
      <CodeBlock title="mixin" code="mixin Voador {\n  void voar() => print('Voando!');\n}\n\nmixin Nadador {\n  void nadar() => print('Nadando!');\n}\n\nclass Pato extends Animal with Voador, Nadador {\n  Pato(String nome) : super(nome);\n}\n\nfinal p = Pato('Donald');\np.voar();\np.nadar();" />
      <h2>Mixin com restrição (on)</h2>
      <CodeBlock title="on" code="mixin LogarAcoes on Animal {\n  void logar(String acao) {\n    print('$nome: $acao');\n  }\n}" />
      <AlertBox type="info" title="Onde aparece em Flutter"><code>SingleTickerProviderStateMixin</code> para animações, <code>AutomaticKeepAliveClientMixin</code> para preservar estado em PageView, etc.</AlertBox>
      </PageContainer>
    );
  }
  