import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function RepaintBoundary() {
  return (
    <PageContainer
      title="RepaintBoundary"
      subtitle="Isole áreas pesadas de repintura para ganhar FPS sem reescrever a UI."
      difficulty="avancado"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quando uma animação roda na sua tela — um spinner, um vídeo, um gráfico
        animado — o Flutter pode <em>repintar a tela inteira</em> 60 vezes por
        segundo, mesmo se 90% dela está parada. Em apps complexos, isso vira
        gargalo de GPU. <code>RepaintBoundary</code> diz ao motor: "trate esta
        sub-árvore como uma camada separada; só repinte aqui, não desperdice
        ciclos no resto".
      </p>

      <h2>O conceito</h2>
      <p>
        Internamente o Flutter constrói uma árvore de <strong>render objects</strong> que
        é traduzida em camadas (<code>Layer</code>) entregues à GPU. Por padrão,
        widgets vizinhos compartilham a mesma camada de pintura. Quando um deles
        precisa ser repintado, todos eles são repintados juntos.
      </p>
      <p>
        <code>RepaintBoundary</code> introduz um <strong>limite</strong>: tudo
        dentro dele vira uma camada própria e isolada. Mudanças dentro só
        repintam essa camada; mudanças fora não tocam essa camada.
      </p>
      <p>
        Imagine uma vidraça: você pode pintar nela sem manchar a parede ao
        redor.
      </p>

      <h2>Como o Flutter faz</h2>
      <p>
        Sintaxe é trivial — basta envolver o widget alvo. O custo é uma camada
        extra (mais memória de GPU). Por isso não saia espalhando à toa: use
        onde o profiler mostrar repintura excessiva.
      </p>

      <CodeBlock title="uso básico" code={`RepaintBoundary(
  child: AnimacaoComplexa(),
)`} />

      <h2>Exemplo prático: spinner em tela cheia</h2>
      <p>
        Cenário: tela com lista estática de 50 itens e um pequeno spinner girando
        no canto. Sem boundary, cada frame do spinner pode forçar a lista
        inteira a repintar.
      </p>

      <CodeBlock title="ruim — repinta a lista junto" code={`class TelaPedidos extends StatelessWidget {
  final List<Pedido> pedidos;
  const TelaPedidos({super.key, required this.pedidos});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ListView.builder(
          itemCount: pedidos.length,
          itemBuilder: (_, i) => PedidoCard(pedidos[i]),
        ),
        // Spinner gira 60fps; sem boundary, marca a Stack inteira como suja
        const Positioned(
          right: 16, bottom: 16,
          child: CircularProgressIndicator(),
        ),
      ],
    );
  }
}`} />

      <CodeBlock title="bom — spinner em camada própria" code={`class TelaPedidos extends StatelessWidget {
  final List<Pedido> pedidos;
  const TelaPedidos({super.key, required this.pedidos});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ListView.builder(
          itemCount: pedidos.length,
          itemBuilder: (_, i) => PedidoCard(pedidos[i]),
        ),
        const Positioned(
          right: 16, bottom: 16,
          child: RepaintBoundary(
            child: CircularProgressIndicator(),
          ),
        ),
      ],
    );
  }
}`} />

      <p>
        Resultado: o spinner repinta sozinho, a lista nem é tocada por causa
        dele. Em DevTools (Highlight Repaints), a área da lista para de piscar.
      </p>

      <h2>Quando o Flutter já cria boundaries automaticamente</h2>
      <ul>
        <li><strong>ListView</strong> e similares — cada item rolável já tem boundary implícito.</li>
        <li><strong>Hero animations</strong> — o conteúdo voador é isolado.</li>
        <li><strong>SnackBar, Dialog, BottomSheet</strong> — overlays criam suas próprias camadas.</li>
      </ul>
      <p>
        Por isso <strong>não saia adicionando RepaintBoundary em tudo</strong>:
        em listas e overlays já é redundante.
      </p>

      <h2>Como verificar com DevTools</h2>
      <p>
        No Inspector, ative <strong>Highlight Repaints</strong>. Áreas que repintam
        ganham bordas coloridas que mudam a cada frame. Se uma região grande
        pisca constantemente sem motivo, ali há candidato a
        <code>RepaintBoundary</code>.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Achar que é grátis</strong> — cada boundary é uma textura na GPU. Em apps modestos isso somando é ruim.</li>
        <li><strong>Envolver tudo</strong> — RepaintBoundary numa folha estática (texto fixo) não ajuda em nada.</li>
        <li><strong>Esquecer de testar com Highlight Repaints</strong> — sem profiler, é palpite.</li>
        <li><strong>Confundir com setState scope</strong> — RepaintBoundary não evita rebuild de widgets, só repintura. Para evitar rebuild, use <code>const</code>, separe widgets ou use <code>ValueListenableBuilder</code>.</li>
      </ul>

      <AlertBox type="warning" title="Otimização localizada">
        RepaintBoundary só vale a pena se algo dentro dele anima ou muda com
        frequência <strong>e</strong> o entorno é grande/custoso. Caso contrário, o
        custo da camada extra supera o ganho.
      </AlertBox>

      <AlertBox type="info" title="Para tirar uma imagem do widget">
        RepaintBoundary tem outro uso útil: combinado com <code>GlobalKey</code>,
        permite capturar a área como imagem (<code>boundary.toImage()</code>).
        Útil para gerar prévias, compartilhamento, screenshots.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Profile primeiro com <strong>Highlight Repaints</strong> — não otimize no escuro.</li>
          <li>Combine com <code>const</code> e widgets pequenos para reduzir <em>builds</em> além de repintura.</li>
          <li>Em jogos/animações intensas, considere <code>CustomPainter</code> dentro de RepaintBoundary.</li>
          <li>Documente no código por que aquele boundary existe — evita que outro dev remova "limpando".</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Veja <em>Profiling</em> e <em>Flutter DevTools</em> para identificar
        onde o boundary trará ganho real.
      </p>
      <AlertBox type="success">
        Bem usado, um único <code>RepaintBoundary</code> bem colocado pode
        recuperar 5-10ms por frame em telas complexas.
      </AlertBox>
    </PageContainer>
  );
}
