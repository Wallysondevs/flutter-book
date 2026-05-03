import{j as e}from"./index-D9yRYXwO.js";import{P as r,A as o,C as a}from"./AlertBox-B2Rl5ETq.js";function s(){return e.jsxs(r,{title:"Hero Animations",subtitle:"Animação automática de um elemento entre duas telas — sem controller.",difficulty:"intermediario",timeToRead:"9 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Você abre o Instagram, toca numa foto da grade — e ela ",e.jsx("em",{children:"cresce suavemente"})," até virar o post em tela cheia. Esse efeito ancora o usuário: ele vê ",e.jsx("strong",{children:"de onde veio"})," o conteúdo, e voltar parece natural. Sem isso, parece que a tela trocou do nada."]}),e.jsxs("p",{children:["No Flutter esse efeito tem nome próprio: ",e.jsx("strong",{children:"Hero animation"}),". E o melhor: você não precisa escrever uma única linha de código de animação."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Imagine duas fotos iguais em telas diferentes, marcadas com a ",e.jsx("strong",{children:"mesma etiqueta"}),". Quando o Flutter navega da tela A para a tela B, ele:"]}),e.jsxs("ol",{children:[e.jsxs("li",{children:["Vê que existe um ",e.jsx("code",{children:"Hero"})," com a tag ",e.jsx("code",{children:"X"})," na tela A."]}),e.jsxs("li",{children:["Vê que existe outro ",e.jsx("code",{children:"Hero"})," com a tag ",e.jsx("code",{children:"X"})," na tela B."]}),e.jsx("li",{children:"Tira o widget de A do lugar, voa ele até a posição/tamanho do de B durante a transição, e descarta."})]}),e.jsxs("p",{children:["Você só precisa garantir: ",e.jsxs("strong",{children:["mesma tag, dois ",e.jsx("code",{children:"Hero"}),"s, em rotas diferentes"]}),"."]}),e.jsxs(o,{type:"info",title:"A tag pode ser qualquer coisa",children:["String, número, ou qualquer objeto que implemente ",e.jsx("code",{children:"=="})," e ",e.jsx("code",{children:"hashCode"})," direito. O comum é usar o ",e.jsx("code",{children:"id"})," do item: ",e.jsx("code",{children:"'foto-42'"}),", ou direto o objeto."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsxs("p",{children:["Envolva o widget de origem com ",e.jsx("code",{children:"Hero"}),". Faça a navegação. Envolva o widget de destino com outro ",e.jsx("code",{children:"Hero"})," de mesma tag. Pronto."]}),e.jsx(a,{title:"lista → detalhe",code:`// modelo simples
class Foto {
  final String id;
  final String url;
  Foto(this.id, this.url);
}

// 1) Tela de lista — cada thumb é um Hero
class TelaLista extends StatelessWidget {
  final List<Foto> fotos;
  const TelaLista({super.key, required this.fotos});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GridView.count(
        crossAxisCount: 3,
        children: fotos.map((f) {
          return GestureDetector(
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => TelaDetalhe(foto: f)),
            ),
            // tag única por item — $f.id garante unicidade
            child: Hero(
              tag: 'foto-\${f.id}',
              child: Image.network(f.url, fit: BoxFit.cover),
            ),
          );
        }).toList(),
      ),
    );
  }
}

// 2) Tela de detalhe — mesma tag, mesma imagem
class TelaDetalhe extends StatelessWidget {
  final Foto foto;
  const TelaDetalhe({super.key, required this.foto});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Hero(
          tag: 'foto-\${foto.id}',
          child: Image.network(foto.url),
        ),
      ),
    );
  }
}`}),e.jsxs("p",{children:["Toque numa thumb: ela ",e.jsx("strong",{children:"cresce voando"})," até o tamanho da imagem grande. Volte: ela encolhe de volta para a posição original na grade. Sem nenhuma ",e.jsx("code",{children:"Tween"}),", sem nenhum ",e.jsx("code",{children:"AnimationController"}),"."]}),e.jsx("h2",{children:"Exemplo prático: customizando a transição"}),e.jsxs("p",{children:['Por padrão a interpolação é "retangular": forma e cor mudam linearmente. Para casos como avatar circular virando capa retangular, use ',e.jsx("code",{children:"flightShuttleBuilder"})," para controlar o widget que voa no meio do trajeto."]}),e.jsx(a,{title:"avatar redondo → banner",code:`Hero(
  tag: 'avatar-\${user.id}',
  // este widget é construído enquanto o Hero está "no ar"
  flightShuttleBuilder: (
    flightContext,
    animation,
    direction,
    fromContext,
    toContext,
  ) {
    return AnimatedBuilder(
      animation: animation,
      builder: (_, __) {
        // raio interpolado: 50 (círculo) -> 12 (canto suave)
        final raio = Tween<double>(begin: 50, end: 12)
            .evaluate(animation);
        return ClipRRect(
          borderRadius: BorderRadius.circular(raio),
          child: Image.network(user.avatarUrl, fit: BoxFit.cover),
        );
      },
    );
  },
  child: ClipRRect(
    borderRadius: BorderRadius.circular(50),
    child: Image.network(user.avatarUrl, width: 100, height: 100),
  ),
)`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Tags duplicadas na mesma rota"}),": dois ",e.jsx("code",{children:"Hero"}),"s com tag igual visível ao mesmo tempo dão exception."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tags como string fixa"}),": ",e.jsx("code",{children:"'foto'"})," para todos os itens da lista — o Flutter não sabe qual é qual. Use o id."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer Hero no destino"}),": sem o segundo ",e.jsx("code",{children:"Hero"}),", nada anima — só uma transição comum de rota."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Imagens diferentes nas duas pontas"}),': o efeito fica estranho, parece "corte". Use a mesma URL/asset.']}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Hero dentro de listas com ",e.jsx("code",{children:"const"})," agressivo"]}),": tudo bem usar const, só garanta que a tag muda por item."]})]}),e.jsxs(o,{type:"warning",title:"Cuidado com Hero dentro de Hero",children:["Aninhar ",e.jsx("code",{children:"Hero"}),"s causa comportamento imprevisível. Se precisar animar várias coisas juntas, use uma única tag no widget mais externo."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(o,{type:"tip",title:"Padronize o esquema de tags",children:["Adote um padrão por entidade — ",e.jsxs("code",{children:["'produto-\\$",id,"'"]}),", ",e.jsxs("code",{children:["'usuario-avatar-\\$",id,"'"]}),". Fica óbvio na leitura e evita colisão entre módulos diferentes do app."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use Hero para ",e.jsx("strong",{children:"imagens"}),", ",e.jsx("strong",{children:"avatares"}),", ",e.jsx("strong",{children:"cards"})," que viram tela cheia. Evite em texto puro — a interpolação de fonte fica feia."]}),e.jsxs("li",{children:["Combine com ",e.jsx("code",{children:"BackdropFilter"})," ou ",e.jsx("code",{children:"FadeTransition"})," da própria rota para um polimento extra."]}),e.jsxs("li",{children:["Prefira ",e.jsx("code",{children:"MaterialPageRoute"})," ou ",e.jsx("code",{children:"CupertinoPageRoute"})," — Hero funciona pronto. Em rotas customizadas com ",e.jsx("code",{children:"PageRouteBuilder"}),", certifique-se de propagar o ",e.jsx("code",{children:"Hero"})," corretamente."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Hero é a porta de entrada para apps com sensação ",e.jsx("em",{children:"nativa"}),". Quando precisar ir além — animar a chegada de cards, transições de página customizadas, listas que reordenam suavemente — explore o pacote oficial ",e.jsx("code",{children:"animations"})," do Material."]}),e.jsxs(o,{type:"success",title:"O que vem por aí",children:["Capítulos seguintes mergulham em integração nativa: chamar Kotlin/Swift do Dart com ",e.jsx("strong",{children:"Platform Channels"}),", criar ",e.jsx("strong",{children:"Plugins"}),", e baixar até C/C++ com ",e.jsx("strong",{children:"Dart FFI"}),"."]})]})}export{s as default};
