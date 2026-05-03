import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function BuildAndroid() {
  return (
    <PageContainer
      title="Build Android"
      subtitle="Gerar APK e AAB assinados, prontos para a Play Store."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Programar o app é só metade do trabalho. Para usuários reais instalarem,
        você precisa de um <strong>artefato assinado</strong>: um APK (instalação
        direta) ou um AAB (Android App Bundle, exigido pela Play Store). Sem
        assinatura digital, o Android e a Play Store rejeitam.
      </p>

      <h2>O conceito</h2>
      <p>
        O Android exige que todo aplicativo seja assinado com uma chave
        criptográfica. Essa chave funciona como sua "identidade": atualizações
        futuras só são aceitas se assinadas com a <em>mesma</em> chave da
        primeira publicação. Perdeu a chave? Perdeu o controle do app na Play.
      </p>
      <ul>
        <li><strong>Debug</strong> — chave automática gerada pelo Flutter; só serve para testes locais.</li>
        <li><strong>Release</strong> — sua chave de produção, guardada em segredo.</li>
        <li><strong>APK</strong> — pacote único, bom para testes e distribuição direta.</li>
        <li><strong>AAB</strong> — bundle que a Play recompila por device (menor download).</li>
      </ul>

      <h2>Como o Flutter faz</h2>
      <p>
        Os comandos abaixo geram o artefato em <code>build/app/outputs/</code>.
        Sem configuração extra, ele vai sair assinado com a chave debug — útil
        só para você instalar no seu celular via cabo.
      </p>

      <CodeBlock title="comandos básicos" code={`# APK único (debug — só pra você testar)
flutter build apk --debug

# APK release (precisa de chave de produção configurada)
flutter build apk --release

# AAB para a Play Store
flutter build appbundle --release

# APKs separados por arquitetura (menor)
flutter build apk --split-per-abi --release`} />

      <h2>Exemplo prático: gerar e configurar a chave de release</h2>
      <p>
        Crie uma chave (<code>keystore</code>) uma única vez e guarde em local
        seguro (cofre, gerenciador de senhas). O comando <code>keytool</code> vem
        com o JDK.
      </p>

      <CodeBlock title="1) gerar keystore" code={`keytool -genkey -v -keystore ~/upload-keystore.jks \\
  -keyalg RSA -keysize 2048 -validity 10000 -alias upload`} />

      <CodeBlock title="2) android/key.properties (NÃO commitar)" code={`storePassword=SUA_SENHA
keyPassword=SUA_SENHA
keyAlias=upload
storeFile=/Users/voce/upload-keystore.jks`} />

      <CodeBlock title="3) android/app/build.gradle.kts" code={`val keystoreProperties = Properties()
val keystoreFile = rootProject.file("key.properties")
if (keystoreFile.exists()) {
  keystoreProperties.load(FileInputStream(keystoreFile))
}

android {
  signingConfigs {
    create("release") {
      keyAlias = keystoreProperties["keyAlias"] as String
      keyPassword = keystoreProperties["keyPassword"] as String
      storeFile = file(keystoreProperties["storeFile"] as String)
      storePassword = keystoreProperties["storePassword"] as String
    }
  }
  buildTypes {
    release {
      signingConfig = signingConfigs.getByName("release")
      isMinifyEnabled = true
      isShrinkResources = true
    }
  }
}`} />

      <p>
        Depois de configurado, basta rodar <code>flutter build appbundle --release</code> e
        enviar o <code>.aab</code> resultante pela Play Console.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Commitou o keystore</strong> — qualquer um pode assinar updates falsas. Adicione ao <code>.gitignore</code> imediatamente.</li>
        <li><strong>applicationId duplicado</strong> — não pode coincidir com app já existente na Play.</li>
        <li><strong>versionCode não incrementado</strong> — a Play rejeita uploads com mesmo número.</li>
        <li><strong>minSdkVersion baixo demais</strong> — alguns plugins exigem 21+ ou 23+.</li>
        <li><strong>Esqueceu de habilitar R8/ProGuard</strong> — o app fica enorme e plugins podem quebrar sem regras de keep.</li>
      </ul>

      <AlertBox type="danger" title="Guarde o keystore como ouro">
        Se perder o <code>upload-keystore.jks</code>, não consegue mais publicar
        atualizações daquele app. A solução é usar <strong>Play App Signing</strong>:
        a Google guarda a chave final, e você só usa uma chave de upload (pode
        ser regenerada via suporte).
      </AlertBox>

      <AlertBox type="warning" title="Use AAB, não APK na Play">
        Desde agosto de 2021 a Play Store <strong>exige</strong> AAB para apps
        novos. APK ainda funciona para distribuição direta, sites próprios ou
        lojas alternativas (Amazon, Galaxy Store).
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Habilite <code>Play App Signing</code> ao subir pela primeira vez.</li>
          <li>Use <code>--obfuscate --split-debug-info=build/symbols</code> em release para dificultar engenharia reversa e ainda decifrar stack traces.</li>
          <li>Gere builds via CI (Codemagic, GitHub Actions, Bitrise) para evitar "funcionou na minha máquina".</li>
          <li>Teste o <code>.aab</code> com <code>bundletool</code> antes de subir.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com o AAB pronto, suba na <strong>Play Console</strong> em "Teste interno"
        primeiro. Avance para fechado, aberto e produção conforme valida.
      </p>
      <AlertBox type="success">
        Veja também: <em>Build iOS</em> e <em>Flutter DevTools</em> para
        diagnosticar antes de publicar.
      </AlertBox>
    </PageContainer>
  );
}
