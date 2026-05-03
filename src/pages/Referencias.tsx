import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Referencias() {
    return (
      <PageContainer title="Referências" subtitle="Onde aprender mais e se manter atualizado." difficulty="iniciante" timeToRead="4 min">
        <h2>Oficial</h2>
      <ul>
        <li>docs.flutter.dev — documentação completa</li>
        <li>api.flutter.dev — referência da API</li>
        <li>dart.dev — linguagem</li>
      </ul>
      <h2>Pacotes</h2>
      <ul>
        <li>pub.dev — registro oficial</li>
        <li>flutter/samples no GitHub — exemplos completos</li>
      </ul>
      <h2>Vídeos</h2>
      <ul>
        <li>Canal oficial Flutter no YouTube</li>
        <li>Reso Coder, Andrea Bizzotto, Robert Brunhage</li>
      </ul>
      <AlertBox type="info" title="Mantenha-se atualizado">Flutter lança updates a cada 3 meses. Acompanhe o blog em medium.com/flutter.</AlertBox>
      </PageContainer>
    );
  }
  