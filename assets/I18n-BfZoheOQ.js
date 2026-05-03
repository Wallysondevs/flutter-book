import{j as e}from"./index-D9yRYXwO.js";import{P as i,C as a,A as o}from"./AlertBox-B2Rl5ETq.js";function r(){return e.jsxs(i,{title:"Internacionalização",subtitle:"Suporte a múltiplos idiomas com flutter_localizations + intl + arquivos ARB.",difficulty:"intermediario",timeToRead:"13 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:['Mesmo apps "só em português" precisam de cuidado: datas, moedas e números têm formatos diferentes em pt-BR e pt-PT. Se você quer atingir mercados internacionais, internacionalização (',e.jsx("strong",{children:"i18n"}),") + localização (",e.jsx("strong",{children:"l10n"}),") deixa de ser opcional. O Flutter traz suporte oficial — só precisa configurar direito."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"i18n"})," — preparar o app para suportar vários idiomas (extrair strings para fora do código)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"l10n"})," — fornecer as traduções em si para cada locale."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Locale"})," — combinação de idioma + região (ex: ",e.jsx("code",{children:"pt_BR"}),", ",e.jsx("code",{children:"pt_PT"}),", ",e.jsx("code",{children:"en_US"}),")."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ARB (Application Resource Bundle)"})," — formato JSON do Google para armazenar strings traduzidas."]})]}),e.jsxs("p",{children:["O Flutter gera automaticamente uma classe Dart fortemente tipada a partir dos arquivos ARB. Você chama ",e.jsx("code",{children:"AppLocalizations.of(context)!.hello"})," em vez de strings cruas pelo código."]}),e.jsx("h2",{children:"Como o Flutter faz"}),e.jsx(a,{title:"pubspec.yaml",code:`dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: any

flutter:
  generate: true   # ativa code-gen das strings`}),e.jsx(a,{title:"l10n.yaml (na raiz do projeto)",code:`arb-dir: lib/l10n
template-arb-file: app_pt.arb
output-localization-file: app_localizations.dart
output-class: AppLocalizations`}),e.jsx(a,{title:"lib/l10n/app_pt.arb (idioma base)",code:`{
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
}`}),e.jsx(a,{title:"lib/l10n/app_en.arb (tradução)",code:`{
  "@@locale": "en",
  "appTitle": "My App",
  "hello": "Hello, {nome}!",
  "itensCount": "{n, plural, =0{No items} =1{1 item} other{{n} items}}"
}`}),e.jsxs("p",{children:["Ao rodar ",e.jsx("code",{children:"flutter pub get"})," ou ",e.jsx("code",{children:"flutter run"}),", o Flutter gera ",e.jsx("code",{children:"app_localizations.dart"})," com classes para cada idioma. Use no app:"]}),e.jsx(a,{title:"lib/main.dart",code:`import 'package:flutter/material.dart';
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
}`}),e.jsx("h2",{children:"Exemplo prático: usar nas telas"}),e.jsx(a,{title:"HomePage",code:`class HomePage extends StatelessWidget {
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
}`}),e.jsx("h2",{children:"Formatando datas, números e moedas"}),e.jsxs("p",{children:["O pacote ",e.jsx("code",{children:"intl"})," cuida disso, respeitando o locale atual."]}),e.jsx(a,{title:"formatação",code:`import 'package:intl/intl.dart';

final preco = NumberFormat.currency(locale: 'pt_BR', symbol: 'R$').format(199.9);
// "R$ 199,90"

final data = DateFormat.yMMMMd('pt_BR').format(DateTime.now());
// "20 de novembro de 2024"

final n = NumberFormat.decimalPattern('pt_BR').format(1234567.89);
// "1.234.567,89"`}),e.jsx("h2",{children:"Permitir o usuário trocar de idioma"}),e.jsxs("p",{children:["Por padrão o Flutter segue o idioma do sistema. Para deixar o usuário escolher, exponha um ",e.jsx("code",{children:"Locale?"})," no estado do app:"]}),e.jsx(a,{title:"locale dinâmico",code:`class LocaleNotifier extends ChangeNotifier {
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
)`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Esqueceu de adicionar localizationsDelegates"})," — widgets Material aparecem em inglês mesmo com locale pt-BR."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Faltou o arquivo ARB do idioma base"})," — o code-gen falha silenciosamente."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Concatenar strings traduzidas"})," — ",e.jsx("code",{children:'"Olá " + nome'})," dá errado em japonês/árabe. Use placeholders."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Plural manual"})," — não escreva ",e.jsx("code",{children:"n == 1 ? 'item' : 'itens'"}),"; use ",e.jsx("code",{children:"plural"})," do ARB. Russo tem 4 formas plurais!"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Hardcode em widgets terceiros"})," — bibliotecas precisam ser localizadas individualmente."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Misturar regiões"})," — ",e.jsx("code",{children:"pt"})," ≠ ",e.jsx("code",{children:"pt_BR"})," ≠ ",e.jsx("code",{children:"pt_PT"}),"; declare bem em ",e.jsx("code",{children:"supportedLocales"}),"."]})]}),e.jsxs(o,{type:"success",title:"Code-gen é amigo",children:["Adicionar idioma é só criar outro ",e.jsx("code",{children:"app_xx.arb"}),". O Flutter regenera as classes e o autocomplete já mostra a tradução. Esquecer uma chave numa língua vira aviso no console."]}),e.jsxs(o,{type:"warning",title:"RTL: árabe e hebraico",children:["Esses idiomas leem da direita para a esquerda. Use widgets como",e.jsx("code",{children:"Padding"}),", ",e.jsx("code",{children:"EdgeInsetsDirectional"})," e",e.jsx("code",{children:"Align"})," com ",e.jsx("code",{children:"start"}),"/",e.jsx("code",{children:"end"})," em vez de",e.jsx("code",{children:"left"}),"/",e.jsx("code",{children:"right"})," — o Flutter espelha automaticamente."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(o,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ferramentas como ",e.jsx("strong",{children:"Lokalise"}),", ",e.jsx("strong",{children:"Crowdin"})," ou ",e.jsx("strong",{children:"POEditor"})," para gerenciar tradutores."]}),e.jsx("li",{children:"Sempre escreva com placeholders nomeados, nunca posicionais."}),e.jsx("li",{children:"Mantenha textos curtos: alemão e francês geralmente ocupam mais espaço."}),e.jsx("li",{children:"Teste a UI em cada idioma — quebra de layout é comum."}),e.jsx("li",{children:"Localize mensagens de erro do servidor também (envie códigos, traduza no cliente)."})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Combine com ",e.jsx("em",{children:"Build Web"}),"/",e.jsx("em",{children:"Build Android"}),"/",e.jsx("em",{children:"Build iOS"})," para publicar em mercados internacionais. Veja também ",e.jsx("em",{children:"Repository Pattern"}),"para manter as respostas da API neutras de idioma."]}),e.jsx(o,{type:"info",children:"Comece i18n cedo. Retroativar 200 strings espalhadas dá muito mais trabalho do que já nascer com ARB."})]})}export{r as default};
