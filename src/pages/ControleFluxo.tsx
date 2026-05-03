import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ControleFluxo() {
  return (
    <PageContainer
      title="Controle de Fluxo"
      subtitle="if, switch expression e pattern matching no Dart 3."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Programas tomam decisões o tempo todo: "se o usuário está logado, mostre A; senão, mostre B". A forma como você escreve essas decisões muda muito a clareza do código. Dart 3 trouxe <strong>switch expressions</strong> e <strong>pattern matching</strong> que substituem com folga muitos <code>if/else</code> encadeados.
      </p>

      <h2>O conceito</h2>
      <p>
        Controle de fluxo é como você desvia a execução: <em>condições</em> (<code>if</code>, <code>switch</code>), <em>iterações</em> (loops, vistos no próximo capítulo) e <em>saídas precoces</em> (<code>return</code>, <code>break</code>, <code>continue</code>). Em Dart, condições só aceitam <code>bool</code> — não há "truthy/falsy" como em JavaScript.
      </p>

      <h2>if / else clássico</h2>
      <CodeBlock title="condicional básica" code={`int idade = 17;

if (idade >= 18) {
  print('adulto');
} else if (idade >= 13) {
  print('adolescente');
} else {
  print('criança');
}

// Operador ternário para casos simples:
final categoria = idade >= 18 ? 'adulto' : 'menor';

// if como expressão dentro de coleção (Dart):
final tags = <String>[
  'usuario',
  if (idade >= 18) 'adulto',
];`} />

      <AlertBox type="info" title="if-elemento e for-elemento">
        Dart permite usar <code>if</code> e <code>for</code> dentro de literais de listas, sets e mapas. Isso é ouro em Flutter para construir árvores de widgets condicionais sem ternários gigantes.
      </AlertBox>

      <h2>Switch expression (Dart 3+)</h2>
      <CodeBlock title="switch que retorna valor" code={`String descrever(String status) {
  return switch (status) {
    'ok'    => 'Tudo certo',
    'erro'  => 'Algo falhou',
    'load'  => 'Carregando',
    _       => 'Desconhecido', // _ é o catch-all (default)
  };
}

// Comparado ao switch antigo (statement):
String descrever2(String status) {
  switch (status) {
    case 'ok':
      return 'Tudo certo';
    case 'erro':
      return 'Algo falhou';
    default:
      return 'Desconhecido';
  }
}`} />

      <h2>Pattern matching: o pulo do gato</h2>
      <CodeBlock title="destrincar dados em uma linha" code={`// Tuplas (records) — combinam vários valores
(String, int) usuario = ('Ana', 30);
final (nome, idade) = usuario; // destructuring

// Pattern matching em switch:
String classificar(Object x) => switch (x) {
  int n when n < 0   => 'negativo',
  int n when n == 0  => 'zero',
  int _              => 'positivo',
  String s           => 'texto: \$s',
  List(:final length) => 'lista de \$length',
  null               => 'nulo',
  _                  => 'outro tipo',
};

void main() {
  print(classificar(-5));        // negativo
  print(classificar('oi'));      // texto: oi
  print(classificar([1, 2, 3])); // lista de 3
}`} />

      <h2>Exemplo prático: estado de uma requisição</h2>
      <CodeBlock title="sealed class + switch exaustivo" code={`// sealed: o compilador conhece TODAS as subclasses
sealed class Resultado<T> {}
class Carregando<T> extends Resultado<T> {}
class Sucesso<T>    extends Resultado<T> {
  final T dados;
  Sucesso(this.dados);
}
class Falha<T> extends Resultado<T> {
  final String mensagem;
  Falha(this.mensagem);
}

String renderizar(Resultado<String> r) {
  // Sem 'default': se você esquecer um caso, NÃO COMPILA.
  return switch (r) {
    Carregando()              => 'Carregando...',
    Sucesso(:final dados)     => 'OK: \$dados',
    Falha(mensagem: final m)  => 'Erro: \$m',
  };
}

void main() {
  print(renderizar(Sucesso('lista pronta')));
  print(renderizar(Falha('timeout')));
}`} />

      <AlertBox type="success" title="Por que isso é game changer">
        Combine <em>sealed classes</em> com <code>switch</code> e o compilador garante que você cobriu todos os estados possíveis. Adicionou um novo estado? Todo <code>switch</code> que esquecer de tratá-lo vira erro vermelho. Refactor com confiança.
      </AlertBox>

      <h2>assert para invariantes</h2>
      <CodeBlock title="assert só roda em debug" code={`int dividir(int a, int b) {
  assert(b != 0, 'divisor não pode ser zero');
  return a ~/ b;
}

// Em modo release (flutter build apk --release),
// asserts são removidos — não impactam performance.`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Confundir <code>=</code> com <code>==</code></strong> em condição. <code>if (x = 5)</code> nem compila em Dart (boa!), mas em outras linguagens é fonte clássica de bug.</li>
        <li><strong>Switch antigo "cai" entre cases</strong> sem <code>break</code>, mas Dart exige <code>break</code>/<code>return</code> em cada case — esquecer dá erro.</li>
        <li><strong>Esquecer o <code>_</code> no switch expression</strong> quando os tipos não são exaustivos — o Dart força você a cobrir tudo.</li>
        <li><strong>Usar <code>if</code> com algo não-bool</strong>: <code>if (lista)</code> não compila. Use <code>if (lista.isNotEmpty)</code>.</li>
      </ul>

      <AlertBox type="warning" title="Switch antigo ainda existe">
        O <code>switch</code> tradicional (statement) continua válido. Use o novo (expression) quando o objetivo é <strong>retornar um valor</strong>; use o antigo quando precisar executar uma sequência de comandos.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Quando usar o quê">
        Use <code>if/else</code> para 2–3 casos simples. Use <code>switch expression</code> com pattern matching quando estiver mapeando um tipo para um valor. Use <code>sealed class</code> para modelar estados finitos (loading/sucesso/erro, autenticado/anônimo, etc).
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Decisões resolvidas, vamos para repetições: <code>for</code>, <code>while</code> e os métodos funcionais que substituem boa parte deles.
      </p>

      <AlertBox type="success" title="Continue lendo">
        Próximo: <em>Loops</em>.
      </AlertBox>
    </PageContainer>
  );
}
