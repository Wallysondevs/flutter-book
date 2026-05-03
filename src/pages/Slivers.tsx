import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Slivers() {
  return (
    <PageContainer
      title="Slivers"
      subtitle="Layouts roláveis customizados — header colapsável, AppBar dinâmica, lista + grid coordenados."
      difficulty="avancado"
      timeToRead="15 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Já tentou fazer aquela tela de perfil onde a foto encolhe ao rolar, a AppBar muda de cor, e abaixo tem uma lista que rola junto? Sem slivers, vira um inferno de gestos coordenados. Com slivers, é declarativo: cada pedaço sabe como reagir ao scroll.
      </p>

      <h2>O conceito</h2>
      <p>
        Sliver é um <strong>pedaço rolável</strong> que vive dentro de um <code>CustomScrollView</code>. Em vez de uma única ListView, você compõe vários "tipos de comportamento de rolagem":
      </p>
      <ul>
        <li>Um sliver que é uma AppBar e encolhe.</li>
        <li>Outro que é uma lista lazy.</li>
        <li>Outro que é uma grid.</li>
        <li>Outro que "fica colado" no topo enquanto rola.</li>
      </ul>
      <p>
        Todos compartilham o <strong>mesmo</strong> controlador de scroll, então a rolagem é fluida e coordenada.
      </p>

      <AlertBox type="info" title="ListView é um sliver disfarçado">
        Por baixo, <code>ListView.builder</code> é um <code>SliverList</code> embrulhado em um <code>CustomScrollView</code>. Quando você precisa de mais flexibilidade, vá direto para slivers.
      </AlertBox>

      <h2>Como Flutter faz: o esqueleto</h2>
      <CodeBlock title="CustomScrollView com vários slivers" code={`CustomScrollView(
  slivers: [
    // 1) Header que encolhe e some
    const SliverAppBar(
      expandedHeight: 200,
      pinned: true,             // AppBar fica fixa no topo
      flexibleSpace: FlexibleSpaceBar(
        title: Text('Galeria'),
      ),
    ),

    // 2) Lista lazy
    SliverList.builder(
      itemCount: items.length,
      itemBuilder: (_, i) => ListTile(title: Text(items[i])),
    ),

    // 3) Grid lazy
    SliverGrid.count(
      crossAxisCount: 3,
      children: fotos.map((u) => Image.network(u)).toList(),
    ),

    // 4) Espaço extra ao final
    const SliverToBoxAdapter(child: SizedBox(height: 80)),
  ],
)`} />

      <h2>Os slivers mais úteis</h2>
      <ul>
        <li><strong><code>SliverAppBar</code></strong> — AppBar com efeitos de scroll. Combinações: <code>pinned</code>, <code>floating</code>, <code>snap</code>, <code>stretch</code>.</li>
        <li><strong><code>SliverList</code> / <code>SliverList.builder</code></strong> — versão sliver da ListView.</li>
        <li><strong><code>SliverGrid</code> / <code>SliverGrid.builder</code></strong> — versão sliver da GridView.</li>
        <li><strong><code>SliverToBoxAdapter</code></strong> — embrulha um widget normal (não-sliver) para colocar dentro do CustomScrollView.</li>
        <li><strong><code>SliverPadding</code></strong> — aplica padding em outro sliver.</li>
        <li><strong><code>SliverPersistentHeader</code></strong> — header customizado que pode "colar" durante o scroll.</li>
        <li><strong><code>SliverFillRemaining</code></strong> — ocupa o espaço restante na tela (útil para mensagens "lista vazia").</li>
        <li><strong><code>SliverFillViewport</code></strong> — cada filho ocupa a tela toda (carrosséis verticais).</li>
      </ul>

      <h2>Exemplo prático: tela de perfil</h2>
      <CodeBlock title="lib/screens/perfil.dart" code={`class TelaPerfil extends StatelessWidget {
  final Usuario usuario;
  const TelaPerfil({super.key, required this.usuario});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // Cabeçalho com foto que estica e encolhe
          SliverAppBar(
            expandedHeight: 240,
            pinned: true,
            stretch: true,
            flexibleSpace: FlexibleSpaceBar(
              title: Text(usuario.nome),
              background: Image.network(
                usuario.fotoCapa,
                fit: BoxFit.cover,
              ),
              stretchModes: const [
                StretchMode.zoomBackground,
                StretchMode.fadeTitle,
              ],
            ),
          ),

          // Bloco de bio (widget comum embrulhado)
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Text(usuario.bio,
                  style: Theme.of(context).textTheme.bodyMedium),
            ),
          ),

          // Header fixo "Posts"
          const SliverPadding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            sliver: SliverToBoxAdapter(
              child: Text('Posts',
                  style: TextStyle(
                      fontSize: 18, fontWeight: FontWeight.bold)),
            ),
          ),

          // Grid de posts (lazy)
          SliverPadding(
            padding: const EdgeInsets.all(8),
            sliver: SliverGrid.builder(
              gridDelegate:
                  const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                crossAxisSpacing: 4,
                mainAxisSpacing: 4,
              ),
              itemCount: usuario.posts.length,
              itemBuilder: (_, i) => Image.network(
                usuario.posts[i].imagem,
                fit: BoxFit.cover,
              ),
            ),
          ),
        ],
      ),
    );
  }
}`} />

      <h2>SliverAppBar — flags importantes</h2>
      <ul>
        <li><code>pinned: true</code> — a AppBar mínima fica colada no topo após encolher.</li>
        <li><code>floating: true</code> — qualquer movimento de rolagem para baixo já mostra a AppBar.</li>
        <li><code>snap: true</code> (com floating) — a AppBar aparece/some por inteiro, sem ficar a meio caminho.</li>
        <li><code>stretch: true</code> — quando o usuário arrasta além do topo, a AppBar estica.</li>
      </ul>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Colocar widget normal (não-sliver) direto na lista <code>slivers:</code>. Erro: precisa de <code>SliverToBoxAdapter</code>.</li>
        <li>Misturar <code>NestedScrollView</code> com slivers de jeito errado — abas preservando scroll é um caso específico que pede leitura cuidadosa da doc.</li>
        <li>Esperar que <code>SliverList</code> calcule altura sozinho com filhos de tamanho variado muito grandes — performa, mas sem <code>itemExtent</code> pode pular um pouco no scroll.</li>
        <li>Usar <code>shrinkWrap</code> em CustomScrollView grande sem necessidade — anula o ganho de lazy loading.</li>
        <li>Colocar AppBar normal no <code>Scaffold</code> + <code>SliverAppBar</code> também — vão se sobrepor. Use só uma das duas.</li>
      </ul>

      <AlertBox type="warning" title="Cuidado com altura infinita">
        SliverList dentro de Column sem Expanded dá overflow porque o Column quer altura finita. Use <code>Expanded</code> ou estruture a tela com <code>Scaffold(body: CustomScrollView(...))</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        Comece com <code>ListView.builder</code>. Só migre para <code>CustomScrollView</code> quando precisar de header colapsável, múltiplas seções com layouts diferentes ou efeitos de scroll customizados.
      </AlertBox>
      <ul>
        <li>Separe slivers em widgets nomeados (<code>_HeaderPerfil</code>, <code>_GridPosts</code>) para legibilidade.</li>
        <li>Use <code>SliverPadding</code> em vez de envolver cada item — mais eficiente.</li>
        <li>Para abas com scroll preservado: <code>NestedScrollView</code> + <code>SliverOverlapAbsorber</code>. Existe boilerplate, mas é o caminho oficial.</li>
        <li>Considere o pacote <code>sliver_tools</code> para slivers extras (animados, agrupadores).</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Slivers fecham o capítulo de layouts. A seguir, navegação entre telas com <code>Navigator</code> e <code>go_router</code>, e gerenciamento de estado para alimentar essas listas com dados de verdade.
      </p>
      <AlertBox type="success" title="Conquistado">
        Headers colapsáveis, AppBars dinâmicas e telas com múltiplos layouts roláveis agora são parte do seu repertório.
      </AlertBox>
    </PageContainer>
  );
}
