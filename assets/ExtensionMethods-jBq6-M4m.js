import{j as e}from"./index-D9yRYXwO.js";import{P as i,C as s,A as o}from"./AlertBox-B2Rl5ETq.js";function r(){return e.jsxs(i,{title:"Extension Methods",subtitle:"Adicione métodos a tipos que você não escreveu — sem herança, sem wrappers.",difficulty:"intermediario",timeToRead:"11 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Você está escrevendo um app Flutter e percebe: toda hora precisa pegar o tema do contexto com ",e.jsx("code",{children:"Theme.of(context)"}),", ou checar se uma string é um e-mail válido. O código fica poluído com utilitários repetidos."]}),e.jsxs("p",{children:["Você não pode editar a classe ",e.jsx("code",{children:"String"})," ou ",e.jsx("code",{children:"BuildContext"})," — elas vêm do SDK. Antes do Dart 2.7, a saída era criar funções utilitárias soltas (",e.jsx("code",{children:"ehEmail(s)"}),") ou classes-wrapper. ",e.jsx("strong",{children:"Extension methods"}),' resolvem isso elegantemente: você "adiciona" métodos a qualquer tipo, e usa como se fossem nativos.']}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Uma ",e.jsx("em",{children:"extension"}),' é um bloco de código que diz: "para todo objeto desse tipo, vale também esses métodos extras". Por baixo dos panos, é açúcar sintático para uma função estática — mas com uma sintaxe muito mais limpa no chamador.']}),e.jsx("p",{children:"Comparação rápida:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"JavaScript"}),": prototype hacking — funciona, mas polui o objeto globalmente."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Java/C#"}),": precisa de classes utilitárias estáticas (",e.jsx("code",{children:"StringUtils.isEmail(s)"}),")."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Dart/Kotlin/Swift"}),": extensions — escopo controlado pelo import."]})]}),e.jsx("h2",{children:"Como Dart faz"}),e.jsx(s,{title:"string_x.dart",code:`// Nome da extension + 'on' + tipo alvo.
extension StringX on String {
  // 'this' refere-se à própria String.
  bool get isEmail =>
      contains('@') && contains('.') && length >= 5;

  // Métodos normais funcionam também.
  String capitalize() {
    if (isEmpty) return this;
    return '\${this[0].toUpperCase()}\${substring(1)}';
  }

  // Pode receber parâmetros como qualquer método.
  String repetir(int vezes) => List.filled(vezes, this).join();
}

void main() {
  print('ana@x.com'.isEmail);   // true
  print('ana'.capitalize());     // 'Ana'
  print('oi '.repetir(3));       // 'oi oi oi '
}`}),e.jsxs(o,{type:"info",title:"Sem mágica em runtime",children:["Extensions são resolvidas em ",e.jsx("strong",{children:"tempo de compilação"}),". Não há monkey-patching nem custo extra — é o mesmo que chamar uma função estática. Por isso são seguras."]}),e.jsx("h2",{children:"Exemplo prático no Flutter"}),e.jsxs("p",{children:["O caso de uso mais comum em apps Flutter: encurtar acessos repetitivos via ",e.jsx("code",{children:"BuildContext"}),"."]}),e.jsx(s,{title:"context_x.dart",code:`extension ContextX on BuildContext {
  // Tema e cores
  ThemeData get theme => Theme.of(this);
  TextTheme get textTheme => theme.textTheme;
  ColorScheme get colors => theme.colorScheme;

  // Tamanho de tela
  Size get screenSize => MediaQuery.sizeOf(this);
  double get screenWidth => screenSize.width;
  double get screenHeight => screenSize.height;
  bool get isMobile => screenWidth < 600;

  // Navegação
  void pop<T>([T? result]) => Navigator.of(this).pop(result);

  // SnackBar rápido
  void mostrarSnack(String texto) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(content: Text(texto)),
    );
  }
}`}),e.jsxs("p",{children:["Agora dentro de qualquer ",e.jsx("code",{children:"build()"})," você escreve:"]}),e.jsx(s,{title:"uso na tela",code:`@override
Widget build(BuildContext context) {
  return Scaffold(
    backgroundColor: context.colors.surface,
    body: Padding(
      padding: EdgeInsets.all(context.isMobile ? 8 : 24),
      child: Text(
        'Olá!',
        style: context.textTheme.headlineMedium,
      ),
    ),
    floatingActionButton: FloatingActionButton(
      onPressed: () => context.mostrarSnack('Clicou!'),
      child: const Icon(Icons.send),
    ),
  );
}`}),e.jsxs("p",{children:["Compare com a versão sem extension: três ",e.jsx("code",{children:"Theme.of(context)"}),", um ",e.jsx("code",{children:"MediaQuery.of(context)"}),", um ",e.jsx("code",{children:"ScaffoldMessenger.of(context)"})," espalhados. Extension deixou tudo limpo e descobrível pelo autocomplete."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer de importar"}),': extensions só ficam disponíveis em arquivos que importam o arquivo onde foram definidas. Sem import, o método "não existe".']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Conflito de nomes"}),": se duas extensions ativas definem ",e.jsx("code",{children:"capitalize()"}),", Dart reclama de ambiguidade. Resolva com ",e.jsx("code",{children:"StringX(s).capitalize()"})," explícito."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Não funciona em ",e.jsx("code",{children:"dynamic"})]}),": extensions exigem tipo conhecido em tempo de compilação. Se a variável for ",e.jsx("code",{children:"dynamic"}),", o método não é encontrado."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Não pode adicionar campos de instância"}),": só getters, setters e métodos. Estado mutável não rola — use uma classe wrapper."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Não sobrescreve métodos existentes"}),": se ",e.jsx("code",{children:"String"})," já tem um método ",e.jsx("code",{children:"length"}),", sua extension nunca ganha. O método nativo sempre vence."]})]}),e.jsxs(o,{type:"warning",title:"Não abuse",children:["Extension é tentação para criar DSLs malucas (",e.jsx("code",{children:"5.minutes.ago"}),", ",e.jsx("code",{children:"'oi'.printRed()"}),"). Em times grandes, isso vira um quebra-cabeça. Use para utilitários óbvios; deixe lógica de domínio em classes próprias."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(o,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Um arquivo por extension grande, com sufixo ",e.jsx("code",{children:"_x.dart"})," ou ",e.jsx("code",{children:"_extensions.dart"}),"."]}),e.jsxs("li",{children:["Nomeie a extension (",e.jsx("code",{children:"extension StringX on String"}),") — facilita resolver conflitos depois."]}),e.jsxs("li",{children:["Documente com ",e.jsx("code",{children:"///"})," — o IDE mostra no hover."]}),e.jsxs("li",{children:["Prefira getters para coisas baratas e sem efeito colateral (",e.jsx("code",{children:"context.theme"}),"); use métodos para ações (",e.jsx("code",{children:"context.mostrarSnack(...)"}),")."]}),e.jsxs("li",{children:["O pacote ",e.jsx("code",{children:"dartx"})," oferece dezenas de extensions úteis prontas — vale dar uma olhada."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com extensions sob controle, o próximo grande tema é ",e.jsx("strong",{children:"assincronismo"})," — futures e streams. Lá você vai inclusive criar extensions sobre ",e.jsx("code",{children:"Future"})," para encadear retries e timeouts de forma elegante."]}),e.jsxs(o,{type:"success",children:["Próximo capítulo: ",e.jsx("strong",{children:"Futures"}),' — o tipo que representa "um valor que chega depois".']})]})}export{r as default};
