import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Historia() {
  return (
    <PageContainer
      title="História do Flutter"
      subtitle="De experimento interno do Google a framework cross-platform líder."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Conhecer a história do Flutter ajuda a entender <strong>por que ele foi feito assim</strong>: por que tem sua própria engine de renderização, por que escolheu Dart, por que fala em "widgets" e não em "componentes". Quando você sabe o "porquê", o "como" fica muito mais fácil de absorver.
      </p>

      <h2>O conceito</h2>
      <p>
        Flutter é um <strong>framework cross-platform</strong>: você escreve um único código em Dart e roda em Android, iOS, Web, Windows, macOS e Linux. A grande diferença para concorrentes (React Native, Xamarin) é que o Flutter <strong>não usa componentes nativos do sistema</strong> — ele desenha cada pixel da tela com sua própria engine gráfica (Skia, e mais recentemente Impeller).
      </p>
      <p>
        Pense numa analogia: enquanto outros frameworks pedem para o sistema operacional desenhar o botão, o Flutter traz o "lápis" junto e desenha o botão do zero, igualzinho em todo lugar.
      </p>

      <h2>A linha do tempo</h2>
      <ul>
        <li><strong>2015</strong> — Google apresenta o projeto interno <em>Sky</em> rodando Dart a 120fps no Android.</li>
        <li><strong>2017</strong> — Sky vira Flutter e entra em alpha público no Google I/O.</li>
        <li><strong>Dezembro de 2018</strong> — Flutter 1.0 estável, focado em mobile (Android e iOS).</li>
        <li><strong>2021</strong> — Flutter 2 traz suporte estável a Web.</li>
        <li><strong>2022</strong> — Flutter 3 oficializa Linux e macOS desktop.</li>
        <li><strong>2023</strong> — Dart 3 chega com null safety obrigatório, records e patterns.</li>
        <li><strong>2024–2026</strong> — Impeller substitui o Skia em iOS/Android, melhorando jank de animação. Flutter vira opção mainstream em fintechs, super-apps e governos.</li>
      </ul>

      <h2>Por que Dart?</h2>
      <p>
        O Google escolheu Dart porque ela compila de duas formas: <strong>JIT</strong> (just-in-time) durante o desenvolvimento — o que viabiliza o famoso <em>hot reload</em> em menos de um segundo — e <strong>AOT</strong> (ahead-of-time) na release, gerando código nativo rápido. Poucas linguagens têm essa dupla personalidade.
      </p>

      <CodeBlock title="por que hot reload é possível" code={`// Em desenvolvimento (JIT), o Dart roda numa VM
// que troca o código de funções já compiladas
// sem precisar reiniciar o app.

void main() {
  runApp(const MyApp()); // estado preservado no reload
}`} />

      <h2>Quem usa em produção</h2>
      <p>
        Saber quem aposta no Flutter dá segurança para você apostar também:
      </p>
      <ul>
        <li><strong>Google Pay</strong> — migrou de nativo para Flutter mantendo bilhões de transações.</li>
        <li><strong>Nubank</strong> — usa Flutter para muitos fluxos do super-app.</li>
        <li><strong>iFood</strong>, <strong>BMW</strong>, <strong>Toyota</strong>, <strong>Alibaba</strong>, <strong>eBay Motors</strong>, <strong>ByteDance</strong>.</li>
        <li>Apps embarcados em <strong>painéis de carro</strong> e <strong>caixas eletrônicos</strong>.</li>
      </ul>

      <AlertBox type="info" title="Não é mais brinquedo">
        Flutter saiu da fase "experimento" há anos. Em 2026 é uma das três opções dominantes para apps multiplataforma, ao lado de React Native e Kotlin Multiplatform.
      </AlertBox>

      <h2>Pegadinhas comuns ao começar</h2>
      <ul>
        <li>Confundir <strong>Flutter</strong> (framework de UI) com <strong>Dart</strong> (linguagem). Você aprende Dart para usar Flutter.</li>
        <li>Achar que "tudo é nativo". Flutter desenha pixels — botões, scroll, ripple, tudo é simulado para parecer nativo.</li>
        <li>Esperar zero diferença entre plataformas. Câmera, biometria e permissões mudam por SO e exigem pacotes específicos.</li>
      </ul>

      <AlertBox type="warning" title="Tamanho do app">
        Como o Flutter empacota a própria engine, um app vazio pesa cerca de 7–15 MB. Não é problema para a maioria dos casos, mas é bom saber.
      </AlertBox>

      <h2>Boas práticas desde o dia 1</h2>
      <AlertBox type="tip" title="Hábitos saudáveis">
        Acompanhe o changelog em <code>docs.flutter.dev</code>, mantenha o SDK atualizado com <code>flutter upgrade</code> e prefira pacotes com manutenção ativa em <code>pub.dev</code> (veja a pontuação e a data do último release).
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Agora que você sabe de onde o Flutter veio, vamos entender <strong>a filosofia técnica</strong> que sustenta tudo isso e por que ela muda a forma de pensar UI.
      </p>

      <AlertBox type="success" title="Continue lendo">
        Próximo capítulo: <em>Filosofia: Single Codebase</em>. Depois entramos em Dart e no primeiro app.
      </AlertBox>
    </PageContainer>
  );
}
