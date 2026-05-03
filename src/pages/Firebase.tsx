import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Firebase() {
  return (
    <PageContainer
      title="Firebase"
      subtitle="O Backend-as-a-Service do Google: auth, banco em tempo real, storage, push, analytics."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>Por que isso importa</h2>
      <p>
        Construir backend do zero (servidor, banco, autenticação, push) leva
        semanas e custa caro. Firebase entrega tudo isso pronto, com plano
        gratuito generoso, integração oficial com Flutter e infraestrutura do
        Google. É a forma mais rápida de tirar um app sério do papel — desde MVP
        até produção com milhões de usuários.
      </p>

      <h2>O conceito</h2>
      <p>
        Firebase é um <strong>conjunto de serviços</strong> independentes que você
        ativa conforme precisar. Os mais usados em Flutter:
      </p>
      <ul>
        <li><strong>Authentication</strong> — login com email/senha, Google, Apple, telefone, anônimo.</li>
        <li><strong>Cloud Firestore</strong> — banco NoSQL em tempo real (Streams).</li>
        <li><strong>Realtime Database</strong> — banco JSON em árvore (mais antigo).</li>
        <li><strong>Storage</strong> — upload de imagens/vídeos/PDFs.</li>
        <li><strong>Cloud Messaging (FCM)</strong> — push notifications.</li>
        <li><strong>Cloud Functions</strong> — código serverless em Node/TypeScript.</li>
        <li><strong>Analytics</strong> e <strong>Crashlytics</strong> — métricas e captura de crashes.</li>
        <li><strong>Remote Config</strong> — feature flags e A/B testing.</li>
      </ul>
      <p>
        O conjunto de plugins oficiais para Flutter chama-se <strong>FlutterFire</strong>.
      </p>

      <h2>Como o Flutter faz</h2>
      <p>
        Configurar Firebase manualmente (criar projeto, baixar
        <code>google-services.json</code>, editar Gradle, etc.) é trabalhoso. A
        ferramenta <strong>FlutterFire CLI</strong> automatiza tudo.
      </p>

      <CodeBlock title="setup inicial" code={`# 1) Instale o CLI do Firebase (Node)
npm install -g firebase-tools
firebase login

# 2) Instale o FlutterFire CLI (Dart)
dart pub global activate flutterfire_cli

# 3) No diretório do projeto Flutter
flutterfire configure
# escolha o projeto Firebase e as plataformas (android, ios, web, ...)`} />

      <p>
        O comando gera <code>lib/firebase_options.dart</code> com as chaves de
        cada plataforma. Adicione os plugins desejados no
        <code>pubspec.yaml</code>:
      </p>

      <CodeBlock title="pubspec.yaml" code={`dependencies:
  firebase_core: ^3.6.0
  firebase_auth: ^5.3.1
  cloud_firestore: ^5.4.4
  firebase_storage: ^12.3.3`} />

      <CodeBlock title="lib/main.dart — inicialização" code={`import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

Future<void> main() async {
  // Garante que o framework está pronto antes de await
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const MyApp());
}`} />

      <h2>Exemplo prático: login + escrita no Firestore</h2>
      <p>
        Caso real comum: usuário faz login com email/senha e salva um pedido no
        banco em tempo real.
      </p>

      <CodeBlock title="login" code={`import 'package:firebase_auth/firebase_auth.dart';

Future<User?> entrar(String email, String senha) async {
  try {
    final cred = await FirebaseAuth.instance.signInWithEmailAndPassword(
      email: email,
      password: senha,
    );
    return cred.user;
  } on FirebaseAuthException catch (e) {
    // 'user-not-found', 'wrong-password', 'invalid-email', ...
    debugPrint('Erro de login: \${e.code}');
    return null;
  }
}`} />

      <CodeBlock title="ler/escrever Firestore" code={`import 'package:cloud_firestore/cloud_firestore.dart';

final pedidos = FirebaseFirestore.instance.collection('pedidos');

// Criar
await pedidos.add({
  'usuarioId': FirebaseAuth.instance.currentUser!.uid,
  'total': 199.90,
  'criadoEm': FieldValue.serverTimestamp(),
});

// Ler em TEMPO REAL (Stream)
StreamBuilder<QuerySnapshot>(
  stream: pedidos
      .where('usuarioId', isEqualTo: FirebaseAuth.instance.currentUser!.uid)
      .orderBy('criadoEm', descending: true)
      .snapshots(),
  builder: (ctx, snap) {
    if (!snap.hasData) return const CircularProgressIndicator();
    final docs = snap.data!.docs;
    return ListView(
      children: docs.map((d) => ListTile(
        title: Text('R\$ \${d['total']}'),
      )).toList(),
    );
  },
)`} />

      <h2>Pegadinhas comuns</h2>
      <ul>
        <li><strong>Esquecer de chamar <code>Firebase.initializeApp</code></strong> — qualquer plugin estoura erro de "Firebase not initialized".</li>
        <li><strong>Regras de segurança abertas</strong> — o padrão "test mode" é público. Configure regras em produção (<code>request.auth != null</code>).</li>
        <li><strong>Usar <code>get()</code> quando deveria usar <code>snapshots()</code></strong> — perde o tempo real.</li>
        <li><strong>Queries sem índice</strong> — combinar <code>where</code> + <code>orderBy</code> em campos diferentes exige índice; o Firestore avisa com link no console.</li>
        <li><strong>Leituras explosivas</strong> — toda leitura de doc conta. Listas grandes sem paginação queimam quota e dinheiro.</li>
        <li><strong>Não desinscrever Streams</strong> — em <code>StatefulWidget</code> faça <code>dispose()</code> da subscription.</li>
      </ul>

      <AlertBox type="warning" title="Regras de segurança são essenciais">
        Sem regras adequadas no Firestore/Storage, qualquer pessoa com a chave
        do app (que está embutida no APK!) pode ler/escrever tudo. Sempre
        proteja com <code>match /users/&#123;uid&#125; &#123; allow read, write: if request.auth.uid == uid; &#125;</code>.
      </AlertBox>

      <AlertBox type="info" title="FlutterFire é oficial">
        Os plugins são mantidos pelo time Flutter junto com a Google.
        Documentação em <code>firebase.flutter.dev</code>.
      </AlertBox>

      <h2>Boas práticas</h2>
      <AlertBox type="tip">
        <ul>
          <li>Use <code>Firebase Local Emulator Suite</code> em dev — sem custo, sem internet.</li>
          <li>Acompanhe leituras/escritas no console do Firebase para evitar surpresa na fatura.</li>
          <li>Habilite <strong>Crashlytics</strong> e <strong>Performance Monitoring</strong> em release.</li>
          <li>Para queries complexas, considere <strong>Algolia</strong> ou <strong>Typesense</strong> — Firestore não faz busca textual decente.</li>
          <li>Esconda chamadas Firebase atrás de um <em>Repository</em> para poder trocar mais tarde.</li>
        </ul>
      </AlertBox>

      <h2>Próximos passos</h2>
      <p>
        Depois disso, explore <em>Cloud Messaging</em> (push), <em>Functions</em>
        (lógica server) e <em>Repository Pattern</em> para encapsular o acesso.
      </p>
      <AlertBox type="success">
        Com Firebase + Flutter você ataca os principais problemas de backend e
        foca no que diferencia seu app: a UX.
      </AlertBox>
    </PageContainer>
  );
}
