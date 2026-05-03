import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Firebase() {
    return (
      <PageContainer title="Firebase" subtitle="BaaS oficial do Google: auth, firestore, storage, messaging, analytics." difficulty="intermediario" timeToRead="10 min">
        <CodeBlock title="setup" code="# Instale o CLI:\nnpm i -g firebase-tools\nflutterfire configure\n\n# pubspec:\nfirebase_core: ^3.0.0\nfirebase_auth: ^5.0.0\ncloud_firestore: ^5.0.0" />
      <CodeBlock title="init" code="void main() async {\n  WidgetsFlutterBinding.ensureInitialized();\n  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);\n  runApp(const MyApp());\n}" />
      <AlertBox type="info" title="FlutterFire">O conjunto de plugins Firebase para Flutter chama-se FlutterFire e é mantido pelo time Flutter.</AlertBox>
      </PageContainer>
    );
  }
  