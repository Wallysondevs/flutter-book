import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function InstalarSdk() {
    return (
      <PageContainer
        title="Instalar o Flutter SDK"
        subtitle="Configurando ambiente para começar a desenvolver apps multiplataforma."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <h2>Por que você precisa disso</h2>
        <p>
          O Flutter é um SDK — um conjunto de ferramentas que inclui o compilador Dart, o engine de renderização, widgets prontos e a CLI <code>flutter</code>. Sem ele instalado, nada funciona. Esta página te leva do zero ao primeiro <code>flutter doctor</code> sem erros.
        </p>

        <h2>1. Baixar o SDK</h2>
        <p>
          O jeito recomendado em 2026 é usar o <strong>FVM</strong> (Flutter Version Manager) ou baixar direto do site oficial. Abaixo o caminho oficial.
        </p>

        <h3>macOS / Linux</h3>
        <CodeBlock title="terminal" code={`# Baixe o tarball mais recente em https://docs.flutter.dev/get-started/install
  # Em seguida descompacte em ~/development e adicione ao PATH:

  mkdir -p ~/development
  cd ~/development
  tar xf ~/Downloads/flutter_macos_arm64_3.x.x-stable.tar.xz

  echo 'export PATH="$PATH:$HOME/development/flutter/bin"' >> ~/.zshrc
  source ~/.zshrc`} />

        <h3>Windows</h3>
        <p>
          Baixe o ZIP do site oficial, extraia para <code>C:\src\flutter</code> e adicione <code>C:\src\flutter\bin</code> ao PATH pelo painel "Variáveis de ambiente".
        </p>

        <AlertBox type="warning" title="Não use Program Files">
          Evite caminhos com espaços ou que exijam permissão de administrador. Pastas como <code>C:\src\flutter</code> são as mais seguras.
        </AlertBox>

        <h2>2. Verificar a instalação</h2>
        <CodeBlock title="terminal" code={`flutter doctor`} />

        <p>O comando lista o que falta. A primeira execução costuma reclamar de:</p>
        <ul>
          <li><strong>Android Studio / SDK</strong> — necessário para compilar para Android.</li>
          <li><strong>Xcode</strong> — necessário no macOS para compilar para iOS.</li>
          <li><strong>Chrome</strong> — necessário para rodar Flutter Web.</li>
        </ul>

        <h2>3. Aceitar licenças do Android</h2>
        <CodeBlock title="terminal" code={`flutter doctor --android-licenses`} />

        <p>Aceite tudo digitando <code>y</code> nas perguntas. Sem isso o build Android falha.</p>

        <h2>4. Criar o primeiro projeto</h2>
        <CodeBlock title="terminal" code={`flutter create meu_primeiro_app
  cd meu_primeiro_app
  flutter run`} />

        <p>
          Se um emulador (Android) ou simulador (iOS) estiver aberto, o app sobe automaticamente. Caso contrário, conecte um dispositivo físico ou rode no Chrome com <code>flutter run -d chrome</code>.
        </p>

        <AlertBox type="success" title="Pronto!">
          Se você viu o contador padrão na tela, parabéns — o ambiente está funcional. Próxima página: entender cada linha do <code>main.dart</code>.
        </AlertBox>
      </PageContainer>
    );
  }
  