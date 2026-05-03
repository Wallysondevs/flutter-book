import{j as e}from"./index-D4AOhXGO.js";import{P as r,C as i,A as o}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(r,{title:"Container & BoxDecoration",subtitle:"O canivete suíço para pintar caixas com bordas, sombras, gradientes e padding.",difficulty:"iniciante",timeToRead:"11 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:[e.jsx("code",{children:"Container"})," é provavelmente o widget mais usado em Flutter. Ele combina padding, margin, tamanho, alinhamento e decoração visual em um só lugar. Mas justamente por fazer tudo, é fácil usar mal — gastando memória, atrapalhando layout responsivo ou criando código difícil de ler."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:[e.jsx("code",{children:"Container"})," é um ",e.jsx("strong",{children:"widget de conveniência"}),": por trás, ele combina vários widgets menores (",e.jsx("code",{children:"Padding"}),", ",e.jsx("code",{children:"DecoratedBox"}),", ",e.jsx("code",{children:"ConstrainedBox"}),", ",e.jsx("code",{children:"Align"}),", ",e.jsx("code",{children:"Transform"}),") numa árvore. Se você só precisa de um deles, use direto — fica mais leve e mais claro."]}),e.jsx("p",{children:'Pense em Container como uma "caixa" com várias camadas: margem por fora, depois fundo decorado, depois padding por dentro, depois o filho.'}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(i,{title:"Anatomia visual",code:`Container(
  // Espaço FORA da caixa
  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

  // Restrições de tamanho
  width: 200,
  height: 80,

  // Decoração: cor, borda, raio, sombra, gradiente
  decoration: BoxDecoration(
    color: Colors.white, // OU use 'color' direto, não os dois
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.grey.shade300),
    boxShadow: const [
      BoxShadow(
        blurRadius: 8,
        offset: Offset(0, 2),
        color: Colors.black12,
      ),
    ],
  ),

  // Espaço DENTRO da caixa, antes do filho
  padding: const EdgeInsets.all(16),

  // Alinhamento do filho dentro do espaço disponível
  alignment: Alignment.center,

  child: const Text('Olá'),
)`}),e.jsxs(o,{type:"warning",title:"color vs decoration.color",children:["Se você passa ",e.jsx("code",{children:"color"})," e ",e.jsx("code",{children:"decoration"})," ao mesmo tempo, o Flutter joga uma exceção. Coloque a cor ",e.jsx("strong",{children:"dentro"})," do ",e.jsx("code",{children:"BoxDecoration"}),"."]}),e.jsx("h2",{children:"Exemplo prático: card com gradiente"}),e.jsx(i,{title:"Card de estatística",code:`class CardSaldo extends StatelessWidget {
  final double saldo;
  const CardSaldo({super.key, required this.saldo});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF6366F1), Color(0xFF8B5CF6)],
        ),
        boxShadow: [
          BoxShadow(
            blurRadius: 16,
            offset: const Offset(0, 8),
            color: Colors.indigo.withOpacity(0.3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Saldo disponível',
              style: TextStyle(color: Colors.white70)),
          const SizedBox(height: 8),
          Text(
            'R\\$ \${saldo.toStringAsFixed(2)}',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}`}),e.jsx("h2",{children:"Tamanho: como ele decide?"}),e.jsxs("p",{children:["Container sem ",e.jsx("code",{children:"width"}),"/",e.jsx("code",{children:"height"}),":"]}),e.jsxs("ul",{children:[e.jsx("li",{children:"Se tem filho — assume o tamanho do filho."}),e.jsx("li",{children:"Se não tem filho — tenta ocupar tudo que o pai oferece."}),e.jsxs("li",{children:["Com ",e.jsx("code",{children:"alignment"})," definido — também tenta ser o maior possível."]})]}),e.jsxs("p",{children:["Use ",e.jsx("code",{children:"constraints: BoxConstraints(maxWidth: 400)"})," para limites flexíveis em vez de ",e.jsx("code",{children:"width"})," fixo."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Usar Container só para padding. Use ",e.jsx("code",{children:"Padding"})," direto — mais legível, mais leve."]}),e.jsxs("li",{children:["Usar Container só para espaçar widgets. Use ",e.jsx("code",{children:"SizedBox(height: 16)"})," — propósito explícito."]}),e.jsxs("li",{children:["Encadear vários Containers aninhados. Combine no ",e.jsx("code",{children:"BoxDecoration"}),"."]}),e.jsxs("li",{children:["Achar que ",e.jsx("code",{children:"borderRadius"})," recorta o filho. Não recorta — para clipar uma ",e.jsx("code",{children:"Image"}),", use ",e.jsx("code",{children:"ClipRRect"})," ou ",e.jsx("code",{children:"Material(clipBehavior: Clip.antiAlias)"}),"."]}),e.jsxs("li",{children:["Esquecer ",e.jsx("code",{children:"const"})," em ",e.jsx("code",{children:"EdgeInsets"}),", ",e.jsx("code",{children:"BoxShadow"}),", ",e.jsx("code",{children:"Color"}),". Cada uma é uma alocação."]})]}),e.jsxs(o,{type:"info",title:"Quando NÃO usar Container",children:["Só padding? ",e.jsx("code",{children:"Padding"}),". Só espaçamento? ",e.jsx("code",{children:"SizedBox"}),". Só centralizar? ",e.jsx("code",{children:"Center"}),". Só cor? ",e.jsx("code",{children:"ColoredBox"}),". Container compensa quando você combina ",e.jsx("strong",{children:"3+ propriedades"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(o,{type:"tip",children:["Centralize a aparência em ",e.jsx("code",{children:"ThemeData"})," e use ",e.jsx("code",{children:"CardTheme"}),", ",e.jsx("code",{children:"BoxDecoration"})," reutilizáveis. Container espalhado pelo app vira pesadelo de manutenção."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Prefira ",e.jsx("code",{children:"const EdgeInsets.all(16)"})," a recriar o objeto."]}),e.jsxs("li",{children:["Para imagens com cantos, use ",e.jsx("code",{children:"ClipRRect"})," em vez de Container com border."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"DecoratedBox"})," direto quando só precisa da decoração — é o widget que Container usa por baixo."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com Container você pinta caixas. A seguir, vamos organizar várias delas com ",e.jsx("strong",{children:"Row e Column"}),"."]}),e.jsx(o,{type:"success",title:"Pronto",children:"Container é canivete suíço — útil, mas a ferramenta certa para o trabalho costuma ser melhor."})]})}export{n as default};
