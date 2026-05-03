import{j as e}from"./index-D9yRYXwO.js";import{P as s,C as o,A as t}from"./AlertBox-B2Rl5ETq.js";function i(){return e.jsxs(s,{title:"BLoC",subtitle:"Padrão de Eventos → Estado para apps grandes, com forte separação de responsabilidades.",difficulty:"avancado",timeToRead:"16 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Em apps grandes, com vários devs no mesmo código, ter ",e.jsx("em",{children:"liberdade demais"})," para mudar estado vira caos: cada dev resolve do seu jeito, código fica difícil de testar e debugar. O ",e.jsx("strong",{children:"BLoC"})," (",e.jsx("em",{children:"Business Logic Component"}),") impõe uma estrutura rígida que escala bem: a UI dispara ",e.jsx("strong",{children:"Eventos"}),", o BLoC processa e emite ",e.jsx("strong",{children:"Estados"}),", a UI reage."]}),e.jsx("p",{children:"É verboso, sim. Mas em troca você ganha previsibilidade, testabilidade absurda e timeline de eventos perfeita para debug."}),e.jsx("h2",{children:"O conceito"}),e.jsx("p",{children:"Pense numa caixa preta:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Entrada (Event)"}),": tudo que pode acontecer (usuário clicou, app iniciou, dados chegaram)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Saída (State)"}),": o estado atual da feature (carregando, sucesso com dados, erro)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"BLoC"}),": a caixa que recebe eventos e emite estados."]})]}),e.jsxs("p",{children:["A UI só observa estados (via ",e.jsx("code",{children:"BlocBuilder"}),") e dispara eventos (via ",e.jsx("code",{children:"bloc.add(MeuEvento())"}),"). Nunca chama métodos diretos. Isso quebra acoplamento e permite trocar a UI inteira sem mexer no BLoC — e vice-versa."]}),e.jsxs("p",{children:["Existe também o ",e.jsx("strong",{children:"Cubit"}),", uma versão simplificada sem eventos: você chama métodos no Cubit que emitem novos estados. Use Cubit para casos simples e Bloc completo quando os eventos forem úteis para debug/log."]}),e.jsx("h2",{children:"Setup"}),e.jsx(o,{title:"pubspec.yaml",code:`dependencies:
  flutter:
    sdk: flutter
  flutter_bloc: ^8.1.0
  equatable: ^2.0.0`}),e.jsx("h2",{children:"Como Flutter faz: Cubit (versão simples)"}),e.jsx(o,{title:"contador_cubit.dart",code:`import 'package:flutter_bloc/flutter_bloc.dart';

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
              '$n',
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
}`}),e.jsx("h2",{children:"Exemplo prático: BLoC completo com eventos"}),e.jsxs("p",{children:["Quando você quer ",e.jsx("strong",{children:"rastrear cada ação"})," que pode mudar o estado (útil para analytics, undo/redo, debug), use Bloc com eventos:"]}),e.jsx(o,{title:"auth_bloc.dart",code:`import 'package:equatable/equatable.dart';
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
}`}),e.jsx("h2",{children:"UI consumindo o AuthBloc"}),e.jsx(o,{title:"login_page.dart",code:`class LoginPage extends StatelessWidget {
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
}`}),e.jsxs(t,{type:"info",title:"BlocBuilder, BlocListener, BlocConsumer",children:[e.jsx("strong",{children:"Builder"})," reconstrói widgets quando o estado muda. ",e.jsx("strong",{children:"Listener"})," dispara efeitos sem rebuild (snackbar, navegação). ",e.jsx("strong",{children:"Consumer"})," faz os dois ao mesmo tempo."]}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Snackbar/navegação dentro do builder:"})," errado — builder pode rodar várias vezes. Use ",e.jsx("code",{children:"BlocListener"}),"."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"Equatable"}),":"]}),' sem ele, dois estados com mesmo conteúdo são "diferentes" (compara por referência) e disparam rebuilds desnecessários.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Lógica de UI no Bloc:"})," Bloc não deve conhecer ",e.jsx("code",{children:"BuildContext"}),". Mantenha referências a Material fora dele."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mutar estado:"})," use ",e.jsx("code",{children:"copyWith"})," ou recrie o objeto. Nunca ",e.jsx("code",{children:"state.lista.add(...)"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Não fechar o Bloc:"})," ao usar ",e.jsx("code",{children:"BlocProvider"}),", ele cuida do ",e.jsx("code",{children:"close"}),". Mas se instanciar manualmente, lembre de chamar ",e.jsx("code",{children:"bloc.close()"})," no dispose."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Boilerplate excessivo:"})," para coisas pequenas (toggle de tema, contador), Cubit (sem eventos) é suficiente. Use Bloc completo só quando o histórico de eventos agrega valor."]})]}),e.jsxs(t,{type:"warning",title:"Bloc não é necessário para tudo",children:["Apps pequenos morrem afogados em boilerplate se forçarem Bloc completo. Comece com ",e.jsx("code",{children:"setState"})," ou Provider; migre para Bloc quando a complexidade justificar."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(t,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Modele estados com ",e.jsx("code",{children:"sealed class"})," + subclasses (Dart 3) — o compilador força você a tratar todos os casos."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Equatable"})," em todos os estados e eventos."]}),e.jsxs("li",{children:["Separe ",e.jsx("code",{children:"auth_bloc.dart"}),", ",e.jsx("code",{children:"auth_event.dart"}),", ",e.jsx("code",{children:"auth_state.dart"})," em arquivos diferentes ou em barrel files."]}),e.jsxs("li",{children:["Teste o Bloc isoladamente com ",e.jsx("code",{children:"blocTest"})," (do pacote ",e.jsx("code",{children:"bloc_test"}),") — extremamente fácil."]}),e.jsxs("li",{children:["Para apps grandes, organize por feature: ",e.jsx("code",{children:"lib/features/auth/bloc"}),", ",e.jsx("code",{children:"lib/features/cart/bloc"}),"."]}),e.jsxs("li",{children:["Combine com ",e.jsx("code",{children:"get_it"})," ou ",e.jsx("code",{children:"RepositoryProvider"})," para injetar dependências (services, repositories)."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Você viu três sabores de gerenciamento de estado: ",e.jsx("strong",{children:"Provider"}),", ",e.jsx("strong",{children:"Riverpod"})," e ",e.jsx("strong",{children:"BLoC"}),". Para entender o que sustenta todos eles, veja ",e.jsx("strong",{children:"InheritedWidget"})," — o mecanismo nativo do Flutter por baixo de toda essa magia."]}),e.jsx(t,{type:"success",title:"Qual escolher",children:'Não existe "melhor". Existe o que combina com o tamanho do projeto e do time. Aprenda os três e escolha por contexto, não por moda.'})]})}export{i as default};
