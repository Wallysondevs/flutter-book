import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Classes() {
    return (
      <PageContainer title="Classes & Objetos" subtitle="Sintaxe de classe, getters, setters, factory." difficulty="iniciante" timeToRead="10 min">
        <h2>Estrutura básica</h2>
      <CodeBlock title="Pessoa.dart" code="class Pessoa {\n  final String nome;\n  int idade;\n\n  Pessoa(this.nome, this.idade);\n\n  void aniversario() {\n    idade++;\n  }\n}\n\nfinal p = Pessoa('Ana', 30);\np.aniversario();" />
      <h2>Getters e setters</h2>
      <CodeBlock title="getters" code="class Retangulo {\n  double largura, altura;\n  Retangulo(this.largura, this.altura);\n\n  double get area => largura * altura;\n  set tamanho(double s) => largura = altura = s;\n}" />
      <h2>toString, ==, hashCode</h2>
      <p>Sobrescreva sempre que tiver classes de dados. Ou use <strong>records</strong> e <strong>sealed classes</strong> que já vêm com igualdade estrutural.</p>
      <AlertBox type="info" title="Records (Dart 3)">Para tipos de dados leves, considere <code>(String nome, int idade)</code> em vez de criar classe.</AlertBox>
      </PageContainer>
    );
  }
  