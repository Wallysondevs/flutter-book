import{j as e}from"./index-D9yRYXwO.js";import{P as r,C as a,A as o}from"./AlertBox-B2Rl5ETq.js";function n(){return e.jsxs(r,{title:"Map",subtitle:"Pares chave-valor — base de JSON, configurações e dicionários.",difficulty:"iniciante",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quase tudo que vem da internet (API REST, Firebase, configurações JSON) chega no seu app como ",e.jsx("code",{children:"Map<String, dynamic>"}),". Saber criar, ler e iterar Maps é pré-requisito para consumir qualquer backend e para guardar configurações no app."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um ",e.jsx("code",{children:"Map"})," é uma coleção de pares ",e.jsx("strong",{children:"chave → valor"}),". Pense numa lista telefônica antiga: você procura pelo nome (chave) e acha o telefone (valor). Cada chave é única dentro do Map; valores podem se repetir. As chaves não têm ordem garantida (mas o literal padrão preserva a ordem de inserção)."]}),e.jsx("h2",{children:"Como o Dart faz"}),e.jsx(a,{title:"Criando e modificando Maps",code:`// Literal: { chave: valor, chave: valor }
final idades = <String, int>{
  'Ana': 30,
  'Bruno': 25,
};

// Inserir / atualizar
idades['Cris'] = 28;       // adiciona
idades['Ana'] = 31;        // sobrescreve

// Ler — atenção: retorna int? (pode não existir!)
final anaIdade = idades['Ana'];          // int?
final naoExiste = idades['Zeca'];        // null

// Existência da chave
if (idades.containsKey('Bruno')) { /* ... */ }

// Remover
idades.remove('Ana');`}),e.jsxs(o,{type:"warning",title:"Acesso retorna nullable",children:[e.jsx("code",{children:"map[chave]"})," sempre devolve um tipo opcional, porque a chave pode não existir. Trate com ",e.jsx("code",{children:"??"})," para fallback ou cheque com"," ",e.jsx("code",{children:"containsKey"})," antes."]}),e.jsx("h2",{children:"Iteração: três jeitos comuns"}),e.jsx(a,{title:"Percorrendo um Map",code:`final idades = {'Ana': 30, 'Bruno': 25, 'Cris': 28};

// 1) forEach: bom para efeito colateral (print, log)
idades.forEach((nome, idade) {
  print('$nome tem $idade anos');
});

// 2) for-in nas entries: tem 'key' e 'value'
for (final e in idades.entries) {
  print('\${e.key} -> \${e.value}');
}

// 3) Iterar só chaves ou só valores
for (final nome in idades.keys) print(nome);
for (final idade in idades.values) print(idade);`}),e.jsx("h2",{children:"Exemplo prático: lendo JSON da API"}),e.jsxs("p",{children:["Toda resposta JSON vira um ",e.jsx("code",{children:"Map<String, dynamic>"}),". O"," ",e.jsx("code",{children:"dynamic"})," é necessário porque cada campo pode ser de um tipo diferente (string, número, lista, outro objeto). Cabe a você fazer o cast para o tipo certo:"]}),e.jsx(a,{title:"Parseando uma resposta da API",code:`import 'dart:convert';

final respostaJson = '''
{
  "id": 42,
  "nome": "Ana Souza",
  "ativo": true,
  "tags": ["admin", "beta"]
}
''';

// jsonDecode devolve Object?; precisamos afirmar o tipo
final json = jsonDecode(respostaJson) as Map<String, dynamic>;

// Cast por campo (preserva null safety)
final id    = json['id']    as int;
final nome  = json['nome']  as String;
final ativo = json['ativo'] as bool;
final tags  = (json['tags'] as List).cast<String>();

print('$nome (#$id) ativo=$ativo tags=$tags');
// Ana Souza (#42) ativo=true tags=[admin, beta]`}),e.jsx("h2",{children:"Transformações úteis"}),e.jsx(a,{title:"Operações funcionais em Maps",code:`final precos = {'pão': 1.5, 'leite': 5.0, 'café': 12.0};

// map: transforma cada entry em outra entry
final emCentavos = precos.map(
  (k, v) => MapEntry(k, (v * 100).toInt()),
);
// {pão: 150, leite: 500, café: 1200}

// where via entries: filtra
final caros = Map.fromEntries(
  precos.entries.where((e) => e.value > 4),
);
// {leite: 5.0, café: 12.0}

// Atualizar com função (cria se não existe)
precos.update('pão', (v) => v + 0.5, ifAbsent: () => 0);

// Acesso com fallback (sem null!)
final preco = precos['queijo'] ?? 0.0;`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Chave inexistente devolve null silenciosamente — fácil esquecer e crashar ao chamar método."}),e.jsxs("li",{children:["Cast de campo errado: ",e.jsx("code",{children:"json['id'] as String"})," quando vem int dispara ",e.jsx("code",{children:"TypeError"}),". Confira o JSON real."]}),e.jsxs("li",{children:["Iterar e modificar o Map ao mesmo tempo dispara"," ",e.jsx("code",{children:"ConcurrentModificationError"}),". Colete chaves a alterar e aplique depois."]}),e.jsxs("li",{children:["Comparar dois Maps com ",e.jsx("code",{children:"=="})," compara identidade. Use"," ",e.jsx("code",{children:"mapEquals"})," de ",e.jsx("code",{children:"flutter/foundation.dart"})," para comparar conteúdo."]})]}),e.jsxs(o,{type:"info",title:"JSON aninhado fica trabalhoso",children:['Para APIs reais, parsear Maps "na mão" cresce rápido. Quando for um projeto sério, gere modelos com ',e.jsx("code",{children:"json_serializable"})," ou"," ",e.jsx("code",{children:"freezed"})," — você ganha cast automático, igualdade e copyWith."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Sempre tipe: ",e.jsx("code",{children:"Map<String, int>"})," em vez de ",e.jsx("code",{children:"Map"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"?? valor"})," para acesso seguro com fallback explícito."]}),e.jsxs("li",{children:["Para configurações imutáveis, crie com ",e.jsx("code",{children:"const"}),"."]}),e.jsx("li",{children:"Modele dados estruturados como classes (ou records); use Map só para configurações dinâmicas e JSON cru."})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:['List, Set e Map compartilham uma "interface mãe" chamada ',e.jsx("strong",{children:"Iterable"})," — é dela que vêm ",e.jsx("code",{children:"map"}),", ",e.jsx("code",{children:"where"}),", ",e.jsx("code",{children:"fold"})," etc. O próximo capítulo destrincha isso e explica a diferença entre operações preguiçosas e materializadas."]}),e.jsxs(o,{type:"success",title:"Atalho prático",children:["Para acessar valores aninhados sem explodir, use o operador ",e.jsx("code",{children:"?."})," ","em cadeia: ",e.jsx("code",{children:"(json['endereco'] as Map?)?['cidade']"}),". Cada nível ausente vira null, sem crash."]})]})}export{n as default};
