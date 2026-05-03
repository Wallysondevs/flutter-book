import{j as e}from"./index-D9yRYXwO.js";import{P as i,C as a,A as s}from"./AlertBox-B2Rl5ETq.js";function t(){return e.jsxs(i,{title:"Set",subtitle:"Coleção sem duplicados — útil para tags, IDs únicos e checagens rápidas.",difficulty:"iniciante",timeToRead:"9 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Sempre que você precisa garantir que cada item apareça uma única vez (tags de um post, IDs de favoritos, permissões de um usuário), ",e.jsx("code",{children:"Set"}),' é a ferramenta certa. Além disso, perguntar "essa lista contém X?" num'," ",e.jsx("code",{children:"Set"})," é ",e.jsx("strong",{children:"milhares de vezes mais rápido"})," que numa"," ",e.jsx("code",{children:"List"})," grande."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um ",e.jsx("code",{children:"Set"})," é uma coleção ",e.jsx("strong",{children:"sem ordem garantida"})," e"," ",e.jsx("strong",{children:"sem duplicatas"}),". Tente adicionar algo que já existe e a operação é simplesmente ignorada — não dá erro, só não acontece nada. Pense num saco de bolinhas coloridas: você nunca tem duas vermelhas iguais."]}),e.jsx("h2",{children:"Como o Dart faz"}),e.jsx(a,{title:"Criando um Set",code:`// Literal de Set: chaves { } com valores soltos (sem :)
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
final unicos = lista.toSet();   // {a, b, c}`}),e.jsxs(s,{type:"warning",title:"A pegadinha do { } vazio",children:[e.jsx("code",{children:"var x = {}"})," sem tipo cria um ",e.jsx("strong",{children:"Map"})," vazio, não um Set! Para Set vazio, use ",e.jsx("code",{children:"<String>{}"})," ou declare explicitamente: ",e.jsx("code",{children:"Set<String> x = {};"}),"."]}),e.jsx("h2",{children:"Operações de conjunto (matemática pura)"}),e.jsxs("p",{children:[e.jsx("code",{children:"Set"})," herda das aulas de matemática: união, interseção e diferença. São métodos prontos, super úteis para combinar listas de permissões, filtros, etc."]}),e.jsx(a,{title:"Operações entre conjuntos",code:`final a = {1, 2, 3};
final b = {2, 3, 4};

print(a.union(b));         // {1, 2, 3, 4} — tudo que está em a OU b
print(a.intersection(b));  // {2, 3}       — o que está em ambos
print(a.difference(b));    // {1}          — só em a, não em b

// Checagens
print(a.contains(2));      // true (rápido!)
print(b.contains(99));     // false`}),e.jsx("h2",{children:"Exemplo prático: filtros únicos"}),e.jsxs("p",{children:["Imagine uma loja onde produtos têm várias categorias. Você quer listar todas as categorias ",e.jsx("em",{children:"distintas"})," presentes nos produtos exibidos, sem repetições:"]}),e.jsx(a,{title:"Tirando categorias únicas de uma lista",code:`class Produto {
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
// {esporte, calçado, futebol, roupa}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Confundir ",e.jsx("code",{children:"{}"})," com Set vazio — vira Map. Sempre tipe."]}),e.jsxs("li",{children:["Esperar ordem específica: a iteração padrão (",e.jsx("code",{children:"HashSet"}),") não garante ordem de inserção. Para isso, use ",e.jsx("code",{children:"LinkedHashSet"})," (que é o padrão dos literais) ou ",e.jsx("code",{children:"SplayTreeSet"})," para ordem natural."]}),e.jsxs("li",{children:["Colocar objetos personalizados sem sobrescrever ",e.jsx("code",{children:"=="})," e"," ",e.jsx("code",{children:"hashCode"}),': dois objetos "iguais" semanticamente serão tratados como diferentes.']}),e.jsxs("li",{children:["Tentar acessar por índice (",e.jsx("code",{children:"set[0]"}),") — não existe, Set não tem posição. Converta para List se precisar."]})]}),e.jsxs(s,{type:"info",title:"Performance: O(1) vs O(n)",children:["Procurar um item em ",e.jsx("code",{children:"List"})," percorre tudo no pior caso (O(n)). Em",e.jsx("code",{children:"Set"}),", a busca usa hash e é praticamente constante (O(1)). Numa lista de 100 mil IDs, a diferença é gritante."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Use Set quando a unicidade é parte da regra de negócio."}),e.jsxs("li",{children:["Para classes próprias dentro de Set, sempre implemente ",e.jsx("code",{children:"=="})," e ",e.jsx("code",{children:"hashCode"})," juntos (ou use ",e.jsx("code",{children:"equatable"}),"/",e.jsx("code",{children:"freezed"}),")."]}),e.jsxs("li",{children:["Prefira ",e.jsx("code",{children:"Set"})," a ",e.jsx("code",{children:"List"})," + ",e.jsx("code",{children:"contains"})," para checagens repetidas."]}),e.jsxs("li",{children:["Quando precisar de ordem por inserção, o literal ",e.jsx("code",{children:"{1,2,3}"})," já faz isso (é ",e.jsx("code",{children:"LinkedHashSet"}),")."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Set guarda valores únicos. Quando precisa associar uma ",e.jsx("em",{children:"chave"})," a um"," ",e.jsx("em",{children:"valor"})," (ex.: nome → idade, ID → produto), o capítulo seguinte é"," ",e.jsx("strong",{children:"Map"}),"."]}),e.jsxs(s,{type:"success",title:"Truque útil",children:["Para remover duplicatas de uma lista preservando a ordem original, basta:"," ",e.jsx("code",{children:"lista.toSet().toList()"}),"."]})]})}export{t as default};
