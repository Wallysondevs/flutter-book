import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function MapPage() {
  return (
    <PageContainer
      title="Map"
      subtitle="Pares chave-valor — base de JSON, configurações e dicionários."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quase tudo que vem da internet (API REST, Firebase, configurações JSON)
        chega no seu app como <code>Map&lt;String, dynamic&gt;</code>. Saber criar,
        ler e iterar Maps é pré-requisito para consumir qualquer backend e para
        guardar configurações no app.
      </p>

      <h2>O conceito</h2>
      <p>
        Um <code>Map</code> é uma coleção de pares <strong>chave → valor</strong>.
        Pense numa lista telefônica antiga: você procura pelo nome (chave) e acha o
        telefone (valor). Cada chave é única dentro do Map; valores podem se
        repetir. As chaves não têm ordem garantida (mas o literal padrão preserva
        a ordem de inserção).
      </p>

      <h2>Como o Dart faz</h2>
      <CodeBlock
        title="Criando e modificando Maps"
        code={`// Literal: { chave: valor, chave: valor }
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
idades.remove('Ana');`}
      />

      <AlertBox type="warning" title="Acesso retorna nullable">
        <code>map[chave]</code> sempre devolve um tipo opcional, porque a chave pode
        não existir. Trate com <code>??</code> para fallback ou cheque com{" "}
        <code>containsKey</code> antes.
      </AlertBox>

      <h2>Iteração: três jeitos comuns</h2>
      <CodeBlock
        title="Percorrendo um Map"
        code={`final idades = {'Ana': 30, 'Bruno': 25, 'Cris': 28};

// 1) forEach: bom para efeito colateral (print, log)
idades.forEach((nome, idade) {
  print('\$nome tem \$idade anos');
});

// 2) for-in nas entries: tem 'key' e 'value'
for (final e in idades.entries) {
  print('\${e.key} -> \${e.value}');
}

// 3) Iterar só chaves ou só valores
for (final nome in idades.keys) print(nome);
for (final idade in idades.values) print(idade);`}
      />

      <h2>Exemplo prático: lendo JSON da API</h2>
      <p>
        Toda resposta JSON vira um <code>Map&lt;String, dynamic&gt;</code>. O{" "}
        <code>dynamic</code> é necessário porque cada campo pode ser de um tipo
        diferente (string, número, lista, outro objeto). Cabe a você fazer o cast
        para o tipo certo:
      </p>

      <CodeBlock
        title="Parseando uma resposta da API"
        code={`import 'dart:convert';

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

print('\$nome (#\$id) ativo=\$ativo tags=\$tags');
// Ana Souza (#42) ativo=true tags=[admin, beta]`}
      />

      <h2>Transformações úteis</h2>
      <CodeBlock
        title="Operações funcionais em Maps"
        code={`final precos = {'pão': 1.5, 'leite': 5.0, 'café': 12.0};

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
final preco = precos['queijo'] ?? 0.0;`}
      />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>
          Chave inexistente devolve null silenciosamente — fácil esquecer e crashar
          ao chamar método.
        </li>
        <li>
          Cast de campo errado: <code>json['id'] as String</code> quando vem int
          dispara <code>TypeError</code>. Confira o JSON real.
        </li>
        <li>
          Iterar e modificar o Map ao mesmo tempo dispara{" "}
          <code>ConcurrentModificationError</code>. Colete chaves a alterar e aplique
          depois.
        </li>
        <li>
          Comparar dois Maps com <code>==</code> compara identidade. Use{" "}
          <code>mapEquals</code> de <code>flutter/foundation.dart</code> para
          comparar conteúdo.
        </li>
      </ul>

      <AlertBox type="info" title="JSON aninhado fica trabalhoso">
        Para APIs reais, parsear Maps "na mão" cresce rápido. Quando for um projeto
        sério, gere modelos com <code>json_serializable</code> ou{" "}
        <code>freezed</code> — você ganha cast automático, igualdade e copyWith.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Sempre tipe: <code>Map&lt;String, int&gt;</code> em vez de <code>Map</code>.</li>
        <li>Use <code>?? valor</code> para acesso seguro com fallback explícito.</li>
        <li>Para configurações imutáveis, crie com <code>const</code>.</li>
        <li>Modele dados estruturados como classes (ou records); use Map só para configurações dinâmicas e JSON cru.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        List, Set e Map compartilham uma "interface mãe" chamada <strong>Iterable</strong> —
        é dela que vêm <code>map</code>, <code>where</code>, <code>fold</code> etc.
        O próximo capítulo destrincha isso e explica a diferença entre operações
        preguiçosas e materializadas.
      </p>

      <AlertBox type="success" title="Atalho prático">
        Para acessar valores aninhados sem explodir, use o operador <code>?.</code>{" "}
        em cadeia: <code>{`(json['endereco'] as Map?)?['cidade']`}</code>. Cada nível
        ausente vira null, sem crash.
      </AlertBox>
    </PageContainer>
  );
}
