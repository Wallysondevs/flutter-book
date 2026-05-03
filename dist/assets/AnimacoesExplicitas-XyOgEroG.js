import{j as e}from"./index-D4AOhXGO.js";import{P as r,A as i,C as a}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(r,{title:"Animações Explícitas",subtitle:"AnimationController + Tween — controle total da timeline.",difficulty:"avancado",timeToRead:"15 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Animações implícitas (",e.jsx("code",{children:"AnimatedContainer"}),", etc.) cobrem o trivial. Mas e quando você precisa ",e.jsx("strong",{children:"repetir"})," uma pulsação infinitamente, ",e.jsx("strong",{children:"sincronizar"})," três elementos que entram em sequência, ",e.jsx("strong",{children:"pausar"})," no meio, ou ",e.jsx("strong",{children:"reverter"})," a animação só quando o usuário cancelar? É hora das animações explícitas."]}),e.jsxs("p",{children:["Aqui você ganha um ",e.jsx("strong",{children:"relógio"})," (o ",e.jsx("code",{children:"AnimationController"}),") que avança um valor de 0.0 a 1.0 ao longo do tempo, e você decide o que fazer com cada quadro."]}),e.jsx("h2",{children:"O conceito"}),e.jsx("p",{children:"A animação explícita tem três peças que se conversam:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"AnimationController"}),": o relógio. Produz valores entre 0.0 e 1.0 ao longo de uma duração."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tween"}),' (de "between"): converte esses valores 0–1 em algo útil — uma cor, um ',e.jsx("code",{children:"double"}),", um ",e.jsx("code",{children:"Offset"}),". Ex: ",e.jsx("code",{children:"Tween<double>(begin: 0, end: 200)"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"AnimatedBuilder"})," (ou ",e.jsx("code",{children:"AnimatedWidget"}),"): reconstrói só a parte da árvore que precisa, a cada tick."]})]}),e.jsxs(i,{type:"info",title:"vsync = sincronização vertical",children:["O controller precisa de um ",e.jsx("code",{children:"TickerProvider"})," (chamado ",e.jsx("code",{children:"vsync"}),") para que as animações rodem na taxa de atualização da tela (60/120 fps) e ",e.jsx("strong",{children:"parem"})," quando a tela está em segundo plano. Use ",e.jsx("code",{children:"SingleTickerProviderStateMixin"})," quando há um controller, ou ",e.jsx("code",{children:"TickerProviderStateMixin"})," para vários."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(a,{title:"anatomia mínima",code:`class Pulsa extends StatefulWidget {
  const Pulsa({super.key});
  @override
  State<Pulsa> createState() => _PulsaState();
}

class _PulsaState extends State<Pulsa>
    with SingleTickerProviderStateMixin {
  // 1) cria o controller — late porque depende de \`this\` (vsync)
  late final AnimationController _ctrl = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 1),
  )..repeat(reverse: true); // toca infinito, indo e voltando

  // 2) tween mapeia 0.0..1.0 -> 0.8..1.2 (escala da pulsação)
  late final Animation<double> _escala =
      Tween<double>(begin: 0.8, end: 1.2)
          .chain(CurveTween(curve: Curves.easeInOut))
          .animate(_ctrl);

  @override
  void dispose() {
    _ctrl.dispose(); // SEMPRE liberar — senão vaza memória
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // 3) AnimatedBuilder reconstrói só este pedaço a cada quadro
    return AnimatedBuilder(
      animation: _escala,
      builder: (context, child) => Transform.scale(
        scale: _escala.value,
        child: child, // child não rebuilda — otimização
      ),
      child: const FlutterLogo(size: 100),
    );
  }
}`}),e.jsx("p",{children:"Resultado: o logo pulsa para sempre, suavemente, entre 80% e 120% do tamanho."}),e.jsx("h2",{children:"Exemplo prático: entrada em sequência (stagger)"}),e.jsxs("p",{children:["Você quer 3 cartões que ",e.jsx("strong",{children:"entram em cascata"}),": primeiro um, depois o outro, depois o terceiro. Um único controller, três ",e.jsx("code",{children:"Interval"}),"s diferentes."]}),e.jsx(a,{title:"stagger animation",code:`class CartoesEmCascata extends StatefulWidget {
  const CartoesEmCascata({super.key});
  @override
  State<CartoesEmCascata> createState() =>
      _CartoesEmCascataState();
}

class _CartoesEmCascataState extends State<CartoesEmCascata>
    with SingleTickerProviderStateMixin {
  late final _ctrl = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 900),
  )..forward(); // toca uma vez, do começo ao fim

  // cada cartão usa uma "fatia" diferente do tempo total
  Animation<double> _fade(double inicio, double fim) =>
      CurvedAnimation(
        parent: _ctrl,
        curve: Interval(inicio, fim, curve: Curves.easeOut),
      );

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  Widget _card(String texto, Animation<double> anim) {
    return FadeTransition(
      opacity: anim,
      child: SlideTransition(
        position: Tween<Offset>(
          begin: const Offset(0, 0.3),
          end: Offset.zero,
        ).animate(anim),
        child: Card(
          child: ListTile(title: Text(texto)),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _card('Primeiro',  _fade(0.0, 0.4)),
        _card('Segundo',   _fade(0.2, 0.6)),
        _card('Terceiro',  _fade(0.4, 1.0)),
      ],
    );
  }
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"dispose()"})]}),": vaza memória e o ticker continua rodando — vira culprit principal de performance."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Não passar ",e.jsx("code",{children:"vsync"})]}),": erro em runtime. Sempre ",e.jsx("code",{children:"with SingleTickerProviderStateMixin"})," no State."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Chamar ",e.jsx("code",{children:"setState"})," dentro do builder"]}),": o ",e.jsx("code",{children:"AnimatedBuilder"})," já reconstrói sozinho. ",e.jsx("code",{children:"setState"})," ali causa loop."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Não usar o parâmetro ",e.jsx("code",{children:"child"})]})," do ",e.jsx("code",{children:"AnimatedBuilder"}),": sem ele, sub-árvores complexas reconstroem 60x por segundo. Passe pelo ",e.jsx("code",{children:"child"})," tudo que ",e.jsx("em",{children:"não"})," depende da animação."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Forward sem reset"}),": se você fizer ",e.jsx("code",{children:"forward()"})," com o controller já no final (1.0), nada acontece. Use ",e.jsx("code",{children:"_ctrl.reset()"})," antes ou ",e.jsx("code",{children:"_ctrl.forward(from: 0)"}),"."]})]}),e.jsxs(i,{type:"danger",title:"Animação travando? Quase sempre é dispose esquecido.",children:["Em apps com várias telas, controllers vivos em telas que não estão na frente continuam consumindo CPU e bateria. Faça o hábito: criou controller, escreveu o ",e.jsx("code",{children:"dispose"})," imediatamente."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(i,{type:"tip",title:"Use as Transition*",children:["Em vez de ",e.jsx("code",{children:"AnimatedBuilder"})," + ",e.jsx("code",{children:"Transform"}),", prefira ",e.jsx("code",{children:"FadeTransition"}),", ",e.jsx("code",{children:"SlideTransition"}),", ",e.jsx("code",{children:"ScaleTransition"}),", ",e.jsx("code",{children:"RotationTransition"}),", ",e.jsx("code",{children:"SizeTransition"}),". Mais legível e elas já otimizam o rebuild."]}),e.jsxs("ul",{children:[e.jsx("li",{children:"Comece sempre tentando uma animação implícita; só suba para explícita se realmente precisar de controle."}),e.jsxs("li",{children:["Curvas naturais: ",e.jsx("code",{children:"Curves.easeOutCubic"})," e ",e.jsx("code",{children:"Curves.easeInOutCubic"})," dão acabamento profissional."]}),e.jsxs("li",{children:["Para transições entre rotas, veja ",e.jsx("code",{children:"PageRouteBuilder"})," ou o pacote ",e.jsx("code",{children:"animations"})," do time do Flutter."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Quando o que você quer é animar um ",e.jsx("em",{children:"elemento entre duas telas"})," — uma foto que cresce do card para o detalhe — existe um atalho mágico: ",e.jsx("code",{children:"Hero"}),"."]}),e.jsx(i,{type:"success",title:"Continue para Hero Animations",children:'Próxima página: como fazer um widget "voar" automaticamente de uma rota para outra.'})]})}export{n as default};
