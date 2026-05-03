import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Construtores() {
  return (
    <PageContainer
      title="Construtores"
      subtitle="Default, named, factory, redirecting e o poderoso const."
      difficulty="intermediario"
      timeToRead="15 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Construir objetos é o que você faz o tempo todo em Flutter. Cada widget é
        criado por um construtor — e cada construtor define como o objeto nasce,
        quais valores são obrigatórios e se ele pode ser <code>const</code> (o que
        deixa o app mais rápido). Dominar todas as variantes te permite modelar
        APIs limpas, fábricas e singletons.
      </p>

      <h2>O conceito</h2>
      <p>
        Um construtor é uma função especial que executa quando você usa{" "}
        <code>NomeDaClasse(...)</code>. Sua tarefa: inicializar todos os campos para
        que o objeto recém-criado já esteja num estado válido. Dart oferece várias
        formas: a default, com nomes diferentes (named), com lógica de criação
        (factory), redirecionando para outro (redirecting) e com avaliação em tempo
        de compilação (const).
      </p>

      <h2>Default e o atalho this.x</h2>
      <CodeBlock
        title="Construtor padrão"
        code={`class Ponto {
  final double x;
  final double y;

  // Forma longa
  // Ponto(double x, double y) : x = x, y = y;

  // Atalho equivalente: this.x atribui ao campo x
  Ponto(this.x, this.y);
}

final p = Ponto(3, 4);
print('\${p.x},\${p.y}'); // 3.0,4.0`}
      />

      <h2>Construtores nomeados (vários jeitos de criar)</h2>
      <p>
        Em Java/JS você sobrecarregaria o construtor. Dart prefere{" "}
        <strong>nomes diferentes</strong> — fica explícito qual variante você está
        chamando:
      </p>

      <CodeBlock
        title="Vários construtores nomeados"
        code={`class Ponto {
  final double x;
  final double y;

  Ponto(this.x, this.y);

  // Construtor nomeado: ClasseNome.identificador
  Ponto.origem() : x = 0, y = 0;

  Ponto.fromJson(Map<String, dynamic> j)
      : x = (j['x'] as num).toDouble(),
        y = (j['y'] as num).toDouble();

  // Redirecting: chama outro construtor da mesma classe
  Ponto.zero() : this(0, 0);
}

final a = Ponto(1, 2);
final b = Ponto.origem();
final c = Ponto.fromJson({'x': 10, 'y': 20});
final d = Ponto.zero(); // delega para Ponto(0, 0)`}
      />

      <h2>Initializer list: validação e expressões antes do corpo</h2>
      <p>
        Tudo entre os <code>:</code> e o <code>{`{ }`}</code> é a{" "}
        <em>initializer list</em>. Roda antes do corpo do construtor e é o lugar
        para inicializar campos <code>final</code> a partir de cálculos ou validar
        argumentos com <code>assert</code>:
      </p>

      <CodeBlock
        title="Initializer list com assert"
        code={`class Idade {
  final int valor;

  Idade(this.valor)
      : assert(valor >= 0, 'Idade não pode ser negativa'),
        assert(valor < 150, 'Idade improvável');
}

// Em modo debug, isto dispara AssertionError; em release, ignora
final ok = Idade(30);
// final ruim = Idade(-1);`}
      />

      <h2>Factory: quem decide qual instância devolver</h2>
      <p>
        Construtor normal sempre cria uma instância nova. <code>factory</code> não:
        ele <strong>retorna</strong> qualquer objeto (cache, subclasse, instância
        pré-existente). É o ingrediente clássico do padrão Singleton:
      </p>

      <CodeBlock
        title="Singleton via factory"
        code={`class Logger {
  // _internal é privado; só esta classe pode chamar
  Logger._internal();

  // Instância única, criada na primeira leitura
  static final Logger _instance = Logger._internal();

  // factory devolve sempre a mesma
  factory Logger() => _instance;

  void log(String msg) => print('[LOG] \$msg');
}

final a = Logger();
final b = Logger();
print(identical(a, b)); // true — é o mesmo objeto`}
      />

      <CodeBlock
        title="Factory que escolhe a subclasse"
        code={`abstract class Forma {
  factory Forma.deTipo(String tipo) {
    switch (tipo) {
      case 'circulo':   return Circulo();
      case 'quadrado':  return Quadrado();
      default:
        throw ArgumentError('Tipo desconhecido: \$tipo');
    }
  }
  double get area;
}

class Circulo  implements Forma { @override double get area => 3.14; }
class Quadrado implements Forma { @override double get area => 1.0; }

final f = Forma.deTipo('circulo'); // devolve um Circulo`}
      />

      <h2>const constructor: objetos em tempo de compilação</h2>
      <p>
        Se todos os campos são <code>final</code> e os argumentos são conhecidos em
        compile-time, você pode marcar o construtor como <code>const</code>. O Dart
        cria o objeto <em>uma única vez</em> e reutiliza para sempre. Em Flutter
        isso é ouro: widgets <code>const</code> são pulados pelo motor de
        reconciliação.
      </p>

      <CodeBlock
        title="const é grátis: use sempre que puder"
        code={`class Cor {
  final int r, g, b;
  const Cor(this.r, this.g, this.b);
}

const azul = Cor(0, 0, 255);   // criada em compile-time
const azul2 = Cor(0, 0, 255);  // mesmo objeto que azul!
print(identical(azul, azul2)); // true

// Em widgets
const Padding(
  padding: EdgeInsets.all(16),
  child: Text('Olá'),
);`}
      />

      <AlertBox type="success" title="const = performance grátis">
        Sempre que o construtor permite <code>const</code> e você está passando
        valores literais, escreva <code>const</code> na chamada. Widgets{" "}
        <code>const</code> não são reconstruídos no rebuild, economizando trabalho
        do framework.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>
          Tentar usar <code>this</code> antes da initializer list — não pode, o
          objeto ainda não existe completamente.
        </li>
        <li>
          Esquecer que <code>factory</code> não pode usar <code>this</code> nem
          chamar <code>super</code> — ele <em>retorna</em>, não inicializa.
        </li>
        <li>
          Marcar construtor como <code>const</code> mas ter um campo não-final ou
          inicializar com expressão que não é constante.
        </li>
        <li>
          Esquecer <code>const</code> na <em>chamada</em>: o construtor pode ser{" "}
          <code>const</code> mas <code>Cor(0, 0, 255)</code> sem <code>const</code>{" "}
          ainda cria nova instância.
        </li>
      </ul>

      <AlertBox type="warning" title="lint prefer_const_constructors">
        Ative essa lint (já vem no <code>flutter_lints</code> padrão). O analisador
        sublinha cada lugar onde você esqueceu <code>const</code> — corrigir é{" "}
        <em>free win</em> de performance.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Prefira parâmetros nomeados quando passa de 2 argumentos.</li>
        <li>Marque campos como <code>final</code> e construtor como <code>const</code> sempre que possível.</li>
        <li>Use <code>factory</code> para cache, singletons ou escolha de subclasse — não para tarefas triviais.</li>
        <li>Construtores <code>fromJson</code> nomeados são padrão de mercado para parsing.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Você sabe nascer um objeto. Agora vamos relacioná-los entre si: o capítulo{" "}
        <strong>Herança</strong> mostra como uma classe pode estender outra,
        especializar comportamento e usar <code>super</code>.
      </p>

      <AlertBox type="info" title="Conexão com Flutter">
        Cada widget tem um construtor. Quando você cria{" "}
        <code>const Text('oi')</code>, está chamando um construtor const com
        parâmetros nomeados — exatamente os conceitos deste capítulo aplicados.
      </AlertBox>
    </PageContainer>
  );
}
