import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Funcoes() {
    return (
      <PageContainer title="Funções & Closures" subtitle="Parâmetros nomeados, opcionais, arrow functions." difficulty="iniciante" timeToRead="9 min">
        <h2>Sintaxe básica</h2>
      <CodeBlock title="forms" code="int soma(int a, int b) => a + b;\n\nint soma2(int a, int b) {\n  return a + b;\n}" />
      <h2>Parâmetros nomeados (essencial em Flutter!)</h2>
      <CodeBlock title="named" code="Widget botao({required String texto, Color cor = Colors.blue}) {\n  return ElevatedButton(\n    style: ElevatedButton.styleFrom(backgroundColor: cor),\n    child: Text(texto),\n    onPressed: () {},\n  );\n}\n\n// Uso:\nbotao(texto: 'Salvar');\nbotao(texto: 'Cancelar', cor: Colors.red);" />
      <h2>Funções como valores</h2>
      <CodeBlock title="first-class" code="void executar(void Function() acao) => acao();\n\nexecutar(() => print('rodou'));" />
      <AlertBox type="info" title="Por que named matters">Quase todos os widgets do Flutter usam named parameters. Isso torna o código auto-documentado.</AlertBox>
      </PageContainer>
    );
  }
  