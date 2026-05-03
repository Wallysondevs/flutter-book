import{j as e}from"./index-D4AOhXGO.js";import{P as d,A as o,C as i}from"./AlertBox-Dyf2wdSA.js";function r(){return e.jsxs(d,{title:"Expanded & Flex",subtitle:"Como dividir o espaço disponível em Row e Column — proporcional e sem overflow.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['Quase toda Row ou Column tem um filho que precisa "ocupar o resto" do espaço — um ',e.jsx("code",{children:"TextField"})," ao lado de um botão, uma área de conteúdo entre cabeçalho e rodapé, duas colunas com proporção 1:2. Sem ",e.jsx("code",{children:"Expanded"}),"/",e.jsx("code",{children:"Flexible"}),", ou dá overflow ou sobra espaço esquisito."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Row e Column distribuem o espaço em ",e.jsx("strong",{children:"duas fases"}),":"]}),e.jsxs("ol",{children:[e.jsxs("li",{children:["Primeiro, perguntam aos filhos ",e.jsx("em",{children:"não-flex"}),' ("inflexíveis") qual o tamanho deles.']}),e.jsxs("li",{children:["O espaço que sobra é dividido entre os filhos ",e.jsx("strong",{children:"Expanded"}),"/",e.jsx("strong",{children:"Flexible"}),", na proporção do ",e.jsx("code",{children:"flex"})," de cada um."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Expanded"}),' = "ocupe TODO o espaço do flex que te coube".',e.jsx("br",{}),e.jsx("strong",{children:"Flexible"}),' = "você PODE ir até o espaço do flex, mas não precisa".']}),e.jsxs(o,{type:"info",title:"Em uma frase",children:[e.jsx("code",{children:"Expanded(child: x)"})," é igual a ",e.jsx("code",{children:"Flexible(fit: FlexFit.tight, child: x)"}),"."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(i,{title:"Caso clássico: TextField que ocupa o resto",code:`Row(
  children: [
    const Icon(Icons.search),
    const SizedBox(width: 8),

    // Sem Expanded daria overflow — TextField pede largura infinita
    Expanded(
      child: TextField(
        decoration: InputDecoration(hintText: 'Buscar...'),
      ),
    ),

    const SizedBox(width: 8),
    IconButton(icon: const Icon(Icons.send), onPressed: () {}),
  ],
)`}),e.jsx("h2",{children:"Proporções com flex factor"}),e.jsx(i,{title:"2/5 + 3/5",code:`Row(
  children: [
    Expanded(
      flex: 2, // 2 partes
      child: Container(color: Colors.red, height: 100),
    ),
    Expanded(
      flex: 3, // 3 partes
      child: Container(color: Colors.blue, height: 100),
    ),
  ],
)
// Soma: 2 + 3 = 5. Vermelho fica com 40%, azul com 60%.`}),e.jsx("h2",{children:"Exemplo prático: layout de tela com header/conteúdo/footer"}),e.jsx(i,{title:"Estrutura vertical comum",code:`class Tela extends StatelessWidget {
  const Tela({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Header com altura fixa
          Container(
            height: 80,
            color: Colors.indigo,
            child: const Center(
              child: Text('Cabeçalho',
                  style: TextStyle(color: Colors.white)),
            ),
          ),

          // Conteúdo ocupa o resto
          Expanded(
            child: ListView.builder(
              itemCount: 50,
              itemBuilder: (_, i) => ListTile(title: Text('Item $i')),
            ),
          ),

          // Footer também fixo
          Container(
            height: 56,
            color: Colors.grey.shade200,
            child: const Center(child: Text('Rodapé')),
          ),
        ],
      ),
    );
  }
}`}),e.jsx("h2",{children:"Flexible vs Expanded — quando usar qual"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Expanded"})," — força o filho a ocupar tudo. Ideal para áreas que devem preencher: TextField, ListView, Container colorido."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Flexible"})," com ",e.jsx("code",{children:"FlexFit.loose"})," (padrão) — filho pode ser menor. Bom para texto que talvez caiba sem precisar do espaço todo."]})]}),e.jsx(i,{title:"Texto que encolhe se precisar",code:`Row(
  children: [
    Flexible(
      // Se o texto for curto, ocupa só o necessário.
      // Se for longo, vai até o limite e quebra/elipsa.
      child: Text(
        nomeMuitoLongoTalvez,
        overflow: TextOverflow.ellipsis,
      ),
    ),
    const Icon(Icons.verified, color: Colors.blue),
  ],
)`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Usar ",e.jsx("code",{children:"Expanded"})," dentro de ",e.jsx("code",{children:"SingleChildScrollView"}),", ",e.jsx("code",{children:"ListView"})," não-finita ou ",e.jsx("code",{children:"Column"})," dentro de ",e.jsx("code",{children:"Stack"})," sem tamanho. Erro: Expanded precisa de eixo principal com restrição finita."]}),e.jsxs("li",{children:["Esperar que ",e.jsx("code",{children:"Expanded"})," funcione em qualquer pai. Só dentro de ",e.jsx("code",{children:"Row"}),", ",e.jsx("code",{children:"Column"})," ou ",e.jsx("code",{children:"Flex"}),"."]}),e.jsxs("li",{children:["Misturar ",e.jsx("code",{children:"Expanded"})," e ",e.jsx("code",{children:"SizedBox"})," com largura fixa esperando que ambos ocupem — o SizedBox vence (é inflexível)."]}),e.jsxs("li",{children:["Dois Expanded com flex iguais e textos diferentes — tudo bem, eles dividem 50/50, mas o conteúdo pode ficar cortado se não tiver ",e.jsx("code",{children:"overflow"}),"."]}),e.jsxs("li",{children:["Usar ",e.jsx("code",{children:"Spacer()"})," e esquecer que ele é só um Expanded com filho vazio. Equivalente a ",e.jsx("code",{children:"Expanded(child: SizedBox.shrink())"}),"."]})]}),e.jsxs(o,{type:"warning",title:"Erro: 'unbounded'",children:['Mensagem do tipo "RenderFlex children have non-zero flex but incoming height constraints are unbounded" significa: você usou ',e.jsx("code",{children:"Expanded"}),"/",e.jsx("code",{children:"Flexible"})," num Column dentro de algo sem altura definida (SingleChildScrollView, ListView). Solução: dê altura ao pai ou troque o Expanded por ",e.jsx("code",{children:"SizedBox"}),"/",e.jsx("code",{children:"shrinkWrap"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(o,{type:"tip",children:["Para criar gaps proporcionais entre filhos, use ",e.jsx("code",{children:"Spacer()"})," em vez de ",e.jsx("code",{children:"SizedBox"})," com tamanhos calculados. Ele se adapta ao espaço disponível."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Combine ",e.jsx("code",{children:"Expanded"})," com ",e.jsx("code",{children:"overflow: TextOverflow.ellipsis"})," em textos longos."]}),e.jsxs("li",{children:["Para layouts de duas colunas em tablet, use ",e.jsx("code",{children:"Expanded"})," com flex baseado em ",e.jsx("code",{children:"MediaQuery"}),"."]}),e.jsxs("li",{children:["Em Column rolável, NÃO use Expanded — embrulhe numa ",e.jsx("code",{children:"SizedBox"})," com altura definida ou use ",e.jsx("code",{children:"CustomScrollView"}),"."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Você sabe distribuir espaço estaticamente. A seguir: ",e.jsx("strong",{children:"ListView"})," para listas roláveis grandes e ",e.jsx("strong",{children:"Slivers"})," para layouts roláveis customizados."]}),e.jsx(o,{type:"success",title:"Pronto",children:'Expanded é o "flex: 1" do CSS, mas com superpoderes graças ao layout em duas fases do Flutter.'})]})}export{r as default};
