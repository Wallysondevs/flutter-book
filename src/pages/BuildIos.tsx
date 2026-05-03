import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function BuildIos() {
    return (
      <PageContainer title="Build iOS" subtitle="Build, signing e upload para a App Store." difficulty="intermediario" timeToRead="10 min">
        <CodeBlock title="build" code="flutter build ios --release\ncd ios && pod install\nopen Runner.xcworkspace" />
      <p>No Xcode: configure Bundle ID, Team, e use <code>Product → Archive</code> para enviar à App Store via Xcode Organizer.</p>
      <AlertBox type="warning" title="Precisa de Mac">Build iOS só roda em macOS com Xcode. Sem mac, considere Codemagic ou GitHub Actions com runner macOS.</AlertBox>
      </PageContainer>
    );
  }
  