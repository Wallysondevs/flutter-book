import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ExtensionMethods() {
  return (
    <PageContainer
      title="Extension Methods"
      subtitle="Adicione métodos a tipos que você não escreveu — sem herança, sem wrappers."
      difficulty="intermediario"
      timeToRead="11 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Você está escrevendo um app Flutter e percebe: toda hora precisa pegar o tema do contexto com <code>Theme.of(context)</code>, ou checar se uma string é um e-mail válido. O código fica poluído com utilitários repetidos.
      </p>
      <p>
        Você não pode editar a classe <code>String</code> ou <code>BuildContext</code> — elas vêm do SDK. Antes do Dart 2.7, a saída era criar funções utilitárias soltas (<code>ehEmail(s)</code>) ou classes-wrapper. <strong>Extension methods</strong> resolvem isso elegantemente: você "adiciona" métodos a qualquer tipo, e usa como se fossem nativos.
      </p>

      <h2>O conceito</h2>
      <p>
        Uma <em>extension</em> é um bloco de código que diz: "para todo objeto desse tipo, vale também esses métodos extras". Por baixo dos panos, é açúcar sintático para uma função estática — mas com uma sintaxe muito mais limpa no chamador.
      </p>
      <p>
        Comparação rápida:
      </p>
      <ul>
        <li><strong>JavaScript</strong>: prototype hacking — funciona, mas polui o objeto globalmente.</li>
        <li><strong>Java/C#</strong>: precisa de classes utilitárias estáticas (<code>StringUtils.isEmail(s)</code>).</li>
        <li><strong>Dart/Kotlin/Swift</strong>: extensions — escopo controlado pelo import.</li>
      </ul>

      <h2>Como Dart faz</h2>
      <CodeBlock title="string_x.dart" code={`// Nome da extension + 'on' + tipo alvo.
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
}`} />

      <AlertBox type="info" title="Sem mágica em runtime">
        Extensions são resolvidas em <strong>tempo de compilação</strong>. Não há monkey-patching nem custo extra — é o mesmo que chamar uma função estática. Por isso são seguras.
      </AlertBox>

      <h2>Exemplo prático no Flutter</h2>
      <p>
        O caso de uso mais comum em apps Flutter: encurtar acessos repetitivos via <code>BuildContext</code>.
      </p>

      <CodeBlock title="context_x.dart" code={`extension ContextX on BuildContext {
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
}`} />

      <p>
        Agora dentro de qualquer <code>build()</code> você escreve:
      </p>

      <CodeBlock title="uso na tela" code={`@override
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
}`} />

      <p>
        Compare com a versão sem extension: três <code>Theme.of(context)</code>, um <code>MediaQuery.of(context)</code>, um <code>ScaffoldMessenger.of(context)</code> espalhados. Extension deixou tudo limpo e descobrível pelo autocomplete.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer de importar</strong>: extensions só ficam disponíveis em arquivos que importam o arquivo onde foram definidas. Sem import, o método "não existe".</li>
        <li><strong>Conflito de nomes</strong>: se duas extensions ativas definem <code>capitalize()</code>, Dart reclama de ambiguidade. Resolva com <code>StringX(s).capitalize()</code> explícito.</li>
        <li><strong>Não funciona em <code>dynamic</code></strong>: extensions exigem tipo conhecido em tempo de compilação. Se a variável for <code>dynamic</code>, o método não é encontrado.</li>
        <li><strong>Não pode adicionar campos de instância</strong>: só getters, setters e métodos. Estado mutável não rola — use uma classe wrapper.</li>
        <li><strong>Não sobrescreve métodos existentes</strong>: se <code>String</code> já tem um método <code>length</code>, sua extension nunca ganha. O método nativo sempre vence.</li>
      </ul>

      <AlertBox type="warning" title="Não abuse">
        Extension é tentação para criar DSLs malucas (<code>5.minutes.ago</code>, <code>'oi'.printRed()</code>). Em times grandes, isso vira um quebra-cabeça. Use para utilitários óbvios; deixe lógica de domínio em classes próprias.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Um arquivo por extension grande, com sufixo <code>_x.dart</code> ou <code>_extensions.dart</code>.</li>
          <li>Nomeie a extension (<code>extension StringX on String</code>) — facilita resolver conflitos depois.</li>
          <li>Documente com <code>///</code> — o IDE mostra no hover.</li>
          <li>Prefira getters para coisas baratas e sem efeito colateral (<code>context.theme</code>); use métodos para ações (<code>context.mostrarSnack(...)</code>).</li>
          <li>O pacote <code>dartx</code> oferece dezenas de extensions úteis prontas — vale dar uma olhada.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com extensions sob controle, o próximo grande tema é <strong>assincronismo</strong> — futures e streams. Lá você vai inclusive criar extensions sobre <code>Future</code> para encadear retries e timeouts de forma elegante.
      </p>
      <AlertBox type="success">
        Próximo capítulo: <strong>Futures</strong> — o tipo que representa "um valor que chega depois".
      </AlertBox>
    </PageContainer>
  );
}
