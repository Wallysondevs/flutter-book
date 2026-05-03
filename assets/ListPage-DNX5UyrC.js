import{j as e}from"./index-D9yRYXwO.js";import{P as r,C as a,A as i}from"./AlertBox-B2Rl5ETq.js";function d(){return e.jsxs(r,{title:"List",subtitle:"A coleção mais usada em Flutter — base de listas, models e construção de UI.",difficulty:"iniciante",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Toda tela com várias linhas usa ",e.jsx("code",{children:"List"}),": feed de posts, lista de produtos, mensagens de chat, opções de menu. ",e.jsx("code",{children:"ListView.builder"}),","," ",e.jsx("code",{children:"Column"})," e ",e.jsx("code",{children:"Row"}),' recebem listas de widgets. Saber criar, filtrar e transformar listas é literalmente o "arroz com feijão" do dia a dia em Flutter.']}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Uma ",e.jsx("code",{children:"List"})," é uma sequência ",e.jsx("strong",{children:"ordenada"})," de itens acessíveis por índice (",e.jsx("code",{children:"0, 1, 2…"}),"). Imagine uma fila numerada: o primeiro da fila é o índice 0. Listas em Dart são tipadas (",e.jsx("code",{children:"List<int>"}),","," ",e.jsx("code",{children:"List<Pessoa>"}),") — o compilador garante que você só insira do tipo certo."]}),e.jsx("h2",{children:"Como o Dart faz"}),e.jsx(a,{title:"Criando listas",code:`// Lista LITERAL: o tipo é inferido de [1, 2, 3] -> List<int>
final numeros = [1, 2, 3];

// Vazia precisa do tipo explícito (não dá pra inferir nada)
final nomes = <String>[];
nomes.add('Ana');
nomes.add('Bruno');

// Imutável: const não permite mais alterações
const semanas = ['seg', 'ter', 'qua'];
// semanas.add('qui'); // erro em runtime: lista é unmodifiable

// Tamanho fixo
final fixa = List<int>.filled(3, 0); // [0, 0, 0]`}),e.jsx("h2",{children:"Operações fundamentais"}),e.jsx(a,{title:"Acesso e modificação",code:`final tarefas = ['estudar', 'treinar', 'cozinhar'];

// Acesso por índice (0-based)
print(tarefas[0]);        // 'estudar'
print(tarefas.first);     // 'estudar'
print(tarefas.last);      // 'cozinhar'
print(tarefas.length);    // 3

// Adicionar / remover
tarefas.add('ler');                  // no fim
tarefas.insert(0, 'acordar');        // numa posição
tarefas.remove('treinar');           // pela igualdade
tarefas.removeAt(0);                 // pelo índice

// Buscar
final idx = tarefas.indexOf('ler');  // -1 se não existir
final temLer = tarefas.contains('ler');`}),e.jsx("h2",{children:"Operações funcionais (o que você usa todo dia)"}),e.jsx("p",{children:"São métodos que recebem uma função e devolvem um novo Iterable. Não modificam a lista original — perfeitos para construir UI a partir de dados:"}),e.jsx(a,{title:"map, where, reduce, fold, sort",code:`final n = [1, 2, 3, 4, 5];

// where: filtra mantendo só quem passa no teste
final pares = n.where((x) => x.isEven).toList();   // [2, 4]

// map: transforma cada item em outra coisa
final dobrados = n.map((x) => x * 2).toList();     // [2,4,6,8,10]

// reduce: combina tudo num único valor (precisa ter ao menos 1 item)
final soma = n.reduce((acc, x) => acc + x);        // 15

// fold: como reduce, mas com valor inicial e tipo livre
final concat = n.fold<String>('', (s, x) => '$s$x'); // "12345"

// sort: ordena no lugar (modifica a lista original!)
final copia = [...n]..sort((a, b) => b.compareTo(a)); // [5,4,3,2,1]`}),e.jsxs(i,{type:"tip",title:"Por que tantos .toList()?",children:[e.jsx("code",{children:"map"})," e ",e.jsx("code",{children:"where"})," retornam um ",e.jsx("code",{children:"Iterable"})," ",e.jsx("em",{children:"preguiçoso"})," — só roda quando você itera. Para guardar o resultado, ou usar em widgets que esperam ",e.jsx("code",{children:"List"}),", materialize com"," ",e.jsx("code",{children:".toList()"}),"."]}),e.jsx("h2",{children:"Spread, collection-if e collection-for"}),e.jsx("p",{children:"Recursos do Dart que deixam a construção de listas (e de árvores de widgets!) muito mais legível:"}),e.jsx(a,{title:"Construção declarativa de listas",code:`final base = [1, 2, 3];
final mostrarQuatro = true;

final completa = [
  0,
  ...base,                              // espalha: 1, 2, 3
  if (mostrarQuatro) 4,                 // só inclui se a condição for true
  for (var i = 5; i <= 7; i++) i,       // 5, 6, 7
];
// resultado: [0, 1, 2, 3, 4, 5, 6, 7]

// Em Flutter, o mesmo padrão monta widgets:
Column(
  children: [
    const Text('Cabeçalho'),
    ...itens.map((i) => Text(i.titulo)),
    if (carregando) const CircularProgressIndicator(),
  ],
);`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Acessar um índice fora do tamanho dispara ",e.jsx("code",{children:"RangeError"}),". Cheque ",e.jsx("code",{children:"length"})," ou use ",e.jsx("code",{children:"elementAtOrNull"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"firstWhere"})," sem ",e.jsx("code",{children:"orElse"})," lança erro se nada bater. Use ",e.jsx("code",{children:"firstWhereOrNull"})," (do ",e.jsx("code",{children:"collection"}),") ou passe um fallback."]}),e.jsxs("li",{children:[e.jsx("code",{children:"const"})," em listas literais cria lista ",e.jsx("strong",{children:"imutável"}),"; tentar ",e.jsx("code",{children:".add()"})," nela explode em runtime."]}),e.jsxs("li",{children:[e.jsx("code",{children:"list1 == list2"})," compara por ",e.jsx("em",{children:"identidade"}),", não pelo conteúdo. Use ",e.jsx("code",{children:"listEquals"})," (do ",e.jsx("code",{children:"flutter/foundation.dart"}),")."]})]}),e.jsxs(i,{type:"warning",title:"Modificando enquanto itera",children:["Não chame ",e.jsx("code",{children:"add"})," ou ",e.jsx("code",{children:"remove"})," dentro de um ",e.jsx("code",{children:"for"})," ","que percorre a mesma lista — você vai pegar ",e.jsx("code",{children:"ConcurrentModificationError"}),". Trabalhe sobre uma cópia (",e.jsx("code",{children:"[...lista]"}),") ou colete o que vai mudar e aplique depois."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Tipar sempre (",e.jsx("code",{children:"List<Produto>"})," em vez de ",e.jsx("code",{children:"List"})," cru)."]}),e.jsxs("li",{children:["Preferir métodos funcionais (",e.jsx("code",{children:"map"}),", ",e.jsx("code",{children:"where"}),") a loops manuais quando o objetivo é transformar."]}),e.jsxs("li",{children:["Para listas que viram UI, use ",e.jsx("code",{children:"const"})," nos itens estáticos para o Flutter pular reconstrução."]}),e.jsxs("li",{children:["Quando precisar de busca rápida por valor, considere migrar para ",e.jsx("code",{children:"Set"})," ou ",e.jsx("code",{children:"Map"}),"."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Listas guardam ordem e permitem duplicados. Quando você quer o oposto — valores únicos — entra ",e.jsx("strong",{children:"Set"}),". Para pares chave→valor, vá para"," ",e.jsx("strong",{children:"Map"}),". Os três compartilham a interface ",e.jsx("strong",{children:"Iterable"})," ","(capítulo seguinte)."]}),e.jsxs(i,{type:"success",title:"Conexão com Flutter",children:[e.jsx("code",{children:"ListView.builder"})," recebe ",e.jsx("code",{children:"itemCount"})," e",e.jsx("code",{children:"itemBuilder"})," — exatamente um ",e.jsx("code",{children:"List"})," e uma função que transforma cada índice em widget. Quando você dominar List, ListView vira natural."]})]})}export{d as default};
