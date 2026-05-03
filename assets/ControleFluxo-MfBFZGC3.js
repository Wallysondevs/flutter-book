import{j as e}from"./index-D9yRYXwO.js";import{P as i,C as s,A as o}from"./AlertBox-B2Rl5ETq.js";function t(){return e.jsxs(i,{title:"Controle de Fluxo",subtitle:"if, switch expression e pattern matching no Dart 3.",difficulty:"iniciante",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['Programas tomam decisões o tempo todo: "se o usuário está logado, mostre A; senão, mostre B". A forma como você escreve essas decisões muda muito a clareza do código. Dart 3 trouxe ',e.jsx("strong",{children:"switch expressions"})," e ",e.jsx("strong",{children:"pattern matching"})," que substituem com folga muitos ",e.jsx("code",{children:"if/else"})," encadeados."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Controle de fluxo é como você desvia a execução: ",e.jsx("em",{children:"condições"})," (",e.jsx("code",{children:"if"}),", ",e.jsx("code",{children:"switch"}),"), ",e.jsx("em",{children:"iterações"})," (loops, vistos no próximo capítulo) e ",e.jsx("em",{children:"saídas precoces"})," (",e.jsx("code",{children:"return"}),", ",e.jsx("code",{children:"break"}),", ",e.jsx("code",{children:"continue"}),"). Em Dart, condições só aceitam ",e.jsx("code",{children:"bool"}),' — não há "truthy/falsy" como em JavaScript.']}),e.jsx("h2",{children:"if / else clássico"}),e.jsx(s,{title:"condicional básica",code:`int idade = 17;

if (idade >= 18) {
  print('adulto');
} else if (idade >= 13) {
  print('adolescente');
} else {
  print('criança');
}

// Operador ternário para casos simples:
final categoria = idade >= 18 ? 'adulto' : 'menor';

// if como expressão dentro de coleção (Dart):
final tags = <String>[
  'usuario',
  if (idade >= 18) 'adulto',
];`}),e.jsxs(o,{type:"info",title:"if-elemento e for-elemento",children:["Dart permite usar ",e.jsx("code",{children:"if"})," e ",e.jsx("code",{children:"for"})," dentro de literais de listas, sets e mapas. Isso é ouro em Flutter para construir árvores de widgets condicionais sem ternários gigantes."]}),e.jsx("h2",{children:"Switch expression (Dart 3+)"}),e.jsx(s,{title:"switch que retorna valor",code:`String descrever(String status) {
  return switch (status) {
    'ok'    => 'Tudo certo',
    'erro'  => 'Algo falhou',
    'load'  => 'Carregando',
    _       => 'Desconhecido', // _ é o catch-all (default)
  };
}

// Comparado ao switch antigo (statement):
String descrever2(String status) {
  switch (status) {
    case 'ok':
      return 'Tudo certo';
    case 'erro':
      return 'Algo falhou';
    default:
      return 'Desconhecido';
  }
}`}),e.jsx("h2",{children:"Pattern matching: o pulo do gato"}),e.jsx(s,{title:"destrincar dados em uma linha",code:`// Tuplas (records) — combinam vários valores
(String, int) usuario = ('Ana', 30);
final (nome, idade) = usuario; // destructuring

// Pattern matching em switch:
String classificar(Object x) => switch (x) {
  int n when n < 0   => 'negativo',
  int n when n == 0  => 'zero',
  int _              => 'positivo',
  String s           => 'texto: $s',
  List(:final length) => 'lista de $length',
  null               => 'nulo',
  _                  => 'outro tipo',
};

void main() {
  print(classificar(-5));        // negativo
  print(classificar('oi'));      // texto: oi
  print(classificar([1, 2, 3])); // lista de 3
}`}),e.jsx("h2",{children:"Exemplo prático: estado de uma requisição"}),e.jsx(s,{title:"sealed class + switch exaustivo",code:`// sealed: o compilador conhece TODAS as subclasses
sealed class Resultado<T> {}
class Carregando<T> extends Resultado<T> {}
class Sucesso<T>    extends Resultado<T> {
  final T dados;
  Sucesso(this.dados);
}
class Falha<T> extends Resultado<T> {
  final String mensagem;
  Falha(this.mensagem);
}

String renderizar(Resultado<String> r) {
  // Sem 'default': se você esquecer um caso, NÃO COMPILA.
  return switch (r) {
    Carregando()              => 'Carregando...',
    Sucesso(:final dados)     => 'OK: $dados',
    Falha(mensagem: final m)  => 'Erro: $m',
  };
}

void main() {
  print(renderizar(Sucesso('lista pronta')));
  print(renderizar(Falha('timeout')));
}`}),e.jsxs(o,{type:"success",title:"Por que isso é game changer",children:["Combine ",e.jsx("em",{children:"sealed classes"})," com ",e.jsx("code",{children:"switch"})," e o compilador garante que você cobriu todos os estados possíveis. Adicionou um novo estado? Todo ",e.jsx("code",{children:"switch"})," que esquecer de tratá-lo vira erro vermelho. Refactor com confiança."]}),e.jsx("h2",{children:"assert para invariantes"}),e.jsx(s,{title:"assert só roda em debug",code:`int dividir(int a, int b) {
  assert(b != 0, 'divisor não pode ser zero');
  return a ~/ b;
}

// Em modo release (flutter build apk --release),
// asserts são removidos — não impactam performance.`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Confundir ",e.jsx("code",{children:"="})," com ",e.jsx("code",{children:"=="})]})," em condição. ",e.jsx("code",{children:"if (x = 5)"})," nem compila em Dart (boa!), mas em outras linguagens é fonte clássica de bug."]}),e.jsxs("li",{children:[e.jsx("strong",{children:'Switch antigo "cai" entre cases'})," sem ",e.jsx("code",{children:"break"}),", mas Dart exige ",e.jsx("code",{children:"break"}),"/",e.jsx("code",{children:"return"})," em cada case — esquecer dá erro."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer o ",e.jsx("code",{children:"_"})," no switch expression"]})," quando os tipos não são exaustivos — o Dart força você a cobrir tudo."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar ",e.jsx("code",{children:"if"})," com algo não-bool"]}),": ",e.jsx("code",{children:"if (lista)"})," não compila. Use ",e.jsx("code",{children:"if (lista.isNotEmpty)"}),"."]})]}),e.jsxs(o,{type:"warning",title:"Switch antigo ainda existe",children:["O ",e.jsx("code",{children:"switch"})," tradicional (statement) continua válido. Use o novo (expression) quando o objetivo é ",e.jsx("strong",{children:"retornar um valor"}),"; use o antigo quando precisar executar uma sequência de comandos."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(o,{type:"tip",title:"Quando usar o quê",children:["Use ",e.jsx("code",{children:"if/else"})," para 2–3 casos simples. Use ",e.jsx("code",{children:"switch expression"})," com pattern matching quando estiver mapeando um tipo para um valor. Use ",e.jsx("code",{children:"sealed class"})," para modelar estados finitos (loading/sucesso/erro, autenticado/anônimo, etc)."]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Decisões resolvidas, vamos para repetições: ",e.jsx("code",{children:"for"}),", ",e.jsx("code",{children:"while"})," e os métodos funcionais que substituem boa parte deles."]}),e.jsxs(o,{type:"success",title:"Continue lendo",children:["Próximo: ",e.jsx("em",{children:"Loops"}),"."]})]})}export{t as default};
