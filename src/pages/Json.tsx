import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Json() {
    return (
      <PageContainer title="JSON & Serialização" subtitle="jsonDecode, modelos manuais e code-gen com json_serializable." difficulty="intermediario" timeToRead="10 min">
        <h2>Manual</h2>
      <CodeBlock title="manual" code="class Usuario {\n  final int id;\n  final String nome;\n\n  Usuario({required this.id, required this.nome});\n\n  factory Usuario.fromJson(Map<String, dynamic> j) => Usuario(\n    id: j['id'] as int,\n    nome: j['nome'] as String,\n  );\n\n  Map<String, dynamic> toJson() => {'id': id, 'nome': nome};\n}" />
      <h2>Code-gen com json_serializable</h2>
      <CodeBlock title="gen" code="// adicionar build_runner e json_serializable ao pubspec dev\n@JsonSerializable()\nclass Usuario {\n  final int id;\n  final String nome;\n  Usuario({required this.id, required this.nome});\n\n  factory Usuario.fromJson(Map<String, dynamic> j) => _$UsuarioFromJson(j);\n  Map<String, dynamic> toJson() => _$UsuarioToJson(this);\n}\n\n// Gera com:\n// dart run build_runner build" />
      <AlertBox type="info" title="Para apps grandes use freezed">O pacote <code>freezed</code> gera classes imutáveis com igualdade, copyWith e fromJson — tudo num só.</AlertBox>
      </PageContainer>
    );
  }
  