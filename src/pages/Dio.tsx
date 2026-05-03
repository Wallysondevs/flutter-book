import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Dio() {
    return (
      <PageContainer title="Dio" subtitle="Cliente HTTP avançado — interceptors, retry, cancel, upload." difficulty="intermediario" timeToRead="8 min">
        <h2>Setup</h2>
      <CodeBlock title="pubspec" code="dependencies:\n  dio: ^5.4.0" />
      <CodeBlock title="cliente" code="final dio = Dio(BaseOptions(\n  baseUrl: 'https://api.exemplo.com',\n  connectTimeout: const Duration(seconds: 10),\n  headers: {'Content-Type': 'application/json'},\n));\n\nfinal r = await dio.get<Map<String, dynamic>>('/usuarios/1');\nprint(r.data);" />
      <h2>Interceptor de auth</h2>
      <CodeBlock title="interc" code="dio.interceptors.add(\n  InterceptorsWrapper(\n    onRequest: (opt, handler) {\n      opt.headers['Authorization'] = 'Bearer $token';\n      handler.next(opt);\n    },\n    onError: (e, handler) async {\n      if (e.response?.statusCode == 401) await renovarToken();\n      handler.next(e);\n    },\n  ),\n);" />
      <AlertBox type="success" title="Padrão em apps reais">Praticamente todo app Flutter de produção usa Dio em vez do http puro.</AlertBox>
      </PageContainer>
    );
  }
  