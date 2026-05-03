import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Profiling() {
  return (
    <PageContainer
      title="Profiling"
      subtitle="Encontre gargalos de CPU, GPU e memória usando o modo profile."
      difficulty="avancado"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        "Está lento" não é diagnóstico. <em>Onde</em> está lento? CPU
        construindo widgets? GPU compondo camadas? Esperando I/O da rede? Sem
        profile, qualquer "otimização" é chute. Profilar dá números — frames
        por segundo, microssegundos por função, MB de memória.
      </p>

      <h2>O conceito</h2>
      <p>
        O Flutter tem três <strong>build modes</strong>:
      </p>
      <ul>
        <li><strong>Debug</strong> — JIT, asserts ligados, hot reload, tudo lento. Nunca tire conclusões aqui.</li>
        <li><strong>Profile</strong> — AOT (rápido como release) mas com instrumentação habilitada. <em>Esta</em> é a hora de medir.</li>
        <li><strong>Release</strong> — AOT puro, sem instrumentação. Tamanho e velocidade finais.</li>
      </ul>
      <p>
        A meta clássica é <strong>60fps</strong>: cada frame tem 16.6ms para
        rodar. Em telas de 90/120Hz, são 11ms ou 8ms. Frames acima disso são
        <em>jank</em>: a animação engasga.
      </p>

      <h2>Como o Flutter faz</h2>
      <p>
        Rode em profile mode em device físico (não emulador!) e abra o DevTools
        para gravar timelines.
      </p>

      <CodeBlock title="iniciar profile" code={`# Lista devices disponíveis
flutter devices

# Profile em device físico
flutter run --profile -d <id-do-device>

# Em release (números finais, sem dev tools)
flutter run --release`} />

      <h2>Exemplo prático: dois tipos de jank</h2>
      <p>
        Existem <strong>UI jank</strong> (thread Dart sobrecarregada, geralmente
        <code>build</code> custoso) e <strong>raster jank</strong> (GPU sofrendo
        para compor). DevTools mostra os dois separados.
      </p>

      <CodeBlock title="código com jank de UI" code={`// RUIM: filtra lista enorme dentro do build
class TelaProdutos extends StatelessWidget {
  final List<Produto> todos;
  const TelaProdutos({super.key, required this.todos});

  @override
  Widget build(BuildContext context) {
    final filtrados = todos
        .where((p) => p.preco > 100)
        .toList()
      ..sort((a, b) => a.nome.compareTo(b.nome));

    return ListView.builder(
      itemCount: filtrados.length,
      itemBuilder: (_, i) => Text(filtrados[i].nome),
    );
  }
}`} />

      <CodeBlock title="versão otimizada" code={`// BOM: cálculo fora do build, ou em isolate se for pesado
class TelaProdutos extends StatefulWidget {
  final List<Produto> todos;
  const TelaProdutos({super.key, required this.todos});

  @override
  State<TelaProdutos> createState() => _TelaProdutosState();
}

class _TelaProdutosState extends State<TelaProdutos> {
  late final List<Produto> _filtrados;

  @override
  void initState() {
    super.initState();
    _filtrados = widget.todos
        .where((p) => p.preco > 100)
        .toList()
      ..sort((a, b) => a.nome.compareTo(b.nome));
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: _filtrados.length,
      itemBuilder: (_, i) => Text(_filtrados[i].nome),
    );
  }
}`} />

      <p>
        Para listas que processam milhares de itens, mova o trabalho para um
        <code>Isolate</code> com <code>compute()</code> — isso libera a thread
        principal.
      </p>

      <CodeBlock title="usando isolate" code={`import 'package:flutter/foundation.dart';

List<Produto> _filtrar(List<Produto> entrada) {
  return entrada
      .where((p) => p.preco > 100)
      .toList()
    ..sort((a, b) => a.nome.compareTo(b.nome));
}

// Roda fora da thread principal — UI continua suave
final filtrados = await compute(_filtrar, todos);`} />

      <h2>Métricas que importam</h2>
      <ul>
        <li><strong>Build duration</strong> — tempo gasto rodando widgets <code>build()</code>.</li>
        <li><strong>Layout duration</strong> — cálculo de tamanho/posição.</li>
        <li><strong>Raster duration</strong> — tempo da GPU compondo a cena.</li>
        <li><strong>Missed frames</strong> — quantos passaram do orçamento.</li>
        <li><strong>Heap size</strong> — memória Dart usada (sem incluir imagens nativas).</li>
      </ul>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Profilar em emulador</strong> — emulador é mais rápido <em>ou</em> mais lento que device real, depende. Nunca confie.</li>
        <li><strong>setState no widget raiz</strong> — força rebuild de tudo. Mova estado para o widget mais próximo possível.</li>
        <li><strong>Faltou <code>const</code></strong> — sem <code>const</code>, widgets reconstroem a cada frame mesmo idênticos.</li>
        <li><strong>Imagens gigantes</strong> — JPG 4000×3000 numa miniatura come MB e ciclos. Use <code>cacheWidth</code>/<code>cacheHeight</code>.</li>
        <li><strong>ListView sem builder</strong> — <code>ListView(children: [...])</code> com 1000 itens cria todos de uma vez. Use <code>ListView.builder</code>.</li>
      </ul>

      <AlertBox type="warning" title="Sempre teste em hardware pessimista">
        Seu Pixel 8 ou iPhone 15 esconde problemas. Os usuários têm Moto G6,
        iPhone SE 1ª. Mantenha um device velho na bancada para testes.
      </AlertBox>

      <AlertBox type="danger" title="Não otimize sem medir">
        Mexer em código pensando "isso deve estar lento" sem profilar gera bugs
        e perde tempo. <strong>Meça → identifique o gargalo → otimize → meça de novo.</strong>
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use <code>const</code> em <em>todo</em> widget que possa ser constante.</li>
          <li>Para animações pesadas isoladas, embrulhe em <code>RepaintBoundary</code>.</li>
          <li>Carregue dados em background com <code>FutureBuilder</code> + <code>compute</code>.</li>
          <li>Habilite <code>Performance Overlay</code> em dev para ver as duas barras (UI e Raster) sobrepostas.</li>
          <li>Em listas longas, use <code>itemExtent</code> ou <code>prototypeItem</code> para acelerar layout.</li>
        </ul>
      </AlertBox>

      <CodeBlock title="overlay de performance" code={`MaterialApp(
  showPerformanceOverlay: true, // só em dev
  home: const HomePage(),
)`} />

      <h2>Próximos passos</h2>
      <p>
        Veja <em>Flutter DevTools</em> para entender cada painel a fundo,
        <em>RepaintBoundary</em> para isolar áreas pesadas e <em>Build Web</em> para
        otimizar bundles.
      </p>
      <AlertBox type="success">
        Profilar é hábito, não evento. Faça parte do checklist antes de cada release.
      </AlertBox>
    </PageContainer>
  );
}
