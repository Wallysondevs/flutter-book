import{j as e}from"./index-D9yRYXwO.js";import{P as a,A as n,C as r}from"./AlertBox-B2Rl5ETq.js";function o(){return e.jsxs(a,{title:"Platform Channels",subtitle:"Como chamar código Kotlin/Swift do Dart quando não existe plugin pronto.",difficulty:"avancado",timeToRead:"15 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['O Dart roda numa "ilha": ele não enxerga, sozinho, APIs específicas de Android (Kotlin/Java) ou iOS (Swift/Objective-C). Mas e se você precisa ler o nível da bateria, integrar com um SDK do banco em Java, ou usar uma API de câmera customizada que ainda não tem plugin? É aí que entram os ',e.jsx("strong",{children:"Platform Channels"}),': uma "ponte" oficial entre Dart e o código nativo.']}),e.jsxs("p",{children:["Antes de seguir, uma verdade dura: ",e.jsx("strong",{children:"quase tudo já tem plugin"})," no ",e.jsx("a",{href:"https://pub.dev",children:"pub.dev"}),". Só escreva platform channel quando realmente não houver alternativa."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Pense numa ",e.jsx("strong",{children:"linha telefônica"})," identificada por nome (ex: ",e.jsx("code",{children:"com.minhaempresa/bateria"}),"). Os dois lados têm o mesmo número, e trocam mensagens assíncronas:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Dart"})," abre um ",e.jsx("code",{children:"MethodChannel"})," com esse nome."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Nativo"})," (Android/iOS) abre o ",e.jsx("em",{children:"mesmo"})," nome e registra um handler."]}),e.jsxs("li",{children:["Dart chama ",e.jsx("code",{children:"invokeMethod('nome', args)"}),"; nativo recebe e responde com ",e.jsx("code",{children:"result.success(...)"}),", ",e.jsx("code",{children:"result.error(...)"})," ou ",e.jsx("code",{children:"result.notImplemented()"}),"."]})]}),e.jsxs("p",{children:['Os tipos suportados na "ponte" são limitados (a tabela do ',e.jsx("code",{children:"StandardMessageCodec"}),"): ",e.jsx("code",{children:"null"}),", ",e.jsx("code",{children:"bool"}),", ",e.jsx("code",{children:"int"}),", ",e.jsx("code",{children:"double"}),", ",e.jsx("code",{children:"String"}),", ",e.jsx("code",{children:"Uint8List"}),"/",e.jsx("code",{children:"Int32List"}),", ",e.jsx("code",{children:"List"}),", ",e.jsx("code",{children:"Map"}),". Nada de classes customizadas — você as serializa em Map."]}),e.jsxs(n,{type:"info",title:"Três tipos de canal",children:[e.jsx("code",{children:"MethodChannel"})," (chamada → resposta única), ",e.jsx("code",{children:"EventChannel"})," (stream de eventos vindos do nativo, como sensores), e ",e.jsx("code",{children:"BasicMessageChannel"})," (mensagens livres em ambas direções)."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsxs("p",{children:["Lado Dart: declare o canal e chame um método. Sempre ",e.jsx("code",{children:"async"})," — o nativo responde quando puder."]}),e.jsx(r,{title:"lib/bateria.dart",code:`import 'package:flutter/services.dart';

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
}`}),e.jsxs("p",{children:["Lado Android (Kotlin): registre o handler dentro de ",e.jsx("code",{children:"MainActivity.configureFlutterEngine"}),"."]}),e.jsx(r,{title:"android/app/.../MainActivity.kt",code:`package com.minhaempresa.app

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
}`}),e.jsxs("p",{children:["Lado iOS (Swift): mesma ideia, dentro de ",e.jsx("code",{children:"AppDelegate"}),"."]}),e.jsx(r,{title:"ios/Runner/AppDelegate.swift",code:`import UIKit
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
}`}),e.jsx("h2",{children:"Exemplo prático: stream de eventos com EventChannel"}),e.jsxs("p",{children:["Quando o nativo precisa ",e.jsx("em",{children:"empurrar"})," dados continuamente — sensor de orientação, eventos de Bluetooth — use ",e.jsx("code",{children:"EventChannel"}),". No Dart, vira um ",e.jsx("code",{children:"Stream"}),"."]}),e.jsx(r,{title:"dart: ouvindo um stream nativo",code:`const _eventos = EventChannel('com.minhaempresa/bateria/eventos');

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
)`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Nome do canal divergente"}),": um caractere diferente entre Dart e nativo, e a chamada some. Centralize a string em uma constante."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer um lado"}),": implementou só Android — no iOS dá ",e.jsx("code",{children:"MissingPluginException"}),". Sempre trate."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Bloquear a UI thread nativa"}),": handlers no Android rodam na main thread por padrão. Operações pesadas precisam de coroutine/Thread separada."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tipos não suportados"}),": passar um objeto Kotlin custom direto para Dart explode. Converta para ",e.jsx("code",{children:"Map<String, Any>"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Hot reload não recarrega o nativo"}),": alterou Kotlin/Swift? Pare e rode ",e.jsx("code",{children:"flutter run"})," de novo (full restart)."]})]}),e.jsxs(n,{type:"warning",title:"Performance: latência da ponte",children:["Cada chamada cruza a fronteira Dart↔nativo (alguns milissegundos). Não chame em loop a 60 fps. Se precisar de stream rápido, use ",e.jsx("code",{children:"EventChannel"})," ou, melhor ainda, ",e.jsx("code",{children:"FFI"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(n,{type:"tip",title:"Empacote como plugin",children:"Se o código nativo é reutilizável, transforme em plugin (próximo capítulo). Você deixa a API limpa, separa responsabilidades e pode publicar no pub.dev."}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Sempre trate ",e.jsx("code",{children:"PlatformException"})," e ",e.jsx("code",{children:"MissingPluginException"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"pigeon"})," para gerar código tipado dos dois lados — elimina os erros de string."]}),e.jsx("li",{children:"Documente o contrato: nome do canal, métodos, tipos de argumento e retorno, códigos de erro."})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsx("p",{children:"Agora que você sabe falar com o nativo, dá pra empacotar isso num formato reutilizável e até publicar pro mundo."}),e.jsx(n,{type:"success",title:"Continue para Plugins",children:"Próxima página: estrutura de um plugin Flutter, federated plugins e como publicar no pub.dev."})]})}export{o as default};
