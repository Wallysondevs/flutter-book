import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function SetState() {
    return (
      <PageContainer title="setState" subtitle="O gerenciador de estado built-in — útil pra estado local." difficulty="iniciante" timeToRead="6 min">
        <h2>Quando usar</h2>
      <p>Para estado <strong>local</strong> de um único widget: campo de texto, switch, animação interna. Para estado compartilhado entre páginas, use Provider/Riverpod/BLoC.</p>
      <CodeBlock title="exemplo" code="class _MyState extends State<MyWidget> {\n  bool _selected = false;\n\n  @override\n  Widget build(BuildContext c) {\n    return GestureDetector(\n      onTap: () => setState(() => _selected = !_selected),\n      child: Icon(\n        _selected ? Icons.favorite : Icons.favorite_border,\n        color: _selected ? Colors.red : null,\n      ),\n    );\n  }\n}" />
      <AlertBox type="warning" title="Não chame setState fora de State">Só funciona dentro de classes <code>State</code>. E nunca chame durante o build — vai dar erro.</AlertBox>
      </PageContainer>
    );
  }
  