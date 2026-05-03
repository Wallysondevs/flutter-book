import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Hero() {
  return (
    <PageContainer
      title="Hero Animations"
      subtitle="Animação automática de um elemento entre duas telas — sem controller."
      difficulty="intermediario"
      timeToRead="9 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Você abre o Instagram, toca numa foto da grade — e ela <em>cresce suavemente</em> até virar o post em tela cheia. Esse efeito ancora o usuário: ele vê <strong>de onde veio</strong> o conteúdo, e voltar parece natural. Sem isso, parece que a tela trocou do nada.
      </p>
      <p>
        No Flutter esse efeito tem nome próprio: <strong>Hero animation</strong>. E o melhor: você não precisa escrever uma única linha de código de animação.
      </p>

      <h2>O conceito</h2>
      <p>
        Imagine duas fotos iguais em telas diferentes, marcadas com a <strong>mesma etiqueta</strong>. Quando o Flutter navega da tela A para a tela B, ele:
      </p>
      <ol>
        <li>Vê que existe um <code>Hero</code> com a tag <code>X</code> na tela A.</li>
        <li>Vê que existe outro <code>Hero</code> com a tag <code>X</code> na tela B.</li>
        <li>Tira o widget de A do lugar, voa ele até a posição/tamanho do de B durante a transição, e descarta.</li>
      </ol>
      <p>
        Você só precisa garantir: <strong>mesma tag, dois <code>Hero</code>s, em rotas diferentes</strong>.
      </p>

      <AlertBox type="info" title="A tag pode ser qualquer coisa">
        String, número, ou qualquer objeto que implemente <code>==</code> e <code>hashCode</code> direito. O comum é usar o <code>id</code> do item: <code>'foto-42'</code>, ou direto o objeto.
      </AlertBox>

      <h2>Como Flutter faz</h2>
      <p>
        Envolva o widget de origem com <code>Hero</code>. Faça a navegação. Envolva o widget de destino com outro <code>Hero</code> de mesma tag. Pronto.
      </p>

      <CodeBlock title="lista → detalhe" code={`// modelo simples
class Foto {
  final String id;
  final String url;
  Foto(this.id, this.url);
}

// 1) Tela de lista — cada thumb é um Hero
class TelaLista extends StatelessWidget {
  final List<Foto> fotos;
  const TelaLista({super.key, required this.fotos});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GridView.count(
        crossAxisCount: 3,
        children: fotos.map((f) {
          return GestureDetector(
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => TelaDetalhe(foto: f)),
            ),
            // tag única por item — \$f.id garante unicidade
            child: Hero(
              tag: 'foto-\${f.id}',
              child: Image.network(f.url, fit: BoxFit.cover),
            ),
          );
        }).toList(),
      ),
    );
  }
}

// 2) Tela de detalhe — mesma tag, mesma imagem
class TelaDetalhe extends StatelessWidget {
  final Foto foto;
  const TelaDetalhe({super.key, required this.foto});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Hero(
          tag: 'foto-\${foto.id}',
          child: Image.network(foto.url),
        ),
      ),
    );
  }
}`} />

      <p>
        Toque numa thumb: ela <strong>cresce voando</strong> até o tamanho da imagem grande. Volte: ela encolhe de volta para a posição original na grade. Sem nenhuma <code>Tween</code>, sem nenhum <code>AnimationController</code>.
      </p>

      <h2>Exemplo prático: customizando a transição</h2>
      <p>
        Por padrão a interpolação é "retangular": forma e cor mudam linearmente. Para casos como avatar circular virando capa retangular, use <code>flightShuttleBuilder</code> para controlar o widget que voa no meio do trajeto.
      </p>

      <CodeBlock title="avatar redondo → banner" code={`Hero(
  tag: 'avatar-\${user.id}',
  // este widget é construído enquanto o Hero está "no ar"
  flightShuttleBuilder: (
    flightContext,
    animation,
    direction,
    fromContext,
    toContext,
  ) {
    return AnimatedBuilder(
      animation: animation,
      builder: (_, __) {
        // raio interpolado: 50 (círculo) -> 12 (canto suave)
        final raio = Tween<double>(begin: 50, end: 12)
            .evaluate(animation);
        return ClipRRect(
          borderRadius: BorderRadius.circular(raio),
          child: Image.network(user.avatarUrl, fit: BoxFit.cover),
        );
      },
    );
  },
  child: ClipRRect(
    borderRadius: BorderRadius.circular(50),
    child: Image.network(user.avatarUrl, width: 100, height: 100),
  ),
)`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Tags duplicadas na mesma rota</strong>: dois <code>Hero</code>s com tag igual visível ao mesmo tempo dão exception.</li>
        <li><strong>Tags como string fixa</strong>: <code>'foto'</code> para todos os itens da lista — o Flutter não sabe qual é qual. Use o id.</li>
        <li><strong>Esquecer Hero no destino</strong>: sem o segundo <code>Hero</code>, nada anima — só uma transição comum de rota.</li>
        <li><strong>Imagens diferentes nas duas pontas</strong>: o efeito fica estranho, parece "corte". Use a mesma URL/asset.</li>
        <li><strong>Hero dentro de listas com <code>const</code> agressivo</strong>: tudo bem usar const, só garanta que a tag muda por item.</li>
      </ul>

      <AlertBox type="warning" title="Cuidado com Hero dentro de Hero">
        Aninhar <code>Hero</code>s causa comportamento imprevisível. Se precisar animar várias coisas juntas, use uma única tag no widget mais externo.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Padronize o esquema de tags">
        Adote um padrão por entidade — <code>'produto-\${id}'</code>, <code>'usuario-avatar-\${id}'</code>. Fica óbvio na leitura e evita colisão entre módulos diferentes do app.
      </AlertBox>
      <ul>
        <li>Use Hero para <strong>imagens</strong>, <strong>avatares</strong>, <strong>cards</strong> que viram tela cheia. Evite em texto puro — a interpolação de fonte fica feia.</li>
        <li>Combine com <code>BackdropFilter</code> ou <code>FadeTransition</code> da própria rota para um polimento extra.</li>
        <li>Prefira <code>MaterialPageRoute</code> ou <code>CupertinoPageRoute</code> — Hero funciona pronto. Em rotas customizadas com <code>PageRouteBuilder</code>, certifique-se de propagar o <code>Hero</code> corretamente.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Hero é a porta de entrada para apps com sensação <em>nativa</em>. Quando precisar ir além — animar a chegada de cards, transições de página customizadas, listas que reordenam suavemente — explore o pacote oficial <code>animations</code> do Material.
      </p>
      <AlertBox type="success" title="O que vem por aí">
        Capítulos seguintes mergulham em integração nativa: chamar Kotlin/Swift do Dart com <strong>Platform Channels</strong>, criar <strong>Plugins</strong>, e baixar até C/C++ com <strong>Dart FFI</strong>.
      </AlertBox>
    </PageContainer>
  );
}
