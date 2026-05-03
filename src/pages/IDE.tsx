import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function IDE() {
  return (
    <PageContainer
      title="Escolher uma IDE"
      subtitle="VS Code, Android Studio ou IntelliJ — qual usar e como configurar."
      difficulty="iniciante"
      timeToRead="9 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        A IDE é onde você passa o dia inteiro. Uma escolha ruim te custa horas em build lento, autocomplete fraco e debugger frustrante. A boa notícia: para Flutter, qualquer das opções abaixo funciona — a diferença está em <strong>peso, integração com Android e ergonomia</strong>.
      </p>

      <h2>O conceito</h2>
      <p>
        Para programar em Flutter você precisa de:
      </p>
      <ul>
        <li>Um <strong>editor</strong> com <em>Dart Analysis Server</em> ligado (autocomplete, hover, refactor).</li>
        <li>Plugins para rodar <code>flutter run</code>, abrir DevTools e debugar com breakpoints.</li>
        <li>Um <strong>simulador iOS</strong> (apenas em macOS) e/ou um <strong>emulador Android</strong>, ou um dispositivo físico.</li>
      </ul>

      <h2>As três opções principais</h2>
      <ul>
        <li><strong>VS Code</strong> — leve, rápido, ótimo para o dia a dia. Plugins oficiais Dart e Flutter cobrem 95% das necessidades.</li>
        <li><strong>Android Studio</strong> — pesado, mas com integração profunda ao SDK Android: gerenciador de AVDs, profiler, layout inspector nativo, gerador de ícones.</li>
        <li><strong>IntelliJ IDEA Ultimate</strong> — mesma engine do Android Studio, sem as ferramentas Android. Vale se você já paga pela licença.</li>
      </ul>

      <AlertBox type="info" title="Recomendação prática">
        Use <strong>VS Code</strong> para escrever código e <strong>Android Studio</strong> só quando precisar gerenciar emuladores Android, debugar problemas de build Gradle ou usar o Layout Inspector.
      </AlertBox>

      <h2>Como configurar o VS Code</h2>
      <CodeBlock title="extensões essenciais" code={`# Abra Extensions (Cmd/Ctrl+Shift+X) e instale:
#   - Dart                    (oficial Dart team)
#   - Flutter                 (oficial Flutter team)
#
# Opcionais que ajudam muito:
#   - Awesome Flutter Snippets (atalhos como stl, stful)
#   - Pubspec Assist           (adicionar pacotes pelo nome)
#   - Error Lens               (mostra erro inline)
#   - Bracket Pair Colorizer   (parênteses coloridos)`} />

      <CodeBlock title="settings.json recomendado" code={`{
  "editor.formatOnSave": true,
  "editor.rulers": [80],
  "dart.lineLength": 80,
  "dart.previewFlutterUiGuides": true,
  "dart.previewFlutterUiGuidesCustomTracking": true,
  "[dart]": {
    "editor.defaultFormatter": "Dart-Code.dart-code",
    "editor.tabSize": 2,
    "editor.suggestSelection": "first"
  }
}`} />

      <h2>Atalhos que valem a pena memorizar</h2>
      <ul>
        <li><code>Ctrl/Cmd + .</code> — abre o menu de quick fixes (extrair widget, embrulhar em Padding, etc).</li>
        <li><code>F5</code> — inicia debug; <code>Shift+F5</code> para; <code>Ctrl+F5</code> roda sem debugger.</li>
        <li><code>r</code> no terminal do <code>flutter run</code> — hot reload; <code>R</code> — hot restart.</li>
        <li><code>Cmd/Ctrl + click</code> em um símbolo — vai para a definição.</li>
      </ul>

      <h2>Verificando o ambiente</h2>
      <CodeBlock title="checagem rápida" code={`# Roda um diagnóstico completo: SDK, dispositivos, licenças
flutter doctor -v

# Se aparecer erro em Android licenses:
flutter doctor --android-licenses

# Cria projeto e abre no VS Code:
flutter create meu_app
code meu_app`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Instalar Flutter SDK em pasta com <strong>espaços ou acentos</strong> no caminho — quebra builds em alguns sistemas.</li>
        <li>Esquecer de adicionar <code>flutter/bin</code> ao <strong>PATH</strong>.</li>
        <li>Usar dois SDKs Flutter no mesmo computador sem <strong>FVM</strong> — confusão garantida em projetos com versões diferentes.</li>
        <li>Rodar Android emulator sem aceleração de hardware (HAXM/Hyper-V) — fica lentíssimo.</li>
      </ul>

      <AlertBox type="warning" title="No macOS Apple Silicon">
        Use a versão ARM64 do Flutter SDK e instale <code>cocoapods</code> via <code>sudo gem install cocoapods</code> ou via Homebrew. Sem isso, builds iOS quebram em mensagens crípticas.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Use FVM se for mexer em vários projetos">
        O <em>Flutter Version Management</em> (<code>fvm</code>) deixa cada projeto travado numa versão do SDK, sem afetar o sistema todo. Indispensável em times.
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com a IDE configurada, é hora de abrir um projeto recém-criado e entender cada pasta dele.
      </p>

      <AlertBox type="success" title="Continue lendo">
        Próximo: <em>Estrutura do Projeto</em>.
      </AlertBox>
    </PageContainer>
  );
}
