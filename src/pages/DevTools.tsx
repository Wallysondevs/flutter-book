import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function DevTools() {
  return (
    <PageContainer
      title="Flutter DevTools"
      subtitle="A suíte oficial: inspector de widgets, profilers de CPU/GPU, memória e rede."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quando o app trava, perde frames ou come memória, <code>print</code> não
        basta. O Flutter DevTools é uma suíte web (parecida com o DevTools do
        Chrome) que se conecta ao app rodando e mostra exatamente o que está
        acontecendo: árvore de widgets, frames lentos, alocações de memória,
        requisições HTTP, logs estruturados e até gravação de timeline.
      </p>

      <h2>O conceito</h2>
      <p>
        Toda vez que você roda <code>flutter run</code>, o app expõe um serviço
        de debug chamado <strong>VM Service</strong> em uma porta local. O
        DevTools é apenas um cliente que conversa com esse serviço via
        WebSocket. Por isso ele funciona com o app rodando em emulador, device
        físico, web ou desktop.
      </p>
      <ul>
        <li><strong>Inspector</strong> — explora a árvore de widgets em tempo real e mostra constraints/sizes.</li>
        <li><strong>Performance</strong> — timeline de frames, identifica jank (frames acima de 16ms a 60fps).</li>
        <li><strong>CPU Profiler</strong> — gera flamegraphs para entender onde o tempo é gasto.</li>
        <li><strong>Memory</strong> — heap snapshots, alocações, vazamentos.</li>
        <li><strong>Network</strong> — todas as chamadas <code>http</code>/<code>dio</code> com headers, body, timing.</li>
        <li><strong>Logging</strong> — agrega <code>print</code> e <code>dart:developer</code> com filtros.</li>
        <li><strong>App Size</strong> — analisa o tamanho do binário final.</li>
      </ul>

      <h2>Como abrir</h2>
      <p>
        DevTools já vem instalado com o SDK Flutter. Em VS Code ou Android
        Studio, há atalhos. No terminal, basta clicar no link impresso ao rodar
        <code>flutter run</code>.
      </p>

      <CodeBlock title="abrir DevTools" code={`# Modo 1: link automático no terminal
flutter run
# Procure: "A Dart VM Service ... is available at:"
# E abaixo: "The Flutter DevTools debugger ... is available at: http://127.0.0.1:9100..."

# Modo 2: standalone (precisa de um app rodando)
dart devtools

# Modo 3: VS Code
# Cmd/Ctrl+Shift+P → "Dart: Open DevTools"`} />

      <h2>Exemplo prático: encontrando jank com Performance</h2>
      <p>
        Sintoma comum: lista que "engasga" ao rolar. Vamos diagnosticar.
      </p>
      <ol>
        <li>Rode em <strong>profile mode</strong>: <code>flutter run --profile</code>. Não use debug — o overhead distorce medições.</li>
        <li>No DevTools, abra a aba <strong>Performance</strong>.</li>
        <li>Clique em <strong>Record</strong>, faça a interação que trava por 3-5s, clique em <strong>Stop</strong>.</li>
        <li>Procure barras vermelhas/laranjas — são frames acima de 16ms (60fps) ou 8ms (120fps).</li>
        <li>Selecione um frame ruim e veja a aba <em>Timeline Events</em>: <code>Build</code>, <code>Layout</code>, <code>Paint</code>, <code>Raster</code>.</li>
      </ol>

      <CodeBlock title="exemplo: medir uma seção custosa" code={`import 'dart:developer' as dev;

Future<void> processarLista(List<int> dados) async {
  // Marca início no timeline (aparece na aba Performance)
  dev.Timeline.startSync('processarLista');
  try {
    for (final x in dados) {
      await operacaoCustosa(x);
    }
  } finally {
    dev.Timeline.finishSync();
  }
}`} />

      <p>
        O bloco entre <code>startSync</code> e <code>finishSync</code> aparece
        nomeado na timeline, ajudando a localizar exatamente que função sua
        está consumindo tempo.
      </p>

      <h2>Inspector: caçando overflows e widgets perdidos</h2>
      <p>
        O ícone "Select Widget Mode" deixa você clicar no app e ver
        instantaneamente o widget correspondente, suas constraints e o caminho
        completo na árvore. É a melhor ferramenta para entender por que algo
        ficou enorme, minúsculo ou cortado.
      </p>

      <CodeBlock title="logging estruturado" code={`import 'dart:developer' as dev;

dev.log(
  'Pedido criado',
  name: 'pedidos',
  level: 800, // INFO
  error: null,
);

// Na aba Logging, você filtra por name="pedidos"`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Profilou em debug mode</strong> — números são 5-10x piores que release. Sempre use <code>--profile</code>.</li>
        <li><strong>Memory leaks falsos</strong> — DevTools mostra objetos retidos, mas alguns são intencionais (singletons). Compare snapshots.</li>
        <li><strong>Network vazio</strong> — só funciona com pacotes que usam <code>HttpClient</code> do Dart. <code>dio</code> precisa de interceptor para aparecer.</li>
        <li><strong>Hot reload muda o resultado</strong> — após muitos reloads, force <em>hot restart</em> para limpar estado e ter medições limpas.</li>
        <li><strong>Inspector lento</strong> — a árvore com milhares de widgets pesa; use a busca em vez de rolar.</li>
      </ul>

      <AlertBox type="warning" title="Performance só vale em device real">
        Emulador Android e simulador iOS não refletem performance de produção.
        Sempre confirme jank em hardware mais antigo (iPhone SE 1ª, Android com
        Snapdragon 6xx).
      </AlertBox>

      <AlertBox type="tip" title="Atalhos úteis no Inspector">
        <ul>
          <li><strong>Highlight Repaints</strong> — quadrados coloridos que mudam quando uma área repinta. Útil para ver onde colocar <code>RepaintBoundary</code>.</li>
          <li><strong>Show Layout Guidelines</strong> — desenha bordas e baselines.</li>
          <li><strong>Slow Animations</strong> — reduz animações pra 0.2x para inspecionar.</li>
        </ul>
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="info">
        <ul>
          <li>Estabeleça uma rotina: antes de cada release, profile as 3 telas mais usadas.</li>
          <li>Use <code>dart:developer</code> em vez de <code>print</code> para logs sérios.</li>
          <li>Salve snapshots de memória de versões antigas para comparar regressões.</li>
          <li>Use <strong>App Size Tool</strong> para identificar assets ou pacotes que estão inflando o binário.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Veja <em>Profiling</em> para um aprofundamento em modo profile, e
        <em>RepaintBoundary</em> para corrigir os jank que o DevTools revelar.
      </p>
      <AlertBox type="success">
        Aprender DevTools muda o jogo: você sai do "acho que está lento" para
        "este frame demorou 32ms porque <code>build</code> de X custou 18ms".
      </AlertBox>
    </PageContainer>
  );
}
