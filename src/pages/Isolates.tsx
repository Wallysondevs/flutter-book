import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Isolates() {
    return (
      <PageContainer title="Isolates" subtitle="Threads reais em Dart — para CPU-bound work." difficulty="avancado" timeToRead="8 min">
        <h2>Por que existem</h2>
      <p>Dart é single-threaded. Para não travar a UI em cálculos pesados (parse de JSON gigante, processamento de imagem), use Isolates — cada um com seu próprio heap.</p>
      <CodeBlock title="compute" code="import 'package:flutter/foundation.dart';\n\nFuture<List<Item>> parsearJson(String raw) async {\n  return await compute(_parse, raw);\n}\n\nList<Item> _parse(String raw) {\n  return (jsonDecode(raw) as List)\n      .map((j) => Item.fromJson(j))\n      .toList();\n}" />
      <AlertBox type="warning" title="Não compartilham memória">Isolates se comunicam via mensagens (cópia). Não há shared mutable state.</AlertBox>
      </PageContainer>
    );
  }
  