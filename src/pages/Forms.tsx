import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Forms() {
  return (
    <PageContainer
      title="Forms & Validação"
      subtitle="Form, TextFormField, validators e GlobalKey — entrada de dados sem dor."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quase todo app pede dados ao usuário: login, cadastro, busca, formulário de pedido. E entrada de dado é onde aparecem os bugs mais frustrantes — campo vazio que passa, email inválido aceito, vírgula em vez de ponto no preço. O Flutter dá um conjunto coeso de widgets (<code>Form</code>, <code>TextFormField</code>, <code>FormState</code>) para resolver isso de forma <strong>declarativa</strong>, sem espalhar <code>if</code>s pela UI.
      </p>

      <h2>O conceito</h2>
      <p>
        Três peças trabalham juntas:
      </p>
      <ul>
        <li><strong><code>Form</code></strong>: agrupa campos. Você dá um <code>GlobalKey&lt;FormState&gt;</code> para conseguir validar e salvar todos de uma vez.</li>
        <li><strong><code>TextFormField</code></strong>: versão "form-aware" do <code>TextField</code>. Aceita um <code>validator</code> (função que devolve <code>String?</code>) e participa do ciclo do <code>Form</code>.</li>
        <li><strong><code>TextEditingController</code></strong>: opcional, dá leitura/escrita programática do texto. Quando usar, lembre de chamar <code>dispose()</code>.</li>
      </ul>

      <AlertBox type="info" title="Validator devolve null = válido">
        A regra é simples: a função <code>validator</code> retorna <code>null</code> quando está tudo certo, ou uma <code>String</code> com a mensagem de erro a exibir.
      </AlertBox>

      <h2>Como Flutter/Dart faz</h2>

      <CodeBlock title="formulário mínimo" code={`class LoginForm extends StatefulWidget {
  const LoginForm({super.key});
  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  // Chave para alcançar o estado interno do Form.
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _senha = TextEditingController();

  @override
  void dispose() {
    // SEMPRE: liberar controllers para evitar vazamento.
    _email.dispose();
    _senha.dispose();
    super.dispose();
  }

  void _enviar() {
    // Dispara todos os validators; se algum falhar, devolve false.
    if (_formKey.currentState!.validate()) {
      // Aqui é onde você chamaria a API.
      debugPrint('OK: \${_email.text}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _email,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(labelText: 'Email'),
            validator: (v) {
              if (v == null || v.isEmpty) return 'Informe o email';
              if (!v.contains('@')) return 'Email inválido';
              return null;
            },
          ),
          TextFormField(
            controller: _senha,
            obscureText: true,
            decoration: const InputDecoration(labelText: 'Senha'),
            validator: (v) =>
                (v == null || v.length < 6) ? 'Mínimo 6 caracteres' : null,
          ),
          const SizedBox(height: 16),
          ElevatedButton(onPressed: _enviar, child: const Text('Entrar')),
        ],
      ),
    );
  }
}`} />

      <h2>Exemplo prático: cadastro com validações reais</h2>
      <p>
        Em produção, validação é mais rica: confirmar senha, verificar formato de telefone, validar enquanto digita. Use <code>autovalidateMode</code> para feedback imediato.
      </p>

      <CodeBlock title="lib/ui/cadastro_form.dart" code={`class CadastroForm extends StatefulWidget {
  const CadastroForm({super.key});
  @override
  State<CadastroForm> createState() => _CadastroFormState();
}

class _CadastroFormState extends State<CadastroForm> {
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _senha = TextEditingController();
  final _confirmar = TextEditingController();
  bool _enviando = false;

  static final _emailRegex = RegExp(r'^[^@\\s]+@[^@\\s]+\\.[^@\\s]+\$');

  @override
  void dispose() {
    _email.dispose();
    _senha.dispose();
    _confirmar.dispose();
    super.dispose();
  }

  Future<void> _submeter() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _enviando = true);
    try {
      await context.read<AuthRepo>().cadastrar(
            email: _email.text.trim(),
            senha: _senha.text,
          );
      if (mounted) Navigator.pop(context);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Falhou: \$e')),
        );
      }
    } finally {
      if (mounted) setState(() => _enviando = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      child: Column(children: [
        TextFormField(
          controller: _email,
          decoration: const InputDecoration(labelText: 'Email'),
          validator: (v) {
            if (v == null || v.trim().isEmpty) return 'Obrigatório';
            if (!_emailRegex.hasMatch(v.trim())) return 'Email inválido';
            return null;
          },
        ),
        TextFormField(
          controller: _senha,
          obscureText: true,
          decoration: const InputDecoration(labelText: 'Senha'),
          validator: (v) =>
              (v == null || v.length < 8) ? 'Use pelo menos 8 caracteres' : null,
        ),
        TextFormField(
          controller: _confirmar,
          obscureText: true,
          decoration: const InputDecoration(labelText: 'Confirmar senha'),
          validator: (v) =>
              v != _senha.text ? 'Senhas não conferem' : null,
        ),
        const SizedBox(height: 16),
        ElevatedButton(
          onPressed: _enviando ? null : _submeter,
          child: _enviando
              ? const CircularProgressIndicator()
              : const Text('Criar conta'),
        ),
      ]),
    );
  }
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer <code>dispose()</code> dos controllers</strong>: vazamento de memória clássico.</li>
        <li><strong>Validar só no botão</strong>: o usuário precisa de feedback enquanto digita — use <code>autovalidateMode</code>.</li>
        <li><strong>Não fazer <code>trim()</code></strong>: espaço no fim do email passa pela validação e quebra no servidor.</li>
        <li><strong>Esquecer <code>mounted</code> após <code>await</code></strong>: usar <code>setState</code> em widget já desmontado dá warning ou crash.</li>
        <li><strong>Misturar <code>TextField</code> com <code>Form</code></strong>: <code>TextField</code> não participa do ciclo. Use <code>TextFormField</code>.</li>
      </ul>

      <AlertBox type="warning" title="Não confie só na validação do cliente">
        Sempre valide de novo no servidor. Validação no cliente é UX, segurança é só no backend.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Padrões úteis">
        <ul>
          <li>Centralize regras de validação em uma classe <code>Validators</code> reutilizável.</li>
          <li>Use <code>FocusNode</code> + <code>textInputAction: TextInputAction.next</code> para pular entre campos com a tecla "próximo" do teclado.</li>
          <li>Para formulários muito grandes ou dinâmicos, considere <code>flutter_form_builder</code> ou <code>reactive_forms</code>.</li>
          <li>Sempre desabilite o botão durante o envio para evitar duplo clique.</li>
          <li>Mostre erros de servidor (ex.: "email já cadastrado") em <code>SnackBar</code> ou inline no campo.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Combine com o capítulo de <strong>http</strong>/<strong>Dio</strong> para enviar o formulário ao servidor e com <strong>Navegação</strong> para voltar à tela anterior em caso de sucesso.
      </p>

      <AlertBox type="success" title="Você já consegue">
        Construir formulários robustos, com validação amigável e tratamento de estado de envio — o suficiente para login, cadastro e qualquer fluxo de entrada de dados.
      </AlertBox>
    </PageContainer>
  );
}
