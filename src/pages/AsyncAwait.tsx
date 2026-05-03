import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function AsyncAwait() {
  return (
    <PageContainer
      title="async / await"
      subtitle="A forma idiomática de escrever código assíncrono em Dart — linear, legível, com try/catch normal."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        No capítulo anterior, você viu Futures com <code>.then(...).then(...).catchError(...)</code>. Funciona, mas escala mal: três chamadas em sequência viram um trem de callbacks aninhados, o tratamento de erro fica disperso, e ler o código exige decifrar.
      </p>
      <p>
        <code>async/await</code> resolve isso brilhantemente: <strong>você escreve o código como se fosse síncrono</strong>, mas ele continua sendo assíncrono por baixo. É a sintaxe que praticamente todo código moderno em Flutter usa — pegar bem é diferença entre se divertir programando ou sofrer.
      </p>

      <h2>O conceito</h2>
      <p>
        Duas palavrinhas, uma dupla:
      </p>
      <ul>
        <li><strong><code>async</code></strong> — marca uma função como assíncrona. Ela <em>obrigatoriamente</em> retorna um <code>Future</code>.</li>
        <li><strong><code>await</code></strong> — pausa a função até que o <code>Future</code> resolva, e devolve o valor desempacotado.</li>
      </ul>
      <p>
        A função "pausa" mas <strong>não bloqueia a thread</strong> — outras coisas continuam rodando (animações, toques na tela). Pense em <code>await</code> como dizer: "espera o resultado chegar, depois continue daqui de onde paramos".
      </p>

      <h2>Como Dart faz</h2>
      <CodeBlock title="comparacao.dart" code={`// Versão com .then (verbosa, encadeada)
Future<void> carregarComThen() {
  return api.buscarUsuario().then((user) {
    return api.buscarPosts(user.id).then((posts) {
      print('\${user.nome} tem \${posts.length} posts');
    });
  });
}

// Versão com async/await (linear, legível)
Future<void> carregarComAwait() async {
  final user = await api.buscarUsuario();
  final posts = await api.buscarPosts(user.id);
  print('\${user.nome} tem \${posts.length} posts');
}`} />

      <p>
        Mesma lógica, complexidade despencou. O <code>final user = await ...</code> espera o Future resolver e armazena o valor — exatamente como uma chamada síncrona pareceria.
      </p>

      <AlertBox type="info" title="Regra de ouro">
        Se a função usa <code>await</code> em qualquer lugar, ela <strong>precisa</strong> ser declarada <code>async</code>, e o retorno <strong>sempre</strong> é <code>Future&lt;T&gt;</code> (mesmo que <code>T</code> seja <code>void</code>).
      </AlertBox>

      <h2>Tratamento de erros: try / catch normal</h2>
      <p>
        Outra grande vantagem: erros viram exceções comuns, capturadas com <code>try/catch</code> tradicional. Adeus, <code>.catchError</code> espalhado.
      </p>

      <CodeBlock title="erros.dart" code={`Future<Usuario?> buscarSeguro(int id) async {
  try {
    final user = await api.buscarUsuario(id);
    return user;
  } on TimeoutException {
    // Erros tipados específicos primeiro.
    print('A API demorou demais');
    return null;
  } on FormatException catch (e) {
    print('JSON inválido: \${e.message}');
    return null;
  } catch (e, stack) {
    // Catch genérico por último.
    print('Erro inesperado: \$e');
    print(stack);
    return null;
  } finally {
    // Sempre roda — útil para fechar recursos.
    print('Tentativa de busca finalizada');
  }
}`} />

      <h2>Exemplo prático: paralelismo com Future.wait</h2>
      <p>
        <code>await</code> sequencial é fácil, mas e quando três chamadas independentes podem rodar em paralelo? <strong>Não espere uma de cada vez</strong> — dispare todas e espere todas juntas.
      </p>

      <CodeBlock title="paralelo.dart" code={`Future<void> carregarTela() async {
  // ❌ ERRADO: 3 segundos no total
  // (cada chamada espera a anterior terminar)
  // final user = await api.buscarUsuario();   // 1s
  // final config = await api.buscarConfig();  // 1s
  // final feats = await api.buscarFeatures(); // 1s

  // ✅ CERTO: ~1 segundo no total (todas em paralelo)
  final results = await Future.wait([
    api.buscarUsuario(),
    api.buscarConfig(),
    api.buscarFeatures(),
  ]);

  final user = results[0] as Usuario;
  final config = results[1] as Config;
  final feats = results[2] as List<Feature>;

  print('Tudo carregado: \${user.nome}, \${feats.length} features');
}`} />

      <p>
        Em apps reais isso corta latência drasticamente. Se sua tela faz 4 chamadas independentes a 200ms cada, você sai de 800ms para 200ms.
      </p>

      <AlertBox type="warning" title="Future.wait falha rápido">
        Se uma das chamadas dentro de <code>Future.wait</code> falhar, o resultado todo é uma exceção. Para tolerar falhas parciais, use <code>Future.wait([...], eagerError: false)</code> e trate cada item, ou envolva cada chamada em try/catch antes.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer o <code>await</code></strong>: a função continua sem esperar, e você usa um <code>Future</code> em vez do valor. Erro silencioso clássico.</li>
        <li><strong>Usar <code>await</code> sem <code>async</code></strong>: erro de compilação. Marque a função.</li>
        <li><strong>Achar que <code>async</code> roda em outra thread</strong>: não roda. Cálculo pesado em função async ainda trava a UI. Para CPU-bound, use <code>Isolate</code>.</li>
        <li><strong>Loop com await sequencial sem necessidade</strong>: <code>for (final id in ids) await buscar(id);</code> processa 1 por vez. Para paralelo, use <code>Future.wait(ids.map(buscar))</code>.</li>
        <li><strong>Esquecer o <code>return</code></strong>: numa função <code>Future&lt;String&gt; foo() async</code>, faltar return faz Dart devolver <code>null</code> (em ausência de null safety) ou erro.</li>
        <li><strong>Não tratar exceções de futures "fire-and-forget"</strong>: <code>api.log()</code> sem await, sem catch, lança exceção não capturada se falhar. Use <code>unawaited(...)</code> do <code>dart:async</code> intencionalmente.</li>
      </ul>

      <AlertBox type="danger" title="async em build()">
        O método <code>build()</code> de um Widget <strong>não pode ser async</strong>. Ele precisa retornar um Widget imediatamente. Para mostrar dados assíncronos, use <code>FutureBuilder</code>, <code>StreamBuilder</code> ou um gerenciador de estado.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Prefira <code>async/await</code> a <code>.then</code> em código novo — mais legível e debugável.</li>
          <li>Defina timeouts explícitos: <code>await chamada().timeout(Duration(seconds: 8))</code>.</li>
          <li>Use <code>Future.wait</code> para paralelismo; documente quando a ordem importa.</li>
          <li>Evite <code>async</code> só por moda — se a função não usa <code>await</code>, não precisa ser async.</li>
          <li>Dentro de Widgets, lembre do <code>mounted</code> antes de chamar <code>setState</code> após um <code>await</code>: a tela pode ter sido removida no meio.</li>
        </ul>
      </AlertBox>

      <CodeBlock title="cuidado_com_mounted.dart" code={`Future<void> _carregar() async {
  final dados = await api.buscar();
  if (!mounted) return; // tela já saiu? aborta.
  setState(() => _dados = dados);
}`} />

      <h2>Próximos passos</h2>
      <p>
        <code>Future</code> entrega <strong>um</strong> valor. Mas e quando você quer receber <strong>vários</strong> valores ao longo do tempo (mensagens de chat, posições de GPS, eventos de Firebase)? Aí entra <code>Stream</code>, e existe até um <code>await for</code> para consumir cada item de forma natural.
      </p>
      <AlertBox type="success">
        Próximo capítulo: <strong>Streams</strong> — sequências assíncronas de valores.
      </AlertBox>
    </PageContainer>
  );
}
