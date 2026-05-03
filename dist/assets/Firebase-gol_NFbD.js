import{j as e}from"./index-D4AOhXGO.js";import{P as i,C as r,A as s}from"./AlertBox-Dyf2wdSA.js";function t(){return e.jsxs(i,{title:"Firebase",subtitle:"O Backend-as-a-Service do Google: auth, banco em tempo real, storage, push, analytics.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx("h2",{children:"Por que isso importa"}),e.jsx("p",{children:"Construir backend do zero (servidor, banco, autenticação, push) leva semanas e custa caro. Firebase entrega tudo isso pronto, com plano gratuito generoso, integração oficial com Flutter e infraestrutura do Google. É a forma mais rápida de tirar um app sério do papel — desde MVP até produção com milhões de usuários."}),e.jsx("h2",{children:"O conceito"}),e.jsxs("p",{children:["Firebase é um ",e.jsx("strong",{children:"conjunto de serviços"})," independentes que você ativa conforme precisar. Os mais usados em Flutter:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Authentication"})," — login com email/senha, Google, Apple, telefone, anônimo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cloud Firestore"})," — banco NoSQL em tempo real (Streams)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Realtime Database"})," — banco JSON em árvore (mais antigo)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Storage"})," — upload de imagens/vídeos/PDFs."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cloud Messaging (FCM)"})," — push notifications."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cloud Functions"})," — código serverless em Node/TypeScript."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Analytics"})," e ",e.jsx("strong",{children:"Crashlytics"})," — métricas e captura de crashes."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Remote Config"})," — feature flags e A/B testing."]})]}),e.jsxs("p",{children:["O conjunto de plugins oficiais para Flutter chama-se ",e.jsx("strong",{children:"FlutterFire"}),"."]}),e.jsx("h2",{children:"Como o Flutter faz"}),e.jsxs("p",{children:["Configurar Firebase manualmente (criar projeto, baixar",e.jsx("code",{children:"google-services.json"}),", editar Gradle, etc.) é trabalhoso. A ferramenta ",e.jsx("strong",{children:"FlutterFire CLI"})," automatiza tudo."]}),e.jsx(r,{title:"setup inicial",code:`# 1) Instale o CLI do Firebase (Node)
npm install -g firebase-tools
firebase login

# 2) Instale o FlutterFire CLI (Dart)
dart pub global activate flutterfire_cli

# 3) No diretório do projeto Flutter
flutterfire configure
# escolha o projeto Firebase e as plataformas (android, ios, web, ...)`}),e.jsxs("p",{children:["O comando gera ",e.jsx("code",{children:"lib/firebase_options.dart"})," com as chaves de cada plataforma. Adicione os plugins desejados no",e.jsx("code",{children:"pubspec.yaml"}),":"]}),e.jsx(r,{title:"pubspec.yaml",code:`dependencies:
  firebase_core: ^3.6.0
  firebase_auth: ^5.3.1
  cloud_firestore: ^5.4.4
  firebase_storage: ^12.3.3`}),e.jsx(r,{title:"lib/main.dart — inicialização",code:`import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

Future<void> main() async {
  // Garante que o framework está pronto antes de await
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const MyApp());
}`}),e.jsx("h2",{children:"Exemplo prático: login + escrita no Firestore"}),e.jsx("p",{children:"Caso real comum: usuário faz login com email/senha e salva um pedido no banco em tempo real."}),e.jsx(r,{title:"login",code:`import 'package:firebase_auth/firebase_auth.dart';

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
}`}),e.jsx(r,{title:"ler/escrever Firestore",code:`import 'package:cloud_firestore/cloud_firestore.dart';

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
        title: Text('R$ \${d['total']}'),
      )).toList(),
    );
  },
)`}),e.jsx("h2",{children:"Pegadinhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer de chamar ",e.jsx("code",{children:"Firebase.initializeApp"})]}),' — qualquer plugin estoura erro de "Firebase not initialized".']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Regras de segurança abertas"}),' — o padrão "test mode" é público. Configure regras em produção (',e.jsx("code",{children:"request.auth != null"}),")."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Usar ",e.jsx("code",{children:"get()"})," quando deveria usar ",e.jsx("code",{children:"snapshots()"})]})," — perde o tempo real."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Queries sem índice"})," — combinar ",e.jsx("code",{children:"where"})," + ",e.jsx("code",{children:"orderBy"})," em campos diferentes exige índice; o Firestore avisa com link no console."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Leituras explosivas"})," — toda leitura de doc conta. Listas grandes sem paginação queimam quota e dinheiro."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Não desinscrever Streams"})," — em ",e.jsx("code",{children:"StatefulWidget"})," faça ",e.jsx("code",{children:"dispose()"})," da subscription."]})]}),e.jsxs(s,{type:"warning",title:"Regras de segurança são essenciais",children:["Sem regras adequadas no Firestore/Storage, qualquer pessoa com a chave do app (que está embutida no APK!) pode ler/escrever tudo. Sempre proteja com ",e.jsx("code",{children:"match /users/{uid} { allow read, write: if request.auth.uid == uid; }"}),"."]}),e.jsxs(s,{type:"info",title:"FlutterFire é oficial",children:["Os plugins são mantidos pelo time Flutter junto com a Google. Documentação em ",e.jsx("code",{children:"firebase.flutter.dev"}),"."]}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(s,{type:"tip",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Firebase Local Emulator Suite"})," em dev — sem custo, sem internet."]}),e.jsx("li",{children:"Acompanhe leituras/escritas no console do Firebase para evitar surpresa na fatura."}),e.jsxs("li",{children:["Habilite ",e.jsx("strong",{children:"Crashlytics"})," e ",e.jsx("strong",{children:"Performance Monitoring"})," em release."]}),e.jsxs("li",{children:["Para queries complexas, considere ",e.jsx("strong",{children:"Algolia"})," ou ",e.jsx("strong",{children:"Typesense"})," — Firestore não faz busca textual decente."]}),e.jsxs("li",{children:["Esconda chamadas Firebase atrás de um ",e.jsx("em",{children:"Repository"})," para poder trocar mais tarde."]})]})}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Depois disso, explore ",e.jsx("em",{children:"Cloud Messaging"})," (push), ",e.jsx("em",{children:"Functions"}),"(lógica server) e ",e.jsx("em",{children:"Repository Pattern"})," para encapsular o acesso."]}),e.jsx(s,{type:"success",children:"Com Firebase + Flutter você ataca os principais problemas de backend e foca no que diferencia seu app: a UX."})]})}export{t as default};
