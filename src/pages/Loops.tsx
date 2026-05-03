import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Loops() {
  return (
    <PageContainer
      title="Loops"
      subtitle="for, for-in, while e métodos funcionais — quando usar cada um."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Repetir tarefas é a essência de quase todo programa: percorrer uma lista de produtos, gerar widgets numa tela, processar respostas de API. Dart oferece <strong>laços imperativos</strong> (<code>for</code>, <code>while</code>) e uma API <strong>funcional rica</strong> (<code>map</code>, <code>where</code>, <code>fold</code>) — escolher bem deixa o código mais claro.
      </p>

      <h2>O conceito</h2>
      <p>
        Um loop executa um bloco de código várias vezes. Você pode controlar quantas vezes pelo <em>índice</em> (<code>for</code> clássico), pelo <em>conteúdo</em> de uma coleção (<code>for-in</code>), por uma <em>condição</em> (<code>while</code>) ou substituir tudo isso por <em>operações em coleção</em> que descrevem a transformação em vez do passo a passo.
      </p>

      <h2>Sintaxes imperativas</h2>
      <CodeBlock title="for, for-in, while" code={`// for clássico (use quando precisa do índice)
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
}`} />

      <h2>Estilo funcional</h2>
      <CodeBlock title="map, where, fold, reduce" code={`final numeros = [1, 2, 3, 4, 5, 6];

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
print(numeros.every((n) => n > 0)); // true`} />

      <AlertBox type="info" title="Iterable é lazy">
        <code>where</code> e <code>map</code> retornam um <code>Iterable</code> que só executa ao ser percorrido (com <code>toList()</code>, <code>forEach</code> ou em loop). Encadeie quantas operações quiser sem custo extra de memória até o <code>toList</code> final.
      </AlertBox>

      <h2>Exemplo prático em Flutter</h2>
      <CodeBlock title="gerando widgets numa tela" code={`import 'package:flutter/material.dart';

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
);`} />

      <h2>Iterar mapas e índices</h2>
      <CodeBlock title="padrões úteis" code={`final idades = {'Ana': 30, 'Bruno': 25};

// Percorrer chaves e valores:
for (final entry in idades.entries) {
  print('\${entry.key}: \${entry.value}');
}

// Ou:
idades.forEach((nome, idade) => print('\$nome: \$idade'));

// Pegar índice + valor numa lista:
final nomes = ['Ana', 'Bruno', 'Carla'];
for (final (i, nome) in nomes.indexed) {
  print('\$i -> \$nome');
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Modificar coleção dentro do loop</strong>: adicionar/remover de uma lista enquanto a percorre dispara <code>ConcurrentModificationError</code>. Itere sobre uma cópia ou colete mudanças primeiro.</li>
        <li><strong>Esquecer <code>toList()</code></strong>: <code>numeros.map(...)</code> retorna <code>Iterable</code> preguiçoso. Precisa materializar para usar como <code>List</code>.</li>
        <li><strong>Loop infinito</strong>: <code>while (true)</code> sem condição de saída ou <code>for</code> com incremento errado. Sempre prove para si mesmo que o loop termina.</li>
        <li><strong>Performance em UI</strong>: gerar 10.000 widgets com <code>map</code> dentro de <code>ListView(children: ...)</code> trava o app. Use <code>ListView.builder</code>.</li>
      </ul>

      <AlertBox type="warning" title="forEach em coleções é discutível">
        <code>forEach((x) =&gt; ...)</code> não permite <code>break</code>, <code>continue</code> nem <code>return</code> da função externa. Para lógica simples vai bem; para qualquer coisa com saída precoce ou <code>await</code>, use <code>for-in</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Como decidir">
        Use <code>for-in</code> quando o foco é <em>fazer algo</em> com cada item (efeito colateral, <code>await</code>). Use <code>map</code>/<code>where</code>/<code>fold</code> quando o foco é <em>transformar</em> uma coleção em outra. Reserve <code>for (int i = 0; ...)</code> para quando você realmente precisa do índice ou de pular passos.
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Você já consegue escrever programas Dart pequenos com decisões e repetições. A partir daqui entramos em coleções avançadas, funções e classes — o caminho para construir UIs reais em Flutter.
      </p>

      <AlertBox type="success" title="Continue lendo">
        Próximo: <em>Listas, Sets e Mapas</em>.
      </AlertBox>
    </PageContainer>
  );
}
