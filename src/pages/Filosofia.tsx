import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Filosofia() {
  return (
    <PageContainer
      title="Filosofia: Single Codebase"
      subtitle="Por que desenhar a própria UI é uma decisão técnica genial — e quais os limites."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Antes de escrever uma linha de código, é importante entender <strong>como o Flutter pensa</strong>. Isso evita que você lute contra o framework querendo fazê-lo agir como Android nativo, React Native ou web. Quando a filosofia faz sentido, o resto flui.
      </p>

      <h2>O conceito</h2>
      <p>
        O Flutter parte de uma ideia radical: <strong>a UI é só pixels desenhados num canvas</strong>. Em vez de pedir para o Android desenhar um <code>Button</code> e para o iOS desenhar um <code>UIButton</code>, o Flutter traz sua própria engine gráfica e desenha o botão do zero — igualzinho em todas as plataformas.
      </p>
      <p>
        Analogia: um app React Native é como contratar um intérprete em cada país (cada SO desenha seus próprios componentes); um app Flutter é como levar a própria orquestra na mala — o som é idêntico em qualquer palco.
      </p>

      <h2>Como o Flutter faz</h2>
      <p>
        Tudo na tela é um <strong>Widget</strong>: texto, espaçamento, gesto, animação, tela inteira. Widgets são objetos imutáveis e baratos que descrevem <em>como a UI deveria estar agora</em>. O framework compara a árvore nova com a antiga e atualiza só o que mudou (parecido com o <em>virtual DOM</em> do React, mas mais eficiente).
      </p>

      <CodeBlock title="tudo é widget" code={`import 'package:flutter/material.dart';

class Boas extends StatelessWidget {
  const Boas({super.key});

  @override
  Widget build(BuildContext context) {
    // Padding, Center e Text são todos widgets
    return const Padding(
      padding: EdgeInsets.all(16),
      child: Center(
        child: Text('Olá'),
      ),
    );
  }
}`} />

      <h2>As três árvores por baixo do pano</h2>
      <p>
        Para entender performance e bugs estranhos, é bom saber que o Flutter mantém três estruturas em paralelo:
      </p>
      <ul>
        <li><strong>Widget tree</strong> — descrição declarativa, recriada a cada build (barato).</li>
        <li><strong>Element tree</strong> — instâncias vivas que ligam widgets a estados.</li>
        <li><strong>RenderObject tree</strong> — quem realmente calcula layout e desenha pixels.</li>
      </ul>

      <AlertBox type="info" title="Por que widgets podem ser const">
        Widgets imutáveis (<code>const</code>) permitem ao Flutter pular o rebuild de subárvores inteiras. Por isso você verá <code>const</code> espalhado nos exemplos — é otimização gratuita.
      </AlertBox>

      <h2>Trade-offs reais (sem marketing)</h2>
      <ul>
        <li><strong>✅ UI 100% consistente</strong> — o mesmo design pixel-perfeito em qualquer plataforma.</li>
        <li><strong>✅ Hot reload</strong> — ciclo de feedback de menos de 1 segundo.</li>
        <li><strong>✅ Performance</strong> — 60 a 120 fps com Impeller.</li>
        <li><strong>⚠️ Tamanho do app</strong> — engine + framework adicionam ~7–15 MB.</li>
        <li><strong>⚠️ Acessibilidade</strong> — funciona, mas exige cuidado para emular bem o comportamento nativo.</li>
        <li><strong>⚠️ Integrações específicas do SO</strong> — câmera, Bluetooth e biometria precisam de pacotes ou de código nativo via <em>platform channels</em>.</li>
      </ul>

      <h2>Quando Flutter brilha</h2>
      <CodeBlock title="exemplos de bom encaixe" code={`// 1. App com identidade visual forte (não quer parecer nativo
//    em cada plataforma, quer parecer consigo mesmo).
// 2. MVPs e startups que precisam validar em iOS + Android
//    com um time pequeno.
// 3. Painéis embarcados (carro, caixa, totem) onde controle
//    total da UI é vantagem.
// 4. Apps com muitas animações customizadas e micro-interações.`} />

      <h2>Quando Flutter NÃO é a melhor escolha</h2>
      <ul>
        <li>Você precisa de WebView pesado, integrações profundas com APIs muito novas do iOS ou jogos 3D complexos.</li>
        <li>O time já é especialista em Kotlin/Swift e o app é pequeno e específico de uma plataforma.</li>
        <li>O produto é uma SDK ou widget para incorporar em apps de terceiros — Flutter não é ideal para "ser embarcado".</li>
      </ul>

      <AlertBox type="warning" title="Plataforma manda em alguns lugares">
        Mesmo no Flutter, fontes do sistema, teclado, scroll bouncing e diálogos podem variar. Use <code>Platform.isIOS</code> ou widgets <code>Cupertino*</code> quando precisar respeitar o look-and-feel.
      </AlertBox>

      <h2>Boas práticas mentais</h2>
      <AlertBox type="tip" title="Pense declarativo">
        Você descreve <em>como a UI deve estar</em> dado o estado atual. Não manipula widgets diretamente como em UIKit ou Android Views. Esqueça <code>findViewById</code> e <code>setText</code> — apenas reconstrua a árvore.
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Agora que a filosofia faz sentido, vamos entender a linguagem que dá vida a tudo isso: o Dart.
      </p>

      <AlertBox type="success" title="Continue lendo">
        Próximo: <em>Dart vs JavaScript</em> — a sintaxe que você vai usar todo dia.
      </AlertBox>
    </PageContainer>
  );
}
