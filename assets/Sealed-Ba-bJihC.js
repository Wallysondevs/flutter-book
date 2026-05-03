import{j as e}from"./index-D9yRYXwO.js";import{P as o,C as a,A as s}from"./AlertBox-B2Rl5ETq.js";function d(){return e.jsxs(o,{title:"Sealed Classes",subtitle:"Hierarquias fechadas — perfeitas para modelar estados, resultados e eventos com segurança total.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quase toda tela tem três estados: ",e.jsx("strong",{children:"carregando"}),", ",e.jsx("strong",{children:"dados ok"}),", ",e.jsx("strong",{children:"erro"}),". A forma errada de modelar isso é ter três booleanos (",e.jsx("code",{children:"isLoading"}),", ",e.jsx("code",{children:"hasError"}),", ",e.jsx("code",{children:"data"}),') e rezar para nunca ficarem inconsistentes ("loading e error ao mesmo tempo?").']}),e.jsxs("p",{children:[e.jsx("strong",{children:"Sealed classes"})," resolvem isso de raiz: você define os estados possíveis como tipos diferentes. O compilador, junto com o ",e.jsx("code",{children:"switch"}),", te ",e.jsx("em",{children:"obriga"})," a tratar todos. Quando você adicionar um quarto estado, o app não compila até você lidar com ele em todos os lugares. Isso é segurança de verdade."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Uma classe ",e.jsx("code",{children:"sealed"})," (introduzida no Dart 3) é uma classe abstrata com uma restrição forte: ",e.jsx("strong",{children:"só pode ser estendida ou implementada dentro do mesmo arquivo"}),". Ou seja, o compilador conhece todas as subclasses possíveis."]}),e.jsxs("p",{children:["Combinada com ",e.jsx("code",{children:"switch"})," de pattern matching, isso ativa o ",e.jsx("strong",{children:"exhaustiveness check"}),": se você esquecer um caso, é erro de compilação. Não é warning — não compila."]}),e.jsx("h2",{children:"Como Dart faz"}),e.jsx(a,{title:"estado_tela.dart",code:`// 'sealed' = não pode ser instanciada nem estendida fora deste arquivo.
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
}`}),e.jsxs("p",{children:["Repare: nenhum ",e.jsx("code",{children:"bool"}),', nenhum campo "talvez nulo". Cada estado carrega exatamente o que faz sentido — Sucesso tem itens, Erro tem mensagem, Carregando não precisa de nada.']}),e.jsx("h2",{children:"Pattern matching exaustivo"}),e.jsxs("p",{children:["A grande virada chega aqui: o ",e.jsx("code",{children:"switch"})," como ",e.jsx("em",{children:"expressão"})," exige cobrir todos os subtipos."]}),e.jsx(a,{title:"lista_screen.dart",code:`Widget build(BuildContext context) {
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
        child: Text('Falhou: $mensagem'),
      ),
  };
}`}),e.jsxs(s,{type:"success",title:"O compilador é seu colega de revisão",children:["Adicione amanhã um quarto estado ",e.jsx("code",{children:"SemConexao"}),". Cada ",e.jsx("code",{children:"switch"})," espalhado pelo app vai parar de compilar até você tratar o novo caso. Em times grandes, isso vale ouro."]}),e.jsx("h2",{children:"Exemplo prático: Result<T>"}),e.jsx("p",{children:"Outro uso clássico é representar o resultado de uma operação que pode falhar — sem precisar de exceções para fluxo previsível."}),e.jsx(a,{title:"result.dart",code:`sealed class Result<T> {
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
    final r = await dio.get('/usuarios/$id');
    return Ok(Usuario.fromJson(r.data));
  } catch (e) {
    return Falha('Não consegui buscar usuário', e);
  }
}

// No chamador:
final r = await buscarUsuario('42');
final mensagem = switch (r) {
  Ok(:final valor) => 'Olá, \${valor.nome}',
  Falha(:final mensagem) => 'Erro: $mensagem',
};`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Tentar herdar de outro arquivo"}),": erro de compilação. Coloque a sealed e todos os subtipos no mesmo ",e.jsx("code",{children:".dart"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar ",e.jsx("code",{children:"switch"})," como statement (sem retorno)"]}),": não há checagem de exaustividade. Prefira ",e.jsx("code",{children:"switch"})," como ",e.jsx("em",{children:"expressão"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Default desnecessário"}),": se você adicionar ",e.jsx("code",{children:"default:"}),", perde a verificação de exaustividade. Tire o default sempre que possível."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Confundir ",e.jsx("code",{children:"sealed"})," com ",e.jsx("code",{children:"final"})]}),": ",e.jsx("code",{children:"final class"})," impede só herança fora do arquivo, mas pode ser instanciada. ",e.jsx("code",{children:"sealed"})," também impede instanciação direta."]})]}),e.jsxs(s,{type:"warning",title:"Ainda dá pra fazer errado",children:["Se você ignorar o switch e usar ",e.jsx("code",{children:"if (estado is Sucesso)"}),", perde a checagem do compilador. ",e.jsx("code",{children:"switch"})," de expressão é a melhor amiga das sealed classes."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(s,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use sealed para ",e.jsx("strong",{children:"conjuntos pequenos e estáveis"})," de variantes (estados de tela, eventos, resultados)."]}),e.jsxs("li",{children:["Prefira ",e.jsx("code",{children:"const"})," nos construtores quando não há campos mutáveis."]}),e.jsxs("li",{children:["Combine com ",e.jsx("code",{children:"freezed"})," em apps grandes — ele gera ",e.jsx("code",{children:"copyWith"}),", ",e.jsx("code",{children:"=="})," e ",e.jsx("code",{children:"toString"})," de graça."]}),e.jsx("li",{children:"Não force sealed em hierarquias grandes/abertas (ex: lista de plugins de terceiros) — use abstract class normal."})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Sealed classes são o alicerce de várias arquiteturas modernas em Flutter (BLoC com eventos/estados, Riverpod com ",e.jsx("code",{children:"AsyncValue"}),"). Domine isso antes de mergulhar em gerenciamento de estado."]}),e.jsxs(s,{type:"info",children:["Próximo: ",e.jsx("strong",{children:"Extension Methods"})," — adicione comportamento a tipos que você não escreveu."]})]})}export{d as default};
