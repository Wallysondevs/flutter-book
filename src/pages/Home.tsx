import { Link } from "wouter";
  import {
    Smartphone, Terminal, Code2, Layers, Cpu, Network,
    Wrench, FileText, Sparkles, ArrowRight, BookOpen,
  } from "lucide-react";

  const STATS = [
    { v: "23", l: "Módulos planejados" },
    { v: "500+", l: "Exemplos de código" },
    { v: "100%", l: "Português BR" },
    { v: "Flutter 3", l: "Estável atual" },
  ];

  const TRACKS = [
    { icon: Wrench, title: "Setup", desc: "Instalar o Flutter SDK, configurar PATH, escolher uma IDE.", to: "/instalar-sdk" },
    { icon: Code2, title: "Dart", desc: "Tipos, null safety, controle de fluxo, funções, coleções.", to: "/tipos" },
    { icon: Layers, title: "OOP", desc: "Classes, mixins, sealed classes, extension methods.", to: "/classes" },
    { icon: Sparkles, title: "Async", desc: "Futures, async/await, Streams, Isolates.", to: "/futures" },
    { icon: Smartphone, title: "Widgets", desc: "Stateless, Stateful, widget tree, keys.", to: "/stateless" },
    { icon: Terminal, title: "Layout", desc: "Row, Column, Stack, Expanded, ListView, Slivers.", to: "/container" },
    { icon: Network, title: "Estado", desc: "setState, Provider, Riverpod, BLoC.", to: "/setstate" },
    { icon: Cpu, title: "Performance", desc: "DevTools, profiling, repaint boundaries.", to: "/devtools" },
    { icon: FileText, title: "Build & Deploy", desc: "Android, iOS, Web e Desktop a partir de um único código.", to: "/build-android" },
  ];

  export default function Home() {
    return (
      <div className="px-4 sm:px-8 lg:px-16 py-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0175C2]/10 border border-[#0175C2]/30 text-xs font-mono text-[#13B9FD] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#13B9FD] animate-pulse" />
            GUIA COMPLETO 2026 · PORTUGUÊS BR · OPEN SOURCE
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Domine o <span className="text-[#13B9FD]">Flutter</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#D3D7CF] max-w-3xl mx-auto leading-relaxed mb-10">
            Da primeira{" "}
            <code className="bg-[#1A1A1A] px-2 py-0.5 rounded text-[#13B9FD] font-mono text-base">
              runApp(MyApp())
            </code>{" "}
            até apps multiplataforma com gerenciamento de estado avançado. Cada widget explicado, cada conceito demonstrado — sem mágica, sem encurtamentos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/instalar-sdk"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0175C2] hover:bg-[#13B9FD] text-white font-bold rounded-lg transition-all shadow-lg shadow-[#0175C2]/30 hover:scale-105"
            >
              <Wrench className="w-5 h-5" />
              Instalar o Flutter
            </Link>
            <Link
              href="/hello-world"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-[#0175C2]/10 text-[#13B9FD] border-2 border-[#0175C2]/40 hover:border-[#13B9FD] font-bold rounded-lg transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Ver Hello, World!
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((s) => (
            <div key={s.l} className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="text-3xl font-display font-bold text-[#13B9FD] mb-1">{s.v}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-display font-bold text-center mb-2">Trilhas de aprendizado</h2>
        <p className="text-center text-muted-foreground mb-10">Progressão recomendada — você pode pular o que já domina.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {TRACKS.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.title}
                href={t.to}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">
                    {t.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t.desc}</p>
                <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Explorar <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h3 className="font-display font-bold text-2xl mb-2">100% Open Source</h3>
          <p className="text-muted-foreground mb-4">
            Conteúdo gratuito, contribuições bem-vindas. Encontrou um erro? Mande um PR.
          </p>
          <a
            href="https://github.com/Wallysondevs/flutter-book"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:border-primary/40 text-sm font-medium transition-colors"
          >
            Ver no GitHub <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }
  