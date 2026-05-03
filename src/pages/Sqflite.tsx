import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Sqflite() {
    return (
      <PageContainer title="sqflite" subtitle="SQLite local — para listas e dados estruturados grandes." difficulty="intermediario" timeToRead="9 min">
        <h2>Setup</h2>
      <CodeBlock title="pubspec" code="dependencies:\n  sqflite: ^2.3.0\n  path: ^1.9.0" />
      <CodeBlock title="db" code="final db = await openDatabase(\n  'meu.db',\n  version: 1,\n  onCreate: (db, v) => db.execute(\n    'CREATE TABLE users(id INTEGER PRIMARY KEY, nome TEXT)',\n  ),\n);\n\nawait db.insert('users', {'nome': 'Ana'});\nfinal lista = await db.query('users');" />
      <AlertBox type="info" title="Migrations">Quando alterar schema, incremente <code>version</code> e implemente <code>onUpgrade</code>.</AlertBox>
      </PageContainer>
    );
  }
  