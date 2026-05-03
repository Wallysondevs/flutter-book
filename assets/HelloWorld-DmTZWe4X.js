import{j as e}from"./index-D9yRYXwO.js";import{P as d,C as t,A as o}from"./AlertBox-B2Rl5ETq.js";function i(){return e.jsxs(d,{title:"Hello, World! e o ciclo de build",subtitle:"Seu primeiro widget — entenda CADA linha e o que acontece no flutter run.",difficulty:"iniciante",timeToRead:"15 min",children:[e.jsx("h2",{children:"Por que você precisa disso"}),e.jsxs("p",{children:["No Flutter, ",e.jsx("strong",{children:"tudo é widget"}),". Texto, padding, botão, tela inteira — todos descendem de ",e.jsx("code",{children:"Widget"}),". Entender isso desde a primeira tela evita confusão depois."]}),e.jsx("h2",{children:"O código mínimo"}),e.jsxs("p",{children:["Substitua o conteúdo de ",e.jsx("strong",{children:"lib/main.dart"})," pelo código abaixo. É o menor app Flutter funcional possível:"]}),e.jsx(t,{title:"lib/main.dart",code:`import 'package:flutter/material.dart';

  void main() {
    runApp(const MyApp());
  }

  class MyApp extends StatelessWidget {
    const MyApp({super.key});

    @override
    Widget build(BuildContext context) {
      return const MaterialApp(
        home: Scaffold(
          body: Center(
            child: Text('Olá, mundo!'),
          ),
        ),
      );
    }
  }`}),e.jsx("h2",{children:"Linha por linha"}),e.jsx("h3",{children:e.jsx("code",{children:"import 'package:flutter/material.dart';"})}),e.jsxs("p",{children:["Importa o pacote Material — um conjunto enorme de widgets prontos seguindo o Material Design do Google. Para apps com cara de iOS, importe ",e.jsx("code",{children:"cupertino.dart"}),"."]}),e.jsx("h3",{children:e.jsx("code",{children:"void main() => runApp(...)"})}),e.jsxs("p",{children:["Como em qualquer app Dart, ",e.jsx("code",{children:"main()"})," é o ponto de entrada. ",e.jsx("code",{children:"runApp"}),' "monta" o widget passado como raiz da árvore e começa a desenhar.']}),e.jsx("h3",{children:e.jsx("code",{children:"class MyApp extends StatelessWidget"})}),e.jsxs("p",{children:["Um ",e.jsx("strong",{children:"StatelessWidget"})," é um widget que não muda — sua aparência depende só dos parâmetros que recebe no construtor. Perfeito para telas estáticas, ícones, textos fixos."]}),e.jsx("h3",{children:e.jsx("code",{children:"Widget build(BuildContext context)"})}),e.jsxs("p",{children:["Todo widget implementa ",e.jsx("code",{children:"build()"}),". Esse método retorna a árvore de widgets que o Flutter deve desenhar. ",e.jsx("strong",{children:"Pense em build como uma função que descreve a UI no estado atual."})]}),e.jsx("h3",{children:e.jsx("code",{children:"MaterialApp > Scaffold > Center > Text"})}),e.jsx("p",{children:"A árvore aninha widgets:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"MaterialApp"})," — fornece tema, navegação, localização."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Scaffold"})," — estrutura básica de uma tela Material (AppBar, body, FAB)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Center"})," — centraliza o filho na tela."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Text"})," — desenha uma string com o estilo herdado do tema."]})]}),e.jsxs(o,{type:"info",title:"Hot Reload é mágico",children:["Salve o arquivo enquanto ",e.jsx("code",{children:"flutter run"})," está rodando: as mudanças aparecem em <1s sem perder o estado. Esse loop curto é uma das maiores vantagens do Flutter."]}),e.jsx("h2",{children:"Adicionando interatividade"}),e.jsxs("p",{children:["Para reagir a toques, você precisa de estado. Trocamos ",e.jsx("code",{children:"StatelessWidget"})," por ",e.jsx("code",{children:"StatefulWidget"}),":"]}),e.jsx(t,{title:"lib/main.dart",code:`import 'package:flutter/material.dart';

  void main() => runApp(const MyApp());

  class MyApp extends StatelessWidget {
    const MyApp({super.key});
    @override
    Widget build(BuildContext context) {
      return const MaterialApp(home: Contador());
    }
  }

  class Contador extends StatefulWidget {
    const Contador({super.key});
    @override
    State<Contador> createState() => _ContadorState();
  }

  class _ContadorState extends State<Contador> {
    int valor = 0;

    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(title: const Text('Contador')),
        body: Center(child: Text('$valor', style: const TextStyle(fontSize: 48))),
        floatingActionButton: FloatingActionButton(
          onPressed: () => setState(() => valor++),
          child: const Icon(Icons.add),
        ),
      );
    }
  }`}),e.jsxs("p",{children:[e.jsx("code",{children:"setState"}),' avisa o framework: "marque este widget como sujo, chame ',e.jsx("code",{children:"build"}),' de novo". Simples assim.']}),e.jsx(o,{type:"success",title:"Próximo passo",children:"Você já entende o fluxo básico. Nas próximas páginas vamos quebrar Dart, widgets de layout, e gerenciamento de estado de verdade."})]})}export{i as default};
