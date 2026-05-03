import{j as e}from"./index-D9yRYXwO.js";import{P as s,C as o,A as r}from"./AlertBox-B2Rl5ETq.js";function n(){return e.jsxs(s,{title:"Operadores",subtitle:"Aritméticos, lógicos, cascade e null-aware — incluindo os exclusivos do Dart.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['Operadores são a "cola" que liga valores e expressões. Dart tem todos os clássicos (',e.jsx("code",{children:"+"}),", ",e.jsx("code",{children:"-"}),", ",e.jsx("code",{children:"&&"}),", ",e.jsx("code",{children:"||"}),") e alguns peculiares — ",e.jsx("code",{children:"??"}),", ",e.jsx("code",{children:"?."}),", ",e.jsx("code",{children:".."}),", ",e.jsx("code",{children:"~/"})," — que aparecem o tempo todo em código Flutter idiomático. Conhecê-los economiza muitas linhas e bugs."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um operador é apenas um símbolo que executa uma operação sobre um ou dois operandos. Em Dart, vários operadores são ",e.jsx("strong",{children:"açúcar sintático"})," para chamadas de método: ",e.jsx("code",{children:"a + b"})," equivale a ",e.jsx("code",{children:"a.operator+(b)"}),". Por isso, suas próprias classes podem sobrecarregar operadores."]}),e.jsx("h2",{children:"Aritméticos e comparação"}),e.jsx(o,{title:"o básico",code:`int a = 10, b = 3;

print(a + b);   // 13
print(a - b);   // 7
print(a * b);   // 30
print(a / b);   // 3.3333... (sempre double)
print(a ~/ b);  // 3 (divisão inteira)
print(a % b);   // 1 (resto)

print(a == b);  // false (compara valor, não referência)
print(a != b);  // true
print(a > b);   // true

// Lógicos:
print(a > 0 && b > 0);  // true (E)
print(a < 0 || b > 0);  // true (OU)
print(!(a == b));       // true (NÃO)`}),e.jsx("h2",{children:"Operadores exclusivos do Dart"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"~/"})})," — divisão inteira (descarta a parte decimal)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"??"})})," — retorna o lado direito se o esquerdo for ",e.jsx("code",{children:"null"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"??="})})," — atribui só se a variável atual for ",e.jsx("code",{children:"null"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"?."})})," — chamada/acesso seguro em valor nullable; resultado é nullable."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"!"})}),' — afirma "isto não é null" (perigoso, quebra em runtime se for).']}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:".."})})," — ",e.jsx("em",{children:"cascade"}),": encadeia chamadas/atribuições no mesmo objeto."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"?.."})})," — cascade null-aware: só executa se o objeto não for null."]})]}),e.jsx(o,{title:"null-aware na prática",code:`String? nome; // null

// Sem null-aware:
String mostrar = nome == null ? 'anônimo' : nome.toUpperCase();

// Com null-aware:
String mostrar2 = nome?.toUpperCase() ?? 'ANÔNIMO';

// Atribui só se for null:
nome ??= 'sem nome';

// Cascade — configura objeto sem repetir nome:
final controller = TextEditingController()
  ..text = 'Ana'
  ..selection = const TextSelection.collapsed(offset: 3);`}),e.jsx("h2",{children:"Exemplo prático em Flutter"}),e.jsx(o,{title:"cascade brilha em UI",code:`import 'package:flutter/material.dart';

// Sem cascade — repetitivo:
final paint1 = Paint();
paint1.color = Colors.blue;
paint1.strokeWidth = 4;
paint1.style = PaintingStyle.stroke;

// Com cascade — limpo:
final paint2 = Paint()
  ..color = Colors.blue
  ..strokeWidth = 4
  ..style = PaintingStyle.stroke;

// Combinando ?? e ?. para evitar nulls:
class Usuario {
  final String? avatarUrl;
  Usuario({this.avatarUrl});
}

String urlSegura(Usuario? u) {
  return u?.avatarUrl ?? 'assets/placeholder.png';
}`}),e.jsx("h2",{children:"Atribuições compostas"}),e.jsx(o,{title:"atalhos comuns",code:`int x = 10;
x += 5;   // x = x + 5  → 15
x -= 2;   // 13
x *= 2;   // 26
x ~/= 3;  // 8 (divisão inteira)
x %= 5;   // 3

List<int> nums = [];
nums..add(1)..add(2)..add(3); // 3 cascades em uma linha`}),e.jsxs(r,{type:"info",title:"Cascade economiza variáveis",children:["Em vez de criar uma variável temporária só para configurar um objeto, encadeie com ",e.jsx("code",{children:".."}),". O resultado da expressão continua sendo o objeto original — útil em construtores complexos."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:[e.jsx("code",{children:"/"})," sempre retorna double"]}),". ",e.jsx("code",{children:"10 / 2"})," dá ",e.jsx("code",{children:"5.0"}),", não ",e.jsx("code",{children:"5"}),". Use ",e.jsx("code",{children:"~/"})," para inteiro."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:[e.jsx("code",{children:"!"})," não testa, ele afirma"]}),". ",e.jsx("code",{children:"x!"}),' diz ao compilador "confie em mim". Se ',e.jsx("code",{children:"x"})," for null, o app crasha."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Precedência de ",e.jsx("code",{children:"??"})]}),": ",e.jsx("code",{children:"a ?? b + c"})," é ",e.jsx("code",{children:"a ?? (b + c)"}),". Use parênteses se em dúvida."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cascade em método que retorna outro tipo"}),": ",e.jsx("code",{children:"lista..add(1)..length"})," ainda retorna a lista, não o length."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:[e.jsx("code",{children:"=="})," em Dart compara valor por padrão"]}),"; para identidade use ",e.jsx("code",{children:"identical(a, b)"}),"."]})]}),e.jsxs(r,{type:"danger",title:"Cuidado com o operador !",children:["Cada ",e.jsx("code",{children:"!"})," é uma promessa não checada. Em código de produção, prefira ",e.jsx("code",{children:"if (x != null)"}),", ",e.jsx("code",{children:"?."})," ou ",e.jsx("code",{children:"??"}),". O ",e.jsx("code",{children:"!"})," deve ser exceção, não regra."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(r,{type:"tip",title:"Estilo idiomático",children:["Em código Flutter, você verá muito ",e.jsx("code",{children:"?."}),", ",e.jsx("code",{children:"??"})," e ",e.jsx("code",{children:".."}),". Eles tornam o código mais curto e seguro. Quando precisar configurar um objeto com várias propriedades, use cascade — fica óbvio que tudo se aplica ao mesmo alvo."]}),e.jsx("h2",{children:"Próximos passos"}),e.jsx("p",{children:"Com operadores na ponta da língua, vamos para o tipo mais usado de todos: as Strings, com sua interpolação poderosa."}),e.jsxs(r,{type:"success",title:"Continue lendo",children:["Próximo: ",e.jsx("em",{children:"Strings & Interpolação"}),"."]})]})}export{n as default};
