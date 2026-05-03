import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Construtores() {
    return (
      <PageContainer title="Construtores" subtitle="Default, named, factory, redirecting e const." difficulty="intermediario" timeToRead="12 min">
        <h2>Default e shorthand</h2>
      <CodeBlock title="default" code="class Ponto {\n  final double x, y;\n  Ponto(this.x, this.y);  // shorthand: this.x = parâmetro\n}" />
      <h2>Named constructors</h2>
      <CodeBlock title="named" code="class Ponto {\n  final double x, y;\n  Ponto(this.x, this.y);\n  Ponto.origem() : x = 0, y = 0;\n  Ponto.fromJson(Map<String, dynamic> j)\n      : x = j['x'], y = j['y'];\n}\n\nfinal o = Ponto.origem();\nfinal p = Ponto.fromJson({'x': 1, 'y': 2});" />
      <h2>Factory</h2>
      <CodeBlock title="factory" code="class Logger {\n  static final _instance = Logger._internal();\n  factory Logger() => _instance;\n  Logger._internal();\n}\n\nfinal a = Logger();\nfinal b = Logger();\nidentical(a, b); // true" />
      <h2>const constructor</h2>
      <CodeBlock title="const" code="class Cor {\n  final int r, g, b;\n  const Cor(this.r, this.g, this.b);\n}\n\nconst azul = Cor(0, 0, 255); // criada em compile-time" />
      <AlertBox type="success" title="const é grátis">Widgets <code>const</code> não são reconstruídos pelo Flutter. Use sempre que possível para performance.</AlertBox>
      </PageContainer>
    );
  }
  