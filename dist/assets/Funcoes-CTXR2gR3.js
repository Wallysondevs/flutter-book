import{j as e}from"./index-D4AOhXGO.js";import{P as a,C as o,A as r}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(a,{title:"Funções & Closures",subtitle:"Parâmetros nomeados, opcionais, arrow, funções como valores e closures.",difficulty:"iniciante",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Funções são o tijolo de qualquer programa. Em Flutter, você passa funções para widgets a todo momento (",e.jsx("code",{children:"onPressed"}),", ",e.jsx("code",{children:"onChanged"}),","," ",e.jsx("code",{children:"builder"}),") e recebe funções como ",e.jsx("em",{children:"callbacks"}),". Entender bem parâmetros nomeados, valores padrão e closures evita 80% das dúvidas iniciais com a API do framework."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Uma função é um pedaço de código com nome, que recebe entradas (parâmetros) e devolve uma saída (retorno). Em Dart funções são ",e.jsx("strong",{children:"cidadãs de primeira classe"}),": você pode guardar uma função numa variável, passar para outra função e retornar de uma função — exatamente como faz com um número ou um texto."]}),e.jsx("h2",{children:"Como o Dart faz"}),e.jsxs("p",{children:["A forma completa declara o tipo de retorno, o nome e os parâmetros. Quando o corpo é uma única expressão, use a forma ",e.jsx("code",{children:"=>"})," (arrow) para encurtar:"]}),e.jsx(o,{title:"Sintaxes equivalentes",code:`// Forma com bloco { ... }
int soma(int a, int b) {
  return a + b;
}

// Mesma função, escrita com arrow (apenas para 1 expressão)
int somaCurta(int a, int b) => a + b;

// Sem retorno: use void
void cumprimentar(String nome) {
  print('Olá, $nome!');
}`}),e.jsx("h2",{children:"Parâmetros: posicionais, opcionais e nomeados"}),e.jsxs("p",{children:["Dart tem três modos de declarar parâmetros. O Flutter usa ",e.jsx("strong",{children:"nomeados"})," ","em quase tudo — por isso você lê ",e.jsx("code",{children:"Text('oi', style: ...)"})," em vez de adivinhar a ordem."]}),e.jsx(o,{title:"As três formas",code:`// 1) Posicionais obrigatórios
int multiplicar(int a, int b) => a * b;
multiplicar(2, 3); // 6

// 2) Posicionais OPCIONAIS — entre [ ]
String saudacao(String nome, [String? titulo]) {
  if (titulo == null) return 'Oi, $nome';
  return 'Oi, $titulo $nome';
}
saudacao('Ana');             // "Oi, Ana"
saudacao('Ana', 'Dra.');     // "Oi, Dra. Ana"

// 3) NOMEADOS — entre { }. Use 'required' para obrigatórios.
Widget botao({
  required String texto,
  Color cor = Colors.blue,         // valor padrão
  VoidCallback? aoTocar,           // opcional
}) {
  return ElevatedButton(
    style: ElevatedButton.styleFrom(backgroundColor: cor),
    onPressed: aoTocar,
    child: Text(texto),
  );
}

// Uso: ordem livre, código auto-explicativo
botao(texto: 'Salvar');
botao(texto: 'Excluir', cor: Colors.red, aoTocar: () {});`}),e.jsxs(r,{type:"info",title:"Por que nomeados dominam o Flutter",children:["Construtores de widgets têm dezenas de parâmetros. Se fossem posicionais, você precisaria decorar a ordem. Com nomeados, fica claro ",e.jsx("em",{children:"o que"})," cada valor significa. Marque como ",e.jsx("code",{children:"required"})," só o que é essencial; o resto vira opcional com padrão sensato."]}),e.jsx("h2",{children:"Funções como valores (first-class)"}),e.jsxs("p",{children:["Você pode guardar uma função numa variável e passar adiante. O tipo de uma função usa o formato ",e.jsx("code",{children:"Tipo Function(Parâmetros)"}),"."]}),e.jsx(o,{title:"Funções viajam como valores",code:`// Variável que guarda uma função (int, int) -> int
int Function(int, int) operacao = (a, b) => a + b;
print(operacao(2, 3)); // 5

// Função que recebe outra função
void executar(void Function() acao) {
  print('antes');
  acao();
  print('depois');
}

executar(() => print('rodou no meio'));

// Em Flutter você faz isso o tempo todo:
ElevatedButton(
  onPressed: () => print('clicou'),
  child: const Text('OK'),
);`}),e.jsx("h2",{children:"Closures: funções que lembram do redor"}),e.jsxs("p",{children:["Uma ",e.jsx("strong",{children:"closure"}),' é uma função criada dentro de outro escopo que continua "lembrando" das variáveis daquele escopo, mesmo depois que ele acabou. Soa abstrato, mas você usa isso o tempo todo:']}),e.jsx(o,{title:"Closure: o contador lembra de 'valor'",code:`int Function() criarContador() {
  var valor = 0;             // variável local
  return () {
    valor++;                 // a função interna ainda enxerga 'valor'
    return valor;
  };
}

final proximo = criarContador();
print(proximo()); // 1
print(proximo()); // 2
print(proximo()); // 3`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Esquecer ",e.jsx("code",{children:"required"})," num parâmetro nomeado essencial — o compilador aceita chamadas sem ele e você pega ",e.jsx("code",{children:"null"})," em runtime."]}),e.jsxs("li",{children:["Usar ",e.jsx("code",{children:"=>"})," com mais de uma expressão. Arrow só serve para uma expressão única; com várias linhas, use ",e.jsx("code",{children:"{ ... }"}),"."]}),e.jsxs("li",{children:["Confundir ",e.jsx("code",{children:"void Function()"})," com ",e.jsx("code",{children:"Function"}),".",e.jsx("code",{children:"Function"})," sozinho aceita qualquer assinatura e prejudica a checagem de tipos."]}),e.jsxs("li",{children:['Capturar uma variável de loop dentro de uma closure achando que cada iteração terá uma "cópia". Use ',e.jsx("code",{children:"final"})," dentro do loop para garantir."]})]}),e.jsxs(r,{type:"warning",title:"Evite o tipo Function genérico",children:["Prefira sempre ",e.jsx("code",{children:"void Function(int)"})," ou ",e.jsx("code",{children:"String Function()"})," ","em vez de ",e.jsx("code",{children:"Function"}),". Isso permite que o Dart pegue erros em tempo de compilação e seu IDE mostre as sugestões corretas."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Use parâmetros nomeados quando a função tem 3+ argumentos."}),e.jsx("li",{children:"Forneça valores padrão sensatos para reduzir ruído no chamador."}),e.jsxs("li",{children:["Crie typedefs para assinaturas repetidas: ",e.jsx("code",{children:"typedef Validador = String? Function(String);"})]}),e.jsx("li",{children:"Funções pequenas (5–15 linhas) são mais fáceis de testar e reusar."})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com funções dominadas, o próximo bloco natural é ",e.jsx("strong",{children:"Null Safety"})," — entender quando um valor pode ser ",e.jsx("code",{children:"null"})," e como o Dart te protege."]}),e.jsxs(r,{type:"success",title:"Tente agora",children:["Reescreva sua função preferida com parâmetros nomeados e ",e.jsx("code",{children:"required"}),". Veja como o código fica mais legível no chamador."]})]})}export{n as default};
