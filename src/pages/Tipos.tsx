import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Tipos() {
  return (
    <PageContainer
      title="Tipos & Variáveis"
      subtitle="int, double, String, bool e os modificadores var, final e const."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Em Dart, <strong>tipo é contrato</strong>. Declarar bem os tipos faz o compilador trabalhar a seu favor: ele pega erros antes de o app rodar e o autocomplete fica esperto. Escolher entre <code>var</code>, <code>final</code> e <code>const</code> também muda performance e previne bugs de estado em Flutter.
      </p>

      <h2>O conceito</h2>
      <p>
        Toda variável em Dart tem um <strong>tipo</strong> (declarado ou inferido) e um <strong>modificador</strong> que diz se ela pode ser reatribuída. O sistema de <em>null safety</em> exige que você marque com <code>?</code> os tipos que aceitam <code>null</code>.
      </p>

      <h2>Tipos primitivos</h2>
      <CodeBlock title="os tipos que você mais usa" code={`int idade = 30;             // inteiros (sem ponto)
double altura = 1.75;       // ponto flutuante
num qualquerNumero = 42;    // pai de int e double
String nome = 'Maria';      // texto, aspas simples ou duplas
bool ativo = true;          // só true ou false (sem 0/1)

// Coleções
List<int> notas = [8, 9, 10];
Set<String> tags = {'flutter', 'dart'};
Map<String, int> idades = {'Ana': 25, 'Bruno': 30};

// Tipos especiais
dynamic qualquer = 'pode virar qualquer coisa'; // evite!
Object obj = 'tudo em Dart é Object';
Null nada = null;`} />

      <h2>var, final, const — o que muda</h2>
      <ul>
        <li><strong><code>var</code></strong> — tipo inferido na primeira atribuição, valor pode mudar.</li>
        <li><strong><code>final</code></strong> — recebe valor uma única vez, em runtime; depois é imutável.</li>
        <li><strong><code>const</code></strong> — valor calculado em <em>compile-time</em>; congelado e compartilhado entre instâncias.</li>
      </ul>

      <CodeBlock title="diferença na prática" code={`var contador = 0;
contador = 1; // ok, var é mutável

final agora = DateTime.now();
// agora = DateTime.now(); // ERRO: final não reatribui

const pi = 3.14159;
// const x = DateTime.now(); // ERRO: now() roda em runtime

// const também congela conteúdo de coleções
const cores = ['azul', 'verde'];
// cores.add('rosa'); // ERRO em runtime: lista é imutável

final mutavel = ['a', 'b'];
mutavel.add('c'); // ok: a referência é final, o conteúdo não`} />

      <AlertBox type="info" title="Em Flutter, const é otimização">
        Widgets marcados como <code>const</code> são criados uma única vez e reutilizados em rebuilds. Use sempre que o widget não dependa de dados variáveis: <code>const Text('Olá')</code> em vez de <code>Text('Olá')</code>.
      </AlertBox>

      <h2>Null safety na prática</h2>
      <CodeBlock title="o ? muda tudo" code={`String nome = 'Ana';
// nome = null; // ERRO: String não aceita null

String? apelido; // ok, começa null
apelido = 'Aninha';

// Para usar um valor nullable, trate o null:
print(apelido?.toUpperCase());      // null-safe access
print(apelido ?? 'sem apelido');     // fallback
print(apelido!.length);              // ! força — pode quebrar!

// late: prometo inicializar antes de usar
late String token;
void login() {
  token = 'abc123';
}`} />

      <h2>Exemplo prático: dados de um formulário</h2>
      <CodeBlock title="modelando um cadastro" code={`class Cadastro {
  final String nome;        // obrigatório
  final int idade;          // obrigatório
  final String? telefone;   // opcional
  final List<String> tags;  // sempre uma lista (pode ser vazia)

  const Cadastro({
    required this.nome,
    required this.idade,
    this.telefone,
    this.tags = const [],
  });
}

void main() {
  const c = Cadastro(nome: 'Ana', idade: 30);
  print(c.nome);                          // Ana
  print(c.telefone ?? 'não informado');   // não informado
  print(c.tags.isEmpty);                  // true
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Usar <code>var</code> para tudo e perder informação de tipo na assinatura de funções públicas — declare o tipo de parâmetros e retornos.</li>
        <li>Confundir <code>final</code> em coleção: a referência é imutável, mas o conteúdo da lista ainda pode ser modificado.</li>
        <li>Esquecer que <code>1 / 2</code> em Dart dá <code>0.5</code> (double). Para divisão inteira use <code>1 ~/ 2</code>.</li>
        <li>Espalhar <code>!</code> (force unwrap) por preguiça — qualquer null mata o app em runtime.</li>
        <li>Comparar <code>String</code> com <code>==</code> esperando comportamento estranho — pode confiar, em Dart compara conteúdo.</li>
      </ul>

      <AlertBox type="warning" title="dynamic é uma armadilha">
        <code>dynamic</code> desliga toda a checagem de tipos — você recupera o pior do JavaScript. Use só na fronteira (parsing de JSON cru) e converta para um tipo concreto o quanto antes.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Um padrão simples que resolve 90% dos casos">
        Use <code>final</code> por padrão em variáveis locais. Use <code>const</code> em literais e widgets imutáveis. Reserve <code>var</code> para casos onde você realmente reatribui. Evite <code>dynamic</code>. Marque tipos opcionais com <code>?</code> em vez de "deixar vazio".
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com tipos sob controle, vamos ver como combiná-los com operadores — incluindo os exclusivos do Dart como <code>??</code> e <code>..</code>.
      </p>

      <AlertBox type="success" title="Continue lendo">
        Próximo: <em>Operadores</em>.
      </AlertBox>
    </PageContainer>
  );
}
