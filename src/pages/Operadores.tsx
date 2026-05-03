import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Operadores() {
  return (
    <PageContainer
      title="Operadores"
      subtitle="Aritméticos, lógicos, cascade e null-aware — incluindo os exclusivos do Dart."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Operadores são a "cola" que liga valores e expressões. Dart tem todos os clássicos (<code>+</code>, <code>-</code>, <code>&&</code>, <code>||</code>) e alguns peculiares — <code>??</code>, <code>?.</code>, <code>..</code>, <code>~/</code> — que aparecem o tempo todo em código Flutter idiomático. Conhecê-los economiza muitas linhas e bugs.
      </p>

      <h2>O conceito</h2>
      <p>
        Um operador é apenas um símbolo que executa uma operação sobre um ou dois operandos. Em Dart, vários operadores são <strong>açúcar sintático</strong> para chamadas de método: <code>a + b</code> equivale a <code>a.operator+(b)</code>. Por isso, suas próprias classes podem sobrecarregar operadores.
      </p>

      <h2>Aritméticos e comparação</h2>
      <CodeBlock title="o básico" code={`int a = 10, b = 3;

print(a + b);   // 13
print(a - b);   // 7
print(a * b);   // 30
print(a / b);   // 3.3333... (sempre double)
print(a ~/ b);  // 3 (divisão inteira)
print(a % b);   // 1 (resto)

print(a == b);  // false (compara valor, não referência)
print(a != b);  // true
print(a > b);   // true

// Lógicos:
print(a > 0 && b > 0);  // true (E)
print(a < 0 || b > 0);  // true (OU)
print(!(a == b));       // true (NÃO)`} />

      <h2>Operadores exclusivos do Dart</h2>
      <ul>
        <li><strong><code>~/</code></strong> — divisão inteira (descarta a parte decimal).</li>
        <li><strong><code>??</code></strong> — retorna o lado direito se o esquerdo for <code>null</code>.</li>
        <li><strong><code>??=</code></strong> — atribui só se a variável atual for <code>null</code>.</li>
        <li><strong><code>?.</code></strong> — chamada/acesso seguro em valor nullable; resultado é nullable.</li>
        <li><strong><code>!</code></strong> — afirma "isto não é null" (perigoso, quebra em runtime se for).</li>
        <li><strong><code>..</code></strong> — <em>cascade</em>: encadeia chamadas/atribuições no mesmo objeto.</li>
        <li><strong><code>?..</code></strong> — cascade null-aware: só executa se o objeto não for null.</li>
      </ul>

      <CodeBlock title="null-aware na prática" code={`String? nome; // null

// Sem null-aware:
String mostrar = nome == null ? 'anônimo' : nome.toUpperCase();

// Com null-aware:
String mostrar2 = nome?.toUpperCase() ?? 'ANÔNIMO';

// Atribui só se for null:
nome ??= 'sem nome';

// Cascade — configura objeto sem repetir nome:
final controller = TextEditingController()
  ..text = 'Ana'
  ..selection = const TextSelection.collapsed(offset: 3);`} />

      <h2>Exemplo prático em Flutter</h2>
      <CodeBlock title="cascade brilha em UI" code={`import 'package:flutter/material.dart';

// Sem cascade — repetitivo:
final paint1 = Paint();
paint1.color = Colors.blue;
paint1.strokeWidth = 4;
paint1.style = PaintingStyle.stroke;

// Com cascade — limpo:
final paint2 = Paint()
  ..color = Colors.blue
  ..strokeWidth = 4
  ..style = PaintingStyle.stroke;

// Combinando ?? e ?. para evitar nulls:
class Usuario {
  final String? avatarUrl;
  Usuario({this.avatarUrl});
}

String urlSegura(Usuario? u) {
  return u?.avatarUrl ?? 'assets/placeholder.png';
}`} />

      <h2>Atribuições compostas</h2>
      <CodeBlock title="atalhos comuns" code={`int x = 10;
x += 5;   // x = x + 5  → 15
x -= 2;   // 13
x *= 2;   // 26
x ~/= 3;  // 8 (divisão inteira)
x %= 5;   // 3

List<int> nums = [];
nums..add(1)..add(2)..add(3); // 3 cascades em uma linha`} />

      <AlertBox type="info" title="Cascade economiza variáveis">
        Em vez de criar uma variável temporária só para configurar um objeto, encadeie com <code>..</code>. O resultado da expressão continua sendo o objeto original — útil em construtores complexos.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong><code>/</code> sempre retorna double</strong>. <code>10 / 2</code> dá <code>5.0</code>, não <code>5</code>. Use <code>~/</code> para inteiro.</li>
        <li><strong><code>!</code> não testa, ele afirma</strong>. <code>x!</code> diz ao compilador "confie em mim". Se <code>x</code> for null, o app crasha.</li>
        <li><strong>Precedência de <code>??</code></strong>: <code>a ?? b + c</code> é <code>a ?? (b + c)</code>. Use parênteses se em dúvida.</li>
        <li><strong>Cascade em método que retorna outro tipo</strong>: <code>lista..add(1)..length</code> ainda retorna a lista, não o length.</li>
        <li><strong><code>==</code> em Dart compara valor por padrão</strong>; para identidade use <code>identical(a, b)</code>.</li>
      </ul>

      <AlertBox type="danger" title="Cuidado com o operador !">
        Cada <code>!</code> é uma promessa não checada. Em código de produção, prefira <code>if (x != null)</code>, <code>?.</code> ou <code>??</code>. O <code>!</code> deve ser exceção, não regra.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Estilo idiomático">
        Em código Flutter, você verá muito <code>?.</code>, <code>??</code> e <code>..</code>. Eles tornam o código mais curto e seguro. Quando precisar configurar um objeto com várias propriedades, use cascade — fica óbvio que tudo se aplica ao mesmo alvo.
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com operadores na ponta da língua, vamos para o tipo mais usado de todos: as Strings, com sua interpolação poderosa.
      </p>

      <AlertBox type="success" title="Continue lendo">
        Próximo: <em>Strings &amp; Interpolação</em>.
      </AlertBox>
    </PageContainer>
  );
}
