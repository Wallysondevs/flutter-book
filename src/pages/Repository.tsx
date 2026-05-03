import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Repository() {
    return (
      <PageContainer title="Repository Pattern" subtitle="Abstraia origem dos dados (API + cache + DB) atrás de uma interface." difficulty="intermediario" timeToRead="8 min">
        <CodeBlock title="interface" code="abstract class UsuarioRepo {\n  Future<Usuario> buscar(int id);\n  Future<List<Usuario>> listar();\n}\n\nclass UsuarioRepoImpl implements UsuarioRepo {\n  final ApiClient api;\n  final LocalDb db;\n  UsuarioRepoImpl(this.api, this.db);\n\n  @override\n  Future<Usuario> buscar(int id) async {\n    final cached = await db.usuario(id);\n    if (cached != null) return cached;\n    final fresco = await api.usuario(id);\n    await db.salvarUsuario(fresco);\n    return fresco;\n  }\n}" />
      <AlertBox type="success" title="Testabilidade">Como tudo depende da interface, você mocka facilmente em testes.</AlertBox>
      </PageContainer>
    );
  }
  