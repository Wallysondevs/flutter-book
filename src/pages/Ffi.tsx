import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Ffi() {
    return (
      <PageContainer title="Dart FFI" subtitle="Chame bibliotecas C/C++/Rust diretamente do Dart, sem platform channels." difficulty="avancado" timeToRead="9 min">
        <CodeBlock title="exemplo" code="import 'dart:ffi';\nimport 'package:ffi/ffi.dart';\n\nfinal lib = DynamicLibrary.open('libmath.so');\nfinal soma = lib.lookupFunction<\n  Int32 Function(Int32, Int32),\n  int Function(int, int)\n>('soma');\n\nprint(soma(3, 4)); // 7" />
      <AlertBox type="info" title="Quando faz sentido">Algoritmos pesados, criptografia, processamento de imagem. FFI tem overhead muito menor que platform channels.</AlertBox>
      </PageContainer>
    );
  }
  