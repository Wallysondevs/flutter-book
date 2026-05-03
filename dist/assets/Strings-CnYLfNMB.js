import{j as e}from"./index-D4AOhXGO.js";import{P as o,C as i,A as r}from"./AlertBox-Dyf2wdSA.js";function t(){return e.jsxs(o,{title:"Strings & Interpolação",subtitle:"Aspas simples, duplas, raw, multilinha e o $ que muda tudo.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Você vai escrever ",e.jsx("strong",{children:"milhares"})," de strings num app: textos de UI, mensagens de erro, queries de API, chaves de mapa. Saber interpolar valores, escapar caracteres e escolher a forma certa de concatenar evita bugs sutis e código feio."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Em Dart, uma ",e.jsx("code",{children:"String"})," é uma sequência ",e.jsx("strong",{children:"imutável"}),' de unidades UTF-16. "Imutável" quer dizer: toda operação (uppercase, replace, substring) cria uma string nova. A original continua intocada.']}),e.jsx("h2",{children:"Sintaxes de string"}),e.jsx(i,{title:"formas de declarar",code:`String simples = 'olá';
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
String regex   = r'\\d{3}\\.\\d{3}'; // útil para regex`}),e.jsx("h2",{children:"Interpolação com $"}),e.jsx(i,{title:"$ é seu melhor amigo",code:`final nome = 'Ana';
final idade = 30;

// Variável simples: só $variavel
print('Olá, $nome!');                // Olá, Ana!

// Expressão: \${ ... }
print('Próximo ano: \${idade + 1}');  // Próximo ano: 31

// Chamada de método/atributo:
print('em maiúsculas: \${nome.toUpperCase()}');

// Concatenação implícita de literais adjacentes:
final mensagem = 'parte 1 '
                 'parte 2 '
                 'parte 3';
print(mensagem); // parte 1 parte 2 parte 3`}),e.jsxs(r,{type:"info",title:"Prefira interpolação a concatenação",children:["Em vez de ",e.jsx("code",{children:"'Olá ' + nome + ', você tem ' + idade.toString() + ' anos'"}),", escreva ",e.jsx("code",{children:"'Olá \\$nome, você tem \\$idade anos'"}),". Mais curto, mais legível e converte tipos automaticamente via ",e.jsx("code",{children:"toString()"}),"."]}),e.jsx("h2",{children:"Métodos úteis no dia a dia"}),e.jsx(i,{title:"manipulação comum",code:`final s = '  Flutter é Top  ';

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
String s3 = 3.14159.toStringAsFixed(2);   // '3.14'`}),e.jsx("h2",{children:"Exemplo prático: formatador de mensagem"}),e.jsx(i,{title:"composição de uma notificação",code:`String formatarNotificacao({
  required String usuario,
  required int novosLikes,
  String? ultimoComentario,
}) {
  final partes = <String>[
    'Olá, $usuario!',
    if (novosLikes > 0)
      'Você tem $novosLikes ' + (novosLikes == 1 ? 'curtida' : 'curtidas'),
    if (ultimoComentario != null && ultimoComentario.isNotEmpty)
      'Último comentário: "$ultimoComentario"',
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
}`}),e.jsx("h2",{children:"StringBuffer para muita concatenação"}),e.jsx(i,{title:"quando o + sai caro",code:`// Ruim em loop grande: cria string nova a cada iteração
String resultado = '';
for (var i = 0; i < 10000; i++) {
  resultado += 'item $i\\n'; // O(n²)
}

// Bom: StringBuffer acumula em memória contígua
final buffer = StringBuffer();
for (var i = 0; i < 10000; i++) {
  buffer.writeln('item $i'); // O(n)
}
final saida = buffer.toString();`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer as chaves"})," em interpolação de expressão: ",e.jsx("code",{children:"'$nome.length'"}),' imprime "Ana.length". Use ',e.jsx("code",{children:"'${nome.length}'"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Strings são UTF-16"}),": ",e.jsx("code",{children:"'😀'.length"})," retorna ",e.jsx("code",{children:"2"}),", não 1. Para contar caracteres reais use ",e.jsx("code",{children:"characters"})," (pacote ",e.jsx("code",{children:"characters"}),", já vem com Flutter)."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:[e.jsx("code",{children:"parse"})," dispara exceção"]})," se o texto for inválido. Para evitar crash, prefira ",e.jsx("code",{children:"tryParse"}),", que retorna ",e.jsx("code",{children:"null"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Comparação case-insensitive"})," não é nativa: faça ",e.jsx("code",{children:"a.toLowerCase() == b.toLowerCase()"}),"."]})]}),e.jsxs(r,{type:"warning",title:"Strings vazias vs null",children:[e.jsx("code",{children:"''"})," e ",e.jsx("code",{children:"null"})," são coisas diferentes. ",e.jsx("code",{children:"'' == null"})," é ",e.jsx("code",{children:"false"}),'. Para checar "vazio ou null", use ',e.jsx("code",{children:"texto == null || texto.isEmpty"})," ou o helper ",e.jsx("code",{children:"(texto ?? '').isEmpty"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(r,{type:"tip",title:"Hábitos que evitam dor",children:["Use aspas simples por padrão (estilo do ",e.jsx("em",{children:"linter"})," oficial). Use ",e.jsx("em",{children:"raw strings"})," em regex e caminhos do Windows. Para textos do usuário em vários idiomas, use o pacote ",e.jsx("code",{children:"intl"})," e ",e.jsx("em",{children:"arb files"})," em vez de strings literais espalhadas."]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com strings dominadas, vamos ver como controlar o fluxo do programa: ",e.jsx("code",{children:"if"}),", ",e.jsx("code",{children:"switch"})," e o poderoso pattern matching do Dart 3."]}),e.jsxs(r,{type:"success",title:"Continue lendo",children:["Próximo: ",e.jsx("em",{children:"Controle de Fluxo"}),"."]})]})}export{t as default};
