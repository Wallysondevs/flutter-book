import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Stack() {
  return (
    <PageContainer
      title="Stack & Positioned"
      subtitle="Empilhar widgets uns sobre os outros — perfeito para overlays, badges e fotos com legenda."
      difficulty="iniciante"
      timeToRead="11 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Tudo que envolve "uma coisa em cima da outra" — badge no ícone do carrinho, texto sobre uma imagem, botão flutuante no canto, loading sobreposto — é trabalho de <code>Stack</code>. Sem ele, você acaba inventando hacks com transformações, e o resultado nunca fica responsivo.
      </p>

      <h2>O conceito</h2>
      <p>
        <code>Stack</code> empilha filhos em camadas, na ordem da lista (o último fica por cima). Os filhos podem ser:
      </p>
      <ul>
        <li><strong>Não posicionados</strong> — alinhados pelo <code>alignment</code> da Stack (default: <code>topStart</code>).</li>
        <li><strong>Posicionados</strong> — envolvidos em <code>Positioned</code> com <code>top/left/right/bottom/width/height</code>.</li>
      </ul>
      <p>
        O tamanho da Stack vem dos filhos não posicionados. Se todos forem posicionados, ela colapsa para zero — a menos que você force com <code>fit: StackFit.expand</code> ou um pai que dê tamanho.
      </p>

      <AlertBox type="info" title="Analogia">
        Imagine transparências numa retroprojetor: cada folha é um filho. <code>Stack</code> é o vidro que segura, <code>Positioned</code> é o "cole essa folha 16 pixels do topo".
      </AlertBox>

      <h2>Como Flutter faz</h2>
      <CodeBlock title="Imagem com botão de favoritar" code={`Stack(
  alignment: Alignment.center, // alinhamento dos não-Positioned
  children: [
    // Camada 0 (fundo)
    Image.network(
      'https://example.com/foto.jpg',
      height: 200,
      width: double.infinity,
      fit: BoxFit.cover,
    ),

    // Camada 1 (em cima da imagem, no canto)
    const Positioned(
      bottom: 12,
      right: 12,
      child: CircleAvatar(
        backgroundColor: Colors.white,
        child: Icon(Icons.favorite, color: Colors.red),
      ),
    ),
  ],
)`} />

      <h2>Exemplo prático: badge no ícone</h2>
      <CodeBlock title="Ícone de carrinho com contador" code={`class IconeCarrinho extends StatelessWidget {
  final int quantidade;
  const IconeCarrinho({super.key, required this.quantidade});

  @override
  Widget build(BuildContext context) {
    return Stack(
      // clipBehavior: por padrão Stack recorta. Permita o badge
      // estourar um pouco se necessário.
      clipBehavior: Clip.none,
      children: [
        const Icon(Icons.shopping_cart, size: 32),
        if (quantidade > 0)
          Positioned(
            top: -4,
            right: -6,
            child: Container(
              padding: const EdgeInsets.symmetric(
                  horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: Colors.red,
                borderRadius: BorderRadius.circular(10),
              ),
              constraints: const BoxConstraints(
                minWidth: 18,
                minHeight: 18,
              ),
              child: Text(
                quantidade > 99 ? '99+' : '\$quantidade',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
      ],
    );
  }
}`} />

      <h2>StackFit e fit</h2>
      <ul>
        <li><code>StackFit.loose</code> (padrão) — filhos não posicionados ficam do tamanho que quiserem.</li>
        <li><code>StackFit.expand</code> — força os filhos não posicionados a ocuparem todo o espaço da Stack.</li>
        <li><code>StackFit.passthrough</code> — repassa as restrições do pai sem mudar.</li>
      </ul>
      <p>
        Use <code>StackFit.expand</code> quando quer que uma imagem de fundo cubra toda a Stack sem precisar de Positioned.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Stack com todos os filhos <code>Positioned</code> e sem pai com tamanho — colapsa para zero. Coloque dentro de <code>SizedBox</code> ou use <code>StackFit.expand</code>.</li>
        <li>Esperar que <code>Positioned</code> funcione fora de uma Stack. Erro de runtime — Positioned só vive dentro de Stack.</li>
        <li>Conteúdo cortado pelo <code>clipBehavior</code> padrão. Para badges que estouram, use <code>Clip.none</code>.</li>
        <li>Usar Stack para layouts complexos responsivos. Funciona em uma tela, quebra em outra. Prefira <code>LayoutBuilder</code> + Row/Column.</li>
        <li>Esquecer que o último filho fica por cima. Order matters.</li>
      </ul>

      <AlertBox type="warning" title="Stack ≠ posição absoluta da web">
        Em CSS, position: absolute é relativa ao ancestral posicionado. Em Flutter, Positioned é sempre relativo à Stack pai mais próxima. Não tem "z-index" — a ordem na lista é o z-index.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        Use Stack para <strong>sobreposições pequenas</strong> (badge, fab, loading). Para layouts coordenados, combine Row/Column/Wrap. Stack não é seu Bootstrap.
      </AlertBox>
      <ul>
        <li>Para responsividade, prefira valores em porcentagem com <code>FractionallySizedBox</code> dentro da Stack.</li>
        <li>Animações sobre conteúdo: <code>AnimatedPositioned</code> dá transição suave de <code>top/left</code>.</li>
        <li>Quando todos os filhos têm o mesmo "tamanho do pai", olhe <code>IndexedStack</code> — mostra só um filho mas mantém os outros vivos (útil para tabs com estado preservado).</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Para dividir espaço proporcionalmente em Row/Column, veja <strong>Expanded & Flex</strong>. Para listas roláveis grandes, <strong>ListView</strong>.
      </p>
      <AlertBox type="success" title="Você desbloqueou">
        Overlays, badges e cards com imagem + texto sobreposto agora são triviais.
      </AlertBox>
    </PageContainer>
  );
}
