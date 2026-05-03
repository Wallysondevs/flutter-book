import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function HelloWorld() {
    return (
      <PageContainer
        title="Hello, World! e o ciclo de build"
        subtitle="Seu primeiro widget — entenda CADA linha e o que acontece no flutter run."
        difficulty="iniciante"
        timeToRead="15 min"
      >
        <h2>Por que você precisa disso</h2>
        <p>
          No Flutter, <strong>tudo é widget</strong>. Texto, padding, botão, tela inteira — todos descendem de <code>Widget</code>. Entender isso desde a primeira tela evita confusão depois.
        </p>

        <h2>O código mínimo</h2>
        <p>
          Substitua o conteúdo de <strong>lib/main.dart</strong> pelo código abaixo. É o menor app Flutter funcional possível:
        </p>

        <CodeBlock title="lib/main.dart" code={`import 'package:flutter/material.dart';

  void main() {
    runApp(const MyApp());
  }

  class MyApp extends StatelessWidget {
    const MyApp({super.key});

    @override
    Widget build(BuildContext context) {
      return const MaterialApp(
        home: Scaffold(
          body: Center(
            child: Text('Olá, mundo!'),
          ),
        ),
      );
    }
  }`} />

        <h2>Linha por linha</h2>

        <h3><code>import 'package:flutter/material.dart';</code></h3>
        <p>
          Importa o pacote Material — um conjunto enorme de widgets prontos seguindo o Material Design do Google. Para apps com cara de iOS, importe <code>cupertino.dart</code>.
        </p>

        <h3><code>void main() =&gt; runApp(...)</code></h3>
        <p>
          Como em qualquer app Dart, <code>main()</code> é o ponto de entrada. <code>runApp</code> "monta" o widget passado como raiz da árvore e começa a desenhar.
        </p>

        <h3><code>class MyApp extends StatelessWidget</code></h3>
        <p>
          Um <strong>StatelessWidget</strong> é um widget que não muda — sua aparência depende só dos parâmetros que recebe no construtor. Perfeito para telas estáticas, ícones, textos fixos.
        </p>

        <h3><code>Widget build(BuildContext context)</code></h3>
        <p>
          Todo widget implementa <code>build()</code>. Esse método retorna a árvore de widgets que o Flutter deve desenhar. <strong>Pense em build como uma função que descreve a UI no estado atual.</strong>
        </p>

        <h3><code>MaterialApp &gt; Scaffold &gt; Center &gt; Text</code></h3>
        <p>
          A árvore aninha widgets:
        </p>
        <ul>
          <li><strong>MaterialApp</strong> — fornece tema, navegação, localização.</li>
          <li><strong>Scaffold</strong> — estrutura básica de uma tela Material (AppBar, body, FAB).</li>
          <li><strong>Center</strong> — centraliza o filho na tela.</li>
          <li><strong>Text</strong> — desenha uma string com o estilo herdado do tema.</li>
        </ul>

        <AlertBox type="info" title="Hot Reload é mágico">
          Salve o arquivo enquanto <code>flutter run</code> está rodando: as mudanças aparecem em &lt;1s sem perder o estado. Esse loop curto é uma das maiores vantagens do Flutter.
        </AlertBox>

        <h2>Adicionando interatividade</h2>
        <p>
          Para reagir a toques, você precisa de estado. Trocamos <code>StatelessWidget</code> por <code>StatefulWidget</code>:
        </p>

        <CodeBlock title="lib/main.dart" code={`import 'package:flutter/material.dart';

  void main() => runApp(const MyApp());

  class MyApp extends StatelessWidget {
    const MyApp({super.key});
    @override
    Widget build(BuildContext context) {
      return const MaterialApp(home: Contador());
    }
  }

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
        appBar: AppBar(title: const Text('Contador')),
        body: Center(child: Text('\$valor', style: const TextStyle(fontSize: 48))),
        floatingActionButton: FloatingActionButton(
          onPressed: () => setState(() => valor++),
          child: const Icon(Icons.add),
        ),
      );
    }
  }`} />

        <p>
          <code>setState</code> avisa o framework: "marque este widget como sujo, chame <code>build</code> de novo". Simples assim.
        </p>

        <AlertBox type="success" title="Próximo passo">
          Você já entende o fluxo básico. Nas próximas páginas vamos quebrar Dart, widgets de layout, e gerenciamento de estado de verdade.
        </AlertBox>
      </PageContainer>
    );
  }
  