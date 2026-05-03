import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function NullSafety() {
  return (
    <PageContainer
      title="Null Safety"
      subtitle="O sistema de tipos que eliminou NullPointerException do Dart."
      difficulty="iniciante"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        <em>Null Pointer Exception</em> é o bug mais famoso do mundo da programação.
        Tony Hoare, que inventou o conceito de <code>null</code> em 1965, chamou isso
        de "meu erro de um bilhão de dólares". Dart 2.12 mudou o jogo: por padrão,
        nenhuma variável aceita <code>null</code>. Você só permite explicitamente
        quando faz sentido — e o compilador te força a tratar antes de usar.
      </p>

      <h2>O conceito</h2>
      <p>
        Pense num formulário em papel: alguns campos são obrigatórios (têm que ter
        algo escrito), outros são opcionais (podem ficar em branco). Em Dart, o tipo
        <code>String</code> é "obrigatório" — sempre tem texto. <code>String?</code>{" "}
        com a interrogação é "opcional" — pode estar vazio (null). Essa diferença
        viaja por todo o código, e o compilador checa cada uso.
      </p>

      <CodeBlock
        title="Não-nullable vs nullable"
        code={`String nome = 'Ana';        // não pode ser null
String? apelido;             // pode ser null (e começa null)

nome = null;    // erro de compilação: Strings nao aceitam null
apelido = null; // ok, foi declarado com ?

// Para usar 'apelido' onde se espera String, você PRECISA tratar
print(nome.length);       // ok, garantido
print(apelido.length);    // erro: pode ser null!`}
      />

      <AlertBox type="info" title="A regra mental">
        Se o tipo <strong>não</strong> tem <code>?</code>, o valor existe — pode usar
        à vontade. Se tem <code>?</code>, você precisa decidir o que fazer quando for
        null antes de chamar métodos.
      </AlertBox>

      <h2>Os operadores que você vai usar todo dia</h2>
      <p>
        Dart oferece quatro ferramentas curtas para trabalhar com tipos nullable.
        Cada uma resolve um caso específico:
      </p>

      <ul>
        <li><code>?.</code> <strong>chamada segura</strong>: se for null, devolve null em vez de explodir.</li>
        <li><code>??</code> <strong>valor padrão</strong>: substitui null por um fallback.</li>
        <li><code>??=</code> <strong>atribui se null</strong>: só escreve se ainda não tem valor.</li>
        <li><code>!</code> <strong>bang</strong>: você jura ao compilador que não é null. Se mentir, crash.</li>
      </ul>

      <CodeBlock
        title="Os quatro operadores em ação"
        code={`String? apelido = obterApelido();

// ?. chama .length só se apelido != null; senão devolve null
final tamanho = apelido?.length;        // int?

// ?? fornece um valor padrão se o lado esquerdo for null
final exibido = apelido ?? 'sem apelido';

// ??= atribui apenas se a variável for null
String? cache;
cache ??= 'valor inicial';   // grava
cache ??= 'outro valor';     // ignora, já tem

// ! força o tipo para não-nullable. Use SÓ se tiver certeza.
final letras = apelido!.length; // se for null em runtime: crash`}
      />

      <h2>late: prometo inicializar antes de usar</h2>
      <p>
        Às vezes uma variável não pode ser inicializada na declaração, mas você sabe
        que ela vai existir antes do primeiro uso (ex.: dependências de um framework,
        injeção de serviços, valores carregados em <code>initState</code>). É aí que
        entra <code>late</code>:
      </p>

      <CodeBlock
        title="late: inicialização adiada"
        code={`class ApiClient {
  late final String token;     // promessa: vou setar antes de usar

  Future<void> login() async {
    token = await fazerLogin(); // primeira atribuição
  }

  Future<dynamic> chamar(String url) async {
    // Se 'token' nunca foi setado, dá LateInitializationError aqui
    return http.get(url, headers: {'Authorization': token});
  }
}`}
      />

      <AlertBox type="warning" title="late é uma promessa, não mágica">
        <code>late</code> adia a checagem para runtime. Se você usar a variável antes
        de inicializar, vira <code>LateInitializationError</code>. Use com moderação;
        prefira passar valores pelo construtor sempre que possível.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>
          Abusar do <code>!</code> para "calar" o compilador. Cada bang é uma
          promessa que pode quebrar. Trate o null em vez de mentir.
        </li>
        <li>
          Confundir <code>String?</code> vazio com null. <code>''</code> é uma string
          vazia, não null. Cheque com <code>isEmpty</code> ou compare com <code>null</code>.
        </li>
        <li>
          Esquecer que o cast de JSON volta nullable: <code>map['nome'] as String?</code>{" "}
          é o seguro; <code>as String</code> dispara erro se faltar a chave.
        </li>
        <li>
          <code>List&lt;String?&gt;</code> e <code>List&lt;String&gt;?</code> são bem
          diferentes: o primeiro é uma lista que pode conter nulls; o segundo é uma
          lista que pode ser null inteira.
        </li>
      </ul>

      <AlertBox type="danger" title="Anti-padrão: bang em todo lugar">
        Se seu código está cheio de <code>x!.y!.z!</code>, você está usando o sistema
        de tipos como decoração. Refatore: faça checagens, use <code>?.</code> com{" "}
        <code>??</code> ou modele os dados sem nulls desnecessários.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Prefira tipos não-nullable. Modele os dados para que <code>null</code> seja exceção, não regra.</li>
        <li>Use <code>required</code> em parâmetros nomeados para evitar default null silencioso.</li>
        <li>Quando precisar de fallback, use <code>??</code>; quando precisar inicializar tarde, use <code>late final</code>.</li>
        <li>Em models, use <code>copyWith</code> com nullable só nos campos que realmente podem mudar para null.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Com null safety dominado, você está pronto para mergulhar nas coleções
        (<strong>List</strong>, <strong>Set</strong>, <strong>Map</strong>) — onde
        nullable aparece com frequência em <code>.firstWhere</code>,{" "}
        <code>map[chave]</code> e similares.
      </p>

      <AlertBox type="success" title="Hábito profissional">
        Sempre que escrever <code>?</code> num tipo, pergunte: "esse campo realmente
        precisa permitir null, ou estou sendo preguiçoso?". Tipos honestos = bugs
        evitados.
      </AlertBox>
    </PageContainer>
  );
}
