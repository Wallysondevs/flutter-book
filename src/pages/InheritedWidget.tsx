import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function InheritedWidget() {
  return (
    <PageContainer
      title="InheritedWidget"
      subtitle="O mecanismo nativo do Flutter para propagar dados árvore abaixo — base de Theme, Provider e MediaQuery."
      difficulty="avancado"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Você já usou <code>Theme.of(context)</code>, <code>MediaQuery.of(context)</code>, <code>Navigator.of(context)</code>. Como esses widgets conseguem entregar dados que ficam lá no topo da árvore para qualquer descendente, mesmo 20 níveis abaixo, sem você passar parâmetros pelo caminho?
      </p>
      <p>
        A resposta é o <strong>InheritedWidget</strong> — um tipo especial de widget que serve como <em>broadcast de dados</em> para toda a subárvore abaixo dele. Provider, Riverpod, GoRouter, BLoC: todos usam InheritedWidget por baixo. Entendê-lo te dá o <em>mental model</em> que faz tudo isso fazer sentido.
      </p>

      <h2>O conceito</h2>
      <p>
        Um InheritedWidget é como um <em>"poste de aviso público"</em> colocado na árvore. Qualquer widget descendente pode olhar para esse poste (via <code>context.dependOnInheritedWidgetOfExactType</code>) e ler o aviso. Quando o aviso muda, todos que estavam olhando recebem notificação para se redesenhar.
      </p>
      <p>
        Quatro pontos importantes:
      </p>
      <ul>
        <li>É <strong>imutável</strong>: o widget em si não muda; quando o dado muda, um novo InheritedWidget é criado.</li>
        <li>O <code>BuildContext</code> é a "antena" que sabe localizar o poste mais próximo do tipo certo.</li>
        <li>Acessar via <code>of(context)</code> registra o widget como dependente — ele rebuilda automaticamente quando o dado muda.</li>
        <li>É <strong>O(1)</strong>: encontrar o ancestral é direto pelo tipo, não percorre a árvore toda.</li>
      </ul>

      <h2>Como Flutter faz</h2>
      <p>
        Para criar um InheritedWidget você herda da classe e implementa dois pontos: o construtor com os dados e o método <code>updateShouldNotify</code>, que diz se mudanças justificam rebuild.
      </p>

      <CodeBlock title="lib/contador_inherited.dart" code={`import 'package:flutter/material.dart';

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
}`} />

      <p>
        Repare em <code>updateShouldNotify</code>: comparar com cuidado é o que evita rebuilds inúteis. Se você sempre retornar <code>true</code>, todos os dependentes rebuildam a cada mudança — péssimo para performance.
      </p>

      <h2>Exemplo prático: contador compartilhado</h2>
      <p>
        Como o InheritedWidget é imutável, normalmente você o coloca dentro de um StatefulWidget que mantém o dado mutável e <em>recria</em> o InheritedWidget no <code>build</code>:
      </p>

      <CodeBlock title="lib/contador_provider.dart" code={`class ContadorProvider extends StatefulWidget {
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
}`} />

      <p>
        Esse padrão — StatefulWidget que envolve um InheritedWidget — é exatamente o que <code>ChangeNotifierProvider</code> faz por baixo dos panos. Você acabou de implementar uma versão minúscula do <code>provider</code>!
      </p>

      <AlertBox type="info" title="of(context) vs maybeOf(context)">
        Use <code>maybeOf</code> quando o ancestral é opcional (retorna <code>null</code>); use <code>of</code> quando é obrigatório (lança erro se não achar). Padrão Flutter consagrado.
      </AlertBox>

      <h2>InheritedWidget vs InheritedNotifier vs InheritedModel</h2>
      <p>
        Existem variações para casos específicos:
      </p>
      <ul>
        <li><strong>InheritedNotifier&lt;T extends Listenable&gt;</strong>: ouve um Listenable (ex: ChangeNotifier) e dispara rebuild automaticamente quando notifica. Reduz boilerplate.</li>
        <li><strong>InheritedModel&lt;Aspect&gt;</strong>: permite que dependentes escutem só uma "faceta" do dado. Útil quando o objeto é grande e você quer rebuilds granulares.</li>
      </ul>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer <code>updateShouldNotify</code> correto:</strong> retornar <code>true</code> sempre causa rebuilds em cascata; retornar <code>false</code> sempre faz a UI nunca atualizar.</li>
        <li><strong>Usar <code>findAncestorWidgetOfExactType</code>:</strong> esse método encontra mas <strong>não registra dependência</strong> — mudanças não disparam rebuild. Use <code>dependOnInheritedWidgetOfExactType</code>.</li>
        <li><strong>Acessar de fora da árvore:</strong> InheritedWidget só funciona dentro do <code>build</code> de descendentes. Não tem como ler "de fora" como em Riverpod.</li>
        <li><strong>Mutações dentro do InheritedWidget:</strong> ele é imutável. Coloque o estado mutável no StatefulWidget pai.</li>
        <li><strong>Granularidade ruim:</strong> um InheritedWidget gigante com 10 campos faz todos os dependentes rebuildarem quando qualquer um mudar. Quebre em vários.</li>
      </ul>

      <AlertBox type="warning" title="Você quase nunca vai escrever um na mão">
        Provider, Riverpod, BLoC, GoRouter, Theme, MediaQuery: todos já são (ou usam) InheritedWidgets prontos. Escrever seu próprio é raro — mas vale exercício para entender o sistema.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Quando precisar compartilhar dados entre widgets, use <strong>Provider</strong> ou <strong>Riverpod</strong> em vez de criar InheritedWidget na mão.</li>
          <li>Sempre exponha um helper estático <code>of(context)</code> e/ou <code>maybeOf(context)</code> — convenção Flutter.</li>
          <li>Implemente <code>updateShouldNotify</code> com comparação inteligente (campo por campo, não <code>identical</code>).</li>
          <li>Para vários campos independentes, use <code>InheritedModel</code> ou múltiplos InheritedWidgets pequenos.</li>
          <li>Para integração com <code>ChangeNotifier</code> ou <code>ValueListenable</code>, use <code>InheritedNotifier</code>.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com InheritedWidget entendido, você desbloqueou o entendimento profundo de Flutter: agora sabe <strong>por que</strong> Provider, Theme e MediaQuery funcionam. Reveja os capítulos de <strong>Provider</strong>, <strong>Riverpod</strong> e <strong>Temas</strong> com esse novo olhar — tudo vai fazer mais sentido.
      </p>

      <AlertBox type="success" title="Conhecimento que paga">
        Saber InheritedWidget não muda seu código do dia a dia, mas muda a forma como você debugga, otimiza e raciocina sobre rebuilds. Vale o investimento.
      </AlertBox>
    </PageContainer>
  );
}
