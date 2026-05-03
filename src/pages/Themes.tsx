import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Themes() {
  return (
    <PageContainer
      title="Temas & Cores"
      subtitle="Configure cores, tipografia e modo claro/escuro de forma global e consistente."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Imagine um app com 30 telas. Em cada uma, você escreveu <code>color: Colors.blue</code> à mão. Agora o cliente pediu para mudar para roxo. Você terá que abrir 30 arquivos e trocar tudo — e quando vier o pedido de modo escuro, multiplica por dois.
      </p>
      <p>
        O <strong>tema</strong> resolve isso: você define cores e estilos em <em>um único lugar</em> e todos os widgets se adaptam automaticamente. Trocar de paleta vira uma linha de código.
      </p>

      <h2>O conceito</h2>
      <p>
        O tema do Flutter é um objeto <code>ThemeData</code> declarado dentro do <code>MaterialApp</code>. Ele guarda:
      </p>
      <ul>
        <li><strong>ColorScheme</strong> — paleta de cores (primary, secondary, surface, error e suas variantes "on").</li>
        <li><strong>TextTheme</strong> — estilos de texto nomeados (displayLarge, headlineMedium, bodyMedium...).</li>
        <li><strong>Brilho</strong> — claro ou escuro.</li>
        <li><strong>Estilos por widget</strong> — <code>elevatedButtonTheme</code>, <code>appBarTheme</code>, <code>cardTheme</code>, etc.</li>
      </ul>
      <p>
        Cada widget Material lê o tema via <code>Theme.of(context)</code> e aplica os valores. Você não passa cor em cada widget — eles herdam.
      </p>

      <h2>Como Flutter faz</h2>
      <p>
        A forma mais moderna (Material 3) é usar <code>ColorScheme.fromSeed</code>: você passa uma cor base e o Flutter gera toda a paleta harmônica.
      </p>

      <CodeBlock title="lib/main.dart" code={`import 'package:flutter/material.dart';

void main() => runApp(const MeuApp());

class MeuApp extends StatelessWidget {
  const MeuApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Meu App',

      // Tema CLARO: gerado a partir de uma cor semente.
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
        ),
        textTheme: const TextTheme(
          bodyMedium: TextStyle(fontSize: 16, height: 1.5),
        ),
      ),

      // Tema ESCURO: mesma semente, brilho diferente.
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.dark,
        ),
      ),

      // Segue a configuração do sistema operacional.
      themeMode: ThemeMode.system,

      home: const HomePage(),
    );
  }
}`} />

      <h2>Acessando o tema dentro de um widget</h2>
      <p>
        Em qualquer widget descendente, use <code>Theme.of(context)</code>:
      </p>

      <CodeBlock title="usando o tema" code={`@override
Widget build(BuildContext context) {
  // Pega o tema atual (vai ser claro ou escuro automaticamente).
  final theme = Theme.of(context);
  final cores = theme.colorScheme;

  return Container(
    color: cores.surfaceContainer,
    padding: const EdgeInsets.all(16),
    child: Text(
      'Olá',
      style: theme.textTheme.headlineMedium?.copyWith(
        color: cores.primary,
      ),
    ),
  );
}`} />

      <AlertBox type="info" title="As cores 'on' são para texto/ícones">
        Para cada cor de fundo existe uma cor "on" que garante contraste: <code>onPrimary</code> é a cor do texto sobre <code>primary</code>, <code>onSurface</code> sobre <code>surface</code>, etc. Use sempre essas para acessibilidade.
      </AlertBox>

      <h2>Exemplo prático: tema customizado por componente</h2>
      <p>
        Quer que TODOS os <code>ElevatedButton</code> do app tenham bordas arredondadas e altura fixa? Configure no tema, não em cada botão:
      </p>

      <CodeBlock title="ThemeData detalhado" code={`ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),

  // Estilo padrão para TODOS os ElevatedButton.
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      minimumSize: const Size(double.infinity, 52),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      textStyle: const TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w600,
      ),
    ),
  ),

  // AppBar com cor customizada.
  appBarTheme: const AppBarTheme(
    centerTitle: true,
    elevation: 0,
  ),

  // Cards com sombra mais suave.
  cardTheme: CardTheme(
    elevation: 1,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
    ),
  ),
)`} />

      <p>
        Agora qualquer <code>ElevatedButton(onPressed: ..., child: Text('OK'))</code> aparece com 52px de altura, bordas arredondadas e texto em peso 600. Sem repetir estilo nenhum.
      </p>

      <h2>Trocando de tema em runtime</h2>
      <p>
        Para um botão que alterna claro/escuro, guarde o <code>ThemeMode</code> em estado e passe para o <code>MaterialApp</code>:
      </p>

      <CodeBlock title="alternar tema" code={`class _MeuAppState extends State<MeuApp> {
  ThemeMode _modo = ThemeMode.system;

  void alternar() {
    setState(() {
      _modo = _modo == ThemeMode.dark
          ? ThemeMode.light
          : ThemeMode.dark;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.light(useMaterial3: true),
      darkTheme: ThemeData.dark(useMaterial3: true),
      themeMode: _modo,
      home: HomePage(onAlternar: alternar),
    );
  }
}`} />

      <AlertBox type="success" title="ColorScheme.fromSeed é seu melhor amigo">
        Não fique escolhendo 12 cores manualmente. Passe uma cor de marca e deixe o Material 3 gerar primary, secondary, tertiary, surface variants — tudo harmônico e acessível.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Hardcode de cor:</strong> <code>color: Color(0xFF1976D2)</code> espalhado quebra o modo escuro. Sempre passe pelo <code>colorScheme</code>.</li>
        <li><strong>Usar <code>primaryColor</code> antigo:</strong> em Material 3, use <code>colorScheme.primary</code>. <code>primaryColor</code> ainda existe por compatibilidade, mas é legado.</li>
        <li><strong>Esquecer o <code>darkTheme</code>:</strong> sem ele, mesmo com <code>themeMode: dark</code>, o app cai no tema claro como fallback.</li>
        <li><strong>Misturar Material 2 e 3:</strong> definir <code>useMaterial3: false</code> num lugar e <code>true</code> em outro causa visual inconsistente.</li>
        <li><strong>Texto sem contraste:</strong> usar <code>Colors.white</code> sobre <code>colorScheme.surface</code> pode dar quase invisível no modo claro.</li>
      </ul>

      <AlertBox type="warning" title="Texto: sempre via TextTheme">
        Não escreva tamanhos de fonte direto no widget. Use <code>Theme.of(context).textTheme.bodyMedium</code> e similares. Se um dia quiser aumentar a fonte do app inteiro (acessibilidade), muda em um lugar só.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Crie um arquivo <code>lib/theme/app_theme.dart</code> com funções <code>buildLightTheme()</code> e <code>buildDarkTheme()</code>.</li>
          <li>Use <code>ColorScheme.fromSeed</code> com a cor da sua marca.</li>
          <li>Persista a escolha do usuário (tema claro/escuro/sistema) com <code>shared_preferences</code>.</li>
          <li>Teste TODAS as telas em ambos os temas antes de lançar.</li>
          <li>Para tipografia customizada, use o pacote <code>google_fonts</code> e aplique no <code>textTheme</code>.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Com tema configurado, vamos para <strong>Navigator 1.0</strong> e aprender a transitar entre telas mantendo o tema consistente em todas.
      </p>
    </PageContainer>
  );
}
