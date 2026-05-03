import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Cupertino() {
    return (
      <PageContainer title="Cupertino (iOS)" subtitle="Widgets com a aparência nativa do iOS." difficulty="intermediario" timeToRead="6 min">
        <h2>Versão iOS dos widgets</h2>
      <CodeBlock title="exemplo" code="import 'package:flutter/cupertino.dart';\n\nCupertinoPageScaffold(\n  navigationBar: const CupertinoNavigationBar(\n    middle: Text('Início'),\n  ),\n  child: Center(\n    child: CupertinoButton.filled(\n      child: const Text('OK'),\n      onPressed: () {},\n    ),\n  ),\n)" />
      <h2>Adaptive widgets</h2>
      <p>Use <code>Switch.adaptive</code>, <code>CircularProgressIndicator.adaptive</code> etc. para componentes que se adaptam à plataforma automaticamente.</p>
      <AlertBox type="info" title="Quando usar Cupertino">Apps que precisam parecer 100% iOS para passar na revisão da Apple. Para apps multiplataforma com identidade própria, fique no Material.</AlertBox>
      </PageContainer>
    );
  }
  