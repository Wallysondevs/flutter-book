import{j as e}from"./index-D4AOhXGO.js";import{P as o,C as i,A as a}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(o,{title:"Mixins",subtitle:"Reutilização horizontal de comportamento sem cair na herança múltipla.",difficulty:"intermediario",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Você vai esbarrar com mixins muito cedo no Flutter: animações exigem"," ",e.jsx("code",{children:"SingleTickerProviderStateMixin"}),"; abas que devem manter estado usam ",e.jsx("code",{children:"AutomaticKeepAliveClientMixin"}),"; o framework de testes injeta ",e.jsx("code",{children:"WidgetsBindingObserver"}),". Entender mixins evita decorar receitas — você passa a saber ",e.jsx("em",{children:"por que"})," cada uma funciona."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Dart só permite herdar de uma classe (single inheritance). Mas e se você precisa adicionar capacidades vindas de várias fontes? ",e.jsx("strong",{children:"Mixin"})," ",'é a resposta: um pedaço de código (campos + métodos) que você "encaixa" em outra classe com a palavra ',e.jsx("code",{children:"with"}),". É como adicionar acessórios a um carro: airbag, ar-condicionado, GPS — cada um vem de fora, mas vira parte do todo."]}),e.jsx("h2",{children:"Como o Dart faz"}),e.jsx(i,{title:"Definindo e usando mixins",code:`// Um mixin é declarado com a palavra-chave 'mixin'
mixin Voador {
  void voar() => print('Voando!');
}

mixin Nadador {
  void nadar() => print('Nadando!');
}

class Animal {
  final String nome;
  Animal(this.nome);
}

// 'with' encaixa os mixins; pode listar vários
class Pato extends Animal with Voador, Nadador {
  Pato(super.nome);
}

void main() {
  final p = Pato('Donald');
  p.voar();    // Voando!
  p.nadar();   // Nadando!
  print(p.nome); // Donald
}`}),e.jsx(a,{type:"info",title:"Mixin vs interface vs herança",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"extends"}),": herda de uma classe — é-um."]}),e.jsxs("li",{children:[e.jsx("code",{children:"implements"}),": copia só a assinatura — você reimplementa tudo."]}),e.jsxs("li",{children:[e.jsx("code",{children:"with"}),": ",e.jsx("strong",{children:"recebe a implementação pronta"})," de um mixin, sem virar filho dele."]})]})}),e.jsx("h2",{children:"Mixin com restrição (on): pré-requisitos"}),e.jsxs("p",{children:["Às vezes o mixin precisa de algo da classe que vai usá-lo (um campo, um método). A cláusula ",e.jsx("code",{children:"on"}),' diz: "só posso ser misturado em quem é ou herda de tal classe". Assim o mixin pode acessar ',e.jsx("code",{children:"nome"})," de",e.jsx("code",{children:"Animal"})," com segurança:"]}),e.jsx(i,{title:"Mixin com 'on'",code:`mixin LogarAcoes on Animal {
  // Pode usar 'nome' porque sabemos que vem de Animal
  void logar(String acao) {
    print('[\${DateTime.now()}] $nome -> $acao');
  }
}

class Cachorro extends Animal with LogarAcoes {
  Cachorro(super.nome);

  void latir() {
    logar('latiu');     // método veio do mixin
  }
}

// Não compila: SemBicho não estende Animal
// class SemBicho with LogarAcoes {}`}),e.jsx("h2",{children:"Exemplo prático: mixin de validação reutilizável"}),e.jsx("p",{children:"Imagine vários models que precisam validar campos antes de salvar. Em vez de copiar o método em cada um, extraia para um mixin:"}),e.jsx(i,{title:"Mixin Validavel reaproveitado",code:`mixin Validavel {
  // Lista de erros encontrados na última validação
  final List<String> erros = [];

  // Cada classe implementa esta regra
  void validar();

  bool get ehValido {
    erros.clear();
    validar();
    return erros.isEmpty;
  }
}

class Usuario with Validavel {
  final String email;
  final int idade;
  Usuario({required this.email, required this.idade});

  @override
  void validar() {
    if (!email.contains('@')) erros.add('E-mail inválido');
    if (idade < 18) erros.add('Precisa ter 18+');
  }
}

void main() {
  final u = Usuario(email: 'fulano', idade: 16);
  if (!u.ehValido) {
    print(u.erros); // [E-mail inválido, Precisa ter 18+]
  }
}`}),e.jsx("h2",{children:"Onde aparece em Flutter"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"SingleTickerProviderStateMixin"})," — fornece um"," ",e.jsx("code",{children:"vsync"})," para ",e.jsx("code",{children:"AnimationController"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"AutomaticKeepAliveClientMixin"})," — preserva estado de uma aba em ",e.jsx("code",{children:"TabBarView"})," ou ",e.jsx("code",{children:"PageView"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"WidgetsBindingObserver"})," — escuta eventos do ciclo de vida do app (background/foreground)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"ChangeNotifier"})," — usado com ",e.jsx("code",{children:"with"})," para criar estados observáveis no Provider/Riverpod."]})]}),e.jsx(i,{title:"Mixin clássico em animação",code:`class _MinhaTelaState extends State<MinhaTela>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;

  @override
  void initState() {
    super.initState();
    // 'this' é aceito como TickerProvider graças ao mixin
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    );
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["A ",e.jsx("strong",{children:"ordem"})," dos mixins importa: o último listado em"," ",e.jsx("code",{children:"with A, B"})," sobrescreve métodos comuns. Em caso de colisão,"," ",e.jsx("code",{children:"B"})," ganha."]}),e.jsxs("li",{children:["Mixin não é classe — não dá para instanciar com"," ",e.jsx("code",{children:"Voador()"}),"."]}),e.jsxs("li",{children:["Esquecer ",e.jsx("code",{children:"on"}),' e tentar usar campo da classe alvo: erro de compilação ("undefined name").']}),e.jsx("li",{children:"Misturar dois mixins que definem o mesmo método sem entender quem ganha gera bugs sutis. Renomeie ou refatore."})]}),e.jsxs(a,{type:"warning",title:"Cuidado com mixins gigantes",children:['Mixin é tentador: "vou só jogar mais método aqui". Quando passa de 3-4 responsabilidades, vira um ',e.jsx("em",{children:"god mixin"})," que ninguém entende. Quebre em mixins menores, focados."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Use mixin para comportamento compartilhado por classes não relacionadas hierarquicamente."}),e.jsx("li",{children:"Limite cada mixin a uma responsabilidade clara."}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"on"})," para deixar explícito de qual base você depende."]}),e.jsx("li",{children:"Prefira composição (objetos delegados) quando o comportamento tem estado próprio rico."}),e.jsx("li",{children:"Documente o que o mixin espera da classe alvo (se exige sobrescrever algo, etc.)."})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Você já modela classes, herda, mistura comportamentos. O próximo grande salto é trabalhar com código ",e.jsx("strong",{children:"assíncrono"})," —"," ",e.jsx("code",{children:"Future"})," e ",e.jsx("code",{children:"async/await"})," — base de qualquer chamada de rede, leitura de arquivo ou consulta a banco de dados."]}),e.jsxs(a,{type:"success",title:"Lembre-se",children:["Quase todo widget de animação que você criar vai ter"," ",e.jsx("code",{children:"with SingleTickerProviderStateMixin"})," no ",e.jsx("code",{children:"State"}),'. Agora você sabe que isso adiciona o método/comportamento de "ticker" sem precisar herdar nem implementar manualmente.']})]})}export{n as default};
