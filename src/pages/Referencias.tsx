import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Referencias() {
  return (
    <PageContainer
      title="Referências"
      subtitle="Onde aprender mais, encontrar pacotes e se manter atualizado em Flutter."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Flutter evolui rápido — uma versão estável a cada três meses, novidades
        em DevTools, plugins novos no <code>pub.dev</code> toda semana. Ler um
        livro do começo ao fim não basta; é preciso saber <em>onde</em> consultar
        quando bater dúvida real. Esta página é seu mapa de fontes confiáveis e
        de qualidade.
      </p>

      <h2>Documentação oficial</h2>
      <ul>
        <li><strong>docs.flutter.dev</strong> — portal principal, com tutoriais, cookbook e guias por plataforma.</li>
        <li><strong>api.flutter.dev</strong> — referência completa de cada classe/widget, com exemplos.</li>
        <li><strong>dart.dev</strong> — site da linguagem Dart: tour, biblioteca padrão, novidades.</li>
        <li><strong>firebase.flutter.dev</strong> — documentação oficial do FlutterFire.</li>
        <li><strong>master-api.flutter.dev</strong> — docs da branch master (recursos ainda não estáveis).</li>
      </ul>

      <h2>Pacotes e exemplos de código</h2>
      <ul>
        <li><strong>pub.dev</strong> — registro oficial de pacotes Dart/Flutter. Sempre cheque a aba "Scores" e "Pub Points".</li>
        <li><strong>github.com/flutter/samples</strong> — exemplos completos mantidos pelo time Flutter (animações, infinite scroll, isolates etc.).</li>
        <li><strong>github.com/flutter/flutter</strong> — código-fonte do framework. Ler é a melhor forma de entender comportamento estranho.</li>
        <li><strong>flutter.gskinner.com</strong> — coleção de demos open source com UX caprichada.</li>
      </ul>

      <CodeBlock title="checklist ao escolher um pacote no pub.dev" code={`# Verifique:
- Última publicação recente (< 6 meses)
- Pub Points alto (perto de 160)
- Número de likes
- Suporte a null safety
- Plataformas suportadas (Android, iOS, Web, Desktop)
- Issues abertas no GitHub: o autor responde?
- Quem é o publicador? "verified" da Google é selo forte`} />

      <h2>Canais de YouTube</h2>
      <ul>
        <li><strong>Flutter (canal oficial)</strong> — Widget of the Week, sessões do Flutter Forward, talks do time.</li>
        <li><strong>Reso Coder</strong> — Clean Architecture, BLoC, testes — referência em arquitetura.</li>
        <li><strong>Andrea Bizzotto (Code With Andrea)</strong> — tutoriais profundos, Riverpod, Firebase.</li>
        <li><strong>Robert Brunhage</strong> — animações, design system, conteúdo prático.</li>
        <li><strong>HeyFlutter</strong> — vídeos curtos de receitas comuns.</li>
      </ul>

      <h2>Comunidade</h2>
      <ul>
        <li><strong>r/FlutterDev</strong> (Reddit) — discussões, releases, perguntas.</li>
        <li><strong>Flutter Community Discord</strong> — chat ativo, canais por tópico (Riverpod, Bloc, Firebase).</li>
        <li><strong>Stack Overflow</strong> tag <code>flutter</code> — banco de dúvidas resolvidas.</li>
        <li><strong>X/Twitter</strong>: <code>@FlutterDev</code>, <code>@dart_lang</code>, <code>@RemiRousselet</code>, <code>@biz84</code>.</li>
        <li><strong>Discord brasileiro Flutterando</strong> — comunidade BR ativa, em português.</li>
      </ul>

      <h2>Cursos e livros</h2>
      <ul>
        <li><strong>Flutter &amp; Dart - The Complete Guide</strong> (Maximilian Schwarzmüller, Udemy) — clássico para iniciantes.</li>
        <li><strong>Codecademy / Coursera</strong> — trilhas oficiais Google.</li>
        <li><strong>Flutter Apprentice</strong> (Kodeco, ex-raywenderlich) — livro com projetos.</li>
        <li><strong>Flutterando Academy</strong> — em português, foco em arquitetura.</li>
      </ul>

      <h2>Newsletters e blogs</h2>
      <ul>
        <li><strong>medium.com/flutter</strong> — blog oficial. Cada release vem com post detalhado.</li>
        <li><strong>Flutter Weekly</strong> (newsletter) — resumo semanal de artigos e pacotes.</li>
        <li><strong>Code with Andrea</strong> (blog) — artigos em profundidade.</li>
        <li><strong>medium.com/flutter-community</strong> — agregador da comunidade.</li>
      </ul>

      <h2>Mantendo o ambiente atualizado</h2>
      <p>
        O canal padrão (<code>stable</code>) recebe atualizações trimestrais. Se
        quiser experimentar recursos novos, use canais alternativos — mas saiba
        que <code>master</code> pode quebrar.
      </p>

      <CodeBlock title="comandos úteis" code={`# Ver versão atual
flutter --version

# Atualizar
flutter upgrade

# Trocar de canal
flutter channel stable   # produção
flutter channel beta     # próximas features
flutter channel master   # bleeding edge (instável)

# Diagnóstico do ambiente
flutter doctor -v

# Limpar caches quando algo estranho acontece
flutter clean
flutter pub cache repair`} />

      <h2>Pegadinhas comuns ao buscar ajuda</h2>
      <ul>
        <li><strong>Stack Overflow desatualizado</strong> — respostas de antes do null safety (2021) podem confundir. Filtre por data.</li>
        <li><strong>Tutorial em versão antiga</strong> — antes do Flutter 3 muita coisa mudou (<code>RaisedButton</code> ↔ <code>ElevatedButton</code>, M2 ↔ M3).</li>
        <li><strong>Pacote abandonado</strong> — última publicação há mais de um ano = procure alternativa.</li>
        <li><strong>Copy-paste cego de IA</strong> — ChatGPT/Copilot inventam APIs. Sempre confirme em <code>api.flutter.dev</code>.</li>
      </ul>

      <AlertBox type="info" title="Acompanhe os releases">
        Flutter lança versão a cada ~3 meses. Cada release vem com post no blog
        explicando mudanças (deprecações, novos widgets). Vale ler.
      </AlertBox>

      <AlertBox type="tip" title="Hábitos que salvam tempo">
        <ul>
          <li>Marque <code>api.flutter.dev</code> nos favoritos — abra direto sem passar pelo Google.</li>
          <li>Quando bater dúvida, leia o código do widget (basta clicar com Ctrl/Cmd no IDE).</li>
          <li>Inscreva-se no canal oficial Flutter no YouTube — Widget of the Week ensina muita coisa em 90s.</li>
          <li>Contribua: relatar issues, fazer PRs e responder no Discord acelera <em>seu</em> aprendizado.</li>
        </ul>
      </AlertBox>

      <AlertBox type="warning" title="Cuidado com cursos pagos genéricos">
        Muito conteúdo "Flutter completo" é raso. Avalie data de atualização,
        se cobre null safety, Riverpod/Bloc moderno, e arquitetura — não só
        widgets.
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Adicione duas ou três fontes ao seu fluxo: um canal do YouTube, uma
        newsletter e a documentação. Visite o blog oficial a cada release.
        Pratique construindo projetos pequenos.
      </p>
      <AlertBox type="success">
        Programar Flutter bem é menos sobre saber tudo e mais sobre saber
        rapidamente <em>onde</em> achar a resposta certa.
      </AlertBox>
    </PageContainer>
  );
}
