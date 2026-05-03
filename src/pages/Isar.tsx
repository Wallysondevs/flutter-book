import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Isar() {
    return (
      <PageContainer title="Isar" subtitle="Banco moderno em Dart — extremamente rápido com queries indexadas." difficulty="avancado" timeToRead="7 min">
        <h2>Por que considerar</h2>
      <p>Isar v3+ é considerado o sucessor espiritual do Hive. Suporta queries com índices, full-text search e transações ACID, mantendo a API simples.</p>
      <CodeBlock title="model" code="@collection\nclass Usuario {\n  Id id = Isar.autoIncrement;\n  late String nome;\n  @Index() late int idade;\n}" />
      <AlertBox type="info" title="Code-gen necessário">Como sqflite não, Isar requer <code>build_runner</code>. O retorno em performance compensa.</AlertBox>
      </PageContainer>
    );
  }
  