import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Stateless() {
  return (
    <PageContainer
      title="StatelessWidget"
      subtitle="Widgets imutáveis — sua aparência só depende dos parâmetros que você passa."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        A maior parte da sua UI é estática: cabeçalhos, ícones, cards de produto, mensagens de erro. Para tudo isso, você usa <code>StatelessWidget</code>. Saber identificar quando um widget é stateless evita complicar o código com <code>setState</code> desnecessário e ainda dá performance de graça (porque widgets <code>const</code> são reaproveitados em rebuilds).
      </p>

      <h2>O conceito</h2>
      <p>
        Um <strong>StatelessWidget</strong> é uma <em>função pura</em> disfarçada de classe: você dá os mesmos parâmetros, recebe a mesma árvore de widgets. Ele não "lembra" nada entre rebuilds — se a tela precisa mudar, o pai recria o widget com novos parâmetros.
      </p>
      <p>
        Pense como um carimbo: o desenho é fixo, só a tinta (parâmetros) muda. Se for uma vez, é stateless. Se ele precisa contar quantas vezes foi clicado <em>internamente</em>, aí entra <code>StatefulWidget</code>.
      </p>

      <h2>Como Flutter faz</h2>
      <CodeBlock title="Estrutura mínima" code={`import 'package:flutter/material.dart';

// Sempre extends StatelessWidget
class Saudacao extends StatelessWidget {
  // Campos final — imutáveis depois de construídos
  final String nome;

  // const construtor — permite reuso e evita rebuild
  const Saudacao({super.key, required this.nome});

  @override
  Widget build(BuildContext context) {
    // build retorna a árvore de widgets para o estado atual
    return Text('Olá, \$nome!');
  }
}`} />

      <AlertBox type="tip" title="Regra de ouro do const">
        Se todos os campos são <code>final</code> e os filhos são <code>const</code>, marque o construtor como <code>const</code>. O Flutter cacheia a instância e pula o rebuild inteiro.
      </AlertBox>

      <h2>Exemplo prático</h2>
      <p>
        Um card de produto reutilizável. Note que ele recebe tudo que precisa por parâmetro — nada de estado interno:
      </p>

      <CodeBlock title="lib/widgets/card_produto.dart" code={`import 'package:flutter/material.dart';

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
          Text('R\\\$ \${preco.toStringAsFixed(2)}'),
          ElevatedButton(
            onPressed: onComprar, // o pai decide o que fazer
            child: const Text('Comprar'),
          ),
        ],
      ),
    );
  }
}`} />

      <p>
        Quem usa só passa os dados:
      </p>
      <CodeBlock code={`CardProduto(
  titulo: 'Caneca Flutter',
  preco: 39.90,
  urlImagem: 'https://...',
  onComprar: () => carrinho.adicionar(produto),
)`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Tentar guardar variáveis mutáveis dentro do StatelessWidget. Não funciona — o widget é descartado a cada rebuild do pai. Use StatefulWidget ou um gerenciador de estado.</li>
        <li>Esquecer <code>const</code> no construtor. O lint <code>prefer_const_constructors</code> avisa.</li>
        <li>Receber muitos parâmetros opcionais e ficar com construtor gigante. Quebre em widgets menores.</li>
        <li>Acessar <code>InheritedWidget</code> (como <code>Theme.of(context)</code>) fora do <code>build</code>. Esses dados só existem com o context — sempre dentro de <code>build</code>.</li>
      </ul>

      <AlertBox type="warning" title="Não confunda 'final' com 'const'">
        <code>final</code> diz que a variável não muda depois de atribuída (em runtime). <code>const</code> diz que o valor é conhecido em tempo de compilação. Construtor <code>const</code> exige todos os campos <code>final</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <ul>
        <li>Comece sempre por StatelessWidget. Só promova para Stateful quando precisar de estado interno.</li>
        <li>Receba callbacks (<code>VoidCallback</code>, <code>ValueChanged&lt;T&gt;</code>) em vez de manipular o pai diretamente.</li>
        <li>Quebre <code>build</code> grande em métodos privados ou subwidgets. Subwidgets <code>const</code> também ajudam o framework a pular trabalho.</li>
        <li>Use a chave <code>key</code> só quando necessário (listas reordenáveis). Para o resto, <code>super.key</code> e deixe o Flutter cuidar.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Quando seu widget precisa lembrar algo (contador, texto digitado, animação), ele vira <code>StatefulWidget</code>. É o próximo capítulo.
      </p>
      <AlertBox type="success" title="Você consolidou">
        StatelessWidget = função pura. Mesmos parâmetros, mesma UI. Use <code>const</code> sempre que puder e respire mais leve.
      </AlertBox>
    </PageContainer>
  );
}
