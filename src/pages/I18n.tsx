import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function I18n() {
  return (
    <PageContainer
      title="Internacionalização"
      subtitle="Suporte a múltiplos idiomas com flutter_localizations + intl + arquivos ARB."
      difficulty="intermediario"
      timeToRead="13 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Mesmo apps "só em português" precisam de cuidado: datas, moedas e
        números têm formatos diferentes em pt-BR e pt-PT. Se você quer atingir
        mercados internacionais, internacionalização (<strong>i18n</strong>) +
        localização (<strong>l10n</strong>) deixa de ser opcional. O Flutter
        traz suporte oficial — só precisa configurar direito.
      </p>

      <h2>O conceito</h2>
      <ul>
        <li><strong>i18n</strong> — preparar o app para suportar vários idiomas (extrair strings para fora do código).</li>
        <li><strong>l10n</strong> — fornecer as traduções em si para cada locale.</li>
        <li><strong>Locale</strong> — combinação de idioma + região (ex: <code>pt_BR</code>, <code>pt_PT</code>, <code>en_US</code>).</li>
        <li><strong>ARB (Application Resource Bundle)</strong> — formato JSON do Google para armazenar strings traduzidas.</li>
      </ul>
      <p>
        O Flutter gera automaticamente uma classe Dart fortemente tipada a
        partir dos arquivos ARB. Você chama <code>AppLocalizations.of(context)!.hello</code> em vez
        de strings cruas pelo código.
      </p>

      <h2>Como o Flutter faz</h2>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: any

flutter:
  generate: true   # ativa code-gen das strings`} />

      <CodeBlock title="l10n.yaml (na raiz do projeto)" code={`arb-dir: lib/l10n
template-arb-file: app_pt.arb
output-localization-file: app_localizations.dart
output-class: AppLocalizations`} />

      <CodeBlock title="lib/l10n/app_pt.arb (idioma base)" code={`{
  "@@locale": "pt",
  "appTitle": "Meu App",
  "hello": "Olá, {nome}!",
  "@hello": {
    "placeholders": {
      "nome": { "type": "String" }
    }
  },
  "itensCount": "{n, plural, =0{Sem itens} =1{1 item} other{{n} itens}}",
  "@itensCount": {
    "placeholders": {
      "n": { "type": "int" }
    }
  }
}`} />

      <CodeBlock title="lib/l10n/app_en.arb (tradução)" code={`{
  "@@locale": "en",
  "appTitle": "My App",
  "hello": "Hello, {nome}!",
  "itensCount": "{n, plural, =0{No items} =1{1 item} other{{n} items}}"
}`} />

      <p>
        Ao rodar <code>flutter pub get</code> ou <code>flutter run</code>, o
        Flutter gera <code>app_localizations.dart</code> com classes para cada
        idioma. Use no app:
      </p>

      <CodeBlock title="lib/main.dart" code={`import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'l10n/app_localizations.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      onGenerateTitle: (ctx) => AppLocalizations.of(ctx)!.appTitle,
      // Idiomas suportados
      supportedLocales: AppLocalizations.supportedLocales,
      // Delegates necessários
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      home: const HomePage(),
    );
  }
}`} />

      <h2>Exemplo prático: usar nas telas</h2>

      <CodeBlock title="HomePage" code={`class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final qtd = 3;

    return Scaffold(
      appBar: AppBar(title: Text(l.appTitle)),
      body: Column(
        children: [
          Text(l.hello('Maria')),       // "Olá, Maria!" / "Hello, Maria!"
          Text(l.itensCount(qtd)),      // "3 itens" / "3 items"
        ],
      ),
    );
  }
}`} />

      <h2>Formatando datas, números e moedas</h2>
      <p>
        O pacote <code>intl</code> cuida disso, respeitando o locale atual.
      </p>

      <CodeBlock title="formatação" code={`import 'package:intl/intl.dart';

final preco = NumberFormat.currency(locale: 'pt_BR', symbol: 'R\$').format(199.9);
// "R\$ 199,90"

final data = DateFormat.yMMMMd('pt_BR').format(DateTime.now());
// "20 de novembro de 2024"

final n = NumberFormat.decimalPattern('pt_BR').format(1234567.89);
// "1.234.567,89"`} />

      <h2>Permitir o usuário trocar de idioma</h2>
      <p>
        Por padrão o Flutter segue o idioma do sistema. Para deixar o usuário
        escolher, exponha um <code>Locale?</code> no estado do app:
      </p>

      <CodeBlock title="locale dinâmico" code={`class LocaleNotifier extends ChangeNotifier {
  Locale? _locale;
  Locale? get locale => _locale;

  void definir(Locale? l) {
    _locale = l;
    notifyListeners();
  }
}

// no MaterialApp:
MaterialApp(
  locale: context.watch<LocaleNotifier>().locale, // null = segue sistema
  supportedLocales: AppLocalizations.supportedLocales,
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  home: const HomePage(),
)`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esqueceu de adicionar localizationsDelegates</strong> — widgets Material aparecem em inglês mesmo com locale pt-BR.</li>
        <li><strong>Faltou o arquivo ARB do idioma base</strong> — o code-gen falha silenciosamente.</li>
        <li><strong>Concatenar strings traduzidas</strong> — <code>"Olá " + nome</code> dá errado em japonês/árabe. Use placeholders.</li>
        <li><strong>Plural manual</strong> — não escreva <code>n == 1 ? 'item' : 'itens'</code>; use <code>plural</code> do ARB. Russo tem 4 formas plurais!</li>
        <li><strong>Hardcode em widgets terceiros</strong> — bibliotecas precisam ser localizadas individualmente.</li>
        <li><strong>Misturar regiões</strong> — <code>pt</code> ≠ <code>pt_BR</code> ≠ <code>pt_PT</code>; declare bem em <code>supportedLocales</code>.</li>
      </ul>

      <AlertBox type="success" title="Code-gen é amigo">
        Adicionar idioma é só criar outro <code>app_xx.arb</code>. O Flutter
        regenera as classes e o autocomplete já mostra a tradução. Esquecer uma
        chave numa língua vira aviso no console.
      </AlertBox>

      <AlertBox type="warning" title="RTL: árabe e hebraico">
        Esses idiomas leem da direita para a esquerda. Use widgets como
        <code>Padding</code>, <code>EdgeInsetsDirectional</code> e
        <code>Align</code> com <code>start</code>/<code>end</code> em vez de
        <code>left</code>/<code>right</code> — o Flutter espelha automaticamente.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use ferramentas como <strong>Lokalise</strong>, <strong>Crowdin</strong> ou <strong>POEditor</strong> para gerenciar tradutores.</li>
          <li>Sempre escreva com placeholders nomeados, nunca posicionais.</li>
          <li>Mantenha textos curtos: alemão e francês geralmente ocupam mais espaço.</li>
          <li>Teste a UI em cada idioma — quebra de layout é comum.</li>
          <li>Localize mensagens de erro do servidor também (envie códigos, traduza no cliente).</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Combine com <em>Build Web</em>/<em>Build Android</em>/<em>Build iOS</em> para
        publicar em mercados internacionais. Veja também <em>Repository Pattern</em>
        para manter as respostas da API neutras de idioma.
      </p>
      <AlertBox type="info">
        Comece i18n cedo. Retroativar 200 strings espalhadas dá muito mais
        trabalho do que já nascer com ARB.
      </AlertBox>
    </PageContainer>
  );
}
