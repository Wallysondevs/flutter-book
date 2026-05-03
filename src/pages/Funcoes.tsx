import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Funcoes() {
  return (
    <PageContainer
      title="Funções & Closures"
      subtitle="Parâmetros nomeados, opcionais, arrow, funções como valores e closures."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Funções são o tijolo de qualquer programa. Em Flutter, você passa funções para
        widgets a todo momento (<code>onPressed</code>, <code>onChanged</code>,{" "}
        <code>builder</code>) e recebe funções como <em>callbacks</em>. Entender bem
        parâmetros nomeados, valores padrão e closures evita 80% das dúvidas iniciais
        com a API do framework.
      </p>

      <h2>O conceito</h2>
      <p>
        Uma função é um pedaço de código com nome, que recebe entradas (parâmetros) e
        devolve uma saída (retorno). Em Dart funções são <strong>cidadãs de primeira
        classe</strong>: você pode guardar uma função numa variável, passar para outra
        função e retornar de uma função — exatamente como faz com um número ou um texto.
      </p>

      <h2>Como o Dart faz</h2>
      <p>
        A forma completa declara o tipo de retorno, o nome e os parâmetros. Quando o
        corpo é uma única expressão, use a forma <code>=&gt;</code> (arrow) para
        encurtar:
      </p>

      <CodeBlock
        title="Sintaxes equivalentes"
        code={`// Forma com bloco { ... }
int soma(int a, int b) {
  return a + b;
}

// Mesma função, escrita com arrow (apenas para 1 expressão)
int somaCurta(int a, int b) => a + b;

// Sem retorno: use void
void cumprimentar(String nome) {
  print('Olá, \$nome!');
}`}
      />

      <h2>Parâmetros: posicionais, opcionais e nomeados</h2>
      <p>
        Dart tem três modos de declarar parâmetros. O Flutter usa <strong>nomeados</strong>{" "}
        em quase tudo — por isso você lê <code>Text('oi', style: ...)</code> em vez de
        adivinhar a ordem.
      </p>

      <CodeBlock
        title="As três formas"
        code={`// 1) Posicionais obrigatórios
int multiplicar(int a, int b) => a * b;
multiplicar(2, 3); // 6

// 2) Posicionais OPCIONAIS — entre [ ]
String saudacao(String nome, [String? titulo]) {
  if (titulo == null) return 'Oi, \$nome';
  return 'Oi, \$titulo \$nome';
}
saudacao('Ana');             // "Oi, Ana"
saudacao('Ana', 'Dra.');     // "Oi, Dra. Ana"

// 3) NOMEADOS — entre { }. Use 'required' para obrigatórios.
Widget botao({
  required String texto,
  Color cor = Colors.blue,         // valor padrão
  VoidCallback? aoTocar,           // opcional
}) {
  return ElevatedButton(
    style: ElevatedButton.styleFrom(backgroundColor: cor),
    onPressed: aoTocar,
    child: Text(texto),
  );
}

// Uso: ordem livre, código auto-explicativo
botao(texto: 'Salvar');
botao(texto: 'Excluir', cor: Colors.red, aoTocar: () {});`}
      />

      <AlertBox type="info" title="Por que nomeados dominam o Flutter">
        Construtores de widgets têm dezenas de parâmetros. Se fossem posicionais, você
        precisaria decorar a ordem. Com nomeados, fica claro <em>o que</em> cada valor
        significa. Marque como <code>required</code> só o que é essencial; o resto vira
        opcional com padrão sensato.
      </AlertBox>

      <h2>Funções como valores (first-class)</h2>
      <p>
        Você pode guardar uma função numa variável e passar adiante. O tipo de uma
        função usa o formato <code>Tipo Function(Parâmetros)</code>.
      </p>

      <CodeBlock
        title="Funções viajam como valores"
        code={`// Variável que guarda uma função (int, int) -> int
int Function(int, int) operacao = (a, b) => a + b;
print(operacao(2, 3)); // 5

// Função que recebe outra função
void executar(void Function() acao) {
  print('antes');
  acao();
  print('depois');
}

executar(() => print('rodou no meio'));

// Em Flutter você faz isso o tempo todo:
ElevatedButton(
  onPressed: () => print('clicou'),
  child: const Text('OK'),
);`}
      />

      <h2>Closures: funções que lembram do redor</h2>
      <p>
        Uma <strong>closure</strong> é uma função criada dentro de outro escopo que
        continua "lembrando" das variáveis daquele escopo, mesmo depois que ele acabou.
        Soa abstrato, mas você usa isso o tempo todo:
      </p>

      <CodeBlock
        title="Closure: o contador lembra de 'valor'"
        code={`int Function() criarContador() {
  var valor = 0;             // variável local
  return () {
    valor++;                 // a função interna ainda enxerga 'valor'
    return valor;
  };
}

final proximo = criarContador();
print(proximo()); // 1
print(proximo()); // 2
print(proximo()); // 3`}
      />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>
          Esquecer <code>required</code> num parâmetro nomeado essencial — o compilador
          aceita chamadas sem ele e você pega <code>null</code> em runtime.
        </li>
        <li>
          Usar <code>=&gt;</code> com mais de uma expressão. Arrow só serve para uma
          expressão única; com várias linhas, use <code>{`{ ... }`}</code>.
        </li>
        <li>
          Confundir <code>void Function()</code> com <code>Function</code>.
          <code>Function</code> sozinho aceita qualquer assinatura e prejudica a
          checagem de tipos.
        </li>
        <li>
          Capturar uma variável de loop dentro de uma closure achando que cada iteração
          terá uma "cópia". Use <code>final</code> dentro do loop para garantir.
        </li>
      </ul>

      <AlertBox type="warning" title="Evite o tipo Function genérico">
        Prefira sempre <code>void Function(int)</code> ou <code>String Function()</code>{" "}
        em vez de <code>Function</code>. Isso permite que o Dart pegue erros em tempo de
        compilação e seu IDE mostre as sugestões corretas.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Use parâmetros nomeados quando a função tem 3+ argumentos.</li>
        <li>Forneça valores padrão sensatos para reduzir ruído no chamador.</li>
        <li>Crie typedefs para assinaturas repetidas: <code>typedef Validador = String? Function(String);</code></li>
        <li>Funções pequenas (5–15 linhas) são mais fáceis de testar e reusar.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Com funções dominadas, o próximo bloco natural é <strong>Null Safety</strong> —
        entender quando um valor pode ser <code>null</code> e como o Dart te protege.
      </p>

      <AlertBox type="success" title="Tente agora">
        Reescreva sua função preferida com parâmetros nomeados e <code>required</code>.
        Veja como o código fica mais legível no chamador.
      </AlertBox>
    </PageContainer>
  );
}
