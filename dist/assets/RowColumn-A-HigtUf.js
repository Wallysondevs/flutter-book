import{j as e}from"./index-D4AOhXGO.js";import{P as s,A as o,C as i}from"./AlertBox-Dyf2wdSA.js";function r(){return e.jsxs(s,{title:"Row & Column",subtitle:"Os widgets de layout linear mais usados em Flutter — e os erros que todo mundo comete.",difficulty:"iniciante",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quase toda tela de Flutter é uma combinação de ",e.jsx("code",{children:"Row"})," (filhos lado a lado) e ",e.jsx("code",{children:"Column"})," (filhos um embaixo do outro). Se você dominar o eixo principal, eixo cruzado e overflow, resolve 90% dos layouts sem precisar de hacks."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Row e Column herdam de ",e.jsx("code",{children:"Flex"}),". Eles têm dois eixos:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Eixo principal (mainAxis)"})," — a direção em que enfileiram os filhos. Horizontal em Row, vertical em Column."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Eixo cruzado (crossAxis)"})," — perpendicular. Vertical em Row, horizontal em Column."]})]}),e.jsxs("p",{children:["Por padrão, eles tentam ser ",e.jsx("strong",{children:"tão grandes quanto possível"})," no eixo principal e ",e.jsx("strong",{children:"tão pequenos quanto possível"})," no cruzado."]}),e.jsx(o,{type:"info",title:"Analogia",children:"Row é uma fila de pessoas no caixa: andam para os lados (mainAxis = horizontal), e estão todas mais ou menos da mesma altura (crossAxis = vertical). Column é a mesma fila, mas em um elevador estreito."}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(i,{title:"Row básica",code:`Row(
  // Eixo principal: como distribuir o espaço HORIZONTAL
  mainAxisAlignment: MainAxisAlignment.spaceBetween,

  // Eixo cruzado: como alinhar VERTICALMENTE
  crossAxisAlignment: CrossAxisAlignment.center,

  children: [
    Icon(Icons.home),
    Text('Início'),
    Icon(Icons.settings),
  ],
)`}),e.jsx("h2",{children:"As opções de alinhamento"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"MainAxisAlignment.start"})," — empurra para o começo (esquerda em Row, topo em Column)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"MainAxisAlignment.end"})," — empurra para o fim."]}),e.jsxs("li",{children:[e.jsx("code",{children:"MainAxisAlignment.center"})," — agrupa no centro."]}),e.jsxs("li",{children:[e.jsx("code",{children:"MainAxisAlignment.spaceBetween"})," — primeiro/último colados nas pontas, espaços iguais entre."]}),e.jsxs("li",{children:[e.jsx("code",{children:"MainAxisAlignment.spaceAround"})," — espaço igual nas pontas (metade do espaço entre)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"MainAxisAlignment.spaceEvenly"})," — espaço igual em tudo (pontas + entre)."]})]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"CrossAxisAlignment.start / end / center"})," — alinha no eixo cruzado."]}),e.jsxs("li",{children:[e.jsx("code",{children:"CrossAxisAlignment.stretch"})," — força os filhos a ocuparem todo o cruzado."]}),e.jsxs("li",{children:[e.jsx("code",{children:"CrossAxisAlignment.baseline"})," — alinha textos pela linha de base (precisa de ",e.jsx("code",{children:"textBaseline"}),")."]})]}),e.jsx("h2",{children:"Exemplo prático: cabeçalho de perfil"}),e.jsx(i,{title:"Cartão com avatar + textos + ação",code:`class CartaoPerfil extends StatelessWidget {
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
}`}),e.jsx("h2",{children:"O erro mais comum: overflow"}),e.jsx("p",{children:'Se um filho de Row é "infinitamente largo" (texto enorme, outra Row sem limites), o Flutter pinta uma faixa amarela e preta listrada e te xinga no console. Soluções:'}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Expanded"})," ou ",e.jsx("code",{children:"Flexible"})," em volta do filho elástico."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Text(..., overflow: TextOverflow.ellipsis)"})," para reticências."]}),e.jsxs("li",{children:["Envolva em ",e.jsx("code",{children:"SingleChildScrollView(scrollDirection: Axis.horizontal)"})," se faz sentido rolar."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Wrap"})," em vez de Row quando os filhos podem quebrar para a próxima linha."]})]}),e.jsx(o,{type:"danger",title:"Yellow & black tape",children:"Aquela faixa listrada é um bug visível. Sempre trate antes de subir o app — em produção, o usuário vê o conteúdo cortado e parece quebrado."}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Colocar ",e.jsx("code",{children:"Column"})," dentro de ",e.jsx("code",{children:"SingleChildScrollView"})," sem altura definida e adicionar ",e.jsx("code",{children:"Expanded"})," dentro. Erro: Expanded precisa de pai com tamanho finito."]}),e.jsxs("li",{children:["Esperar que ",e.jsx("code",{children:"mainAxisAlignment"})," funcione quando a Row/Column está apertada (sem espaço sobrando). Sem espaço, alinhamento não tem efeito."]}),e.jsxs("li",{children:["Usar ",e.jsx("code",{children:"Row"})," dentro de ",e.jsx("code",{children:"Row"})," sem ",e.jsx("code",{children:"Expanded"}),". A interna assume largura infinita do pai."]}),e.jsxs("li",{children:["Confundir Padding/SizedBox com margin — Row/Column não têm conceito de margem entre filhos. Use ",e.jsx("code",{children:"SizedBox"})," entre eles."]})]}),e.jsxs(o,{type:"tip",title:"Espaços entre filhos",children:["Para espaçamento uniforme, intercale com ",e.jsx("code",{children:"SizedBox(width: 8)"}),"/",e.jsx("code",{children:"height: 8"})," ou use o pacote ",e.jsx("code",{children:"flex_spacing"}),". Em Dart 3, o operador ",e.jsx("code",{children:"..."})," ajuda a montar listas com separadores."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Texto longo dentro de Row sempre acompanhado de ",e.jsx("code",{children:"Expanded"})," + ",e.jsx("code",{children:"overflow: ellipsis"}),"."]}),e.jsxs("li",{children:["Para listas de altura/largura desconhecida, prefira ",e.jsx("code",{children:"Wrap"})," (quebra automática) ou ",e.jsx("code",{children:"ListView"})," (rolável)."]}),e.jsx("li",{children:"Mantenha Row/Column rasos. Se aninha mais de 3-4 níveis, extraia subwidgets."}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"mainAxisSize: MainAxisSize.min"})," quando quiser que a Row/Column ocupe só o necessário (ex: dentro de outro layout)."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Para sobrepor widgets (badges, overlays, banners), o próximo capítulo é ",e.jsx("strong",{children:"Stack & Positioned"}),". Para dividir espaço com proporção, veja ",e.jsx("strong",{children:"Expanded & Flex"}),"."]}),e.jsx(o,{type:"success",title:"Combo essencial",children:"Row + Column + Padding + SizedBox + Expanded resolve a maioria das telas. Domine os cinco antes de partir para Stack."})]})}export{r as default};
