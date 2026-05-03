import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Iterables() {
  return (
    <PageContainer
      title="Iterables & Spread"
      subtitle="A interface comum por trás de List, Set e Map — e por que importa entender lazy."
      difficulty="intermediario"
      timeToRead="11 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quando você aprende <code>List.map</code>, <code>Set.where</code> e os
        <code>values</code> de um <code>Map</code>, percebe que todos têm os mesmos
        métodos. Não é coincidência: por baixo, todos implementam{" "}
        <strong>Iterable</strong>. Entender isso te ajuda a criar pipelines
        eficientes, evitar trabalho dobrado e usar geradores (<code>sync*</code>) para
        produzir sequências sob demanda.
      </p>

      <h2>O conceito</h2>
      <p>
        Um <code>Iterable&lt;T&gt;</code> é "qualquer coisa pela qual você pode
        passar um item de cada vez". É o contrato mínimo: tem <code>iterator</code>,
        que entrega elementos em sequência. <code>List</code>, <code>Set</code>,
        valores de <code>Map</code>, ranges, streams síncronas — todos são
        iteráveis. O <code>for-in</code> funciona em qualquer um deles.
      </p>

      <CodeBlock
        title="O for-in funciona em qualquer Iterable"
        code={`final lista = [1, 2, 3];
final conjunto = {10, 20, 30};
final mapa = {'a': 1, 'b': 2};

for (final x in lista) print(x);            // 1 2 3
for (final x in conjunto) print(x);         // 10 20 30
for (final v in mapa.values) print(v);      // 1 2
for (final k in mapa.keys) print(k);        // a b`}
      />

      <h2>Lazy vs eager: a diferença que causa bugs</h2>
      <p>
        Métodos como <code>map</code>, <code>where</code>, <code>expand</code>{" "}
        retornam um <strong>Iterable preguiçoso</strong> — ele <em>guarda a
        receita</em> mas não calcula nada até alguém iterar. Já <code>toList()</code>,{" "}
        <code>toSet()</code>, <code>reduce</code>, <code>length</code> forçam o
        cálculo (eager).
      </p>

      <CodeBlock
        title="Pipeline lazy: nada roda até iterar"
        code={`final numeros = [1, 2, 3, 4, 5];

final pipeline = numeros
    .where((x) {
      print('filtrando \$x');     // só executa na hora da iteração
      return x.isEven;
    })
    .map((x) => x * 10);

print('antes do for');
for (final x in pipeline) {
  print('item: \$x');
}
// Saída:
// antes do for
// filtrando 1
// filtrando 2
// item: 20
// filtrando 3
// filtrando 4
// item: 40
// filtrando 5`}
      />

      <AlertBox type="warning" title="Iterar duas vezes = trabalhar duas vezes">
        Se você guardar um <code>Iterable</code> lazy e iterar duas vezes, o pipeline
        roda duas vezes. Se houver chamada de rede ou cálculo pesado dentro do{" "}
        <code>map</code>, é desperdício. Materialize com <code>.toList()</code>{" "}
        quando for reusar.
      </AlertBox>

      <h2>Geradores: criando Iterables com sync*</h2>
      <p>
        Você pode criar seu próprio Iterable preguiçoso com a sintaxe{" "}
        <code>sync*</code> e a palavra-chave <code>yield</code>. Cada{" "}
        <code>yield</code> entrega um valor; a função pausa e só retoma quando o
        consumidor pede o próximo:
      </p>

      <CodeBlock
        title="Gerador: contagem sob demanda"
        code={`Iterable<int> contar(int n) sync* {
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

for (final i in contar(3)) print(i); // 1 2 3`}
      />

      <h2>Métodos essenciais que vivem em Iterable</h2>
      <CodeBlock
        title="Conhecer esses métodos = produtividade real"
        code={`final n = [1, 2, 3, 4, 5];

n.any((x) => x > 4);          // true — algum bate?
n.every((x) => x > 0);        // true — todos batem?
n.firstWhere((x) => x.isEven, orElse: () => -1); // 2
n.take(3);                    // (1, 2, 3) — Iterable lazy
n.skip(2);                    // (3, 4, 5)
n.expand((x) => [x, -x]);     // (1,-1, 2,-2, ...) — achata
n.followedBy([10, 20]);       // (1,2,3,4,5,10,20)
n.toSet();                    // {1,2,3,4,5}
n.toList();                   // materializa em List`}
      />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>
          Esquecer <code>.toList()</code> e passar um Iterable lazy onde o Flutter
          espera <code>List</code> (ex.: <code>children:</code> de Column).
        </li>
        <li>
          Usar <code>length</code> num Iterable infinito ou caro — força percorrer
          tudo só para contar.
        </li>
        <li>
          <code>firstWhere</code> sem <code>orElse</code> dispara{" "}
          <code>StateError</code> se nada bater.
        </li>
        <li>
          Confundir <code>map</code> de Iterable com <code>Map</code> (a coleção). O
          método sobre Map devolve outro Map; sobre Iterable devolve outro Iterable.
        </li>
      </ul>

      <AlertBox type="info" title="Dica de leitura de stack trace">
        Quando aparece <code>WhereIterable</code>, <code>MappedIterable</code>{" "}
        numa exceção, você está vendo a "receita lazy" do Dart. Procurar{" "}
        <code>.toList()</code> ou um <code>for</code> próximo te leva ao ponto onde
        o pipeline foi materializado.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Encadeie operações funcionais para descrever transformações; chame <code>toList()</code> só no final.</li>
        <li>Use <code>sync*</code> para criar sequências de tamanho indefinido sem alocar tudo na memória.</li>
        <li>Quando precisar acessar por índice, transforme em <code>List</code>; Iterable não tem <code>[i]</code>.</li>
        <li>Para iteração assíncrona (HTTP, arquivos, sockets), o equivalente é <code>Stream</code> + <code>async*</code>.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Iterables são a base síncrona. Sua versão assíncrona é <strong>Stream</strong> —
        que vai aparecer mais à frente quando falarmos de Futures e dados em
        tempo real. Por agora, partimos para <strong>Classes</strong>, onde você
        cria os tipos próprios que vão dentro dessas coleções.
      </p>

      <AlertBox type="success" title="Mentalidade pipeline">
        Pense em coleções como dados que <em>fluem</em>: filtros, transformações,
        agregações. Esse modelo mental funciona em Dart, JavaScript, Kotlin, Swift
        e SQL. Ganhar fluência aqui paga dividendos pra carreira inteira.
      </AlertBox>
    </PageContainer>
  );
}
