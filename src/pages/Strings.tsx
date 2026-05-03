import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Strings() {
  return (
    <PageContainer
      title="Strings & Interpolação"
      subtitle="Aspas simples, duplas, raw, multilinha e o $ que muda tudo."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Você vai escrever <strong>milhares</strong> de strings num app: textos de UI, mensagens de erro, queries de API, chaves de mapa. Saber interpolar valores, escapar caracteres e escolher a forma certa de concatenar evita bugs sutis e código feio.
      </p>

      <h2>O conceito</h2>
      <p>
        Em Dart, uma <code>String</code> é uma sequência <strong>imutável</strong> de unidades UTF-16. "Imutável" quer dizer: toda operação (uppercase, replace, substring) cria uma string nova. A original continua intocada.
      </p>

      <h2>Sintaxes de string</h2>
      <CodeBlock title="formas de declarar" code={`String simples = 'olá';
String dupla   = "olá";              // equivalente

// Aspas dentro de aspas:
String fala1 = "É 'top'";
String fala2 = 'É "top"';
String fala3 = 'É \\'top\\'';        // escape

// Multilinha (3 aspas):
String poema = '''
Linha 1
Linha 2
Linha 3
''';

// Raw (sem processar escapes nem interpolação):
String caminho = r'C:\\Users\\Ana\\arquivo.txt';
String regex   = r'\\d{3}\\.\\d{3}'; // útil para regex`} />

      <h2>Interpolação com $</h2>
      <CodeBlock title="$ é seu melhor amigo" code={`final nome = 'Ana';
final idade = 30;

// Variável simples: só $variavel
print('Olá, \$nome!');                // Olá, Ana!

// Expressão: \${ ... }
print('Próximo ano: \${idade + 1}');  // Próximo ano: 31

// Chamada de método/atributo:
print('em maiúsculas: \${nome.toUpperCase()}');

// Concatenação implícita de literais adjacentes:
final mensagem = 'parte 1 '
                 'parte 2 '
                 'parte 3';
print(mensagem); // parte 1 parte 2 parte 3`} />

      <AlertBox type="info" title="Prefira interpolação a concatenação">
        Em vez de <code>'Olá ' + nome + ', você tem ' + idade.toString() + ' anos'</code>, escreva <code>'Olá \$nome, você tem \$idade anos'</code>. Mais curto, mais legível e converte tipos automaticamente via <code>toString()</code>.
      </AlertBox>

      <h2>Métodos úteis no dia a dia</h2>
      <CodeBlock title="manipulação comum" code={`final s = '  Flutter é Top  ';

print(s.trim());                  // 'Flutter é Top'
print(s.toLowerCase());           // '  flutter é top  '
print(s.toUpperCase());           // '  FLUTTER É TOP  '
print(s.length);                  // 18
print(s.contains('Top'));         // true
print(s.startsWith('  Fl'));      // true
print(s.replaceAll('Top', 'Bom'));// '  Flutter é Bom  '
print(s.split(' '));              // ['', '', 'Flutter', 'é', 'Top', '', '']

// Conversões entre tipos:
int n = int.parse('42');                  // 42
int? n2 = int.tryParse('abc');            // null (não dispara exceção)
double d = double.parse('3.14');          // 3.14
String s2 = 42.toString();                // '42'
String s3 = 3.14159.toStringAsFixed(2);   // '3.14'`} />

      <h2>Exemplo prático: formatador de mensagem</h2>
      <CodeBlock title="composição de uma notificação" code={`String formatarNotificacao({
  required String usuario,
  required int novosLikes,
  String? ultimoComentario,
}) {
  final partes = <String>[
    'Olá, \$usuario!',
    if (novosLikes > 0)
      'Você tem \$novosLikes ' + (novosLikes == 1 ? 'curtida' : 'curtidas'),
    if (ultimoComentario != null && ultimoComentario.isNotEmpty)
      'Último comentário: "\$ultimoComentario"',
  ];
  return partes.join('\\n');
}

void main() {
  print(formatarNotificacao(
    usuario: 'Ana',
    novosLikes: 3,
    ultimoComentario: 'amei o app',
  ));
  // Olá, Ana!
  // Você tem 3 curtidas
  // Último comentário: "amei o app"
}`} />

      <h2>StringBuffer para muita concatenação</h2>
      <CodeBlock title="quando o + sai caro" code={`// Ruim em loop grande: cria string nova a cada iteração
String resultado = '';
for (var i = 0; i < 10000; i++) {
  resultado += 'item \$i\\n'; // O(n²)
}

// Bom: StringBuffer acumula em memória contígua
final buffer = StringBuffer();
for (var i = 0; i < 10000; i++) {
  buffer.writeln('item \$i'); // O(n)
}
final saida = buffer.toString();`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer as chaves</strong> em interpolação de expressão: <code>'$nome.length'</code> imprime "Ana.length". Use <code>{"'${nome.length}'"}</code>.</li>
        <li><strong>Strings são UTF-16</strong>: <code>'😀'.length</code> retorna <code>2</code>, não 1. Para contar caracteres reais use <code>characters</code> (pacote <code>characters</code>, já vem com Flutter).</li>
        <li><strong><code>parse</code> dispara exceção</strong> se o texto for inválido. Para evitar crash, prefira <code>tryParse</code>, que retorna <code>null</code>.</li>
        <li><strong>Comparação case-insensitive</strong> não é nativa: faça <code>a.toLowerCase() == b.toLowerCase()</code>.</li>
      </ul>

      <AlertBox type="warning" title="Strings vazias vs null">
        <code>''</code> e <code>null</code> são coisas diferentes. <code>'' == null</code> é <code>false</code>. Para checar "vazio ou null", use <code>texto == null || texto.isEmpty</code> ou o helper <code>(texto ?? '').isEmpty</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Hábitos que evitam dor">
        Use aspas simples por padrão (estilo do <em>linter</em> oficial). Use <em>raw strings</em> em regex e caminhos do Windows. Para textos do usuário em vários idiomas, use o pacote <code>intl</code> e <em>arb files</em> em vez de strings literais espalhadas.
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com strings dominadas, vamos ver como controlar o fluxo do programa: <code>if</code>, <code>switch</code> e o poderoso pattern matching do Dart 3.
      </p>

      <AlertBox type="success" title="Continue lendo">
        Próximo: <em>Controle de Fluxo</em>.
      </AlertBox>
    </PageContainer>
  );
}
