import{j as e}from"./index-D4AOhXGO.js";import{P as o,A as i,C as r}from"./AlertBox-Dyf2wdSA.js";function a(){return e.jsxs(o,{title:"Slivers",subtitle:"Layouts roláveis customizados — header colapsável, AppBar dinâmica, lista + grid coordenados.",difficulty:"avancado",timeToRead:"15 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsx("p",{children:"Já tentou fazer aquela tela de perfil onde a foto encolhe ao rolar, a AppBar muda de cor, e abaixo tem uma lista que rola junto? Sem slivers, vira um inferno de gestos coordenados. Com slivers, é declarativo: cada pedaço sabe como reagir ao scroll."}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Sliver é um ",e.jsx("strong",{children:"pedaço rolável"})," que vive dentro de um ",e.jsx("code",{children:"CustomScrollView"}),'. Em vez de uma única ListView, você compõe vários "tipos de comportamento de rolagem":']}),e.jsxs("ul",{children:[e.jsx("li",{children:"Um sliver que é uma AppBar e encolhe."}),e.jsx("li",{children:"Outro que é uma lista lazy."}),e.jsx("li",{children:"Outro que é uma grid."}),e.jsx("li",{children:'Outro que "fica colado" no topo enquanto rola.'})]}),e.jsxs("p",{children:["Todos compartilham o ",e.jsx("strong",{children:"mesmo"})," controlador de scroll, então a rolagem é fluida e coordenada."]}),e.jsxs(i,{type:"info",title:"ListView é um sliver disfarçado",children:["Por baixo, ",e.jsx("code",{children:"ListView.builder"})," é um ",e.jsx("code",{children:"SliverList"})," embrulhado em um ",e.jsx("code",{children:"CustomScrollView"}),". Quando você precisa de mais flexibilidade, vá direto para slivers."]}),e.jsx("h2",{children:"Como Flutter faz: o esqueleto"}),e.jsx(r,{title:"CustomScrollView com vários slivers",code:`CustomScrollView(
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
)`}),e.jsx("h2",{children:"Os slivers mais úteis"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"SliverAppBar"})})," — AppBar com efeitos de scroll. Combinações: ",e.jsx("code",{children:"pinned"}),", ",e.jsx("code",{children:"floating"}),", ",e.jsx("code",{children:"snap"}),", ",e.jsx("code",{children:"stretch"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:[e.jsx("code",{children:"SliverList"})," / ",e.jsx("code",{children:"SliverList.builder"})]})," — versão sliver da ListView."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:[e.jsx("code",{children:"SliverGrid"})," / ",e.jsx("code",{children:"SliverGrid.builder"})]})," — versão sliver da GridView."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"SliverToBoxAdapter"})})," — embrulha um widget normal (não-sliver) para colocar dentro do CustomScrollView."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"SliverPadding"})})," — aplica padding em outro sliver."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"SliverPersistentHeader"})}),' — header customizado que pode "colar" durante o scroll.']}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"SliverFillRemaining"})}),' — ocupa o espaço restante na tela (útil para mensagens "lista vazia").']}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"SliverFillViewport"})})," — cada filho ocupa a tela toda (carrosséis verticais)."]})]}),e.jsx("h2",{children:"Exemplo prático: tela de perfil"}),e.jsx(r,{title:"lib/screens/perfil.dart",code:`class TelaPerfil extends StatelessWidget {
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
}`}),e.jsx("h2",{children:"SliverAppBar — flags importantes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"pinned: true"})," — a AppBar mínima fica colada no topo após encolher."]}),e.jsxs("li",{children:[e.jsx("code",{children:"floating: true"})," — qualquer movimento de rolagem para baixo já mostra a AppBar."]}),e.jsxs("li",{children:[e.jsx("code",{children:"snap: true"})," (com floating) — a AppBar aparece/some por inteiro, sem ficar a meio caminho."]}),e.jsxs("li",{children:[e.jsx("code",{children:"stretch: true"})," — quando o usuário arrasta além do topo, a AppBar estica."]})]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Colocar widget normal (não-sliver) direto na lista ",e.jsx("code",{children:"slivers:"}),". Erro: precisa de ",e.jsx("code",{children:"SliverToBoxAdapter"}),"."]}),e.jsxs("li",{children:["Misturar ",e.jsx("code",{children:"NestedScrollView"})," com slivers de jeito errado — abas preservando scroll é um caso específico que pede leitura cuidadosa da doc."]}),e.jsxs("li",{children:["Esperar que ",e.jsx("code",{children:"SliverList"})," calcule altura sozinho com filhos de tamanho variado muito grandes — performa, mas sem ",e.jsx("code",{children:"itemExtent"})," pode pular um pouco no scroll."]}),e.jsxs("li",{children:["Usar ",e.jsx("code",{children:"shrinkWrap"})," em CustomScrollView grande sem necessidade — anula o ganho de lazy loading."]}),e.jsxs("li",{children:["Colocar AppBar normal no ",e.jsx("code",{children:"Scaffold"})," + ",e.jsx("code",{children:"SliverAppBar"})," também — vão se sobrepor. Use só uma das duas."]})]}),e.jsxs(i,{type:"warning",title:"Cuidado com altura infinita",children:["SliverList dentro de Column sem Expanded dá overflow porque o Column quer altura finita. Use ",e.jsx("code",{children:"Expanded"})," ou estruture a tela com ",e.jsx("code",{children:"Scaffold(body: CustomScrollView(...))"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(i,{type:"tip",children:["Comece com ",e.jsx("code",{children:"ListView.builder"}),". Só migre para ",e.jsx("code",{children:"CustomScrollView"})," quando precisar de header colapsável, múltiplas seções com layouts diferentes ou efeitos de scroll customizados."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Separe slivers em widgets nomeados (",e.jsx("code",{children:"_HeaderPerfil"}),", ",e.jsx("code",{children:"_GridPosts"}),") para legibilidade."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"SliverPadding"})," em vez de envolver cada item — mais eficiente."]}),e.jsxs("li",{children:["Para abas com scroll preservado: ",e.jsx("code",{children:"NestedScrollView"})," + ",e.jsx("code",{children:"SliverOverlapAbsorber"}),". Existe boilerplate, mas é o caminho oficial."]}),e.jsxs("li",{children:["Considere o pacote ",e.jsx("code",{children:"sliver_tools"})," para slivers extras (animados, agrupadores)."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Slivers fecham o capítulo de layouts. A seguir, navegação entre telas com ",e.jsx("code",{children:"Navigator"})," e ",e.jsx("code",{children:"go_router"}),", e gerenciamento de estado para alimentar essas listas com dados de verdade."]}),e.jsx(i,{type:"success",title:"Conquistado",children:"Headers colapsáveis, AppBars dinâmicas e telas com múltiplos layouts roláveis agora são parte do seu repertório."})]})}export{a as default};
