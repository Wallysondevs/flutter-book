import{j as e}from"./index-D9yRYXwO.js";import{P as o,C as a,A as i}from"./AlertBox-B2Rl5ETq.js";function s(){return e.jsxs(o,{title:"Criar Plugins",subtitle:"Empacote código nativo em pacotes reutilizáveis e publique no pub.dev.",difficulty:"avancado",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quando seu código de platform channel começa a crescer — vira mais que ",e.jsx("em",{children:'"chamar uma função no nativo"'})," — espalhar isso pelo app vira bagunça. Pior: se outro app precisar do mesmo recurso, você copia e cola tudo de novo."]}),e.jsxs("p",{children:["Um ",e.jsx("strong",{children:"plugin"})," é o jeito oficial do Flutter de empacotar código Dart + Android + iOS (e opcionalmente web/desktop) num pacote único, com versionamento, documentação e testes próprios. É o que existe por trás de qualquer biblioteca do ",e.jsx("a",{href:"https://pub.dev",children:"pub.dev"})," que conversa com o sistema."]}),e.jsx("h2",{children:"O conceito: package vs plugin"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Package"}),": só código Dart puro. Ex: ",e.jsx("code",{children:"http"}),", ",e.jsx("code",{children:"provider"}),", ",e.jsx("code",{children:"intl"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Plugin"}),": package + implementações específicas por plataforma (Android, iOS, web, macOS, Windows, Linux). Ex: ",e.jsx("code",{children:"shared_preferences"}),", ",e.jsx("code",{children:"camera"}),", ",e.jsx("code",{children:"geolocator"}),"."]})]}),e.jsxs("p",{children:["Você cria um plugin quando precisa de ",e.jsx("strong",{children:"código nativo"}),". Se for só lógica Dart, faça um package — é mais simples e funciona em qualquer lugar."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx("p",{children:"O CLI do Flutter gera o esqueleto inteiro. Você escolhe quais plataformas suportar e qual linguagem nativa usar."}),e.jsx(a,{title:"terminal",code:`# cria plugin para Android (Kotlin) + iOS (Swift)
flutter create \\
  --template=plugin \\
  --platforms=android,ios \\
  --org=com.minhaempresa \\
  --android-language=kotlin \\
  --ios-language=swift \\
  meu_plugin

cd meu_plugin
# estrutura criada:
# lib/                    -> API pública em Dart
# android/                -> implementação Kotlin
# ios/                    -> implementação Swift
# example/                -> app Flutter completo que usa o plugin
# test/                   -> testes Dart`}),e.jsxs("p",{children:["A pasta ",e.jsx("code",{children:"example/"})," é gold: ela é um app Flutter de verdade que importa seu plugin. Você desenvolve abrindo ",e.jsx("code",{children:"example/lib/main.dart"})," e rodando ",e.jsx("code",{children:"flutter run"})," dentro de ",e.jsx("code",{children:"example/"}),". Hot reload funciona normalmente para o lado Dart."]}),e.jsx("h2",{children:"Exemplo prático: API Dart limpa"}),e.jsxs("p",{children:["O segredo de um plugin bom é a ",e.jsx("strong",{children:"API Dart"}),". O usuário não deve precisar saber que existe platform channel embaixo."]}),e.jsx(a,{title:"lib/meu_plugin.dart",code:`import 'package:flutter/services.dart';

class InfoDispositivo {
  final String fabricante;
  final String modelo;
  final int versaoSdk;

  InfoDispositivo({
    required this.fabricante,
    required this.modelo,
    required this.versaoSdk,
  });

  factory InfoDispositivo.fromMap(Map<String, dynamic> m) {
    return InfoDispositivo(
      fabricante: m['fabricante'] as String,
      modelo: m['modelo'] as String,
      versaoSdk: m['versaoSdk'] as int,
    );
  }
}

class MeuPlugin {
  static const _canal = MethodChannel('com.minhaempresa/meu_plugin');

  /// Retorna informações básicas do dispositivo.
  static Future<InfoDispositivo> info() async {
    final raw = await _canal.invokeMethod<Map<dynamic, dynamic>>('info');
    if (raw == null) {
      throw StateError('Resposta vazia do nativo');
    }
    return InfoDispositivo.fromMap(Map<String, dynamic>.from(raw));
  }
}`}),e.jsx("p",{children:"Quem consome o plugin escreve só:"}),e.jsx(a,{title:"uso",code:"final info = await MeuPlugin.info();\nprint('${info.fabricante} ${info.modelo} (SDK ${info.versaoSdk})');"}),e.jsx("h2",{children:"Federated plugins"}),e.jsxs("p",{children:["Plugins modernos (e os oficiais do time Flutter) seguem a arquitetura ",e.jsx("strong",{children:"federated"}),": cada plataforma fica num pacote separado. Isso permite que mantenedores diferentes cuidem de plataformas diferentes."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"app-facing"}),": ",e.jsx("code",{children:"meu_plugin"})," — o que o usuário importa."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"platform interface"}),": ",e.jsx("code",{children:"meu_plugin_platform_interface"})," — define a API abstrata que cada plataforma implementa."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"implementações"}),": ",e.jsx("code",{children:"meu_plugin_android"}),", ",e.jsx("code",{children:"meu_plugin_ios"}),", ",e.jsx("code",{children:"meu_plugin_web"}),", etc."]})]}),e.jsxs(i,{type:"info",title:"Quando vale a pena",children:["Para plugin pessoal/empresa, comece ",e.jsx("strong",{children:"monolítico"})," — é muito mais simples. Federated faz sentido quando o plugin vira popular, várias plataformas precisam evoluir independente, ou um terceiro quer adicionar Windows/Linux sem mexer no seu repo."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer de declarar a plataforma no ",e.jsx("code",{children:"pubspec.yaml"})]}),": a seção ",e.jsx("code",{children:"flutter.plugin.platforms"})," precisa listar Android, iOS, etc., com a classe registradora."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mudou Kotlin/Swift e nada acontece"}),": hot reload ",e.jsx("em",{children:"não"})," recarrega nativo. Pare e dê ",e.jsx("code",{children:"flutter run"})," de novo dentro de ",e.jsx("code",{children:"example/"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tipo de retorno errado entre plataformas"}),": Android devolve ",e.jsx("code",{children:"Long"}),", iOS devolve ",e.jsx("code",{children:"Int"}),". Padronize convertendo no nativo antes de mandar para o Dart."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esqueceu o ",e.jsx("code",{children:"example/"})]}),": pub.dev penaliza plugins sem exemplo funcional."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sem testes"}),": ",e.jsx("code",{children:"test/"})," com pelo menos uns testes mockando ",e.jsx("code",{children:"MethodChannel"})," aumenta sua nota no pub.dev e evita regressões."]})]}),e.jsxs(i,{type:"warning",title:"Versionamento das plataformas",children:["Cada plugin declara ",e.jsx("code",{children:"minSdkVersion"})," (Android) e ",e.jsx("code",{children:"iOS deployment target"}),". Se você usar APIs novas demais, apps antigos não vão mais conseguir usar seu plugin."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(i,{type:"tip",title:"Use pigeon para gerar a ponte",children:["O pacote ",e.jsx("code",{children:"pigeon"})," gera o código Dart + Kotlin + Swift a partir de um arquivo de definição. Você escreve a interface uma vez, ele garante tipos consistentes em todo lado. Esquece toda a serialização manual."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["API Dart pequena, com ",e.jsx("code",{children:"Future"})," e classes tipadas — não exponha ",e.jsx("code",{children:"Map<String, dynamic>"}),"."]}),e.jsxs("li",{children:["Documente cada método público com ",e.jsx("code",{children:"///"})," (vira documentação no pub.dev)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"README.md"})," com instalação, exemplo curto, screenshots/gif. ",e.jsx("code",{children:"CHANGELOG.md"})," a cada release."]}),e.jsxs("li",{children:["Nunca esconda erros nativos — repropague como ",e.jsx("code",{children:"PlatformException"})," com ",e.jsx("code",{children:"code"})," claro."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Quando o plugin precisa chamar uma biblioteca C/C++/Rust (criptografia, processamento de imagem, áudio), em vez de envelopar em Kotlin/Swift você pode atalhar: ",e.jsx("strong",{children:"Dart FFI"})," chama a lib direto, sem platform channel."]}),e.jsx(i,{type:"success",title:"Continue para Dart FFI",children:"Próxima página: como interfacear com bibliotecas nativas C/C++ direto do Dart, com overhead mínimo."})]})}export{s as default};
