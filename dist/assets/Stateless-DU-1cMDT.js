import{j as e}from"./index-D4AOhXGO.js";import{P as r,C as o,A as s}from"./AlertBox-Dyf2wdSA.js";function a(){return e.jsxs(r,{title:"StatelessWidget",subtitle:"Widgets imutáveis — sua aparência só depende dos parâmetros que você passa.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["A maior parte da sua UI é estática: cabeçalhos, ícones, cards de produto, mensagens de erro. Para tudo isso, você usa ",e.jsx("code",{children:"StatelessWidget"}),". Saber identificar quando um widget é stateless evita complicar o código com ",e.jsx("code",{children:"setState"})," desnecessário e ainda dá performance de graça (porque widgets ",e.jsx("code",{children:"const"})," são reaproveitados em rebuilds)."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Um ",e.jsx("strong",{children:"StatelessWidget"})," é uma ",e.jsx("em",{children:"função pura"}),' disfarçada de classe: você dá os mesmos parâmetros, recebe a mesma árvore de widgets. Ele não "lembra" nada entre rebuilds — se a tela precisa mudar, o pai recria o widget com novos parâmetros.']}),e.jsxs("p",{children:["Pense como um carimbo: o desenho é fixo, só a tinta (parâmetros) muda. Se for uma vez, é stateless. Se ele precisa contar quantas vezes foi clicado ",e.jsx("em",{children:"internamente"}),", aí entra ",e.jsx("code",{children:"StatefulWidget"}),"."]}),e.jsx("h2",{children:"Como Flutter faz"}),e.jsx(o,{title:"Estrutura mínima",code:`import 'package:flutter/material.dart';

// Sempre extends StatelessWidget
class Saudacao extends StatelessWidget {
  // Campos final — imutáveis depois de construídos
  final String nome;

  // const construtor — permite reuso e evita rebuild
  const Saudacao({super.key, required this.nome});

  @override
  Widget build(BuildContext context) {
    // build retorna a árvore de widgets para o estado atual
    return Text('Olá, $nome!');
  }
}`}),e.jsxs(s,{type:"tip",title:"Regra de ouro do const",children:["Se todos os campos são ",e.jsx("code",{children:"final"})," e os filhos são ",e.jsx("code",{children:"const"}),", marque o construtor como ",e.jsx("code",{children:"const"}),". O Flutter cacheia a instância e pula o rebuild inteiro."]}),e.jsx("h2",{children:"Exemplo prático"}),e.jsx("p",{children:"Um card de produto reutilizável. Note que ele recebe tudo que precisa por parâmetro — nada de estado interno:"}),e.jsx(o,{title:"lib/widgets/card_produto.dart",code:`import 'package:flutter/material.dart';

class CardProduto extends StatelessWidget {
  final String titulo;
  final double preco;
  final String urlImagem;
  final VoidCallback onComprar; // callback do pai

  const CardProduto({
    super.key,
    required this.titulo,
    required this.preco,
    required this.urlImagem,
    required this.onComprar,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          Image.network(urlImagem, height: 120, fit: BoxFit.cover),
          Padding(
            padding: const EdgeInsets.all(8),
            child: Text(titulo,
              style: Theme.of(context).textTheme.titleMedium),
          ),
          Text('R\\$ \${preco.toStringAsFixed(2)}'),
          ElevatedButton(
            onPressed: onComprar, // o pai decide o que fazer
            child: const Text('Comprar'),
          ),
        ],
      ),
    );
  }
}`}),e.jsx("p",{children:"Quem usa só passa os dados:"}),e.jsx(o,{code:`CardProduto(
  titulo: 'Caneca Flutter',
  preco: 39.90,
  urlImagem: 'https://...',
  onComprar: () => carrinho.adicionar(produto),
)`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Tentar guardar variáveis mutáveis dentro do StatelessWidget. Não funciona — o widget é descartado a cada rebuild do pai. Use StatefulWidget ou um gerenciador de estado."}),e.jsxs("li",{children:["Esquecer ",e.jsx("code",{children:"const"})," no construtor. O lint ",e.jsx("code",{children:"prefer_const_constructors"})," avisa."]}),e.jsx("li",{children:"Receber muitos parâmetros opcionais e ficar com construtor gigante. Quebre em widgets menores."}),e.jsxs("li",{children:["Acessar ",e.jsx("code",{children:"InheritedWidget"})," (como ",e.jsx("code",{children:"Theme.of(context)"}),") fora do ",e.jsx("code",{children:"build"}),". Esses dados só existem com o context — sempre dentro de ",e.jsx("code",{children:"build"}),"."]})]}),e.jsxs(s,{type:"warning",title:"Não confunda 'final' com 'const'",children:[e.jsx("code",{children:"final"})," diz que a variável não muda depois de atribuída (em runtime). ",e.jsx("code",{children:"const"})," diz que o valor é conhecido em tempo de compilação. Construtor ",e.jsx("code",{children:"const"})," exige todos os campos ",e.jsx("code",{children:"final"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Comece sempre por StatelessWidget. Só promova para Stateful quando precisar de estado interno."}),e.jsxs("li",{children:["Receba callbacks (",e.jsx("code",{children:"VoidCallback"}),", ",e.jsx("code",{children:"ValueChanged<T>"}),") em vez de manipular o pai diretamente."]}),e.jsxs("li",{children:["Quebre ",e.jsx("code",{children:"build"})," grande em métodos privados ou subwidgets. Subwidgets ",e.jsx("code",{children:"const"})," também ajudam o framework a pular trabalho."]}),e.jsxs("li",{children:["Use a chave ",e.jsx("code",{children:"key"})," só quando necessário (listas reordenáveis). Para o resto, ",e.jsx("code",{children:"super.key"})," e deixe o Flutter cuidar."]})]}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Quando seu widget precisa lembrar algo (contador, texto digitado, animação), ele vira ",e.jsx("code",{children:"StatefulWidget"}),". É o próximo capítulo."]}),e.jsxs(s,{type:"success",title:"Você consolidou",children:["StatelessWidget = função pura. Mesmos parâmetros, mesma UI. Use ",e.jsx("code",{children:"const"})," sempre que puder e respire mais leve."]})]})}export{a as default};
