import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function SetState() {
  return (
    <PageContainer
      title="setState"
      subtitle="O gerenciamento de estado nativo do Flutter — perfeito para estado local de um widget."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Toda interface que reage ao usuário precisa de <strong>estado</strong>: o texto digitado em um campo, se um switch está ligado, qual aba está ativa, o número de cliques. No Flutter, a forma mais simples (e oficial) de manter esse estado dentro de um widget é o <code>setState</code>.
      </p>
      <p>
        Antes de partir para Provider, Riverpod ou BLoC, você precisa dominar <code>setState</code>. Ele é a base mental de "mudança de estado dispara rebuild" — conceito que se repete em todas as soluções mais avançadas.
      </p>

      <h2>O conceito</h2>
      <p>
        Quando um widget pode mudar com o tempo, ele é um <code>StatefulWidget</code>. Esse widget tem uma classe <code>State</code> companheira que guarda os dados mutáveis e contém o método <code>build</code>.
      </p>
      <p>
        <code>setState</code> é uma chamada ao framework: <em>"olha, eu mudei alguma coisa que afeta a UI, por favor chame meu build de novo"</em>. O Flutter então reconstrói o widget e atualiza só o que mudou na tela (graças ao mecanismo de diff da árvore de elements).
      </p>
      <p>
        Use <code>setState</code> para estado <strong>local</strong>: aquele que pertence a um widget só e não precisa ser visto por outras telas. Para estado compartilhado entre páginas, use Provider/Riverpod/BLoC.
      </p>

      <h2>Como Flutter faz</h2>

      <CodeBlock title="estrutura básica" code={`class Favorito extends StatefulWidget {
  const Favorito({super.key});

  @override
  State<Favorito> createState() => _FavoritoState();
}

class _FavoritoState extends State<Favorito> {
  // Estado mutável: começa como false.
  bool _favoritado = false;

  void _alternar() {
    // setState recebe uma função: tudo dentro dela
    // pode mudar o estado. Depois, o framework chama build().
    setState(() {
      _favoritado = !_favoritado;
    });
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: _alternar,
      icon: Icon(
        _favoritado ? Icons.favorite : Icons.favorite_border,
        color: _favoritado ? Colors.red : null,
      ),
    );
  }
}`} />

      <p>
        O ciclo é: usuário toca → <code>_alternar</code> chama <code>setState</code> → Flutter agenda rebuild → <code>build</code> roda de novo com <code>_favoritado = true</code> → ícone vira coração cheio vermelho.
      </p>

      <h2>Exemplo prático: formulário com validação local</h2>
      <p>
        Um caso real bem comum: um campo de email com botão habilitado só quando o email tem formato válido.
      </p>

      <CodeBlock title="lib/email_form.dart" code={`import 'package:flutter/material.dart';

class EmailForm extends StatefulWidget {
  const EmailForm({super.key});

  @override
  State<EmailForm> createState() => _EmailFormState();
}

class _EmailFormState extends State<EmailForm> {
  final _controller = TextEditingController();
  String _email = '';
  bool _enviando = false;

  bool get _valido => _email.contains('@') && _email.contains('.');

  Future<void> _enviar() async {
    setState(() => _enviando = true);

    // Simula chamada de rede.
    await Future.delayed(const Duration(seconds: 1));

    if (!mounted) return; // segurança após await

    setState(() => _enviando = false);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Enviado para \$_email')),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          TextField(
            controller: _controller,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(labelText: 'Email'),
            // A cada caractere, atualiza o estado.
            onChanged: (v) => setState(() => _email = v),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: (_valido && !_enviando) ? _enviar : null,
            child: _enviando
                ? const CircularProgressIndicator()
                : const Text('Enviar'),
          ),
        ],
      ),
    );
  }
}`} />

      <p>
        Note três detalhes importantes: o <code>dispose</code> libera o controller quando o widget some; o <code>if (!mounted) return</code> evita erro caso o widget tenha sido removido durante o <code>await</code>; o botão fica desabilitado (<code>onPressed: null</code>) quando inválido ou enviando.
      </p>

      <AlertBox type="info" title="O que dispara rebuild">
        Mudar uma variável SEM chamar <code>setState</code> não atualiza a tela. O Flutter não tem reatividade mágica como Vue ou MobX — você precisa avisar explicitamente.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Mudar variável sem setState:</strong> <code>_contador++</code> sozinho não faz nada na tela. Sempre envolva em <code>setState(() {})</code>.</li>
        <li><strong>setState durante o build:</strong> chamar setState dentro do método <code>build</code> (ou diretamente em um <code>build</code> de filho) lança erro. setState pertence a callbacks (onPressed, onChanged, listeners).</li>
        <li><strong>setState após dispose:</strong> se o widget já saiu da tela e o setState dispara (de um Future, Timer, Stream), explode. Sempre cheque <code>if (!mounted) return;</code> antes.</li>
        <li><strong>Usar setState para estado global:</strong> compartilhar dados entre telas via setState exige callbacks aninhados — vira pesadelo. Mude para Provider/Riverpod.</li>
        <li><strong>setState com função vazia:</strong> <code>setState(() {})</code> sem alterar nada ainda dispara rebuild. Às vezes é necessário (forçar refresh), mas geralmente é sintoma de código mal estruturado.</li>
      </ul>

      <AlertBox type="warning" title="setState só dentro de State">
        <code>setState</code> é um método da classe <code>State</code>. Não tem como chamar de fora — se um widget pai precisa "forçar" o filho a redesenhar, ele deve passar dados novos via construtor (e o filho usar <code>didUpdateWidget</code> ou simplesmente reler <code>widget.x</code>).
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Mantenha o conteúdo do <code>setState(() {})</code> curto: só as atribuições. Lógica pesada vai antes ou depois.</li>
          <li>Sempre faça <code>dispose</code> de controllers, animações, timers e streams.</li>
          <li>Use <code>const</code> nos sub-widgets que não mudam: economiza rebuilds.</li>
          <li>Se o estado começa a vazar para outros widgets (precisa passar callbacks por 3+ níveis), chegou a hora de adotar um state manager.</li>
          <li>Para formulários complexos, considere o widget <code>Form</code> + <code>TextFormField</code> + validators em vez de gerenciar tudo na mão.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Quando o estado precisa ser compartilhado entre telas ou viver mais que um widget, é hora de subir um nível. Veja <strong>InheritedWidget</strong> (mecanismo base), <strong>Provider</strong> (simples e oficial) e <strong>Riverpod</strong> (mais moderno).
      </p>

      <AlertBox type="success" title="Resumo">
        setState é a porta de entrada e resolve muito mais coisa do que parece. Aprenda bem antes de migrar para soluções mais complexas.
      </AlertBox>
    </PageContainer>
  );
}
