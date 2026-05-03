import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Ffi() {
  return (
    <PageContainer
      title="Dart FFI"
      subtitle="Chame bibliotecas C/C++/Rust diretamente do Dart, sem platform channels."
      difficulty="avancado"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Platform Channels resolvem comunicação Dart↔Kotlin/Swift, mas pagam um preço: cada chamada cruza uma "ponte" assíncrona. Para casos como <strong>algoritmos pesados</strong> (criptografia, compressão, processamento de imagem ou áudio), isso é lento demais.
      </p>
      <p>
        <strong>FFI</strong> (Foreign Function Interface) deixa o Dart chamar funções de bibliotecas nativas C/C++ <em>diretamente</em>, sem ponte assíncrona. A latência é praticamente zero — comparável a uma chamada Dart normal. E como Rust expõe ABI C, você também consegue usar libs em Rust.
      </p>

      <h2>O conceito</h2>
      <p>
        Toda biblioteca C compilada (<code>.so</code> no Android/Linux, <code>.dylib</code>/<code>.framework</code> no iOS/macOS, <code>.dll</code> no Windows) expõe <strong>símbolos</strong>: nomes de funções com assinatura conhecida. O Dart FFI faz três coisas:
      </p>
      <ol>
        <li><strong>Carrega</strong> a biblioteca em runtime: <code>DynamicLibrary.open('libfoo.so')</code>.</li>
        <li><strong>Procura</strong> a função pelo nome: <code>lib.lookupFunction(...)</code>.</li>
        <li><strong>Mapeia tipos</strong>: você descreve a assinatura C (<code>Int32</code>, <code>Pointer&lt;Utf8&gt;</code>...) e a equivalente Dart (<code>int</code>, <code>String</code>...).</li>
      </ol>

      <AlertBox type="info" title="dart:ffi e package:ffi">
        <code>dart:ffi</code> é nativo do SDK e dá os tipos primitivos. O package <code>ffi</code> (do pub.dev, oficial) adiciona helpers úteis para strings (<code>Utf8</code>), alocação (<code>calloc</code>), etc.
      </AlertBox>

      <h2>Como Flutter faz: exemplo mínimo</h2>
      <p>
        Suponha uma lib C bobinha que soma dois inteiros:
      </p>

      <CodeBlock title="native/soma.c" code={`// compile com:
//   clang -shared -fPIC soma.c -o libsoma.so   (Linux/Android)
//   clang -dynamiclib soma.c -o libsoma.dylib  (macOS)
int soma(int a, int b) {
  return a + b;
}`} />

      <p>Lado Dart:</p>

      <CodeBlock title="lib/soma_ffi.dart" code={`import 'dart:ffi';
import 'dart:io' show Platform;

// 1) Resolve o nome do arquivo certo por plataforma
String _libName() {
  if (Platform.isAndroid || Platform.isLinux) return 'libsoma.so';
  if (Platform.isMacOS || Platform.isIOS)     return 'libsoma.dylib';
  if (Platform.isWindows)                     return 'soma.dll';
  throw UnsupportedError('plataforma não suportada');
}

// 2) Abre a biblioteca em runtime
final DynamicLibrary _lib = DynamicLibrary.open(_libName());

// 3) Define os dois lados da assinatura:
//    NativeFunction<>: como C enxerga
//    Function:         como Dart enxerga
typedef _SomaC    = Int32 Function(Int32 a, Int32 b);
typedef _SomaDart = int   Function(int a, int b);

// 4) Localiza o símbolo "soma" e gera função Dart tipada
final _SomaDart soma =
    _lib.lookupFunction<_SomaC, _SomaDart>('soma');

void main() {
  print(soma(3, 4)); // 7
}`} />

      <p>
        A chamada <code>soma(3, 4)</code> é <strong>síncrona</strong> e tem o custo de uma chamada de função normal — sem fila, sem JSON, sem thread hop.
      </p>

      <h2>Exemplo prático: passando strings e estruturas</h2>
      <p>
        Strings em C são ponteiros para bytes terminados em <code>\\0</code>. Você precisa <strong>alocar manualmente</strong>, copiar para Utf8, e <strong>liberar depois</strong> — Dart não controla a memória da lib nativa.
      </p>

      <CodeBlock title="dart: hash sha256 de uma string" code={`import 'dart:ffi';
import 'package:ffi/ffi.dart';

// supondo lib C:  char* sha256(const char* texto);
typedef _Sha256C    = Pointer<Utf8> Function(Pointer<Utf8>);
typedef _Sha256Dart = Pointer<Utf8> Function(Pointer<Utf8>);

final _sha = _lib.lookupFunction<_Sha256C, _Sha256Dart>('sha256');

String sha256(String entrada) {
  // 1) aloca buffer C e copia a string Dart pra dentro
  final ptrEntrada = entrada.toNativeUtf8();
  try {
    // 2) chama a função C
    final ptrSaida = _sha(ptrEntrada);
    // 3) converte ponteiro de volta para String Dart
    return ptrSaida.toDartString();
  } finally {
    // 4) SEMPRE libere — senão vaza memória
    calloc.free(ptrEntrada);
  }
}`} />

      <p>
        Para chamadas <em>longas</em> (segundos), envolva em <code>Isolate.run(() =&gt; ...)</code> para não travar a UI thread.
      </p>

      <h2>FFIgen: gerando os bindings</h2>
      <p>
        Escrever <code>typedef</code>s à mão para uma lib grande é doloroso. O pacote <code>ffigen</code> lê um header <code>.h</code> e gera todo o código Dart automaticamente.
      </p>

      <CodeBlock title="terminal" code={`# adicione em dev_dependencies: ffigen: ^11
dart run ffigen --config ffigen.yaml

# ffigen.yaml mínimo:
#   name: MinhaLib
#   description: Bindings da minhalib
#   output: 'lib/minhalib_bindings.dart'
#   headers:
#     entry-points:
#       - 'native/minhalib.h'`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer de liberar memória</strong>: <code>calloc.free(ptr)</code>. Vazamento clássico — use <code>try/finally</code>.</li>
        <li><strong>Tamanho dos tipos</strong>: <code>int</code> em C pode ser 32 ou 64 bits. Use <code>Int32</code>/<code>Int64</code> explícitos no Dart.</li>
        <li><strong>String com <code>\\0</code> no meio</strong>: vai cortar. Use <code>Uint8List</code> + ponteiro para bytes.</li>
        <li><strong>Lib ausente em runtime</strong>: build de release no Android exige a <code>.so</code> dentro de <code>android/app/src/main/jniLibs/&lt;abi&gt;/</code>. No iOS, embed em um framework.</li>
        <li><strong>Chamada bloqueia UI</strong>: FFI é síncrono — chamada longa congela 60fps. Mude para <code>Isolate</code>.</li>
        <li><strong>Crash sem stack trace bonito</strong>: erro no C = SIGSEGV. Não tem exception. Debugue com <code>lldb</code>/<code>gdb</code>.</li>
      </ul>

      <AlertBox type="danger" title="Você é responsável pela memória">
        Diferente do Dart, código C/C++ não tem garbage collector. Cada <code>malloc</code>/<code>calloc</code> precisa de um <code>free</code>. Cada ponteiro pode ser <code>null</code>, ler memória inválida ou corromper a heap. Teste muito.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Esconda FFI atrás de uma API Dart limpa">
        Tudo que envolve <code>Pointer&lt;...&gt;</code>, <code>typedef</code> e <code>calloc</code> deve viver num arquivo só. Exponha funções/classes Dart normais — futuro-você (e seus colegas) agradecem.
      </AlertBox>
      <ul>
        <li>Use <code>ffigen</code> em vez de bindings manuais sempre que possível.</li>
        <li>Para libs Rust, exponha <code>extern "C"</code> e use <code>flutter_rust_bridge</code> — gera tipos seguros automaticamente.</li>
        <li>Operações &gt; 16 ms vão num <code>Isolate</code>. Operações curtas (criptografia de poucos KB) podem ficar inline.</li>
        <li>Teste com <code>flutter test</code> rodando no host (Linux/macOS): pega vazamento e crashes cedo.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Você cobriu integração nativa em todas as profundidades: Platform Channels (Kotlin/Swift), Plugins (empacotamento), e FFI (C/C++/Rust). Hora de garantir que tudo isso <em>continue funcionando</em> à medida que o app cresce — com testes.
      </p>
      <AlertBox type="success" title="Continue para Unit Tests">
        Próxima página: testando lógica pura em Dart com <code>package:test</code>/<code>flutter_test</code> e <code>mocktail</code>.
      </AlertBox>
    </PageContainer>
  );
}
