import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Hero() {
    return (
      <PageContainer title="Hero Animations" subtitle="Animação automática de elemento entre páginas." difficulty="intermediario" timeToRead="6 min">
        <CodeBlock title="exemplo" code="// Página A:\nHero(tag: 'foto-${item.id}', child: Image.network(item.url))\n\n// Página B (destino):\nHero(tag: 'foto-${item.id}', child: Image.network(item.url))" />
      <p>O Flutter automaticamente animar o widget de uma posição/tamanho para a outra durante o push de rota. Mágico.</p>
      <AlertBox type="info" title="A tag precisa ser única">Duas Hero com a mesma tag na mesma rota dão erro.</AlertBox>
      </PageContainer>
    );
  }
  