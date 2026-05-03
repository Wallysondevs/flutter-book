import{j as e}from"./index-D9yRYXwO.js";import{P as a,C as i,A as s}from"./AlertBox-B2Rl5ETq.js";function d(){return e.jsxs(a,{title:"StatefulWidget",subtitle:"Widgets que guardam estado mutável — contadores, formulários, animações.",difficulty:"iniciante",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Toda vez que sua tela precisa ",e.jsx("strong",{children:"mudar sozinha"})," em resposta a uma interação, um timer ou um dado da rede, você precisa de estado. Sem ",e.jsx("code",{children:"StatefulWidget"})," (ou um state manager por cima), seu app é só uma imagem parada."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um ",e.jsx("code",{children:"StatefulWidget"})," é dividido em ",e.jsx("strong",{children:"duas classes"}),":"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["A classe do ",e.jsx("strong",{children:"widget"})," — imutável, configura."]}),e.jsxs("li",{children:["A classe do ",e.jsx("strong",{children:"State"})," — mutável, sobrevive a rebuilds e guarda os dados."]})]}),e.jsxs("p",{children:["O Flutter destrói e recria o widget livremente, mas o ",e.jsx("code",{children:"State"})," persiste enquanto aquela posição na árvore continuar existindo. Você muda os campos do State e chama ",e.jsx("code",{children:"setState"}),' para avisar: "redesenha esse trecho".']}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(i,{title:"Estrutura completa",code:`import 'package:flutter/material.dart';

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
        Text('Cliques: $_n', style: const TextStyle(fontSize: 24)),
        ElevatedButton(
          onPressed: _incrementar,
          child: const Text('+1'),
        ),
      ],
    );
  }
}`}),e.jsxs(s,{type:"info",title:"O underline (_) não é estilo",children:["Em Dart, identificadores começando com ",e.jsx("code",{children:"_"})," são ",e.jsx("strong",{children:"privados ao arquivo"}),". Por isso ",e.jsx("code",{children:"_ContadorState"})," e ",e.jsx("code",{children:"_n"})," ficam invisíveis fora desse ",e.jsx("code",{children:".dart"}),"."]}),e.jsx("h2",{children:"O ciclo de vida"}),e.jsx("p",{children:"O State tem métodos chamados em momentos específicos. Conhecer eles evita bugs:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"initState()"})," — uma única vez, quando o State é criado. Inicialize controllers, faça subscrições, dispare o primeiro fetch."]}),e.jsxs("li",{children:[e.jsx("code",{children:"didChangeDependencies()"})," — após initState e sempre que um ",e.jsx("code",{children:"InheritedWidget"})," de cima mudar. Bom para recarregar dependências."]}),e.jsxs("li",{children:[e.jsx("code",{children:"build()"})," — toda vez que reconstrói (setState, mudança do pai, mudança de tema...). Mantenha rápido e puro."]}),e.jsxs("li",{children:[e.jsx("code",{children:"didUpdateWidget(old)"})," — quando o pai recria o widget com parâmetros novos. Compare e reaja."]}),e.jsxs("li",{children:[e.jsx("code",{children:"dispose()"})," — antes do State ser destruído. ",e.jsx("strong",{children:"Sempre"})," libere controllers, streams, timers aqui."]})]}),e.jsx("h2",{children:"Exemplo prático"}),e.jsx("p",{children:"Campo de busca com debounce e limpeza correta de recursos:"}),e.jsx(i,{title:"lib/widgets/busca.dart",code:`import 'dart:async';
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
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Chamar ",e.jsx("code",{children:"setState"})," dentro do ",e.jsx("code",{children:"build()"}),". Loop infinito garantido — nunca faça isso."]}),e.jsxs("li",{children:["Esquecer ",e.jsx("code",{children:"dispose"})," de ",e.jsx("code",{children:"TextEditingController"}),", ",e.jsx("code",{children:"AnimationController"}),", ",e.jsx("code",{children:"StreamSubscription"}),", ",e.jsx("code",{children:"Timer"}),". Vaza memória e pode quebrar testes."]}),e.jsxs("li",{children:["Chamar ",e.jsx("code",{children:"setState"})," depois do widget ser desmontado (ex: callback de async). Verifique ",e.jsx("code",{children:"if (!mounted) return;"}),"."]}),e.jsxs("li",{children:["Modificar variáveis sem ",e.jsx("code",{children:"setState"}),". Os dados mudam, mas a UI não — você jura que não funciona, mas o framework não sabe que precisa redesenhar."]}),e.jsxs("li",{children:["Inicializar valor que depende do ",e.jsx("code",{children:"context"})," direto na declaração. Use ",e.jsx("code",{children:"didChangeDependencies"})," ou ",e.jsx("code",{children:"initState"})," com ",e.jsx("code",{children:"WidgetsBinding.instance.addPostFrameCallback"}),"."]})]}),e.jsxs(s,{type:"danger",title:"setState após dispose",children:["Se uma chamada async termina depois da tela fechar, ",e.jsx("code",{children:"setState"})," joga exceção. Sempre cheque ",e.jsx("code",{children:"if (mounted)"})," antes."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(s,{type:"tip",children:["Mantenha o State ",e.jsx("strong",{children:"pequeno e local"}),". Estado que precisa ser compartilhado entre telas é trabalho de ",e.jsx("code",{children:"Provider"}),", ",e.jsx("code",{children:"Riverpod"})," ou ",e.jsx("code",{children:"Bloc"})," — não de StatefulWidget."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Prefixe membros privados com ",e.jsx("code",{children:"_"}),". Facilita refatorar sem quebrar quem importa."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"const"})," nos filhos do ",e.jsx("code",{children:"build"})," sempre que possível."]}),e.jsxs("li",{children:["Acesse o widget pai com ",e.jsx("code",{children:"widget.algumCampo"})," — útil para parâmetros que não devem virar estado."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Você já sabe redesenhar pedaços da tela. Em seguida vamos entender a ",e.jsx("em",{children:"árvore de widgets"})," que o Flutter monta por baixo desse ",e.jsx("code",{children:"build"}),"."]}),e.jsx(s,{type:"success",title:"Marco",children:"Domínio de StatelessWidget + StatefulWidget já cobre 80% das UIs do dia a dia."})]})}export{d as default};
