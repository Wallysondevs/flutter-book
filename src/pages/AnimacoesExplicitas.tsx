import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function AnimacoesExplicitas() {
  return (
    <PageContainer
      title="Animações Explícitas"
      subtitle="AnimationController + Tween — controle total da timeline."
      difficulty="avancado"
      timeToRead="15 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Animações implícitas (<code>AnimatedContainer</code>, etc.) cobrem o trivial. Mas e quando você precisa <strong>repetir</strong> uma pulsação infinitamente, <strong>sincronizar</strong> três elementos que entram em sequência, <strong>pausar</strong> no meio, ou <strong>reverter</strong> a animação só quando o usuário cancelar? É hora das animações explícitas.
      </p>
      <p>
        Aqui você ganha um <strong>relógio</strong> (o <code>AnimationController</code>) que avança um valor de 0.0 a 1.0 ao longo do tempo, e você decide o que fazer com cada quadro.
      </p>

      <h2>O conceito</h2>
      <p>
        A animação explícita tem três peças que se conversam:
      </p>
      <ul>
        <li><strong>AnimationController</strong>: o relógio. Produz valores entre 0.0 e 1.0 ao longo de uma duração.</li>
        <li><strong>Tween</strong> (de "between"): converte esses valores 0–1 em algo útil — uma cor, um <code>double</code>, um <code>Offset</code>. Ex: <code>Tween&lt;double&gt;(begin: 0, end: 200)</code>.</li>
        <li><strong>AnimatedBuilder</strong> (ou <code>AnimatedWidget</code>): reconstrói só a parte da árvore que precisa, a cada tick.</li>
      </ul>

      <AlertBox type="info" title="vsync = sincronização vertical">
        O controller precisa de um <code>TickerProvider</code> (chamado <code>vsync</code>) para que as animações rodem na taxa de atualização da tela (60/120 fps) e <strong>parem</strong> quando a tela está em segundo plano. Use <code>SingleTickerProviderStateMixin</code> quando há um controller, ou <code>TickerProviderStateMixin</code> para vários.
      </AlertBox>

      <h2>Como Flutter faz</h2>

      <CodeBlock title="anatomia mínima" code={`class Pulsa extends StatefulWidget {
  const Pulsa({super.key});
  @override
  State<Pulsa> createState() => _PulsaState();
}

class _PulsaState extends State<Pulsa>
    with SingleTickerProviderStateMixin {
  // 1) cria o controller — late porque depende de \`this\` (vsync)
  late final AnimationController _ctrl = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 1),
  )..repeat(reverse: true); // toca infinito, indo e voltando

  // 2) tween mapeia 0.0..1.0 -> 0.8..1.2 (escala da pulsação)
  late final Animation<double> _escala =
      Tween<double>(begin: 0.8, end: 1.2)
          .chain(CurveTween(curve: Curves.easeInOut))
          .animate(_ctrl);

  @override
  void dispose() {
    _ctrl.dispose(); // SEMPRE liberar — senão vaza memória
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // 3) AnimatedBuilder reconstrói só este pedaço a cada quadro
    return AnimatedBuilder(
      animation: _escala,
      builder: (context, child) => Transform.scale(
        scale: _escala.value,
        child: child, // child não rebuilda — otimização
      ),
      child: const FlutterLogo(size: 100),
    );
  }
}`} />

      <p>
        Resultado: o logo pulsa para sempre, suavemente, entre 80% e 120% do tamanho.
      </p>

      <h2>Exemplo prático: entrada em sequência (stagger)</h2>
      <p>
        Você quer 3 cartões que <strong>entram em cascata</strong>: primeiro um, depois o outro, depois o terceiro. Um único controller, três <code>Interval</code>s diferentes.
      </p>

      <CodeBlock title="stagger animation" code={`class CartoesEmCascata extends StatefulWidget {
  const CartoesEmCascata({super.key});
  @override
  State<CartoesEmCascata> createState() =>
      _CartoesEmCascataState();
}

class _CartoesEmCascataState extends State<CartoesEmCascata>
    with SingleTickerProviderStateMixin {
  late final _ctrl = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 900),
  )..forward(); // toca uma vez, do começo ao fim

  // cada cartão usa uma "fatia" diferente do tempo total
  Animation<double> _fade(double inicio, double fim) =>
      CurvedAnimation(
        parent: _ctrl,
        curve: Interval(inicio, fim, curve: Curves.easeOut),
      );

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  Widget _card(String texto, Animation<double> anim) {
    return FadeTransition(
      opacity: anim,
      child: SlideTransition(
        position: Tween<Offset>(
          begin: const Offset(0, 0.3),
          end: Offset.zero,
        ).animate(anim),
        child: Card(
          child: ListTile(title: Text(texto)),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _card('Primeiro',  _fade(0.0, 0.4)),
        _card('Segundo',   _fade(0.2, 0.6)),
        _card('Terceiro',  _fade(0.4, 1.0)),
      ],
    );
  }
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer <code>dispose()</code></strong>: vaza memória e o ticker continua rodando — vira culprit principal de performance.</li>
        <li><strong>Não passar <code>vsync</code></strong>: erro em runtime. Sempre <code>with SingleTickerProviderStateMixin</code> no State.</li>
        <li><strong>Chamar <code>setState</code> dentro do builder</strong>: o <code>AnimatedBuilder</code> já reconstrói sozinho. <code>setState</code> ali causa loop.</li>
        <li><strong>Não usar o parâmetro <code>child</code></strong> do <code>AnimatedBuilder</code>: sem ele, sub-árvores complexas reconstroem 60x por segundo. Passe pelo <code>child</code> tudo que <em>não</em> depende da animação.</li>
        <li><strong>Forward sem reset</strong>: se você fizer <code>forward()</code> com o controller já no final (1.0), nada acontece. Use <code>_ctrl.reset()</code> antes ou <code>_ctrl.forward(from: 0)</code>.</li>
      </ul>

      <AlertBox type="danger" title="Animação travando? Quase sempre é dispose esquecido.">
        Em apps com várias telas, controllers vivos em telas que não estão na frente continuam consumindo CPU e bateria. Faça o hábito: criou controller, escreveu o <code>dispose</code> imediatamente.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Use as Transition*">
        Em vez de <code>AnimatedBuilder</code> + <code>Transform</code>, prefira <code>FadeTransition</code>, <code>SlideTransition</code>, <code>ScaleTransition</code>, <code>RotationTransition</code>, <code>SizeTransition</code>. Mais legível e elas já otimizam o rebuild.
      </AlertBox>
      <ul>
        <li>Comece sempre tentando uma animação implícita; só suba para explícita se realmente precisar de controle.</li>
        <li>Curvas naturais: <code>Curves.easeOutCubic</code> e <code>Curves.easeInOutCubic</code> dão acabamento profissional.</li>
        <li>Para transições entre rotas, veja <code>PageRouteBuilder</code> ou o pacote <code>animations</code> do time do Flutter.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Quando o que você quer é animar um <em>elemento entre duas telas</em> — uma foto que cresce do card para o detalhe — existe um atalho mágico: <code>Hero</code>.
      </p>
      <AlertBox type="success" title="Continue para Hero Animations">
        Próxima página: como fazer um widget "voar" automaticamente de uma rota para outra.
      </AlertBox>
    </PageContainer>
  );
}
