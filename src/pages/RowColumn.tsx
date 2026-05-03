import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function RowColumn() {
  return (
    <PageContainer
      title="Row & Column"
      subtitle="Os widgets de layout linear mais usados em Flutter — e os erros que todo mundo comete."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quase toda tela de Flutter é uma combinação de <code>Row</code> (filhos lado a lado) e <code>Column</code> (filhos um embaixo do outro). Se você dominar o eixo principal, eixo cruzado e overflow, resolve 90% dos layouts sem precisar de hacks.
      </p>

      <h2>O conceito</h2>
      <p>
        Row e Column herdam de <code>Flex</code>. Eles têm dois eixos:
      </p>
      <ul>
        <li><strong>Eixo principal (mainAxis)</strong> — a direção em que enfileiram os filhos. Horizontal em Row, vertical em Column.</li>
        <li><strong>Eixo cruzado (crossAxis)</strong> — perpendicular. Vertical em Row, horizontal em Column.</li>
      </ul>
      <p>
        Por padrão, eles tentam ser <strong>tão grandes quanto possível</strong> no eixo principal e <strong>tão pequenos quanto possível</strong> no cruzado.
      </p>

      <AlertBox type="info" title="Analogia">
        Row é uma fila de pessoas no caixa: andam para os lados (mainAxis = horizontal), e estão todas mais ou menos da mesma altura (crossAxis = vertical). Column é a mesma fila, mas em um elevador estreito.
      </AlertBox>

      <h2>Como Flutter faz</h2>
      <CodeBlock title="Row básica" code={`Row(
  // Eixo principal: como distribuir o espaço HORIZONTAL
  mainAxisAlignment: MainAxisAlignment.spaceBetween,

  // Eixo cruzado: como alinhar VERTICALMENTE
  crossAxisAlignment: CrossAxisAlignment.center,

  children: [
    Icon(Icons.home),
    Text('Início'),
    Icon(Icons.settings),
  ],
)`} />

      <h2>As opções de alinhamento</h2>
      <ul>
        <li><code>MainAxisAlignment.start</code> — empurra para o começo (esquerda em Row, topo em Column).</li>
        <li><code>MainAxisAlignment.end</code> — empurra para o fim.</li>
        <li><code>MainAxisAlignment.center</code> — agrupa no centro.</li>
        <li><code>MainAxisAlignment.spaceBetween</code> — primeiro/último colados nas pontas, espaços iguais entre.</li>
        <li><code>MainAxisAlignment.spaceAround</code> — espaço igual nas pontas (metade do espaço entre).</li>
        <li><code>MainAxisAlignment.spaceEvenly</code> — espaço igual em tudo (pontas + entre).</li>
      </ul>
      <ul>
        <li><code>CrossAxisAlignment.start / end / center</code> — alinha no eixo cruzado.</li>
        <li><code>CrossAxisAlignment.stretch</code> — força os filhos a ocuparem todo o cruzado.</li>
        <li><code>CrossAxisAlignment.baseline</code> — alinha textos pela linha de base (precisa de <code>textBaseline</code>).</li>
      </ul>

      <h2>Exemplo prático: cabeçalho de perfil</h2>
      <CodeBlock title="Cartão com avatar + textos + ação" code={`class CartaoPerfil extends StatelessWidget {
  final String nome;
  final String email;
  final VoidCallback onEditar;
  const CartaoPerfil({
    super.key,
    required this.nome,
    required this.email,
    required this.onEditar,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const CircleAvatar(radius: 28, child: Icon(Icons.person)),
          const SizedBox(width: 12),
          // Expanded ocupa o espaço restante e EVITA overflow
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(nome,
                    style: Theme.of(context).textTheme.titleMedium,
                    overflow: TextOverflow.ellipsis),
                Text(email,
                    style: Theme.of(context).textTheme.bodySmall,
                    overflow: TextOverflow.ellipsis),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: onEditar,
          ),
        ],
      ),
    );
  }
}`} />

      <h2>O erro mais comum: overflow</h2>
      <p>
        Se um filho de Row é "infinitamente largo" (texto enorme, outra Row sem limites), o Flutter pinta uma faixa amarela e preta listrada e te xinga no console. Soluções:
      </p>
      <ul>
        <li>Use <code>Expanded</code> ou <code>Flexible</code> em volta do filho elástico.</li>
        <li>Use <code>Text(..., overflow: TextOverflow.ellipsis)</code> para reticências.</li>
        <li>Envolva em <code>SingleChildScrollView(scrollDirection: Axis.horizontal)</code> se faz sentido rolar.</li>
        <li>Use <code>Wrap</code> em vez de Row quando os filhos podem quebrar para a próxima linha.</li>
      </ul>

      <AlertBox type="danger" title="Yellow & black tape">
        Aquela faixa listrada é um bug visível. Sempre trate antes de subir o app — em produção, o usuário vê o conteúdo cortado e parece quebrado.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Colocar <code>Column</code> dentro de <code>SingleChildScrollView</code> sem altura definida e adicionar <code>Expanded</code> dentro. Erro: Expanded precisa de pai com tamanho finito.</li>
        <li>Esperar que <code>mainAxisAlignment</code> funcione quando a Row/Column está apertada (sem espaço sobrando). Sem espaço, alinhamento não tem efeito.</li>
        <li>Usar <code>Row</code> dentro de <code>Row</code> sem <code>Expanded</code>. A interna assume largura infinita do pai.</li>
        <li>Confundir Padding/SizedBox com margin — Row/Column não têm conceito de margem entre filhos. Use <code>SizedBox</code> entre eles.</li>
      </ul>

      <AlertBox type="tip" title="Espaços entre filhos">
        Para espaçamento uniforme, intercale com <code>SizedBox(width: 8)</code>/<code>height: 8</code> ou use o pacote <code>flex_spacing</code>. Em Dart 3, o operador <code>...</code> ajuda a montar listas com separadores.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Texto longo dentro de Row sempre acompanhado de <code>Expanded</code> + <code>overflow: ellipsis</code>.</li>
        <li>Para listas de altura/largura desconhecida, prefira <code>Wrap</code> (quebra automática) ou <code>ListView</code> (rolável).</li>
        <li>Mantenha Row/Column rasos. Se aninha mais de 3-4 níveis, extraia subwidgets.</li>
        <li>Use <code>mainAxisSize: MainAxisSize.min</code> quando quiser que a Row/Column ocupe só o necessário (ex: dentro de outro layout).</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Para sobrepor widgets (badges, overlays, banners), o próximo capítulo é <strong>Stack & Positioned</strong>. Para dividir espaço com proporção, veja <strong>Expanded & Flex</strong>.
      </p>
      <AlertBox type="success" title="Combo essencial">
        Row + Column + Padding + SizedBox + Expanded resolve a maioria das telas. Domine os cinco antes de partir para Stack.
      </AlertBox>
    </PageContainer>
  );
}
