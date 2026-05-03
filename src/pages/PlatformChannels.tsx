import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function PlatformChannels() {
    return (
      <PageContainer title="Platform Channels" subtitle="Como chamar código Kotlin/Swift do Dart." difficulty="avancado" timeToRead="12 min">
        <CodeBlock title="dart" code="const platform = MethodChannel('com.exemplo/bateria');\n\nFuture<int> nivelBateria() async {\n  final n = await platform.invokeMethod<int>('getBatteryLevel');\n  return n ?? 0;\n}" />
      <CodeBlock title="kotlin" code="// MainActivity.kt\nMethodChannel(flutterEngine!!.dartExecutor.binaryMessenger, \"com.exemplo/bateria\")\n  .setMethodCallHandler { call, result ->\n    when (call.method) {\n      \"getBatteryLevel\" -> result.success(85)\n      else -> result.notImplemented()\n    }\n  }" />
      <AlertBox type="info" title="Antes disso, procure um plugin">Quase tudo já tem plugin no pub.dev. Só escreva platform channel quando não houver alternativa.</AlertBox>
      </PageContainer>
    );
  }
  