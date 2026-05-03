import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function DartVsJs() {
    return (
      <PageContainer title="Dart vs JavaScript" subtitle="Mesma família de C, mas com tipagem estática e null safety nativo." difficulty="iniciante" timeToRead="10 min">
        <h2>Quem é Dart?</h2>
      <p>Dart é a linguagem que move o Flutter. Tipada, orientada a objetos, com sintaxe familiar para quem vem de JS, Java, C# ou TypeScript.</p>
      <CodeBlock title="comparação" code="// JavaScript\nconst soma = (a, b) => a + b;\n\n// Dart\nint soma(int a, int b) => a + b;" />
      <h2>Diferenças-chave</h2>
      <ul>
        <li>Tipagem estática por padrão (mas com inferência via <code>var</code>)</li>
        <li><code>null safety</code> nativo desde Dart 2.12</li>
        <li>Compila para JIT (dev) e AOT (produção) — apps são rápidos</li>
        <li>Single-thread com <code>async/await</code>, mas suporta <code>Isolate</code> para paralelismo real</li>
      </ul>
      <AlertBox type="info" title="Vindo de TypeScript?">Você vai se sentir em casa. Generics, async/await, sealed classes, pattern matching — tudo familiar.</AlertBox>
      </PageContainer>
    );
  }
  