import{j as e}from"./index-D4AOhXGO.js";import{P as a,C as o,A as i}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(a,{title:"Tipos & Variáveis",subtitle:"int, double, String, bool e os modificadores var, final e const.",difficulty:"iniciante",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Em Dart, ",e.jsx("strong",{children:"tipo é contrato"}),". Declarar bem os tipos faz o compilador trabalhar a seu favor: ele pega erros antes de o app rodar e o autocomplete fica esperto. Escolher entre ",e.jsx("code",{children:"var"}),", ",e.jsx("code",{children:"final"})," e ",e.jsx("code",{children:"const"})," também muda performance e previne bugs de estado em Flutter."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Toda variável em Dart tem um ",e.jsx("strong",{children:"tipo"})," (declarado ou inferido) e um ",e.jsx("strong",{children:"modificador"})," que diz se ela pode ser reatribuída. O sistema de ",e.jsx("em",{children:"null safety"})," exige que você marque com ",e.jsx("code",{children:"?"})," os tipos que aceitam ",e.jsx("code",{children:"null"}),"."]}),e.jsx("h2",{children:"Tipos primitivos"}),e.jsx(o,{title:"os tipos que você mais usa",code:`int idade = 30;             // inteiros (sem ponto)
double altura = 1.75;       // ponto flutuante
num qualquerNumero = 42;    // pai de int e double
String nome = 'Maria';      // texto, aspas simples ou duplas
bool ativo = true;          // só true ou false (sem 0/1)

// Coleções
List<int> notas = [8, 9, 10];
Set<String> tags = {'flutter', 'dart'};
Map<String, int> idades = {'Ana': 25, 'Bruno': 30};

// Tipos especiais
dynamic qualquer = 'pode virar qualquer coisa'; // evite!
Object obj = 'tudo em Dart é Object';
Null nada = null;`}),e.jsx("h2",{children:"var, final, const — o que muda"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"var"})})," — tipo inferido na primeira atribuição, valor pode mudar."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"final"})})," — recebe valor uma única vez, em runtime; depois é imutável."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"const"})})," — valor calculado em ",e.jsx("em",{children:"compile-time"}),"; congelado e compartilhado entre instâncias."]})]}),e.jsx(o,{title:"diferença na prática",code:`var contador = 0;
contador = 1; // ok, var é mutável

final agora = DateTime.now();
// agora = DateTime.now(); // ERRO: final não reatribui

const pi = 3.14159;
// const x = DateTime.now(); // ERRO: now() roda em runtime

// const também congela conteúdo de coleções
const cores = ['azul', 'verde'];
// cores.add('rosa'); // ERRO em runtime: lista é imutável

final mutavel = ['a', 'b'];
mutavel.add('c'); // ok: a referência é final, o conteúdo não`}),e.jsxs(i,{type:"info",title:"Em Flutter, const é otimização",children:["Widgets marcados como ",e.jsx("code",{children:"const"})," são criados uma única vez e reutilizados em rebuilds. Use sempre que o widget não dependa de dados variáveis: ",e.jsx("code",{children:"const Text('Olá')"})," em vez de ",e.jsx("code",{children:"Text('Olá')"}),"."]}),e.jsx("h2",{children:"Null safety na prática"}),e.jsx(o,{title:"o ? muda tudo",code:`String nome = 'Ana';
// nome = null; // ERRO: String não aceita null

String? apelido; // ok, começa null
apelido = 'Aninha';

// Para usar um valor nullable, trate o null:
print(apelido?.toUpperCase());      // null-safe access
print(apelido ?? 'sem apelido');     // fallback
print(apelido!.length);              // ! força — pode quebrar!

// late: prometo inicializar antes de usar
late String token;
void login() {
  token = 'abc123';
}`}),e.jsx("h2",{children:"Exemplo prático: dados de um formulário"}),e.jsx(o,{title:"modelando um cadastro",code:`class Cadastro {
  final String nome;        // obrigatório
  final int idade;          // obrigatório
  final String? telefone;   // opcional
  final List<String> tags;  // sempre uma lista (pode ser vazia)

  const Cadastro({
    required this.nome,
    required this.idade,
    this.telefone,
    this.tags = const [],
  });
}

void main() {
  const c = Cadastro(nome: 'Ana', idade: 30);
  print(c.nome);                          // Ana
  print(c.telefone ?? 'não informado');   // não informado
  print(c.tags.isEmpty);                  // true
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Usar ",e.jsx("code",{children:"var"})," para tudo e perder informação de tipo na assinatura de funções públicas — declare o tipo de parâmetros e retornos."]}),e.jsxs("li",{children:["Confundir ",e.jsx("code",{children:"final"})," em coleção: a referência é imutável, mas o conteúdo da lista ainda pode ser modificado."]}),e.jsxs("li",{children:["Esquecer que ",e.jsx("code",{children:"1 / 2"})," em Dart dá ",e.jsx("code",{children:"0.5"})," (double). Para divisão inteira use ",e.jsx("code",{children:"1 ~/ 2"}),"."]}),e.jsxs("li",{children:["Espalhar ",e.jsx("code",{children:"!"})," (force unwrap) por preguiça — qualquer null mata o app em runtime."]}),e.jsxs("li",{children:["Comparar ",e.jsx("code",{children:"String"})," com ",e.jsx("code",{children:"=="})," esperando comportamento estranho — pode confiar, em Dart compara conteúdo."]})]}),e.jsxs(i,{type:"warning",title:"dynamic é uma armadilha",children:[e.jsx("code",{children:"dynamic"})," desliga toda a checagem de tipos — você recupera o pior do JavaScript. Use só na fronteira (parsing de JSON cru) e converta para um tipo concreto o quanto antes."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(i,{type:"tip",title:"Um padrão simples que resolve 90% dos casos",children:["Use ",e.jsx("code",{children:"final"})," por padrão em variáveis locais. Use ",e.jsx("code",{children:"const"})," em literais e widgets imutáveis. Reserve ",e.jsx("code",{children:"var"})," para casos onde você realmente reatribui. Evite ",e.jsx("code",{children:"dynamic"}),". Marque tipos opcionais com ",e.jsx("code",{children:"?"}),' em vez de "deixar vazio".']}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com tipos sob controle, vamos ver como combiná-los com operadores — incluindo os exclusivos do Dart como ",e.jsx("code",{children:"??"})," e ",e.jsx("code",{children:".."}),"."]}),e.jsxs(i,{type:"success",title:"Continue lendo",children:["Próximo: ",e.jsx("em",{children:"Operadores"}),"."]})]})}export{n as default};
