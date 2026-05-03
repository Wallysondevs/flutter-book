import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PlatformChannels() {
  return (
    <PageContainer
      title="Platform Channels"
      subtitle="Como chamar código Kotlin/Swift do Dart quando não existe plugin pronto."
      difficulty="avancado"
      timeToRead="15 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        O Dart roda numa "ilha": ele não enxerga, sozinho, APIs específicas de Android (Kotlin/Java) ou iOS (Swift/Objective-C). Mas e se você precisa ler o nível da bateria, integrar com um SDK do banco em Java, ou usar uma API de câmera customizada que ainda não tem plugin? É aí que entram os <strong>Platform Channels</strong>: uma "ponte" oficial entre Dart e o código nativo.
      </p>
      <p>
        Antes de seguir, uma verdade dura: <strong>quase tudo já tem plugin</strong> no <a href="https://pub.dev">pub.dev</a>. Só escreva platform channel quando realmente não houver alternativa.
      </p>

      <h2>O conceito</h2>
      <p>
        Pense numa <strong>linha telefônica</strong> identificada por nome (ex: <code>com.minhaempresa/bateria</code>). Os dois lados têm o mesmo número, e trocam mensagens assíncronas:
      </p>
      <ul>
        <li><strong>Dart</strong> abre um <code>MethodChannel</code> com esse nome.</li>
        <li><strong>Nativo</strong> (Android/iOS) abre o <em>mesmo</em> nome e registra um handler.</li>
        <li>Dart chama <code>invokeMethod('nome', args)</code>; nativo recebe e responde com <code>result.success(...)</code>, <code>result.error(...)</code> ou <code>result.notImplemented()</code>.</li>
      </ul>
      <p>
        Os tipos suportados na "ponte" são limitados (a tabela do <code>StandardMessageCodec</code>): <code>null</code>, <code>bool</code>, <code>int</code>, <code>double</code>, <code>String</code>, <code>Uint8List</code>/<code>Int32List</code>, <code>List</code>, <code>Map</code>. Nada de classes customizadas — você as serializa em Map.
      </p>

      <AlertBox type="info" title="Três tipos de canal">
        <code>MethodChannel</code> (chamada → resposta única), <code>EventChannel</code> (stream de eventos vindos do nativo, como sensores), e <code>BasicMessageChannel</code> (mensagens livres em ambas direções).
      </AlertBox>

      <h2>Como Flutter faz</h2>
      <p>
        Lado Dart: declare o canal e chame um método. Sempre <code>async</code> — o nativo responde quando puder.
      </p>

      <CodeBlock title="lib/bateria.dart" code={`import 'package:flutter/services.dart';

// nome do canal — convenção: domínio invertido + identificador
const _canal = MethodChannel('com.minhaempresa/bateria');

Future<int> nivelBateria() async {
  try {
    // invokeMethod retorna dynamic; tipamos com generic
    final nivel = await _canal.invokeMethod<int>('getBatteryLevel');
    return nivel ?? -1;
  } on PlatformException catch (e) {
    // erro vindo do lado nativo — code, message, details
    print('Falha ao ler bateria: \${e.message}');
    return -1;
  } on MissingPluginException {
    // o nativo nunca respondeu / método não registrado
    return -1;
  }
}`} />

      <p>
        Lado Android (Kotlin): registre o handler dentro de <code>MainActivity.configureFlutterEngine</code>.
      </p>

      <CodeBlock title="android/app/.../MainActivity.kt" code={`package com.minhaempresa.app

import android.content.Context
import android.os.BatteryManager
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity() {
  private val CANAL = "com.minhaempresa/bateria"

  override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
    super.configureFlutterEngine(flutterEngine)

    MethodChannel(
      flutterEngine.dartExecutor.binaryMessenger, CANAL
    ).setMethodCallHandler { call, result ->
      when (call.method) {
        "getBatteryLevel" -> {
          val nivel = lerBateria()
          if (nivel != -1) result.success(nivel)
          else result.error("INDISPONIVEL", "Bateria não lida", null)
        }
        else -> result.notImplemented()
      }
    }
  }

  private fun lerBateria(): Int {
    val bm = getSystemService(Context.BATTERY_SERVICE) as BatteryManager
    return bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
  }
}`} />

      <p>
        Lado iOS (Swift): mesma ideia, dentro de <code>AppDelegate</code>.
      </p>

      <CodeBlock title="ios/Runner/AppDelegate.swift" code={`import UIKit
import Flutter

@main
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions:
      [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    let controller = window?.rootViewController as! FlutterViewController
    let canal = FlutterMethodChannel(
      name: "com.minhaempresa/bateria",
      binaryMessenger: controller.binaryMessenger)

    canal.setMethodCallHandler { (call, result) in
      guard call.method == "getBatteryLevel" else {
        result(FlutterMethodNotImplemented); return
      }
      UIDevice.current.isBatteryMonitoringEnabled = true
      let nivel = Int(UIDevice.current.batteryLevel * 100)
      if nivel >= 0 { result(nivel) }
      else { result(FlutterError(
        code: "INDISPONIVEL", message: "Sem leitura", details: nil)) }
    }

    GeneratedPluginRegistrant.register(with: self)
    return super.application(application,
      didFinishLaunchingWithOptions: launchOptions)
  }
}`} />

      <h2>Exemplo prático: stream de eventos com EventChannel</h2>
      <p>
        Quando o nativo precisa <em>empurrar</em> dados continuamente — sensor de orientação, eventos de Bluetooth — use <code>EventChannel</code>. No Dart, vira um <code>Stream</code>.
      </p>

      <CodeBlock title="dart: ouvindo um stream nativo" code={`const _eventos = EventChannel('com.minhaempresa/bateria/eventos');

Stream<int> nivelBateriaStream() {
  return _eventos
      .receiveBroadcastStream()
      .map((dynamic e) => e as int);
}

// uso na UI
StreamBuilder<int>(
  stream: nivelBateriaStream(),
  builder: (context, snap) {
    if (!snap.hasData) return const CircularProgressIndicator();
    return Text('Bateria: \${snap.data}%');
  },
)`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Nome do canal divergente</strong>: um caractere diferente entre Dart e nativo, e a chamada some. Centralize a string em uma constante.</li>
        <li><strong>Esquecer um lado</strong>: implementou só Android — no iOS dá <code>MissingPluginException</code>. Sempre trate.</li>
        <li><strong>Bloquear a UI thread nativa</strong>: handlers no Android rodam na main thread por padrão. Operações pesadas precisam de coroutine/Thread separada.</li>
        <li><strong>Tipos não suportados</strong>: passar um objeto Kotlin custom direto para Dart explode. Converta para <code>Map&lt;String, Any&gt;</code>.</li>
        <li><strong>Hot reload não recarrega o nativo</strong>: alterou Kotlin/Swift? Pare e rode <code>flutter run</code> de novo (full restart).</li>
      </ul>

      <AlertBox type="warning" title="Performance: latência da ponte">
        Cada chamada cruza a fronteira Dart↔nativo (alguns milissegundos). Não chame em loop a 60 fps. Se precisar de stream rápido, use <code>EventChannel</code> ou, melhor ainda, <code>FFI</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Empacote como plugin">
        Se o código nativo é reutilizável, transforme em plugin (próximo capítulo). Você deixa a API limpa, separa responsabilidades e pode publicar no pub.dev.
      </AlertBox>
      <ul>
        <li>Sempre trate <code>PlatformException</code> e <code>MissingPluginException</code>.</li>
        <li>Use <code>pigeon</code> para gerar código tipado dos dois lados — elimina os erros de string.</li>
        <li>Documente o contrato: nome do canal, métodos, tipos de argumento e retorno, códigos de erro.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Agora que você sabe falar com o nativo, dá pra empacotar isso num formato reutilizável e até publicar pro mundo.
      </p>
      <AlertBox type="success" title="Continue para Plugins">
        Próxima página: estrutura de um plugin Flutter, federated plugins e como publicar no pub.dev.
      </AlertBox>
    </PageContainer>
  );
}
