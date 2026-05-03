import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Historia() {
    return (
      <PageContainer title="História do Flutter" subtitle="De experimento interno do Google a framework cross-platform líder." difficulty="iniciante" timeToRead="8 min">
        <h2>Origem</h2>
      <p>O Flutter nasceu como projeto interno do Google chamado <strong>Sky</strong> em 2015. A meta: renderizar UI a 120fps em qualquer plataforma com um único código.</p>
      <p>Em 2018 chegou a versão 1.0 estável. Em 2021, o <strong>Flutter 2</strong> trouxe suporte estável a Web. Em 2023, o <strong>Flutter 3</strong> ampliou para Linux, macOS e Windows. Hoje, em 2026, é uma das opções mais maduras para desenvolvimento multiplataforma.</p>
      <h2>Por que migrar?</h2>
      <ul>
        <li>Hot reload em &lt;1s — produtividade altíssima</li>
        <li>Mesmo código para mobile, web e desktop</li>
        <li>UI consistente — Flutter desenha cada pixel, não usa componentes nativos</li>
        <li>Ecossistema robusto: pub.dev tem &gt;40 mil pacotes</li>
      </ul>
      <AlertBox type="info" title="Quem usa">Google Pay, BMW, Toyota, Alibaba, Nubank, iFood e muitos outros já têm apps em produção com Flutter.</AlertBox>
      </PageContainer>
    );
  }
  