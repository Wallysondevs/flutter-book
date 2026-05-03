import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function BuildDesktop() {
  return (
    <PageContainer
      title="Build Desktop"
      subtitle="Apps nativos para Windows, macOS e Linux com o mesmo código Flutter."
      difficulty="intermediario"
      timeToRead="11 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Desde o Flutter 3, desktop é estável. O mesmo projeto que vira app
        Android/iOS pode virar um <code>.exe</code>, <code>.app</code> ou
        binário Linux — útil para ferramentas internas, dashboards, players de
        mídia ou qualquer app que precise de janela própria, atalhos de teclado
        e integração com o sistema.
      </p>

      <h2>O conceito</h2>
      <p>
        No desktop, cada plataforma tem um "shell" nativo que abre a janela
        (Win32 / Cocoa / GTK) e dentro dela o motor Flutter desenha igual ao
        mobile. Você só consegue compilar para a plataforma do <em>seu</em>
        sistema operacional:
      </p>
      <ul>
        <li><strong>macOS</strong> só compila no Mac (precisa de Xcode).</li>
        <li><strong>Windows</strong> só compila no Windows (precisa de Visual Studio com workload C++).</li>
        <li><strong>Linux</strong> só compila no Linux (precisa de <code>clang</code>, GTK 3, ninja).</li>
      </ul>

      <h2>Como o Flutter faz</h2>
      <p>
        Habilite a plataforma desejada e adicione o suporte ao projeto. Se o
        projeto já existia antes do desktop ser estável, rode <code>flutter create .</code> para
        gerar as pastas <code>windows/</code>, <code>macos/</code> e
        <code>linux/</code>.
      </p>

      <CodeBlock title="habilitar e compilar" code={`# Habilitar (uma vez por máquina)
flutter config --enable-windows-desktop
flutter config --enable-macos-desktop
flutter config --enable-linux-desktop

# Adicionar plataformas a um projeto existente
flutter create --platforms=windows,macos,linux .

# Rodar em modo dev na sua plataforma atual
flutter run -d windows
flutter run -d macos
flutter run -d linux

# Build de release
flutter build windows --release
flutter build macos --release
flutter build linux --release`} />

      <h2>Exemplo prático: ajustar tamanho de janela</h2>
      <p>
        Quase todo app desktop precisa de tamanho mínimo, ícone customizado e
        título personalizado. O pacote <code>window_manager</code> resolve isso
        sem mexer em código nativo.
      </p>

      <CodeBlock title="lib/main.dart" code={`import 'package:flutter/material.dart';
import 'package:window_manager/window_manager.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await windowManager.ensureInitialized();

  const opcoes = WindowOptions(
    size: Size(1024, 720),
    minimumSize: Size(800, 600),
    center: true,
    title: 'Meu App Desktop',
    titleBarStyle: TitleBarStyle.normal,
  );

  await windowManager.waitUntilReadyToShow(opcoes, () async {
    await windowManager.show();
    await windowManager.focus();
  });

  runApp(const MyApp());
}`} />

      <h2>Plataforma específica</h2>
      <p>
        Use <code>Platform.isWindows</code>, <code>Platform.isMacOS</code> e
        <code>Platform.isLinux</code> de <code>dart:io</code> para isolar
        comportamento (atalhos, menus, integrações de sistema).
      </p>

      <CodeBlock title="dica de plataforma" code={`import 'dart:io' show Platform;

String atalhoDeBusca() {
  if (Platform.isMacOS) return 'Cmd + F';
  if (Platform.isWindows || Platform.isLinux) return 'Ctrl + F';
  return '';
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Plugin não suporta desktop</strong> — muitos pacotes mobile (camera, geolocator) não têm implementação Windows/Linux. Verifique a tabela em pub.dev.</li>
        <li><strong>Caminhos de arquivo</strong> — não use <code>/sdcard/</code>; use <code>path_provider</code> que retorna pasta correta por SO.</li>
        <li><strong>Janela abre minúscula</strong> — defina <code>WindowOptions.size</code> antes de <code>show()</code>.</li>
        <li><strong>Esqueceu de assinar no macOS</strong> — usuários verão alerta "desenvolvedor não identificado". Precisa de Developer ID + notarização.</li>
        <li><strong>Linux exige libs no host</strong> — <code>libgtk-3-dev</code>, <code>liblzma-dev</code> etc. precisam existir na máquina de quem roda.</li>
      </ul>

      <AlertBox type="warning" title="Tamanho do binário">
        Apps desktop empacotam o motor Flutter inteiro (~30-50MB). Não é
        problema para apps internos, mas para distribuição pública compare com
        Tauri/Electron antes de decidir.
      </AlertBox>

      <AlertBox type="info" title="Distribuição">
        <ul>
          <li><strong>Windows</strong>: gere instalador com <code>msix</code> (Microsoft Store) ou <code>Inno Setup</code> / <code>NSIS</code>.</li>
          <li><strong>macOS</strong>: archive no Xcode, assine com Developer ID e <em>notarize</em> via <code>xcrun notarytool</code>.</li>
          <li><strong>Linux</strong>: empacote como <code>.deb</code>, <code>.rpm</code>, <code>snap</code> ou <code>flatpak</code>.</li>
        </ul>
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use <code>menu_bar</code> e <code>tray_manager</code> para integração nativa.</li>
          <li>Adapte UI para mouse + teclado: hover states, tooltips, atalhos.</li>
          <li>Teste com janelas redimensionadas extremas — layouts responsivos quebram facilmente.</li>
          <li>Configure auto-update com <code>auto_updater</code> ou Sparkle (mac).</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Veja <em>Build Web</em> para complementar o "code once, deploy
        everywhere" e <em>Flutter DevTools</em> para profilar uso de memória em
        sessões longas (apps desktop ficam abertos por horas).
      </p>
      <AlertBox type="success">
        Se for fazer um app desktop sério, leia também <em>Clean Architecture</em>:
        a complexidade aumenta rápido em apps com janelas, menus e múltiplos serviços.
      </AlertBox>
    </PageContainer>
  );
}
