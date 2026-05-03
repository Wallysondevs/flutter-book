import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function BuildIos() {
  return (
    <PageContainer
      title="Build iOS"
      subtitle="Compile, assine e envie seu app à App Store via Xcode."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        A Apple controla rigidamente o que entra no iPhone. Para distribuir um
        app você precisa de uma <strong>conta de desenvolvedor</strong> (US$ 99/ano),
        certificados, perfis de provisionamento e aprovação manual. O Flutter
        cuida do build em si, mas a parte burocrática é via Xcode + App Store
        Connect.
      </p>

      <h2>O conceito</h2>
      <p>
        O fluxo iOS tem três peças que confundem iniciantes:
      </p>
      <ul>
        <li><strong>Bundle ID</strong> — identificador único (ex: <code>com.suaempresa.app</code>). Não muda depois de publicado.</li>
        <li><strong>Certificate</strong> — sua identidade na Apple. Tem dois tipos: Development e Distribution.</li>
        <li><strong>Provisioning Profile</strong> — combina Bundle ID + certificado + dispositivos autorizados.</li>
      </ul>
      <p>
        Desde Xcode 9 dá para deixar a Apple gerenciar tudo isso automaticamente
        marcando <em>Automatically manage signing</em>. Use isso até dominar.
      </p>

      <h2>Como o Flutter faz</h2>
      <p>
        O comando <code>flutter build ios</code> só prepara o projeto Xcode em
        modo release. O <em>archive</em> (gerar o <code>.ipa</code>) e o upload
        são feitos pelo Xcode.
      </p>

      <CodeBlock title="comandos básicos" code={`# Compila em modo release
flutter build ios --release

# Atualiza dependências CocoaPods
cd ios && pod install && cd ..

# Abre no Xcode (use .xcworkspace, NUNCA .xcodeproj)
open ios/Runner.xcworkspace`} />

      <h2>Exemplo prático: do zero ao TestFlight</h2>
      <ol>
        <li>Crie o app em <strong>App Store Connect</strong> (appstoreconnect.apple.com) com um Bundle ID novo.</li>
        <li>No Xcode, abra <code>Runner.xcworkspace</code>, selecione o target Runner → aba Signing &amp; Capabilities.</li>
        <li>Marque <em>Automatically manage signing</em>, escolha seu Team e cole o Bundle ID.</li>
        <li>Em <code>ios/Flutter/Release.xcconfig</code>, garanta que a versão bate com <code>pubspec.yaml</code> (<code>version: 1.0.0+1</code>).</li>
        <li>No menu superior, escolha <strong>Any iOS Device (arm64)</strong>.</li>
        <li>Menu <strong>Product → Archive</strong>. Aguarde (5-15 min na primeira vez).</li>
        <li>No Organizer que abrir, clique <strong>Distribute App → App Store Connect → Upload</strong>.</li>
      </ol>

      <CodeBlock title="ios/Runner/Info.plist (permissões comuns)" code={`<key>NSCameraUsageDescription</key>
<string>Precisamos da câmera para tirar a foto de perfil.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Para escolher imagens da galeria.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Mostrar lojas próximas a você.</string>`} />

      <p>
        Depois do upload, o app aparece em TestFlight em 5-30 min. Convide
        testadores e quando estiver maduro, submeta para review (1-3 dias).
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Abriu .xcodeproj em vez de .xcworkspace</strong> — pods não carregam, build quebra.</li>
        <li><strong>Esqueceu de descrever permissão no Info.plist</strong> — review rejeita imediatamente.</li>
        <li><strong>Bundle ID inválido</strong> — não pode ter underscores, espaços nem maiúsculas estranhas.</li>
        <li><strong>versão menor do que a anterior</strong> — App Store Connect rejeita upload.</li>
        <li><strong>Esqueceu do ícone 1024×1024</strong> — sem ele, não dá para enviar.</li>
        <li><strong>Pod install falha após upgrade do macOS/Xcode</strong> — rode <code>pod repo update</code> ou apague <code>Podfile.lock</code>.</li>
      </ul>

      <AlertBox type="warning" title="Precisa de Mac (oficialmente)">
        Build iOS exige macOS + Xcode. Sem Mac, alternativas: <strong>Codemagic</strong>, <strong>Bitrise</strong> ou <strong>GitHub Actions</strong> com runners macOS. Custa créditos por minuto, mas funciona.
      </AlertBox>

      <AlertBox type="danger" title="Apple Developer Program é obrigatório">
        Sem a conta paga (US$ 99/ano) você só consegue rodar no <em>seu</em> iPhone via cabo, com expiração de 7 dias. TestFlight e App Store exigem a assinatura ativa.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use <code>fastlane</code> para automatizar archive + upload + changelog.</li>
          <li>Habilite <strong>App Store Connect API Key</strong> e configure no CI para fazer upload sem senha.</li>
          <li>Compile com <code>--obfuscate --split-debug-info=build/symbols/ios</code> para apps comerciais.</li>
          <li>Teste em iPhone antigo (SE 1ª/2ª geração) — é o pior caso de performance.</li>
          <li>Mantenha <code>ios/Podfile</code> com <code>platform :ios, '13.0'</code> (ou superior, conforme plugins exigirem).</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com TestFlight rodando, leia a Apple <em>App Store Review Guidelines</em> antes
        de submeter para produção. As rejeições mais comuns são privacidade,
        IAP (compras) usadas fora das regras e screenshots inadequados.
      </p>
      <AlertBox type="success">
        Próximos capítulos: <em>Build Android</em>, <em>Firebase</em>, <em>DevTools</em> para debugar antes do envio.
      </AlertBox>
    </PageContainer>
  );
}
