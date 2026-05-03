import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Sealed() {
  return (
    <PageContainer
      title="Sealed Classes"
      subtitle="Hierarquias fechadas — perfeitas para modelar estados, resultados e eventos com segurança total."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quase toda tela tem três estados: <strong>carregando</strong>, <strong>dados ok</strong>, <strong>erro</strong>. A forma errada de modelar isso é ter três booleanos (<code>isLoading</code>, <code>hasError</code>, <code>data</code>) e rezar para nunca ficarem inconsistentes ("loading e error ao mesmo tempo?").
      </p>
      <p>
        <strong>Sealed classes</strong> resolvem isso de raiz: você define os estados possíveis como tipos diferentes. O compilador, junto com o <code>switch</code>, te <em>obriga</em> a tratar todos. Quando você adicionar um quarto estado, o app não compila até você lidar com ele em todos os lugares. Isso é segurança de verdade.
      </p>

      <h2>O conceito</h2>
      <p>
        Uma classe <code>sealed</code> (introduzida no Dart 3) é uma classe abstrata com uma restrição forte: <strong>só pode ser estendida ou implementada dentro do mesmo arquivo</strong>. Ou seja, o compilador conhece todas as subclasses possíveis.
      </p>
      <p>
        Combinada com <code>switch</code> de pattern matching, isso ativa o <strong>exhaustiveness check</strong>: se você esquecer um caso, é erro de compilação. Não é warning — não compila.
      </p>

      <h2>Como Dart faz</h2>
      <CodeBlock title="estado_tela.dart" code={`// 'sealed' = não pode ser instanciada nem estendida fora deste arquivo.
sealed class EstadoTela {
  const EstadoTela();
}

// Cada estado é uma classe concreta com seus próprios dados.
class Carregando extends EstadoTela {
  const Carregando();
}

class Sucesso extends EstadoTela {
  final List<String> itens;
  const Sucesso(this.itens);
}

class Erro extends EstadoTela {
  final String mensagem;
  const Erro(this.mensagem);
}`} />

      <p>
        Repare: nenhum <code>bool</code>, nenhum campo "talvez nulo". Cada estado carrega exatamente o que faz sentido — Sucesso tem itens, Erro tem mensagem, Carregando não precisa de nada.
      </p>

      <h2>Pattern matching exaustivo</h2>
      <p>
        A grande virada chega aqui: o <code>switch</code> como <em>expressão</em> exige cobrir todos os subtipos.
      </p>

      <CodeBlock title="lista_screen.dart" code={`Widget build(BuildContext context) {
  // 'switch' como expressão retorna um valor.
  // ':final dados' faz desestruturação do campo.
  return switch (estado) {
    Carregando() => const Center(
        child: CircularProgressIndicator(),
      ),
    Sucesso(:final itens) => ListView.builder(
        itemCount: itens.length,
        itemBuilder: (_, i) => ListTile(title: Text(itens[i])),
      ),
    Erro(:final mensagem) => Center(
        child: Text('Falhou: \$mensagem'),
      ),
  };
}`} />

      <AlertBox type="success" title="O compilador é seu colega de revisão">
        Adicione amanhã um quarto estado <code>SemConexao</code>. Cada <code>switch</code> espalhado pelo app vai parar de compilar até você tratar o novo caso. Em times grandes, isso vale ouro.
      </AlertBox>

      <h2>Exemplo prático: Result&lt;T&gt;</h2>
      <p>
        Outro uso clássico é representar o resultado de uma operação que pode falhar — sem precisar de exceções para fluxo previsível.
      </p>

      <CodeBlock title="result.dart" code={`sealed class Result<T> {
  const Result();
}

class Ok<T> extends Result<T> {
  final T valor;
  const Ok(this.valor);
}

class Falha<T> extends Result<T> {
  final String mensagem;
  final Object? causa;
  const Falha(this.mensagem, [this.causa]);
}

// Uso:
Future<Result<Usuario>> buscarUsuario(String id) async {
  try {
    final r = await dio.get('/usuarios/\$id');
    return Ok(Usuario.fromJson(r.data));
  } catch (e) {
    return Falha('Não consegui buscar usuário', e);
  }
}

// No chamador:
final r = await buscarUsuario('42');
final mensagem = switch (r) {
  Ok(:final valor) => 'Olá, \${valor.nome}',
  Falha(:final mensagem) => 'Erro: \$mensagem',
};`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Tentar herdar de outro arquivo</strong>: erro de compilação. Coloque a sealed e todos os subtipos no mesmo <code>.dart</code>.</li>
        <li><strong>Usar <code>switch</code> como statement (sem retorno)</strong>: não há checagem de exaustividade. Prefira <code>switch</code> como <em>expressão</em>.</li>
        <li><strong>Default desnecessário</strong>: se você adicionar <code>default:</code>, perde a verificação de exaustividade. Tire o default sempre que possível.</li>
        <li><strong>Confundir <code>sealed</code> com <code>final</code></strong>: <code>final class</code> impede só herança fora do arquivo, mas pode ser instanciada. <code>sealed</code> também impede instanciação direta.</li>
      </ul>

      <AlertBox type="warning" title="Ainda dá pra fazer errado">
        Se você ignorar o switch e usar <code>if (estado is Sucesso)</code>, perde a checagem do compilador. <code>switch</code> de expressão é a melhor amiga das sealed classes.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use sealed para <strong>conjuntos pequenos e estáveis</strong> de variantes (estados de tela, eventos, resultados).</li>
          <li>Prefira <code>const</code> nos construtores quando não há campos mutáveis.</li>
          <li>Combine com <code>freezed</code> em apps grandes — ele gera <code>copyWith</code>, <code>==</code> e <code>toString</code> de graça.</li>
          <li>Não force sealed em hierarquias grandes/abertas (ex: lista de plugins de terceiros) — use abstract class normal.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Sealed classes são o alicerce de várias arquiteturas modernas em Flutter (BLoC com eventos/estados, Riverpod com <code>AsyncValue</code>). Domine isso antes de mergulhar em gerenciamento de estado.
      </p>
      <AlertBox type="info">
        Próximo: <strong>Extension Methods</strong> — adicione comportamento a tipos que você não escreveu.
      </AlertBox>
    </PageContainer>
  );
}
