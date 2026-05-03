import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ListView() {
  return (
    <PageContainer
      title="ListView & GridView"
      subtitle="Listas e grids roláveis — com versão lazy para listas grandes sem travar o app."
      difficulty="iniciante"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quase todo app mostra listas: feed, mensagens, produtos, contatos. Em Flutter, escolher entre <code>ListView</code>, <code>ListView.builder</code> e <code>GridView</code> impacta diretamente performance, memória e tempo de scroll. Saber qual usar é a diferença entre um app fluido e um que trava em 200 itens.
      </p>

      <h2>O conceito</h2>
      <p>
        <code>ListView</code> é um widget rolável que organiza filhos em uma direção (vertical por padrão). Ele tem três construtores principais:
      </p>
      <ul>
        <li><strong><code>ListView(children: [...])</code></strong> — cria <em>tudo</em> de uma vez. Use só com poucos itens (≤ ~20) e tamanho conhecido.</li>
        <li><strong><code>ListView.builder</code></strong> — <em>lazy</em>, só constrói os itens visíveis (e um pouco antes/depois). Use para listas grandes ou de tamanho desconhecido.</li>
        <li><strong><code>ListView.separated</code></strong> — igual ao builder, mas com separador entre itens.</li>
      </ul>

      <AlertBox type="info" title="Lazy = rápido">
        Com <code>builder</code>, uma lista de 10.000 itens consome a mesma memória de uma com 20. O Flutter só renderiza o que aparece na tela mais um pequeno cache (ajustável via <code>cacheExtent</code>).
      </AlertBox>

      <h2>Como Flutter faz</h2>
      <CodeBlock title="ListView.builder — o jeito certo" code={`class ListaProdutos extends StatelessWidget {
  final List<Produto> produtos;
  const ListaProdutos({super.key, required this.produtos});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      // Quantos itens existem no total
      itemCount: produtos.length,

      // Função chamada SOB DEMANDA para cada item visível
      itemBuilder: (context, index) {
        final p = produtos[index];
        return ListTile(
          leading: Image.network(p.imagem, width: 56, fit: BoxFit.cover),
          title: Text(p.nome),
          subtitle: Text('R\\\$ \${p.preco.toStringAsFixed(2)}'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () => abrirDetalhe(context, p),
        );
      },
    );
  }
}`} />

      <h2>ListView.separated — com divisores</h2>
      <CodeBlock title="Lista com separador entre itens" code={`ListView.separated(
  itemCount: mensagens.length,
  separatorBuilder: (_, __) => const Divider(height: 1),
  itemBuilder: (context, i) => ListTile(
    title: Text(mensagens[i].titulo),
    subtitle: Text(mensagens[i].previa,
        maxLines: 2, overflow: TextOverflow.ellipsis),
  ),
)`} />

      <h2>GridView.builder</h2>
      <CodeBlock title="Galeria de imagens 3 por linha" code={`GridView.builder(
  padding: const EdgeInsets.all(8),
  itemCount: fotos.length,

  // Como configurar a grid
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 3,         // 3 colunas
    crossAxisSpacing: 8,       // espaço horizontal
    mainAxisSpacing: 8,        // espaço vertical
    childAspectRatio: 1,       // quadrado
  ),

  itemBuilder: (context, i) => ClipRRect(
    borderRadius: BorderRadius.circular(8),
    child: Image.network(fotos[i], fit: BoxFit.cover),
  ),
)`} />

      <p>
        Para grids responsivas (ajustam o número de colunas pelo tamanho da tela), use <code>SliverGridDelegateWithMaxCrossAxisExtent</code> em vez de fixar a contagem.
      </p>

      <h2>Exemplo prático: feed com pull-to-refresh</h2>
      <CodeBlock title="Feed completo" code={`class Feed extends StatefulWidget {
  const Feed({super.key});
  @override
  State<Feed> createState() => _FeedState();
}

class _FeedState extends State<Feed> {
  List<Post> posts = [];

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  Future<void> _carregar() async {
    final novos = await api.buscarPosts();
    if (!mounted) return;
    setState(() => posts = novos);
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _carregar, // arrasta para baixo para recarregar
      child: ListView.separated(
        // Sempre rolável (mesmo com poucos itens) para o refresh funcionar
        physics: const AlwaysScrollableScrollPhysics(),
        itemCount: posts.length,
        separatorBuilder: (_, __) => const Divider(),
        itemBuilder: (_, i) => PostCard(post: posts[i]),
      ),
    );
  }
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Listas dentro de Column sem altura</strong> — dá erro de "unbounded height". Use <code>Expanded</code> em volta da ListView.</li>
        <li><strong>ListView dentro de outra ListView</strong> — crash garantido. Use <code>shrinkWrap: true</code> + <code>physics: NeverScrollableScrollPhysics()</code>, ou melhor: use <code>CustomScrollView</code> com slivers.</li>
        <li><strong>Esquecer keys em itens reordenáveis</strong> — estado interno (checkbox, animação) embaralha. Use <code>key: ValueKey(item.id)</code>.</li>
        <li><strong>Imagens grandes sem cache</strong> — use <code>cached_network_image</code>. <code>Image.network</code> faz cache em memória mas não no disco.</li>
        <li><strong>Trabalho pesado dentro do <code>itemBuilder</code></strong> — formatações complexas, parsing — faça antes (no <code>State</code>) e só renderize.</li>
      </ul>

      <AlertBox type="warning" title="ListView clássico em listas grandes">
        Nunca use <code>ListView(children: [...])</code> com 100+ itens. Ele renderiza tudo de uma vez, consome memória e pode travar a tela por segundos. <code>builder</code> é a regra.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        Para listas infinitas com paginação, escute o <code>controller.position</code> e dispare a busca quando estiver perto do fim. Pacotes como <code>infinite_scroll_pagination</code> simplificam.
      </AlertBox>
      <ul>
        <li>Defina <code>itemExtent</code> quando todos os itens têm a mesma altura — Flutter pula medições e fica mais rápido.</li>
        <li>Use <code>const</code> nos itens sempre que possível.</li>
        <li>Para listas com cabeçalhos diferentes ou seções, use <code>CustomScrollView</code> + slivers.</li>
        <li>Em GridView, prefira o delegate <code>WithMaxCrossAxisExtent</code> para responsividade.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Quando precisar misturar header colapsável + lista + grid + footer numa única rolagem coordenada, é hora de aprender <strong>Slivers</strong> — o próximo capítulo.
      </p>
      <AlertBox type="success" title="Você desbloqueou">
        Listas roláveis performáticas. Sem mais "meu app trava com 500 itens".
      </AlertBox>
    </PageContainer>
  );
}
