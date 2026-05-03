import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function DartVsJs() {
  return (
    <PageContainer
      title="Dart vs JavaScript"
      subtitle="Mesma família de C, mas com tipagem estática e null safety nativo."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Se você já mexeu com JavaScript, TypeScript, Java ou C#, vai pegar Dart em poucas horas. Saber <strong>onde Dart é parecida e onde diverge</strong> de JS evita que você escreva código no estilo "JS com ponto e vírgula" — que funciona, mas perde tudo o que Dart tem de melhor.
      </p>

      <h2>O conceito</h2>
      <p>
        Dart é uma linguagem <strong>orientada a objetos</strong>, <strong>tipada estaticamente</strong> (com inferência), <strong>null-safe</strong> e com <strong>compilação dupla</strong>: JIT no desenvolvimento (hot reload) e AOT em produção (binário nativo rápido). JavaScript é dinâmica, single-thread baseada em event loop, e roda em qualquer navegador sem compilar.
      </p>
      <p>
        Em uma frase: Dart se parece com TypeScript estrito que compila para código nativo em vez de JS.
      </p>

      <h2>Como Dart faz</h2>
      <CodeBlock title="comparação lado a lado" code={`// JavaScript
const soma = (a, b) => a + b;
let nome = 'Ana';
nome = null; // permitido

// Dart
int soma(int a, int b) => a + b;
String nome = 'Ana';
// nome = null; // ERRO de compilação: tipo não-nullable
String? talvez = null; // ok, ? marca como nullable`} />

      <h2>As cinco diferenças que mais importam</h2>
      <ul>
        <li><strong>Tipagem estática</strong> — o tipo é decidido em compile-time. Você pode usar <code>var</code> e o tipo é inferido pela primeira atribuição.</li>
        <li><strong>Null safety</strong> — <code>String</code> nunca é null; só <code>String?</code> pode ser. O compilador te força a tratar o caso null.</li>
        <li><strong>Tudo é objeto</strong> — até <code>int</code> e <code>bool</code>. Não existe <code>undefined</code>.</li>
        <li><strong>async/await com Future e Stream</strong> — semelhante a Promise, mas com tipagem completa: <code>Future&lt;User&gt;</code>.</li>
        <li><strong>Concorrência via Isolate</strong> — paralelismo real (memória isolada por isolate), em vez de threads compartilhadas.</li>
      </ul>

      <h2>Exemplo prático: buscar usuário</h2>
      <CodeBlock title="async, tipos e null safety juntos" code={`// Modela uma resposta possível de API
class Usuario {
  final int id;
  final String nome;
  final String? bio; // pode vir vazio do servidor

  const Usuario({required this.id, required this.nome, this.bio});
}

Future<Usuario?> buscarUsuario(int id) async {
  // Simula chamada de rede
  await Future.delayed(const Duration(milliseconds: 200));
  if (id <= 0) return null;
  return Usuario(id: id, nome: 'Ana', bio: null);
}

void main() async {
  final u = await buscarUsuario(1);
  // u é Usuario? — o compilador exige tratar o null:
  if (u == null) {
    print('Não encontrado');
    return;
  }
  // Aqui dentro o Dart sabe que u é Usuario (não-null)
  print('Olá, \${u.nome}');
  // Para campos nullable, use ?? para fallback:
  print(u.bio ?? 'sem bio');
}`} />

      <AlertBox type="info" title="Vindo de TypeScript?">
        Você vai se sentir em casa: <code>generics</code>, <code>async/await</code>, <em>sealed classes</em>, <em>pattern matching</em>, <em>records</em> e até <code>extension methods</code>. A diferença é que tudo é nativo e sempre presente, não opcional.
      </AlertBox>

      <h2>Pegadinhas para quem vem de JavaScript</h2>
      <ul>
        <li><strong>Sem coerção maluca</strong>: <code>'5' + 1</code> não compila. Você converte com <code>int.parse('5')</code>.</li>
        <li><strong>Sem <code>===</code></strong>: <code>==</code> em Dart já compara valores; para identidade de referência use <code>identical(a, b)</code>.</li>
        <li><strong>Listas tipadas</strong>: <code>[1, 2, 'x']</code> em Dart vira <code>List&lt;Object&gt;</code> e te obriga a fazer cast — geralmente um cheiro de design ruim.</li>
        <li><strong>Não existe <code>undefined</code></strong>: ou a variável tem valor, ou é <code>null</code> (e só se o tipo permitir).</li>
        <li><strong>Truthy diferente</strong>: só <code>bool</code> é aceito em <code>if</code>. <code>if (lista)</code> não compila — use <code>if (lista.isNotEmpty)</code>.</li>
      </ul>

      <AlertBox type="warning" title="Cuidado com any/dynamic">
        Existe <code>dynamic</code> em Dart, equivalente ao <code>any</code> do TS. Use só em pontos de fronteira (parsing de JSON, por exemplo). Espalhar <code>dynamic</code> joga fora a maior vantagem da linguagem.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Escreva Dart idiomático">
        Use <code>final</code> por padrão; só caia em <code>var</code> quando precisar reatribuir. Prefira <code>const</code> quando o valor é literal. Modele estados com <em>sealed classes</em> em vez de strings mágicas. Trate <code>null</code> com <code>??</code>, <code>?.</code> e <code>if (x != null)</code> em vez de <code>!</code>.
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Agora vamos preparar o ambiente: escolher uma IDE, instalar as extensões certas e abrir o primeiro projeto.
      </p>

      <AlertBox type="success" title="Continue lendo">
        Próximo: <em>Escolher uma IDE</em>.
      </AlertBox>
    </PageContainer>
  );
}
