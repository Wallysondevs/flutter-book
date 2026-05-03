import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function EstruturaProjeto() {
    return (
      <PageContainer title="Estrutura do Projeto" subtitle="O que tem dentro de um projeto Flutter recém-criado." difficulty="iniciante" timeToRead="8 min">
        <h2>Após flutter create</h2>
      <CodeBlock title="tree" code="meu_app/\n├── lib/                  # Seu código Dart\n│   └── main.dart         # Ponto de entrada\n├── android/              # Wrapper nativo Android\n├── ios/                  # Wrapper nativo iOS\n├── web/                  # Wrapper Web\n├── linux/ macos/ windows/  # Wrappers desktop\n├── test/                 # Testes\n├── pubspec.yaml          # Dependências e assets\n├── pubspec.lock          # Versões travadas\n└── analysis_options.yaml # Regras de lint" />
      <h2>Onde você passa 95% do tempo</h2>
      <p>A pasta <code>lib/</code> e o arquivo <code>pubspec.yaml</code>. Os wrappers nativos só precisam ser editados para integrações específicas (permissões, ícones, splash).</p>
      <h2>Organização recomendada de lib/</h2>
      <CodeBlock title="lib/" code="lib/\n├── main.dart\n├── app.dart            # MaterialApp + tema\n├── core/               # Utilitários, constantes\n├── data/               # Models, repositories, datasources\n├── domain/             # Entidades e use cases\n├── presentation/       # Pages, widgets, controllers\n│   ├── pages/\n│   └── widgets/\n└── routes/             # Configuração de navegação" />
      <AlertBox type="info" title="Não há padrão único">Use o que faz sentido pro tamanho do projeto. Apps pequenos podem ter tudo na raiz de lib/.</AlertBox>
      </PageContainer>
    );
  }
  