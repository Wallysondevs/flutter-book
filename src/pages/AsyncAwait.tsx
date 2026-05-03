import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function AsyncAwait() {
    return (
      <PageContainer title="async / await" subtitle="A forma idiomática de escrever código assíncrono em Dart." difficulty="intermediario" timeToRead="9 min">
        <h2>Sintaxe</h2>
      <CodeBlock title="async" code="Future<void> carregar() async {\n  final user = await api.buscarUsuario();\n  final posts = await api.buscarPosts(user.id);\n  print('${user.nome} tem ${posts.length} posts');\n}" />
      <h2>Try/catch para erros</h2>
      <CodeBlock title="try" code="try {\n  final user = await api.buscarUsuario();\n  print(user);\n} on TimeoutException {\n  print('Demorou demais');\n} catch (e) {\n  print('Erro: $e');\n}" />
      <h2>Em paralelo com Future.wait</h2>
      <CodeBlock title="wait" code="final results = await Future.wait([\n  api.buscarUsuario(),\n  api.buscarConfig(),\n  api.buscarFeatures(),\n]);" />
      <AlertBox type="success" title="Regra de ouro">Se a função usa <code>await</code>, ela DEVE ser <code>async</code>. O retorno é sempre <code>Future&lt;T&gt;</code>.</AlertBox>
      </PageContainer>
    );
  }
  