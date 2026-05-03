import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Material() {
  return (
    <PageContainer
      title="Material Design"
      subtitle="O sistema de design do Google encarnado em widgets Flutter — pronto para usar."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quando você cria um app Flutter novo, ele já vem com cara de Material Design: botões arredondados, AppBar no topo, animações de ripple ao tocar. Isso não é mágica — é uma <strong>biblioteca enorme de widgets</strong> que o Flutter te dá de graça. Saber quais existem e como combiná-los economiza semanas de trabalho.
      </p>
      <p>
        Material é o sistema visual oficial do Google (usado no Gmail, YouTube, Android). No Flutter, ele virou um conjunto de widgets prontos que respeitam tema, acessibilidade e gestos.
      </p>

      <h2>O conceito</h2>
      <p>
        Pense em Material como um <em>kit de peças Lego</em>: cada peça (widget) tem um propósito claro e se encaixa nas outras. Você não precisa desenhar um botão do zero — usa <code>ElevatedButton</code> e ele já vem com sombra, ripple, foco de teclado e suporte a tema.
      </p>
      <p>
        Tudo começa importando o pacote certo no topo do arquivo:
      </p>

      <CodeBlock title="lib/main.dart" code={`// Importa TODOS os widgets Material de uma vez.
import 'package:flutter/material.dart';`} />

      <h2>Como Flutter organiza os widgets Material</h2>
      <p>
        Existe uma hierarquia clara. Os mais importantes para iniciantes:
      </p>
      <ul>
        <li><code>MaterialApp</code> — raiz do app. Configura tema, rotas, idioma. Sempre o widget mais externo.</li>
        <li><code>Scaffold</code> — esqueleto de uma tela: tem slots para AppBar, body, FAB, drawer, bottomNavigationBar.</li>
        <li><code>AppBar</code> — barra superior com título, ícones de ação e botão de voltar automático.</li>
        <li><code>FloatingActionButton</code> (FAB) — botão circular flutuante para a ação principal da tela.</li>
        <li><code>BottomNavigationBar</code> / <code>NavigationBar</code> — abas inferiores para alternar seções.</li>
        <li><code>Drawer</code> — menu lateral que desliza da esquerda.</li>
        <li><code>Card</code>, <code>ListTile</code>, <code>Chip</code>, <code>Dialog</code>, <code>SnackBar</code> — blocos de conteúdo prontos.</li>
      </ul>

      <h2>Exemplo prático: tela completa</h2>
      <p>
        Uma tela "real" usa vários desses widgets juntos. Veja uma tela de perfil simplificada:
      </p>

      <CodeBlock title="lib/perfil_page.dart" code={`import 'package:flutter/material.dart';

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
}`} />

      <p>
        Resultado: uma tela com AppBar azul, dois cards na lista e um botão circular azul no canto inferior direito. Tudo já responde a toques com animação de ripple.
      </p>

      <AlertBox type="info" title="Material 3 é o padrão">
        Desde Flutter 3.16+, projetos novos usam <strong>Material 3</strong> automaticamente (<code>useMaterial3: true</code>). As cores, formas e tipografia são mais modernas. Se você abrir um tutorial antigo e tudo parecer "azulão chapado", é Material 2.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer o Scaffold:</strong> chamar <code>showSnackBar</code> ou abrir um <code>Drawer</code> sem ter um Scaffold acima na árvore lança erro em runtime.</li>
        <li><strong>AppBar dentro do body:</strong> AppBar vai no slot <code>appBar:</code> do Scaffold, não dentro de uma Column. Caso contrário você perde o status bar e a integração de tema.</li>
        <li><strong>Misturar Material e Cupertino sem cuidado:</strong> usar <code>CupertinoButton</code> dentro de um app Material funciona, mas o tema/animações não combinam. Para isso existem os widgets <code>.adaptive</code>.</li>
        <li><strong>Ignorar o tema:</strong> definir cores hardcoded (<code>color: Colors.blue</code>) em todo widget quebra o modo escuro. Use <code>Theme.of(context).colorScheme.primary</code>.</li>
      </ul>

      <AlertBox type="warning" title="Scaffold por tela">
        Cada tela ("rota") deve ter o seu próprio Scaffold. Não tente reutilizar um único Scaffold global — você perde animações de transição entre páginas.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Comece sempre por <code>MaterialApp</code> &gt; <code>Scaffold</code>. É o esqueleto padrão.</li>
          <li>Use widgets prontos (<code>Card</code>, <code>ListTile</code>, <code>Chip</code>) antes de inventar layouts manuais.</li>
          <li>Defina cores e tipografia no <code>ThemeData</code> uma vez só — não repita estilos em cada widget.</li>
          <li>Para feedback rápido use <code>SnackBar</code>; para perguntas use <code>AlertDialog</code>; para listas longas use <code>ListView.builder</code>.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Você já sabe montar telas Material. Os próximos capítulos detalham <strong>Cupertino</strong> (versão iOS), <strong>Temas &amp; Cores</strong> (personalização global) e <strong>Navigator</strong> (transição entre telas).
      </p>

      <AlertBox type="success" title="Dica de exploração">
        Abra a documentação oficial do <code>Scaffold</code> e do <code>AppBar</code>. Cada parâmetro tem exemplo. Esses dois widgets sozinhos já cobrem 80% das telas que você vai criar.
      </AlertBox>
    </PageContainer>
  );
}
