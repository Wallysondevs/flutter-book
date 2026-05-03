import{j as e}from"./index-D4AOhXGO.js";import{P as o,A as a,C as i}from"./AlertBox-Dyf2wdSA.js";function s(){return e.jsxs(o,{title:"Dart FFI",subtitle:"Chame bibliotecas C/C++/Rust diretamente do Dart, sem platform channels.",difficulty:"avancado",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['Platform Channels resolvem comunicação Dart↔Kotlin/Swift, mas pagam um preço: cada chamada cruza uma "ponte" assíncrona. Para casos como ',e.jsx("strong",{children:"algoritmos pesados"})," (criptografia, compressão, processamento de imagem ou áudio), isso é lento demais."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"FFI"})," (Foreign Function Interface) deixa o Dart chamar funções de bibliotecas nativas C/C++ ",e.jsx("em",{children:"diretamente"}),", sem ponte assíncrona. A latência é praticamente zero — comparável a uma chamada Dart normal. E como Rust expõe ABI C, você também consegue usar libs em Rust."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Toda biblioteca C compilada (",e.jsx("code",{children:".so"})," no Android/Linux, ",e.jsx("code",{children:".dylib"}),"/",e.jsx("code",{children:".framework"})," no iOS/macOS, ",e.jsx("code",{children:".dll"})," no Windows) expõe ",e.jsx("strong",{children:"símbolos"}),": nomes de funções com assinatura conhecida. O Dart FFI faz três coisas:"]}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Carrega"})," a biblioteca em runtime: ",e.jsx("code",{children:"DynamicLibrary.open('libfoo.so')"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Procura"})," a função pelo nome: ",e.jsx("code",{children:"lib.lookupFunction(...)"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mapeia tipos"}),": você descreve a assinatura C (",e.jsx("code",{children:"Int32"}),", ",e.jsx("code",{children:"Pointer<Utf8>"}),"...) e a equivalente Dart (",e.jsx("code",{children:"int"}),", ",e.jsx("code",{children:"String"}),"...)."]})]}),e.jsxs(a,{type:"info",title:"dart:ffi e package:ffi",children:[e.jsx("code",{children:"dart:ffi"})," é nativo do SDK e dá os tipos primitivos. O package ",e.jsx("code",{children:"ffi"})," (do pub.dev, oficial) adiciona helpers úteis para strings (",e.jsx("code",{children:"Utf8"}),"), alocação (",e.jsx("code",{children:"calloc"}),"), etc."]}),e.jsx("h2",{children:"Como Flutter faz: exemplo mínimo"}),e.jsx("p",{children:"Suponha uma lib C bobinha que soma dois inteiros:"}),e.jsx(i,{title:"native/soma.c",code:`// compile com:
//   clang -shared -fPIC soma.c -o libsoma.so   (Linux/Android)
//   clang -dynamiclib soma.c -o libsoma.dylib  (macOS)
int soma(int a, int b) {
  return a + b;
}`}),e.jsx("p",{children:"Lado Dart:"}),e.jsx(i,{title:"lib/soma_ffi.dart",code:`import 'dart:ffi';
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
}`}),e.jsxs("p",{children:["A chamada ",e.jsx("code",{children:"soma(3, 4)"})," é ",e.jsx("strong",{children:"síncrona"})," e tem o custo de uma chamada de função normal — sem fila, sem JSON, sem thread hop."]}),e.jsx("h2",{children:"Exemplo prático: passando strings e estruturas"}),e.jsxs("p",{children:["Strings em C são ponteiros para bytes terminados em ",e.jsx("code",{children:"\\\\0"}),". Você precisa ",e.jsx("strong",{children:"alocar manualmente"}),", copiar para Utf8, e ",e.jsx("strong",{children:"liberar depois"})," — Dart não controla a memória da lib nativa."]}),e.jsx(i,{title:"dart: hash sha256 de uma string",code:`import 'dart:ffi';
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
}`}),e.jsxs("p",{children:["Para chamadas ",e.jsx("em",{children:"longas"})," (segundos), envolva em ",e.jsx("code",{children:"Isolate.run(() => ...)"})," para não travar a UI thread."]}),e.jsx("h2",{children:"FFIgen: gerando os bindings"}),e.jsxs("p",{children:["Escrever ",e.jsx("code",{children:"typedef"}),"s à mão para uma lib grande é doloroso. O pacote ",e.jsx("code",{children:"ffigen"})," lê um header ",e.jsx("code",{children:".h"})," e gera todo o código Dart automaticamente."]}),e.jsx(i,{title:"terminal",code:`# adicione em dev_dependencies: ffigen: ^11
dart run ffigen --config ffigen.yaml

# ffigen.yaml mínimo:
#   name: MinhaLib
#   description: Bindings da minhalib
#   output: 'lib/minhalib_bindings.dart'
#   headers:
#     entry-points:
#       - 'native/minhalib.h'`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer de liberar memória"}),": ",e.jsx("code",{children:"calloc.free(ptr)"}),". Vazamento clássico — use ",e.jsx("code",{children:"try/finally"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tamanho dos tipos"}),": ",e.jsx("code",{children:"int"})," em C pode ser 32 ou 64 bits. Use ",e.jsx("code",{children:"Int32"}),"/",e.jsx("code",{children:"Int64"})," explícitos no Dart."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["String com ",e.jsx("code",{children:"\\\\0"})," no meio"]}),": vai cortar. Use ",e.jsx("code",{children:"Uint8List"})," + ponteiro para bytes."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Lib ausente em runtime"}),": build de release no Android exige a ",e.jsx("code",{children:".so"})," dentro de ",e.jsx("code",{children:"android/app/src/main/jniLibs/<abi>/"}),". No iOS, embed em um framework."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Chamada bloqueia UI"}),": FFI é síncrono — chamada longa congela 60fps. Mude para ",e.jsx("code",{children:"Isolate"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Crash sem stack trace bonito"}),": erro no C = SIGSEGV. Não tem exception. Debugue com ",e.jsx("code",{children:"lldb"}),"/",e.jsx("code",{children:"gdb"}),"."]})]}),e.jsxs(a,{type:"danger",title:"Você é responsável pela memória",children:["Diferente do Dart, código C/C++ não tem garbage collector. Cada ",e.jsx("code",{children:"malloc"}),"/",e.jsx("code",{children:"calloc"})," precisa de um ",e.jsx("code",{children:"free"}),". Cada ponteiro pode ser ",e.jsx("code",{children:"null"}),", ler memória inválida ou corromper a heap. Teste muito."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(a,{type:"tip",title:"Esconda FFI atrás de uma API Dart limpa",children:["Tudo que envolve ",e.jsx("code",{children:"Pointer<...>"}),", ",e.jsx("code",{children:"typedef"})," e ",e.jsx("code",{children:"calloc"})," deve viver num arquivo só. Exponha funções/classes Dart normais — futuro-você (e seus colegas) agradecem."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"ffigen"})," em vez de bindings manuais sempre que possível."]}),e.jsxs("li",{children:["Para libs Rust, exponha ",e.jsx("code",{children:'extern "C"'})," e use ",e.jsx("code",{children:"flutter_rust_bridge"})," — gera tipos seguros automaticamente."]}),e.jsxs("li",{children:["Operações > 16 ms vão num ",e.jsx("code",{children:"Isolate"}),". Operações curtas (criptografia de poucos KB) podem ficar inline."]}),e.jsxs("li",{children:["Teste com ",e.jsx("code",{children:"flutter test"})," rodando no host (Linux/macOS): pega vazamento e crashes cedo."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Você cobriu integração nativa em todas as profundidades: Platform Channels (Kotlin/Swift), Plugins (empacotamento), e FFI (C/C++/Rust). Hora de garantir que tudo isso ",e.jsx("em",{children:"continue funcionando"})," à medida que o app cresce — com testes."]}),e.jsxs(a,{type:"success",title:"Continue para Unit Tests",children:["Próxima página: testando lógica pura em Dart com ",e.jsx("code",{children:"package:test"}),"/",e.jsx("code",{children:"flutter_test"})," e ",e.jsx("code",{children:"mocktail"}),"."]})]})}export{s as default};
