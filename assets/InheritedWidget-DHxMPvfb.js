import{j as e}from"./index-D9yRYXwO.js";import{P as d,C as r,A as o}from"./AlertBox-B2Rl5ETq.js";function a(){return e.jsxs(d,{title:"InheritedWidget",subtitle:"O mecanismo nativo do Flutter para propagar dados árvore abaixo — base de Theme, Provider e MediaQuery.",difficulty:"avancado",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Você já usou ",e.jsx("code",{children:"Theme.of(context)"}),", ",e.jsx("code",{children:"MediaQuery.of(context)"}),", ",e.jsx("code",{children:"Navigator.of(context)"}),". Como esses widgets conseguem entregar dados que ficam lá no topo da árvore para qualquer descendente, mesmo 20 níveis abaixo, sem você passar parâmetros pelo caminho?"]}),e.jsxs("p",{children:["A resposta é o ",e.jsx("strong",{children:"InheritedWidget"})," — um tipo especial de widget que serve como ",e.jsx("em",{children:"broadcast de dados"})," para toda a subárvore abaixo dele. Provider, Riverpod, GoRouter, BLoC: todos usam InheritedWidget por baixo. Entendê-lo te dá o ",e.jsx("em",{children:"mental model"})," que faz tudo isso fazer sentido."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um InheritedWidget é como um ",e.jsx("em",{children:'"poste de aviso público"'})," colocado na árvore. Qualquer widget descendente pode olhar para esse poste (via ",e.jsx("code",{children:"context.dependOnInheritedWidgetOfExactType"}),") e ler o aviso. Quando o aviso muda, todos que estavam olhando recebem notificação para se redesenhar."]}),e.jsx("p",{children:"Quatro pontos importantes:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["É ",e.jsx("strong",{children:"imutável"}),": o widget em si não muda; quando o dado muda, um novo InheritedWidget é criado."]}),e.jsxs("li",{children:["O ",e.jsx("code",{children:"BuildContext"}),' é a "antena" que sabe localizar o poste mais próximo do tipo certo.']}),e.jsxs("li",{children:["Acessar via ",e.jsx("code",{children:"of(context)"})," registra o widget como dependente — ele rebuilda automaticamente quando o dado muda."]}),e.jsxs("li",{children:["É ",e.jsx("strong",{children:"O(1)"}),": encontrar o ancestral é direto pelo tipo, não percorre a árvore toda."]})]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsxs("p",{children:["Para criar um InheritedWidget você herda da classe e implementa dois pontos: o construtor com os dados e o método ",e.jsx("code",{children:"updateShouldNotify"}),", que diz se mudanças justificam rebuild."]}),e.jsx(r,{title:"lib/contador_inherited.dart",code:`import 'package:flutter/material.dart';

class ContadorInherited extends InheritedWidget {
  final int valor;
  final VoidCallback incrementar;

  const ContadorInherited({
    super.key,
    required this.valor,
    required this.incrementar,
    required super.child,
  });

  // Helper para acesso fácil: ContadorInherited.of(context).
  // dependOnInheritedWidgetOfExactType registra o caller como
  // dependente — ele vai rebuildar quando 'valor' mudar.
  static ContadorInherited of(BuildContext context) {
    final result = context
        .dependOnInheritedWidgetOfExactType<ContadorInherited>();
    assert(result != null, 'Nenhum ContadorInherited encontrado');
    return result!;
  }

  // Decide se descendentes precisam rebuildar. Se 'valor'
  // não mudou, não notifica (otimização).
  @override
  bool updateShouldNotify(ContadorInherited old) {
    return valor != old.valor;
  }
}`}),e.jsxs("p",{children:["Repare em ",e.jsx("code",{children:"updateShouldNotify"}),": comparar com cuidado é o que evita rebuilds inúteis. Se você sempre retornar ",e.jsx("code",{children:"true"}),", todos os dependentes rebuildam a cada mudança — péssimo para performance."]}),e.jsx("h2",{children:"Exemplo prático: contador compartilhado"}),e.jsxs("p",{children:["Como o InheritedWidget é imutável, normalmente você o coloca dentro de um StatefulWidget que mantém o dado mutável e ",e.jsx("em",{children:"recria"})," o InheritedWidget no ",e.jsx("code",{children:"build"}),":"]}),e.jsx(r,{title:"lib/contador_provider.dart",code:`class ContadorProvider extends StatefulWidget {
  final Widget child;
  const ContadorProvider({super.key, required this.child});

  @override
  State<ContadorProvider> createState() => _ContadorProviderState();
}

class _ContadorProviderState extends State<ContadorProvider> {
  int _valor = 0;

  void _incrementar() {
    setState(() => _valor++);
  }

  @override
  Widget build(BuildContext context) {
    // A cada setState, criamos um NOVO ContadorInherited.
    // Quem depende dele rebuilda automaticamente.
    return ContadorInherited(
      valor: _valor,
      incrementar: _incrementar,
      child: widget.child,
    );
  }
}

// Uso em qualquer widget descendente:
class ContadorTexto extends StatelessWidget {
  const ContadorTexto({super.key});
  @override
  Widget build(BuildContext context) {
    final c = ContadorInherited.of(context);
    return Text('Valor: \${c.valor}');
  }
}

class BotaoMais extends StatelessWidget {
  const BotaoMais({super.key});
  @override
  Widget build(BuildContext context) {
    final c = ContadorInherited.of(context);
    return ElevatedButton(
      onPressed: c.incrementar,
      child: const Text('+'),
    );
  }
}

// Na main:
void main() {
  runApp(MaterialApp(
    home: ContadorProvider(
      child: Scaffold(
        body: Column(
          children: const [ContadorTexto(), BotaoMais()],
        ),
      ),
    ),
  ));
}`}),e.jsxs("p",{children:["Esse padrão — StatefulWidget que envolve um InheritedWidget — é exatamente o que ",e.jsx("code",{children:"ChangeNotifierProvider"})," faz por baixo dos panos. Você acabou de implementar uma versão minúscula do ",e.jsx("code",{children:"provider"}),"!"]}),e.jsxs(o,{type:"info",title:"of(context) vs maybeOf(context)",children:["Use ",e.jsx("code",{children:"maybeOf"})," quando o ancestral é opcional (retorna ",e.jsx("code",{children:"null"}),"); use ",e.jsx("code",{children:"of"})," quando é obrigatório (lança erro se não achar). Padrão Flutter consagrado."]}),e.jsx("h2",{children:"InheritedWidget vs InheritedNotifier vs InheritedModel"}),e.jsx("p",{children:"Existem variações para casos específicos:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"InheritedNotifier<T extends Listenable>"}),": ouve um Listenable (ex: ChangeNotifier) e dispara rebuild automaticamente quando notifica. Reduz boilerplate."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"InheritedModel<Aspect>"}),': permite que dependentes escutem só uma "faceta" do dado. Útil quando o objeto é grande e você quer rebuilds granulares.']})]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"updateShouldNotify"})," correto:"]})," retornar ",e.jsx("code",{children:"true"})," sempre causa rebuilds em cascata; retornar ",e.jsx("code",{children:"false"})," sempre faz a UI nunca atualizar."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar ",e.jsx("code",{children:"findAncestorWidgetOfExactType"}),":"]})," esse método encontra mas ",e.jsx("strong",{children:"não registra dependência"})," — mudanças não disparam rebuild. Use ",e.jsx("code",{children:"dependOnInheritedWidgetOfExactType"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Acessar de fora da árvore:"})," InheritedWidget só funciona dentro do ",e.jsx("code",{children:"build"}),' de descendentes. Não tem como ler "de fora" como em Riverpod.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mutações dentro do InheritedWidget:"})," ele é imutável. Coloque o estado mutável no StatefulWidget pai."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Granularidade ruim:"})," um InheritedWidget gigante com 10 campos faz todos os dependentes rebuildarem quando qualquer um mudar. Quebre em vários."]})]}),e.jsx(o,{type:"warning",title:"Você quase nunca vai escrever um na mão",children:"Provider, Riverpod, BLoC, GoRouter, Theme, MediaQuery: todos já são (ou usam) InheritedWidgets prontos. Escrever seu próprio é raro — mas vale exercício para entender o sistema."}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(o,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Quando precisar compartilhar dados entre widgets, use ",e.jsx("strong",{children:"Provider"})," ou ",e.jsx("strong",{children:"Riverpod"})," em vez de criar InheritedWidget na mão."]}),e.jsxs("li",{children:["Sempre exponha um helper estático ",e.jsx("code",{children:"of(context)"})," e/ou ",e.jsx("code",{children:"maybeOf(context)"})," — convenção Flutter."]}),e.jsxs("li",{children:["Implemente ",e.jsx("code",{children:"updateShouldNotify"})," com comparação inteligente (campo por campo, não ",e.jsx("code",{children:"identical"}),")."]}),e.jsxs("li",{children:["Para vários campos independentes, use ",e.jsx("code",{children:"InheritedModel"})," ou múltiplos InheritedWidgets pequenos."]}),e.jsxs("li",{children:["Para integração com ",e.jsx("code",{children:"ChangeNotifier"})," ou ",e.jsx("code",{children:"ValueListenable"}),", use ",e.jsx("code",{children:"InheritedNotifier"}),"."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com InheritedWidget entendido, você desbloqueou o entendimento profundo de Flutter: agora sabe ",e.jsx("strong",{children:"por que"})," Provider, Theme e MediaQuery funcionam. Reveja os capítulos de ",e.jsx("strong",{children:"Provider"}),", ",e.jsx("strong",{children:"Riverpod"})," e ",e.jsx("strong",{children:"Temas"})," com esse novo olhar — tudo vai fazer mais sentido."]}),e.jsx(o,{type:"success",title:"Conhecimento que paga",children:"Saber InheritedWidget não muda seu código do dia a dia, mas muda a forma como você debugga, otimiza e raciocina sobre rebuilds. Vale o investimento."})]})}export{a as default};
