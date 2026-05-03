import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function BuildWeb() {
    return (
      <PageContainer title="Build Web" subtitle="Compile pra HTML+JS e publique em qualquer servidor estático." difficulty="intermediario" timeToRead="6 min">
        <CodeBlock title="build" code="flutter build web --release\n# Saída em build/web/" />
      <p>Faça deploy em GitHub Pages, Firebase Hosting, Netlify, Vercel ou qualquer CDN.</p>
      <AlertBox type="info" title="Renderers">O Flutter Web pode usar renderer <code>html</code> (mais leve) ou <code>canvaskit</code> (mais fiel ao mobile). Escolha com <code>--web-renderer</code>.</AlertBox>
      </PageContainer>
    );
  }
  