import{j as e}from"./index-D9yRYXwO.js";import{P as r,C as a,A as i}from"./AlertBox-B2Rl5ETq.js";function n(){return e.jsxs(r,{title:"Dart vs JavaScript",subtitle:"Mesma família de C, mas com tipagem estática e null safety nativo.",difficulty:"iniciante",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Se você já mexeu com JavaScript, TypeScript, Java ou C#, vai pegar Dart em poucas horas. Saber ",e.jsx("strong",{children:"onde Dart é parecida e onde diverge"}),' de JS evita que você escreva código no estilo "JS com ponto e vírgula" — que funciona, mas perde tudo o que Dart tem de melhor.']}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Dart é uma linguagem ",e.jsx("strong",{children:"orientada a objetos"}),", ",e.jsx("strong",{children:"tipada estaticamente"})," (com inferência), ",e.jsx("strong",{children:"null-safe"})," e com ",e.jsx("strong",{children:"compilação dupla"}),": JIT no desenvolvimento (hot reload) e AOT em produção (binário nativo rápido). JavaScript é dinâmica, single-thread baseada em event loop, e roda em qualquer navegador sem compilar."]}),e.jsx("p",{children:"Em uma frase: Dart se parece com TypeScript estrito que compila para código nativo em vez de JS."}),e.jsx("h2",{children:"Como Dart faz"}),e.jsx(a,{title:"comparação lado a lado",code:`// JavaScript
const soma = (a, b) => a + b;
let nome = 'Ana';
nome = null; // permitido

// Dart
int soma(int a, int b) => a + b;
String nome = 'Ana';
// nome = null; // ERRO de compilação: tipo não-nullable
String? talvez = null; // ok, ? marca como nullable`}),e.jsx("h2",{children:"As cinco diferenças que mais importam"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Tipagem estática"})," — o tipo é decidido em compile-time. Você pode usar ",e.jsx("code",{children:"var"})," e o tipo é inferido pela primeira atribuição."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Null safety"})," — ",e.jsx("code",{children:"String"})," nunca é null; só ",e.jsx("code",{children:"String?"})," pode ser. O compilador te força a tratar o caso null."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tudo é objeto"})," — até ",e.jsx("code",{children:"int"})," e ",e.jsx("code",{children:"bool"}),". Não existe ",e.jsx("code",{children:"undefined"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"async/await com Future e Stream"})," — semelhante a Promise, mas com tipagem completa: ",e.jsx("code",{children:"Future<User>"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Concorrência via Isolate"})," — paralelismo real (memória isolada por isolate), em vez de threads compartilhadas."]})]}),e.jsx("h2",{children:"Exemplo prático: buscar usuário"}),e.jsx(a,{title:"async, tipos e null safety juntos",code:`// Modela uma resposta possível de API
class Usuario {
  final int id;
  final String nome;
  final String? bio; // pode vir vazio do servidor

  const Usuario({required this.id, required this.nome, this.bio});
}

Future<Usuario?> buscarUsuario(int id) async {
  // Simula chamada de rede
  await Future.delayed(const Duration(milliseconds: 200));
  if (id <= 0) return null;
  return Usuario(id: id, nome: 'Ana', bio: null);
}

void main() async {
  final u = await buscarUsuario(1);
  // u é Usuario? — o compilador exige tratar o null:
  if (u == null) {
    print('Não encontrado');
    return;
  }
  // Aqui dentro o Dart sabe que u é Usuario (não-null)
  print('Olá, \${u.nome}');
  // Para campos nullable, use ?? para fallback:
  print(u.bio ?? 'sem bio');
}`}),e.jsxs(i,{type:"info",title:"Vindo de TypeScript?",children:["Você vai se sentir em casa: ",e.jsx("code",{children:"generics"}),", ",e.jsx("code",{children:"async/await"}),", ",e.jsx("em",{children:"sealed classes"}),", ",e.jsx("em",{children:"pattern matching"}),", ",e.jsx("em",{children:"records"})," e até ",e.jsx("code",{children:"extension methods"}),". A diferença é que tudo é nativo e sempre presente, não opcional."]}),e.jsx("h2",{children:"Pegadinhas para quem vem de JavaScript"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Sem coerção maluca"}),": ",e.jsx("code",{children:"'5' + 1"})," não compila. Você converte com ",e.jsx("code",{children:"int.parse('5')"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Sem ",e.jsx("code",{children:"==="})]}),": ",e.jsx("code",{children:"=="})," em Dart já compara valores; para identidade de referência use ",e.jsx("code",{children:"identical(a, b)"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Listas tipadas"}),": ",e.jsx("code",{children:"[1, 2, 'x']"})," em Dart vira ",e.jsx("code",{children:"List<Object>"})," e te obriga a fazer cast — geralmente um cheiro de design ruim."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Não existe ",e.jsx("code",{children:"undefined"})]}),": ou a variável tem valor, ou é ",e.jsx("code",{children:"null"})," (e só se o tipo permitir)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Truthy diferente"}),": só ",e.jsx("code",{children:"bool"})," é aceito em ",e.jsx("code",{children:"if"}),". ",e.jsx("code",{children:"if (lista)"})," não compila — use ",e.jsx("code",{children:"if (lista.isNotEmpty)"}),"."]})]}),e.jsxs(i,{type:"warning",title:"Cuidado com any/dynamic",children:["Existe ",e.jsx("code",{children:"dynamic"})," em Dart, equivalente ao ",e.jsx("code",{children:"any"})," do TS. Use só em pontos de fronteira (parsing de JSON, por exemplo). Espalhar ",e.jsx("code",{children:"dynamic"})," joga fora a maior vantagem da linguagem."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(i,{type:"tip",title:"Escreva Dart idiomático",children:["Use ",e.jsx("code",{children:"final"})," por padrão; só caia em ",e.jsx("code",{children:"var"})," quando precisar reatribuir. Prefira ",e.jsx("code",{children:"const"})," quando o valor é literal. Modele estados com ",e.jsx("em",{children:"sealed classes"})," em vez de strings mágicas. Trate ",e.jsx("code",{children:"null"})," com ",e.jsx("code",{children:"??"}),", ",e.jsx("code",{children:"?."})," e ",e.jsx("code",{children:"if (x != null)"})," em vez de ",e.jsx("code",{children:"!"}),"."]}),e.jsx("h2",{children:"Próximos passos"}),e.jsx("p",{children:"Agora vamos preparar o ambiente: escolher uma IDE, instalar as extensões certas e abrir o primeiro projeto."}),e.jsxs(i,{type:"success",title:"Continue lendo",children:["Próximo: ",e.jsx("em",{children:"Escolher uma IDE"}),"."]})]})}export{n as default};
