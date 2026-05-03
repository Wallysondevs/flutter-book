import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function SetPage() {
  return (
    <PageContainer
      title="Set"
      subtitle="Coleção sem duplicados — útil para tags, IDs únicos e checagens rápidas."
      difficulty="iniciante"
      timeToRead="9 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Sempre que você precisa garantir que cada item apareça uma única vez (tags
        de um post, IDs de favoritos, permissões de um usuário), <code>Set</code> é a
        ferramenta certa. Além disso, perguntar "essa lista contém X?" num{" "}
        <code>Set</code> é <strong>milhares de vezes mais rápido</strong> que numa{" "}
        <code>List</code> grande.
      </p>

      <h2>O conceito</h2>
      <p>
        Um <code>Set</code> é uma coleção <strong>sem ordem garantida</strong> e{" "}
        <strong>sem duplicatas</strong>. Tente adicionar algo que já existe e a
        operação é simplesmente ignorada — não dá erro, só não acontece nada. Pense
        num saco de bolinhas coloridas: você nunca tem duas vermelhas iguais.
      </p>

      <h2>Como o Dart faz</h2>
      <CodeBlock
        title="Criando um Set"
        code={`// Literal de Set: chaves { } com valores soltos (sem :)
final tags = <String>{'flutter', 'dart', 'mobile'};

// Tentando duplicar — silenciosamente ignorado
tags.add('flutter');
print(tags.length);   // 3

// Vazio precisa do tipo (senão vira Map<dynamic, dynamic>!)
final ids = <int>{};
ids.add(1);
ids.add(2);
ids.add(1);           // ignora
print(ids);           // {1, 2}

// A partir de uma lista (remove duplicatas naturalmente)
final lista = ['a', 'b', 'a', 'c', 'b'];
final unicos = lista.toSet();   // {a, b, c}`}
      />

      <AlertBox type="warning" title="A pegadinha do { } vazio">
        <code>{`var x = {}`}</code> sem tipo cria um <strong>Map</strong> vazio, não
        um Set! Para Set vazio, use <code>{`<String>{}`}</code> ou declare
        explicitamente: <code>{`Set<String> x = {};`}</code>.
      </AlertBox>

      <h2>Operações de conjunto (matemática pura)</h2>
      <p>
        <code>Set</code> herda das aulas de matemática: união, interseção e
        diferença. São métodos prontos, super úteis para combinar listas de
        permissões, filtros, etc.
      </p>

      <CodeBlock
        title="Operações entre conjuntos"
        code={`final a = {1, 2, 3};
final b = {2, 3, 4};

print(a.union(b));         // {1, 2, 3, 4} — tudo que está em a OU b
print(a.intersection(b));  // {2, 3}       — o que está em ambos
print(a.difference(b));    // {1}          — só em a, não em b

// Checagens
print(a.contains(2));      // true (rápido!)
print(b.contains(99));     // false`}
      />

      <h2>Exemplo prático: filtros únicos</h2>
      <p>
        Imagine uma loja onde produtos têm várias categorias. Você quer listar todas
        as categorias <em>distintas</em> presentes nos produtos exibidos, sem
        repetições:
      </p>

      <CodeBlock
        title="Tirando categorias únicas de uma lista"
        code={`class Produto {
  final String nome;
  final List<String> categorias;
  Produto(this.nome, this.categorias);
}

final produtos = [
  Produto('Tênis', ['esporte', 'calçado']),
  Produto('Chuteira', ['esporte', 'futebol', 'calçado']),
  Produto('Camisa', ['roupa', 'esporte']),
];

// Junta todas as categorias e elimina duplicatas
final categoriasUnicas = produtos
    .expand((p) => p.categorias)   // achata em uma lista única
    .toSet();                      // remove duplicatas

print(categoriasUnicas);
// {esporte, calçado, futebol, roupa}`}
      />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>
          Confundir <code>{`{}`}</code> com Set vazio — vira Map. Sempre tipe.
        </li>
        <li>
          Esperar ordem específica: a iteração padrão (<code>HashSet</code>) não
          garante ordem de inserção. Para isso, use <code>LinkedHashSet</code> (que é o padrão dos literais) ou <code>SplayTreeSet</code> para ordem natural.
        </li>
        <li>
          Colocar objetos personalizados sem sobrescrever <code>==</code> e{" "}
          <code>hashCode</code>: dois objetos "iguais" semanticamente serão tratados
          como diferentes.
        </li>
        <li>
          Tentar acessar por índice (<code>set[0]</code>) — não existe, Set não tem
          posição. Converta para List se precisar.
        </li>
      </ul>

      <AlertBox type="info" title="Performance: O(1) vs O(n)">
        Procurar um item em <code>List</code> percorre tudo no pior caso (O(n)). Em
        <code>Set</code>, a busca usa hash e é praticamente constante (O(1)). Numa
        lista de 100 mil IDs, a diferença é gritante.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Use Set quando a unicidade é parte da regra de negócio.</li>
        <li>Para classes próprias dentro de Set, sempre implemente <code>==</code> e <code>hashCode</code> juntos (ou use <code>equatable</code>/<code>freezed</code>).</li>
        <li>Prefira <code>Set</code> a <code>List</code> + <code>contains</code> para checagens repetidas.</li>
        <li>Quando precisar de ordem por inserção, o literal <code>{`{1,2,3}`}</code> já faz isso (é <code>LinkedHashSet</code>).</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Set guarda valores únicos. Quando precisa associar uma <em>chave</em> a um{" "}
        <em>valor</em> (ex.: nome → idade, ID → produto), o capítulo seguinte é{" "}
        <strong>Map</strong>.
      </p>

      <AlertBox type="success" title="Truque útil">
        Para remover duplicatas de uma lista preservando a ordem original, basta:{" "}
        <code>{`lista.toSet().toList()`}</code>.
      </AlertBox>
    </PageContainer>
  );
}
