import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Stateful() {
    return (
      <PageContainer title="StatefulWidget" subtitle="Widgets que guardam estado mutável." difficulty="iniciante" timeToRead="10 min">
        <h2>Estrutura</h2>
      <CodeBlock title="exemplo" code="class Contador extends StatefulWidget {\n  const Contador({super.key});\n\n  @override\n  State<Contador> createState() => _ContadorState();\n}\n\nclass _ContadorState extends State<Contador> {\n  int _n = 0;\n\n  void _incrementar() => setState(() => _n++);\n\n  @override\n  Widget build(BuildContext c) {\n    return Column(\n      children: [\n        Text('$_n'),\n        ElevatedButton(onPressed: _incrementar, child: const Text('+')),\n      ],\n    );\n  }\n}" />
      <h2>Lifecycle</h2>
      <ul>
        <li><code>initState()</code> — uma vez, ao criar</li>
        <li><code>didChangeDependencies()</code> — quando deps mudam</li>
        <li><code>build()</code> — toda vez que reconstrói</li>
        <li><code>dispose()</code> — antes de remover, limpe controllers/streams aqui</li>
      </ul>
      <AlertBox type="warning" title="Sempre dispose">Se você cria <code>TextEditingController</code>, <code>AnimationController</code>, <code>StreamSubscription</code>, chame <code>dispose</code> no dispose do State. Senão, memory leak.</AlertBox>
      </PageContainer>
    );
  }
  