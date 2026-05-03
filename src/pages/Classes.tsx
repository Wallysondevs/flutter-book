import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Classes() {
  return (
    <PageContainer
      title="Classes & Objetos"
      subtitle="Sintaxe de classe, getters, setters, métodos e o conceito de objeto."
      difficulty="iniciante"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Em Flutter, <strong>tudo</strong> é uma instância de uma classe — desde um{" "}
        <code>Text</code> até a tela inteira. Modelar bem suas próprias classes
        (Usuário, Produto, Pedido) é o que mantém o app organizado conforme cresce.
        Sem classes, você acaba com Maps soltos, gambiarras e bugs que aparecem só
        em produção.
      </p>

      <h2>O conceito</h2>
      <p>
        Uma <strong>classe</strong> é a planta de uma casa: define quais cômodos
        (campos) e portas (métodos) existem. Um <strong>objeto</strong> é uma casa
        construída a partir dessa planta — você pode construir várias, cada uma com
        seus próprios valores. Em Dart, a planta vira <code>class</code> e cada casa
        vira uma instância criada com o construtor.
      </p>

      <h2>Como o Dart faz</h2>
      <CodeBlock
        title="Estrutura mínima"
        code={`class Pessoa {
  // CAMPOS — o que cada pessoa guarda
  final String nome;   // final = não muda depois de criada
  int idade;           // sem final = pode mudar

  // CONSTRUTOR — atalho 'this.x' atribui ao campo de mesmo nome
  Pessoa(this.nome, this.idade);

  // MÉTODO — o que uma pessoa sabe fazer
  void aniversario() {
    idade++;
    print('\$nome agora tem \$idade anos');
  }
}

// Uso
final p = Pessoa('Ana', 30);
p.aniversario();         // Ana agora tem 31 anos
print(p.nome);           // Ana
// p.nome = 'Bia';       // erro: campo final não muda`}
      />

      <AlertBox type="info" title="final por padrão">
        Comece marcando todos os campos como <code>final</code>. Só remova quando
        houver razão real para mutar. Classes imutáveis são mais fáceis de raciocinar,
        seguras em concorrência e funcionam bem com <code>const</code> em widgets.
      </AlertBox>

      <h2>Getters e setters: campos calculados</h2>
      <p>
        Às vezes um "campo" é na verdade resultado de uma conta. Em vez de método,
        use <strong>getter</strong> — chama-se sem parênteses, parece atributo:
      </p>

      <CodeBlock
        title="Getter para campo derivado"
        code={`class Retangulo {
  final double largura;
  final double altura;

  const Retangulo(this.largura, this.altura);

  // GETTER: chamada sem parênteses, bom para valores derivados
  double get area => largura * altura;
  double get perimetro => 2 * (largura + altura);
  bool get ehQuadrado => largura == altura;
}

const r = Retangulo(3, 4);
print(r.area);        // 12.0
print(r.ehQuadrado);  // false`}
      />

      <CodeBlock
        title="Setter: validação na hora de atribuir"
        code={`class Temperatura {
  double _celsius = 0;   // _ no início = privado ao arquivo

  double get celsius => _celsius;

  set celsius(double valor) {
    if (valor < -273.15) {
      throw ArgumentError('Abaixo do zero absoluto');
    }
    _celsius = valor;
  }

  double get fahrenheit => _celsius * 9 / 5 + 32;
}

final t = Temperatura();
t.celsius = 25;        // chama o setter (validação roda)
print(t.fahrenheit);   // 77.0`}
      />

      <h2>Exemplo prático: model de domínio</h2>
      <p>
        Como ficaria um model real para um app de tarefas — com campo derivado,
        método de comportamento e <code>toString</code> para debugar:
      </p>

      <CodeBlock
        title="Model Tarefa"
        code={`class Tarefa {
  final String id;
  final String titulo;
  final DateTime criadaEm;
  bool concluida;

  Tarefa({
    required this.id,
    required this.titulo,
    DateTime? criadaEm,
    this.concluida = false,
  }) : criadaEm = criadaEm ?? DateTime.now();

  Duration get tempoDeVida => DateTime.now().difference(criadaEm);

  void alternar() => concluida = !concluida;

  @override
  String toString() =>
      'Tarefa(\$id, "\$titulo", concluida=\$concluida)';
}

final t = Tarefa(id: '1', titulo: 'Estudar Dart');
t.alternar();
print(t);  // Tarefa(1, "Estudar Dart", concluida=true)`}
      />

      <h2>Visibilidade: público e privado</h2>
      <p>
        Dart não tem <code>private</code>/<code>public</code> como Java. A regra é
        simples: identificadores que começam com <code>_</code> (underscore) são{" "}
        <strong>privados ao arquivo</strong>. Tudo o mais é público dentro do mesmo
        pacote.
      </p>

      <h2>== e hashCode: igualdade estrutural</h2>
      <p>
        Por padrão, dois objetos são "iguais" só se forem a <em>mesma instância</em>.
        Para comparar pelo conteúdo, sobrescreva <code>==</code> e <code>hashCode</code>{" "}
        juntos. Em projetos reais, use pacotes como <code>equatable</code> ou{" "}
        <code>freezed</code> que geram isso pra você.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>
          Esquecer <code>final</code> em campos que nunca mudam — abre porta para
          mutações acidentais difíceis de rastrear.
        </li>
        <li>
          Sobrescrever <code>==</code> sem sobrescrever <code>hashCode</code> quebra
          Set, Map e comparações.
        </li>
        <li>
          Confundir <code>this</code> em construtor com <code>this</code> em método:
          em construtor, <code>this.x</code> é atalho para atribuição.
        </li>
        <li>
          Usar campo público mutável quando um getter+lógica seria mais seguro.
        </li>
      </ul>

      <AlertBox type="tip" title="Records: alternativa para dados leves">
        Para "tuplas" rápidas (ex.: retornar dois valores de uma função), use{" "}
        <strong>records</strong> do Dart 3:{" "}
        <code>(String nome, int idade)</code>. Já vêm com igualdade estrutural e
        zero código boilerplate. Use classes quando precisar de comportamento ou
        nomes claros.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Comece com tudo <code>final</code>; mute só quando necessário.</li>
        <li>Use getters para valores derivados — leitura mais limpa que método.</li>
        <li>Sobrescreva <code>toString</code> em models para debug eficiente.</li>
        <li>Para igualdade estrutural sem boilerplate, adote <code>freezed</code> ou <code>equatable</code>.</li>
        <li>Mantenha classes pequenas e focadas (Single Responsibility).</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Você cria classes, agora é hora de explorar todas as formas de{" "}
        <strong>construtores</strong> que o Dart oferece: nomeados, factory,
        redirecting e o poderoso <code>const</code> — fundamental para performance
        em Flutter.
      </p>

      <AlertBox type="success" title="Conexão com Flutter">
        Cada widget é uma classe. <code>StatelessWidget</code> tem campos finais e um
        método <code>build</code>. <code>StatefulWidget</code> separa configuração da
        classe que guarda estado (<code>State</code>). Tudo o que você aprendeu aqui
        se aplica diretamente lá.
      </AlertBox>
    </PageContainer>
  );
}
