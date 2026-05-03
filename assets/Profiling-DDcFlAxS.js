import{j as e}from"./index-D9yRYXwO.js";import{P as r,C as s,A as o}from"./AlertBox-B2Rl5ETq.js";function t(){return e.jsxs(r,{title:"Profiling",subtitle:"Encontre gargalos de CPU, GPU e memória usando o modo profile.",difficulty:"avancado",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['"Está lento" não é diagnóstico. ',e.jsx("em",{children:"Onde"}),' está lento? CPU construindo widgets? GPU compondo camadas? Esperando I/O da rede? Sem profile, qualquer "otimização" é chute. Profilar dá números — frames por segundo, microssegundos por função, MB de memória.']}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["O Flutter tem três ",e.jsx("strong",{children:"build modes"}),":"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Debug"})," — JIT, asserts ligados, hot reload, tudo lento. Nunca tire conclusões aqui."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Profile"})," — AOT (rápido como release) mas com instrumentação habilitada. ",e.jsx("em",{children:"Esta"})," é a hora de medir."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Release"})," — AOT puro, sem instrumentação. Tamanho e velocidade finais."]})]}),e.jsxs("p",{children:["A meta clássica é ",e.jsx("strong",{children:"60fps"}),": cada frame tem 16.6ms para rodar. Em telas de 90/120Hz, são 11ms ou 8ms. Frames acima disso são",e.jsx("em",{children:"jank"}),": a animação engasga."]}),e.jsx("h2",{children:"Como o Flutter faz"}),e.jsx("p",{children:"Rode em profile mode em device físico (não emulador!) e abra o DevTools para gravar timelines."}),e.jsx(s,{title:"iniciar profile",code:`# Lista devices disponíveis
flutter devices

# Profile em device físico
flutter run --profile -d <id-do-device>

# Em release (números finais, sem dev tools)
flutter run --release`}),e.jsx("h2",{children:"Exemplo prático: dois tipos de jank"}),e.jsxs("p",{children:["Existem ",e.jsx("strong",{children:"UI jank"})," (thread Dart sobrecarregada, geralmente",e.jsx("code",{children:"build"})," custoso) e ",e.jsx("strong",{children:"raster jank"})," (GPU sofrendo para compor). DevTools mostra os dois separados."]}),e.jsx(s,{title:"código com jank de UI",code:`// RUIM: filtra lista enorme dentro do build
class TelaProdutos extends StatelessWidget {
  final List<Produto> todos;
  const TelaProdutos({super.key, required this.todos});

  @override
  Widget build(BuildContext context) {
    final filtrados = todos
        .where((p) => p.preco > 100)
        .toList()
      ..sort((a, b) => a.nome.compareTo(b.nome));

    return ListView.builder(
      itemCount: filtrados.length,
      itemBuilder: (_, i) => Text(filtrados[i].nome),
    );
  }
}`}),e.jsx(s,{title:"versão otimizada",code:`// BOM: cálculo fora do build, ou em isolate se for pesado
class TelaProdutos extends StatefulWidget {
  final List<Produto> todos;
  const TelaProdutos({super.key, required this.todos});

  @override
  State<TelaProdutos> createState() => _TelaProdutosState();
}

class _TelaProdutosState extends State<TelaProdutos> {
  late final List<Produto> _filtrados;

  @override
  void initState() {
    super.initState();
    _filtrados = widget.todos
        .where((p) => p.preco > 100)
        .toList()
      ..sort((a, b) => a.nome.compareTo(b.nome));
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: _filtrados.length,
      itemBuilder: (_, i) => Text(_filtrados[i].nome),
    );
  }
}`}),e.jsxs("p",{children:["Para listas que processam milhares de itens, mova o trabalho para um",e.jsx("code",{children:"Isolate"})," com ",e.jsx("code",{children:"compute()"})," — isso libera a thread principal."]}),e.jsx(s,{title:"usando isolate",code:`import 'package:flutter/foundation.dart';

List<Produto> _filtrar(List<Produto> entrada) {
  return entrada
      .where((p) => p.preco > 100)
      .toList()
    ..sort((a, b) => a.nome.compareTo(b.nome));
}

// Roda fora da thread principal — UI continua suave
final filtrados = await compute(_filtrar, todos);`}),e.jsx("h2",{children:"Métricas que importam"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Build duration"})," — tempo gasto rodando widgets ",e.jsx("code",{children:"build()"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Layout duration"})," — cálculo de tamanho/posição."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Raster duration"})," — tempo da GPU compondo a cena."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Missed frames"})," — quantos passaram do orçamento."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Heap size"})," — memória Dart usada (sem incluir imagens nativas)."]})]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Profilar em emulador"})," — emulador é mais rápido ",e.jsx("em",{children:"ou"})," mais lento que device real, depende. Nunca confie."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"setState no widget raiz"})," — força rebuild de tudo. Mova estado para o widget mais próximo possível."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Faltou ",e.jsx("code",{children:"const"})]})," — sem ",e.jsx("code",{children:"const"}),", widgets reconstroem a cada frame mesmo idênticos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Imagens gigantes"})," — JPG 4000×3000 numa miniatura come MB e ciclos. Use ",e.jsx("code",{children:"cacheWidth"}),"/",e.jsx("code",{children:"cacheHeight"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ListView sem builder"})," — ",e.jsx("code",{children:"ListView(children: [...])"})," com 1000 itens cria todos de uma vez. Use ",e.jsx("code",{children:"ListView.builder"}),"."]})]}),e.jsx(o,{type:"warning",title:"Sempre teste em hardware pessimista",children:"Seu Pixel 8 ou iPhone 15 esconde problemas. Os usuários têm Moto G6, iPhone SE 1ª. Mantenha um device velho na bancada para testes."}),e.jsxs(o,{type:"danger",title:"Não otimize sem medir",children:['Mexer em código pensando "isso deve estar lento" sem profilar gera bugs e perde tempo. ',e.jsx("strong",{children:"Meça → identifique o gargalo → otimize → meça de novo."})]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(o,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"const"})," em ",e.jsx("em",{children:"todo"})," widget que possa ser constante."]}),e.jsxs("li",{children:["Para animações pesadas isoladas, embrulhe em ",e.jsx("code",{children:"RepaintBoundary"}),"."]}),e.jsxs("li",{children:["Carregue dados em background com ",e.jsx("code",{children:"FutureBuilder"})," + ",e.jsx("code",{children:"compute"}),"."]}),e.jsxs("li",{children:["Habilite ",e.jsx("code",{children:"Performance Overlay"})," em dev para ver as duas barras (UI e Raster) sobrepostas."]}),e.jsxs("li",{children:["Em listas longas, use ",e.jsx("code",{children:"itemExtent"})," ou ",e.jsx("code",{children:"prototypeItem"})," para acelerar layout."]})]})}),e.jsx(s,{title:"overlay de performance",code:`MaterialApp(
  showPerformanceOverlay: true, // só em dev
  home: const HomePage(),
)`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Veja ",e.jsx("em",{children:"Flutter DevTools"})," para entender cada painel a fundo,",e.jsx("em",{children:"RepaintBoundary"})," para isolar áreas pesadas e ",e.jsx("em",{children:"Build Web"})," para otimizar bundles."]}),e.jsx(o,{type:"success",children:"Profilar é hábito, não evento. Faça parte do checklist antes de cada release."})]})}export{t as default};
