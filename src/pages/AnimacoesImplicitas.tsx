import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function AnimacoesImplicitas() {
  return (
    <PageContainer
      title="Animações Implícitas"
      subtitle="AnimatedContainer, AnimatedOpacity e amigos — anime mudanças sem AnimationController."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Interfaces que mudam sem transição parecem brutas — o usuário sente que algo "pulou". Animações curtas (200–400 ms) sinalizam <em>causa e efeito</em> e deixam o app com sensação de polimento profissional. O problema é que escrever animação manual no Flutter exige <code>AnimationController</code>, <code>vsync</code>, <code>dispose</code>, <code>Tween</code>... muita cerimônia para algo simples.
      </p>
      <p>
        As <strong>animações implícitas</strong> resolvem 80% dos casos com <em>uma única linha</em>: você troca <code>Container</code> por <code>AnimatedContainer</code>, define a duração, e o Flutter cuida do resto.
      </p>

      <h2>O conceito</h2>
      <p>
        Pense no widget animado como uma <strong>caixa que observa as próprias propriedades</strong>. Toda vez que o <code>build</code> é chamado de novo com valores diferentes (cor, largura, padding), ele <em>interpola</em> sozinho do valor antigo para o novo, durante o tempo que você definiu.
      </p>
      <ul>
        <li>Você muda a propriedade dentro de um <code>setState</code>.</li>
        <li>O widget detecta a diferença e dispara a animação interna.</li>
        <li>Quando a animação termina, o widget fica parado no valor final.</li>
      </ul>

      <AlertBox type="info" title="A família Animated*">
        Existem dezenas: <code>AnimatedContainer</code>, <code>AnimatedOpacity</code>, <code>AnimatedPadding</code>, <code>AnimatedAlign</code>, <code>AnimatedPositioned</code>, <code>AnimatedDefaultTextStyle</code>, <code>AnimatedCrossFade</code>, <code>AnimatedSwitcher</code>, <code>AnimatedRotation</code>, <code>AnimatedScale</code>. Sempre que precisar animar algo, procure por <code>Animated</code> + nome do widget — provavelmente já existe.
      </AlertBox>

      <h2>Como Flutter faz</h2>
      <p>
        Sintaxe básica: troque o widget normal pelo equivalente <code>Animated*</code> e adicione <code>duration</code> (obrigatório) e <code>curve</code> (opcional).
      </p>

      <CodeBlock title="caixa que cresce ao toque" code={`class CaixaMagica extends StatefulWidget {
  const CaixaMagica({super.key});
  @override
  State<CaixaMagica> createState() => _CaixaMagicaState();
}

class _CaixaMagicaState extends State<CaixaMagica> {
  bool aberta = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => aberta = !aberta),
      child: AnimatedContainer(
        // duração obrigatória — define quanto tempo a interpolação leva
        duration: const Duration(milliseconds: 400),
        // curve controla o "ritmo" da animação (acelera, desacelera, etc.)
        curve: Curves.easeInOut,
        width: aberta ? 240 : 100,
        height: aberta ? 240 : 100,
        decoration: BoxDecoration(
          color: aberta ? Colors.indigo : Colors.redAccent,
          borderRadius: BorderRadius.circular(aberta ? 32 : 8),
        ),
        child: const Icon(Icons.star, color: Colors.white),
      ),
    );
  }
}`} />

      <p>
        Toque na caixa: largura, altura, cor e raio das bordas mudam <strong>todos juntos</strong>, suavemente. Sem controller, sem dispose.
      </p>

      <h2>Exemplo prático: card que destaca ao selecionar</h2>
      <p>
        Cenário comum: lista de itens, ao tocar um ele "ganha vida" — escala um pouco, sombra cresce, opacidade do título sobe.
      </p>

      <CodeBlock title="cartão selecionável" code={`class CartaoSelecionavel extends StatefulWidget {
  final String titulo;
  const CartaoSelecionavel({super.key, required this.titulo});
  @override
  State<CartaoSelecionavel> createState() => _CartaoSelecionavelState();
}

class _CartaoSelecionavelState extends State<CartaoSelecionavel> {
  bool selecionado = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => selecionado = !selecionado),
      child: AnimatedScale(
        duration: const Duration(milliseconds: 200),
        scale: selecionado ? 1.05 : 1.0,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(selecionado ? 0.25 : 0.08),
                blurRadius: selecionado ? 20 : 6,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: AnimatedDefaultTextStyle(
            duration: const Duration(milliseconds: 250),
            style: TextStyle(
              fontSize: selecionado ? 20 : 16,
              fontWeight:
                  selecionado ? FontWeight.bold : FontWeight.normal,
              color: selecionado ? Colors.indigo : Colors.black87,
            ),
            child: Text(widget.titulo),
          ),
        ),
      ),
    );
  }
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer o <code>duration</code></strong>: o widget exige — sem ele, erro de compilação.</li>
        <li><strong>Animar a árvore inteira em vez da propriedade</strong>: trocar o <em>tipo</em> do filho (ex: <code>Container</code> por <code>SizedBox</code>) não anima — só mudanças de <em>propriedades numéricas/cores</em> do mesmo widget animam.</li>
        <li><strong>Cor <code>null</code> para cor concreta</strong>: se o valor inicial é <code>null</code>, não há de onde interpolar — comece com a cor real.</li>
        <li><strong>Trocar entre dois widgets diferentes</strong>: para isso use <code>AnimatedSwitcher</code>, que faz fade entre filhos com chaves distintas.</li>
        <li><strong>Curva errada para o caso</strong>: <code>Curves.linear</code> parece robótico; <code>easeInOut</code> e <code>easeOut</code> dão sensação natural na maioria dos casos.</li>
      </ul>

      <AlertBox type="warning" title="Cuidado com listas grandes">
        Cada <code>AnimatedContainer</code> mantém estado interno. Em listas com centenas de itens animando ao mesmo tempo, isso pesa. Anime só o item ativo.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Comece sempre pelo Animated*">
        Antes de pensar em <code>AnimationController</code>, pergunte: "tem um <code>Animated*</code> que faz isso?". Se sim, use — menos código, menos bugs, performance equivalente.
      </AlertBox>
      <ul>
        <li>Mantenha durações entre <strong>150 ms (micro)</strong> e <strong>400 ms (transições maiores)</strong>. Mais que isso parece lento.</li>
        <li>Use <code>curves.dart</code> com cuidado: <code>easeOut</code> para entrar, <code>easeIn</code> para sair, <code>easeInOut</code> para movimentos contínuos.</li>
        <li>Combine vários <code>Animated*</code> aninhados — eles rodam em paralelo sem conflito.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Quando precisar de <strong>controle do tempo</strong> (pausar, repetir, sincronizar várias animações, tocar de trás pra frente), você sobe um nível: <code>AnimationController</code> e animações explícitas.
      </p>
      <AlertBox type="success" title="Continue para Animações Explícitas">
        Lá você aprende <code>AnimationController</code>, <code>Tween</code>, <code>AnimatedBuilder</code> e <code>SingleTickerProviderStateMixin</code> — o ferramental para qualquer animação imaginável.
      </AlertBox>
    </PageContainer>
  );
}
