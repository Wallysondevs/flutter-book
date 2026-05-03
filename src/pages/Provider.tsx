import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Provider() {
    return (
      <PageContainer title="Provider" subtitle="O state management mais simples e oficial recomendado pelo time Flutter." difficulty="intermediario" timeToRead="10 min">
        <h2>Setup</h2>
      <CodeBlock title="pubspec" code="dependencies:\n  provider: ^6.1.0" />
      <h2>ChangeNotifier</h2>
      <CodeBlock title="model" code="class Carrinho extends ChangeNotifier {\n  final _items = <Item>[];\n  List<Item> get items => List.unmodifiable(_items);\n\n  void adicionar(Item i) {\n    _items.add(i);\n    notifyListeners();\n  }\n}" />
      <h2>Provider + Consumer</h2>
      <CodeBlock title="uso" code="ChangeNotifierProvider(\n  create: (_) => Carrinho(),\n  child: MaterialApp(home: HomePage()),\n)\n\n// Em qualquer widget descendente:\nConsumer<Carrinho>(\n  builder: (c, carrinho, _) => Text('Itens: ${carrinho.items.length}'),\n)\n\n// Ou:\nfinal carrinho = context.watch<Carrinho>();" />
      <AlertBox type="info" title="watch vs read"><code>watch</code> rebuilda quando muda, <code>read</code> apenas pega o valor (use em callbacks).</AlertBox>
      </PageContainer>
    );
  }
  