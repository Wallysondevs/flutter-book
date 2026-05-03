import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Container() {
  return (
    <PageContainer
      title="Container & BoxDecoration"
      subtitle="O canivete suíço para pintar caixas com bordas, sombras, gradientes e padding."
      difficulty="iniciante"
      timeToRead="11 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        <code>Container</code> é provavelmente o widget mais usado em Flutter. Ele combina padding, margin, tamanho, alinhamento e decoração visual em um só lugar. Mas justamente por fazer tudo, é fácil usar mal — gastando memória, atrapalhando layout responsivo ou criando código difícil de ler.
      </p>

      <h2>O conceito</h2>
      <p>
        <code>Container</code> é um <strong>widget de conveniência</strong>: por trás, ele combina vários widgets menores (<code>Padding</code>, <code>DecoratedBox</code>, <code>ConstrainedBox</code>, <code>Align</code>, <code>Transform</code>) numa árvore. Se você só precisa de um deles, use direto — fica mais leve e mais claro.
      </p>
      <p>
        Pense em Container como uma "caixa" com várias camadas: margem por fora, depois fundo decorado, depois padding por dentro, depois o filho.
      </p>

      <h2>Como Flutter faz</h2>
      <CodeBlock title="Anatomia visual" code={`Container(
  // Espaço FORA da caixa
  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

  // Restrições de tamanho
  width: 200,
  height: 80,

  // Decoração: cor, borda, raio, sombra, gradiente
  decoration: BoxDecoration(
    color: Colors.white, // OU use 'color' direto, não os dois
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.grey.shade300),
    boxShadow: const [
      BoxShadow(
        blurRadius: 8,
        offset: Offset(0, 2),
        color: Colors.black12,
      ),
    ],
  ),

  // Espaço DENTRO da caixa, antes do filho
  padding: const EdgeInsets.all(16),

  // Alinhamento do filho dentro do espaço disponível
  alignment: Alignment.center,

  child: const Text('Olá'),
)`} />

      <AlertBox type="warning" title="color vs decoration.color">
        Se você passa <code>color</code> e <code>decoration</code> ao mesmo tempo, o Flutter joga uma exceção. Coloque a cor <strong>dentro</strong> do <code>BoxDecoration</code>.
      </AlertBox>

      <h2>Exemplo prático: card com gradiente</h2>
      <CodeBlock title="Card de estatística" code={`class CardSaldo extends StatelessWidget {
  final double saldo;
  const CardSaldo({super.key, required this.saldo});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF6366F1), Color(0xFF8B5CF6)],
        ),
        boxShadow: [
          BoxShadow(
            blurRadius: 16,
            offset: const Offset(0, 8),
            color: Colors.indigo.withOpacity(0.3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Saldo disponível',
              style: TextStyle(color: Colors.white70)),
          const SizedBox(height: 8),
          Text(
            'R\\\$ \${saldo.toStringAsFixed(2)}',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}`} />

      <h2>Tamanho: como ele decide?</h2>
      <p>
        Container sem <code>width</code>/<code>height</code>:
      </p>
      <ul>
        <li>Se tem filho — assume o tamanho do filho.</li>
        <li>Se não tem filho — tenta ocupar tudo que o pai oferece.</li>
        <li>Com <code>alignment</code> definido — também tenta ser o maior possível.</li>
      </ul>
      <p>
        Use <code>constraints: BoxConstraints(maxWidth: 400)</code> para limites flexíveis em vez de <code>width</code> fixo.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li>Usar Container só para padding. Use <code>Padding</code> direto — mais legível, mais leve.</li>
        <li>Usar Container só para espaçar widgets. Use <code>SizedBox(height: 16)</code> — propósito explícito.</li>
        <li>Encadear vários Containers aninhados. Combine no <code>BoxDecoration</code>.</li>
        <li>Achar que <code>borderRadius</code> recorta o filho. Não recorta — para clipar uma <code>Image</code>, use <code>ClipRRect</code> ou <code>Material(clipBehavior: Clip.antiAlias)</code>.</li>
        <li>Esquecer <code>const</code> em <code>EdgeInsets</code>, <code>BoxShadow</code>, <code>Color</code>. Cada uma é uma alocação.</li>
      </ul>

      <AlertBox type="info" title="Quando NÃO usar Container">
        Só padding? <code>Padding</code>. Só espaçamento? <code>SizedBox</code>. Só centralizar? <code>Center</code>. Só cor? <code>ColoredBox</code>. Container compensa quando você combina <strong>3+ propriedades</strong>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        Centralize a aparência em <code>ThemeData</code> e use <code>CardTheme</code>, <code>BoxDecoration</code> reutilizáveis. Container espalhado pelo app vira pesadelo de manutenção.
      </AlertBox>
      <ul>
        <li>Prefira <code>const EdgeInsets.all(16)</code> a recriar o objeto.</li>
        <li>Para imagens com cantos, use <code>ClipRRect</code> em vez de Container com border.</li>
        <li>Use <code>DecoratedBox</code> direto quando só precisa da decoração — é o widget que Container usa por baixo.</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Com Container você pinta caixas. A seguir, vamos organizar várias delas com <strong>Row e Column</strong>.
      </p>
      <AlertBox type="success" title="Pronto">
        Container é canivete suíço — útil, mas a ferramenta certa para o trabalho costuma ser melhor.
      </AlertBox>
    </PageContainer>
  );
}
