import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Themes() {
    return (
      <PageContainer title="Temas & Cores" subtitle="Configurar cores, tipografia e temas claro/escuro globalmente." difficulty="intermediario" timeToRead="9 min">
        <h2>ThemeData</h2>
      <CodeBlock title="theme" code="MaterialApp(\n  theme: ThemeData(\n    useMaterial3: true,\n    colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),\n    textTheme: const TextTheme(\n      bodyMedium: TextStyle(fontSize: 16, height: 1.5),\n    ),\n  ),\n  darkTheme: ThemeData(\n    useMaterial3: true,\n    brightness: Brightness.dark,\n    colorScheme: ColorScheme.fromSeed(\n      seedColor: Colors.blue,\n      brightness: Brightness.dark,\n    ),\n  ),\n  themeMode: ThemeMode.system,\n  home: const HomePage(),\n)" />
      <h2>Acessando o tema</h2>
      <CodeBlock title="of" code="final theme = Theme.of(context);\nText('Olá', style: theme.textTheme.headlineMedium);\nContainer(color: theme.colorScheme.primary);" />
      <AlertBox type="success" title="Material 3 + ColorScheme.fromSeed">Você passa uma cor base e o Material 3 gera toda a paleta automaticamente — primary, secondary, surface, onPrimary, etc.</AlertBox>
      </PageContainer>
    );
  }
  