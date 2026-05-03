import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function ClassesAbstratas() {
    return (
      <PageContainer title="Classes Abstratas" subtitle="Contratos parciais que não podem ser instanciados." difficulty="intermediario" timeToRead="6 min">
        <h2>Definição</h2>
      <CodeBlock title="abstract" code="abstract class Forma {\n  double get area; // método abstrato\n  void desenhar() => print('desenhando $this');\n}\n\nclass Circulo extends Forma {\n  final double raio;\n  Circulo(this.raio);\n\n  @override\n  double get area => 3.14159 * raio * raio;\n}" />
      <AlertBox type="info" title="Quando usar">Quando você quer fornecer comportamento padrão E forçar subclasses a implementarem certos métodos.</AlertBox>
      </PageContainer>
    );
  }
  