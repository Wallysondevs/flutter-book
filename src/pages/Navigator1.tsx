import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Navigator1() {
  return (
    <PageContainer
      title="Navigator 1.0"
      subtitle="A API imperativa de navegação — empilhe e desempilhe telas com push e pop."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quase todo app tem mais de uma tela: lista → detalhe, login → home, formulário → confirmação. Você precisa de uma forma de "ir para outra tela" e "voltar". No Flutter, isso é trabalho do <strong>Navigator</strong>.
      </p>
      <p>
        Navigator 1.0 é a API mais antiga e simples. É o suficiente para apps pequenos e médios, e ainda é a base sobre a qual <code>go_router</code> e Navigator 2.0 funcionam.
      </p>

      <h2>O conceito</h2>
      <p>
        Pense no Navigator como uma <em>pilha de cartas</em>: cada tela é uma carta. Você empilha (<code>push</code>) uma nova carta no topo e a vê. Para voltar, tira a carta do topo (<code>pop</code>) e revê a anterior.
      </p>
      <ul>
        <li><strong>push</strong> — adiciona uma tela no topo (anima entrando da direita).</li>
        <li><strong>pop</strong> — remove a tela do topo (anima saindo). O botão de voltar do Android e o gesto do iOS chamam pop automaticamente.</li>
        <li><strong>pushReplacement</strong> — substitui a tela atual (ex: login → home, sem deixar voltar para login).</li>
        <li><strong>pushAndRemoveUntil</strong> — empilha e limpa o histórico (logout total).</li>
      </ul>

      <h2>Como Flutter faz</h2>
      <p>
        A forma básica usa <code>MaterialPageRoute</code>, que cria a animação de slide automática:
      </p>

      <CodeBlock title="navegação básica" code={`// Ir para uma nova tela.
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (ctx) => const DetalhesPage(),
  ),
);

// Voltar para a tela anterior.
Navigator.pop(context);

// Voltar passando um valor (ex: item escolhido).
Navigator.pop(context, 'pizza');`} />

      <p>
        O <code>builder</code> recebe um <code>BuildContext</code> e retorna a nova tela. O Flutter cuida da animação, do botão de voltar e do gesto de swipe no iOS.
      </p>

      <h2>Exemplo prático: lista → detalhe → resultado</h2>
      <p>
        Cenário comum: o usuário escolhe um item de uma lista, vai para uma tela de detalhe e a tela retorna um valor (ex: "marcado como favorito").
      </p>

      <CodeBlock title="lib/lista_page.dart" code={`import 'package:flutter/material.dart';

class ListaPage extends StatefulWidget {
  const ListaPage({super.key});

  @override
  State<ListaPage> createState() => _ListaPageState();
}

class _ListaPageState extends State<ListaPage> {
  String? mensagem;

  Future<void> abrirDetalhe(String produto) async {
    // push retorna um Future com o valor passado em pop.
    final resultado = await Navigator.push<bool>(
      context,
      MaterialPageRoute(
        builder: (ctx) => DetalhePage(produto: produto),
      ),
    );

    // Quando a tela de detalhe der pop, caímos aqui.
    if (resultado == true) {
      setState(() => mensagem = '\$produto favoritado!');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Produtos')),
      body: Column(
        children: [
          if (mensagem != null)
            Padding(
              padding: const EdgeInsets.all(16),
              child: Text(mensagem!),
            ),
          Expanded(
            child: ListView(
              children: [
                for (final p in const ['Camisa', 'Tênis', 'Boné'])
                  ListTile(
                    title: Text(p),
                    onTap: () => abrirDetalhe(p),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class DetalhePage extends StatelessWidget {
  final String produto;
  const DetalhePage({super.key, required this.produto});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(produto)),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.pop(context, true),
          child: const Text('Favoritar e voltar'),
        ),
      ),
    );
  }
}`} />

      <p>
        Repare no <strong>tipo genérico</strong> em <code>Navigator.push&lt;bool&gt;</code>: ele garante que o <code>resultado</code> seja <code>bool?</code>. Se o usuário só apertar voltar (sem clicar no botão), o resultado vem <code>null</code>.
      </p>

      <h2>Rotas nomeadas (alternativa)</h2>
      <p>
        Em vez de passar a classe da tela em todo push, você pode registrar nomes:
      </p>

      <CodeBlock title="rotas nomeadas" code={`MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (ctx) => const HomePage(),
    '/perfil': (ctx) => const PerfilPage(),
    '/sobre': (ctx) => const SobrePage(),
  },
);

// Para navegar:
Navigator.pushNamed(context, '/perfil');`} />

      <AlertBox type="info" title="Rotas nomeadas têm limite">
        Funcionam bem para apps simples, mas não suportam parâmetros tipados nem deep links com facilidade. Para isso, prefira <code>go_router</code>.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer <code>await</code>:</strong> se você quer o valor retornado por pop, precisa marcar a função como <code>async</code> e usar <code>await</code> no push.</li>
        <li><strong>Usar context errado:</strong> chamar Navigator com um <code>context</code> que está acima do <code>MaterialApp</code> (ou desmontado) lança erro. Use o <code>context</code> da tela atual.</li>
        <li><strong>pop em tela única:</strong> dar pop quando só existe uma tela na pilha fecha o app no Android. Cheque com <code>Navigator.canPop(context)</code>.</li>
        <li><strong>Memory leak:</strong> manter referência de uma tela antiga (ex: passar callback que captura um <code>State</code> velho) impede o garbage collector de limpar.</li>
        <li><strong>setState após dispose:</strong> quando voltar de uma tela e tentar setState em widget já desmontado, dá erro. Cheque <code>if (!mounted) return;</code> antes.</li>
      </ul>

      <AlertBox type="warning" title="async + context = cuidado">
        Após um <code>await</code>, o widget pode ter sido desmontado. Antes de usar <code>context</code> de novo, verifique <code>if (!mounted) return;</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Para apps pequenos, Navigator 1.0 é suficiente — não complique.</li>
          <li>Tipifique o retorno do push: <code>Navigator.push&lt;TipoDoResultado&gt;</code>.</li>
          <li>Para apps com muitas telas, deep links ou web, migre cedo para <code>go_router</code>.</li>
          <li>Use <code>pushReplacement</code> quando o usuário não deve voltar (ex: depois do login).</li>
          <li>Use <code>pushAndRemoveUntil</code> para logout — limpa todo o histórico.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Próximo capítulo: <strong>Navigator 2.0</strong> — a API declarativa, mais poderosa mas verbosa. Depois, <strong>go_router</strong>, que é o que você vai usar de verdade no dia a dia.
      </p>

      <AlertBox type="success" title="Resumo prático">
        99% dos apps pequenos vivem felizes com push e pop. Não se sinta obrigado a migrar para coisas complexas se Navigator 1.0 resolve seu caso.
      </AlertBox>
    </PageContainer>
  );
}
