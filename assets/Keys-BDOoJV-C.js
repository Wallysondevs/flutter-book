import{j as e}from"./index-D9yRYXwO.js";import{P as s,A as o,C as a}from"./AlertBox-B2Rl5ETq.js";function t(){return e.jsxs(s,{title:"Keys",subtitle:"Como o Flutter identifica widgets entre rebuilds — e por que listas reordenáveis precisam delas.",difficulty:"avancado",timeToRead:"12 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['Você fez uma lista de checkboxes com estado interno. Reordena os itens e... os checks marcam os errados. Você inseriu um item no topo e o scroll/animação do item antigo "viajou" para outro lugar. Esses bugs são quase sempre ',e.jsx("strong",{children:"falta de Key"}),"."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:['No diff entre rebuilds, o Flutter pergunta para cada filho: "esse Element velho serve para esse widget novo?". A resposta padrão é sim, se o ',e.jsx("strong",{children:"tipo"})," e a ",e.jsx("strong",{children:"posição"})," baterem. Em listas com filhos do mesmo tipo, a posição muda quando você reordena/insere/remove — e o Flutter casa o Element errado com o widget errado."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Key"}),' é uma identidade extra que você dá ao widget. Quando bate o tipo + a key, o Flutter sabe: "esse Element pertence a esse widget, mesmo que tenha mudado de posição".']}),e.jsxs(o,{type:"info",title:"Quando NÃO precisa de Key",children:["Para a maioria dos widgets (filhos únicos, posições fixas), o Flutter resolve sozinho. Só fica obrigatória em ",e.jsx("strong",{children:"listas de StatefulWidgets do mesmo tipo"})," que podem reordenar/remover."]}),e.jsx("h2",{children:"O bug clássico"}),e.jsx(a,{title:"Sem key — estado embaralha",code:`// Cada Tile guarda 'marcado' internamente (StatefulWidget)
Column(
  children: tarefas.map((t) => Tile(texto: t.texto)).toList(),
)

// Você remove o primeiro item da lista 'tarefas' e chama setState.
// Resultado: o Element do antigo Tile #1 (com marcado=true)
// é reusado para o novo Tile #1 (que era o #2). O check fica
// no item errado.`}),e.jsx(a,{title:"Com ValueKey — Flutter casa pelo id",code:`Column(
  children: tarefas
      .map((t) => Tile(key: ValueKey(t.id), texto: t.texto))
      .toList(),
)

// Agora o Element segue a key. O Tile do id=42 leva
// seu State junto, mesmo se mudar de posição.`}),e.jsx("h2",{children:"Tipos de Key"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"ValueKey(valor)"})})," — compara por ",e.jsx("code",{children:"=="}),". Use o id do dado (string, int). É a mais comum."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"ObjectKey(obj)"})}),' — compara pela identidade do objeto. Útil quando o objeto inteiro é a "chave".']}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"UniqueKey()"})})," — sempre diferente. Força o Flutter a criar tudo do zero. Use só quando quer ",e.jsx("em",{children:"garantir"})," que o State seja descartado."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"GlobalKey<T>()"})})," — chave global que dá acesso ao ",e.jsx("code",{children:"State"}),", ao ",e.jsx("code",{children:"BuildContext"})," ou ao ",e.jsx("code",{children:"Element"})," de qualquer lugar do app. Poderosa, cara e perigosa."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"PageStorageKey(valor)"})})," — preserva o offset de scroll por chave (útil em abas)."]})]}),e.jsx("h2",{children:"Exemplo prático: lista reordenável"}),e.jsx(a,{title:"lib/screens/lista_tarefas.dart",code:`class ListaTarefas extends StatefulWidget {
  const ListaTarefas({super.key});
  @override
  State<ListaTarefas> createState() => _ListaTarefasState();
}

class _ListaTarefasState extends State<ListaTarefas> {
  final List<Tarefa> tarefas = [
    Tarefa(id: 'a', texto: 'Estudar Dart'),
    Tarefa(id: 'b', texto: 'Café'),
    Tarefa(id: 'c', texto: 'Build app'),
  ];

  @override
  Widget build(BuildContext context) {
    return ReorderableListView(
      onReorder: (oldI, newI) => setState(() {
        if (newI > oldI) newI--;
        tarefas.insert(newI, tarefas.removeAt(oldI));
      }),
      children: [
        for (final t in tarefas)
          // ValueKey é OBRIGATÓRIA aqui
          ListTile(
            key: ValueKey(t.id),
            title: Text(t.texto),
            trailing: const Icon(Icons.drag_handle),
          ),
      ],
    );
  }
}`}),e.jsx("h2",{children:"Quando usar GlobalKey"}),e.jsx(a,{title:"Acessar Form de fora",code:`final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: Column(/* ...campos... */),
)

ElevatedButton(
  onPressed: () {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
    }
  },
  child: const Text('Enviar'),
)`}),e.jsxs("p",{children:[e.jsx("code",{children:"GlobalKey"})," é a saída quando você precisa do ",e.jsx("code",{children:"State"}),' "do lado de fora" — Form, Scaffold (para abrir Drawer), AnimatedList. Mas use com moderação: cada GlobalKey custa, e abusar dela costuma esconder uma arquitetura mal pensada.']}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Usar ",e.jsx("code",{children:"UniqueKey"})," em lista — força recriação ",e.jsx("em",{children:"a cada rebuild"}),", perdendo todo o estado de scroll, animações e foco."]}),e.jsxs("li",{children:["Key em widget ",e.jsx("code",{children:"const"}),": você joga fora a otimização do ",e.jsx("code",{children:"const"}),". Pense bem se precisa."]}),e.jsxs("li",{children:["Mesma ",e.jsx("code",{children:"ValueKey"})," repetida em filhos do mesmo pai. O Flutter avisa, mas o comportamento fica imprevisível."]}),e.jsxs("li",{children:["Esperar que ",e.jsx("code",{children:"GlobalKey"})," resolva problemas de comunicação entre widgets distantes. Provider/Riverpod fazem isso melhor."]})]}),e.jsxs(o,{type:"warning",title:"Sintoma de Key faltando",children:['Estado interno (check marcado, scroll, animação meio rodada) "pula" para outro item depois de reordenar/inserir/remover. Adicione ',e.jsx("code",{children:"ValueKey(id)"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs(o,{type:"tip",children:["Comece sem Key. Se um teste reordenar/remover falhar visualmente, então adicione ",e.jsx("code",{children:"ValueKey"})," baseada no id estável do seu dado."]}),e.jsxs("ul",{children:[e.jsx("li",{children:"Use o id do banco/modelo, não o índice da lista."}),e.jsxs("li",{children:["Reserve ",e.jsx("code",{children:"GlobalKey"})," para Form, AnimatedList, Scaffold.messenger e raros casos."]}),e.jsxs("li",{children:["Evite criar GlobalKeys novas dentro do ",e.jsx("code",{children:"build"})," — instancie como campo do State."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com keys você domina a identidade dos widgets em listas. A seguir, fundamentos de ",e.jsx("strong",{children:"layout"}),": ",e.jsx("code",{children:"Container"}),", ",e.jsx("code",{children:"Row"}),", ",e.jsx("code",{children:"Column"}),"."]}),e.jsxs(o,{type:"success",title:"Resumo",children:["Mesmo tipo + mesma posição = mesmo Element. Quebrou a posição? Use ",e.jsx("code",{children:"ValueKey(id)"})," e o estado segue o widget."]})]})}export{t as default};
