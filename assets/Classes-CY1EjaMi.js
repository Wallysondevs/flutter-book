import{j as e}from"./index-D9yRYXwO.js";import{P as s,C as a,A as o}from"./AlertBox-B2Rl5ETq.js";function d(){return e.jsxs(s,{title:"Classes & Objetos",subtitle:"Sintaxe de classe, getters, setters, métodos e o conceito de objeto.",difficulty:"iniciante",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Em Flutter, ",e.jsx("strong",{children:"tudo"})," é uma instância de uma classe — desde um"," ",e.jsx("code",{children:"Text"})," até a tela inteira. Modelar bem suas próprias classes (Usuário, Produto, Pedido) é o que mantém o app organizado conforme cresce. Sem classes, você acaba com Maps soltos, gambiarras e bugs que aparecem só em produção."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Uma ",e.jsx("strong",{children:"classe"})," é a planta de uma casa: define quais cômodos (campos) e portas (métodos) existem. Um ",e.jsx("strong",{children:"objeto"})," é uma casa construída a partir dessa planta — você pode construir várias, cada uma com seus próprios valores. Em Dart, a planta vira ",e.jsx("code",{children:"class"})," e cada casa vira uma instância criada com o construtor."]}),e.jsx("h2",{children:"Como o Dart faz"}),e.jsx(a,{title:"Estrutura mínima",code:`class Pessoa {
  // CAMPOS — o que cada pessoa guarda
  final String nome;   // final = não muda depois de criada
  int idade;           // sem final = pode mudar

  // CONSTRUTOR — atalho 'this.x' atribui ao campo de mesmo nome
  Pessoa(this.nome, this.idade);

  // MÉTODO — o que uma pessoa sabe fazer
  void aniversario() {
    idade++;
    print('$nome agora tem $idade anos');
  }
}

// Uso
final p = Pessoa('Ana', 30);
p.aniversario();         // Ana agora tem 31 anos
print(p.nome);           // Ana
// p.nome = 'Bia';       // erro: campo final não muda`}),e.jsxs(o,{type:"info",title:"final por padrão",children:["Comece marcando todos os campos como ",e.jsx("code",{children:"final"}),". Só remova quando houver razão real para mutar. Classes imutáveis são mais fáceis de raciocinar, seguras em concorrência e funcionam bem com ",e.jsx("code",{children:"const"})," em widgets."]}),e.jsx("h2",{children:"Getters e setters: campos calculados"}),e.jsxs("p",{children:['Às vezes um "campo" é na verdade resultado de uma conta. Em vez de método, use ',e.jsx("strong",{children:"getter"})," — chama-se sem parênteses, parece atributo:"]}),e.jsx(a,{title:"Getter para campo derivado",code:`class Retangulo {
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
print(r.ehQuadrado);  // false`}),e.jsx(a,{title:"Setter: validação na hora de atribuir",code:`class Temperatura {
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
print(t.fahrenheit);   // 77.0`}),e.jsx("h2",{children:"Exemplo prático: model de domínio"}),e.jsxs("p",{children:["Como ficaria um model real para um app de tarefas — com campo derivado, método de comportamento e ",e.jsx("code",{children:"toString"})," para debugar:"]}),e.jsx(a,{title:"Model Tarefa",code:`class Tarefa {
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
      'Tarefa($id, "$titulo", concluida=$concluida)';
}

final t = Tarefa(id: '1', titulo: 'Estudar Dart');
t.alternar();
print(t);  // Tarefa(1, "Estudar Dart", concluida=true)`}),e.jsx("h2",{children:"Visibilidade: público e privado"}),e.jsxs("p",{children:["Dart não tem ",e.jsx("code",{children:"private"}),"/",e.jsx("code",{children:"public"})," como Java. A regra é simples: identificadores que começam com ",e.jsx("code",{children:"_"})," (underscore) são"," ",e.jsx("strong",{children:"privados ao arquivo"}),". Tudo o mais é público dentro do mesmo pacote."]}),e.jsx("h2",{children:"== e hashCode: igualdade estrutural"}),e.jsxs("p",{children:['Por padrão, dois objetos são "iguais" só se forem a ',e.jsx("em",{children:"mesma instância"}),". Para comparar pelo conteúdo, sobrescreva ",e.jsx("code",{children:"=="})," e ",e.jsx("code",{children:"hashCode"})," ","juntos. Em projetos reais, use pacotes como ",e.jsx("code",{children:"equatable"})," ou"," ",e.jsx("code",{children:"freezed"})," que geram isso pra você."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Esquecer ",e.jsx("code",{children:"final"})," em campos que nunca mudam — abre porta para mutações acidentais difíceis de rastrear."]}),e.jsxs("li",{children:["Sobrescrever ",e.jsx("code",{children:"=="})," sem sobrescrever ",e.jsx("code",{children:"hashCode"})," quebra Set, Map e comparações."]}),e.jsxs("li",{children:["Confundir ",e.jsx("code",{children:"this"})," em construtor com ",e.jsx("code",{children:"this"})," em método: em construtor, ",e.jsx("code",{children:"this.x"})," é atalho para atribuição."]}),e.jsx("li",{children:"Usar campo público mutável quando um getter+lógica seria mais seguro."})]}),e.jsxs(o,{type:"tip",title:"Records: alternativa para dados leves",children:['Para "tuplas" rápidas (ex.: retornar dois valores de uma função), use'," ",e.jsx("strong",{children:"records"})," do Dart 3:"," ",e.jsx("code",{children:"(String nome, int idade)"}),". Já vêm com igualdade estrutural e zero código boilerplate. Use classes quando precisar de comportamento ou nomes claros."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Comece com tudo ",e.jsx("code",{children:"final"}),"; mute só quando necessário."]}),e.jsx("li",{children:"Use getters para valores derivados — leitura mais limpa que método."}),e.jsxs("li",{children:["Sobrescreva ",e.jsx("code",{children:"toString"})," em models para debug eficiente."]}),e.jsxs("li",{children:["Para igualdade estrutural sem boilerplate, adote ",e.jsx("code",{children:"freezed"})," ou ",e.jsx("code",{children:"equatable"}),"."]}),e.jsx("li",{children:"Mantenha classes pequenas e focadas (Single Responsibility)."})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Você cria classes, agora é hora de explorar todas as formas de"," ",e.jsx("strong",{children:"construtores"})," que o Dart oferece: nomeados, factory, redirecting e o poderoso ",e.jsx("code",{children:"const"})," — fundamental para performance em Flutter."]}),e.jsxs(o,{type:"success",title:"Conexão com Flutter",children:["Cada widget é uma classe. ",e.jsx("code",{children:"StatelessWidget"})," tem campos finais e um método ",e.jsx("code",{children:"build"}),". ",e.jsx("code",{children:"StatefulWidget"})," separa configuração da classe que guarda estado (",e.jsx("code",{children:"State"}),"). Tudo o que você aprendeu aqui se aplica diretamente lá."]})]})}export{d as default};
