import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function BuildWeb() {
  return (
    <PageContainer
      title="Build Web"
      subtitle="Compile o app Flutter para HTML+JS e publique em qualquer servidor estático."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        O mesmo código Dart que vira app Android/iOS pode rodar como página web.
        Isso é poderoso para protótipos compartilháveis, painéis admin internos,
        landing pages dinâmicas e PWAs. O resultado é só HTML, CSS e JS — roda
        em qualquer host estático (GitHub Pages, Netlify, Vercel, S3, Firebase
        Hosting).
      </p>

      <h2>O conceito</h2>
      <p>
        Em mobile o Flutter compila Dart para código nativo (AOT). Na web, o
        Dart é compilado para JavaScript (ou WebAssembly, em fase estável a
        partir do Flutter 3.22+). O motor gráfico tem duas opções:
      </p>
      <ul>
        <li><strong>CanvasKit</strong> — usa WebAssembly + Skia. Renderização idêntica ao mobile, ~1.5MB extra de download.</li>
        <li><strong>HTML</strong> — usa elementos DOM e CSS. Mais leve, mas com pequenas diferenças visuais (foi descontinuado no Flutter 3.29+).</li>
        <li><strong>Skwasm (WASM)</strong> — novo padrão recomendado: melhor performance, sem JS interop pesado.</li>
      </ul>

      <h2>Como o Flutter faz</h2>
      <p>
        Habilite o suporte web (já vem ligado nas versões recentes) e gere o
        build de release. A saída fica em <code>build/web/</code>.
      </p>

      <CodeBlock title="comandos básicos" code={`# Habilitar web (uma vez só)
flutter config --enable-web

# Rodar localmente em modo dev
flutter run -d chrome

# Build de produção
flutter build web --release

# Build com WebAssembly (recomendado em 2024+)
flutter build web --wasm --release

# Servir o build localmente para testar
cd build/web && python3 -m http.server 8080`} />

      <h2>Exemplo prático: deploy no Firebase Hosting</h2>
      <p>
        Firebase Hosting é gratuito até certo tráfego, com HTTPS automático e
        CDN global. Em 5 comandos seu app está no ar.
      </p>

      <CodeBlock title="passos" code={`# 1) Instale o CLI
npm i -g firebase-tools

# 2) Login
firebase login

# 3) Init (escolha "Hosting" e a pasta build/web)
firebase init hosting

# 4) Compile
flutter build web --release

# 5) Deploy
firebase deploy --only hosting`} />

      <p>
        Em poucos segundos sai uma URL <code>seuprojeto.web.app</code> servindo
        o app globalmente. Atualizações futuras: só rodar passos 4 e 5.
      </p>

      <h2>SEO e base href</h2>
      <p>
        Se for hospedar em subpasta (ex: GitHub Pages em <code>/meuapp/</code>),
        ajuste o <code>base href</code> em <code>web/index.html</code>:
      </p>
      <CodeBlock title="web/index.html" code={`<!-- raiz do domínio -->
<base href="/">

<!-- subpasta /meuapp/ -->
<base href="/meuapp/">`} />
      <p>
        Ou passe na linha de comando: <code>flutter build web --base-href "/meuapp/"</code>.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Plataforma específica</strong> — pacotes que usam <code>dart:io</code>, <code>path_provider</code>, <code>sqflite</code> nativos não compilam para web. Use <code>kIsWeb</code> para isolar.</li>
        <li><strong>CORS</strong> — APIs HTTP precisam liberar seu domínio. Em dev, use <code>--web-browser-flag "--disable-web-security"</code> só para teste.</li>
        <li><strong>Tamanho do bundle</strong> — o app inicial pode passar de 2MB. Use <code>--release</code> sempre, e considere <code>--tree-shake-icons</code>.</li>
        <li><strong>Refresh em rota interna dá 404</strong> — configure o servidor para fallback em <code>index.html</code> (rewrites).</li>
        <li><strong>Fontes não carregam</strong> — declare em <code>pubspec.yaml</code> com <code>flutter: fonts:</code>; não basta jogar arquivos na pasta web.</li>
      </ul>

      <AlertBox type="warning" title="Nem tudo funciona na web">
        Câmera, biometria, notificações push e armazenamento nativo têm
        comportamentos diferentes ou inexistentes na web. Sempre teste o fluxo
        completo no navegador antes de prometer paridade ao cliente.
      </AlertBox>

      <AlertBox type="info" title="Não é a melhor escolha pra tudo">
        Flutter Web brilha em apps com muita interação visual (dashboards,
        editores). Para sites com foco em SEO e conteúdo (blog, marketing),
        prefira Next.js, Astro ou similares — Flutter Web ainda tem SEO fraco.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use <code>flutter build web --wasm --release</code> em produção (a partir do Flutter 3.22).</li>
          <li>Ative cache via <code>Cache-Control</code> longo nos arquivos <code>main.dart.js</code> hashados.</li>
          <li>Crie um <code>loading splash</code> em <code>web/index.html</code> para o intervalo até o Dart iniciar.</li>
          <li>Configure <code>manifest.json</code> e service worker para PWA instalável.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Veja <em>Build Desktop</em> e <em>I18n</em> para deixar seu app pronto
        para múltiplas plataformas e idiomas.
      </p>
      <AlertBox type="success">
        Próximo passo natural: configurar CI/CD (GitHub Actions) para que cada
        push em <code>main</code> faça deploy automático.
      </AlertBox>
    </PageContainer>
  );
}
