import{j as e}from"./index-D9yRYXwO.js";import{P as i,A as t,C as s}from"./AlertBox-B2Rl5ETq.js";function r(){return e.jsxs(i,{title:"Widget Tests",subtitle:"Renderize widgets em ambiente headless e simule interações sem precisar de device.",difficulty:"intermediario",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Você já sabe testar lógica pura. Mas e quando precisa garantir que ",e.jsx("em",{children:'"ao tocar no botão de adicionar, o contador na tela passa de 0 para 1"'}),"? Isso envolve árvore de widgets, estado, gestos — território de ",e.jsx("strong",{children:"widget tests"}),"."]}),e.jsxs("p",{children:["O ganho: eles são ",e.jsx("strong",{children:"quase tão rápidos quanto unit tests"})," (rodam num ambiente headless, sem GPU nem device), mas validam de verdade a UI. Você pode rodar centenas em segundos."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["O Flutter fornece um ",e.jsx("strong",{children:"renderer fake"})," só para testes. Em vez de pintar pixels na tela, ele monta a árvore na memória e te dá um objeto ",e.jsx("code",{children:"tester"})," com superpoderes:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Renderizar"})," qualquer widget: ",e.jsx("code",{children:"tester.pumpWidget(...)"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Encontrar"})," elementos por texto, ícone, tipo, key: ",e.jsx("code",{children:"find.text(...)"}),", ",e.jsx("code",{children:"find.byIcon(...)"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Interagir"}),": tap, long press, drag, digitar texto: ",e.jsx("code",{children:"tester.tap(...)"}),", ",e.jsx("code",{children:"tester.enterText(...)"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Avançar o tempo"}),": ",e.jsx("code",{children:"tester.pump()"})," dispara um quadro; ",e.jsx("code",{children:"tester.pumpAndSettle()"})," roda até as animações terminarem."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Verificar"})," com ",e.jsx("code",{children:"expect(find.text('Olá'), findsOneWidget)"}),"."]})]}),e.jsxs(t,{type:"info",title:"pump vs pumpAndSettle",children:[e.jsx("code",{children:"pump()"})," roda ",e.jsx("em",{children:"um"})," quadro — útil quando você quer inspecionar o meio de uma animação. ",e.jsx("code",{children:"pumpAndSettle()"})," continua bombando quadros até nada mais mudar (cuidado: trava se houver animação infinita)."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(s,{title:"lib/contador.dart",code:`import 'package:flutter/material.dart';

class Contador extends StatefulWidget {
  const Contador({super.key});
  @override
  State<Contador> createState() => _ContadorState();
}

class _ContadorState extends State<Contador> {
  int valor = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text('$valor', key: const Key('display'))),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => valor++),
        child: const Icon(Icons.add),
      ),
    );
  }
}`}),e.jsx(s,{title:"test/contador_test.dart",code:`import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:meu_app/contador.dart';

void main() {
  testWidgets('contador começa em 0 e incrementa ao tocar', (tester) async {
    // 1) renderiza o widget envolto em MaterialApp (Scaffold precisa)
    await tester.pumpWidget(const MaterialApp(home: Contador()));

    // 2) verifica estado inicial — texto "0" aparece exatamente uma vez
    expect(find.text('0'), findsOneWidget);
    expect(find.text('1'), findsNothing);

    // 3) simula toque no FAB (encontra pelo ícone)
    await tester.tap(find.byIcon(Icons.add));

    // 4) avança um quadro para o setState refletir
    await tester.pump();

    // 5) verifica novo estado
    expect(find.text('1'), findsOneWidget);
    expect(find.text('0'), findsNothing);
  });

  testWidgets('três toques chegam a 3', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Contador()));

    for (var i = 0; i < 3; i++) {
      await tester.tap(find.byIcon(Icons.add));
      await tester.pump();
    }
    expect(find.text('3'), findsOneWidget);
  });
}`}),e.jsx("h2",{children:"Exemplo prático: formulário com validação"}),e.jsx(s,{title:"login com validação",code:`testWidgets('mostra erro quando email vazio', (tester) async {
  await tester.pumpWidget(const MaterialApp(home: TelaLogin()));

  // não preenche nada, toca em "Entrar"
  await tester.tap(find.text('Entrar'));
  await tester.pump(); // valida e reconstrói com erro

  expect(find.text('Email obrigatório'), findsOneWidget);
});

testWidgets('chama onLogin com credenciais válidas', (tester) async {
  String? emailRecebido;
  String? senhaRecebida;

  await tester.pumpWidget(MaterialApp(
    home: TelaLogin(
      onLogin: (e, s) { emailRecebido = e; senhaRecebida = s; },
    ),
  ));

  // identifica campos por Key — recomendado em testes
  await tester.enterText(find.byKey(const Key('email')), 'a@b.com');
  await tester.enterText(find.byKey(const Key('senha')), 'segredo');
  await tester.tap(find.text('Entrar'));
  await tester.pump();

  expect(emailRecebido, 'a@b.com');
  expect(senhaRecebida, 'segredo');
});`}),e.jsx("h2",{children:"Finders úteis"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"find.text('X')"})," — texto literal visível."]}),e.jsxs("li",{children:[e.jsx("code",{children:"find.byKey(Key('x'))"})," — mais robusto a mudanças de UI; use em campos importantes."]}),e.jsxs("li",{children:[e.jsx("code",{children:"find.byIcon(Icons.add)"}),", ",e.jsx("code",{children:"find.byType(TextField)"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"find.byTooltip('Adicionar')"}),", ",e.jsx("code",{children:"find.bySemanticsLabel('...')"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"find.descendant(of: ..., matching: ...)"})," — combinação para casos complexos."]})]}),e.jsx("h2",{children:"Matchers úteis para finders"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"findsOneWidget"})," — encontrou exatamente 1."]}),e.jsxs("li",{children:[e.jsx("code",{children:"findsNothing"})," — não encontrou nenhum."]}),e.jsxs("li",{children:[e.jsx("code",{children:"findsNWidgets(3)"})," — quantidade exata."]}),e.jsxs("li",{children:[e.jsx("code",{children:"findsAtLeastNWidgets(2)"})," — pelo menos N."]})]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esqueceu o ",e.jsx("code",{children:"MaterialApp"})]}),": muitos widgets (Scaffold, Text com tema) crasham sem ele. Sempre envolva em ",e.jsx("code",{children:"MaterialApp(home: ...)"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Não chamou ",e.jsx("code",{children:"pump"})," depois do tap"]}),": o estado mudou na memória, mas a árvore só reconstrói no próximo quadro. Sem ",e.jsx("code",{children:"pump"}),", o assert ainda vê o estado antigo."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:[e.jsx("code",{children:"pumpAndSettle"})," com animação infinita"]}),": trava o teste para sempre. Se houver loop, use ",e.jsx("code",{children:"pump(Duration(...))"})," manual."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Encontrar texto que está fora da viewport"}),": ",e.jsx("code",{children:"find.text"})," só acha widgets renderizados. Use ",e.jsx("code",{children:"tester.scrollUntilVisible(...)"})," para listas longas."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Texto com formatação rica"})," (",e.jsx("code",{children:"Text.rich"}),"): pode não bater com ",e.jsx("code",{children:"find.text"}),". Use ",e.jsx("code",{children:"find.textContaining(...)"})," ou key."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Async não awaitado"}),": tudo no ",e.jsx("code",{children:"tester"})," é ",e.jsx("code",{children:"Future"}),". Esquecer ",e.jsx("code",{children:"await"})," dá teste flaky."]})]}),e.jsxs(t,{type:"warning",title:"Mocks de rede em widget test",children:["Se a tela faz uma chamada HTTP no ",e.jsx("code",{children:"initState"}),", mocke o cliente (passe por construtor ou via ",e.jsx("code",{children:"Provider"}),"). Caso contrário o teste vai pendurar esperando rede que nunca vem."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(t,{type:"tip",title:"Use Keys em elementos importantes",children:"Texto de botão muda? Cor de ícone troca? Com Key estável, o teste continua achando o elemento. Sem Key, qualquer redesenho quebra a suíte inteira."}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Crie um ",e.jsx("code",{children:"pumpWidget"})," helper que envolve em ",e.jsx("code",{children:"MaterialApp"})," + providers — reduz repetição."]}),e.jsxs("li",{children:["Cada teste valida ",e.jsx("strong",{children:"um comportamento"}),". Não tente cobrir 5 fluxos no mesmo ",e.jsx("code",{children:"testWidgets"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"golden tests"})," (",e.jsx("code",{children:"matchesGoldenFile"}),") para componentes visuais críticos — pega regressão visual."]}),e.jsxs("li",{children:["Em CI, rode com ",e.jsx("code",{children:"--reporter=expanded"})," para saída clara em logs."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Widget tests cobrem componentes isolados. Mas o app real tem navegação, banco local, integrações de verdade — coisas que só aparecem quando tudo roda junto. Para isso existem os ",e.jsx("strong",{children:"Integration Tests"}),"."]}),e.jsx(t,{type:"success",title:"Continue para Integration Tests",children:"Próxima página: testes end-to-end com app rodando em emulador/device de verdade."})]})}export{r as default};
