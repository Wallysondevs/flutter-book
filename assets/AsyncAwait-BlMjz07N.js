import{j as e}from"./index-D9yRYXwO.js";import{P as s,C as r,A as a}from"./AlertBox-B2Rl5ETq.js";function n(){return e.jsxs(s,{title:"async / await",subtitle:"A forma idiomática de escrever código assíncrono em Dart — linear, legível, com try/catch normal.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["No capítulo anterior, você viu Futures com ",e.jsx("code",{children:".then(...).then(...).catchError(...)"}),". Funciona, mas escala mal: três chamadas em sequência viram um trem de callbacks aninhados, o tratamento de erro fica disperso, e ler o código exige decifrar."]}),e.jsxs("p",{children:[e.jsx("code",{children:"async/await"})," resolve isso brilhantemente: ",e.jsx("strong",{children:"você escreve o código como se fosse síncrono"}),", mas ele continua sendo assíncrono por baixo. É a sintaxe que praticamente todo código moderno em Flutter usa — pegar bem é diferença entre se divertir programando ou sofrer."]}),e.jsx("h2",{children:"O conceito"}),e.jsx("p",{children:"Duas palavrinhas, uma dupla:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"async"})})," — marca uma função como assíncrona. Ela ",e.jsx("em",{children:"obrigatoriamente"})," retorna um ",e.jsx("code",{children:"Future"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"await"})})," — pausa a função até que o ",e.jsx("code",{children:"Future"})," resolva, e devolve o valor desempacotado."]})]}),e.jsxs("p",{children:['A função "pausa" mas ',e.jsx("strong",{children:"não bloqueia a thread"})," — outras coisas continuam rodando (animações, toques na tela). Pense em ",e.jsx("code",{children:"await"}),' como dizer: "espera o resultado chegar, depois continue daqui de onde paramos".']}),e.jsx("h2",{children:"Como Dart faz"}),e.jsx(r,{title:"comparacao.dart",code:`// Versão com .then (verbosa, encadeada)
Future<void> carregarComThen() {
  return api.buscarUsuario().then((user) {
    return api.buscarPosts(user.id).then((posts) {
      print('\${user.nome} tem \${posts.length} posts');
    });
  });
}

// Versão com async/await (linear, legível)
Future<void> carregarComAwait() async {
  final user = await api.buscarUsuario();
  final posts = await api.buscarPosts(user.id);
  print('\${user.nome} tem \${posts.length} posts');
}`}),e.jsxs("p",{children:["Mesma lógica, complexidade despencou. O ",e.jsx("code",{children:"final user = await ..."})," espera o Future resolver e armazena o valor — exatamente como uma chamada síncrona pareceria."]}),e.jsxs(a,{type:"info",title:"Regra de ouro",children:["Se a função usa ",e.jsx("code",{children:"await"})," em qualquer lugar, ela ",e.jsx("strong",{children:"precisa"})," ser declarada ",e.jsx("code",{children:"async"}),", e o retorno ",e.jsx("strong",{children:"sempre"})," é ",e.jsx("code",{children:"Future<T>"})," (mesmo que ",e.jsx("code",{children:"T"})," seja ",e.jsx("code",{children:"void"}),")."]}),e.jsx("h2",{children:"Tratamento de erros: try / catch normal"}),e.jsxs("p",{children:["Outra grande vantagem: erros viram exceções comuns, capturadas com ",e.jsx("code",{children:"try/catch"})," tradicional. Adeus, ",e.jsx("code",{children:".catchError"})," espalhado."]}),e.jsx(r,{title:"erros.dart",code:`Future<Usuario?> buscarSeguro(int id) async {
  try {
    final user = await api.buscarUsuario(id);
    return user;
  } on TimeoutException {
    // Erros tipados específicos primeiro.
    print('A API demorou demais');
    return null;
  } on FormatException catch (e) {
    print('JSON inválido: \${e.message}');
    return null;
  } catch (e, stack) {
    // Catch genérico por último.
    print('Erro inesperado: $e');
    print(stack);
    return null;
  } finally {
    // Sempre roda — útil para fechar recursos.
    print('Tentativa de busca finalizada');
  }
}`}),e.jsx("h2",{children:"Exemplo prático: paralelismo com Future.wait"}),e.jsxs("p",{children:[e.jsx("code",{children:"await"})," sequencial é fácil, mas e quando três chamadas independentes podem rodar em paralelo? ",e.jsx("strong",{children:"Não espere uma de cada vez"})," — dispare todas e espere todas juntas."]}),e.jsx(r,{title:"paralelo.dart",code:`Future<void> carregarTela() async {
  // ❌ ERRADO: 3 segundos no total
  // (cada chamada espera a anterior terminar)
  // final user = await api.buscarUsuario();   // 1s
  // final config = await api.buscarConfig();  // 1s
  // final feats = await api.buscarFeatures(); // 1s

  // ✅ CERTO: ~1 segundo no total (todas em paralelo)
  final results = await Future.wait([
    api.buscarUsuario(),
    api.buscarConfig(),
    api.buscarFeatures(),
  ]);

  final user = results[0] as Usuario;
  final config = results[1] as Config;
  final feats = results[2] as List<Feature>;

  print('Tudo carregado: \${user.nome}, \${feats.length} features');
}`}),e.jsx("p",{children:"Em apps reais isso corta latência drasticamente. Se sua tela faz 4 chamadas independentes a 200ms cada, você sai de 800ms para 200ms."}),e.jsxs(a,{type:"warning",title:"Future.wait falha rápido",children:["Se uma das chamadas dentro de ",e.jsx("code",{children:"Future.wait"})," falhar, o resultado todo é uma exceção. Para tolerar falhas parciais, use ",e.jsx("code",{children:"Future.wait([...], eagerError: false)"})," e trate cada item, ou envolva cada chamada em try/catch antes."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer o ",e.jsx("code",{children:"await"})]}),": a função continua sem esperar, e você usa um ",e.jsx("code",{children:"Future"})," em vez do valor. Erro silencioso clássico."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar ",e.jsx("code",{children:"await"})," sem ",e.jsx("code",{children:"async"})]}),": erro de compilação. Marque a função."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Achar que ",e.jsx("code",{children:"async"})," roda em outra thread"]}),": não roda. Cálculo pesado em função async ainda trava a UI. Para CPU-bound, use ",e.jsx("code",{children:"Isolate"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Loop com await sequencial sem necessidade"}),": ",e.jsx("code",{children:"for (final id in ids) await buscar(id);"})," processa 1 por vez. Para paralelo, use ",e.jsx("code",{children:"Future.wait(ids.map(buscar))"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer o ",e.jsx("code",{children:"return"})]}),": numa função ",e.jsx("code",{children:"Future<String> foo() async"}),", faltar return faz Dart devolver ",e.jsx("code",{children:"null"})," (em ausência de null safety) ou erro."]}),e.jsxs("li",{children:[e.jsx("strong",{children:'Não tratar exceções de futures "fire-and-forget"'}),": ",e.jsx("code",{children:"api.log()"})," sem await, sem catch, lança exceção não capturada se falhar. Use ",e.jsx("code",{children:"unawaited(...)"})," do ",e.jsx("code",{children:"dart:async"})," intencionalmente."]})]}),e.jsxs(a,{type:"danger",title:"async em build()",children:["O método ",e.jsx("code",{children:"build()"})," de um Widget ",e.jsx("strong",{children:"não pode ser async"}),". Ele precisa retornar um Widget imediatamente. Para mostrar dados assíncronos, use ",e.jsx("code",{children:"FutureBuilder"}),", ",e.jsx("code",{children:"StreamBuilder"})," ou um gerenciador de estado."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(a,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Prefira ",e.jsx("code",{children:"async/await"})," a ",e.jsx("code",{children:".then"})," em código novo — mais legível e debugável."]}),e.jsxs("li",{children:["Defina timeouts explícitos: ",e.jsx("code",{children:"await chamada().timeout(Duration(seconds: 8))"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Future.wait"})," para paralelismo; documente quando a ordem importa."]}),e.jsxs("li",{children:["Evite ",e.jsx("code",{children:"async"})," só por moda — se a função não usa ",e.jsx("code",{children:"await"}),", não precisa ser async."]}),e.jsxs("li",{children:["Dentro de Widgets, lembre do ",e.jsx("code",{children:"mounted"})," antes de chamar ",e.jsx("code",{children:"setState"})," após um ",e.jsx("code",{children:"await"}),": a tela pode ter sido removida no meio."]})]})}),e.jsx(r,{title:"cuidado_com_mounted.dart",code:`Future<void> _carregar() async {
  final dados = await api.buscar();
  if (!mounted) return; // tela já saiu? aborta.
  setState(() => _dados = dados);
}`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:[e.jsx("code",{children:"Future"})," entrega ",e.jsx("strong",{children:"um"})," valor. Mas e quando você quer receber ",e.jsx("strong",{children:"vários"})," valores ao longo do tempo (mensagens de chat, posições de GPS, eventos de Firebase)? Aí entra ",e.jsx("code",{children:"Stream"}),", e existe até um ",e.jsx("code",{children:"await for"})," para consumir cada item de forma natural."]}),e.jsxs(a,{type:"success",children:["Próximo capítulo: ",e.jsx("strong",{children:"Streams"})," — sequências assíncronas de valores."]})]})}export{n as default};
