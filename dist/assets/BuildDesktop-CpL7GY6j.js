import{j as e}from"./index-D4AOhXGO.js";import{P as o,C as a,A as i}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(o,{title:"Build Desktop",subtitle:"Apps nativos para Windows, macOS e Linux com o mesmo código Flutter.",difficulty:"intermediario",timeToRead:"11 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Desde o Flutter 3, desktop é estável. O mesmo projeto que vira app Android/iOS pode virar um ",e.jsx("code",{children:".exe"}),", ",e.jsx("code",{children:".app"})," ou binário Linux — útil para ferramentas internas, dashboards, players de mídia ou qualquer app que precise de janela própria, atalhos de teclado e integração com o sistema."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:['No desktop, cada plataforma tem um "shell" nativo que abre a janela (Win32 / Cocoa / GTK) e dentro dela o motor Flutter desenha igual ao mobile. Você só consegue compilar para a plataforma do ',e.jsx("em",{children:"seu"}),"sistema operacional:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"macOS"})," só compila no Mac (precisa de Xcode)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Windows"})," só compila no Windows (precisa de Visual Studio com workload C++)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Linux"})," só compila no Linux (precisa de ",e.jsx("code",{children:"clang"}),", GTK 3, ninja)."]})]}),e.jsx("h2",{children:"Como o Flutter faz"}),e.jsxs("p",{children:["Habilite a plataforma desejada e adicione o suporte ao projeto. Se o projeto já existia antes do desktop ser estável, rode ",e.jsx("code",{children:"flutter create ."})," para gerar as pastas ",e.jsx("code",{children:"windows/"}),", ",e.jsx("code",{children:"macos/"})," e",e.jsx("code",{children:"linux/"}),"."]}),e.jsx(a,{title:"habilitar e compilar",code:`# Habilitar (uma vez por máquina)
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
flutter build linux --release`}),e.jsx("h2",{children:"Exemplo prático: ajustar tamanho de janela"}),e.jsxs("p",{children:["Quase todo app desktop precisa de tamanho mínimo, ícone customizado e título personalizado. O pacote ",e.jsx("code",{children:"window_manager"})," resolve isso sem mexer em código nativo."]}),e.jsx(a,{title:"lib/main.dart",code:`import 'package:flutter/material.dart';
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
}`}),e.jsx("h2",{children:"Plataforma específica"}),e.jsxs("p",{children:["Use ",e.jsx("code",{children:"Platform.isWindows"}),", ",e.jsx("code",{children:"Platform.isMacOS"})," e",e.jsx("code",{children:"Platform.isLinux"})," de ",e.jsx("code",{children:"dart:io"})," para isolar comportamento (atalhos, menus, integrações de sistema)."]}),e.jsx(a,{title:"dica de plataforma",code:`import 'dart:io' show Platform;

String atalhoDeBusca() {
  if (Platform.isMacOS) return 'Cmd + F';
  if (Platform.isWindows || Platform.isLinux) return 'Ctrl + F';
  return '';
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Plugin não suporta desktop"})," — muitos pacotes mobile (camera, geolocator) não têm implementação Windows/Linux. Verifique a tabela em pub.dev."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Caminhos de arquivo"})," — não use ",e.jsx("code",{children:"/sdcard/"}),"; use ",e.jsx("code",{children:"path_provider"})," que retorna pasta correta por SO."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Janela abre minúscula"})," — defina ",e.jsx("code",{children:"WindowOptions.size"})," antes de ",e.jsx("code",{children:"show()"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esqueceu de assinar no macOS"}),' — usuários verão alerta "desenvolvedor não identificado". Precisa de Developer ID + notarização.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Linux exige libs no host"})," — ",e.jsx("code",{children:"libgtk-3-dev"}),", ",e.jsx("code",{children:"liblzma-dev"})," etc. precisam existir na máquina de quem roda."]})]}),e.jsx(i,{type:"warning",title:"Tamanho do binário",children:"Apps desktop empacotam o motor Flutter inteiro (~30-50MB). Não é problema para apps internos, mas para distribuição pública compare com Tauri/Electron antes de decidir."}),e.jsx(i,{type:"info",title:"Distribuição",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Windows"}),": gere instalador com ",e.jsx("code",{children:"msix"})," (Microsoft Store) ou ",e.jsx("code",{children:"Inno Setup"})," / ",e.jsx("code",{children:"NSIS"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"macOS"}),": archive no Xcode, assine com Developer ID e ",e.jsx("em",{children:"notarize"})," via ",e.jsx("code",{children:"xcrun notarytool"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Linux"}),": empacote como ",e.jsx("code",{children:".deb"}),", ",e.jsx("code",{children:".rpm"}),", ",e.jsx("code",{children:"snap"})," ou ",e.jsx("code",{children:"flatpak"}),"."]})]})}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(i,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"menu_bar"})," e ",e.jsx("code",{children:"tray_manager"})," para integração nativa."]}),e.jsx("li",{children:"Adapte UI para mouse + teclado: hover states, tooltips, atalhos."}),e.jsx("li",{children:"Teste com janelas redimensionadas extremas — layouts responsivos quebram facilmente."}),e.jsxs("li",{children:["Configure auto-update com ",e.jsx("code",{children:"auto_updater"})," ou Sparkle (mac)."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Veja ",e.jsx("em",{children:"Build Web"}),' para complementar o "code once, deploy everywhere" e ',e.jsx("em",{children:"Flutter DevTools"})," para profilar uso de memória em sessões longas (apps desktop ficam abertos por horas)."]}),e.jsxs(i,{type:"success",children:["Se for fazer um app desktop sério, leia também ",e.jsx("em",{children:"Clean Architecture"}),": a complexidade aumenta rápido em apps com janelas, menus e múltiplos serviços."]})]})}export{n as default};
