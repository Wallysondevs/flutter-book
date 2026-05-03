import{j as e}from"./index-D9yRYXwO.js";import{P as r,C as a,A as s}from"./AlertBox-B2Rl5ETq.js";function d(){return e.jsxs(r,{title:"Classes Abstratas",subtitle:"Contratos parciais que não podem ser instanciados — moldes que outras classes preenchem.",difficulty:"intermediario",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Imagine que você está modelando formas geométricas: círculo, quadrado, triângulo. Todas têm ",e.jsx("strong",{children:"área"}),", mas a fórmula muda. Você quer ",e.jsx("em",{children:"obrigar"})," qualquer nova forma a implementar ",e.jsx("code",{children:"area"}),', mas não faz sentido criar um objeto chamado "Forma" genérico — Forma sozinha não desenha nada.']}),e.jsxs("p",{children:["Esse é exatamente o cenário das ",e.jsx("strong",{children:"classes abstratas"}),": um molde que define o que toda subclasse precisa ter, mas que ",e.jsx("em",{children:"não pode ser instanciado diretamente"}),". Você as encontrará o tempo todo no Flutter — ",e.jsx("code",{children:"Widget"}),", ",e.jsx("code",{children:"State"}),", ",e.jsx("code",{children:"RenderObject"})," são todas classes abstratas."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Uma classe abstrata é declarada com a palavra-chave ",e.jsx("code",{children:"abstract"}),". Ela pode ter:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Métodos abstratos"})," — declarados sem corpo, obrigam subclasses a implementar."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Métodos concretos"})," — já com implementação, herdados normalmente."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Campos e construtores"})," — usados pelas subclasses via ",e.jsx("code",{children:"super"}),"."]})]}),e.jsxs("p",{children:['Pense numa receita de bolo com lacunas: "preaqueça o forno (já dito), bata a massa do ',e.jsx("em",{children:"seu jeito"}),' (lacuna), asse por 30min (já dito)". A receita-mãe é a classe abstrata; cada bolo concreto preenche a lacuna.']}),e.jsx("h2",{children:"Como Dart faz"}),e.jsx(a,{title:"forma.dart",code:`// 'abstract' impede new Forma() — só serve como molde.
abstract class Forma {
  // Método abstrato: sem corpo, ponto e vírgula no final.
  // Toda subclasse É OBRIGADA a implementar.
  double get area;

  // Método concreto: já tem implementação, é herdado.
  void descrever() {
    print('Sou uma forma com area $area');
  }
}

class Circulo extends Forma {
  final double raio;
  Circulo(this.raio);

  // 'override' não é obrigatório, mas evita typos.
  @override
  double get area => 3.14159 * raio * raio;
}

class Quadrado extends Forma {
  final double lado;
  Quadrado(this.lado);

  @override
  double get area => lado * lado;
}`}),e.jsxs(s,{type:"warning",title:"Tentar instanciar é erro de compilação",children:[e.jsx("code",{children:"final f = Forma();"})," não compila. A mensagem é clara: ",e.jsx("em",{children:`"Abstract classes can't be instantiated"`}),". Isso é proteção: instanciar Forma sem área não faria sentido."]}),e.jsx("h2",{children:"Exemplo prático: repositório de dados"}),e.jsxs("p",{children:["Um padrão muito comum em apps Flutter: definir uma ",e.jsx("strong",{children:"interface de repositório"})," abstrata e ter implementações reais (HTTP) e fakes (memória) para testes."]}),e.jsx(a,{title:"usuario_repository.dart",code:`abstract class UsuarioRepository {
  // Toda implementação precisa saber buscar e salvar.
  Future<Usuario> buscarPorId(String id);
  Future<void> salvar(Usuario u);

  // Método utilitário compartilhado por todas as
  // implementações — define uma só vez aqui.
  Future<List<Usuario>> buscarVarios(List<String> ids) async {
    return Future.wait(ids.map(buscarPorId));
  }
}

class UsuarioRepositoryHttp extends UsuarioRepository {
  final Dio dio;
  UsuarioRepositoryHttp(this.dio);

  @override
  Future<Usuario> buscarPorId(String id) async {
    final r = await dio.get('/usuarios/$id');
    return Usuario.fromJson(r.data);
  }

  @override
  Future<void> salvar(Usuario u) async {
    await dio.put('/usuarios/\${u.id}', data: u.toJson());
  }
}

// Para testes: nenhuma chamada de rede.
class UsuarioRepositoryFake extends UsuarioRepository {
  final Map<String, Usuario> _memoria = {};

  @override
  Future<Usuario> buscarPorId(String id) async => _memoria[id]!;

  @override
  Future<void> salvar(Usuario u) async => _memoria[u.id] = u;
}`}),e.jsxs("p",{children:["O resto do app depende só de ",e.jsx("code",{children:"UsuarioRepository"}),". Trocar HTTP por fake em testes vira uma linha. Esse é o coração da ",e.jsx("strong",{children:"injeção de dependências"}),"."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"@override"})]}),": Dart compila, mas se você errar o nome do método (",e.jsx("code",{children:"aera"})," em vez de ",e.jsx("code",{children:"area"}),"), cria-se um método novo silenciosamente. Sempre anote."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Achar que ",e.jsx("code",{children:"abstract"})," dá privacidade"]}),": não dá. Privacidade em Dart é com ",e.jsx("code",{children:"_"})," no início do nome."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Confundir com ",e.jsx("code",{children:"interface"})]}),": Dart não tem palavra-chave ",e.jsx("code",{children:"interface"}),". Toda classe já pode ser usada como interface via ",e.jsx("code",{children:"implements"}),". Veja a próxima dica."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Construtor em classe abstrata"})," existe, mas só é chamado por ",e.jsx("code",{children:"super(...)"})," nas subclasses."]})]}),e.jsxs(s,{type:"info",title:"extends vs implements",children:[e.jsx("code",{children:"extends"})," herda implementação ",e.jsx("em",{children:"e"})," contrato. ",e.jsx("code",{children:"implements"})," só herda o contrato — você é obrigado a reescrever ",e.jsx("strong",{children:"tudo"}),", inclusive métodos concretos. Use ",e.jsx("code",{children:"implements"}),' quando quiser apenas "prometer a forma" da classe.']}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(s,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use abstratas para ",e.jsx("strong",{children:"compartilhar lógica"})," + ",e.jsx("strong",{children:"forçar contratos"}),"."]}),e.jsxs("li",{children:["Se você só quer um contrato (sem código compartilhado), considere ",e.jsx("code",{children:"sealed"})," (tipos fechados) ou apenas declare uma classe normal e use ",e.jsx("code",{children:"implements"}),"."]}),e.jsxs("li",{children:["Nomes claros: ",e.jsx("code",{children:"Repository"}),", ",e.jsx("code",{children:"Service"}),", ",e.jsx("code",{children:"Forma"})," — sem prefixo ",e.jsx("code",{children:"I"})," ao estilo C#."]}),e.jsxs("li",{children:["Documente cada método abstrato com ",e.jsx("code",{children:"///"})," — ele é parte pública do contrato."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Quando você quer um conjunto ",e.jsx("em",{children:"fechado"})," de subtipos (ex: estados de uma tela: ",e.jsx("code",{children:"Carregando"}),", ",e.jsx("code",{children:"Sucesso"}),", ",e.jsx("code",{children:"Erro"}),"), classes abstratas comuns não bastam — qualquer um pode estender. Aí entram as ",e.jsx("strong",{children:"sealed classes"}),"."]}),e.jsxs(s,{type:"success",children:["Próximo capítulo: ",e.jsx("strong",{children:"Sealed Classes"})," — abstratas com hierarquia fechada e pattern matching exaustivo."]})]})}export{d as default};
