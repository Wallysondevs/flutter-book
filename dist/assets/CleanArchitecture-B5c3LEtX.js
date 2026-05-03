import{j as e}from"./index-D4AOhXGO.js";import{P as i,C as r,A as o}from"./AlertBox-Dyf2wdSA.js";function s(){return e.jsxs(i,{title:"Clean Architecture",subtitle:"Separe o app em camadas: presentation → domain → data, com dependências apontando para dentro.",difficulty:"avancado",timeToRead:"15 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsxs("p",{children:["Apps que começam pequenos viram bagunça. Tela chama API direto, regra de negócio espalhada no widget, troca de banco vira reescrever metade do código. ",e.jsx("strong",{children:"Clean Architecture"})," é uma forma popular de organizar projetos Flutter para que mudar de Firebase para REST, ou de Provider para Bloc, custe pouco — porque a regra de negócio fica no meio, sem depender de nada."]}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Idealizada por Robert C. Martin (Uncle Bob), Clean Architecture divide o código em camadas concêntricas. A regra essencial:",e.jsx("strong",{children:" as setas de dependência apontam só para dentro"}),". Camadas externas conhecem as internas; internas ",e.jsx("em",{children:"nunca"})," conhecem as externas."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Presentation"})," (mais externa) — widgets, controllers, ViewModels, BLoCs. Conhece o Flutter."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Domain"})," (núcleo) — entidades de negócio + use cases (casos de uso). ",e.jsx("em",{children:"Puro Dart"}),", zero Flutter, zero pacote externo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Data"})," — repositórios concretos, datasources (HTTP, banco local, Firebase). Implementa contratos definidos no domain."]})]}),e.jsxs("p",{children:["Pense num restaurante: o ",e.jsx("em",{children:"cardápio"})," (domain) define o que existe; o ",e.jsx("em",{children:"garçom"})," (presentation) traz pedidos; a ",e.jsx("em",{children:"cozinha"}),"(data) busca ingredientes. Se trocar de fornecedor (banco), só a cozinha muda."]}),e.jsx("h2",{children:"Estrutura de pastas típica"}),e.jsx(r,{title:"lib/",code:`lib/
  features/
    pedidos/
      domain/
        entities/pedido.dart
        repositories/pedido_repository.dart   // interface
        usecases/listar_pedidos.dart
      data/
        models/pedido_model.dart              // serialização
        datasources/pedido_remote_ds.dart
        repositories/pedido_repository_impl.dart
      presentation/
        controllers/pedidos_controller.dart   // ChangeNotifier/Bloc
        pages/pedidos_page.dart
        widgets/pedido_card.dart
  core/
    errors/failures.dart
    network/dio_client.dart
  main.dart`}),e.jsx("h2",{children:'Exemplo prático: caso de uso "Listar pedidos"'}),e.jsxs("p",{children:["Vamos aterrissar a teoria com código. A entidade pura, a interface do repositório e o use case ficam no ",e.jsx("strong",{children:"domain"}),"."]}),e.jsx(r,{title:"domain/entities/pedido.dart",code:`class Pedido {
  final String id;
  final double total;
  final DateTime criadoEm;

  const Pedido({
    required this.id,
    required this.total,
    required this.criadoEm,
  });
}`}),e.jsx(r,{title:"domain/repositories/pedido_repository.dart",code:`import '../entities/pedido.dart';

// Interface — não implementa nada. Só define o contrato.
abstract class PedidoRepository {
  Future<List<Pedido>> listar();
  Future<Pedido> buscar(String id);
}`}),e.jsx(r,{title:"domain/usecases/listar_pedidos.dart",code:`import '../entities/pedido.dart';
import '../repositories/pedido_repository.dart';

class ListarPedidos {
  final PedidoRepository repo;
  const ListarPedidos(this.repo);

  Future<List<Pedido>> call() async {
    final pedidos = await repo.listar();
    // Regra de negócio: ordenar por mais recente
    pedidos.sort((a, b) => b.criadoEm.compareTo(a.criadoEm));
    return pedidos;
  }
}`}),e.jsxs("p",{children:["Repare: o domain não importa ",e.jsx("code",{children:"flutter"}),", ",e.jsx("code",{children:"dio"}),",",e.jsx("code",{children:"sqflite"}),". Ele é testável com ",e.jsx("code",{children:"dart test"})," puro, roda em qualquer lugar."]}),e.jsx(r,{title:"data/repositories/pedido_repository_impl.dart",code:`import '../../domain/entities/pedido.dart';
import '../../domain/repositories/pedido_repository.dart';
import '../datasources/pedido_remote_ds.dart';

class PedidoRepositoryImpl implements PedidoRepository {
  final PedidoRemoteDataSource remote;
  const PedidoRepositoryImpl(this.remote);

  @override
  Future<List<Pedido>> listar() async {
    final models = await remote.listar();
    return models.map((m) => Pedido(
      id: m.id,
      total: m.total,
      criadoEm: m.criadoEm,
    )).toList();
  }

  @override
  Future<Pedido> buscar(String id) async {
    final m = await remote.buscar(id);
    return Pedido(id: m.id, total: m.total, criadoEm: m.criadoEm);
  }
}`}),e.jsx(r,{title:"presentation/controllers/pedidos_controller.dart",code:`import 'package:flutter/foundation.dart';
import '../../domain/entities/pedido.dart';
import '../../domain/usecases/listar_pedidos.dart';

class PedidosController extends ChangeNotifier {
  final ListarPedidos listarPedidos;
  PedidosController(this.listarPedidos);

  bool carregando = false;
  List<Pedido> pedidos = [];

  Future<void> carregar() async {
    carregando = true; notifyListeners();
    pedidos = await listarPedidos();
    carregando = false; notifyListeners();
  }
}`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Importar Flutter no domain"})," — quebra a regra. Use ",e.jsx("code",{children:"foundation.dart"})," só se realmente precisar de ",e.jsx("code",{children:"ChangeNotifier"})," (ou prefira BLoC sem Flutter)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Use case anêmico"})," — só repassar para o repo é desperdício. Coloque a regra (validar, ordenar, agregar) ali."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Vazar Model no domain"})," — Models (com ",e.jsx("code",{children:"fromJson"}),") ficam em data. Domain só tem Entities limpas."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Acoplar Widget direto ao repositório"})," — pula o domain, derrota o propósito."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Pasta única gigante"})," — organize por ",e.jsx("em",{children:"feature"})," (pedidos/, login/), não por tipo (controllers/, repositories/)."]})]}),e.jsx(o,{type:"info",title:"Comece simples",children:"Em apps pequenos (até umas 10 telas), 3 camadas formais são exagero. Adote conforme dor: complexidade subiu, rotatividade de devs, ou troca de backend no horizonte."}),e.jsxs(o,{type:"warning",title:"Injeção de dependência é necessária",children:["Sem um container (",e.jsx("code",{children:"get_it"}),", ",e.jsx("code",{children:"provider"}),",",e.jsx("code",{children:"riverpod"}),"), conectar use case ↔ repo ↔ datasource vira spaghetti de construtores."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(o,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"get_it"})," ou ",e.jsx("code",{children:"riverpod"})," para wiring."]}),e.jsxs("li",{children:["Retorne ",e.jsx("code",{children:"Either<Failure, T>"})," (com ",e.jsx("code",{children:"dartz"}),") para tratar erros sem exceções escondidas."]}),e.jsxs("li",{children:["Nunca exponha ",e.jsx("code",{children:"HttpException"})," ou ",e.jsx("code",{children:"SocketException"})," para a UI — converta em ",e.jsx("code",{children:"Failure"})," de domínio."]}),e.jsx("li",{children:"Escreva testes do domain primeiro — eles rodam em milissegundos."}),e.jsxs("li",{children:["Organize por ",e.jsx("em",{children:"feature"}),", não por camada global."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Combine com ",e.jsx("em",{children:"Repository Pattern"})," (camada Data), ",e.jsx("em",{children:"MVVM"}),"(camada Presentation) e ferramentas como ",e.jsx("em",{children:"get_it"})," ou",e.jsx("em",{children:"Riverpod"})," para amarrar tudo."]}),e.jsx(o,{type:"success",children:"O ganho real aparece no time: novos devs encontram código rápido, trocar Firebase por REST é cirúrgico, testes do core não dependem do Flutter."})]})}export{s as default};
