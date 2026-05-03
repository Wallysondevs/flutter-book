import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function BuildDesktop() {
    return (
      <PageContainer title="Build Desktop" subtitle="Apps nativos para Windows, macOS e Linux." difficulty="intermediario" timeToRead="6 min">
        <CodeBlock title="build" code="flutter config --enable-windows-desktop\nflutter config --enable-macos-desktop\nflutter config --enable-linux-desktop\n\nflutter build windows\nflutter build macos\nflutter build linux" />
      <AlertBox type="info" title="Distribuição">Mac: notarize com Apple. Windows: assine com cert e considere MSIX. Linux: snap, flatpak ou deb.</AlertBox>
      </PageContainer>
    );
  }
  