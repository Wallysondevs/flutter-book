import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Json() {
  return (
    <PageContainer
      title="JSON & Serialização"
      subtitle="Do jsonDecode cru aos modelos tipados com json_serializable e freezed."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        APIs REST falam JSON. Mas o Dart é uma linguagem <strong>fortemente tipada</strong> — quanto antes você transformar aquele <code>Map&lt;String, dynamic&gt;</code> recebido da rede em um objeto tipado (<code>Usuario</code>, <code>Pedido</code>...), mais bugs o compilador pega para você. Trabalhar com <code>dynamic</code> espalhado pela tela é fonte garantida de <em>"NoSuchMethodError"</em> em produção.
      </p>

      <h2>O conceito</h2>
      <p>
        Serialização é o caminho de ida e volta:
      </p>
      <ul>
        <li><strong>Decode</strong>: <code>String JSON</code> → <code>Map/List dynamic</code> → <strong>objeto Dart</strong>.</li>
        <li><strong>Encode</strong>: <strong>objeto Dart</strong> → <code>Map</code> → <code>String JSON</code>.</li>
      </ul>
      <p>
        O <code>dart:convert</code> faz a primeira metade (<code>jsonDecode/jsonEncode</code>). A "última milha" — virar um objeto tipado — é com você. Existem três caminhos: <strong>manual</strong>, <strong>json_serializable</strong> (gera o boilerplate) e <strong>freezed</strong> (gera modelo imutável completo).
      </p>

      <AlertBox type="info" title="Map<String, dynamic> é o ponto de encontro">
        Toda solução passa por esse tipo. A diferença é quem escreve o <code>fromJson</code>: você ou o code-gen.
      </AlertBox>

      <h2>Como Flutter/Dart faz: manual</h2>
      <p>
        Sempre comece por aqui — entender o manual deixa o code-gen muito menos mágico depois.
      </p>

      <CodeBlock title="lib/models/usuario.dart" code={`import 'dart:convert';

class Usuario {
  final int id;
  final String nome;
  final String? email; // opcional — pode vir nulo da API

  const Usuario({required this.id, required this.nome, this.email});

  // Construtor nomeado: cria um Usuario a partir do mapa decodificado.
  factory Usuario.fromJson(Map<String, dynamic> j) {
    return Usuario(
      id: j['id'] as int,
      nome: j['nome'] as String,
      email: j['email'] as String?, // cast para String? aceita null
    );
  }

  // Caminho inverso: vira um mapa pronto para jsonEncode.
  Map<String, dynamic> toJson() => {
        'id': id,
        'nome': nome,
        if (email != null) 'email': email,
      };
}

void exemplo() {
  const raw = '{"id":1,"nome":"Ana","email":"ana@x.com"}';
  final u = Usuario.fromJson(jsonDecode(raw) as Map<String, dynamic>);
  print(u.nome); // Ana
  print(jsonEncode(u.toJson()));
}`} />

      <h2>Exemplo prático: lista vinda da API</h2>
      <p>
        Quase nunca chega um objeto sozinho — vem uma lista. O padrão é mapear:
      </p>

      <CodeBlock title="lista de usuários" code={`Future<List<Usuario>> listarUsuarios() async {
  final r = await http.get(Uri.parse('https://api.exemplo.com/users'));
  final lista = jsonDecode(r.body) as List<dynamic>;

  return lista
      .map((e) => Usuario.fromJson(e as Map<String, dynamic>))
      .toList();
}`} />

      <h2>Code-gen com json_serializable</h2>
      <p>
        Para 5 modelos, escrever à mão tudo bem. Para 50, vira inferno. O <code>json_serializable</code> gera o <code>fromJson/toJson</code> a partir de uma anotação.
      </p>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  json_annotation: ^4.9.0

dev_dependencies:
  build_runner: ^2.4.0
  json_serializable: ^6.8.0`} />

      <CodeBlock title="lib/models/produto.dart" code={`import 'package:json_annotation/json_annotation.dart';

// Esse arquivo .g.dart é GERADO — não edite à mão.
part 'produto.g.dart';

@JsonSerializable()
class Produto {
  final int id;

  // Mapeia chave snake_case do servidor para camelCase no Dart.
  @JsonKey(name: 'preco_centavos')
  final int precoCentavos;

  final String nome;

  const Produto({
    required this.id,
    required this.precoCentavos,
    required this.nome,
  });

  factory Produto.fromJson(Map<String, dynamic> j) => _\$ProdutoFromJson(j);
  Map<String, dynamic> toJson() => _\$ProdutoToJson(this);
}`} />

      <p>
        Rode o gerador (uma vez, ou em watch durante o desenvolvimento):
      </p>

      <CodeBlock title="terminal" code={`# uma vez
dart run build_runner build --delete-conflicting-outputs

# acompanha mudanças
dart run build_runner watch --delete-conflicting-outputs`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Cast errado</strong>: <code>j['idade'] as int</code> quebra se vier <code>"30"</code> (string). Faça <code>int.parse</code> quando a API for inconsistente.</li>
        <li><strong>Esquecer null safety</strong>: campo opcional precisa ser <code>String?</code>, não <code>String</code>.</li>
        <li><strong>Listas aninhadas</strong>: <code>(j['itens'] as List).map(...).toList()</code>; cuidado com o <code>cast&lt;Map&gt;()</code>.</li>
        <li><strong>DateTime</strong>: o JSON manda string; converta com <code>DateTime.parse</code>.</li>
        <li><strong>Esquecer o <code>part</code></strong>: sem <code>part 'arquivo.g.dart'</code> o build_runner não gera nada.</li>
      </ul>

      <AlertBox type="warning" title="JSON gigante trava a UI">
        Decodificar um JSON de vários MB no isolate principal congela a tela. Use <code>compute(jsonDecode, raw)</code> para mover o trabalho para outro isolate.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Receita para apps grandes">
        <ul>
          <li>Modelos sempre imutáveis (<code>final</code> em todos os campos).</li>
          <li>Use <code>freezed</code> quando quiser <code>copyWith</code>, igualdade por valor e união de tipos (sealed classes) de graça.</li>
          <li>Centralize o tratamento de campos opcionais — a API mente mais do que parece.</li>
          <li>Escreva pelo menos um teste de <code>fromJson</code> por modelo crítico.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Combine com o capítulo de <strong>http</strong> ou <strong>Dio</strong> para puxar os dados, e com <strong>FutureBuilder</strong> ou Riverpod/Bloc para mostrar na tela.
      </p>

      <AlertBox type="success" title="Você já consegue">
        Transformar qualquer JSON em modelos tipados sem viver com <code>dynamic</code> espalhado pelo app.
      </AlertBox>
    </PageContainer>
  );
}
