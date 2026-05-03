import{j as e}from"./index-D9yRYXwO.js";import{P as o,A as r,C as s}from"./AlertBox-B2Rl5ETq.js";function d(){return e.jsxs(o,{title:"Widget Tree & Build",subtitle:"Como o Flutter transforma sua árvore declarativa em pixels — e por que build é chamado tanto.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['Quase todo bug de performance ou comportamento estranho em Flutter (estado que "some", reconstrução desnecessária, animação engasgando) vem de não entender como o framework reage ao seu ',e.jsx("code",{children:"build"}),". Cinco minutos pensando nas três árvores te poupam horas de depuração."]}),e.jsx("h2",{children:"O conceito: três árvores"}),e.jsxs("p",{children:["Quando você escreve um widget, o Flutter monta ",e.jsx("strong",{children:"três estruturas"})," em paralelo:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Widget tree"})," — descrição declarativa, leve e ",e.jsx("em",{children:"imutável"}),". É só configuração. Recriada a cada rebuild."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Element tree"})," — instâncias mutáveis que conectam widgets a render objects. Persistem enquanto o tipo do widget no mesmo lugar não mudar."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"RenderObject tree"})," — onde acontece o trabalho pesado: layout, pintura, hit-test. Caro de criar/destruir."]})]}),e.jsxs("p",{children:["Você só mexe na widget tree. O Flutter faz ",e.jsx("strong",{children:"diff"}),' entre a nova e a antiga, decide quais elements podem ser reaproveitados (mesmo tipo + mesma key) e atualiza o mínimo possível dos render objects. É essa preguiça inteligente que mantém o app rápido mesmo reconstruindo "tudo" a cada frame.']}),e.jsx(r,{type:"info",title:"Analogia",children:"A widget tree é a planta arquitetônica (papel barato, joga fora). Os elements são os pedreiros que carregam o tijolo. Os render objects são a parede de verdade. Você desenha plantas; o Flutter decide quais paredes precisam ser quebradas."}),e.jsx("h2",{children:"O ciclo de build"}),e.jsxs("p",{children:["O método ",e.jsx("code",{children:"build"})," é chamado em ",e.jsx("strong",{children:"muitas"})," situações:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Toda vez que você chama ",e.jsx("code",{children:"setState"}),"."]}),e.jsx("li",{children:"Quando o pai reconstrói e te recria."}),e.jsxs("li",{children:["Quando um ",e.jsx("code",{children:"InheritedWidget"}),' que você "ouve" muda (tema, MediaQuery, Provider...).']}),e.jsx("li",{children:"Em mudanças globais: rotação de tela, troca de teclado, mudança de brilho."})]}),e.jsxs("p",{children:["Por isso ",e.jsx("code",{children:"build"})," precisa ser ",e.jsx("strong",{children:"puro, rápido e idempotente"}),": dada a mesma entrada (campos do widget + estado), retorne a mesma árvore. Nada de I/O, nada de criar objetos pesados."]}),e.jsx("h2",{children:"Como Flutter faz: identidade dos elements"}),e.jsx(s,{title:"O que reaproveita o Element?",code:`// Antes (1ª build)
Column(children: [
  const Text('A'),
  const Padding(
    padding: EdgeInsets.all(8),
    child: Icon(Icons.star),
  ),
])

// Depois (2ª build)
Column(children: [
  const Text('B'),                // mesmo tipo Text -> Element reaproveitado
  const Padding(
    padding: EdgeInsets.all(16),  // só atualiza props
    child: Icon(Icons.star),
  ),
])

// Regra: mesma posição + mesmo runtimeType (+ mesma key se houver)
//   -> Element existente é atualizado
// Tipo diferente -> Element velho destruído, novo criado.`}),e.jsx("h2",{children:"Exemplo prático: por que isolar rebuilds"}),e.jsx("p",{children:"Imagine um contador onde a parte cara (uma imagem) não tem motivo para reconstruir junto:"}),e.jsx(s,{title:"Antes — tudo reconstrói",code:`class _TelaState extends State<Tela> {
  int n = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Image.network(banner, height: 200), // reconstrói no setState!
        Text('$n'),
        ElevatedButton(
          onPressed: () => setState(() => n++),
          child: const Text('+'),
        ),
      ],
    );
  }
}`}),e.jsx(s,{title:"Depois — const isola a imagem",code:`class _TelaState extends State<Tela> {
  int n = 0;

  // Subwidget const — Flutter pula o rebuild
  static const _Banner _banner = _Banner();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _banner,
        Text('$n'),
        ElevatedButton(
          onPressed: () => setState(() => n++),
          child: const Text('+'),
        ),
      ],
    );
  }
}

class _Banner extends StatelessWidget {
  const _Banner();
  @override
  Widget build(BuildContext context) =>
      Image.network('https://...', height: 200);
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Criar objetos pesados dentro do ",e.jsx("code",{children:"build"})," (controllers, listas grandes calculadas). Mova para ",e.jsx("code",{children:"initState"})," ou cache em campos."]}),e.jsxs("li",{children:["Chamar APIs/fetchs no ",e.jsx("code",{children:"build"}),". Build pode rodar dezenas de vezes — você vai inundar a rede."]}),e.jsx("li",{children:"Usar funções que retornam widgets em vez de subwidgets. Funções não criam novo Element, então o Flutter não consegue reaproveitar nem isolar rebuild."}),e.jsxs("li",{children:["Esquecer ",e.jsx("code",{children:"const"}),". Cada ",e.jsx("code",{children:"const Widget()"})," é uma instância única reaproveitada para sempre — o ganho é gratuito."]})]}),e.jsxs(r,{type:"warning",title:"Função vs subwidget",children:[e.jsx("code",{children:"Widget _construirHeader() => ..."})," parece organizado, mas não cria fronteira de rebuild. Sempre que possível, transforme em ",e.jsx("code",{children:"class _Header extends StatelessWidget"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(r,{type:"tip",children:["Use o ",e.jsx("strong",{children:"Flutter DevTools"})," (aba Performance > Track Widget Builds) para ver exatamente o que está reconstruindo. Costuma surpreender."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Quebre telas grandes em subwidgets pequenos com ",e.jsx("code",{children:"const"}),"."]}),e.jsxs("li",{children:["Para escutar dados mutáveis, use ",e.jsx("code",{children:"Selector"}),"/",e.jsx("code",{children:"Consumer"})," (Provider) ou ",e.jsx("code",{children:"Builder"})," para limitar o escopo do rebuild."]}),e.jsxs("li",{children:["Animações pesadas? Use ",e.jsx("code",{children:"AnimatedBuilder"})," com ",e.jsx("code",{children:"child"})," — o filho não reconstrói a cada frame."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Para entender quando o Flutter consegue reaproveitar um Element em listas dinâmicas, o próximo capítulo é ",e.jsx("strong",{children:"Keys"}),"."]}),e.jsx(r,{type:"success",title:"Mentalidade nova",children:'Pare de pensar "quem desenha". Comece a pensar "quem o framework precisa redesenhar — e como ajudo a evitar o resto".'})]})}export{d as default};
