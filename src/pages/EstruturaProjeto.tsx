import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function EstruturaProjeto() {
  return (
    <PageContainer
      title="Estrutura do Projeto"
      subtitle="O que tem dentro de um projeto Flutter recém-criado e onde você realmente trabalha."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quando você roda <code>flutter create meu_app</code>, aparecem dezenas de pastas e arquivos. Saber <strong>quais são código seu, quais são wrappers de plataforma e quais nem deveriam ir pro Git</strong> evita medo de mexer e ajuda a achar bugs depois.
      </p>

      <h2>O conceito</h2>
      <p>
        Um projeto Flutter é, no fundo, um projeto Dart com pastas extras: uma para cada plataforma que ele consegue empacotar (Android, iOS, Web, Linux, macOS, Windows). O seu código fica em <code>lib/</code> e roda em <strong>todas</strong> elas. As pastas nativas são apenas o "shell" que carrega a engine do Flutter.
      </p>

      <h2>O que cada pasta faz</h2>
      <CodeBlock title="árvore após flutter create" code={`meu_app/
├── lib/                  # Seu código Dart (o que importa)
│   └── main.dart         # Ponto de entrada: void main()
├── test/                 # Testes unit/widget/integration
├── android/              # Wrapper nativo Android (Gradle)
├── ios/                  # Wrapper nativo iOS (Xcode/Swift)
├── web/                  # index.html e assets para build web
├── linux/ macos/ windows/  # Wrappers desktop
├── pubspec.yaml          # Manifesto: deps, assets, fontes
├── pubspec.lock          # Versões exatas resolvidas (commitar)
├── analysis_options.yaml # Regras de lint/análise
├── .dart_tool/           # Cache do Dart (NÃO commitar)
├── build/                # Saída de compilação (NÃO commitar)
└── .gitignore            # Já vem configurado pelo create`} />

      <h2>Onde você passa 95% do tempo</h2>
      <ul>
        <li><strong><code>lib/</code></strong> — todo o código Dart do seu app vive aqui.</li>
        <li><strong><code>pubspec.yaml</code></strong> — declara dependências, assets (imagens, JSON) e fontes.</li>
        <li><strong><code>test/</code></strong> — testes que rodam com <code>flutter test</code>.</li>
      </ul>
      <p>
        As pastas <code>android/</code> e <code>ios/</code> só recebem edição quando você precisa configurar permissões, ícones do app, splash screen, ou integrar SDKs nativos.
      </p>

      <h2>O pubspec.yaml por dentro</h2>
      <CodeBlock title="pubspec.yaml" code={`name: meu_app
description: Um app Flutter de exemplo
publish_to: 'none' # impede publicação acidental no pub.dev
version: 1.0.0+1   # 1.0.0 é semver, +1 é o build number

environment:
  sdk: '>=3.4.0 <4.0.0'
  flutter: '>=3.22.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  http: ^1.2.0
  go_router: ^14.0.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/data/cidades.json
  fonts:
    - family: Inter
      fonts:
        - asset: assets/fonts/Inter-Regular.ttf
        - asset: assets/fonts/Inter-Bold.ttf
          weight: 700`} />

      <AlertBox type="info" title="O acento ^ na versão">
        <code>^1.2.0</code> aceita qualquer versão <code>&gt;=1.2.0 &lt;2.0.0</code>. É a forma padrão de pegar correções de bug sem quebrar API. Para travar exato, omita o <code>^</code>.
      </AlertBox>

      <h2>Organização recomendada de lib/</h2>
      <p>
        Não existe estrutura "oficial". Para apps pequenos, jogue tudo em <code>lib/</code>. À medida que cresce, separe por <strong>camadas</strong> ou por <strong>features</strong>:
      </p>

      <CodeBlock title="estrutura por camadas (clean-ish)" code={`lib/
├── main.dart            # runApp(MyApp())
├── app.dart             # MaterialApp, tema, rotas globais
├── core/                # Utilitários, constantes, theme
│   ├── theme.dart
│   └── result.dart
├── data/                # Models, datasources, repositories
│   ├── api/
│   └── repositories/
├── domain/              # Entidades e use cases (regras de negócio)
└── presentation/        # UI: pages, widgets, controllers
    ├── pages/
    └── widgets/`} />

      <CodeBlock title="estrutura por features" code={`lib/
├── main.dart
├── app.dart
├── shared/              # Widgets e utils reutilizados
└── features/
    ├── auth/
    │   ├── data/
    │   ├── domain/
    │   └── ui/
    ├── home/
    └── perfil/`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Editar <code>build/</code> ou <code>.dart_tool/</code> — são gerados, mudanças somem no próximo build.</li>
        <li>Esquecer de declarar assets em <code>pubspec.yaml</code> — a imagem não aparece e o erro só fala em "asset not found".</li>
        <li>Indentação errada no <code>pubspec.yaml</code> (YAML é sensível a espaços) — sempre 2 espaços, sem tabs.</li>
        <li>Commitar <code>build/</code>, <code>.dart_tool/</code> ou <code>ios/Pods/</code> — incha o repositório à toa.</li>
      </ul>

      <AlertBox type="warning" title="Não delete pastas de plataforma">
        Se você apagar <code>android/</code> achando que "não usa", o build mobile quebra. Para recriar use <code>flutter create --platforms=android .</code> dentro do projeto.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Comece simples">
        Em apps com até ~5 telas, mantenha tudo em <code>lib/</code> dividido em <code>pages/</code>, <code>widgets/</code> e <code>models/</code>. Só introduza camadas quando o app pedir — arquitetura prematura é tão ruim quanto código bagunçado.
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com o terreno mapeado, vamos começar a escrever Dart de verdade — começando pelos tipos e variáveis.
      </p>

      <AlertBox type="success" title="Continue lendo">
        Próximo: <em>Tipos &amp; Variáveis</em>.
      </AlertBox>
    </PageContainer>
  );
}
