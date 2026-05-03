import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Heranca() {
    return (
      <PageContainer title="Herança" subtitle="extends, super, override e o problema do diamante." difficulty="intermediario" timeToRead="8 min">
        <h2>extends</h2>
      <CodeBlock title="extends" code="class Animal {\n  final String nome;\n  Animal(this.nome);\n  String falar() => '...';\n}\n\nclass Cachorro extends Animal {\n  Cachorro(String nome) : super(nome);\n\n  @override\n  String falar() => 'Au!';\n}" />
      <h2>Limitação</h2>
      <p>Dart é <strong>single inheritance</strong>: só pode herdar de uma classe. Para reutilizar comportamento de várias fontes, use <code>mixins</code> ou <code>interface</code> via <code>implements</code>.</p>
      <AlertBox type="info" title="Composição &gt; herança">Em Flutter, prefira compor widgets em vez de herdar. Apps grandes com cadeias de herança ficam difíceis de manter.</AlertBox>
      </PageContainer>
    );
  }
  