import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Mixins() {
  return (
    <PageContainer
      title="Mixins"
      subtitle="Reutilização horizontal de comportamento sem cair na herança múltipla."
      difficulty="intermediario"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Você vai esbarrar com mixins muito cedo no Flutter: animações exigem{" "}
        <code>SingleTickerProviderStateMixin</code>; abas que devem manter estado
        usam <code>AutomaticKeepAliveClientMixin</code>; o framework de testes
        injeta <code>WidgetsBindingObserver</code>. Entender mixins evita decorar
        receitas — você passa a saber <em>por que</em> cada uma funciona.
      </p>

      <h2>O conceito</h2>
      <p>
        Dart só permite herdar de uma classe (single inheritance). Mas e se você
        precisa adicionar capacidades vindas de várias fontes? <strong>Mixin</strong>{" "}
        é a resposta: um pedaço de código (campos + métodos) que você "encaixa" em
        outra classe com a palavra <code>with</code>. É como adicionar acessórios a
        um carro: airbag, ar-condicionado, GPS — cada um vem de fora, mas vira
        parte do todo.
      </p>

      <h2>Como o Dart faz</h2>
      <CodeBlock
        title="Definindo e usando mixins"
        code={`// Um mixin é declarado com a palavra-chave 'mixin'
mixin Voador {
  void voar() => print('Voando!');
}

mixin Nadador {
  void nadar() => print('Nadando!');
}

class Animal {
  final String nome;
  Animal(this.nome);
}

// 'with' encaixa os mixins; pode listar vários
class Pato extends Animal with Voador, Nadador {
  Pato(super.nome);
}

void main() {
  final p = Pato('Donald');
  p.voar();    // Voando!
  p.nadar();   // Nadando!
  print(p.nome); // Donald
}`}
      />

      <AlertBox type="info" title="Mixin vs interface vs herança">
        <ul>
          <li><code>extends</code>: herda de uma classe — é-um.</li>
          <li><code>implements</code>: copia só a assinatura — você reimplementa tudo.</li>
          <li><code>with</code>: <strong>recebe a implementação pronta</strong> de um mixin, sem virar filho dele.</li>
        </ul>
      </AlertBox>

      <h2>Mixin com restrição (on): pré-requisitos</h2>
      <p>
        Às vezes o mixin precisa de algo da classe que vai usá-lo (um campo, um
        método). A cláusula <code>on</code> diz: "só posso ser misturado em quem é
        ou herda de tal classe". Assim o mixin pode acessar <code>nome</code> de
        <code>Animal</code> com segurança:
      </p>

      <CodeBlock
        title="Mixin com 'on'"
        code={`mixin LogarAcoes on Animal {
  // Pode usar 'nome' porque sabemos que vem de Animal
  void logar(String acao) {
    print('[\${DateTime.now()}] \$nome -> \$acao');
  }
}

class Cachorro extends Animal with LogarAcoes {
  Cachorro(super.nome);

  void latir() {
    logar('latiu');     // método veio do mixin
  }
}

// Não compila: SemBicho não estende Animal
// class SemBicho with LogarAcoes {}`}
      />

      <h2>Exemplo prático: mixin de validação reutilizável</h2>
      <p>
        Imagine vários models que precisam validar campos antes de salvar. Em vez
        de copiar o método em cada um, extraia para um mixin:
      </p>

      <CodeBlock
        title="Mixin Validavel reaproveitado"
        code={`mixin Validavel {
  // Lista de erros encontrados na última validação
  final List<String> erros = [];

  // Cada classe implementa esta regra
  void validar();

  bool get ehValido {
    erros.clear();
    validar();
    return erros.isEmpty;
  }
}

class Usuario with Validavel {
  final String email;
  final int idade;
  Usuario({required this.email, required this.idade});

  @override
  void validar() {
    if (!email.contains('@')) erros.add('E-mail inválido');
    if (idade < 18) erros.add('Precisa ter 18+');
  }
}

void main() {
  final u = Usuario(email: 'fulano', idade: 16);
  if (!u.ehValido) {
    print(u.erros); // [E-mail inválido, Precisa ter 18+]
  }
}`}
      />

      <h2>Onde aparece em Flutter</h2>
      <ul>
        <li>
          <code>SingleTickerProviderStateMixin</code> — fornece um{" "}
          <code>vsync</code> para <code>AnimationController</code>.
        </li>
        <li>
          <code>AutomaticKeepAliveClientMixin</code> — preserva estado de uma aba
          em <code>TabBarView</code> ou <code>PageView</code>.
        </li>
        <li>
          <code>WidgetsBindingObserver</code> — escuta eventos do ciclo de vida do
          app (background/foreground).
        </li>
        <li>
          <code>ChangeNotifier</code> — usado com <code>with</code> para criar
          estados observáveis no Provider/Riverpod.
        </li>
      </ul>

      <CodeBlock
        title="Mixin clássico em animação"
        code={`class _MinhaTelaState extends State<MinhaTela>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;

  @override
  void initState() {
    super.initState();
    // 'this' é aceito como TickerProvider graças ao mixin
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    );
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}`}
      />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>
          A <strong>ordem</strong> dos mixins importa: o último listado em{" "}
          <code>with A, B</code> sobrescreve métodos comuns. Em caso de colisão,{" "}
          <code>B</code> ganha.
        </li>
        <li>
          Mixin não é classe — não dá para instanciar com{" "}
          <code>Voador()</code>.
        </li>
        <li>
          Esquecer <code>on</code> e tentar usar campo da classe alvo: erro de
          compilação ("undefined name").
        </li>
        <li>
          Misturar dois mixins que definem o mesmo método sem entender quem ganha
          gera bugs sutis. Renomeie ou refatore.
        </li>
      </ul>

      <AlertBox type="warning" title="Cuidado com mixins gigantes">
        Mixin é tentador: "vou só jogar mais método aqui". Quando passa de 3-4
        responsabilidades, vira um <em>god mixin</em> que ninguém entende.
        Quebre em mixins menores, focados.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Use mixin para comportamento compartilhado por classes não relacionadas hierarquicamente.</li>
        <li>Limite cada mixin a uma responsabilidade clara.</li>
        <li>Use <code>on</code> para deixar explícito de qual base você depende.</li>
        <li>Prefira composição (objetos delegados) quando o comportamento tem estado próprio rico.</li>
        <li>Documente o que o mixin espera da classe alvo (se exige sobrescrever algo, etc.).</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Você já modela classes, herda, mistura comportamentos. O próximo grande
        salto é trabalhar com código <strong>assíncrono</strong> —{" "}
        <code>Future</code> e <code>async/await</code> — base de qualquer chamada
        de rede, leitura de arquivo ou consulta a banco de dados.
      </p>

      <AlertBox type="success" title="Lembre-se">
        Quase todo widget de animação que você criar vai ter{" "}
        <code>with SingleTickerProviderStateMixin</code> no <code>State</code>.
        Agora você sabe que isso adiciona o método/comportamento de "ticker" sem
        precisar herdar nem implementar manualmente.
      </AlertBox>
    </PageContainer>
  );
}
