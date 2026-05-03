import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ListPage() {
  return (
    <PageContainer
      title="List"
      subtitle="A coleção mais usada em Flutter — base de listas, models e construção de UI."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Toda tela com várias linhas usa <code>List</code>: feed de posts, lista de
        produtos, mensagens de chat, opções de menu. <code>ListView.builder</code>,{" "}
        <code>Column</code> e <code>Row</code> recebem listas de widgets. Saber criar,
        filtrar e transformar listas é literalmente o "arroz com feijão" do dia a dia
        em Flutter.
      </p>

      <h2>O conceito</h2>
      <p>
        Uma <code>List</code> é uma sequência <strong>ordenada</strong> de itens
        acessíveis por índice (<code>0, 1, 2…</code>). Imagine uma fila numerada: o
        primeiro da fila é o índice 0. Listas em Dart são tipadas (<code>List&lt;int&gt;</code>,{" "}
        <code>List&lt;Pessoa&gt;</code>) — o compilador garante que você só insira do
        tipo certo.
      </p>

      <h2>Como o Dart faz</h2>
      <CodeBlock
        title="Criando listas"
        code={`// Lista LITERAL: o tipo é inferido de [1, 2, 3] -> List<int>
final numeros = [1, 2, 3];

// Vazia precisa do tipo explícito (não dá pra inferir nada)
final nomes = <String>[];
nomes.add('Ana');
nomes.add('Bruno');

// Imutável: const não permite mais alterações
const semanas = ['seg', 'ter', 'qua'];
// semanas.add('qui'); // erro em runtime: lista é unmodifiable

// Tamanho fixo
final fixa = List<int>.filled(3, 0); // [0, 0, 0]`}
      />

      <h2>Operações fundamentais</h2>
      <CodeBlock
        title="Acesso e modificação"
        code={`final tarefas = ['estudar', 'treinar', 'cozinhar'];

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
final temLer = tarefas.contains('ler');`}
      />

      <h2>Operações funcionais (o que você usa todo dia)</h2>
      <p>
        São métodos que recebem uma função e devolvem um novo Iterable. Não modificam
        a lista original — perfeitos para construir UI a partir de dados:
      </p>

      <CodeBlock
        title="map, where, reduce, fold, sort"
        code={`final n = [1, 2, 3, 4, 5];

// where: filtra mantendo só quem passa no teste
final pares = n.where((x) => x.isEven).toList();   // [2, 4]

// map: transforma cada item em outra coisa
final dobrados = n.map((x) => x * 2).toList();     // [2,4,6,8,10]

// reduce: combina tudo num único valor (precisa ter ao menos 1 item)
final soma = n.reduce((acc, x) => acc + x);        // 15

// fold: como reduce, mas com valor inicial e tipo livre
final concat = n.fold<String>('', (s, x) => '\$s\$x'); // "12345"

// sort: ordena no lugar (modifica a lista original!)
final copia = [...n]..sort((a, b) => b.compareTo(a)); // [5,4,3,2,1]`}
      />

      <AlertBox type="tip" title="Por que tantos .toList()?">
        <code>map</code> e <code>where</code> retornam um <code>Iterable</code>{" "}
        <em>preguiçoso</em> — só roda quando você itera. Para guardar o resultado,
        ou usar em widgets que esperam <code>List</code>, materialize com{" "}
        <code>.toList()</code>.
      </AlertBox>

      <h2>Spread, collection-if e collection-for</h2>
      <p>
        Recursos do Dart que deixam a construção de listas (e de árvores de widgets!)
        muito mais legível:
      </p>

      <CodeBlock
        title="Construção declarativa de listas"
        code={`final base = [1, 2, 3];
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
);`}
      />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>
          Acessar um índice fora do tamanho dispara <code>RangeError</code>.
          Cheque <code>length</code> ou use <code>elementAtOrNull</code>.
        </li>
        <li>
          <code>firstWhere</code> sem <code>orElse</code> lança erro se nada bater.
          Use <code>firstWhereOrNull</code> (do <code>collection</code>) ou passe um
          fallback.
        </li>
        <li>
          <code>const</code> em listas literais cria lista <strong>imutável</strong>;
          tentar <code>.add()</code> nela explode em runtime.
        </li>
        <li>
          <code>list1 == list2</code> compara por <em>identidade</em>, não pelo
          conteúdo. Use <code>listEquals</code> (do <code>flutter/foundation.dart</code>).
        </li>
      </ul>

      <AlertBox type="warning" title="Modificando enquanto itera">
        Não chame <code>add</code> ou <code>remove</code> dentro de um <code>for</code>{" "}
        que percorre a mesma lista — você vai pegar <code>ConcurrentModificationError</code>.
        Trabalhe sobre uma cópia (<code>[...lista]</code>) ou colete o que vai mudar
        e aplique depois.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Tipar sempre (<code>List&lt;Produto&gt;</code> em vez de <code>List</code> cru).</li>
        <li>Preferir métodos funcionais (<code>map</code>, <code>where</code>) a loops manuais quando o objetivo é transformar.</li>
        <li>Para listas que viram UI, use <code>const</code> nos itens estáticos para o Flutter pular reconstrução.</li>
        <li>Quando precisar de busca rápida por valor, considere migrar para <code>Set</code> ou <code>Map</code>.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Listas guardam ordem e permitem duplicados. Quando você quer o oposto —
        valores únicos — entra <strong>Set</strong>. Para pares chave→valor, vá para{" "}
        <strong>Map</strong>. Os três compartilham a interface <strong>Iterable</strong>{" "}
        (capítulo seguinte).
      </p>

      <AlertBox type="success" title="Conexão com Flutter">
        <code>ListView.builder</code> recebe <code>itemCount</code> e
        <code>itemBuilder</code> — exatamente um <code>List</code> e uma função que
        transforma cada índice em widget. Quando você dominar List, ListView vira
        natural.
      </AlertBox>
    </PageContainer>
  );
}
