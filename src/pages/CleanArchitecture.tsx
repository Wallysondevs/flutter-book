import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function CleanArchitecture() {
    return (
      <PageContainer title="Clean Architecture" subtitle="Camadas: presentation → domain → data." difficulty="avancado" timeToRead="12 min">
        <h2>Camadas</h2>
      <ul>
        <li><strong>Presentation</strong> — widgets, controllers/blocs</li>
        <li><strong>Domain</strong> — entidades, use cases (puro Dart, sem Flutter)</li>
        <li><strong>Data</strong> — repositórios, datasources (API, DB)</li>
      </ul>
      <p>A regra essencial: dependências apontam pra dentro. Domain não conhece data nem presentation.</p>
      <AlertBox type="info" title="Começa simples">Em apps pequenos, separar em 3 camadas é overkill. Adote conforme cresce.</AlertBox>
      </PageContainer>
    );
  }
  