import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Container() {
    return (
      <PageContainer title="Container & BoxDecoration" subtitle="O canivete suíço para pintar caixas com bordas, sombras e gradientes." difficulty="iniciante" timeToRead="8 min">
        <h2>Anatomia</h2>
      <CodeBlock title="exemplo" code="Container(\n  width: 200,\n  height: 80,\n  padding: const EdgeInsets.all(16),\n  margin: const EdgeInsets.symmetric(horizontal: 24),\n  decoration: BoxDecoration(\n    color: Colors.white,\n    borderRadius: BorderRadius.circular(12),\n    boxShadow: const [BoxShadow(blurRadius: 8, color: Colors.black12)],\n    gradient: const LinearGradient(\n      colors: [Colors.blue, Colors.purple],\n    ),\n  ),\n  child: const Text('Olá'),\n)" />
      <AlertBox type="info" title="Quando NÃO usar Container">Se você só precisa de padding, use <code>Padding</code>. Se só de margin, use <code>SizedBox</code>. Container só compensa quando combina várias propriedades.</AlertBox>
      </PageContainer>
    );
  }
  