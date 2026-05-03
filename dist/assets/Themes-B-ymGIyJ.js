import{j as e}from"./index-D4AOhXGO.js";import{P as a,C as o,A as r}from"./AlertBox-Dyf2wdSA.js";function d(){return e.jsxs(a,{title:"Temas & Cores",subtitle:"Configure cores, tipografia e modo claro/escuro de forma global e consistente.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Imagine um app com 30 telas. Em cada uma, você escreveu ",e.jsx("code",{children:"color: Colors.blue"})," à mão. Agora o cliente pediu para mudar para roxo. Você terá que abrir 30 arquivos e trocar tudo — e quando vier o pedido de modo escuro, multiplica por dois."]}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"tema"})," resolve isso: você define cores e estilos em ",e.jsx("em",{children:"um único lugar"})," e todos os widgets se adaptam automaticamente. Trocar de paleta vira uma linha de código."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["O tema do Flutter é um objeto ",e.jsx("code",{children:"ThemeData"})," declarado dentro do ",e.jsx("code",{children:"MaterialApp"}),". Ele guarda:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"ColorScheme"}),' — paleta de cores (primary, secondary, surface, error e suas variantes "on").']}),e.jsxs("li",{children:[e.jsx("strong",{children:"TextTheme"})," — estilos de texto nomeados (displayLarge, headlineMedium, bodyMedium...)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Brilho"})," — claro ou escuro."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Estilos por widget"})," — ",e.jsx("code",{children:"elevatedButtonTheme"}),", ",e.jsx("code",{children:"appBarTheme"}),", ",e.jsx("code",{children:"cardTheme"}),", etc."]})]}),e.jsxs("p",{children:["Cada widget Material lê o tema via ",e.jsx("code",{children:"Theme.of(context)"})," e aplica os valores. Você não passa cor em cada widget — eles herdam."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsxs("p",{children:["A forma mais moderna (Material 3) é usar ",e.jsx("code",{children:"ColorScheme.fromSeed"}),": você passa uma cor base e o Flutter gera toda a paleta harmônica."]}),e.jsx(o,{title:"lib/main.dart",code:`import 'package:flutter/material.dart';

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
}`}),e.jsx("h2",{children:"Acessando o tema dentro de um widget"}),e.jsxs("p",{children:["Em qualquer widget descendente, use ",e.jsx("code",{children:"Theme.of(context)"}),":"]}),e.jsx(o,{title:"usando o tema",code:`@override
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
}`}),e.jsxs(r,{type:"info",title:"As cores 'on' são para texto/ícones",children:['Para cada cor de fundo existe uma cor "on" que garante contraste: ',e.jsx("code",{children:"onPrimary"})," é a cor do texto sobre ",e.jsx("code",{children:"primary"}),", ",e.jsx("code",{children:"onSurface"})," sobre ",e.jsx("code",{children:"surface"}),", etc. Use sempre essas para acessibilidade."]}),e.jsx("h2",{children:"Exemplo prático: tema customizado por componente"}),e.jsxs("p",{children:["Quer que TODOS os ",e.jsx("code",{children:"ElevatedButton"})," do app tenham bordas arredondadas e altura fixa? Configure no tema, não em cada botão:"]}),e.jsx(o,{title:"ThemeData detalhado",code:`ThemeData(
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
)`}),e.jsxs("p",{children:["Agora qualquer ",e.jsx("code",{children:"ElevatedButton(onPressed: ..., child: Text('OK'))"})," aparece com 52px de altura, bordas arredondadas e texto em peso 600. Sem repetir estilo nenhum."]}),e.jsx("h2",{children:"Trocando de tema em runtime"}),e.jsxs("p",{children:["Para um botão que alterna claro/escuro, guarde o ",e.jsx("code",{children:"ThemeMode"})," em estado e passe para o ",e.jsx("code",{children:"MaterialApp"}),":"]}),e.jsx(o,{title:"alternar tema",code:`class _MeuAppState extends State<MeuApp> {
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
}`}),e.jsx(r,{type:"success",title:"ColorScheme.fromSeed é seu melhor amigo",children:"Não fique escolhendo 12 cores manualmente. Passe uma cor de marca e deixe o Material 3 gerar primary, secondary, tertiary, surface variants — tudo harmônico e acessível."}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Hardcode de cor:"})," ",e.jsx("code",{children:"color: Color(0xFF1976D2)"})," espalhado quebra o modo escuro. Sempre passe pelo ",e.jsx("code",{children:"colorScheme"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar ",e.jsx("code",{children:"primaryColor"})," antigo:"]})," em Material 3, use ",e.jsx("code",{children:"colorScheme.primary"}),". ",e.jsx("code",{children:"primaryColor"})," ainda existe por compatibilidade, mas é legado."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer o ",e.jsx("code",{children:"darkTheme"}),":"]})," sem ele, mesmo com ",e.jsx("code",{children:"themeMode: dark"}),", o app cai no tema claro como fallback."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Misturar Material 2 e 3:"})," definir ",e.jsx("code",{children:"useMaterial3: false"})," num lugar e ",e.jsx("code",{children:"true"})," em outro causa visual inconsistente."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Texto sem contraste:"})," usar ",e.jsx("code",{children:"Colors.white"})," sobre ",e.jsx("code",{children:"colorScheme.surface"})," pode dar quase invisível no modo claro."]})]}),e.jsxs(r,{type:"warning",title:"Texto: sempre via TextTheme",children:["Não escreva tamanhos de fonte direto no widget. Use ",e.jsx("code",{children:"Theme.of(context).textTheme.bodyMedium"})," e similares. Se um dia quiser aumentar a fonte do app inteiro (acessibilidade), muda em um lugar só."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(r,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Crie um arquivo ",e.jsx("code",{children:"lib/theme/app_theme.dart"})," com funções ",e.jsx("code",{children:"buildLightTheme()"})," e ",e.jsx("code",{children:"buildDarkTheme()"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"ColorScheme.fromSeed"})," com a cor da sua marca."]}),e.jsxs("li",{children:["Persista a escolha do usuário (tema claro/escuro/sistema) com ",e.jsx("code",{children:"shared_preferences"}),"."]}),e.jsx("li",{children:"Teste TODAS as telas em ambos os temas antes de lançar."}),e.jsxs("li",{children:["Para tipografia customizada, use o pacote ",e.jsx("code",{children:"google_fonts"})," e aplique no ",e.jsx("code",{children:"textTheme"}),"."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com tema configurado, vamos para ",e.jsx("strong",{children:"Navigator 1.0"})," e aprender a transitar entre telas mantendo o tema consistente em todas."]})]})}export{d as default};
