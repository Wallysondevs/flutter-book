import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Stateless() {
    return (
      <PageContainer title="StatelessWidget" subtitle="Widgets imutáveis — sua aparência só depende dos parâmetros." difficulty="iniciante" timeToRead="8 min">
        <h2>Quando usar</h2>
      <p>Quando o widget não precisa redesenhar por conta própria. Ex: cards, ícones, textos, botões com handler externo.</p>
      <CodeBlock title="exemplo" code="class Avatar extends StatelessWidget {\n  final String url;\n  final double tamanho;\n\n  const Avatar({super.key, required this.url, this.tamanho = 48});\n\n  @override\n  Widget build(BuildContext context) {\n    return CircleAvatar(\n      backgroundImage: NetworkImage(url),\n      radius: tamanho / 2,\n    );\n  }\n}" />
      <AlertBox type="success" title="const ajuda muito">Sempre que possível, marque o construtor como <code>const</code>. O Flutter pula o rebuild de widgets const.</AlertBox>
      </PageContainer>
    );
  }
  