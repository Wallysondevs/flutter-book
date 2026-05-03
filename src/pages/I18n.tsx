import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function I18n() {
    return (
      <PageContainer title="Internacionalização" subtitle="Suporte a múltiplos idiomas com flutter_localizations + intl." difficulty="intermediario" timeToRead="8 min">
        <CodeBlock title="pubspec" code="dependencies:\n  flutter_localizations:\n    sdk: flutter\n  intl: any\n\nflutter:\n  generate: true" />
      <CodeBlock title="arb" code="// l10n/app_pt.arb\n{\n  \"@@locale\": \"pt\",\n  \"hello\": \"Olá, {nome}!\",\n  \"@hello\": {\"placeholders\": {\"nome\": {\"type\": \"String\"}}}\n}" />
      <CodeBlock title="uso" code="Text(AppLocalizations.of(context)!.hello('Maria'))" />
      <AlertBox type="success" title="Code-gen">O Flutter gera as classes para cada arb automaticamente. Adicionar idioma é só criar outro arb.</AlertBox>
      </PageContainer>
    );
  }
  