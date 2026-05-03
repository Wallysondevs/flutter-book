import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Plugins() {
  return (
    <PageContainer
      title="Criar Plugins"
      subtitle="Empacote código nativo em pacotes reutilizáveis e publique no pub.dev."
      difficulty="avancado"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quando seu código de platform channel começa a crescer — vira mais que <em>"chamar uma função no nativo"</em> — espalhar isso pelo app vira bagunça. Pior: se outro app precisar do mesmo recurso, você copia e cola tudo de novo.
      </p>
      <p>
        Um <strong>plugin</strong> é o jeito oficial do Flutter de empacotar código Dart + Android + iOS (e opcionalmente web/desktop) num pacote único, com versionamento, documentação e testes próprios. É o que existe por trás de qualquer biblioteca do <a href="https://pub.dev">pub.dev</a> que conversa com o sistema.
      </p>

      <h2>O conceito: package vs plugin</h2>
      <ul>
        <li><strong>Package</strong>: só código Dart puro. Ex: <code>http</code>, <code>provider</code>, <code>intl</code>.</li>
        <li><strong>Plugin</strong>: package + implementações específicas por plataforma (Android, iOS, web, macOS, Windows, Linux). Ex: <code>shared_preferences</code>, <code>camera</code>, <code>geolocator</code>.</li>
      </ul>
      <p>
        Você cria um plugin quando precisa de <strong>código nativo</strong>. Se for só lógica Dart, faça um package — é mais simples e funciona em qualquer lugar.
      </p>

      <h2>Como Flutter faz</h2>
      <p>
        O CLI do Flutter gera o esqueleto inteiro. Você escolhe quais plataformas suportar e qual linguagem nativa usar.
      </p>

      <CodeBlock title="terminal" code={`# cria plugin para Android (Kotlin) + iOS (Swift)
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
# test/                   -> testes Dart`} />

      <p>
        A pasta <code>example/</code> é gold: ela é um app Flutter de verdade que importa seu plugin. Você desenvolve abrindo <code>example/lib/main.dart</code> e rodando <code>flutter run</code> dentro de <code>example/</code>. Hot reload funciona normalmente para o lado Dart.
      </p>

      <h2>Exemplo prático: API Dart limpa</h2>
      <p>
        O segredo de um plugin bom é a <strong>API Dart</strong>. O usuário não deve precisar saber que existe platform channel embaixo.
      </p>

      <CodeBlock title="lib/meu_plugin.dart" code={`import 'package:flutter/services.dart';

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
}`} />

      <p>
        Quem consome o plugin escreve só:
      </p>

      <CodeBlock title="uso" code={`final info = await MeuPlugin.info();
print('\${info.fabricante} \${info.modelo} (SDK \${info.versaoSdk})');`} />

      <h2>Federated plugins</h2>
      <p>
        Plugins modernos (e os oficiais do time Flutter) seguem a arquitetura <strong>federated</strong>: cada plataforma fica num pacote separado. Isso permite que mantenedores diferentes cuidem de plataformas diferentes.
      </p>
      <ul>
        <li><strong>app-facing</strong>: <code>meu_plugin</code> — o que o usuário importa.</li>
        <li><strong>platform interface</strong>: <code>meu_plugin_platform_interface</code> — define a API abstrata que cada plataforma implementa.</li>
        <li><strong>implementações</strong>: <code>meu_plugin_android</code>, <code>meu_plugin_ios</code>, <code>meu_plugin_web</code>, etc.</li>
      </ul>

      <AlertBox type="info" title="Quando vale a pena">
        Para plugin pessoal/empresa, comece <strong>monolítico</strong> — é muito mais simples. Federated faz sentido quando o plugin vira popular, várias plataformas precisam evoluir independente, ou um terceiro quer adicionar Windows/Linux sem mexer no seu repo.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer de declarar a plataforma no <code>pubspec.yaml</code></strong>: a seção <code>flutter.plugin.platforms</code> precisa listar Android, iOS, etc., com a classe registradora.</li>
        <li><strong>Mudou Kotlin/Swift e nada acontece</strong>: hot reload <em>não</em> recarrega nativo. Pare e dê <code>flutter run</code> de novo dentro de <code>example/</code>.</li>
        <li><strong>Tipo de retorno errado entre plataformas</strong>: Android devolve <code>Long</code>, iOS devolve <code>Int</code>. Padronize convertendo no nativo antes de mandar para o Dart.</li>
        <li><strong>Esqueceu o <code>example/</code></strong>: pub.dev penaliza plugins sem exemplo funcional.</li>
        <li><strong>Sem testes</strong>: <code>test/</code> com pelo menos uns testes mockando <code>MethodChannel</code> aumenta sua nota no pub.dev e evita regressões.</li>
      </ul>

      <AlertBox type="warning" title="Versionamento das plataformas">
        Cada plugin declara <code>minSdkVersion</code> (Android) e <code>iOS deployment target</code>. Se você usar APIs novas demais, apps antigos não vão mais conseguir usar seu plugin.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Use pigeon para gerar a ponte">
        O pacote <code>pigeon</code> gera o código Dart + Kotlin + Swift a partir de um arquivo de definição. Você escreve a interface uma vez, ele garante tipos consistentes em todo lado. Esquece toda a serialização manual.
      </AlertBox>
      <ul>
        <li>API Dart pequena, com <code>Future</code> e classes tipadas — não exponha <code>Map&lt;String, dynamic&gt;</code>.</li>
        <li>Documente cada método público com <code>///</code> (vira documentação no pub.dev).</li>
        <li><code>README.md</code> com instalação, exemplo curto, screenshots/gif. <code>CHANGELOG.md</code> a cada release.</li>
        <li>Nunca esconda erros nativos — repropague como <code>PlatformException</code> com <code>code</code> claro.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Quando o plugin precisa chamar uma biblioteca C/C++/Rust (criptografia, processamento de imagem, áudio), em vez de envelopar em Kotlin/Swift você pode atalhar: <strong>Dart FFI</strong> chama a lib direto, sem platform channel.
      </p>
      <AlertBox type="success" title="Continue para Dart FFI">
        Próxima página: como interfacear com bibliotecas nativas C/C++ direto do Dart, com overhead mínimo.
      </AlertBox>
    </PageContainer>
  );
}
