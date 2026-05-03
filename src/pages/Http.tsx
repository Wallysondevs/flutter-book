import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Http() {
    return (
      <PageContainer title="Pacote http" subtitle="Cliente HTTP simples e oficial do Dart team." difficulty="intermediario" timeToRead="7 min">
        <h2>Setup</h2>
      <CodeBlock title="pubspec" code="dependencies:\n  http: ^1.2.0" />
      <h2>GET e POST</h2>
      <CodeBlock title="exemplo" code="import 'package:http/http.dart' as http;\nimport 'dart:convert';\n\nFuture<List<dynamic>> buscarPosts() async {\n  final r = await http.get(Uri.parse('https://jsonplaceholder.typicode.com/posts'));\n  if (r.statusCode != 200) throw Exception('Erro ${r.statusCode}');\n  return jsonDecode(r.body) as List;\n}\n\nFuture<void> criarPost(Map data) async {\n  await http.post(\n    Uri.parse('https://api.com/posts'),\n    headers: {'Content-Type': 'application/json'},\n    body: jsonEncode(data),\n  );\n}" />
      <AlertBox type="info" title="Para chamadas complexas, vá de Dio">Quando precisar de interceptors, retry, upload com progress, troque para o pacote <code>dio</code>.</AlertBox>
      </PageContainer>
    );
  }
  