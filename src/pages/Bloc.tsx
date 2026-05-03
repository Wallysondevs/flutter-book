import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Bloc() {
    return (
      <PageContainer title="BLoC" subtitle="Pattern de eventos → estado, ótimo para apps grandes e times." difficulty="avancado" timeToRead="12 min">
        <h2>Conceito</h2>
      <p>Você dispara <strong>Eventos</strong>, o BLoC processa e emite <strong>Estados</strong>. UI reage aos estados. Forte separação de concerns.</p>
      <CodeBlock title="exemplo" code="sealed class CounterEvent {}\nclass Increment extends CounterEvent {}\n\nclass CounterBloc extends Bloc<CounterEvent, int> {\n  CounterBloc() : super(0) {\n    on<Increment>((event, emit) => emit(state + 1));\n  }\n}\n\n// UI:\nBlocBuilder<CounterBloc, int>(\n  builder: (c, n) => Text('$n'),\n)\n\nIconButton(\n  icon: const Icon(Icons.add),\n  onPressed: () => context.read<CounterBloc>().add(Increment()),\n)" />
      <AlertBox type="info" title="Boilerplate">BLoC é mais verboso que Provider/Riverpod, mas em apps grandes a previsibilidade compensa.</AlertBox>
      </PageContainer>
    );
  }
  