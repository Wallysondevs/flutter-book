import{j as e}from"./index-D9yRYXwO.js";import{P as a,A as o,C as r}from"./AlertBox-B2Rl5ETq.js";function s(){return e.jsxs(a,{title:"Forms & Validação",subtitle:"Form, TextFormField, validators e GlobalKey — entrada de dados sem dor.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quase todo app pede dados ao usuário: login, cadastro, busca, formulário de pedido. E entrada de dado é onde aparecem os bugs mais frustrantes — campo vazio que passa, email inválido aceito, vírgula em vez de ponto no preço. O Flutter dá um conjunto coeso de widgets (",e.jsx("code",{children:"Form"}),", ",e.jsx("code",{children:"TextFormField"}),", ",e.jsx("code",{children:"FormState"}),") para resolver isso de forma ",e.jsx("strong",{children:"declarativa"}),", sem espalhar ",e.jsx("code",{children:"if"}),"s pela UI."]}),e.jsx("h2",{children:"O conceito"}),e.jsx("p",{children:"Três peças trabalham juntas:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"Form"})}),": agrupa campos. Você dá um ",e.jsx("code",{children:"GlobalKey<FormState>"})," para conseguir validar e salvar todos de uma vez."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"TextFormField"})}),': versão "form-aware" do ',e.jsx("code",{children:"TextField"}),". Aceita um ",e.jsx("code",{children:"validator"})," (função que devolve ",e.jsx("code",{children:"String?"}),") e participa do ciclo do ",e.jsx("code",{children:"Form"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"TextEditingController"})}),": opcional, dá leitura/escrita programática do texto. Quando usar, lembre de chamar ",e.jsx("code",{children:"dispose()"}),"."]})]}),e.jsxs(o,{type:"info",title:"Validator devolve null = válido",children:["A regra é simples: a função ",e.jsx("code",{children:"validator"})," retorna ",e.jsx("code",{children:"null"})," quando está tudo certo, ou uma ",e.jsx("code",{children:"String"})," com a mensagem de erro a exibir."]}),e.jsx("h2",{children:"Como Flutter/Dart faz"}),e.jsx(r,{title:"formulário mínimo",code:`class LoginForm extends StatefulWidget {
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
}`}),e.jsx("h2",{children:"Exemplo prático: cadastro com validações reais"}),e.jsxs("p",{children:["Em produção, validação é mais rica: confirmar senha, verificar formato de telefone, validar enquanto digita. Use ",e.jsx("code",{children:"autovalidateMode"})," para feedback imediato."]}),e.jsx(r,{title:"lib/ui/cadastro_form.dart",code:`class CadastroForm extends StatefulWidget {
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

  static final _emailRegex = RegExp(r'^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$');

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
          SnackBar(content: Text('Falhou: $e')),
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
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"dispose()"})," dos controllers"]}),": vazamento de memória clássico."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Validar só no botão"}),": o usuário precisa de feedback enquanto digita — use ",e.jsx("code",{children:"autovalidateMode"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Não fazer ",e.jsx("code",{children:"trim()"})]}),": espaço no fim do email passa pela validação e quebra no servidor."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"mounted"})," após ",e.jsx("code",{children:"await"})]}),": usar ",e.jsx("code",{children:"setState"})," em widget já desmontado dá warning ou crash."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Misturar ",e.jsx("code",{children:"TextField"})," com ",e.jsx("code",{children:"Form"})]}),": ",e.jsx("code",{children:"TextField"})," não participa do ciclo. Use ",e.jsx("code",{children:"TextFormField"}),"."]})]}),e.jsx(o,{type:"warning",title:"Não confie só na validação do cliente",children:"Sempre valide de novo no servidor. Validação no cliente é UX, segurança é só no backend."}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(o,{type:"tip",title:"Padrões úteis",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Centralize regras de validação em uma classe ",e.jsx("code",{children:"Validators"})," reutilizável."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"FocusNode"})," + ",e.jsx("code",{children:"textInputAction: TextInputAction.next"}),' para pular entre campos com a tecla "próximo" do teclado.']}),e.jsxs("li",{children:["Para formulários muito grandes ou dinâmicos, considere ",e.jsx("code",{children:"flutter_form_builder"})," ou ",e.jsx("code",{children:"reactive_forms"}),"."]}),e.jsx("li",{children:"Sempre desabilite o botão durante o envio para evitar duplo clique."}),e.jsxs("li",{children:['Mostre erros de servidor (ex.: "email já cadastrado") em ',e.jsx("code",{children:"SnackBar"})," ou inline no campo."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Combine com o capítulo de ",e.jsx("strong",{children:"http"}),"/",e.jsx("strong",{children:"Dio"})," para enviar o formulário ao servidor e com ",e.jsx("strong",{children:"Navegação"})," para voltar à tela anterior em caso de sucesso."]}),e.jsx(o,{type:"success",title:"Você já consegue",children:"Construir formulários robustos, com validação amigável e tratamento de estado de envio — o suficiente para login, cadastro e qualquer fluxo de entrada de dados."})]})}export{s as default};
