import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function InheritedWidget() {
    return (
      <PageContainer title="InheritedWidget" subtitle="O mecanismo de propagação de dados pela árvore — base de Provider e Theme." difficulty="avancado" timeToRead="8 min">
        <h2>Conceito</h2>
      <p>Permite que descendentes obtenham dados via <code>InheritedWidget.of(context)</code> sem passar por todos os widgets intermediários.</p>
      <CodeBlock title="exemplo" code="class MeuTema extends InheritedWidget {\n  final Color cor;\n  const MeuTema({required this.cor, required super.child});\n\n  static MeuTema of(BuildContext c) =>\n      c.dependOnInheritedWidgetOfExactType<MeuTema>()!;\n\n  @override\n  bool updateShouldNotify(MeuTema old) => cor != old.cor;\n}" />
      <AlertBox type="info" title="Você raramente vai escrever um"><code>Theme</code>, <code>MediaQuery</code>, <code>Provider</code>, <code>Navigator</code> — todos são InheritedWidgets internamente. Conhecê-lo ajuda a entender o sistema.</AlertBox>
      </PageContainer>
    );
  }
  