import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Keys() {
  return (
    <PageContainer
      title="Keys"
      subtitle="Como o Flutter identifica widgets entre rebuilds — e por que listas reordenáveis precisam delas."
      difficulty="avancado"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Você fez uma lista de checkboxes com estado interno. Reordena os itens e... os checks marcam os errados. Você inseriu um item no topo e o scroll/animação do item antigo "viajou" para outro lugar. Esses bugs são quase sempre <strong>falta de Key</strong>.
      </p>

      <h2>O conceito</h2>
      <p>
        No diff entre rebuilds, o Flutter pergunta para cada filho: "esse Element velho serve para esse widget novo?". A resposta padrão é sim, se o <strong>tipo</strong> e a <strong>posição</strong> baterem. Em listas com filhos do mesmo tipo, a posição muda quando você reordena/insere/remove — e o Flutter casa o Element errado com o widget errado.
      </p>
      <p>
        <strong>Key</strong> é uma identidade extra que você dá ao widget. Quando bate o tipo + a key, o Flutter sabe: "esse Element pertence a esse widget, mesmo que tenha mudado de posição".
      </p>

      <AlertBox type="info" title="Quando NÃO precisa de Key">
        Para a maioria dos widgets (filhos únicos, posições fixas), o Flutter resolve sozinho. Só fica obrigatória em <strong>listas de StatefulWidgets do mesmo tipo</strong> que podem reordenar/remover.
      </AlertBox>

      <h2>O bug clássico</h2>
      <CodeBlock title="Sem key — estado embaralha" code={`// Cada Tile guarda 'marcado' internamente (StatefulWidget)
Column(
  children: tarefas.map((t) => Tile(texto: t.texto)).toList(),
)

// Você remove o primeiro item da lista 'tarefas' e chama setState.
// Resultado: o Element do antigo Tile #1 (com marcado=true)
// é reusado para o novo Tile #1 (que era o #2). O check fica
// no item errado.`} />

      <CodeBlock title="Com ValueKey — Flutter casa pelo id" code={`Column(
  children: tarefas
      .map((t) => Tile(key: ValueKey(t.id), texto: t.texto))
      .toList(),
)

// Agora o Element segue a key. O Tile do id=42 leva
// seu State junto, mesmo se mudar de posição.`} />

      <h2>Tipos de Key</h2>
      <ul>
        <li><strong><code>ValueKey(valor)</code></strong> — compara por <code>==</code>. Use o id do dado (string, int). É a mais comum.</li>
        <li><strong><code>ObjectKey(obj)</code></strong> — compara pela identidade do objeto. Útil quando o objeto inteiro é a "chave".</li>
        <li><strong><code>UniqueKey()</code></strong> — sempre diferente. Força o Flutter a criar tudo do zero. Use só quando quer <em>garantir</em> que o State seja descartado.</li>
        <li><strong><code>GlobalKey&lt;T&gt;()</code></strong> — chave global que dá acesso ao <code>State</code>, ao <code>BuildContext</code> ou ao <code>Element</code> de qualquer lugar do app. Poderosa, cara e perigosa.</li>
        <li><strong><code>PageStorageKey(valor)</code></strong> — preserva o offset de scroll por chave (útil em abas).</li>
      </ul>

      <h2>Exemplo prático: lista reordenável</h2>
      <CodeBlock title="lib/screens/lista_tarefas.dart" code={`class ListaTarefas extends StatefulWidget {
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
}`} />

      <h2>Quando usar GlobalKey</h2>
      <CodeBlock title="Acessar Form de fora" code={`final _formKey = GlobalKey<FormState>();

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
)`} />

      <p>
        <code>GlobalKey</code> é a saída quando você precisa do <code>State</code> "do lado de fora" — Form, Scaffold (para abrir Drawer), AnimatedList. Mas use com moderação: cada GlobalKey custa, e abusar dela costuma esconder uma arquitetura mal pensada.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Usar <code>UniqueKey</code> em lista — força recriação <em>a cada rebuild</em>, perdendo todo o estado de scroll, animações e foco.</li>
        <li>Key em widget <code>const</code>: você joga fora a otimização do <code>const</code>. Pense bem se precisa.</li>
        <li>Mesma <code>ValueKey</code> repetida em filhos do mesmo pai. O Flutter avisa, mas o comportamento fica imprevisível.</li>
        <li>Esperar que <code>GlobalKey</code> resolva problemas de comunicação entre widgets distantes. Provider/Riverpod fazem isso melhor.</li>
      </ul>

      <AlertBox type="warning" title="Sintoma de Key faltando">
        Estado interno (check marcado, scroll, animação meio rodada) "pula" para outro item depois de reordenar/inserir/remover. Adicione <code>ValueKey(id)</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        Comece sem Key. Se um teste reordenar/remover falhar visualmente, então adicione <code>ValueKey</code> baseada no id estável do seu dado.
      </AlertBox>
      <ul>
        <li>Use o id do banco/modelo, não o índice da lista.</li>
        <li>Reserve <code>GlobalKey</code> para Form, AnimatedList, Scaffold.messenger e raros casos.</li>
        <li>Evite criar GlobalKeys novas dentro do <code>build</code> — instancie como campo do State.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Com keys você domina a identidade dos widgets em listas. A seguir, fundamentos de <strong>layout</strong>: <code>Container</code>, <code>Row</code>, <code>Column</code>.
      </p>
      <AlertBox type="success" title="Resumo">
        Mesmo tipo + mesma posição = mesmo Element. Quebrou a posição? Use <code>ValueKey(id)</code> e o estado segue o widget.
      </AlertBox>
    </PageContainer>
  );
}
