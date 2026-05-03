import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Mvvm() {
    return (
      <PageContainer title="MVVM" subtitle="Model–View–ViewModel — comum com Provider e Riverpod." difficulty="intermediario" timeToRead="8 min">
        <h2>Mapeamento</h2>
      <ul>
        <li><strong>Model</strong> — entidades de domínio</li>
        <li><strong>View</strong> — widgets</li>
        <li><strong>ViewModel</strong> — ChangeNotifier/Notifier que expõe estado e ações</li>
      </ul>
      <CodeBlock title="vm" code="class HomeVM extends ChangeNotifier {\n  final UsuarioRepo repo;\n  HomeVM(this.repo);\n\n  bool loading = false;\n  List<Usuario> usuarios = [];\n\n  Future<void> carregar() async {\n    loading = true; notifyListeners();\n    usuarios = await repo.listar();\n    loading = false; notifyListeners();\n  }\n}" />
      <AlertBox type="info" title="Combina com Provider">ChangeNotifierProvider expõe a VM, e a View consome via Consumer ou context.watch.</AlertBox>
      </PageContainer>
    );
  }
  