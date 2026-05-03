import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ExpandedFlex() {
  return (
    <PageContainer
      title="Expanded & Flex"
      subtitle="Como dividir o espaço disponível em Row e Column — proporcional e sem overflow."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quase toda Row ou Column tem um filho que precisa "ocupar o resto" do espaço — um <code>TextField</code> ao lado de um botão, uma área de conteúdo entre cabeçalho e rodapé, duas colunas com proporção 1:2. Sem <code>Expanded</code>/<code>Flexible</code>, ou dá overflow ou sobra espaço esquisito.
      </p>

      <h2>O conceito</h2>
      <p>
        Row e Column distribuem o espaço em <strong>duas fases</strong>:
      </p>
      <ol>
        <li>Primeiro, perguntam aos filhos <em>não-flex</em> ("inflexíveis") qual o tamanho deles.</li>
        <li>O espaço que sobra é dividido entre os filhos <strong>Expanded</strong>/<strong>Flexible</strong>, na proporção do <code>flex</code> de cada um.</li>
      </ol>
      <p>
        <strong>Expanded</strong> = "ocupe TODO o espaço do flex que te coube".<br/>
        <strong>Flexible</strong> = "você PODE ir até o espaço do flex, mas não precisa".
      </p>

      <AlertBox type="info" title="Em uma frase">
        <code>Expanded(child: x)</code> é igual a <code>Flexible(fit: FlexFit.tight, child: x)</code>.
      </AlertBox>

      <h2>Como Flutter faz</h2>
      <CodeBlock title="Caso clássico: TextField que ocupa o resto" code={`Row(
  children: [
    const Icon(Icons.search),
    const SizedBox(width: 8),

    // Sem Expanded daria overflow — TextField pede largura infinita
    Expanded(
      child: TextField(
        decoration: InputDecoration(hintText: 'Buscar...'),
      ),
    ),

    const SizedBox(width: 8),
    IconButton(icon: const Icon(Icons.send), onPressed: () {}),
  ],
)`} />

      <h2>Proporções com flex factor</h2>
      <CodeBlock title="2/5 + 3/5" code={`Row(
  children: [
    Expanded(
      flex: 2, // 2 partes
      child: Container(color: Colors.red, height: 100),
    ),
    Expanded(
      flex: 3, // 3 partes
      child: Container(color: Colors.blue, height: 100),
    ),
  ],
)
// Soma: 2 + 3 = 5. Vermelho fica com 40%, azul com 60%.`} />

      <h2>Exemplo prático: layout de tela com header/conteúdo/footer</h2>
      <CodeBlock title="Estrutura vertical comum" code={`class Tela extends StatelessWidget {
  const Tela({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Header com altura fixa
          Container(
            height: 80,
            color: Colors.indigo,
            child: const Center(
              child: Text('Cabeçalho',
                  style: TextStyle(color: Colors.white)),
            ),
          ),

          // Conteúdo ocupa o resto
          Expanded(
            child: ListView.builder(
              itemCount: 50,
              itemBuilder: (_, i) => ListTile(title: Text('Item \$i')),
            ),
          ),

          // Footer também fixo
          Container(
            height: 56,
            color: Colors.grey.shade200,
            child: const Center(child: Text('Rodapé')),
          ),
        ],
      ),
    );
  }
}`} />

      <h2>Flexible vs Expanded — quando usar qual</h2>
      <ul>
        <li><strong>Expanded</strong> — força o filho a ocupar tudo. Ideal para áreas que devem preencher: TextField, ListView, Container colorido.</li>
        <li><strong>Flexible</strong> com <code>FlexFit.loose</code> (padrão) — filho pode ser menor. Bom para texto que talvez caiba sem precisar do espaço todo.</li>
      </ul>
      <CodeBlock title="Texto que encolhe se precisar" code={`Row(
  children: [
    Flexible(
      // Se o texto for curto, ocupa só o necessário.
      // Se for longo, vai até o limite e quebra/elipsa.
      child: Text(
        nomeMuitoLongoTalvez,
        overflow: TextOverflow.ellipsis,
      ),
    ),
    const Icon(Icons.verified, color: Colors.blue),
  ],
)`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Usar <code>Expanded</code> dentro de <code>SingleChildScrollView</code>, <code>ListView</code> não-finita ou <code>Column</code> dentro de <code>Stack</code> sem tamanho. Erro: Expanded precisa de eixo principal com restrição finita.</li>
        <li>Esperar que <code>Expanded</code> funcione em qualquer pai. Só dentro de <code>Row</code>, <code>Column</code> ou <code>Flex</code>.</li>
        <li>Misturar <code>Expanded</code> e <code>SizedBox</code> com largura fixa esperando que ambos ocupem — o SizedBox vence (é inflexível).</li>
        <li>Dois Expanded com flex iguais e textos diferentes — tudo bem, eles dividem 50/50, mas o conteúdo pode ficar cortado se não tiver <code>overflow</code>.</li>
        <li>Usar <code>Spacer()</code> e esquecer que ele é só um Expanded com filho vazio. Equivalente a <code>Expanded(child: SizedBox.shrink())</code>.</li>
      </ul>

      <AlertBox type="warning" title="Erro: 'unbounded'">
        Mensagem do tipo "RenderFlex children have non-zero flex but incoming height constraints are unbounded" significa: você usou <code>Expanded</code>/<code>Flexible</code> num Column dentro de algo sem altura definida (SingleChildScrollView, ListView). Solução: dê altura ao pai ou troque o Expanded por <code>SizedBox</code>/<code>shrinkWrap</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        Para criar gaps proporcionais entre filhos, use <code>Spacer()</code> em vez de <code>SizedBox</code> com tamanhos calculados. Ele se adapta ao espaço disponível.
      </AlertBox>
      <ul>
        <li>Combine <code>Expanded</code> com <code>overflow: TextOverflow.ellipsis</code> em textos longos.</li>
        <li>Para layouts de duas colunas em tablet, use <code>Expanded</code> com flex baseado em <code>MediaQuery</code>.</li>
        <li>Em Column rolável, NÃO use Expanded — embrulhe numa <code>SizedBox</code> com altura definida ou use <code>CustomScrollView</code>.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Você sabe distribuir espaço estaticamente. A seguir: <strong>ListView</strong> para listas roláveis grandes e <strong>Slivers</strong> para layouts roláveis customizados.
      </p>
      <AlertBox type="success" title="Pronto">
        Expanded é o "flex: 1" do CSS, mas com superpoderes graças ao layout em duas fases do Flutter.
      </AlertBox>
    </PageContainer>
  );
}
