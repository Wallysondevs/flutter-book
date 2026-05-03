import{j as e}from"./index-D9yRYXwO.js";import{P as r,C as i,A as a}from"./AlertBox-B2Rl5ETq.js";function n(){return e.jsxs(r,{title:"RepaintBoundary",subtitle:"Isole áreas pesadas de repintura para ganhar FPS sem reescrever a UI.",difficulty:"avancado",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quando uma animação roda na sua tela — um spinner, um vídeo, um gráfico animado — o Flutter pode ",e.jsx("em",{children:"repintar a tela inteira"})," 60 vezes por segundo, mesmo se 90% dela está parada. Em apps complexos, isso vira gargalo de GPU. ",e.jsx("code",{children:"RepaintBoundary"}),' diz ao motor: "trate esta sub-árvore como uma camada separada; só repinte aqui, não desperdice ciclos no resto".']}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Internamente o Flutter constrói uma árvore de ",e.jsx("strong",{children:"render objects"})," que é traduzida em camadas (",e.jsx("code",{children:"Layer"}),") entregues à GPU. Por padrão, widgets vizinhos compartilham a mesma camada de pintura. Quando um deles precisa ser repintado, todos eles são repintados juntos."]}),e.jsxs("p",{children:[e.jsx("code",{children:"RepaintBoundary"})," introduz um ",e.jsx("strong",{children:"limite"}),": tudo dentro dele vira uma camada própria e isolada. Mudanças dentro só repintam essa camada; mudanças fora não tocam essa camada."]}),e.jsx("p",{children:"Imagine uma vidraça: você pode pintar nela sem manchar a parede ao redor."}),e.jsx("h2",{children:"Como o Flutter faz"}),e.jsx("p",{children:"Sintaxe é trivial — basta envolver o widget alvo. O custo é uma camada extra (mais memória de GPU). Por isso não saia espalhando à toa: use onde o profiler mostrar repintura excessiva."}),e.jsx(i,{title:"uso básico",code:`RepaintBoundary(
  child: AnimacaoComplexa(),
)`}),e.jsx("h2",{children:"Exemplo prático: spinner em tela cheia"}),e.jsx("p",{children:"Cenário: tela com lista estática de 50 itens e um pequeno spinner girando no canto. Sem boundary, cada frame do spinner pode forçar a lista inteira a repintar."}),e.jsx(i,{title:"ruim — repinta a lista junto",code:`class TelaPedidos extends StatelessWidget {
  final List<Pedido> pedidos;
  const TelaPedidos({super.key, required this.pedidos});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ListView.builder(
          itemCount: pedidos.length,
          itemBuilder: (_, i) => PedidoCard(pedidos[i]),
        ),
        // Spinner gira 60fps; sem boundary, marca a Stack inteira como suja
        const Positioned(
          right: 16, bottom: 16,
          child: CircularProgressIndicator(),
        ),
      ],
    );
  }
}`}),e.jsx(i,{title:"bom — spinner em camada própria",code:`class TelaPedidos extends StatelessWidget {
  final List<Pedido> pedidos;
  const TelaPedidos({super.key, required this.pedidos});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ListView.builder(
          itemCount: pedidos.length,
          itemBuilder: (_, i) => PedidoCard(pedidos[i]),
        ),
        const Positioned(
          right: 16, bottom: 16,
          child: RepaintBoundary(
            child: CircularProgressIndicator(),
          ),
        ),
      ],
    );
  }
}`}),e.jsx("p",{children:"Resultado: o spinner repinta sozinho, a lista nem é tocada por causa dele. Em DevTools (Highlight Repaints), a área da lista para de piscar."}),e.jsx("h2",{children:"Quando o Flutter já cria boundaries automaticamente"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"ListView"})," e similares — cada item rolável já tem boundary implícito."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Hero animations"})," — o conteúdo voador é isolado."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SnackBar, Dialog, BottomSheet"})," — overlays criam suas próprias camadas."]})]}),e.jsxs("p",{children:["Por isso ",e.jsx("strong",{children:"não saia adicionando RepaintBoundary em tudo"}),": em listas e overlays já é redundante."]}),e.jsx("h2",{children:"Como verificar com DevTools"}),e.jsxs("p",{children:["No Inspector, ative ",e.jsx("strong",{children:"Highlight Repaints"}),". Áreas que repintam ganham bordas coloridas que mudam a cada frame. Se uma região grande pisca constantemente sem motivo, ali há candidato a",e.jsx("code",{children:"RepaintBoundary"}),"."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Achar que é grátis"})," — cada boundary é uma textura na GPU. Em apps modestos isso somando é ruim."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Envolver tudo"})," — RepaintBoundary numa folha estática (texto fixo) não ajuda em nada."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer de testar com Highlight Repaints"})," — sem profiler, é palpite."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Confundir com setState scope"})," — RepaintBoundary não evita rebuild de widgets, só repintura. Para evitar rebuild, use ",e.jsx("code",{children:"const"}),", separe widgets ou use ",e.jsx("code",{children:"ValueListenableBuilder"}),"."]})]}),e.jsxs(a,{type:"warning",title:"Otimização localizada",children:["RepaintBoundary só vale a pena se algo dentro dele anima ou muda com frequência ",e.jsx("strong",{children:"e"})," o entorno é grande/custoso. Caso contrário, o custo da camada extra supera o ganho."]}),e.jsxs(a,{type:"info",title:"Para tirar uma imagem do widget",children:["RepaintBoundary tem outro uso útil: combinado com ",e.jsx("code",{children:"GlobalKey"}),", permite capturar a área como imagem (",e.jsx("code",{children:"boundary.toImage()"}),"). Útil para gerar prévias, compartilhamento, screenshots."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(a,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Profile primeiro com ",e.jsx("strong",{children:"Highlight Repaints"})," — não otimize no escuro."]}),e.jsxs("li",{children:["Combine com ",e.jsx("code",{children:"const"})," e widgets pequenos para reduzir ",e.jsx("em",{children:"builds"})," além de repintura."]}),e.jsxs("li",{children:["Em jogos/animações intensas, considere ",e.jsx("code",{children:"CustomPainter"})," dentro de RepaintBoundary."]}),e.jsx("li",{children:'Documente no código por que aquele boundary existe — evita que outro dev remova "limpando".'})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Veja ",e.jsx("em",{children:"Profiling"})," e ",e.jsx("em",{children:"Flutter DevTools"})," para identificar onde o boundary trará ganho real."]}),e.jsxs(a,{type:"success",children:["Bem usado, um único ",e.jsx("code",{children:"RepaintBoundary"})," bem colocado pode recuperar 5-10ms por frame em telas complexas."]})]})}export{n as default};
