import{j as e}from"./index-D4AOhXGO.js";import{P as i,C as r,A as o}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(i,{title:"Loops",subtitle:"for, for-in, while e métodos funcionais — quando usar cada um.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Repetir tarefas é a essência de quase todo programa: percorrer uma lista de produtos, gerar widgets numa tela, processar respostas de API. Dart oferece ",e.jsx("strong",{children:"laços imperativos"})," (",e.jsx("code",{children:"for"}),", ",e.jsx("code",{children:"while"}),") e uma API ",e.jsx("strong",{children:"funcional rica"})," (",e.jsx("code",{children:"map"}),", ",e.jsx("code",{children:"where"}),", ",e.jsx("code",{children:"fold"}),") — escolher bem deixa o código mais claro."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um loop executa um bloco de código várias vezes. Você pode controlar quantas vezes pelo ",e.jsx("em",{children:"índice"})," (",e.jsx("code",{children:"for"})," clássico), pelo ",e.jsx("em",{children:"conteúdo"})," de uma coleção (",e.jsx("code",{children:"for-in"}),"), por uma ",e.jsx("em",{children:"condição"})," (",e.jsx("code",{children:"while"}),") ou substituir tudo isso por ",e.jsx("em",{children:"operações em coleção"})," que descrevem a transformação em vez do passo a passo."]}),e.jsx("h2",{children:"Sintaxes imperativas"}),e.jsx(r,{title:"for, for-in, while",code:`// for clássico (use quando precisa do índice)
for (int i = 0; i < 5; i++) {
  print(i); // 0 1 2 3 4
}

// for-in (use para percorrer coleções)
final frutas = ['maçã', 'banana', 'uva'];
for (final fruta in frutas) {
  print(fruta);
}

// while (use quando não sabe quantas vezes)
int n = 1;
while (n < 100) {
  n *= 2;
}
print(n); // 128

// do-while (executa pelo menos uma vez)
int tentativas = 0;
do {
  tentativas++;
} while (tentativas < 3);

// break e continue
for (int i = 0; i < 10; i++) {
  if (i == 3) continue; // pula
  if (i == 7) break;    // sai
  print(i); // 0 1 2 4 5 6
}`}),e.jsx("h2",{children:"Estilo funcional"}),e.jsx(r,{title:"map, where, fold, reduce",code:`final numeros = [1, 2, 3, 4, 5, 6];

// where: filtra (lazy — vira Iterable)
final pares = numeros.where((n) => n.isEven).toList();
// [2, 4, 6]

// map: transforma cada elemento
final dobrados = numeros.map((n) => n * 2).toList();
// [2, 4, 6, 8, 10, 12]

// fold: acumula com valor inicial
final soma = numeros.fold<int>(0, (acc, n) => acc + n);
// 21

// reduce: como fold, mas sem valor inicial
final max = numeros.reduce((a, b) => a > b ? a : b);
// 6

// Encadeando — o famoso "pipeline":
final somaDosParesDobrados = numeros
    .where((n) => n.isEven)
    .map((n) => n * 2)
    .fold<int>(0, (acc, n) => acc + n);
// 24

// any / every
print(numeros.any((n) => n > 5));   // true
print(numeros.every((n) => n > 0)); // true`}),e.jsxs(o,{type:"info",title:"Iterable é lazy",children:[e.jsx("code",{children:"where"})," e ",e.jsx("code",{children:"map"})," retornam um ",e.jsx("code",{children:"Iterable"})," que só executa ao ser percorrido (com ",e.jsx("code",{children:"toList()"}),", ",e.jsx("code",{children:"forEach"})," ou em loop). Encadeie quantas operações quiser sem custo extra de memória até o ",e.jsx("code",{children:"toList"})," final."]}),e.jsx("h2",{children:"Exemplo prático em Flutter"}),e.jsx(r,{title:"gerando widgets numa tela",code:`import 'package:flutter/material.dart';

class ListaProdutos extends StatelessWidget {
  final List<String> produtos;
  const ListaProdutos({super.key, required this.produtos});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        // Ouro: spread + map gera N widgets numa lista existente
        const Text('Promoções:'),
        ...produtos.map((p) => ListTile(title: Text(p))),
      ],
    );
  }
}

// Para listas longas, prefira ListView.builder, que constrói só
// o que está visível em tela:
ListView.builder(
  itemCount: produtos.length,
  itemBuilder: (context, i) => ListTile(title: Text(produtos[i])),
);`}),e.jsx("h2",{children:"Iterar mapas e índices"}),e.jsx(r,{title:"padrões úteis",code:`final idades = {'Ana': 30, 'Bruno': 25};

// Percorrer chaves e valores:
for (final entry in idades.entries) {
  print('\${entry.key}: \${entry.value}');
}

// Ou:
idades.forEach((nome, idade) => print('$nome: $idade'));

// Pegar índice + valor numa lista:
final nomes = ['Ana', 'Bruno', 'Carla'];
for (final (i, nome) in nomes.indexed) {
  print('$i -> $nome');
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Modificar coleção dentro do loop"}),": adicionar/remover de uma lista enquanto a percorre dispara ",e.jsx("code",{children:"ConcurrentModificationError"}),". Itere sobre uma cópia ou colete mudanças primeiro."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"toList()"})]}),": ",e.jsx("code",{children:"numeros.map(...)"})," retorna ",e.jsx("code",{children:"Iterable"})," preguiçoso. Precisa materializar para usar como ",e.jsx("code",{children:"List"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Loop infinito"}),": ",e.jsx("code",{children:"while (true)"})," sem condição de saída ou ",e.jsx("code",{children:"for"})," com incremento errado. Sempre prove para si mesmo que o loop termina."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Performance em UI"}),": gerar 10.000 widgets com ",e.jsx("code",{children:"map"})," dentro de ",e.jsx("code",{children:"ListView(children: ...)"})," trava o app. Use ",e.jsx("code",{children:"ListView.builder"}),"."]})]}),e.jsxs(o,{type:"warning",title:"forEach em coleções é discutível",children:[e.jsx("code",{children:"forEach((x) => ...)"})," não permite ",e.jsx("code",{children:"break"}),", ",e.jsx("code",{children:"continue"})," nem ",e.jsx("code",{children:"return"})," da função externa. Para lógica simples vai bem; para qualquer coisa com saída precoce ou ",e.jsx("code",{children:"await"}),", use ",e.jsx("code",{children:"for-in"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(o,{type:"tip",title:"Como decidir",children:["Use ",e.jsx("code",{children:"for-in"})," quando o foco é ",e.jsx("em",{children:"fazer algo"})," com cada item (efeito colateral, ",e.jsx("code",{children:"await"}),"). Use ",e.jsx("code",{children:"map"}),"/",e.jsx("code",{children:"where"}),"/",e.jsx("code",{children:"fold"})," quando o foco é ",e.jsx("em",{children:"transformar"})," uma coleção em outra. Reserve ",e.jsx("code",{children:"for (int i = 0; ...)"})," para quando você realmente precisa do índice ou de pular passos."]}),e.jsx("h2",{children:"Próximos passos"}),e.jsx("p",{children:"Você já consegue escrever programas Dart pequenos com decisões e repetições. A partir daqui entramos em coleções avançadas, funções e classes — o caminho para construir UIs reais em Flutter."}),e.jsxs(o,{type:"success",title:"Continue lendo",children:["Próximo: ",e.jsx("em",{children:"Listas, Sets e Mapas"}),"."]})]})}export{n as default};
