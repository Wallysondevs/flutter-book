import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function RepaintBoundary() {
    return (
      <PageContainer title="RepaintBoundary" subtitle="Isole áreas pesadas de repintura para ganhar FPS." difficulty="avancado" timeToRead="7 min">
        <p>Sem RepaintBoundary, mudar uma parte de um widget pode forçar repintar tudo. Encapsular áreas isola a repintura.</p>
      <CodeBlock title="exemplo" code="RepaintBoundary(\n  child: ComplexAnimation(),\n)" />
      <AlertBox type="info" title="Use com critério">RepaintBoundary tem custo (camada extra). Use só onde o profiler indicar repintura excessiva.</AlertBox>
      </PageContainer>
    );
  }
  