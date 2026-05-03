import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Futures() {
    return (
      <PageContainer title="Futures" subtitle="Promise do Dart — operações assíncronas que retornam um valor." difficulty="intermediario" timeToRead="8 min">
        <h2>O que é</h2>
      <p>Um <code>Future&lt;T&gt;</code> representa um valor que estará disponível depois — equivalente à <code>Promise</code> do JS.</p>
      <CodeBlock title="exemplo" code="Future<String> buscarUsuario() async {\n  await Future.delayed(Duration(seconds: 1));\n  return 'Ana';\n}\n\nbuscarUsuario().then((nome) => print(nome));" />
      <h2>Tratamento de erros</h2>
      <CodeBlock title="catch" code="buscarUsuario()\n  .then((nome) => print(nome))\n  .catchError((e) => print('Erro: $e'))\n  .whenComplete(() => print('Acabou'));" />
      <AlertBox type="info" title="Async/await é melhor">Veja a próxima página: <code>async/await</code> evita a 'callback hell' do <code>.then().then()</code>.</AlertBox>
      </PageContainer>
    );
  }
  