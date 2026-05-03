import{j as e}from"./index-D4AOhXGO.js";import{P as o,C as i,A as a}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(o,{title:"Cupertino (iOS)",subtitle:"Widgets Flutter com a aparência e o comportamento nativos do iOS.",difficulty:"intermediario",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsx("p",{children:'Usuários de iPhone esperam um app que "pareça iOS": switches arredondados, botões azuis sem sombra, navegação que desliza da direita, fonte San Francisco. Se você entregar um app com cara de Material num iPhone, ele soa "errado" — e a Apple pode até pedir ajustes na revisão da App Store.'}),e.jsxs("p",{children:["O Flutter resolve isso com a biblioteca ",e.jsx("strong",{children:"Cupertino"}),": widgets que imitam fielmente os componentes do iOS, pixel a pixel."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Cupertino é uma biblioteca ",e.jsx("em",{children:"paralela"})," ao Material. Para cada widget Material existe normalmente um equivalente Cupertino:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"MaterialApp"})," ↔ ",e.jsx("code",{children:"CupertinoApp"})]}),e.jsxs("li",{children:[e.jsx("code",{children:"Scaffold"})," ↔ ",e.jsx("code",{children:"CupertinoPageScaffold"})]}),e.jsxs("li",{children:[e.jsx("code",{children:"AppBar"})," ↔ ",e.jsx("code",{children:"CupertinoNavigationBar"})]}),e.jsxs("li",{children:[e.jsx("code",{children:"ElevatedButton"})," ↔ ",e.jsx("code",{children:"CupertinoButton"})]}),e.jsxs("li",{children:[e.jsx("code",{children:"Switch"})," ↔ ",e.jsx("code",{children:"CupertinoSwitch"})]}),e.jsxs("li",{children:[e.jsx("code",{children:"AlertDialog"})," ↔ ",e.jsx("code",{children:"CupertinoAlertDialog"})]}),e.jsxs("li",{children:[e.jsx("code",{children:"BottomNavigationBar"})," ↔ ",e.jsx("code",{children:"CupertinoTabBar"})]})]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx("p",{children:"Você importa o pacote Cupertino no lugar (ou junto) do Material:"}),e.jsx(i,{title:"import",code:`// Cupertino sozinho — para apps 100% iOS.
import 'package:flutter/cupertino.dart';

// Cupertino + Material — para apps híbridos com .adaptive.
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';`}),e.jsx("p",{children:"Uma tela mínima Cupertino:"}),e.jsx(i,{title:"lib/main.dart",code:`import 'package:flutter/cupertino.dart';

void main() => runApp(const MeuApp());

class MeuApp extends StatelessWidget {
  const MeuApp({super.key});

  @override
  Widget build(BuildContext context) {
    // CupertinoApp configura tema iOS e navegação.
    return const CupertinoApp(
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      // Barra de navegação no estilo iOS (centralizada).
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Início'),
      ),
      child: Center(
        child: CupertinoButton.filled(
          onPressed: () {},
          child: const Text('OK'),
        ),
      ),
    );
  }
}`}),e.jsx("h2",{children:"Exemplo prático: diálogo nativo iOS"}),e.jsx("p",{children:'Mostrar uma confirmação no estilo iOS (botão vermelho de "Excluir", azul de "Cancelar"):'}),e.jsx(i,{title:"confirmar_exclusao",code:`Future<void> confirmarExclusao(BuildContext context) async {
  final confirmar = await showCupertinoDialog<bool>(
    context: context,
    builder: (ctx) => CupertinoAlertDialog(
      title: const Text('Excluir item?'),
      content: const Text('Esta ação não pode ser desfeita.'),
      actions: [
        CupertinoDialogAction(
          onPressed: () => Navigator.pop(ctx, false),
          child: const Text('Cancelar'),
        ),
        CupertinoDialogAction(
          isDestructiveAction: true, // texto vermelho
          onPressed: () => Navigator.pop(ctx, true),
          child: const Text('Excluir'),
        ),
      ],
    ),
  );

  if (confirmar == true) {
    // Exclui de fato...
  }
}`}),e.jsx("h2",{children:"Widgets adaptativos"}),e.jsxs("p",{children:["Para apps que rodam tanto em Android quanto em iOS e devem mudar a aparência conforme a plataforma, o Flutter oferece construtores ",e.jsx("code",{children:".adaptive"})," em alguns widgets Material:"]}),e.jsx(i,{title:"adaptive",code:`// Vira CupertinoSwitch no iOS, Switch no Android.
Switch.adaptive(
  value: ligado,
  onChanged: (v) => setState(() => ligado = v),
)

// Vira CupertinoActivityIndicator no iOS.
const CircularProgressIndicator.adaptive()

// Vira CupertinoSlider no iOS.
Slider.adaptive(value: 0.5, onChanged: (v) {})`}),e.jsxs(a,{type:"info",title:"Quando usar Cupertino puro vs adaptive",children:["Se seu app é ",e.jsx("strong",{children:"exclusivamente iOS"})," (ou precisa de aprovação rigorosa da Apple), use ",e.jsx("code",{children:"CupertinoApp"})," e widgets Cupertino. Se é multiplataforma com identidade própria, fique no Material e use ",e.jsx("code",{children:".adaptive"})," nos pontos onde a plataforma é importante (switches, indicadores, alertas)."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Misturar ",e.jsx("code",{children:"CupertinoApp"})," e widgets Material:"]})," usar um ",e.jsx("code",{children:"ElevatedButton"})," dentro de ",e.jsx("code",{children:"CupertinoApp"})," funciona, mas o botão fica sem cor de tema (Material precisa de ",e.jsx("code",{children:"MaterialApp"})," para herdar ",e.jsx("code",{children:"ThemeData"}),")."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esperar Cupertino paridade total:"})," nem todo widget Material tem equivalente. Listas, formulários complexos e alguns indicadores ainda exigem soluções customizadas."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ignorar a fonte:"})," Cupertino tenta usar San Francisco no iOS, mas em outras plataformas cai numa fonte similar. Se a tipografia é crítica, configure manualmente."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Pop gesture:"})," no iOS o usuário arrasta da esquerda para voltar. ",e.jsx("code",{children:"CupertinoPageRoute"})," habilita isso por padrão; ",e.jsx("code",{children:"MaterialPageRoute"})," não."]})]}),e.jsx(a,{type:"warning",title:"Não force iOS no Android",children:'Apps Android com cara de iOS confundem o usuário. Não vale a pena "padronizar" só porque é mais fácil — Android tem seu próprio sistema de gestos e expectativas.'}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(a,{type:"tip",children:e.jsxs("ul",{children:[e.jsx("li",{children:"Decida cedo: o app é Material, Cupertino ou híbrido? Trocar depois é trabalhoso."}),e.jsxs("li",{children:["Em apps híbridos, isole widgets específicos de plataforma em arquivos separados (",e.jsx("code",{children:"botao_adaptativo.dart"}),") para facilitar manutenção."]}),e.jsx("li",{children:'Teste em ambos os simuladores. O que parece "ok" no Android pode ficar quebrado no iPhone.'}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"defaultTargetPlatform"})," ou ",e.jsx("code",{children:"Theme.of(context).platform"})," para checar plataforma quando precisar de lógica condicional."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:['Já viu o "lado iOS" do Flutter. Em seguida, ',e.jsx("strong",{children:"Temas & Cores"})," mostra como personalizar a aparência global (Material e Cupertino)."]}),e.jsxs(a,{type:"success",title:"Documentação visual",children:["A galeria oficial ",e.jsx("em",{children:"Flutter Cupertino Gallery"})," (no flutter.dev) mostra cada widget Cupertino em ação. Vale folhear antes de começar um app iOS."]})]})}export{n as default};
