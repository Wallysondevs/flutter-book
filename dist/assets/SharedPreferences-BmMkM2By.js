import{j as e}from"./index-D4AOhXGO.js";import{P as a,A as s,C as r}from"./AlertBox-Dyf2wdSA.js";function n(){return e.jsxs(a,{title:"SharedPreferences",subtitle:"Persistência simples de chave-valor — para settings, flags e cache leve.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Quase todo app precisa ",e.jsx("strong",{children:"lembrar de pequenas coisas"})," entre uma sessão e outra: o tema escolhido, se o usuário já viu o tutorial, o último idioma, um token simples. Você não precisa (e não deve) montar um banco SQLite só para guardar três valores. O ",e.jsx("code",{children:"shared_preferences"})," é a ferramenta certa para esse caso."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["É um ",e.jsx("strong",{children:"dicionário persistente"}),": você guarda valores associados a chaves de texto, e eles continuam lá depois de fechar e reabrir o app. Por baixo, cada plataforma usa o mecanismo nativo:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Android"}),": ",e.jsx("code",{children:"SharedPreferences"})," (XML)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"iOS/macOS"}),": ",e.jsx("code",{children:"NSUserDefaults"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Web"}),": ",e.jsx("code",{children:"localStorage"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Windows/Linux"}),": arquivo JSON local."]})]}),e.jsxs("p",{children:["Os tipos suportados são limitados: ",e.jsx("code",{children:"String"}),", ",e.jsx("code",{children:"int"}),", ",e.jsx("code",{children:"double"}),", ",e.jsx("code",{children:"bool"})," e ",e.jsx("code",{children:"List<String>"}),". Para guardar objetos, serialize para JSON antes."]}),e.jsxs(s,{type:"warning",title:"Não é um banco",children:["Foi desenhado para ",e.jsx("strong",{children:"poucos KB"}),". Não use para listas grandes nem para dados sensíveis."]}),e.jsx("h2",{children:"Como Flutter/Dart faz"}),e.jsxs("p",{children:["Adicione no ",e.jsx("code",{children:"pubspec.yaml"}),":"]}),e.jsx(r,{title:"pubspec.yaml",code:`dependencies:
  shared_preferences: ^2.3.0`}),e.jsx("p",{children:"O uso básico é assim:"}),e.jsx(r,{title:"uso direto",code:`import 'package:shared_preferences/shared_preferences.dart';

Future<void> exemplo() async {
  // Pega a instância (singleton interno) — operação assíncrona.
  final prefs = await SharedPreferences.getInstance();

  // Escrever
  await prefs.setString('token', 'abc123');
  await prefs.setBool('darkMode', true);
  await prefs.setInt('contadorAberturas', 42);

  // Ler — retorna null se a chave não existir.
  final token = prefs.getString('token');
  final escuro = prefs.getBool('darkMode') ?? false; // default seguro

  // Remover uma chave
  await prefs.remove('token');

  // Limpar tudo (cuidado!)
  // await prefs.clear();

  print('token: $token, escuro: $escuro');
}`}),e.jsx("h2",{children:"Exemplo prático: serviço de configurações"}),e.jsxs("p",{children:["Em vez de espalhar ",e.jsx("code",{children:"prefs.getBool('darkMode')"})," pelo app, encapsule em um serviço. A UI fica limpa e dá para trocar a implementação em testes."]}),e.jsx(r,{title:"lib/services/configuracoes.dart",code:`import 'package:shared_preferences/shared_preferences.dart';

class Configuracoes {
  static const _kTema = 'tema';            // 'claro' | 'escuro' | 'sistema'
  static const _kIdioma = 'idioma';
  static const _kTutorialVisto = 'tutorial_visto';

  final SharedPreferences _prefs;
  Configuracoes._(this._prefs);

  // Carrega uma vez na inicialização do app.
  static Future<Configuracoes> carregar() async {
    final p = await SharedPreferences.getInstance();
    return Configuracoes._(p);
  }

  String get tema => _prefs.getString(_kTema) ?? 'sistema';
  Future<void> setTema(String v) => _prefs.setString(_kTema, v);

  String get idioma => _prefs.getString(_kIdioma) ?? 'pt-BR';
  Future<void> setIdioma(String v) => _prefs.setString(_kIdioma, v);

  bool get tutorialVisto => _prefs.getBool(_kTutorialVisto) ?? false;
  Future<void> marcarTutorialVisto() =>
      _prefs.setBool(_kTutorialVisto, true);
}

// Em main():
// final config = await Configuracoes.carregar();
// runApp(MeuApp(config: config));`}),e.jsxs("p",{children:["Resultado: ",e.jsx("code",{children:"config.tema"})," é síncrono (já está em memória), apenas a escrita é assíncrona."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer o ",e.jsx("code",{children:"await"})," no ",e.jsx("code",{children:"getInstance()"})]}),": não compila — bom alarme."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar antes de ",e.jsx("code",{children:"WidgetsFlutterBinding.ensureInitialized()"})]})," no ",e.jsx("code",{children:"main()"})," assíncrono."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esperar persistência ",e.jsx("em",{children:"imediata"})," em disco"]}),": a escrita é em memória + flush, geralmente instantânea, mas não bata no disco direto para conferir."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Guardar listas complexas"}),": só ",e.jsx("code",{children:"List<String>"}),". Para outras estruturas, vire JSON com ",e.jsx("code",{children:"jsonEncode"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:'Chaves "mágicas" espalhadas'}),": defina constantes no serviço."]})]}),e.jsxs(s,{type:"danger",title:"Nunca guarde senhas ou tokens sensíveis aqui",children:["SharedPreferences ",e.jsx("strong",{children:"não é criptografado"}),". Em Android com root ou iOS com backup, dá para ler. Para segredos use ",e.jsx("code",{children:"flutter_secure_storage"})," (Keychain/Keystore)."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(s,{type:"tip",title:"Padrões que ajudam",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Carregue uma vez no ",e.jsx("code",{children:"main()"})," e injete o serviço pelo app."]}),e.jsxs("li",{children:["Sempre use ",e.jsx("code",{children:"?? valorPadrão"})," ao ler."]}),e.jsx("li",{children:"Padronize chaves em constantes para evitar typos."}),e.jsxs("li",{children:["Para reagir a mudanças, combine com um ",e.jsx("code",{children:"ChangeNotifier"})," ou Riverpod."]}),e.jsxs("li",{children:["Considere ",e.jsx("code",{children:"shared_preferences_async"})," quando precisar do backend mais recente (iOS 17+ e Android com DataStore)."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Quando precisar guardar muitos registros estruturados, vá para ",e.jsx("strong",{children:"sqflite"}),", ",e.jsx("strong",{children:"Hive"})," ou ",e.jsx("strong",{children:"Isar"}),". Para segredos, ",e.jsx("code",{children:"flutter_secure_storage"}),"."]}),e.jsx(s,{type:"success",title:"Você já consegue",children:"Implementar tema escuro persistente, lembrar do onboarding e qualquer flag simples — o suficiente para 80% dos apps começarem."})]})}export{n as default};
