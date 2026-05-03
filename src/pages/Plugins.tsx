import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Plugins() {
    return (
      <PageContainer title="Criar Plugins" subtitle="Empacote código nativo em pacotes reutilizáveis para o pub.dev." difficulty="avancado" timeToRead="8 min">
        <CodeBlock title="cli" code="flutter create --template=plugin --platforms=android,ios meu_plugin" />
      <p>O Flutter gera estrutura com Dart API + implementações Android (Kotlin) e iOS (Swift). Você expõe métodos via platform channels e publica no <a href='https://pub.dev'>pub.dev</a>.</p>
      <AlertBox type="success" title="Federated plugins">A arquitetura moderna separa <code>interface</code>, <code>android</code>, <code>ios</code> em pacotes distintos. Permite manter cada plataforma independente.</AlertBox>
      </PageContainer>
    );
  }
  