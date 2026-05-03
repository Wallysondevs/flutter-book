import{j as e}from"./index-D4AOhXGO.js";import{P as a,A as i,C as o}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(a,{title:"JSON & Serialização",subtitle:"Do jsonDecode cru aos modelos tipados com json_serializable e freezed.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["APIs REST falam JSON. Mas o Dart é uma linguagem ",e.jsx("strong",{children:"fortemente tipada"})," — quanto antes você transformar aquele ",e.jsx("code",{children:"Map<String, dynamic>"})," recebido da rede em um objeto tipado (",e.jsx("code",{children:"Usuario"}),", ",e.jsx("code",{children:"Pedido"}),"...), mais bugs o compilador pega para você. Trabalhar com ",e.jsx("code",{children:"dynamic"})," espalhado pela tela é fonte garantida de ",e.jsx("em",{children:'"NoSuchMethodError"'})," em produção."]}),e.jsx("h2",{children:"O conceito"}),e.jsx("p",{children:"Serialização é o caminho de ida e volta:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Decode"}),": ",e.jsx("code",{children:"String JSON"})," → ",e.jsx("code",{children:"Map/List dynamic"})," → ",e.jsx("strong",{children:"objeto Dart"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Encode"}),": ",e.jsx("strong",{children:"objeto Dart"})," → ",e.jsx("code",{children:"Map"})," → ",e.jsx("code",{children:"String JSON"}),"."]})]}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"dart:convert"})," faz a primeira metade (",e.jsx("code",{children:"jsonDecode/jsonEncode"}),'). A "última milha" — virar um objeto tipado — é com você. Existem três caminhos: ',e.jsx("strong",{children:"manual"}),", ",e.jsx("strong",{children:"json_serializable"})," (gera o boilerplate) e ",e.jsx("strong",{children:"freezed"})," (gera modelo imutável completo)."]}),e.jsxs(i,{type:"info",title:"Map<String, dynamic> é o ponto de encontro",children:["Toda solução passa por esse tipo. A diferença é quem escreve o ",e.jsx("code",{children:"fromJson"}),": você ou o code-gen."]}),e.jsx("h2",{children:"Como Flutter/Dart faz: manual"}),e.jsx("p",{children:"Sempre comece por aqui — entender o manual deixa o code-gen muito menos mágico depois."}),e.jsx(o,{title:"lib/models/usuario.dart",code:`import 'dart:convert';

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
}`}),e.jsx("h2",{children:"Exemplo prático: lista vinda da API"}),e.jsx("p",{children:"Quase nunca chega um objeto sozinho — vem uma lista. O padrão é mapear:"}),e.jsx(o,{title:"lista de usuários",code:`Future<List<Usuario>> listarUsuarios() async {
  final r = await http.get(Uri.parse('https://api.exemplo.com/users'));
  final lista = jsonDecode(r.body) as List<dynamic>;

  return lista
      .map((e) => Usuario.fromJson(e as Map<String, dynamic>))
      .toList();
}`}),e.jsx("h2",{children:"Code-gen com json_serializable"}),e.jsxs("p",{children:["Para 5 modelos, escrever à mão tudo bem. Para 50, vira inferno. O ",e.jsx("code",{children:"json_serializable"})," gera o ",e.jsx("code",{children:"fromJson/toJson"})," a partir de uma anotação."]}),e.jsx(o,{title:"pubspec.yaml",code:`dependencies:
  json_annotation: ^4.9.0

dev_dependencies:
  build_runner: ^2.4.0
  json_serializable: ^6.8.0`}),e.jsx(o,{title:"lib/models/produto.dart",code:`import 'package:json_annotation/json_annotation.dart';

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

  factory Produto.fromJson(Map<String, dynamic> j) => _$ProdutoFromJson(j);
  Map<String, dynamic> toJson() => _$ProdutoToJson(this);
}`}),e.jsx("p",{children:"Rode o gerador (uma vez, ou em watch durante o desenvolvimento):"}),e.jsx(o,{title:"terminal",code:`# uma vez
dart run build_runner build --delete-conflicting-outputs

# acompanha mudanças
dart run build_runner watch --delete-conflicting-outputs`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Cast errado"}),": ",e.jsx("code",{children:"j['idade'] as int"})," quebra se vier ",e.jsx("code",{children:'"30"'})," (string). Faça ",e.jsx("code",{children:"int.parse"})," quando a API for inconsistente."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer null safety"}),": campo opcional precisa ser ",e.jsx("code",{children:"String?"}),", não ",e.jsx("code",{children:"String"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Listas aninhadas"}),": ",e.jsx("code",{children:"(j['itens'] as List).map(...).toList()"}),"; cuidado com o ",e.jsx("code",{children:"cast<Map>()"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"DateTime"}),": o JSON manda string; converta com ",e.jsx("code",{children:"DateTime.parse"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer o ",e.jsx("code",{children:"part"})]}),": sem ",e.jsx("code",{children:"part 'arquivo.g.dart'"})," o build_runner não gera nada."]})]}),e.jsxs(i,{type:"warning",title:"JSON gigante trava a UI",children:["Decodificar um JSON de vários MB no isolate principal congela a tela. Use ",e.jsx("code",{children:"compute(jsonDecode, raw)"})," para mover o trabalho para outro isolate."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(i,{type:"tip",title:"Receita para apps grandes",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Modelos sempre imutáveis (",e.jsx("code",{children:"final"})," em todos os campos)."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"freezed"})," quando quiser ",e.jsx("code",{children:"copyWith"}),", igualdade por valor e união de tipos (sealed classes) de graça."]}),e.jsx("li",{children:"Centralize o tratamento de campos opcionais — a API mente mais do que parece."}),e.jsxs("li",{children:["Escreva pelo menos um teste de ",e.jsx("code",{children:"fromJson"})," por modelo crítico."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Combine com o capítulo de ",e.jsx("strong",{children:"http"})," ou ",e.jsx("strong",{children:"Dio"})," para puxar os dados, e com ",e.jsx("strong",{children:"FutureBuilder"})," ou Riverpod/Bloc para mostrar na tela."]}),e.jsxs(i,{type:"success",title:"Você já consegue",children:["Transformar qualquer JSON em modelos tipados sem viver com ",e.jsx("code",{children:"dynamic"})," espalhado pelo app."]})]})}export{n as default};
