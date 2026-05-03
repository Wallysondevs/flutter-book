# 💙 Flutter Book

  Guia completo de Flutter & Dart em Português Brasileiro — interativo, com exemplos prontos para copiar.

  🌐 **Site:** https://wallysondevs.github.io/flutter-book/

  ## Conteúdo

  81 páginas cobrindo:

  - **Setup & Boas-vindas** — Instalação do SDK, IDE, primeira app
  - **Dart Básico** — Tipos, null safety, funções, controle de fluxo
  - **Coleções** — List, Set, Map, Iterables
  - **OOP** — Classes, herança, mixins, sealed classes, extension methods
  - **Async** — Futures, async/await, Streams, Isolates
  - **Widgets** — Stateless, Stateful, widget tree, keys
  - **Layout** — Container, Row, Column, Stack, Expanded, ListView, Slivers
  - **Material & Cupertino** — Design systems e temas
  - **Navegação** — Navigator 1.0, 2.0, go_router
  - **Estado** — setState, Provider, Riverpod, BLoC, InheritedWidget
  - **Networking** — http, Dio, JSON
  - **Persistência** — SharedPreferences, sqflite, Hive, Isar
  - **Forms & Animações** — Forms, animações implícitas/explícitas, Hero
  - **Plataformas Nativas** — Platform Channels, Plugins, FFI
  - **Testes** — Unit, widget e integration tests
  - **Build & Deploy** — Android, iOS, Web, Desktop
  - **Performance** — DevTools, profiling, RepaintBoundary
  - **Arquitetura** — Clean Architecture, Repository, MVVM
  - **Extras** — Firebase, i18n, referências

  ## Rodar localmente

  ```bash
  pnpm install
  pnpm run dev
  ```

  ## Build local

  ```bash
  VITE_BASE=/ pnpm run build
  pnpm run preview
  ```

  ## Stack

  - React 18 + TypeScript
  - Vite 6
  - Tailwind CSS v4
  - shadcn/ui (Radix + class-variance-authority)
  - Wouter (hash routing — funciona no GitHub Pages sem 404 config)
  - Framer Motion para microinterações

  ## Deploy

  Push para `main` dispara o workflow `.github/workflows/deploy.yml` que builda e publica em GitHub Pages.

  ---

  Inspirado pelo [java-book](https://github.com/Wallysondevs/java-book).
  