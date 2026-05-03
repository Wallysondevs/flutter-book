import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function DevTools() {
    return (
      <PageContainer title="Flutter DevTools" subtitle="Suite de ferramentas oficiais — inspector, profiler, memory, network." difficulty="intermediario" timeToRead="8 min">
        <h2>Painéis</h2>
      <ul>
        <li><strong>Inspector</strong> — explorar widget tree</li>
        <li><strong>Performance</strong> — frames lentos, jank</li>
        <li><strong>CPU Profiler</strong> — flamegraph</li>
        <li><strong>Memory</strong> — alocações, leaks</li>
        <li><strong>Network</strong> — requisições HTTP</li>
        <li><strong>Logging</strong> — print + dart:developer logs</li>
      </ul>
      <CodeBlock title="abrir" code="# Já vem com Flutter; abra com:\nflutter pub global activate devtools\nflutter run\n# clique no link de DevTools no terminal" />
      <AlertBox type="info" title="Em VS Code">O painel "Flutter Inspector" e o "DevTools" abrem direto da IDE.</AlertBox>
      </PageContainer>
    );
  }
  