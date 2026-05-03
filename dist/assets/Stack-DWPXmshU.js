import{j as o}from"./index-D4AOhXGO.js";import{P as a,A as e,C as i}from"./AlertBox-Dyf2wdSA.js";function r(){return o.jsxs(a,{title:"Stack & Positioned",subtitle:"Empilhar widgets uns sobre os outros — perfeito para overlays, badges e fotos com legenda.",difficulty:"iniciante",timeToRead:"11 min",children:[o.jsx("h2",{children:"Por que isso importa"}),o.jsxs("p",{children:['Tudo que envolve "uma coisa em cima da outra" — badge no ícone do carrinho, texto sobre uma imagem, botão flutuante no canto, loading sobreposto — é trabalho de ',o.jsx("code",{children:"Stack"}),". Sem ele, você acaba inventando hacks com transformações, e o resultado nunca fica responsivo."]}),o.jsx("h2",{children:"O conceito"}),o.jsxs("p",{children:[o.jsx("code",{children:"Stack"})," empilha filhos em camadas, na ordem da lista (o último fica por cima). Os filhos podem ser:"]}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Não posicionados"})," — alinhados pelo ",o.jsx("code",{children:"alignment"})," da Stack (default: ",o.jsx("code",{children:"topStart"}),")."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Posicionados"})," — envolvidos em ",o.jsx("code",{children:"Positioned"})," com ",o.jsx("code",{children:"top/left/right/bottom/width/height"}),"."]})]}),o.jsxs("p",{children:["O tamanho da Stack vem dos filhos não posicionados. Se todos forem posicionados, ela colapsa para zero — a menos que você force com ",o.jsx("code",{children:"fit: StackFit.expand"})," ou um pai que dê tamanho."]}),o.jsxs(e,{type:"info",title:"Analogia",children:["Imagine transparências numa retroprojetor: cada folha é um filho. ",o.jsx("code",{children:"Stack"})," é o vidro que segura, ",o.jsx("code",{children:"Positioned"}),' é o "cole essa folha 16 pixels do topo".']}),o.jsx("h2",{children:"Como Flutter faz"}),o.jsx(i,{title:"Imagem com botão de favoritar",code:`Stack(
  alignment: Alignment.center, // alinhamento dos não-Positioned
  children: [
    // Camada 0 (fundo)
    Image.network(
      'https://example.com/foto.jpg',
      height: 200,
      width: double.infinity,
      fit: BoxFit.cover,
    ),

    // Camada 1 (em cima da imagem, no canto)
    const Positioned(
      bottom: 12,
      right: 12,
      child: CircleAvatar(
        backgroundColor: Colors.white,
        child: Icon(Icons.favorite, color: Colors.red),
      ),
    ),
  ],
)`}),o.jsx("h2",{children:"Exemplo prático: badge no ícone"}),o.jsx(i,{title:"Ícone de carrinho com contador",code:`class IconeCarrinho extends StatelessWidget {
  final int quantidade;
  const IconeCarrinho({super.key, required this.quantidade});

  @override
  Widget build(BuildContext context) {
    return Stack(
      // clipBehavior: por padrão Stack recorta. Permita o badge
      // estourar um pouco se necessário.
      clipBehavior: Clip.none,
      children: [
        const Icon(Icons.shopping_cart, size: 32),
        if (quantidade > 0)
          Positioned(
            top: -4,
            right: -6,
            child: Container(
              padding: const EdgeInsets.symmetric(
                  horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: Colors.red,
                borderRadius: BorderRadius.circular(10),
              ),
              constraints: const BoxConstraints(
                minWidth: 18,
                minHeight: 18,
              ),
              child: Text(
                quantidade > 99 ? '99+' : '$quantidade',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
      ],
    );
  }
}`}),o.jsx("h2",{children:"StackFit e fit"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("code",{children:"StackFit.loose"})," (padrão) — filhos não posicionados ficam do tamanho que quiserem."]}),o.jsxs("li",{children:[o.jsx("code",{children:"StackFit.expand"})," — força os filhos não posicionados a ocuparem todo o espaço da Stack."]}),o.jsxs("li",{children:[o.jsx("code",{children:"StackFit.passthrough"})," — repassa as restrições do pai sem mudar."]})]}),o.jsxs("p",{children:["Use ",o.jsx("code",{children:"StackFit.expand"})," quando quer que uma imagem de fundo cubra toda a Stack sem precisar de Positioned."]}),o.jsx("h2",{children:"Pegadinhas comuns"}),o.jsxs("ul",{children:[o.jsxs("li",{children:["Stack com todos os filhos ",o.jsx("code",{children:"Positioned"})," e sem pai com tamanho — colapsa para zero. Coloque dentro de ",o.jsx("code",{children:"SizedBox"})," ou use ",o.jsx("code",{children:"StackFit.expand"}),"."]}),o.jsxs("li",{children:["Esperar que ",o.jsx("code",{children:"Positioned"})," funcione fora de uma Stack. Erro de runtime — Positioned só vive dentro de Stack."]}),o.jsxs("li",{children:["Conteúdo cortado pelo ",o.jsx("code",{children:"clipBehavior"})," padrão. Para badges que estouram, use ",o.jsx("code",{children:"Clip.none"}),"."]}),o.jsxs("li",{children:["Usar Stack para layouts complexos responsivos. Funciona em uma tela, quebra em outra. Prefira ",o.jsx("code",{children:"LayoutBuilder"})," + Row/Column."]}),o.jsx("li",{children:"Esquecer que o último filho fica por cima. Order matters."})]}),o.jsx(e,{type:"warning",title:"Stack ≠ posição absoluta da web",children:'Em CSS, position: absolute é relativa ao ancestral posicionado. Em Flutter, Positioned é sempre relativo à Stack pai mais próxima. Não tem "z-index" — a ordem na lista é o z-index.'}),o.jsx("h2",{children:"Boas práticas"}),o.jsxs(e,{type:"tip",children:["Use Stack para ",o.jsx("strong",{children:"sobreposições pequenas"})," (badge, fab, loading). Para layouts coordenados, combine Row/Column/Wrap. Stack não é seu Bootstrap."]}),o.jsxs("ul",{children:[o.jsxs("li",{children:["Para responsividade, prefira valores em porcentagem com ",o.jsx("code",{children:"FractionallySizedBox"})," dentro da Stack."]}),o.jsxs("li",{children:["Animações sobre conteúdo: ",o.jsx("code",{children:"AnimatedPositioned"})," dá transição suave de ",o.jsx("code",{children:"top/left"}),"."]}),o.jsxs("li",{children:['Quando todos os filhos têm o mesmo "tamanho do pai", olhe ',o.jsx("code",{children:"IndexedStack"})," — mostra só um filho mas mantém os outros vivos (útil para tabs com estado preservado)."]})]}),o.jsx("h2",{children:"Próximos passos"}),o.jsxs("p",{children:["Para dividir espaço proporcionalmente em Row/Column, veja ",o.jsx("strong",{children:"Expanded & Flex"}),". Para listas roláveis grandes, ",o.jsx("strong",{children:"ListView"}),"."]}),o.jsx(e,{type:"success",title:"Você desbloqueou",children:"Overlays, badges e cards com imagem + texto sobreposto agora são triviais."})]})}export{r as default};
