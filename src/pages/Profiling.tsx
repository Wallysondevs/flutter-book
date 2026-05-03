import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Profiling() {
    return (
      <PageContainer title="Profiling" subtitle="Encontre gargalos de CPU e GPU em modo profile." difficulty="avancado" timeToRead="9 min">
        <CodeBlock title="run" code="flutter run --profile" />
      <p>Em modo profile, o app roda quase tão rápido quanto release mas com instrumentação. Abra DevTools → Performance, grave 5-10s e analise frames acima de 16ms.</p>
      <AlertBox type="warning" title="Sempre teste em device real">Emulador/simulador não reflete performance real. iPhone SE e Android Go são bons casos pessimistas.</AlertBox>
      </PageContainer>
    );
  }
  