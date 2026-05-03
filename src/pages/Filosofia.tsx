import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Filosofia() {
    return (
      <PageContainer title="Filosofia: Single Codebase" subtitle="Por que desenhar a própria UI é uma decisão técnica genial." difficulty="iniciante" timeToRead="6 min">
        <h2>Uma árvore, muitas plataformas</h2>
      <p>Diferente do React Native (que usa componentes nativos via bridge), o Flutter <strong>desenha cada pixel</strong> usando o engine Skia/Impeller. Isso elimina inconsistências entre plataformas — o botão é igual no Android, iOS, Web e Desktop.</p>
      <h2>Trade-offs reais</h2>
      <ul>
        <li>✅ UI 100% consistente, controle total</li>
        <li>✅ Performance próxima do nativo (60-120fps)</li>
        <li>⚠️ Apps maiores em MB que nativo puro</li>
        <li>⚠️ Para componentes muito específicos da plataforma, ainda precisa platform channels</li>
      </ul>
      <AlertBox type="success" title="A escolha">Se você quer um app com identidade visual própria que rode igual em todo lugar, Flutter é imbatível.</AlertBox>
      </PageContainer>
    );
  }
  