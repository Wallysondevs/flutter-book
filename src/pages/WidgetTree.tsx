import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function WidgetTree() {
  return (
    <PageContainer
      title="Widget Tree & Build"
      subtitle="Como o Flutter transforma sua árvore declarativa em pixels — e por que build é chamado tanto."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quase todo bug de performance ou comportamento estranho em Flutter (estado que "some", reconstrução desnecessária, animação engasgando) vem de não entender como o framework reage ao seu <code>build</code>. Cinco minutos pensando nas três árvores te poupam horas de depuração.
      </p>

      <h2>O conceito: três árvores</h2>
      <p>
        Quando você escreve um widget, o Flutter monta <strong>três estruturas</strong> em paralelo:
      </p>
      <ul>
        <li><strong>Widget tree</strong> — descrição declarativa, leve e <em>imutável</em>. É só configuração. Recriada a cada rebuild.</li>
        <li><strong>Element tree</strong> — instâncias mutáveis que conectam widgets a render objects. Persistem enquanto o tipo do widget no mesmo lugar não mudar.</li>
        <li><strong>RenderObject tree</strong> — onde acontece o trabalho pesado: layout, pintura, hit-test. Caro de criar/destruir.</li>
      </ul>
      <p>
        Você só mexe na widget tree. O Flutter faz <strong>diff</strong> entre a nova e a antiga, decide quais elements podem ser reaproveitados (mesmo tipo + mesma key) e atualiza o mínimo possível dos render objects. É essa preguiça inteligente que mantém o app rápido mesmo reconstruindo "tudo" a cada frame.
      </p>

      <AlertBox type="info" title="Analogia">
        A widget tree é a planta arquitetônica (papel barato, joga fora). Os elements são os pedreiros que carregam o tijolo. Os render objects são a parede de verdade. Você desenha plantas; o Flutter decide quais paredes precisam ser quebradas.
      </AlertBox>

      <h2>O ciclo de build</h2>
      <p>
        O método <code>build</code> é chamado em <strong>muitas</strong> situações:
      </p>
      <ul>
        <li>Toda vez que você chama <code>setState</code>.</li>
        <li>Quando o pai reconstrói e te recria.</li>
        <li>Quando um <code>InheritedWidget</code> que você "ouve" muda (tema, MediaQuery, Provider...).</li>
        <li>Em mudanças globais: rotação de tela, troca de teclado, mudança de brilho.</li>
      </ul>
      <p>
        Por isso <code>build</code> precisa ser <strong>puro, rápido e idempotente</strong>: dada a mesma entrada (campos do widget + estado), retorne a mesma árvore. Nada de I/O, nada de criar objetos pesados.
      </p>

      <h2>Como Flutter faz: identidade dos elements</h2>
      <CodeBlock title="O que reaproveita o Element?" code={`// Antes (1ª build)
Column(children: [
  const Text('A'),
  const Padding(
    padding: EdgeInsets.all(8),
    child: Icon(Icons.star),
  ),
])

// Depois (2ª build)
Column(children: [
  const Text('B'),                // mesmo tipo Text -> Element reaproveitado
  const Padding(
    padding: EdgeInsets.all(16),  // só atualiza props
    child: Icon(Icons.star),
  ),
])

// Regra: mesma posição + mesmo runtimeType (+ mesma key se houver)
//   -> Element existente é atualizado
// Tipo diferente -> Element velho destruído, novo criado.`} />

      <h2>Exemplo prático: por que isolar rebuilds</h2>
      <p>
        Imagine um contador onde a parte cara (uma imagem) não tem motivo para reconstruir junto:
      </p>

      <CodeBlock title="Antes — tudo reconstrói" code={`class _TelaState extends State<Tela> {
  int n = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Image.network(banner, height: 200), // reconstrói no setState!
        Text('\$n'),
        ElevatedButton(
          onPressed: () => setState(() => n++),
          child: const Text('+'),
        ),
      ],
    );
  }
}`} />

      <CodeBlock title="Depois — const isola a imagem" code={`class _TelaState extends State<Tela> {
  int n = 0;

  // Subwidget const — Flutter pula o rebuild
  static const _Banner _banner = _Banner();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _banner,
        Text('\$n'),
        ElevatedButton(
          onPressed: () => setState(() => n++),
          child: const Text('+'),
        ),
      ],
    );
  }
}

class _Banner extends StatelessWidget {
  const _Banner();
  @override
  Widget build(BuildContext context) =>
      Image.network('https://...', height: 200);
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Criar objetos pesados dentro do <code>build</code> (controllers, listas grandes calculadas). Mova para <code>initState</code> ou cache em campos.</li>
        <li>Chamar APIs/fetchs no <code>build</code>. Build pode rodar dezenas de vezes — você vai inundar a rede.</li>
        <li>Usar funções que retornam widgets em vez de subwidgets. Funções não criam novo Element, então o Flutter não consegue reaproveitar nem isolar rebuild.</li>
        <li>Esquecer <code>const</code>. Cada <code>const Widget()</code> é uma instância única reaproveitada para sempre — o ganho é gratuito.</li>
      </ul>

      <AlertBox type="warning" title="Função vs subwidget">
        <code>Widget _construirHeader() =&gt; ...</code> parece organizado, mas não cria fronteira de rebuild. Sempre que possível, transforme em <code>class _Header extends StatelessWidget</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        Use o <strong>Flutter DevTools</strong> (aba Performance &gt; Track Widget Builds) para ver exatamente o que está reconstruindo. Costuma surpreender.
      </AlertBox>
      <ul>
        <li>Quebre telas grandes em subwidgets pequenos com <code>const</code>.</li>
        <li>Para escutar dados mutáveis, use <code>Selector</code>/<code>Consumer</code> (Provider) ou <code>Builder</code> para limitar o escopo do rebuild.</li>
        <li>Animações pesadas? Use <code>AnimatedBuilder</code> com <code>child</code> — o filho não reconstrói a cada frame.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Para entender quando o Flutter consegue reaproveitar um Element em listas dinâmicas, o próximo capítulo é <strong>Keys</strong>.
      </p>
      <AlertBox type="success" title="Mentalidade nova">
        Pare de pensar "quem desenha". Comece a pensar "quem o framework precisa redesenhar — e como ajudo a evitar o resto".
      </AlertBox>
    </PageContainer>
  );
}
