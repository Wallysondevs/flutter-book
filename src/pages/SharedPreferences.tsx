import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function SharedPreferences() {
  return (
    <PageContainer
      title="SharedPreferences"
      subtitle="Persistência simples de chave-valor — para settings, flags e cache leve."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Quase todo app precisa <strong>lembrar de pequenas coisas</strong> entre uma sessão e outra: o tema escolhido, se o usuário já viu o tutorial, o último idioma, um token simples. Você não precisa (e não deve) montar um banco SQLite só para guardar três valores. O <code>shared_preferences</code> é a ferramenta certa para esse caso.
      </p>

      <h2>O conceito</h2>
      <p>
        É um <strong>dicionário persistente</strong>: você guarda valores associados a chaves de texto, e eles continuam lá depois de fechar e reabrir o app. Por baixo, cada plataforma usa o mecanismo nativo:
      </p>
      <ul>
        <li><strong>Android</strong>: <code>SharedPreferences</code> (XML).</li>
        <li><strong>iOS/macOS</strong>: <code>NSUserDefaults</code>.</li>
        <li><strong>Web</strong>: <code>localStorage</code>.</li>
        <li><strong>Windows/Linux</strong>: arquivo JSON local.</li>
      </ul>
      <p>
        Os tipos suportados são limitados: <code>String</code>, <code>int</code>, <code>double</code>, <code>bool</code> e <code>List&lt;String&gt;</code>. Para guardar objetos, serialize para JSON antes.
      </p>

      <AlertBox type="warning" title="Não é um banco">
        Foi desenhado para <strong>poucos KB</strong>. Não use para listas grandes nem para dados sensíveis.
      </AlertBox>

      <h2>Como Flutter/Dart faz</h2>
      <p>
        Adicione no <code>pubspec.yaml</code>:
      </p>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  shared_preferences: ^2.3.0`} />

      <p>
        O uso básico é assim:
      </p>

      <CodeBlock title="uso direto" code={`import 'package:shared_preferences/shared_preferences.dart';

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

  print('token: \$token, escuro: \$escuro');
}`} />

      <h2>Exemplo prático: serviço de configurações</h2>
      <p>
        Em vez de espalhar <code>prefs.getBool('darkMode')</code> pelo app, encapsule em um serviço. A UI fica limpa e dá para trocar a implementação em testes.
      </p>

      <CodeBlock title="lib/services/configuracoes.dart" code={`import 'package:shared_preferences/shared_preferences.dart';

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
// runApp(MeuApp(config: config));`} />

      <p>
        Resultado: <code>config.tema</code> é síncrono (já está em memória), apenas a escrita é assíncrona.
      </p>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer o <code>await</code> no <code>getInstance()</code></strong>: não compila — bom alarme.</li>
        <li><strong>Usar antes de <code>WidgetsFlutterBinding.ensureInitialized()</code></strong> no <code>main()</code> assíncrono.</li>
        <li><strong>Esperar persistência <em>imediata</em> em disco</strong>: a escrita é em memória + flush, geralmente instantânea, mas não bata no disco direto para conferir.</li>
        <li><strong>Guardar listas complexas</strong>: só <code>List&lt;String&gt;</code>. Para outras estruturas, vire JSON com <code>jsonEncode</code>.</li>
        <li><strong>Chaves "mágicas" espalhadas</strong>: defina constantes no serviço.</li>
      </ul>

      <AlertBox type="danger" title="Nunca guarde senhas ou tokens sensíveis aqui">
        SharedPreferences <strong>não é criptografado</strong>. Em Android com root ou iOS com backup, dá para ler. Para segredos use <code>flutter_secure_storage</code> (Keychain/Keystore).
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip" title="Padrões que ajudam">
        <ul>
          <li>Carregue uma vez no <code>main()</code> e injete o serviço pelo app.</li>
          <li>Sempre use <code>?? valorPadrão</code> ao ler.</li>
          <li>Padronize chaves em constantes para evitar typos.</li>
          <li>Para reagir a mudanças, combine com um <code>ChangeNotifier</code> ou Riverpod.</li>
          <li>Considere <code>shared_preferences_async</code> quando precisar do backend mais recente (iOS 17+ e Android com DataStore).</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Quando precisar guardar muitos registros estruturados, vá para <strong>sqflite</strong>, <strong>Hive</strong> ou <strong>Isar</strong>. Para segredos, <code>flutter_secure_storage</code>.
      </p>

      <AlertBox type="success" title="Você já consegue">
        Implementar tema escuro persistente, lembrar do onboarding e qualquer flag simples — o suficiente para 80% dos apps começarem.
      </AlertBox>
    </PageContainer>
  );
}
