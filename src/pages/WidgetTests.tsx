import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function WidgetTests() {
  return (
    <PageContainer
      title="Widget Tests"
      subtitle="Renderize widgets em ambiente headless e simule interações sem precisar de device."
      difficulty="intermediario"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Você já sabe testar lógica pura. Mas e quando precisa garantir que <em>"ao tocar no botão de adicionar, o contador na tela passa de 0 para 1"</em>? Isso envolve árvore de widgets, estado, gestos — território de <strong>widget tests</strong>.
      </p>
      <p>
        O ganho: eles são <strong>quase tão rápidos quanto unit tests</strong> (rodam num ambiente headless, sem GPU nem device), mas validam de verdade a UI. Você pode rodar centenas em segundos.
      </p>

      <h2>O conceito</h2>
      <p>
        O Flutter fornece um <strong>renderer fake</strong> só para testes. Em vez de pintar pixels na tela, ele monta a árvore na memória e te dá um objeto <code>tester</code> com superpoderes:
      </p>
      <ul>
        <li><strong>Renderizar</strong> qualquer widget: <code>tester.pumpWidget(...)</code>.</li>
        <li><strong>Encontrar</strong> elementos por texto, ícone, tipo, key: <code>find.text(...)</code>, <code>find.byIcon(...)</code>.</li>
        <li><strong>Interagir</strong>: tap, long press, drag, digitar texto: <code>tester.tap(...)</code>, <code>tester.enterText(...)</code>.</li>
        <li><strong>Avançar o tempo</strong>: <code>tester.pump()</code> dispara um quadro; <code>tester.pumpAndSettle()</code> roda até as animações terminarem.</li>
        <li><strong>Verificar</strong> com <code>expect(find.text('Olá'), findsOneWidget)</code>.</li>
      </ul>

      <AlertBox type="info" title="pump vs pumpAndSettle">
        <code>pump()</code> roda <em>um</em> quadro — útil quando você quer inspecionar o meio de uma animação. <code>pumpAndSettle()</code> continua bombando quadros até nada mais mudar (cuidado: trava se houver animação infinita).
      </AlertBox>

      <h2>Como Flutter faz</h2>

      <CodeBlock title="lib/contador.dart" code={`import 'package:flutter/material.dart';

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
      body: Center(child: Text('\$valor', key: const Key('display'))),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => valor++),
        child: const Icon(Icons.add),
      ),
    );
  }
}`} />

      <CodeBlock title="test/contador_test.dart" code={`import 'package:flutter/material.dart';
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
}`} />

      <h2>Exemplo prático: formulário com validação</h2>

      <CodeBlock title="login com validação" code={`testWidgets('mostra erro quando email vazio', (tester) async {
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
});`} />

      <h2>Finders úteis</h2>
      <ul>
        <li><code>find.text('X')</code> — texto literal visível.</li>
        <li><code>find.byKey(Key('x'))</code> — mais robusto a mudanças de UI; use em campos importantes.</li>
        <li><code>find.byIcon(Icons.add)</code>, <code>find.byType(TextField)</code>.</li>
        <li><code>find.byTooltip('Adicionar')</code>, <code>find.bySemanticsLabel('...')</code>.</li>
        <li><code>find.descendant(of: ..., matching: ...)</code> — combinação para casos complexos.</li>
      </ul>

      <h2>Matchers úteis para finders</h2>
      <ul>
        <li><code>findsOneWidget</code> — encontrou exatamente 1.</li>
        <li><code>findsNothing</code> — não encontrou nenhum.</li>
        <li><code>findsNWidgets(3)</code> — quantidade exata.</li>
        <li><code>findsAtLeastNWidgets(2)</code> — pelo menos N.</li>
      </ul>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esqueceu o <code>MaterialApp</code></strong>: muitos widgets (Scaffold, Text com tema) crasham sem ele. Sempre envolva em <code>MaterialApp(home: ...)</code>.</li>
        <li><strong>Não chamou <code>pump</code> depois do tap</strong>: o estado mudou na memória, mas a árvore só reconstrói no próximo quadro. Sem <code>pump</code>, o assert ainda vê o estado antigo.</li>
        <li><strong><code>pumpAndSettle</code> com animação infinita</strong>: trava o teste para sempre. Se houver loop, use <code>pump(Duration(...))</code> manual.</li>
        <li><strong>Encontrar texto que está fora da viewport</strong>: <code>find.text</code> só acha widgets renderizados. Use <code>tester.scrollUntilVisible(...)</code> para listas longas.</li>
        <li><strong>Texto com formatação rica</strong> (<code>Text.rich</code>): pode não bater com <code>find.text</code>. Use <code>find.textContaining(...)</code> ou key.</li>
        <li><strong>Async não awaitado</strong>: tudo no <code>tester</code> é <code>Future</code>. Esquecer <code>await</code> dá teste flaky.</li>
      </ul>

      <AlertBox type="warning" title="Mocks de rede em widget test">
        Se a tela faz uma chamada HTTP no <code>initState</code>, mocke o cliente (passe por construtor ou via <code>Provider</code>). Caso contrário o teste vai pendurar esperando rede que nunca vem.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Use Keys em elementos importantes">
        Texto de botão muda? Cor de ícone troca? Com Key estável, o teste continua achando o elemento. Sem Key, qualquer redesenho quebra a suíte inteira.
      </AlertBox>
      <ul>
        <li>Crie um <code>pumpWidget</code> helper que envolve em <code>MaterialApp</code> + providers — reduz repetição.</li>
        <li>Cada teste valida <strong>um comportamento</strong>. Não tente cobrir 5 fluxos no mesmo <code>testWidgets</code>.</li>
        <li>Use <code>golden tests</code> (<code>matchesGoldenFile</code>) para componentes visuais críticos — pega regressão visual.</li>
        <li>Em CI, rode com <code>--reporter=expanded</code> para saída clara em logs.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Widget tests cobrem componentes isolados. Mas o app real tem navegação, banco local, integrações de verdade — coisas que só aparecem quando tudo roda junto. Para isso existem os <strong>Integration Tests</strong>.
      </p>
      <AlertBox type="success" title="Continue para Integration Tests">
        Próxima página: testes end-to-end com app rodando em emulador/device de verdade.
      </AlertBox>
    </PageContainer>
  );
}
