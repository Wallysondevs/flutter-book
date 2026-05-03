import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Bloc() {
  return (
    <PageContainer
      title="BLoC"
      subtitle="Padrão de Eventos → Estado para apps grandes, com forte separação de responsabilidades."
      difficulty="avancado"
      timeToRead="16 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Em apps grandes, com vários devs no mesmo código, ter <em>liberdade demais</em> para mudar estado vira caos: cada dev resolve do seu jeito, código fica difícil de testar e debugar. O <strong>BLoC</strong> (<em>Business Logic Component</em>) impõe uma estrutura rígida que escala bem: a UI dispara <strong>Eventos</strong>, o BLoC processa e emite <strong>Estados</strong>, a UI reage.
      </p>
      <p>
        É verboso, sim. Mas em troca você ganha previsibilidade, testabilidade absurda e timeline de eventos perfeita para debug.
      </p>

      <h2>O conceito</h2>
      <p>
        Pense numa caixa preta:
      </p>
      <ul>
        <li><strong>Entrada (Event)</strong>: tudo que pode acontecer (usuário clicou, app iniciou, dados chegaram).</li>
        <li><strong>Saída (State)</strong>: o estado atual da feature (carregando, sucesso com dados, erro).</li>
        <li><strong>BLoC</strong>: a caixa que recebe eventos e emite estados.</li>
      </ul>
      <p>
        A UI só observa estados (via <code>BlocBuilder</code>) e dispara eventos (via <code>bloc.add(MeuEvento())</code>). Nunca chama métodos diretos. Isso quebra acoplamento e permite trocar a UI inteira sem mexer no BLoC — e vice-versa.
      </p>
      <p>
        Existe também o <strong>Cubit</strong>, uma versão simplificada sem eventos: você chama métodos no Cubit que emitem novos estados. Use Cubit para casos simples e Bloc completo quando os eventos forem úteis para debug/log.
      </p>

      <h2>Setup</h2>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  flutter:
    sdk: flutter
  flutter_bloc: ^8.1.0
  equatable: ^2.0.0`} />

      <h2>Como Flutter faz: Cubit (versão simples)</h2>

      <CodeBlock title="contador_cubit.dart" code={`import 'package:flutter_bloc/flutter_bloc.dart';

// Cubit estende um estado de tipo int, valor inicial 0.
class ContadorCubit extends Cubit<int> {
  ContadorCubit() : super(0);

  // Métodos que disparam novos estados via emit().
  void incrementar() => emit(state + 1);
  void decrementar() => emit(state - 1);
  void resetar() => emit(0);
}

// Uso na UI:
class ContadorPage extends StatelessWidget {
  const ContadorPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => ContadorCubit(),
      child: Scaffold(
        body: Center(
          // BlocBuilder rebuilda a cada novo estado.
          child: BlocBuilder<ContadorCubit, int>(
            builder: (ctx, n) => Text(
              '\$n',
              style: const TextStyle(fontSize: 48),
            ),
          ),
        ),
        floatingActionButton: Builder(
          builder: (ctx) => FloatingActionButton(
            onPressed: () =>
                ctx.read<ContadorCubit>().incrementar(),
            child: const Icon(Icons.add),
          ),
        ),
      ),
    );
  }
}`} />

      <h2>Exemplo prático: BLoC completo com eventos</h2>
      <p>
        Quando você quer <strong>rastrear cada ação</strong> que pode mudar o estado (útil para analytics, undo/redo, debug), use Bloc com eventos:
      </p>

      <CodeBlock title="auth_bloc.dart" code={`import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

// Eventos: cada coisa que pode acontecer.
sealed class AuthEvent extends Equatable {
  const AuthEvent();
  @override
  List<Object?> get props => [];
}

class LogarSolicitado extends AuthEvent {
  final String email;
  final String senha;
  const LogarSolicitado(this.email, this.senha);
  @override
  List<Object?> get props => [email, senha];
}

class DeslogarSolicitado extends AuthEvent {}

// Estados: cada situação possível.
sealed class AuthState extends Equatable {
  const AuthState();
  @override
  List<Object?> get props => [];
}

class AuthInicial extends AuthState {}
class AuthCarregando extends AuthState {}
class AuthLogado extends AuthState {
  final String email;
  const AuthLogado(this.email);
  @override
  List<Object?> get props => [email];
}
class AuthErro extends AuthState {
  final String mensagem;
  const AuthErro(this.mensagem);
  @override
  List<Object?> get props => [mensagem];
}

// O BLoC: processa eventos, emite estados.
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(AuthInicial()) {
    on<LogarSolicitado>(_onLogar);
    on<DeslogarSolicitado>((e, emit) => emit(AuthInicial()));
  }

  Future<void> _onLogar(
    LogarSolicitado event,
    Emitter<AuthState> emit,
  ) async {
    emit(AuthCarregando());
    try {
      // Simula chamada de API.
      await Future.delayed(const Duration(seconds: 1));
      if (event.senha.length < 4) {
        emit(const AuthErro('Senha curta'));
        return;
      }
      emit(AuthLogado(event.email));
    } catch (e) {
      emit(AuthErro(e.toString()));
    }
  }
}`} />

      <h2>UI consumindo o AuthBloc</h2>

      <CodeBlock title="login_page.dart" code={`class LoginPage extends StatelessWidget {
  const LoginPage({super.key});
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => AuthBloc(),
      child: Scaffold(
        body: BlocConsumer<AuthBloc, AuthState>(
          // listener: efeitos colaterais (snackbar, navegação).
          listener: (ctx, state) {
            if (state is AuthErro) {
              ScaffoldMessenger.of(ctx).showSnackBar(
                SnackBar(content: Text(state.mensagem)),
              );
            }
            if (state is AuthLogado) {
              Navigator.pushReplacementNamed(ctx, '/home');
            }
          },
          // builder: o que renderizar agora.
          builder: (ctx, state) {
            if (state is AuthCarregando) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
            return Center(
              child: ElevatedButton(
                onPressed: () => ctx.read<AuthBloc>().add(
                  const LogarSolicitado('a@a.com', '1234'),
                ),
                child: const Text('Entrar'),
              ),
            );
          },
        ),
      ),
    );
  }
}`} />

      <AlertBox type="info" title="BlocBuilder, BlocListener, BlocConsumer">
        <strong>Builder</strong> reconstrói widgets quando o estado muda. <strong>Listener</strong> dispara efeitos sem rebuild (snackbar, navegação). <strong>Consumer</strong> faz os dois ao mesmo tempo.
      </AlertBox>

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Snackbar/navegação dentro do builder:</strong> errado — builder pode rodar várias vezes. Use <code>BlocListener</code>.</li>
        <li><strong>Esquecer <code>Equatable</code>:</strong> sem ele, dois estados com mesmo conteúdo são "diferentes" (compara por referência) e disparam rebuilds desnecessários.</li>
        <li><strong>Lógica de UI no Bloc:</strong> Bloc não deve conhecer <code>BuildContext</code>. Mantenha referências a Material fora dele.</li>
        <li><strong>Mutar estado:</strong> use <code>copyWith</code> ou recrie o objeto. Nunca <code>state.lista.add(...)</code>.</li>
        <li><strong>Não fechar o Bloc:</strong> ao usar <code>BlocProvider</code>, ele cuida do <code>close</code>. Mas se instanciar manualmente, lembre de chamar <code>bloc.close()</code> no dispose.</li>
        <li><strong>Boilerplate excessivo:</strong> para coisas pequenas (toggle de tema, contador), Cubit (sem eventos) é suficiente. Use Bloc completo só quando o histórico de eventos agrega valor.</li>
      </ul>

      <AlertBox type="warning" title="Bloc não é necessário para tudo">
        Apps pequenos morrem afogados em boilerplate se forçarem Bloc completo. Comece com <code>setState</code> ou Provider; migre para Bloc quando a complexidade justificar.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Modele estados com <code>sealed class</code> + subclasses (Dart 3) — o compilador força você a tratar todos os casos.</li>
          <li>Use <code>Equatable</code> em todos os estados e eventos.</li>
          <li>Separe <code>auth_bloc.dart</code>, <code>auth_event.dart</code>, <code>auth_state.dart</code> em arquivos diferentes ou em barrel files.</li>
          <li>Teste o Bloc isoladamente com <code>blocTest</code> (do pacote <code>bloc_test</code>) — extremamente fácil.</li>
          <li>Para apps grandes, organize por feature: <code>lib/features/auth/bloc</code>, <code>lib/features/cart/bloc</code>.</li>
          <li>Combine com <code>get_it</code> ou <code>RepositoryProvider</code> para injetar dependências (services, repositories).</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Você viu três sabores de gerenciamento de estado: <strong>Provider</strong>, <strong>Riverpod</strong> e <strong>BLoC</strong>. Para entender o que sustenta todos eles, veja <strong>InheritedWidget</strong> — o mecanismo nativo do Flutter por baixo de toda essa magia.
      </p>

      <AlertBox type="success" title="Qual escolher">
        Não existe "melhor". Existe o que combina com o tamanho do projeto e do time. Aprenda os três e escolha por contexto, não por moda.
      </AlertBox>
    </PageContainer>
  );
}
