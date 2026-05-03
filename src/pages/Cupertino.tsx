import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Cupertino() {
  return (
    <PageContainer
      title="Cupertino (iOS)"
      subtitle="Widgets Flutter com a aparência e o comportamento nativos do iOS."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Usuários de iPhone esperam um app que "pareça iOS": switches arredondados, botões azuis sem sombra, navegação que desliza da direita, fonte San Francisco. Se você entregar um app com cara de Material num iPhone, ele soa "errado" — e a Apple pode até pedir ajustes na revisão da App Store.
      </p>
      <p>
        O Flutter resolve isso com a biblioteca <strong>Cupertino</strong>: widgets que imitam fielmente os componentes do iOS, pixel a pixel.
      </p>

      <h2>O conceito</h2>
      <p>
        Cupertino é uma biblioteca <em>paralela</em> ao Material. Para cada widget Material existe normalmente um equivalente Cupertino:
      </p>
      <ul>
        <li><code>MaterialApp</code> ↔ <code>CupertinoApp</code></li>
        <li><code>Scaffold</code> ↔ <code>CupertinoPageScaffold</code></li>
        <li><code>AppBar</code> ↔ <code>CupertinoNavigationBar</code></li>
        <li><code>ElevatedButton</code> ↔ <code>CupertinoButton</code></li>
        <li><code>Switch</code> ↔ <code>CupertinoSwitch</code></li>
        <li><code>AlertDialog</code> ↔ <code>CupertinoAlertDialog</code></li>
        <li><code>BottomNavigationBar</code> ↔ <code>CupertinoTabBar</code></li>
      </ul>

      <h2>Como Flutter faz</h2>
      <p>
        Você importa o pacote Cupertino no lugar (ou junto) do Material:
      </p>

      <CodeBlock title="import" code={`// Cupertino sozinho — para apps 100% iOS.
import 'package:flutter/cupertino.dart';

// Cupertino + Material — para apps híbridos com .adaptive.
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';`} />

      <p>
        Uma tela mínima Cupertino:
      </p>

      <CodeBlock title="lib/main.dart" code={`import 'package:flutter/cupertino.dart';

void main() => runApp(const MeuApp());

class MeuApp extends StatelessWidget {
  const MeuApp({super.key});

  @override
  Widget build(BuildContext context) {
    // CupertinoApp configura tema iOS e navegação.
    return const CupertinoApp(
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      // Barra de navegação no estilo iOS (centralizada).
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Início'),
      ),
      child: Center(
        child: CupertinoButton.filled(
          onPressed: () {},
          child: const Text('OK'),
        ),
      ),
    );
  }
}`} />

      <h2>Exemplo prático: diálogo nativo iOS</h2>
      <p>
        Mostrar uma confirmação no estilo iOS (botão vermelho de "Excluir", azul de "Cancelar"):
      </p>

      <CodeBlock title="confirmar_exclusao" code={`Future<void> confirmarExclusao(BuildContext context) async {
  final confirmar = await showCupertinoDialog<bool>(
    context: context,
    builder: (ctx) => CupertinoAlertDialog(
      title: const Text('Excluir item?'),
      content: const Text('Esta ação não pode ser desfeita.'),
      actions: [
        CupertinoDialogAction(
          onPressed: () => Navigator.pop(ctx, false),
          child: const Text('Cancelar'),
        ),
        CupertinoDialogAction(
          isDestructiveAction: true, // texto vermelho
          onPressed: () => Navigator.pop(ctx, true),
          child: const Text('Excluir'),
        ),
      ],
    ),
  );

  if (confirmar == true) {
    // Exclui de fato...
  }
}`} />

      <h2>Widgets adaptativos</h2>
      <p>
        Para apps que rodam tanto em Android quanto em iOS e devem mudar a aparência conforme a plataforma, o Flutter oferece construtores <code>.adaptive</code> em alguns widgets Material:
      </p>

      <CodeBlock title="adaptive" code={`// Vira CupertinoSwitch no iOS, Switch no Android.
Switch.adaptive(
  value: ligado,
  onChanged: (v) => setState(() => ligado = v),
)

// Vira CupertinoActivityIndicator no iOS.
const CircularProgressIndicator.adaptive()

// Vira CupertinoSlider no iOS.
Slider.adaptive(value: 0.5, onChanged: (v) {})`} />

      <AlertBox type="info" title="Quando usar Cupertino puro vs adaptive">
        Se seu app é <strong>exclusivamente iOS</strong> (ou precisa de aprovação rigorosa da Apple), use <code>CupertinoApp</code> e widgets Cupertino. Se é multiplataforma com identidade própria, fique no Material e use <code>.adaptive</code> nos pontos onde a plataforma é importante (switches, indicadores, alertas).
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Misturar <code>CupertinoApp</code> e widgets Material:</strong> usar um <code>ElevatedButton</code> dentro de <code>CupertinoApp</code> funciona, mas o botão fica sem cor de tema (Material precisa de <code>MaterialApp</code> para herdar <code>ThemeData</code>).</li>
        <li><strong>Esperar Cupertino paridade total:</strong> nem todo widget Material tem equivalente. Listas, formulários complexos e alguns indicadores ainda exigem soluções customizadas.</li>
        <li><strong>Ignorar a fonte:</strong> Cupertino tenta usar San Francisco no iOS, mas em outras plataformas cai numa fonte similar. Se a tipografia é crítica, configure manualmente.</li>
        <li><strong>Pop gesture:</strong> no iOS o usuário arrasta da esquerda para voltar. <code>CupertinoPageRoute</code> habilita isso por padrão; <code>MaterialPageRoute</code> não.</li>
      </ul>

      <AlertBox type="warning" title="Não force iOS no Android">
        Apps Android com cara de iOS confundem o usuário. Não vale a pena "padronizar" só porque é mais fácil — Android tem seu próprio sistema de gestos e expectativas.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Decida cedo: o app é Material, Cupertino ou híbrido? Trocar depois é trabalhoso.</li>
          <li>Em apps híbridos, isole widgets específicos de plataforma em arquivos separados (<code>botao_adaptativo.dart</code>) para facilitar manutenção.</li>
          <li>Teste em ambos os simuladores. O que parece "ok" no Android pode ficar quebrado no iPhone.</li>
          <li>Use <code>defaultTargetPlatform</code> ou <code>Theme.of(context).platform</code> para checar plataforma quando precisar de lógica condicional.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Já viu o "lado iOS" do Flutter. Em seguida, <strong>Temas &amp; Cores</strong> mostra como personalizar a aparência global (Material e Cupertino).
      </p>

      <AlertBox type="success" title="Documentação visual">
        A galeria oficial <em>Flutter Cupertino Gallery</em> (no flutter.dev) mostra cada widget Cupertino em ação. Vale folhear antes de começar um app iOS.
      </AlertBox>
    </PageContainer>
  );
}
