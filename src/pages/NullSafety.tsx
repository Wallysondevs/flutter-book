import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function NullSafety() {
    return (
      <PageContainer title="Null Safety" subtitle="O sistema de tipos que eliminou NullPointerException do Dart." difficulty="iniciante" timeToRead="10 min">
        <h2>Tipos não-nullable por padrão</h2>
      <CodeBlock title="tipos" code="String nome = 'Ana';        // não pode ser null\nString? apelido;             // pode ser null\n\nnome = null;    // ❌ erro de compilação\napelido = null; // ✅ ok" />
      <h2>Operadores essenciais</h2>
      <ul>
        <li><code>?.</code> chamada segura: <code>apelido?.length</code></li>
        <li><code>??</code> valor padrão: <code>apelido ?? 'sem apelido'</code></li>
        <li><code>!</code> assertion: <code>apelido!.length</code> (lança erro se for null)</li>
        <li><code>late</code> promete que será inicializado antes de usar</li>
      </ul>
      <CodeBlock title="late" code="late String token; // inicializado depois\n\nvoid login() {\n  token = 'abc123';\n}\n\nvoid usarToken() {\n  print(token); // erro em runtime se chamado antes do login\n}" />
      <AlertBox type="warning" title="Cuidado com !">O bang operator promete ao compilador que o valor não é null. Se você mentir, crash em runtime. Use só quando tiver certeza absoluta.</AlertBox>
      </PageContainer>
    );
  }
  