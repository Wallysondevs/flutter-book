import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function CleanArchitecture() {
  return (
    <PageContainer
      title="Clean Architecture"
      subtitle="Separe o app em camadas: presentation → domain → data, com dependências apontando para dentro."
      difficulty="avancado"
      timeToRead="15 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Apps que começam pequenos viram bagunça. Tela chama API direto, regra
        de negócio espalhada no widget, troca de banco vira reescrever metade
        do código. <strong>Clean Architecture</strong> é uma forma popular de
        organizar projetos Flutter para que mudar de Firebase para REST, ou de
        Provider para Bloc, custe pouco — porque a regra de negócio fica no
        meio, sem depender de nada.
      </p>

      <h2>O conceito</h2>
      <p>
        Idealizada por Robert C. Martin (Uncle Bob), Clean Architecture divide
        o código em camadas concêntricas. A regra essencial:
        <strong> as setas de dependência apontam só para dentro</strong>. Camadas
        externas conhecem as internas; internas <em>nunca</em> conhecem as
        externas.
      </p>
      <ul>
        <li><strong>Presentation</strong> (mais externa) — widgets, controllers, ViewModels, BLoCs. Conhece o Flutter.</li>
        <li><strong>Domain</strong> (núcleo) — entidades de negócio + use cases (casos de uso). <em>Puro Dart</em>, zero Flutter, zero pacote externo.</li>
        <li><strong>Data</strong> — repositórios concretos, datasources (HTTP, banco local, Firebase). Implementa contratos definidos no domain.</li>
      </ul>
      <p>
        Pense num restaurante: o <em>cardápio</em> (domain) define o que existe;
        o <em>garçom</em> (presentation) traz pedidos; a <em>cozinha</em>
        (data) busca ingredientes. Se trocar de fornecedor (banco), só a
        cozinha muda.
      </p>

      <h2>Estrutura de pastas típica</h2>
      <CodeBlock title="lib/" code={`lib/
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
  main.dart`} />

      <h2>Exemplo prático: caso de uso "Listar pedidos"</h2>
      <p>
        Vamos aterrissar a teoria com código. A entidade pura, a interface do
        repositório e o use case ficam no <strong>domain</strong>.
      </p>

      <CodeBlock title="domain/entities/pedido.dart" code={`class Pedido {
  final String id;
  final double total;
  final DateTime criadoEm;

  const Pedido({
    required this.id,
    required this.total,
    required this.criadoEm,
  });
}`} />

      <CodeBlock title="domain/repositories/pedido_repository.dart" code={`import '../entities/pedido.dart';

// Interface — não implementa nada. Só define o contrato.
abstract class PedidoRepository {
  Future<List<Pedido>> listar();
  Future<Pedido> buscar(String id);
}`} />

      <CodeBlock title="domain/usecases/listar_pedidos.dart" code={`import '../entities/pedido.dart';
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
}`} />

      <p>
        Repare: o domain não importa <code>flutter</code>, <code>dio</code>,
        <code>sqflite</code>. Ele é testável com <code>dart test</code> puro,
        roda em qualquer lugar.
      </p>

      <CodeBlock title="data/repositories/pedido_repository_impl.dart" code={`import '../../domain/entities/pedido.dart';
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
}`} />

      <CodeBlock title="presentation/controllers/pedidos_controller.dart" code={`import 'package:flutter/foundation.dart';
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
}`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Importar Flutter no domain</strong> — quebra a regra. Use <code>foundation.dart</code> só se realmente precisar de <code>ChangeNotifier</code> (ou prefira BLoC sem Flutter).</li>
        <li><strong>Use case anêmico</strong> — só repassar para o repo é desperdício. Coloque a regra (validar, ordenar, agregar) ali.</li>
        <li><strong>Vazar Model no domain</strong> — Models (com <code>fromJson</code>) ficam em data. Domain só tem Entities limpas.</li>
        <li><strong>Acoplar Widget direto ao repositório</strong> — pula o domain, derrota o propósito.</li>
        <li><strong>Pasta única gigante</strong> — organize por <em>feature</em> (pedidos/, login/), não por tipo (controllers/, repositories/).</li>
      </ul>

      <AlertBox type="info" title="Comece simples">
        Em apps pequenos (até umas 10 telas), 3 camadas formais são exagero.
        Adote conforme dor: complexidade subiu, rotatividade de devs, ou troca
        de backend no horizonte.
      </AlertBox>

      <AlertBox type="warning" title="Injeção de dependência é necessária">
        Sem um container (<code>get_it</code>, <code>provider</code>,
        <code>riverpod</code>), conectar use case ↔ repo ↔ datasource vira
        spaghetti de construtores.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use <code>get_it</code> ou <code>riverpod</code> para wiring.</li>
          <li>Retorne <code>Either&lt;Failure, T&gt;</code> (com <code>dartz</code>) para tratar erros sem exceções escondidas.</li>
          <li>Nunca exponha <code>HttpException</code> ou <code>SocketException</code> para a UI — converta em <code>Failure</code> de domínio.</li>
          <li>Escreva testes do domain primeiro — eles rodam em milissegundos.</li>
          <li>Organize por <em>feature</em>, não por camada global.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Combine com <em>Repository Pattern</em> (camada Data), <em>MVVM</em>
        (camada Presentation) e ferramentas como <em>get_it</em> ou
        <em>Riverpod</em> para amarrar tudo.
      </p>
      <AlertBox type="success">
        O ganho real aparece no time: novos devs encontram código rápido,
        trocar Firebase por REST é cirúrgico, testes do core não dependem do
        Flutter.
      </AlertBox>
    </PageContainer>
  );
}
