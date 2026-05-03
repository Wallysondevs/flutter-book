import{j as e}from"./index-D9yRYXwO.js";import{P as o,C as a,A as r}from"./AlertBox-B2Rl5ETq.js";function n(){return e.jsxs(o,{title:"Iterables & Spread",subtitle:"A interface comum por trás de List, Set e Map — e por que importa entender lazy.",difficulty:"intermediario",timeToRead:"11 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quando você aprende ",e.jsx("code",{children:"List.map"}),", ",e.jsx("code",{children:"Set.where"})," e os",e.jsx("code",{children:"values"})," de um ",e.jsx("code",{children:"Map"}),", percebe que todos têm os mesmos métodos. Não é coincidência: por baixo, todos implementam"," ",e.jsx("strong",{children:"Iterable"}),". Entender isso te ajuda a criar pipelines eficientes, evitar trabalho dobrado e usar geradores (",e.jsx("code",{children:"sync*"}),") para produzir sequências sob demanda."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um ",e.jsx("code",{children:"Iterable<T>"}),' é "qualquer coisa pela qual você pode passar um item de cada vez". É o contrato mínimo: tem ',e.jsx("code",{children:"iterator"}),", que entrega elementos em sequência. ",e.jsx("code",{children:"List"}),", ",e.jsx("code",{children:"Set"}),", valores de ",e.jsx("code",{children:"Map"}),", ranges, streams síncronas — todos são iteráveis. O ",e.jsx("code",{children:"for-in"})," funciona em qualquer um deles."]}),e.jsx(a,{title:"O for-in funciona em qualquer Iterable",code:`final lista = [1, 2, 3];
final conjunto = {10, 20, 30};
final mapa = {'a': 1, 'b': 2};

for (final x in lista) print(x);            // 1 2 3
for (final x in conjunto) print(x);         // 10 20 30
for (final v in mapa.values) print(v);      // 1 2
for (final k in mapa.keys) print(k);        // a b`}),e.jsx("h2",{children:"Lazy vs eager: a diferença que causa bugs"}),e.jsxs("p",{children:["Métodos como ",e.jsx("code",{children:"map"}),", ",e.jsx("code",{children:"where"}),", ",e.jsx("code",{children:"expand"})," ","retornam um ",e.jsx("strong",{children:"Iterable preguiçoso"})," — ele ",e.jsx("em",{children:"guarda a receita"})," mas não calcula nada até alguém iterar. Já ",e.jsx("code",{children:"toList()"}),","," ",e.jsx("code",{children:"toSet()"}),", ",e.jsx("code",{children:"reduce"}),", ",e.jsx("code",{children:"length"})," forçam o cálculo (eager)."]}),e.jsx(a,{title:"Pipeline lazy: nada roda até iterar",code:`final numeros = [1, 2, 3, 4, 5];

final pipeline = numeros
    .where((x) {
      print('filtrando $x');     // só executa na hora da iteração
      return x.isEven;
    })
    .map((x) => x * 10);

print('antes do for');
for (final x in pipeline) {
  print('item: $x');
}
// Saída:
// antes do for
// filtrando 1
// filtrando 2
// item: 20
// filtrando 3
// filtrando 4
// item: 40
// filtrando 5`}),e.jsxs(r,{type:"warning",title:"Iterar duas vezes = trabalhar duas vezes",children:["Se você guardar um ",e.jsx("code",{children:"Iterable"})," lazy e iterar duas vezes, o pipeline roda duas vezes. Se houver chamada de rede ou cálculo pesado dentro do"," ",e.jsx("code",{children:"map"}),", é desperdício. Materialize com ",e.jsx("code",{children:".toList()"})," ","quando for reusar."]}),e.jsx("h2",{children:"Geradores: criando Iterables com sync*"}),e.jsxs("p",{children:["Você pode criar seu próprio Iterable preguiçoso com a sintaxe"," ",e.jsx("code",{children:"sync*"})," e a palavra-chave ",e.jsx("code",{children:"yield"}),". Cada"," ",e.jsx("code",{children:"yield"})," entrega um valor; a função pausa e só retoma quando o consumidor pede o próximo:"]}),e.jsx(a,{title:"Gerador: contagem sob demanda",code:`Iterable<int> contar(int n) sync* {
  for (var i = 1; i <= n; i++) {
    yield i;          // entrega o valor; pausa aqui
  }
}

// Sequências infinitas são ok porque é lazy!
Iterable<int> naturais() sync* {
  var i = 1;
  while (true) yield i++;
}

// Pega só os primeiros 5 — não trava
final primeiros = naturais().take(5).toList(); // [1,2,3,4,5]

for (final i in contar(3)) print(i); // 1 2 3`}),e.jsx("h2",{children:"Métodos essenciais que vivem em Iterable"}),e.jsx(a,{title:"Conhecer esses métodos = produtividade real",code:`final n = [1, 2, 3, 4, 5];

n.any((x) => x > 4);          // true — algum bate?
n.every((x) => x > 0);        // true — todos batem?
n.firstWhere((x) => x.isEven, orElse: () => -1); // 2
n.take(3);                    // (1, 2, 3) — Iterable lazy
n.skip(2);                    // (3, 4, 5)
n.expand((x) => [x, -x]);     // (1,-1, 2,-2, ...) — achata
n.followedBy([10, 20]);       // (1,2,3,4,5,10,20)
n.toSet();                    // {1,2,3,4,5}
n.toList();                   // materializa em List`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Esquecer ",e.jsx("code",{children:".toList()"})," e passar um Iterable lazy onde o Flutter espera ",e.jsx("code",{children:"List"})," (ex.: ",e.jsx("code",{children:"children:"})," de Column)."]}),e.jsxs("li",{children:["Usar ",e.jsx("code",{children:"length"})," num Iterable infinito ou caro — força percorrer tudo só para contar."]}),e.jsxs("li",{children:[e.jsx("code",{children:"firstWhere"})," sem ",e.jsx("code",{children:"orElse"})," dispara"," ",e.jsx("code",{children:"StateError"})," se nada bater."]}),e.jsxs("li",{children:["Confundir ",e.jsx("code",{children:"map"})," de Iterable com ",e.jsx("code",{children:"Map"})," (a coleção). O método sobre Map devolve outro Map; sobre Iterable devolve outro Iterable."]})]}),e.jsxs(r,{type:"info",title:"Dica de leitura de stack trace",children:["Quando aparece ",e.jsx("code",{children:"WhereIterable"}),", ",e.jsx("code",{children:"MappedIterable"})," ",'numa exceção, você está vendo a "receita lazy" do Dart. Procurar'," ",e.jsx("code",{children:".toList()"})," ou um ",e.jsx("code",{children:"for"})," próximo te leva ao ponto onde o pipeline foi materializado."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Encadeie operações funcionais para descrever transformações; chame ",e.jsx("code",{children:"toList()"})," só no final."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"sync*"})," para criar sequências de tamanho indefinido sem alocar tudo na memória."]}),e.jsxs("li",{children:["Quando precisar acessar por índice, transforme em ",e.jsx("code",{children:"List"}),"; Iterable não tem ",e.jsx("code",{children:"[i]"}),"."]}),e.jsxs("li",{children:["Para iteração assíncrona (HTTP, arquivos, sockets), o equivalente é ",e.jsx("code",{children:"Stream"})," + ",e.jsx("code",{children:"async*"}),"."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Iterables são a base síncrona. Sua versão assíncrona é ",e.jsx("strong",{children:"Stream"})," — que vai aparecer mais à frente quando falarmos de Futures e dados em tempo real. Por agora, partimos para ",e.jsx("strong",{children:"Classes"}),", onde você cria os tipos próprios que vão dentro dessas coleções."]}),e.jsxs(r,{type:"success",title:"Mentalidade pipeline",children:["Pense em coleções como dados que ",e.jsx("em",{children:"fluem"}),": filtros, transformações, agregações. Esse modelo mental funciona em Dart, JavaScript, Kotlin, Swift e SQL. Ganhar fluência aqui paga dividendos pra carreira inteira."]})]})}export{n as default};
