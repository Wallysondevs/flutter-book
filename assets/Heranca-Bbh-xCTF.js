import{j as e}from"./index-D9yRYXwO.js";import{P as s,C as a,A as r}from"./AlertBox-B2Rl5ETq.js";function d(){return e.jsxs(s,{title:"Herança",subtitle:"extends, super, override, implements e por que composição costuma ser melhor.",difficulty:"intermediario",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Você usa herança no Flutter desde a primeira tela:"," ",e.jsx("code",{children:"class MinhaTela extends StatelessWidget"}),". Entender como"," ",e.jsx("code",{children:"extends"}),", ",e.jsx("code",{children:"implements"})," e ",e.jsx("code",{children:"@override"})," ","funcionam te dá controle sobre como criar widgets customizados, models de domínio e plugins. Saber também ",e.jsx("em",{children:"quando não usar"})," herança evita códigos engessados e difíceis de manter."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Herança"}),' é o "é-um": ',e.jsx("code",{children:"Cachorro é um Animal"}),". A classe filha (subclasse) recebe automaticamente os campos e métodos da pai (superclasse), e pode adicionar ou substituir comportamento. Em Dart é"," ",e.jsx("strong",{children:"single inheritance"}),": cada classe tem no máximo uma pai. Para contratos múltiplos use ",e.jsx("code",{children:"implements"}),"; para reuso horizontal, use"," ",e.jsx("code",{children:"mixin"})," (próximo capítulo)."]}),e.jsx("h2",{children:"Como o Dart faz"}),e.jsx(a,{title:"extends, super e @override",code:`class Animal {
  final String nome;
  Animal(this.nome);

  String falar() => '...';

  void apresentar() {
    print('Eu sou $nome e digo: \${falar()}');
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
}`}),e.jsxs(r,{type:"tip",title:"super.parametro: o atalho moderno",children:["Desde Dart 2.17, ",e.jsx("code",{children:"Cachorro(super.nome)"})," repassa direto para o construtor da pai. Mais limpo que escrever ",e.jsx("code",{children:": super(nome)"}),"."]}),e.jsx("h2",{children:"Polimorfismo: tratar diferentes como iguais"}),e.jsxs("p",{children:["O grande poder da herança é permitir tratar objetos de tipos diferentes pelo"," ",e.jsx("em",{children:"contrato comum"}),". Você guarda ",e.jsx("code",{children:"Cachorro"}),", ",e.jsx("code",{children:"Gato"})," ","e ",e.jsx("code",{children:"Pássaro"})," numa lista de ",e.jsx("code",{children:"Animal"})," e chama"," ",e.jsx("code",{children:"falar()"})," sem se importar com o tipo concreto:"]}),e.jsx(a,{title:"Polimorfismo em ação",code:`final bichos = <Animal>[
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
}`}),e.jsx("h2",{children:"extends vs implements vs with"}),e.jsx("p",{children:"Três palavras-chave, três propósitos diferentes — confundir é a maior fonte de bugs em hierarquias:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"extends Pai"})," — herda ",e.jsx("strong",{children:"implementação"}),". Reusa campos e métodos. Um pai só."]}),e.jsxs("li",{children:[e.jsx("code",{children:"implements Contrato"})," — herda só a ",e.jsx("strong",{children:"assinatura"}),". Você precisa reimplementar tudo. Pode implementar vários."]}),e.jsxs("li",{children:[e.jsx("code",{children:"with Mixin"})," — encaixa pedaços de comportamento de várias fontes (próximo capítulo)."]})]}),e.jsx(a,{title:"implements: contrato puro",code:`abstract class Salvavel {
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
  Future<void> salvar() async => print('Pedido $id salvo');

  @override
  Future<void> excluir() async => print('Pedido $id excluído');

  @override
  void logar(String msg) => print('[Pedido $id] $msg');
}`}),e.jsx("h2",{children:"Classes abstratas: contratos com pedaços prontos"}),e.jsxs("p",{children:["Uma ",e.jsx("code",{children:"abstract class"})," não pode ser instanciada diretamente — serve como base. Pode ter métodos abstratos (sem corpo) que as filhas devem implementar, e métodos concretos com lógica padrão."]}),e.jsx(a,{title:"Classe abstrata",code:`abstract class Pagamento {
  final double valor;
  Pagamento(this.valor);

  // Abstrato: cada subclasse decide como
  Future<bool> processar();

  // Concreto: lógica comum
  void emitirRecibo() {
    print('Recibo de R$$valor');
  }
}

class Pix extends Pagamento {
  Pix(super.valor);
  @override
  Future<bool> processar() async => true;
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Esquecer ",e.jsx("code",{children:"@override"})," — não quebra, mas tira a checagem do compilador caso você renomeie o método na pai."]}),e.jsxs("li",{children:["Sobrescrever ",e.jsx("code",{children:"=="})," sem sobrescrever ",e.jsx("code",{children:"hashCode"}),"."]}),e.jsxs("li",{children:["Usar ",e.jsx("code",{children:"extends"})," só para reusar 2 métodos — vira hierarquia frágil. Composição ou mixin costuma ser melhor."]}),e.jsx("li",{children:"Hierarquias de 4+ níveis: cada nível adiciona acoplamento e dificulta mudança. Mantenha rasas."})]}),e.jsxs(r,{type:"warning",title:"Composição > herança",children:["Em Flutter, raramente você precisa criar classes que estendem outros widgets que não sejam ",e.jsx("code",{children:"StatelessWidget"}),"/",e.jsx("code",{children:"StatefulWidget"}),". Para reaproveitar UI, ",e.jsx("strong",{children:"componha"})," widgets dentro de outro widget — não herde. Hierarquias profundas envelhecem mal."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Sempre marque overrides com ",e.jsx("code",{children:"@override"}),"."]}),e.jsx("li",{children:'Prefira composição quando o relacionamento for "tem-um" e não "é-um".'}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"abstract class"})," para contratos com lógica comum; ",e.jsx("code",{children:"implements"})," para contratos puros."]}),e.jsx("li",{children:"Mantenha hierarquias rasas (1–2 níveis) para facilidade de manutenção."}),e.jsxs("li",{children:["Para hierarquias fechadas e seguras, considere ",e.jsx("code",{children:"sealed class"})," (Dart 3)."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Você sabe herdar de uma classe. E quando precisa juntar comportamentos de várias fontes? É hora de ",e.jsx("strong",{children:"Mixins"})," — a forma elegante do Dart para reuso horizontal de código."]}),e.jsxs(r,{type:"success",title:"Aplicando no Flutter",children:["Quando você escreve ",e.jsx("code",{children:"class MyHomePage extends StatefulWidget"})," ","está usando exatamente o que viu aqui: herda implementação, sobrescreve"," ",e.jsx("code",{children:"createState"}),", repassa ",e.jsx("code",{children:"key"})," via ",e.jsx("code",{children:"super"}),"."]})]})}export{d as default};
