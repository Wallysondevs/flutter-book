import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ClassesAbstratas() {
  return (
    <PageContainer
      title="Classes Abstratas"
      subtitle="Contratos parciais que não podem ser instanciados — moldes que outras classes preenchem."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Imagine que você está modelando formas geométricas: círculo, quadrado, triângulo. Todas têm <strong>área</strong>, mas a fórmula muda. Você quer <em>obrigar</em> qualquer nova forma a implementar <code>area</code>, mas não faz sentido criar um objeto chamado "Forma" genérico — Forma sozinha não desenha nada.
      </p>
      <p>
        Esse é exatamente o cenário das <strong>classes abstratas</strong>: um molde que define o que toda subclasse precisa ter, mas que <em>não pode ser instanciado diretamente</em>. Você as encontrará o tempo todo no Flutter — <code>Widget</code>, <code>State</code>, <code>RenderObject</code> são todas classes abstratas.
      </p>

      <h2>O conceito</h2>
      <p>
        Uma classe abstrata é declarada com a palavra-chave <code>abstract</code>. Ela pode ter:
      </p>
      <ul>
        <li><strong>Métodos abstratos</strong> — declarados sem corpo, obrigam subclasses a implementar.</li>
        <li><strong>Métodos concretos</strong> — já com implementação, herdados normalmente.</li>
        <li><strong>Campos e construtores</strong> — usados pelas subclasses via <code>super</code>.</li>
      </ul>
      <p>
        Pense numa receita de bolo com lacunas: "preaqueça o forno (já dito), bata a massa do <em>seu jeito</em> (lacuna), asse por 30min (já dito)". A receita-mãe é a classe abstrata; cada bolo concreto preenche a lacuna.
      </p>

      <h2>Como Dart faz</h2>
      <CodeBlock title="forma.dart" code={`// 'abstract' impede new Forma() — só serve como molde.
abstract class Forma {
  // Método abstrato: sem corpo, ponto e vírgula no final.
  // Toda subclasse É OBRIGADA a implementar.
  double get area;

  // Método concreto: já tem implementação, é herdado.
  void descrever() {
    print('Sou uma forma com area \$area');
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
}`} />

      <AlertBox type="warning" title="Tentar instanciar é erro de compilação">
        <code>final f = Forma();</code> não compila. A mensagem é clara: <em>"Abstract classes can't be instantiated"</em>. Isso é proteção: instanciar Forma sem área não faria sentido.
      </AlertBox>

      <h2>Exemplo prático: repositório de dados</h2>
      <p>
        Um padrão muito comum em apps Flutter: definir uma <strong>interface de repositório</strong> abstrata e ter implementações reais (HTTP) e fakes (memória) para testes.
      </p>

      <CodeBlock title="usuario_repository.dart" code={`abstract class UsuarioRepository {
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
    final r = await dio.get('/usuarios/\$id');
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
}`} />

      <p>
        O resto do app depende só de <code>UsuarioRepository</code>. Trocar HTTP por fake em testes vira uma linha. Esse é o coração da <strong>injeção de dependências</strong>.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer <code>@override</code></strong>: Dart compila, mas se você errar o nome do método (<code>aera</code> em vez de <code>area</code>), cria-se um método novo silenciosamente. Sempre anote.</li>
        <li><strong>Achar que <code>abstract</code> dá privacidade</strong>: não dá. Privacidade em Dart é com <code>_</code> no início do nome.</li>
        <li><strong>Confundir com <code>interface</code></strong>: Dart não tem palavra-chave <code>interface</code>. Toda classe já pode ser usada como interface via <code>implements</code>. Veja a próxima dica.</li>
        <li><strong>Construtor em classe abstrata</strong> existe, mas só é chamado por <code>super(...)</code> nas subclasses.</li>
      </ul>

      <AlertBox type="info" title="extends vs implements">
        <code>extends</code> herda implementação <em>e</em> contrato. <code>implements</code> só herda o contrato — você é obrigado a reescrever <strong>tudo</strong>, inclusive métodos concretos. Use <code>implements</code> quando quiser apenas "prometer a forma" da classe.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use abstratas para <strong>compartilhar lógica</strong> + <strong>forçar contratos</strong>.</li>
          <li>Se você só quer um contrato (sem código compartilhado), considere <code>sealed</code> (tipos fechados) ou apenas declare uma classe normal e use <code>implements</code>.</li>
          <li>Nomes claros: <code>Repository</code>, <code>Service</code>, <code>Forma</code> — sem prefixo <code>I</code> ao estilo C#.</li>
          <li>Documente cada método abstrato com <code>///</code> — ele é parte pública do contrato.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Quando você quer um conjunto <em>fechado</em> de subtipos (ex: estados de uma tela: <code>Carregando</code>, <code>Sucesso</code>, <code>Erro</code>), classes abstratas comuns não bastam — qualquer um pode estender. Aí entram as <strong>sealed classes</strong>.
      </p>
      <AlertBox type="success">
        Próximo capítulo: <strong>Sealed Classes</strong> — abstratas com hierarquia fechada e pattern matching exaustivo.
      </AlertBox>
    </PageContainer>
  );
}
