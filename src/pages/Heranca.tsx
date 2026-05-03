import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Heranca() {
  return (
    <PageContainer
      title="Herança"
      subtitle="extends, super, override, implements e por que composição costuma ser melhor."
      difficulty="intermediario"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Você usa herança no Flutter desde a primeira tela:{" "}
        <code>class MinhaTela extends StatelessWidget</code>. Entender como{" "}
        <code>extends</code>, <code>implements</code> e <code>@override</code>{" "}
        funcionam te dá controle sobre como criar widgets customizados, models de
        domínio e plugins. Saber também <em>quando não usar</em> herança evita
        códigos engessados e difíceis de manter.
      </p>

      <h2>O conceito</h2>
      <p>
        <strong>Herança</strong> é o "é-um": <code>Cachorro é um Animal</code>. A
        classe filha (subclasse) recebe automaticamente os campos e métodos da pai
        (superclasse), e pode adicionar ou substituir comportamento. Em Dart é{" "}
        <strong>single inheritance</strong>: cada classe tem no máximo uma pai. Para
        contratos múltiplos use <code>implements</code>; para reuso horizontal, use{" "}
        <code>mixin</code> (próximo capítulo).
      </p>

      <h2>Como o Dart faz</h2>
      <CodeBlock
        title="extends, super e @override"
        code={`class Animal {
  final String nome;
  Animal(this.nome);

  String falar() => '...';

  void apresentar() {
    print('Eu sou \$nome e digo: \${falar()}');
  }
}

class Cachorro extends Animal {
  // Repassa o argumento para o construtor da pai
  Cachorro(super.nome);

  // @override avisa o compilador que estou substituindo
  @override
  String falar() => 'Au!';
}

class Gato extends Animal {
  final bool vacinado;

  Gato(String nome, {this.vacinado = false}) : super(nome);

  @override
  String falar() => 'Miau';
}

void main() {
  Cachorro('Rex').apresentar();   // Eu sou Rex e digo: Au!
  Gato('Mia').apresentar();       // Eu sou Mia e digo: Miau
}`}
      />

      <AlertBox type="tip" title="super.parametro: o atalho moderno">
        Desde Dart 2.17, <code>Cachorro(super.nome)</code> repassa direto para o
        construtor da pai. Mais limpo que escrever <code>: super(nome)</code>.
      </AlertBox>

      <h2>Polimorfismo: tratar diferentes como iguais</h2>
      <p>
        O grande poder da herança é permitir tratar objetos de tipos diferentes pelo{" "}
        <em>contrato comum</em>. Você guarda <code>Cachorro</code>, <code>Gato</code>{" "}
        e <code>Pássaro</code> numa lista de <code>Animal</code> e chama{" "}
        <code>falar()</code> sem se importar com o tipo concreto:
      </p>

      <CodeBlock
        title="Polimorfismo em ação"
        code={`final bichos = <Animal>[
  Cachorro('Rex'),
  Gato('Mia'),
  Cachorro('Bidu'),
];

for (final a in bichos) {
  a.apresentar();   // chama a versão correta de falar() em cada um
}

// Verificação de tipo em runtime
for (final a in bichos) {
  if (a is Gato && a.vacinado) {
    print('\${a.nome} está vacinado');  // 'a' é promovido para Gato
  }
}`}
      />

      <h2>extends vs implements vs with</h2>
      <p>
        Três palavras-chave, três propósitos diferentes — confundir é a maior fonte
        de bugs em hierarquias:
      </p>

      <ul>
        <li>
          <code>extends Pai</code> — herda <strong>implementação</strong>. Reusa
          campos e métodos. Um pai só.
        </li>
        <li>
          <code>implements Contrato</code> — herda só a <strong>assinatura</strong>.
          Você precisa reimplementar tudo. Pode implementar vários.
        </li>
        <li>
          <code>with Mixin</code> — encaixa pedaços de comportamento de várias
          fontes (próximo capítulo).
        </li>
      </ul>

      <CodeBlock
        title="implements: contrato puro"
        code={`abstract class Salvavel {
  Future<void> salvar();
  Future<void> excluir();
}

abstract class Logavel {
  void logar(String msg);
}

class Pedido implements Salvavel, Logavel {
  final int id;
  Pedido(this.id);

  // Toda assinatura precisa ser implementada
  @override
  Future<void> salvar() async => print('Pedido \$id salvo');

  @override
  Future<void> excluir() async => print('Pedido \$id excluído');

  @override
  void logar(String msg) => print('[Pedido \$id] \$msg');
}`}
      />

      <h2>Classes abstratas: contratos com pedaços prontos</h2>
      <p>
        Uma <code>abstract class</code> não pode ser instanciada diretamente — serve
        como base. Pode ter métodos abstratos (sem corpo) que as filhas devem
        implementar, e métodos concretos com lógica padrão.
      </p>

      <CodeBlock
        title="Classe abstrata"
        code={`abstract class Pagamento {
  final double valor;
  Pagamento(this.valor);

  // Abstrato: cada subclasse decide como
  Future<bool> processar();

  // Concreto: lógica comum
  void emitirRecibo() {
    print('Recibo de R\$\$valor');
  }
}

class Pix extends Pagamento {
  Pix(super.valor);
  @override
  Future<bool> processar() async => true;
}`}
      />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>
          Esquecer <code>@override</code> — não quebra, mas tira a checagem do
          compilador caso você renomeie o método na pai.
        </li>
        <li>
          Sobrescrever <code>==</code> sem sobrescrever <code>hashCode</code>.
        </li>
        <li>
          Usar <code>extends</code> só para reusar 2 métodos — vira hierarquia
          frágil. Composição ou mixin costuma ser melhor.
        </li>
        <li>
          Hierarquias de 4+ níveis: cada nível adiciona acoplamento e dificulta
          mudança. Mantenha rasas.
        </li>
      </ul>

      <AlertBox type="warning" title="Composição &gt; herança">
        Em Flutter, raramente você precisa criar classes que estendem outros
        widgets que não sejam <code>StatelessWidget</code>/<code>StatefulWidget</code>.
        Para reaproveitar UI, <strong>componha</strong> widgets dentro de outro
        widget — não herde. Hierarquias profundas envelhecem mal.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Sempre marque overrides com <code>@override</code>.</li>
        <li>Prefira composição quando o relacionamento for "tem-um" e não "é-um".</li>
        <li>Use <code>abstract class</code> para contratos com lógica comum; <code>implements</code> para contratos puros.</li>
        <li>Mantenha hierarquias rasas (1–2 níveis) para facilidade de manutenção.</li>
        <li>Para hierarquias fechadas e seguras, considere <code>sealed class</code> (Dart 3).</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Você sabe herdar de uma classe. E quando precisa juntar comportamentos de
        várias fontes? É hora de <strong>Mixins</strong> — a forma elegante do Dart
        para reuso horizontal de código.
      </p>

      <AlertBox type="success" title="Aplicando no Flutter">
        Quando você escreve <code>class MyHomePage extends StatefulWidget</code>{" "}
        está usando exatamente o que viu aqui: herda implementação, sobrescreve{" "}
        <code>createState</code>, repassa <code>key</code> via <code>super</code>.
      </AlertBox>
    </PageContainer>
  );
}
