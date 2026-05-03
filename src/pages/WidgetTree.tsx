import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function WidgetTree() {
    return (
      <PageContainer title="Widget Tree & Build" subtitle="Como o Flutter transforma sua árvore em pixels." difficulty="intermediario" timeToRead="10 min">
        <h2>Três árvores</h2>
      <ul>
        <li><strong>Widget tree</strong> — descrição declarativa imutável</li>
        <li><strong>Element tree</strong> — instâncias mutáveis que conectam widget e render</li>
        <li><strong>RenderObject tree</strong> — objetos que desenham e fazem layout</li>
      </ul>
      <p>Você só mexe na widget tree. O Flutter cuida das outras duas e faz <strong>diffing</strong> entre rebuilds para minimizar o trabalho de render.</p>
      <h2>build() é chamado MUITAS vezes</h2>
      <p>Cada <code>setState</code>, mudança de tema, rotação de tela dispara rebuild. Por isso build deve ser puro e barato.</p>
      <AlertBox type="info" title="Otimizações">Extraia subwidgets <code>const</code>, use <code>Builder</code>/<code>Consumer</code> para isolar rebuilds, evite trabalho pesado no build.</AlertBox>
      </PageContainer>
    );
  }
  