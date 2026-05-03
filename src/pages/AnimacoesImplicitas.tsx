import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function AnimacoesImplicitas() {
    return (
      <PageContainer title="Animações Implícitas" subtitle="AnimatedContainer, AnimatedOpacity — anime mudanças sem controller." difficulty="intermediario" timeToRead="7 min">
        <CodeBlock title="exemplo" code="AnimatedContainer(\n  duration: const Duration(milliseconds: 400),\n  curve: Curves.easeInOut,\n  width: expanded ? 200 : 100,\n  height: expanded ? 200 : 100,\n  color: expanded ? Colors.blue : Colors.red,\n  child: const Icon(Icons.star, color: Colors.white),\n)" />
      <AlertBox type="success" title="O caminho mais barato">Se você só precisa animar uma propriedade simples, sempre comece com Animated*. Só vá para AnimationController quando essas não bastarem.</AlertBox>
      </PageContainer>
    );
  }
  