import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Stateful() {
  return (
    <PageContainer
      title="StatefulWidget"
      subtitle="Widgets que guardam estado mutável — contadores, formulários, animações."
      difficulty="iniciante"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Toda vez que sua tela precisa <strong>mudar sozinha</strong> em resposta a uma interação, um timer ou um dado da rede, você precisa de estado. Sem <code>StatefulWidget</code> (ou um state manager por cima), seu app é só uma imagem parada.
      </p>

      <h2>O conceito</h2>
      <p>
        Um <code>StatefulWidget</code> é dividido em <strong>duas classes</strong>:
      </p>
      <ul>
        <li>A classe do <strong>widget</strong> — imutável, configura.</li>
        <li>A classe do <strong>State</strong> — mutável, sobrevive a rebuilds e guarda os dados.</li>
      </ul>
      <p>
        O Flutter destrói e recria o widget livremente, mas o <code>State</code> persiste enquanto aquela posição na árvore continuar existindo. Você muda os campos do State e chama <code>setState</code> para avisar: "redesenha esse trecho".
      </p>

      <h2>Como Flutter faz</h2>
      <CodeBlock title="Estrutura completa" code={`import 'package:flutter/material.dart';

// 1) A classe Widget — imutável
class Contador extends StatefulWidget {
  const Contador({super.key});

  // Cria o State associado
  @override
  State<Contador> createState() => _ContadorState();
}

// 2) A classe State — guarda dados que mudam
class _ContadorState extends State<Contador> {
  int _n = 0; // estado interno

  void _incrementar() {
    // setState avisa o framework para chamar build()
    setState(() => _n++);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Cliques: \$_n', style: const TextStyle(fontSize: 24)),
        ElevatedButton(
          onPressed: _incrementar,
          child: const Text('+1'),
        ),
      ],
    );
  }
}`} />

      <AlertBox type="info" title="O underline (_) não é estilo">
        Em Dart, identificadores começando com <code>_</code> são <strong>privados ao arquivo</strong>. Por isso <code>_ContadorState</code> e <code>_n</code> ficam invisíveis fora desse <code>.dart</code>.
      </AlertBox>

      <h2>O ciclo de vida</h2>
      <p>
        O State tem métodos chamados em momentos específicos. Conhecer eles evita bugs:
      </p>
      <ul>
        <li><code>initState()</code> — uma única vez, quando o State é criado. Inicialize controllers, faça subscrições, dispare o primeiro fetch.</li>
        <li><code>didChangeDependencies()</code> — após initState e sempre que um <code>InheritedWidget</code> de cima mudar. Bom para recarregar dependências.</li>
        <li><code>build()</code> — toda vez que reconstrói (setState, mudança do pai, mudança de tema...). Mantenha rápido e puro.</li>
        <li><code>didUpdateWidget(old)</code> — quando o pai recria o widget com parâmetros novos. Compare e reaja.</li>
        <li><code>dispose()</code> — antes do State ser destruído. <strong>Sempre</strong> libere controllers, streams, timers aqui.</li>
      </ul>

      <h2>Exemplo prático</h2>
      <p>
        Campo de busca com debounce e limpeza correta de recursos:
      </p>

      <CodeBlock title="lib/widgets/busca.dart" code={`import 'dart:async';
import 'package:flutter/material.dart';

class Busca extends StatefulWidget {
  final ValueChanged<String> onBuscar;
  const Busca({super.key, required this.onBuscar});

  @override
  State<Busca> createState() => _BuscaState();
}

class _BuscaState extends State<Busca> {
  final _ctrl = TextEditingController();
  Timer? _debounce;

  @override
  void initState() {
    super.initState();
    _ctrl.addListener(_aoDigitar);
  }

  void _aoDigitar() {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 400), () {
      widget.onBuscar(_ctrl.text); // widget.* acessa o widget pai
    });
  }

  @override
  void dispose() {
    _debounce?.cancel();
    _ctrl.removeListener(_aoDigitar);
    _ctrl.dispose(); // libera o controller
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _ctrl,
      decoration: const InputDecoration(
        prefixIcon: Icon(Icons.search),
        hintText: 'Buscar...',
      ),
    );
  }
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Chamar <code>setState</code> dentro do <code>build()</code>. Loop infinito garantido — nunca faça isso.</li>
        <li>Esquecer <code>dispose</code> de <code>TextEditingController</code>, <code>AnimationController</code>, <code>StreamSubscription</code>, <code>Timer</code>. Vaza memória e pode quebrar testes.</li>
        <li>Chamar <code>setState</code> depois do widget ser desmontado (ex: callback de async). Verifique <code>if (!mounted) return;</code>.</li>
        <li>Modificar variáveis sem <code>setState</code>. Os dados mudam, mas a UI não — você jura que não funciona, mas o framework não sabe que precisa redesenhar.</li>
        <li>Inicializar valor que depende do <code>context</code> direto na declaração. Use <code>didChangeDependencies</code> ou <code>initState</code> com <code>WidgetsBinding.instance.addPostFrameCallback</code>.</li>
      </ul>

      <AlertBox type="danger" title="setState após dispose">
        Se uma chamada async termina depois da tela fechar, <code>setState</code> joga exceção. Sempre cheque <code>if (mounted)</code> antes.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        Mantenha o State <strong>pequeno e local</strong>. Estado que precisa ser compartilhado entre telas é trabalho de <code>Provider</code>, <code>Riverpod</code> ou <code>Bloc</code> — não de StatefulWidget.
      </AlertBox>
      <ul>
        <li>Prefixe membros privados com <code>_</code>. Facilita refatorar sem quebrar quem importa.</li>
        <li>Use <code>const</code> nos filhos do <code>build</code> sempre que possível.</li>
        <li>Acesse o widget pai com <code>widget.algumCampo</code> — útil para parâmetros que não devem virar estado.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Você já sabe redesenhar pedaços da tela. Em seguida vamos entender a <em>árvore de widgets</em> que o Flutter monta por baixo desse <code>build</code>.
      </p>
      <AlertBox type="success" title="Marco">
        Domínio de StatelessWidget + StatefulWidget já cobre 80% das UIs do dia a dia.
      </AlertBox>
    </PageContainer>
  );
}
