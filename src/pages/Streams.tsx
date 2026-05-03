import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Streams() {
    return (
      <PageContainer title="Streams" subtitle="Sequência de eventos assíncronos — como Observable do RxJS." difficulty="avancado" timeToRead="10 min">
        <h2>Conceito</h2>
      <p>Enquanto <code>Future</code> entrega 1 valor, <code>Stream&lt;T&gt;</code> entrega 0..N valores ao longo do tempo.</p>
      <CodeBlock title="exemplo" code="Stream<int> contar(int n) async* {\n  for (var i = 1; i <= n; i++) {\n    await Future.delayed(Duration(seconds: 1));\n    yield i;\n  }\n}\n\ncontar(5).listen((v) => print(v));" />
      <h2>StreamBuilder em Flutter</h2>
      <CodeBlock title="builder" code="StreamBuilder<int>(\n  stream: contar(10),\n  builder: (ctx, snap) {\n    if (!snap.hasData) return const CircularProgressIndicator();\n    return Text('${snap.data}');\n  },\n)" />
      <AlertBox type="info" title="Onde aparece">Firebase, BLoC, sockets, sensores, input de usuário — todos modelados como Stream em Flutter.</AlertBox>
      </PageContainer>
    );
  }
  