import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function GoRouter() {
    return (
      <PageContainer title="go_router" subtitle="Pacote oficial recomendado para navegação declarativa e deep links." difficulty="intermediario" timeToRead="10 min">
        <h2>Setup</h2>
      <CodeBlock title="pubspec" code="dependencies:\n  go_router: ^14.0.0" />
      <CodeBlock title="router" code="final router = GoRouter(\n  routes: [\n    GoRoute(path: '/', builder: (c, s) => const HomePage()),\n    GoRoute(\n      path: '/usuario/:id',\n      builder: (c, s) => UsuarioPage(id: s.pathParameters['id']!),\n    ),\n  ],\n);\n\nMaterialApp.router(routerConfig: router)" />
      <h2>Navegando</h2>
      <CodeBlock title="navega" code="context.go('/usuario/42');\ncontext.push('/sobre');\ncontext.pop();" />
      <AlertBox type="success" title="Por que escolher">Deep links automáticos, suporte a web URLs, ShellRoute para layouts persistentes (bottom nav), redirect de auth.</AlertBox>
      </PageContainer>
    );
  }
  