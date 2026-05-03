import{j as e}from"./index-D4AOhXGO.js";import{P as r,C as s,A as a}from"./AlertBox-Dyf2wdSA.js";function i(){return e.jsxs(r,{title:"Estrutura do Projeto",subtitle:"O que tem dentro de um projeto Flutter recém-criado e onde você realmente trabalha.",difficulty:"iniciante",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quando você roda ",e.jsx("code",{children:"flutter create meu_app"}),", aparecem dezenas de pastas e arquivos. Saber ",e.jsx("strong",{children:"quais são código seu, quais são wrappers de plataforma e quais nem deveriam ir pro Git"})," evita medo de mexer e ajuda a achar bugs depois."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um projeto Flutter é, no fundo, um projeto Dart com pastas extras: uma para cada plataforma que ele consegue empacotar (Android, iOS, Web, Linux, macOS, Windows). O seu código fica em ",e.jsx("code",{children:"lib/"})," e roda em ",e.jsx("strong",{children:"todas"}),' elas. As pastas nativas são apenas o "shell" que carrega a engine do Flutter.']}),e.jsx("h2",{children:"O que cada pasta faz"}),e.jsx(s,{title:"árvore após flutter create",code:`meu_app/
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
└── .gitignore            # Já vem configurado pelo create`}),e.jsx("h2",{children:"Onde você passa 95% do tempo"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"lib/"})})," — todo o código Dart do seu app vive aqui."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"pubspec.yaml"})})," — declara dependências, assets (imagens, JSON) e fontes."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"test/"})})," — testes que rodam com ",e.jsx("code",{children:"flutter test"}),"."]})]}),e.jsxs("p",{children:["As pastas ",e.jsx("code",{children:"android/"})," e ",e.jsx("code",{children:"ios/"})," só recebem edição quando você precisa configurar permissões, ícones do app, splash screen, ou integrar SDKs nativos."]}),e.jsx("h2",{children:"O pubspec.yaml por dentro"}),e.jsx(s,{title:"pubspec.yaml",code:`name: meu_app
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
          weight: 700`}),e.jsxs(a,{type:"info",title:"O acento ^ na versão",children:[e.jsx("code",{children:"^1.2.0"})," aceita qualquer versão ",e.jsx("code",{children:">=1.2.0 <2.0.0"}),". É a forma padrão de pegar correções de bug sem quebrar API. Para travar exato, omita o ",e.jsx("code",{children:"^"}),"."]}),e.jsx("h2",{children:"Organização recomendada de lib/"}),e.jsxs("p",{children:['Não existe estrutura "oficial". Para apps pequenos, jogue tudo em ',e.jsx("code",{children:"lib/"}),". À medida que cresce, separe por ",e.jsx("strong",{children:"camadas"})," ou por ",e.jsx("strong",{children:"features"}),":"]}),e.jsx(s,{title:"estrutura por camadas (clean-ish)",code:`lib/
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
    └── widgets/`}),e.jsx(s,{title:"estrutura por features",code:`lib/
├── main.dart
├── app.dart
├── shared/              # Widgets e utils reutilizados
└── features/
    ├── auth/
    │   ├── data/
    │   ├── domain/
    │   └── ui/
    ├── home/
    └── perfil/`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Editar ",e.jsx("code",{children:"build/"})," ou ",e.jsx("code",{children:".dart_tool/"})," — são gerados, mudanças somem no próximo build."]}),e.jsxs("li",{children:["Esquecer de declarar assets em ",e.jsx("code",{children:"pubspec.yaml"}),' — a imagem não aparece e o erro só fala em "asset not found".']}),e.jsxs("li",{children:["Indentação errada no ",e.jsx("code",{children:"pubspec.yaml"})," (YAML é sensível a espaços) — sempre 2 espaços, sem tabs."]}),e.jsxs("li",{children:["Commitar ",e.jsx("code",{children:"build/"}),", ",e.jsx("code",{children:".dart_tool/"})," ou ",e.jsx("code",{children:"ios/Pods/"})," — incha o repositório à toa."]})]}),e.jsxs(a,{type:"warning",title:"Não delete pastas de plataforma",children:["Se você apagar ",e.jsx("code",{children:"android/"}),' achando que "não usa", o build mobile quebra. Para recriar use ',e.jsx("code",{children:"flutter create --platforms=android ."})," dentro do projeto."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(a,{type:"tip",title:"Comece simples",children:["Em apps com até ~5 telas, mantenha tudo em ",e.jsx("code",{children:"lib/"})," dividido em ",e.jsx("code",{children:"pages/"}),", ",e.jsx("code",{children:"widgets/"})," e ",e.jsx("code",{children:"models/"}),". Só introduza camadas quando o app pedir — arquitetura prematura é tão ruim quanto código bagunçado."]}),e.jsx("h2",{children:"Próximos passos"}),e.jsx("p",{children:"Com o terreno mapeado, vamos começar a escrever Dart de verdade — começando pelos tipos e variáveis."}),e.jsxs(a,{type:"success",title:"Continue lendo",children:["Próximo: ",e.jsx("em",{children:"Tipos & Variáveis"}),"."]})]})}export{i as default};
