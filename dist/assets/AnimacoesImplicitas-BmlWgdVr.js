import{j as e}from"./index-D4AOhXGO.js";import{P as i,A as a,C as o}from"./AlertBox-Dyf2wdSA.js";function s(){return e.jsxs(i,{title:"Animações Implícitas",subtitle:"AnimatedContainer, AnimatedOpacity e amigos — anime mudanças sem AnimationController.",difficulty:"intermediario",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['Interfaces que mudam sem transição parecem brutas — o usuário sente que algo "pulou". Animações curtas (200–400 ms) sinalizam ',e.jsx("em",{children:"causa e efeito"})," e deixam o app com sensação de polimento profissional. O problema é que escrever animação manual no Flutter exige ",e.jsx("code",{children:"AnimationController"}),", ",e.jsx("code",{children:"vsync"}),", ",e.jsx("code",{children:"dispose"}),", ",e.jsx("code",{children:"Tween"}),"... muita cerimônia para algo simples."]}),e.jsxs("p",{children:["As ",e.jsx("strong",{children:"animações implícitas"})," resolvem 80% dos casos com ",e.jsx("em",{children:"uma única linha"}),": você troca ",e.jsx("code",{children:"Container"})," por ",e.jsx("code",{children:"AnimatedContainer"}),", define a duração, e o Flutter cuida do resto."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Pense no widget animado como uma ",e.jsx("strong",{children:"caixa que observa as próprias propriedades"}),". Toda vez que o ",e.jsx("code",{children:"build"})," é chamado de novo com valores diferentes (cor, largura, padding), ele ",e.jsx("em",{children:"interpola"})," sozinho do valor antigo para o novo, durante o tempo que você definiu."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Você muda a propriedade dentro de um ",e.jsx("code",{children:"setState"}),"."]}),e.jsx("li",{children:"O widget detecta a diferença e dispara a animação interna."}),e.jsx("li",{children:"Quando a animação termina, o widget fica parado no valor final."})]}),e.jsxs(a,{type:"info",title:"A família Animated*",children:["Existem dezenas: ",e.jsx("code",{children:"AnimatedContainer"}),", ",e.jsx("code",{children:"AnimatedOpacity"}),", ",e.jsx("code",{children:"AnimatedPadding"}),", ",e.jsx("code",{children:"AnimatedAlign"}),", ",e.jsx("code",{children:"AnimatedPositioned"}),", ",e.jsx("code",{children:"AnimatedDefaultTextStyle"}),", ",e.jsx("code",{children:"AnimatedCrossFade"}),", ",e.jsx("code",{children:"AnimatedSwitcher"}),", ",e.jsx("code",{children:"AnimatedRotation"}),", ",e.jsx("code",{children:"AnimatedScale"}),". Sempre que precisar animar algo, procure por ",e.jsx("code",{children:"Animated"})," + nome do widget — provavelmente já existe."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsxs("p",{children:["Sintaxe básica: troque o widget normal pelo equivalente ",e.jsx("code",{children:"Animated*"})," e adicione ",e.jsx("code",{children:"duration"})," (obrigatório) e ",e.jsx("code",{children:"curve"})," (opcional)."]}),e.jsx(o,{title:"caixa que cresce ao toque",code:`class CaixaMagica extends StatefulWidget {
  const CaixaMagica({super.key});
  @override
  State<CaixaMagica> createState() => _CaixaMagicaState();
}

class _CaixaMagicaState extends State<CaixaMagica> {
  bool aberta = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => aberta = !aberta),
      child: AnimatedContainer(
        // duração obrigatória — define quanto tempo a interpolação leva
        duration: const Duration(milliseconds: 400),
        // curve controla o "ritmo" da animação (acelera, desacelera, etc.)
        curve: Curves.easeInOut,
        width: aberta ? 240 : 100,
        height: aberta ? 240 : 100,
        decoration: BoxDecoration(
          color: aberta ? Colors.indigo : Colors.redAccent,
          borderRadius: BorderRadius.circular(aberta ? 32 : 8),
        ),
        child: const Icon(Icons.star, color: Colors.white),
      ),
    );
  }
}`}),e.jsxs("p",{children:["Toque na caixa: largura, altura, cor e raio das bordas mudam ",e.jsx("strong",{children:"todos juntos"}),", suavemente. Sem controller, sem dispose."]}),e.jsx("h2",{children:"Exemplo prático: card que destaca ao selecionar"}),e.jsx("p",{children:'Cenário comum: lista de itens, ao tocar um ele "ganha vida" — escala um pouco, sombra cresce, opacidade do título sobe.'}),e.jsx(o,{title:"cartão selecionável",code:`class CartaoSelecionavel extends StatefulWidget {
  final String titulo;
  const CartaoSelecionavel({super.key, required this.titulo});
  @override
  State<CartaoSelecionavel> createState() => _CartaoSelecionavelState();
}

class _CartaoSelecionavelState extends State<CartaoSelecionavel> {
  bool selecionado = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => selecionado = !selecionado),
      child: AnimatedScale(
        duration: const Duration(milliseconds: 200),
        scale: selecionado ? 1.05 : 1.0,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(selecionado ? 0.25 : 0.08),
                blurRadius: selecionado ? 20 : 6,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: AnimatedDefaultTextStyle(
            duration: const Duration(milliseconds: 250),
            style: TextStyle(
              fontSize: selecionado ? 20 : 16,
              fontWeight:
                  selecionado ? FontWeight.bold : FontWeight.normal,
              color: selecionado ? Colors.indigo : Colors.black87,
            ),
            child: Text(widget.titulo),
          ),
        ),
      ),
    );
  }
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer o ",e.jsx("code",{children:"duration"})]}),": o widget exige — sem ele, erro de compilação."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Animar a árvore inteira em vez da propriedade"}),": trocar o ",e.jsx("em",{children:"tipo"})," do filho (ex: ",e.jsx("code",{children:"Container"})," por ",e.jsx("code",{children:"SizedBox"}),") não anima — só mudanças de ",e.jsx("em",{children:"propriedades numéricas/cores"})," do mesmo widget animam."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Cor ",e.jsx("code",{children:"null"})," para cor concreta"]}),": se o valor inicial é ",e.jsx("code",{children:"null"}),", não há de onde interpolar — comece com a cor real."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Trocar entre dois widgets diferentes"}),": para isso use ",e.jsx("code",{children:"AnimatedSwitcher"}),", que faz fade entre filhos com chaves distintas."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Curva errada para o caso"}),": ",e.jsx("code",{children:"Curves.linear"})," parece robótico; ",e.jsx("code",{children:"easeInOut"})," e ",e.jsx("code",{children:"easeOut"})," dão sensação natural na maioria dos casos."]})]}),e.jsxs(a,{type:"warning",title:"Cuidado com listas grandes",children:["Cada ",e.jsx("code",{children:"AnimatedContainer"})," mantém estado interno. Em listas com centenas de itens animando ao mesmo tempo, isso pesa. Anime só o item ativo."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(a,{type:"tip",title:"Comece sempre pelo Animated*",children:["Antes de pensar em ",e.jsx("code",{children:"AnimationController"}),', pergunte: "tem um ',e.jsx("code",{children:"Animated*"}),' que faz isso?". Se sim, use — menos código, menos bugs, performance equivalente.']}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Mantenha durações entre ",e.jsx("strong",{children:"150 ms (micro)"})," e ",e.jsx("strong",{children:"400 ms (transições maiores)"}),". Mais que isso parece lento."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"curves.dart"})," com cuidado: ",e.jsx("code",{children:"easeOut"})," para entrar, ",e.jsx("code",{children:"easeIn"})," para sair, ",e.jsx("code",{children:"easeInOut"})," para movimentos contínuos."]}),e.jsxs("li",{children:["Combine vários ",e.jsx("code",{children:"Animated*"})," aninhados — eles rodam em paralelo sem conflito."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Quando precisar de ",e.jsx("strong",{children:"controle do tempo"})," (pausar, repetir, sincronizar várias animações, tocar de trás pra frente), você sobe um nível: ",e.jsx("code",{children:"AnimationController"})," e animações explícitas."]}),e.jsxs(a,{type:"success",title:"Continue para Animações Explícitas",children:["Lá você aprende ",e.jsx("code",{children:"AnimationController"}),", ",e.jsx("code",{children:"Tween"}),", ",e.jsx("code",{children:"AnimatedBuilder"})," e ",e.jsx("code",{children:"SingleTickerProviderStateMixin"})," — o ferramental para qualquer animação imaginável."]})]})}export{s as default};
