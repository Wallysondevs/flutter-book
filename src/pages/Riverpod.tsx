import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Riverpod() {
    return (
      <PageContainer title="Riverpod" subtitle="Provider repensado — com testabilidade, code-gen e zero context." difficulty="intermediario" timeToRead="12 min">
        <h2>Diferenças do Provider</h2>
      <ul>
        <li>Não depende de BuildContext — pode ser usado em qualquer lugar</li>
        <li>Compile-time safe — provider tipado</li>
        <li>Suporte a code-gen com <code>riverpod_generator</code></li>
        <li>Auto-dispose, family providers, etc.</li>
      </ul>
      <CodeBlock title="exemplo" code="final contadorProvider = StateProvider<int>((ref) => 0);\n\nclass MeuApp extends ConsumerWidget {\n  @override\n  Widget build(BuildContext c, WidgetRef ref) {\n    final n = ref.watch(contadorProvider);\n    return Column(\n      children: [\n        Text('$n'),\n        ElevatedButton(\n          onPressed: () => ref.read(contadorProvider.notifier).state++,\n          child: const Text('+'),\n        ),\n      ],\n    );\n  }\n}" />
      <AlertBox type="success" title="Comunidade ama">Riverpod virou padrão em muitos projetos novos por ser mais previsível e testável.</AlertBox>
      </PageContainer>
    );
  }
  