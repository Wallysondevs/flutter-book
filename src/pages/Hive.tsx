import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Hive() {
    return (
      <PageContainer title="Hive" subtitle="Banco NoSQL puro Dart — rápido, leve, sem schema." difficulty="intermediario" timeToRead="8 min">
        <CodeBlock title="pubspec" code="dependencies:\n  hive_flutter: ^1.1.0" />
      <CodeBlock title="uso" code="await Hive.initFlutter();\nfinal box = await Hive.openBox<String>('settings');\n\nawait box.put('idioma', 'pt-BR');\nfinal idioma = box.get('idioma');" />
      <AlertBox type="success" title="Quando escolher Hive">Quando você quer guardar listas e mapas sem se preocupar com SQL. Para dados relacionais complexos, sqflite ou Drift.</AlertBox>
      </PageContainer>
    );
  }
  