import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function ExtensionMethods() {
    return (
      <PageContainer title="Extension Methods" subtitle="Adicione métodos a tipos que você não escreveu." difficulty="intermediario" timeToRead="6 min">
        <h2>Sintaxe</h2>
      <CodeBlock title="ext" code="extension StringX on String {\n  bool get isEmail => contains('@') && contains('.');\n  String capitalize() => isEmpty ? '' : '${this[0].toUpperCase()}${substring(1)}';\n}\n\n'ana@x.com'.isEmail; // true\n'ana'.capitalize();   // 'Ana'" />
      <h2>Em Flutter</h2>
      <CodeBlock title="context" code="extension ContextX on BuildContext {\n  ThemeData get theme => Theme.of(this);\n  Size get screenSize => MediaQuery.of(this).size;\n}\n\n// Uso:\ncontext.theme.primaryColor;\ncontext.screenSize.width;" />
      <AlertBox type="info" title="Cuidado com escopo">Extensions só funcionam se importadas no arquivo. Mantenha extensões em arquivos bem nomeados.</AlertBox>
      </PageContainer>
    );
  }
  