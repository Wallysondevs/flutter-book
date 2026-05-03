import{j as e}from"./index-D4AOhXGO.js";import{P as r,C as o,A as s}from"./AlertBox-Dyf2wdSA.js";function t(){return e.jsxs(r,{title:"Construtores",subtitle:"Default, named, factory, redirecting e o poderoso const.",difficulty:"intermediario",timeToRead:"15 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Construir objetos é o que você faz o tempo todo em Flutter. Cada widget é criado por um construtor — e cada construtor define como o objeto nasce, quais valores são obrigatórios e se ele pode ser ",e.jsx("code",{children:"const"})," (o que deixa o app mais rápido). Dominar todas as variantes te permite modelar APIs limpas, fábricas e singletons."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um construtor é uma função especial que executa quando você usa"," ",e.jsx("code",{children:"NomeDaClasse(...)"}),". Sua tarefa: inicializar todos os campos para que o objeto recém-criado já esteja num estado válido. Dart oferece várias formas: a default, com nomes diferentes (named), com lógica de criação (factory), redirecionando para outro (redirecting) e com avaliação em tempo de compilação (const)."]}),e.jsx("h2",{children:"Default e o atalho this.x"}),e.jsx(o,{title:"Construtor padrão",code:`class Ponto {
  final double x;
  final double y;

  // Forma longa
  // Ponto(double x, double y) : x = x, y = y;

  // Atalho equivalente: this.x atribui ao campo x
  Ponto(this.x, this.y);
}

final p = Ponto(3, 4);
print('\${p.x},\${p.y}'); // 3.0,4.0`}),e.jsx("h2",{children:"Construtores nomeados (vários jeitos de criar)"}),e.jsxs("p",{children:["Em Java/JS você sobrecarregaria o construtor. Dart prefere"," ",e.jsx("strong",{children:"nomes diferentes"})," — fica explícito qual variante você está chamando:"]}),e.jsx(o,{title:"Vários construtores nomeados",code:`class Ponto {
  final double x;
  final double y;

  Ponto(this.x, this.y);

  // Construtor nomeado: ClasseNome.identificador
  Ponto.origem() : x = 0, y = 0;

  Ponto.fromJson(Map<String, dynamic> j)
      : x = (j['x'] as num).toDouble(),
        y = (j['y'] as num).toDouble();

  // Redirecting: chama outro construtor da mesma classe
  Ponto.zero() : this(0, 0);
}

final a = Ponto(1, 2);
final b = Ponto.origem();
final c = Ponto.fromJson({'x': 10, 'y': 20});
final d = Ponto.zero(); // delega para Ponto(0, 0)`}),e.jsx("h2",{children:"Initializer list: validação e expressões antes do corpo"}),e.jsxs("p",{children:["Tudo entre os ",e.jsx("code",{children:":"})," e o ",e.jsx("code",{children:"{ }"})," é a"," ",e.jsx("em",{children:"initializer list"}),". Roda antes do corpo do construtor e é o lugar para inicializar campos ",e.jsx("code",{children:"final"})," a partir de cálculos ou validar argumentos com ",e.jsx("code",{children:"assert"}),":"]}),e.jsx(o,{title:"Initializer list com assert",code:`class Idade {
  final int valor;

  Idade(this.valor)
      : assert(valor >= 0, 'Idade não pode ser negativa'),
        assert(valor < 150, 'Idade improvável');
}

// Em modo debug, isto dispara AssertionError; em release, ignora
final ok = Idade(30);
// final ruim = Idade(-1);`}),e.jsx("h2",{children:"Factory: quem decide qual instância devolver"}),e.jsxs("p",{children:["Construtor normal sempre cria uma instância nova. ",e.jsx("code",{children:"factory"})," não: ele ",e.jsx("strong",{children:"retorna"})," qualquer objeto (cache, subclasse, instância pré-existente). É o ingrediente clássico do padrão Singleton:"]}),e.jsx(o,{title:"Singleton via factory",code:`class Logger {
  // _internal é privado; só esta classe pode chamar
  Logger._internal();

  // Instância única, criada na primeira leitura
  static final Logger _instance = Logger._internal();

  // factory devolve sempre a mesma
  factory Logger() => _instance;

  void log(String msg) => print('[LOG] $msg');
}

final a = Logger();
final b = Logger();
print(identical(a, b)); // true — é o mesmo objeto`}),e.jsx(o,{title:"Factory que escolhe a subclasse",code:`abstract class Forma {
  factory Forma.deTipo(String tipo) {
    switch (tipo) {
      case 'circulo':   return Circulo();
      case 'quadrado':  return Quadrado();
      default:
        throw ArgumentError('Tipo desconhecido: $tipo');
    }
  }
  double get area;
}

class Circulo  implements Forma { @override double get area => 3.14; }
class Quadrado implements Forma { @override double get area => 1.0; }

final f = Forma.deTipo('circulo'); // devolve um Circulo`}),e.jsx("h2",{children:"const constructor: objetos em tempo de compilação"}),e.jsxs("p",{children:["Se todos os campos são ",e.jsx("code",{children:"final"})," e os argumentos são conhecidos em compile-time, você pode marcar o construtor como ",e.jsx("code",{children:"const"}),". O Dart cria o objeto ",e.jsx("em",{children:"uma única vez"})," e reutiliza para sempre. Em Flutter isso é ouro: widgets ",e.jsx("code",{children:"const"})," são pulados pelo motor de reconciliação."]}),e.jsx(o,{title:"const é grátis: use sempre que puder",code:`class Cor {
  final int r, g, b;
  const Cor(this.r, this.g, this.b);
}

const azul = Cor(0, 0, 255);   // criada em compile-time
const azul2 = Cor(0, 0, 255);  // mesmo objeto que azul!
print(identical(azul, azul2)); // true

// Em widgets
const Padding(
  padding: EdgeInsets.all(16),
  child: Text('Olá'),
);`}),e.jsxs(s,{type:"success",title:"const = performance grátis",children:["Sempre que o construtor permite ",e.jsx("code",{children:"const"})," e você está passando valores literais, escreva ",e.jsx("code",{children:"const"})," na chamada. Widgets"," ",e.jsx("code",{children:"const"})," não são reconstruídos no rebuild, economizando trabalho do framework."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Tentar usar ",e.jsx("code",{children:"this"})," antes da initializer list — não pode, o objeto ainda não existe completamente."]}),e.jsxs("li",{children:["Esquecer que ",e.jsx("code",{children:"factory"})," não pode usar ",e.jsx("code",{children:"this"})," nem chamar ",e.jsx("code",{children:"super"})," — ele ",e.jsx("em",{children:"retorna"}),", não inicializa."]}),e.jsxs("li",{children:["Marcar construtor como ",e.jsx("code",{children:"const"})," mas ter um campo não-final ou inicializar com expressão que não é constante."]}),e.jsxs("li",{children:["Esquecer ",e.jsx("code",{children:"const"})," na ",e.jsx("em",{children:"chamada"}),": o construtor pode ser"," ",e.jsx("code",{children:"const"})," mas ",e.jsx("code",{children:"Cor(0, 0, 255)"})," sem ",e.jsx("code",{children:"const"})," ","ainda cria nova instância."]})]}),e.jsxs(s,{type:"warning",title:"lint prefer_const_constructors",children:["Ative essa lint (já vem no ",e.jsx("code",{children:"flutter_lints"})," padrão). O analisador sublinha cada lugar onde você esqueceu ",e.jsx("code",{children:"const"})," — corrigir é"," ",e.jsx("em",{children:"free win"})," de performance."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Prefira parâmetros nomeados quando passa de 2 argumentos."}),e.jsxs("li",{children:["Marque campos como ",e.jsx("code",{children:"final"})," e construtor como ",e.jsx("code",{children:"const"})," sempre que possível."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"factory"})," para cache, singletons ou escolha de subclasse — não para tarefas triviais."]}),e.jsxs("li",{children:["Construtores ",e.jsx("code",{children:"fromJson"})," nomeados são padrão de mercado para parsing."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Você sabe nascer um objeto. Agora vamos relacioná-los entre si: o capítulo"," ",e.jsx("strong",{children:"Herança"})," mostra como uma classe pode estender outra, especializar comportamento e usar ",e.jsx("code",{children:"super"}),"."]}),e.jsxs(s,{type:"info",title:"Conexão com Flutter",children:["Cada widget tem um construtor. Quando você cria"," ",e.jsx("code",{children:"const Text('oi')"}),", está chamando um construtor const com parâmetros nomeados — exatamente os conceitos deste capítulo aplicados."]})]})}export{t as default};
