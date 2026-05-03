import{j as e}from"./index-D4AOhXGO.js";import{P as r,C as o,A as a}from"./AlertBox-Dyf2wdSA.js";function t(){return e.jsxs(r,{title:"Material Design",subtitle:"O sistema de design do Google encarnado em widgets Flutter — pronto para usar.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quando você cria um app Flutter novo, ele já vem com cara de Material Design: botões arredondados, AppBar no topo, animações de ripple ao tocar. Isso não é mágica — é uma ",e.jsx("strong",{children:"biblioteca enorme de widgets"})," que o Flutter te dá de graça. Saber quais existem e como combiná-los economiza semanas de trabalho."]}),e.jsx("p",{children:"Material é o sistema visual oficial do Google (usado no Gmail, YouTube, Android). No Flutter, ele virou um conjunto de widgets prontos que respeitam tema, acessibilidade e gestos."}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Pense em Material como um ",e.jsx("em",{children:"kit de peças Lego"}),": cada peça (widget) tem um propósito claro e se encaixa nas outras. Você não precisa desenhar um botão do zero — usa ",e.jsx("code",{children:"ElevatedButton"})," e ele já vem com sombra, ripple, foco de teclado e suporte a tema."]}),e.jsx("p",{children:"Tudo começa importando o pacote certo no topo do arquivo:"}),e.jsx(o,{title:"lib/main.dart",code:`// Importa TODOS os widgets Material de uma vez.
import 'package:flutter/material.dart';`}),e.jsx("h2",{children:"Como Flutter organiza os widgets Material"}),e.jsx("p",{children:"Existe uma hierarquia clara. Os mais importantes para iniciantes:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"MaterialApp"})," — raiz do app. Configura tema, rotas, idioma. Sempre o widget mais externo."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Scaffold"})," — esqueleto de uma tela: tem slots para AppBar, body, FAB, drawer, bottomNavigationBar."]}),e.jsxs("li",{children:[e.jsx("code",{children:"AppBar"})," — barra superior com título, ícones de ação e botão de voltar automático."]}),e.jsxs("li",{children:[e.jsx("code",{children:"FloatingActionButton"})," (FAB) — botão circular flutuante para a ação principal da tela."]}),e.jsxs("li",{children:[e.jsx("code",{children:"BottomNavigationBar"})," / ",e.jsx("code",{children:"NavigationBar"})," — abas inferiores para alternar seções."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Drawer"})," — menu lateral que desliza da esquerda."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Card"}),", ",e.jsx("code",{children:"ListTile"}),", ",e.jsx("code",{children:"Chip"}),", ",e.jsx("code",{children:"Dialog"}),", ",e.jsx("code",{children:"SnackBar"})," — blocos de conteúdo prontos."]})]}),e.jsx("h2",{children:"Exemplo prático: tela completa"}),e.jsx("p",{children:'Uma tela "real" usa vários desses widgets juntos. Veja uma tela de perfil simplificada:'}),e.jsx(o,{title:"lib/perfil_page.dart",code:`import 'package:flutter/material.dart';

class PerfilPage extends StatelessWidget {
  const PerfilPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Barra superior com título e ícone de busca.
      appBar: AppBar(
        title: const Text('Meu perfil'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {},
          ),
        ],
      ),

      // Corpo da tela: lista vertical de cards.
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Card(
            child: ListTile(
              leading: CircleAvatar(child: Text('M')),
              title: Text('Maria Silva'),
              subtitle: Text('maria@exemplo.com'),
            ),
          ),
          SizedBox(height: 12),
          Card(
            child: ListTile(
              leading: Icon(Icons.notifications),
              title: Text('Notificações'),
              trailing: Icon(Icons.chevron_right),
            ),
          ),
        ],
      ),

      // Botão flutuante para a ação principal (editar perfil).
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Mostra uma mensagem rápida na base da tela.
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Editar perfil')),
          );
        },
        child: const Icon(Icons.edit),
      ),
    );
  }
}`}),e.jsx("p",{children:"Resultado: uma tela com AppBar azul, dois cards na lista e um botão circular azul no canto inferior direito. Tudo já responde a toques com animação de ripple."}),e.jsxs(a,{type:"info",title:"Material 3 é o padrão",children:["Desde Flutter 3.16+, projetos novos usam ",e.jsx("strong",{children:"Material 3"})," automaticamente (",e.jsx("code",{children:"useMaterial3: true"}),'). As cores, formas e tipografia são mais modernas. Se você abrir um tutorial antigo e tudo parecer "azulão chapado", é Material 2.']}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer o Scaffold:"})," chamar ",e.jsx("code",{children:"showSnackBar"})," ou abrir um ",e.jsx("code",{children:"Drawer"})," sem ter um Scaffold acima na árvore lança erro em runtime."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"AppBar dentro do body:"})," AppBar vai no slot ",e.jsx("code",{children:"appBar:"})," do Scaffold, não dentro de uma Column. Caso contrário você perde o status bar e a integração de tema."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Misturar Material e Cupertino sem cuidado:"})," usar ",e.jsx("code",{children:"CupertinoButton"})," dentro de um app Material funciona, mas o tema/animações não combinam. Para isso existem os widgets ",e.jsx("code",{children:".adaptive"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ignorar o tema:"})," definir cores hardcoded (",e.jsx("code",{children:"color: Colors.blue"}),") em todo widget quebra o modo escuro. Use ",e.jsx("code",{children:"Theme.of(context).colorScheme.primary"}),"."]})]}),e.jsx(a,{type:"warning",title:"Scaffold por tela",children:'Cada tela ("rota") deve ter o seu próprio Scaffold. Não tente reutilizar um único Scaffold global — você perde animações de transição entre páginas.'}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(a,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Comece sempre por ",e.jsx("code",{children:"MaterialApp"})," > ",e.jsx("code",{children:"Scaffold"}),". É o esqueleto padrão."]}),e.jsxs("li",{children:["Use widgets prontos (",e.jsx("code",{children:"Card"}),", ",e.jsx("code",{children:"ListTile"}),", ",e.jsx("code",{children:"Chip"}),") antes de inventar layouts manuais."]}),e.jsxs("li",{children:["Defina cores e tipografia no ",e.jsx("code",{children:"ThemeData"})," uma vez só — não repita estilos em cada widget."]}),e.jsxs("li",{children:["Para feedback rápido use ",e.jsx("code",{children:"SnackBar"}),"; para perguntas use ",e.jsx("code",{children:"AlertDialog"}),"; para listas longas use ",e.jsx("code",{children:"ListView.builder"}),"."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Você já sabe montar telas Material. Os próximos capítulos detalham ",e.jsx("strong",{children:"Cupertino"})," (versão iOS), ",e.jsx("strong",{children:"Temas & Cores"})," (personalização global) e ",e.jsx("strong",{children:"Navigator"})," (transição entre telas)."]}),e.jsxs(a,{type:"success",title:"Dica de exploração",children:["Abra a documentação oficial do ",e.jsx("code",{children:"Scaffold"})," e do ",e.jsx("code",{children:"AppBar"}),". Cada parâmetro tem exemplo. Esses dois widgets sozinhos já cobrem 80% das telas que você vai criar."]})]})}export{t as default};
