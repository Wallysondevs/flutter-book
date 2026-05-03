import{j as e}from"./index-D4AOhXGO.js";import{P as i,C as a,A as s}from"./AlertBox-Dyf2wdSA.js";function l(){return e.jsxs(i,{title:"Build Web",subtitle:"Compile o app Flutter para HTML+JS e publique em qualquer servidor estático.",difficulty:"intermediario",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsx("p",{children:"O mesmo código Dart que vira app Android/iOS pode rodar como página web. Isso é poderoso para protótipos compartilháveis, painéis admin internos, landing pages dinâmicas e PWAs. O resultado é só HTML, CSS e JS — roda em qualquer host estático (GitHub Pages, Netlify, Vercel, S3, Firebase Hosting)."}),e.jsx("h2",{children:"O conceito"}),e.jsx("p",{children:"Em mobile o Flutter compila Dart para código nativo (AOT). Na web, o Dart é compilado para JavaScript (ou WebAssembly, em fase estável a partir do Flutter 3.22+). O motor gráfico tem duas opções:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"CanvasKit"})," — usa WebAssembly + Skia. Renderização idêntica ao mobile, ~1.5MB extra de download."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"HTML"})," — usa elementos DOM e CSS. Mais leve, mas com pequenas diferenças visuais (foi descontinuado no Flutter 3.29+)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Skwasm (WASM)"})," — novo padrão recomendado: melhor performance, sem JS interop pesado."]})]}),e.jsx("h2",{children:"Como o Flutter faz"}),e.jsxs("p",{children:["Habilite o suporte web (já vem ligado nas versões recentes) e gere o build de release. A saída fica em ",e.jsx("code",{children:"build/web/"}),"."]}),e.jsx(a,{title:"comandos básicos",code:`# Habilitar web (uma vez só)
flutter config --enable-web

# Rodar localmente em modo dev
flutter run -d chrome

# Build de produção
flutter build web --release

# Build com WebAssembly (recomendado em 2024+)
flutter build web --wasm --release

# Servir o build localmente para testar
cd build/web && python3 -m http.server 8080`}),e.jsx("h2",{children:"Exemplo prático: deploy no Firebase Hosting"}),e.jsx("p",{children:"Firebase Hosting é gratuito até certo tráfego, com HTTPS automático e CDN global. Em 5 comandos seu app está no ar."}),e.jsx(a,{title:"passos",code:`# 1) Instale o CLI
npm i -g firebase-tools

# 2) Login
firebase login

# 3) Init (escolha "Hosting" e a pasta build/web)
firebase init hosting

# 4) Compile
flutter build web --release

# 5) Deploy
firebase deploy --only hosting`}),e.jsxs("p",{children:["Em poucos segundos sai uma URL ",e.jsx("code",{children:"seuprojeto.web.app"})," servindo o app globalmente. Atualizações futuras: só rodar passos 4 e 5."]}),e.jsx("h2",{children:"SEO e base href"}),e.jsxs("p",{children:["Se for hospedar em subpasta (ex: GitHub Pages em ",e.jsx("code",{children:"/meuapp/"}),"), ajuste o ",e.jsx("code",{children:"base href"})," em ",e.jsx("code",{children:"web/index.html"}),":"]}),e.jsx(a,{title:"web/index.html",code:`<!-- raiz do domínio -->
<base href="/">

<!-- subpasta /meuapp/ -->
<base href="/meuapp/">`}),e.jsxs("p",{children:["Ou passe na linha de comando: ",e.jsx("code",{children:'flutter build web --base-href "/meuapp/"'}),"."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Plataforma específica"})," — pacotes que usam ",e.jsx("code",{children:"dart:io"}),", ",e.jsx("code",{children:"path_provider"}),", ",e.jsx("code",{children:"sqflite"})," nativos não compilam para web. Use ",e.jsx("code",{children:"kIsWeb"})," para isolar."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"CORS"})," — APIs HTTP precisam liberar seu domínio. Em dev, use ",e.jsx("code",{children:'--web-browser-flag "--disable-web-security"'})," só para teste."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tamanho do bundle"})," — o app inicial pode passar de 2MB. Use ",e.jsx("code",{children:"--release"})," sempre, e considere ",e.jsx("code",{children:"--tree-shake-icons"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Refresh em rota interna dá 404"})," — configure o servidor para fallback em ",e.jsx("code",{children:"index.html"})," (rewrites)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fontes não carregam"})," — declare em ",e.jsx("code",{children:"pubspec.yaml"})," com ",e.jsx("code",{children:"flutter: fonts:"}),"; não basta jogar arquivos na pasta web."]})]}),e.jsx(s,{type:"warning",title:"Nem tudo funciona na web",children:"Câmera, biometria, notificações push e armazenamento nativo têm comportamentos diferentes ou inexistentes na web. Sempre teste o fluxo completo no navegador antes de prometer paridade ao cliente."}),e.jsx(s,{type:"info",title:"Não é a melhor escolha pra tudo",children:"Flutter Web brilha em apps com muita interação visual (dashboards, editores). Para sites com foco em SEO e conteúdo (blog, marketing), prefira Next.js, Astro ou similares — Flutter Web ainda tem SEO fraco."}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(s,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"flutter build web --wasm --release"})," em produção (a partir do Flutter 3.22)."]}),e.jsxs("li",{children:["Ative cache via ",e.jsx("code",{children:"Cache-Control"})," longo nos arquivos ",e.jsx("code",{children:"main.dart.js"})," hashados."]}),e.jsxs("li",{children:["Crie um ",e.jsx("code",{children:"loading splash"})," em ",e.jsx("code",{children:"web/index.html"})," para o intervalo até o Dart iniciar."]}),e.jsxs("li",{children:["Configure ",e.jsx("code",{children:"manifest.json"})," e service worker para PWA instalável."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Veja ",e.jsx("em",{children:"Build Desktop"})," e ",e.jsx("em",{children:"I18n"})," para deixar seu app pronto para múltiplas plataformas e idiomas."]}),e.jsxs(s,{type:"success",children:["Próximo passo natural: configurar CI/CD (GitHub Actions) para que cada push em ",e.jsx("code",{children:"main"})," faça deploy automático."]})]})}export{l as default};
