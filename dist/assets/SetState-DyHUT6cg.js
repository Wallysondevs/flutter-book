import{j as e}from"./index-D4AOhXGO.js";import{P as t,C as o,A as a}from"./AlertBox-Dyf2wdSA.js";function i(){return e.jsxs(t,{title:"setState",subtitle:"O gerenciamento de estado nativo do Flutter — perfeito para estado local de um widget.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Toda interface que reage ao usuário precisa de ",e.jsx("strong",{children:"estado"}),": o texto digitado em um campo, se um switch está ligado, qual aba está ativa, o número de cliques. No Flutter, a forma mais simples (e oficial) de manter esse estado dentro de um widget é o ",e.jsx("code",{children:"setState"}),"."]}),e.jsxs("p",{children:["Antes de partir para Provider, Riverpod ou BLoC, você precisa dominar ",e.jsx("code",{children:"setState"}),'. Ele é a base mental de "mudança de estado dispara rebuild" — conceito que se repete em todas as soluções mais avançadas.']}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Quando um widget pode mudar com o tempo, ele é um ",e.jsx("code",{children:"StatefulWidget"}),". Esse widget tem uma classe ",e.jsx("code",{children:"State"})," companheira que guarda os dados mutáveis e contém o método ",e.jsx("code",{children:"build"}),"."]}),e.jsxs("p",{children:[e.jsx("code",{children:"setState"})," é uma chamada ao framework: ",e.jsx("em",{children:'"olha, eu mudei alguma coisa que afeta a UI, por favor chame meu build de novo"'}),". O Flutter então reconstrói o widget e atualiza só o que mudou na tela (graças ao mecanismo de diff da árvore de elements)."]}),e.jsxs("p",{children:["Use ",e.jsx("code",{children:"setState"})," para estado ",e.jsx("strong",{children:"local"}),": aquele que pertence a um widget só e não precisa ser visto por outras telas. Para estado compartilhado entre páginas, use Provider/Riverpod/BLoC."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(o,{title:"estrutura básica",code:`class Favorito extends StatefulWidget {
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
}`}),e.jsxs("p",{children:["O ciclo é: usuário toca → ",e.jsx("code",{children:"_alternar"})," chama ",e.jsx("code",{children:"setState"})," → Flutter agenda rebuild → ",e.jsx("code",{children:"build"})," roda de novo com ",e.jsx("code",{children:"_favoritado = true"})," → ícone vira coração cheio vermelho."]}),e.jsx("h2",{children:"Exemplo prático: formulário com validação local"}),e.jsx("p",{children:"Um caso real bem comum: um campo de email com botão habilitado só quando o email tem formato válido."}),e.jsx(o,{title:"lib/email_form.dart",code:`import 'package:flutter/material.dart';

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
      SnackBar(content: Text('Enviado para $_email')),
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
}`}),e.jsxs("p",{children:["Note três detalhes importantes: o ",e.jsx("code",{children:"dispose"})," libera o controller quando o widget some; o ",e.jsx("code",{children:"if (!mounted) return"})," evita erro caso o widget tenha sido removido durante o ",e.jsx("code",{children:"await"}),"; o botão fica desabilitado (",e.jsx("code",{children:"onPressed: null"}),") quando inválido ou enviando."]}),e.jsxs(a,{type:"info",title:"O que dispara rebuild",children:["Mudar uma variável SEM chamar ",e.jsx("code",{children:"setState"})," não atualiza a tela. O Flutter não tem reatividade mágica como Vue ou MobX — você precisa avisar explicitamente."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Mudar variável sem setState:"})," ",e.jsx("code",{children:"_contador++"})," sozinho não faz nada na tela. Sempre envolva em ",e.jsxs("code",{children:["setState(() ",")"]}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"setState durante o build:"})," chamar setState dentro do método ",e.jsx("code",{children:"build"})," (ou diretamente em um ",e.jsx("code",{children:"build"})," de filho) lança erro. setState pertence a callbacks (onPressed, onChanged, listeners)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"setState após dispose:"})," se o widget já saiu da tela e o setState dispara (de um Future, Timer, Stream), explode. Sempre cheque ",e.jsx("code",{children:"if (!mounted) return;"})," antes."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Usar setState para estado global:"})," compartilhar dados entre telas via setState exige callbacks aninhados — vira pesadelo. Mude para Provider/Riverpod."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"setState com função vazia:"})," ",e.jsxs("code",{children:["setState(() ",")"]})," sem alterar nada ainda dispara rebuild. Às vezes é necessário (forçar refresh), mas geralmente é sintoma de código mal estruturado."]})]}),e.jsxs(a,{type:"warning",title:"setState só dentro de State",children:[e.jsx("code",{children:"setState"})," é um método da classe ",e.jsx("code",{children:"State"}),'. Não tem como chamar de fora — se um widget pai precisa "forçar" o filho a redesenhar, ele deve passar dados novos via construtor (e o filho usar ',e.jsx("code",{children:"didUpdateWidget"})," ou simplesmente reler ",e.jsx("code",{children:"widget.x"}),")."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(a,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Mantenha o conteúdo do ",e.jsxs("code",{children:["setState(() ",")"]})," curto: só as atribuições. Lógica pesada vai antes ou depois."]}),e.jsxs("li",{children:["Sempre faça ",e.jsx("code",{children:"dispose"})," de controllers, animações, timers e streams."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"const"})," nos sub-widgets que não mudam: economiza rebuilds."]}),e.jsx("li",{children:"Se o estado começa a vazar para outros widgets (precisa passar callbacks por 3+ níveis), chegou a hora de adotar um state manager."}),e.jsxs("li",{children:["Para formulários complexos, considere o widget ",e.jsx("code",{children:"Form"})," + ",e.jsx("code",{children:"TextFormField"})," + validators em vez de gerenciar tudo na mão."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Quando o estado precisa ser compartilhado entre telas ou viver mais que um widget, é hora de subir um nível. Veja ",e.jsx("strong",{children:"InheritedWidget"})," (mecanismo base), ",e.jsx("strong",{children:"Provider"})," (simples e oficial) e ",e.jsx("strong",{children:"Riverpod"})," (mais moderno)."]}),e.jsx(a,{type:"success",title:"Resumo",children:"setState é a porta de entrada e resolve muito mais coisa do que parece. Aprenda bem antes de migrar para soluções mais complexas."})]})}export{i as default};
