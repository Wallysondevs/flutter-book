import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function SharedPreferences() {
    return (
      <PageContainer title="SharedPreferences" subtitle="Persistência simples de chave-valor — settings, tokens, flags." difficulty="iniciante" timeToRead="6 min">
        <h2>Setup e uso</h2>
      <CodeBlock title="exemplo" code="import 'package:shared_preferences/shared_preferences.dart';\n\nfinal prefs = await SharedPreferences.getInstance();\nawait prefs.setString('token', 'abc123');\nawait prefs.setBool('darkMode', true);\nawait prefs.setInt('contador', 42);\n\nfinal token = prefs.getString('token');" />
      <AlertBox type="warning" title="Não use para dados sensíveis">SharedPreferences NÃO é criptografado. Para tokens sensíveis, use <code>flutter_secure_storage</code>.</AlertBox>
      </PageContainer>
    );
  }
  