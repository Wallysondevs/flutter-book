import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function IDE() {
    return (
      <PageContainer title="Escolher uma IDE" subtitle="VS Code, Android Studio ou IntelliJ — qual usar?" difficulty="iniciante" timeToRead="5 min">
        <h2>Opções principais</h2>
      <ul>
        <li><strong>VS Code</strong> + extensões Dart e Flutter — leve, rápido, ótimo pro dia a dia</li>
        <li><strong>Android Studio</strong> — pesado, mas integração profunda com SDK Android, emuladores e build</li>
        <li><strong>IntelliJ IDEA</strong> — semelhante ao Android Studio, sem ferramentas Android</li>
      </ul>
      <h2>Recomendação</h2>
      <p>Use <strong>VS Code</strong> para escrever código no dia a dia e <strong>Android Studio</strong> só quando precisar gerenciar AVDs (emuladores) ou debugar coisas específicas do build Android.</p>
      <CodeBlock title="instalar extensões" code="# No VS Code, abra Extensions (Cmd+Shift+X) e instale:\n#   Dart\n#   Flutter\n#   Awesome Flutter Snippets (opcional)\n#   Pubspec Assist (opcional)" />
      <AlertBox type="success" title="Setup mínimo">VS Code + extensões Dart/Flutter + um simulador iOS (macOS) ou emulador Android já te leva longe.</AlertBox>
      </PageContainer>
    );
  }
  