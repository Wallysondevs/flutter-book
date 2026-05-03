import { Link } from "wouter";
  import { useHashLocation } from "wouter/use-hash-location";
  import { cn } from "@/lib/utils";
  import {
    Activity, BookOpen, CheckCircle, Code2, Cpu, Database, FileText, FlaskConical,
    FolderOpen, Layers, Network, Package, Shapes, Shield, Smartphone, Sparkles, Wrench, X,
  } from "lucide-react";

  const NAVIGATION = [
    {
      title: "Boas-vindas",
      items: [
        { path: "/", label: "Início", icon: BookOpen },
        { path: "/historia", label: "História do Flutter", icon: BookOpen },
        { path: "/filosofia", label: "Filosofia: Single Codebase", icon: BookOpen },
        { path: "/dart-vs-js", label: "Dart vs JavaScript", icon: BookOpen },
      ],
    },
    {
      title: "Setup & Primeiro App",
      items: [
        { path: "/instalar-sdk", label: "Instalar Flutter SDK", icon: Wrench },
        { path: "/hello-world", label: "Hello, World!", icon: Wrench },
        { path: "/ide", label: "Escolher uma IDE", icon: Wrench },
        { path: "/estrutura-projeto", label: "Estrutura do Projeto", icon: Wrench },
      ],
    },
    {
      title: "Dart Básico",
      items: [
        { path: "/tipos", label: "Tipos & Variáveis", icon: Code2 },
        { path: "/operadores", label: "Operadores", icon: Code2 },
        { path: "/strings", label: "Strings & Interpolação", icon: Code2 },
        { path: "/controle-fluxo", label: "Controle de Fluxo", icon: Code2 },
        { path: "/loops", label: "Loops", icon: Code2 },
        { path: "/funcoes", label: "Funções & Closures", icon: Code2 },
        { path: "/null-safety", label: "Null Safety", icon: Code2 },
      ],
    },
    {
      title: "Coleções",
      items: [
        { path: "/list", label: "List", icon: Package },
        { path: "/set", label: "Set", icon: Package },
        { path: "/map", label: "Map", icon: Package },
        { path: "/iterables", label: "Iterables & Spread", icon: Package },
      ],
    },
    {
      title: "OOP em Dart",
      items: [
        { path: "/classes", label: "Classes & Objetos", icon: Layers },
        { path: "/construtores", label: "Construtores", icon: Layers },
        { path: "/heranca", label: "Herança", icon: Layers },
        { path: "/mixins", label: "Mixins", icon: Layers },
        { path: "/abstract", label: "Classes Abstratas", icon: Layers },
        { path: "/sealed", label: "Sealed Classes", icon: Layers },
        { path: "/extension-methods", label: "Extension Methods", icon: Layers },
      ],
    },
    {
      title: "Programação Assíncrona",
      items: [
        { path: "/futures", label: "Futures", icon: Network },
        { path: "/async-await", label: "async / await", icon: Network },
        { path: "/streams", label: "Streams", icon: Network },
        { path: "/isolates", label: "Isolates", icon: Network },
      ],
    },
    {
      title: "Widgets",
      items: [
        { path: "/stateless", label: "StatelessWidget", icon: Smartphone },
        { path: "/stateful", label: "StatefulWidget", icon: Smartphone },
        { path: "/widget-tree", label: "Widget Tree & Build", icon: Smartphone },
        { path: "/keys", label: "Keys", icon: Smartphone },
      ],
    },
    {
      title: "Layout",
      items: [
        { path: "/container", label: "Container & BoxDecoration", icon: Shapes },
        { path: "/row-column", label: "Row & Column", icon: Shapes },
        { path: "/stack", label: "Stack & Positioned", icon: Shapes },
        { path: "/expanded-flex", label: "Expanded & Flex", icon: Shapes },
        { path: "/listview", label: "ListView & GridView", icon: Shapes },
        { path: "/slivers", label: "Slivers", icon: Shapes },
      ],
    },
    {
      title: "Material & Cupertino",
      items: [
        { path: "/material", label: "Material Design", icon: Sparkles },
        { path: "/cupertino", label: "Cupertino (iOS)", icon: Sparkles },
        { path: "/themes", label: "Temas & Cores", icon: Sparkles },
      ],
    },
    {
      title: "Navegação",
      items: [
        { path: "/navigator-1", label: "Navigator 1.0", icon: Activity },
        { path: "/navigator-2", label: "Navigator 2.0", icon: Activity },
        { path: "/go-router", label: "go_router", icon: Activity },
      ],
    },
    {
      title: "Estado",
      items: [
        { path: "/setstate", label: "setState", icon: Cpu },
        { path: "/provider", label: "Provider", icon: Cpu },
        { path: "/riverpod", label: "Riverpod", icon: Cpu },
        { path: "/bloc", label: "BLoC", icon: Cpu },
        { path: "/inherited-widget", label: "InheritedWidget", icon: Cpu },
      ],
    },
    {
      title: "Networking",
      items: [
        { path: "/http", label: "Pacote http", icon: Database },
        { path: "/dio", label: "Dio", icon: Database },
        { path: "/json", label: "JSON & Serialização", icon: Database },
      ],
    },
    {
      title: "Persistência",
      items: [
        { path: "/shared-preferences", label: "SharedPreferences", icon: FolderOpen },
        { path: "/sqflite", label: "sqflite", icon: FolderOpen },
        { path: "/hive", label: "Hive", icon: FolderOpen },
        { path: "/isar", label: "Isar", icon: FolderOpen },
      ],
    },
    {
      title: "Forms & Animações",
      items: [
        { path: "/forms", label: "Forms & Validação", icon: FileText },
        { path: "/animacoes-implicitas", label: "Animações Implícitas", icon: Sparkles },
        { path: "/animacoes-explicitas", label: "Animações Explícitas", icon: Sparkles },
        { path: "/hero", label: "Hero Animations", icon: Sparkles },
      ],
    },
    {
      title: "Plataformas Nativas",
      items: [
        { path: "/platform-channels", label: "Platform Channels", icon: Smartphone },
        { path: "/plugins", label: "Criar Plugins", icon: Smartphone },
        { path: "/ffi", label: "Dart FFI", icon: Smartphone },
      ],
    },
    {
      title: "Testes",
      items: [
        { path: "/unit-tests", label: "Unit Tests", icon: FlaskConical },
        { path: "/widget-tests", label: "Widget Tests", icon: FlaskConical },
        { path: "/integration-tests", label: "Integration Tests", icon: FlaskConical },
      ],
    },
    {
      title: "Build & Deploy",
      items: [
        { path: "/build-android", label: "Build Android", icon: Wrench },
        { path: "/build-ios", label: "Build iOS", icon: Wrench },
        { path: "/build-web", label: "Build Web", icon: Wrench },
        { path: "/build-desktop", label: "Build Desktop", icon: Wrench },
      ],
    },
    {
      title: "Performance",
      items: [
        { path: "/devtools", label: "Flutter DevTools", icon: Activity },
        { path: "/profiling", label: "Profiling", icon: Activity },
        { path: "/repaint-boundary", label: "RepaintBoundary", icon: Activity },
      ],
    },
    {
      title: "Arquitetura",
      items: [
        { path: "/clean-architecture", label: "Clean Architecture", icon: Shield },
        { path: "/repository", label: "Repository Pattern", icon: Shield },
        { path: "/mvvm", label: "MVVM", icon: Shield },
      ],
    },
    {
      title: "Extras",
      items: [
        { path: "/firebase", label: "Firebase", icon: CheckCircle },
        { path: "/i18n", label: "Internacionalização", icon: CheckCircle },
        { path: "/referencias", label: "Referências", icon: BookOpen },
      ],
    },
  ];

  interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }

  export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [location] = useHashLocation();

    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}

        <aside
          className={cn(
            "fixed top-0 left-0 z-50 h-screen w-72 bg-card border-r border-border overflow-y-auto transition-transform duration-300 lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-card border-b border-border">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <span className="text-2xl">💙</span>
              <div>
                <div className="font-display font-bold text-foreground leading-tight">Flutter</div>
                <div className="text-xs text-muted-foreground leading-tight">Guia em PT-BR</div>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 -mr-2 rounded-md text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4 space-y-6">
            {NAVIGATION.map((section) => (
              <div key={section.title}>
                <h4 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = location === item.path;
                    return (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                            active
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
      </>
    );
  }
  