import{j as e}from"./index-D4AOhXGO.js";import{P as r,C as a,A as s}from"./AlertBox-Dyf2wdSA.js";function d(){return e.jsxs(r,{title:"Build Android",subtitle:"Gerar APK e AAB assinados, prontos para a Play Store.",difficulty:"intermediario",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Programar o app é só metade do trabalho. Para usuários reais instalarem, você precisa de um ",e.jsx("strong",{children:"artefato assinado"}),": um APK (instalação direta) ou um AAB (Android App Bundle, exigido pela Play Store). Sem assinatura digital, o Android e a Play Store rejeitam."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:['O Android exige que todo aplicativo seja assinado com uma chave criptográfica. Essa chave funciona como sua "identidade": atualizações futuras só são aceitas se assinadas com a ',e.jsx("em",{children:"mesma"})," chave da primeira publicação. Perdeu a chave? Perdeu o controle do app na Play."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Debug"})," — chave automática gerada pelo Flutter; só serve para testes locais."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Release"})," — sua chave de produção, guardada em segredo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"APK"})," — pacote único, bom para testes e distribuição direta."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"AAB"})," — bundle que a Play recompila por device (menor download)."]})]}),e.jsx("h2",{children:"Como o Flutter faz"}),e.jsxs("p",{children:["Os comandos abaixo geram o artefato em ",e.jsx("code",{children:"build/app/outputs/"}),". Sem configuração extra, ele vai sair assinado com a chave debug — útil só para você instalar no seu celular via cabo."]}),e.jsx(a,{title:"comandos básicos",code:`# APK único (debug — só pra você testar)
flutter build apk --debug

# APK release (precisa de chave de produção configurada)
flutter build apk --release

# AAB para a Play Store
flutter build appbundle --release

# APKs separados por arquitetura (menor)
flutter build apk --split-per-abi --release`}),e.jsx("h2",{children:"Exemplo prático: gerar e configurar a chave de release"}),e.jsxs("p",{children:["Crie uma chave (",e.jsx("code",{children:"keystore"}),") uma única vez e guarde em local seguro (cofre, gerenciador de senhas). O comando ",e.jsx("code",{children:"keytool"})," vem com o JDK."]}),e.jsx(a,{title:"1) gerar keystore",code:`keytool -genkey -v -keystore ~/upload-keystore.jks \\
  -keyalg RSA -keysize 2048 -validity 10000 -alias upload`}),e.jsx(a,{title:"2) android/key.properties (NÃO commitar)",code:`storePassword=SUA_SENHA
keyPassword=SUA_SENHA
keyAlias=upload
storeFile=/Users/voce/upload-keystore.jks`}),e.jsx(a,{title:"3) android/app/build.gradle.kts",code:`val keystoreProperties = Properties()
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
}`}),e.jsxs("p",{children:["Depois de configurado, basta rodar ",e.jsx("code",{children:"flutter build appbundle --release"})," e enviar o ",e.jsx("code",{children:".aab"})," resultante pela Play Console."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Commitou o keystore"})," — qualquer um pode assinar updates falsas. Adicione ao ",e.jsx("code",{children:".gitignore"})," imediatamente."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"applicationId duplicado"})," — não pode coincidir com app já existente na Play."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"versionCode não incrementado"})," — a Play rejeita uploads com mesmo número."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"minSdkVersion baixo demais"})," — alguns plugins exigem 21+ ou 23+."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esqueceu de habilitar R8/ProGuard"})," — o app fica enorme e plugins podem quebrar sem regras de keep."]})]}),e.jsxs(s,{type:"danger",title:"Guarde o keystore como ouro",children:["Se perder o ",e.jsx("code",{children:"upload-keystore.jks"}),", não consegue mais publicar atualizações daquele app. A solução é usar ",e.jsx("strong",{children:"Play App Signing"}),": a Google guarda a chave final, e você só usa uma chave de upload (pode ser regenerada via suporte)."]}),e.jsxs(s,{type:"warning",title:"Use AAB, não APK na Play",children:["Desde agosto de 2021 a Play Store ",e.jsx("strong",{children:"exige"})," AAB para apps novos. APK ainda funciona para distribuição direta, sites próprios ou lojas alternativas (Amazon, Galaxy Store)."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(s,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Habilite ",e.jsx("code",{children:"Play App Signing"})," ao subir pela primeira vez."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"--obfuscate --split-debug-info=build/symbols"})," em release para dificultar engenharia reversa e ainda decifrar stack traces."]}),e.jsx("li",{children:'Gere builds via CI (Codemagic, GitHub Actions, Bitrise) para evitar "funcionou na minha máquina".'}),e.jsxs("li",{children:["Teste o ",e.jsx("code",{children:".aab"})," com ",e.jsx("code",{children:"bundletool"})," antes de subir."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com o AAB pronto, suba na ",e.jsx("strong",{children:"Play Console"}),' em "Teste interno" primeiro. Avance para fechado, aberto e produção conforme valida.']}),e.jsxs(s,{type:"success",children:["Veja também: ",e.jsx("em",{children:"Build iOS"})," e ",e.jsx("em",{children:"Flutter DevTools"})," para diagnosticar antes de publicar."]})]})}export{d as default};
