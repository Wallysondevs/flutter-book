import{j as e}from"./index-D4AOhXGO.js";import{P as r,A as s,C as i}from"./AlertBox-Dyf2wdSA.js";function a(){return e.jsxs(r,{title:"ListView & GridView",subtitle:"Listas e grids roláveis — com versão lazy para listas grandes sem travar o app.",difficulty:"iniciante",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quase todo app mostra listas: feed, mensagens, produtos, contatos. Em Flutter, escolher entre ",e.jsx("code",{children:"ListView"}),", ",e.jsx("code",{children:"ListView.builder"})," e ",e.jsx("code",{children:"GridView"})," impacta diretamente performance, memória e tempo de scroll. Saber qual usar é a diferença entre um app fluido e um que trava em 200 itens."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:[e.jsx("code",{children:"ListView"})," é um widget rolável que organiza filhos em uma direção (vertical por padrão). Ele tem três construtores principais:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"ListView(children: [...])"})})," — cria ",e.jsx("em",{children:"tudo"})," de uma vez. Use só com poucos itens (≤ ~20) e tamanho conhecido."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"ListView.builder"})})," — ",e.jsx("em",{children:"lazy"}),", só constrói os itens visíveis (e um pouco antes/depois). Use para listas grandes ou de tamanho desconhecido."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"ListView.separated"})})," — igual ao builder, mas com separador entre itens."]})]}),e.jsxs(s,{type:"info",title:"Lazy = rápido",children:["Com ",e.jsx("code",{children:"builder"}),", uma lista de 10.000 itens consome a mesma memória de uma com 20. O Flutter só renderiza o que aparece na tela mais um pequeno cache (ajustável via ",e.jsx("code",{children:"cacheExtent"}),")."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(i,{title:"ListView.builder — o jeito certo",code:`class ListaProdutos extends StatelessWidget {
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
          subtitle: Text('R\\$ \${p.preco.toStringAsFixed(2)}'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () => abrirDetalhe(context, p),
        );
      },
    );
  }
}`}),e.jsx("h2",{children:"ListView.separated — com divisores"}),e.jsx(i,{title:"Lista com separador entre itens",code:`ListView.separated(
  itemCount: mensagens.length,
  separatorBuilder: (_, __) => const Divider(height: 1),
  itemBuilder: (context, i) => ListTile(
    title: Text(mensagens[i].titulo),
    subtitle: Text(mensagens[i].previa,
        maxLines: 2, overflow: TextOverflow.ellipsis),
  ),
)`}),e.jsx("h2",{children:"GridView.builder"}),e.jsx(i,{title:"Galeria de imagens 3 por linha",code:`GridView.builder(
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
)`}),e.jsxs("p",{children:["Para grids responsivas (ajustam o número de colunas pelo tamanho da tela), use ",e.jsx("code",{children:"SliverGridDelegateWithMaxCrossAxisExtent"})," em vez de fixar a contagem."]}),e.jsx("h2",{children:"Exemplo prático: feed com pull-to-refresh"}),e.jsx(i,{title:"Feed completo",code:`class Feed extends StatefulWidget {
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
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Listas dentro de Column sem altura"}),' — dá erro de "unbounded height". Use ',e.jsx("code",{children:"Expanded"})," em volta da ListView."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ListView dentro de outra ListView"})," — crash garantido. Use ",e.jsx("code",{children:"shrinkWrap: true"})," + ",e.jsx("code",{children:"physics: NeverScrollableScrollPhysics()"}),", ou melhor: use ",e.jsx("code",{children:"CustomScrollView"})," com slivers."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer keys em itens reordenáveis"})," — estado interno (checkbox, animação) embaralha. Use ",e.jsx("code",{children:"key: ValueKey(item.id)"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Imagens grandes sem cache"})," — use ",e.jsx("code",{children:"cached_network_image"}),". ",e.jsx("code",{children:"Image.network"})," faz cache em memória mas não no disco."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Trabalho pesado dentro do ",e.jsx("code",{children:"itemBuilder"})]})," — formatações complexas, parsing — faça antes (no ",e.jsx("code",{children:"State"}),") e só renderize."]})]}),e.jsxs(s,{type:"warning",title:"ListView clássico em listas grandes",children:["Nunca use ",e.jsx("code",{children:"ListView(children: [...])"})," com 100+ itens. Ele renderiza tudo de uma vez, consome memória e pode travar a tela por segundos. ",e.jsx("code",{children:"builder"})," é a regra."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(s,{type:"tip",children:["Para listas infinitas com paginação, escute o ",e.jsx("code",{children:"controller.position"})," e dispare a busca quando estiver perto do fim. Pacotes como ",e.jsx("code",{children:"infinite_scroll_pagination"})," simplificam."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Defina ",e.jsx("code",{children:"itemExtent"})," quando todos os itens têm a mesma altura — Flutter pula medições e fica mais rápido."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"const"})," nos itens sempre que possível."]}),e.jsxs("li",{children:["Para listas com cabeçalhos diferentes ou seções, use ",e.jsx("code",{children:"CustomScrollView"})," + slivers."]}),e.jsxs("li",{children:["Em GridView, prefira o delegate ",e.jsx("code",{children:"WithMaxCrossAxisExtent"})," para responsividade."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Quando precisar misturar header colapsável + lista + grid + footer numa única rolagem coordenada, é hora de aprender ",e.jsx("strong",{children:"Slivers"})," — o próximo capítulo."]}),e.jsx(s,{type:"success",title:"Você desbloqueou",children:'Listas roláveis performáticas. Sem mais "meu app trava com 500 itens".'})]})}export{a as default};
