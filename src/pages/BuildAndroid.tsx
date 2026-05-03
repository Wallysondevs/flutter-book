import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function BuildAndroid() {
    return (
      <PageContainer title="Build Android" subtitle="Gerar APK e AAB para a Play Store." difficulty="intermediario" timeToRead="10 min">
        <CodeBlock title="apk" code="flutter build apk --release\nflutter build appbundle --release" />
      <h2>Assinatura</h2>
      <p>Crie um <code>key.properties</code> e configure <code>android/app/build.gradle</code> com <code>signingConfigs</code>. Sem assinatura, a Play Store rejeita.</p>
      <AlertBox type="warning" title="Use AAB, não APK">Desde 2021 a Play Store exige <code>.aab</code> (Android App Bundle). APK só serve para distribuição direta.</AlertBox>
      </PageContainer>
    );
  }
  