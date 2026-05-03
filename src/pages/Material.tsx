import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Material() {
    return (
      <PageContainer title="Material Design" subtitle="Sistema de design do Google encarnado em widgets." difficulty="iniciante" timeToRead="6 min">
        <h2>Os widgets fundamentais</h2>
      <ul>
        <li><code>MaterialApp</code> — raiz, fornece tema e navegação</li>
        <li><code>Scaffold</code> — estrutura: AppBar, Drawer, body, FAB</li>
        <li><code>AppBar</code> — barra superior</li>
        <li><code>FloatingActionButton</code> — botão flutuante de ação principal</li>
        <li><code>BottomNavigationBar</code> — navegação inferior</li>
      </ul>
      <CodeBlock title="exemplo" code="Scaffold(\n  appBar: AppBar(title: const Text('Início')),\n  body: const Center(child: Text('Olá')),\n  floatingActionButton: FloatingActionButton(\n    onPressed: () {},\n    child: const Icon(Icons.add),\n  ),\n)" />
      <AlertBox type="info" title="Material 3">Por padrão, Flutter 3.16+ usa Material 3. Ative com <code>useMaterial3: true</code> no ThemeData (já é default em projetos novos).</AlertBox>
      </PageContainer>
    );
  }
  