import { Suspense, lazy, useState, useEffect } from "react";
  import { Switch, Route, Router, useLocation } from "wouter";
  import { useHashLocation } from "@/hooks/useHashLocation";
  import { Header } from "@/components/layout/Header";
  import { Sidebar } from "@/components/layout/Sidebar";
  import Home from "@/pages/Home";
  import NotFound from "@/pages/NotFound";

  function ScrollToTop() {
    const [location] = useLocation();
    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "auto" }); }, [location]);
    return null;
  }

  const InstalarSdk = lazy(() => import("@/pages/InstalarSdk"));
const HelloWorld = lazy(() => import("@/pages/HelloWorld"));
const Historia = lazy(() => import("@/pages/Historia"));
const Filosofia = lazy(() => import("@/pages/Filosofia"));
const DartVsJs = lazy(() => import("@/pages/DartVsJs"));
const IDE = lazy(() => import("@/pages/IDE"));
const EstruturaProjeto = lazy(() => import("@/pages/EstruturaProjeto"));
const Tipos = lazy(() => import("@/pages/Tipos"));
const Operadores = lazy(() => import("@/pages/Operadores"));
const Strings = lazy(() => import("@/pages/Strings"));
const ControleFluxo = lazy(() => import("@/pages/ControleFluxo"));
const Loops = lazy(() => import("@/pages/Loops"));
const Funcoes = lazy(() => import("@/pages/Funcoes"));
const NullSafety = lazy(() => import("@/pages/NullSafety"));
const ListPage = lazy(() => import("@/pages/ListPage"));
const SetPage = lazy(() => import("@/pages/SetPage"));
const MapPage = lazy(() => import("@/pages/MapPage"));
const Iterables = lazy(() => import("@/pages/Iterables"));
const Classes = lazy(() => import("@/pages/Classes"));
const Construtores = lazy(() => import("@/pages/Construtores"));
const Heranca = lazy(() => import("@/pages/Heranca"));
const Mixins = lazy(() => import("@/pages/Mixins"));
const ClassesAbstratas = lazy(() => import("@/pages/ClassesAbstratas"));
const Sealed = lazy(() => import("@/pages/Sealed"));
const ExtensionMethods = lazy(() => import("@/pages/ExtensionMethods"));
const Futures = lazy(() => import("@/pages/Futures"));
const AsyncAwait = lazy(() => import("@/pages/AsyncAwait"));
const Streams = lazy(() => import("@/pages/Streams"));
const Isolates = lazy(() => import("@/pages/Isolates"));
const Stateless = lazy(() => import("@/pages/Stateless"));
const Stateful = lazy(() => import("@/pages/Stateful"));
const WidgetTree = lazy(() => import("@/pages/WidgetTree"));
const Keys = lazy(() => import("@/pages/Keys"));
const Container = lazy(() => import("@/pages/Container"));
const RowColumn = lazy(() => import("@/pages/RowColumn"));
const Stack = lazy(() => import("@/pages/Stack"));
const ExpandedFlex = lazy(() => import("@/pages/ExpandedFlex"));
const ListView = lazy(() => import("@/pages/ListView"));
const Slivers = lazy(() => import("@/pages/Slivers"));
const Material = lazy(() => import("@/pages/Material"));
const Cupertino = lazy(() => import("@/pages/Cupertino"));
const Themes = lazy(() => import("@/pages/Themes"));
const Navigator1 = lazy(() => import("@/pages/Navigator1"));
const Navigator2 = lazy(() => import("@/pages/Navigator2"));
const GoRouter = lazy(() => import("@/pages/GoRouter"));
const SetState = lazy(() => import("@/pages/SetState"));
const Provider = lazy(() => import("@/pages/Provider"));
const Riverpod = lazy(() => import("@/pages/Riverpod"));
const Bloc = lazy(() => import("@/pages/Bloc"));
const InheritedWidget = lazy(() => import("@/pages/InheritedWidget"));
const Http = lazy(() => import("@/pages/Http"));
const Dio = lazy(() => import("@/pages/Dio"));
const Json = lazy(() => import("@/pages/Json"));
const SharedPreferences = lazy(() => import("@/pages/SharedPreferences"));
const Sqflite = lazy(() => import("@/pages/Sqflite"));
const Hive = lazy(() => import("@/pages/Hive"));
const Isar = lazy(() => import("@/pages/Isar"));
const Forms = lazy(() => import("@/pages/Forms"));
const AnimacoesImplicitas = lazy(() => import("@/pages/AnimacoesImplicitas"));
const AnimacoesExplicitas = lazy(() => import("@/pages/AnimacoesExplicitas"));
const Hero = lazy(() => import("@/pages/Hero"));
const PlatformChannels = lazy(() => import("@/pages/PlatformChannels"));
const Plugins = lazy(() => import("@/pages/Plugins"));
const Ffi = lazy(() => import("@/pages/Ffi"));
const UnitTests = lazy(() => import("@/pages/UnitTests"));
const WidgetTests = lazy(() => import("@/pages/WidgetTests"));
const IntegrationTests = lazy(() => import("@/pages/IntegrationTests"));
const BuildAndroid = lazy(() => import("@/pages/BuildAndroid"));
const BuildIos = lazy(() => import("@/pages/BuildIos"));
const BuildWeb = lazy(() => import("@/pages/BuildWeb"));
const BuildDesktop = lazy(() => import("@/pages/BuildDesktop"));
const DevTools = lazy(() => import("@/pages/DevTools"));
const Profiling = lazy(() => import("@/pages/Profiling"));
const RepaintBoundary = lazy(() => import("@/pages/RepaintBoundary"));
const CleanArchitecture = lazy(() => import("@/pages/CleanArchitecture"));
const Repository = lazy(() => import("@/pages/Repository"));
const Mvvm = lazy(() => import("@/pages/Mvvm"));
const Firebase = lazy(() => import("@/pages/Firebase"));
const I18n = lazy(() => import("@/pages/I18n"));
const Referencias = lazy(() => import("@/pages/Referencias"));

  function Loading() {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        Carregando...
      </div>
    );
  }

  export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
      <Router hook={useHashLocation}>
        <ScrollToTop />
        <div className="min-h-screen bg-background text-foreground lg:pl-72">
          <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
          <Header onMenuClick={() => setMenuOpen(true)} />
          <main className="min-w-0">
            <Suspense fallback={<Loading />}>
                <Switch>
                  <Route path="/" component={Home} />
          <Route path="/instalar-sdk" component={InstalarSdk} />
        <Route path="/hello-world" component={HelloWorld} />
        <Route path="/historia" component={Historia} />
        <Route path="/filosofia" component={Filosofia} />
        <Route path="/dart-vs-js" component={DartVsJs} />
        <Route path="/ide" component={IDE} />
        <Route path="/estrutura-projeto" component={EstruturaProjeto} />
        <Route path="/tipos" component={Tipos} />
        <Route path="/operadores" component={Operadores} />
        <Route path="/strings" component={Strings} />
        <Route path="/controle-fluxo" component={ControleFluxo} />
        <Route path="/loops" component={Loops} />
        <Route path="/funcoes" component={Funcoes} />
        <Route path="/null-safety" component={NullSafety} />
        <Route path="/list" component={ListPage} />
        <Route path="/set" component={SetPage} />
        <Route path="/map" component={MapPage} />
        <Route path="/iterables" component={Iterables} />
        <Route path="/classes" component={Classes} />
        <Route path="/construtores" component={Construtores} />
        <Route path="/heranca" component={Heranca} />
        <Route path="/mixins" component={Mixins} />
        <Route path="/abstract" component={ClassesAbstratas} />
        <Route path="/sealed" component={Sealed} />
        <Route path="/extension-methods" component={ExtensionMethods} />
        <Route path="/futures" component={Futures} />
        <Route path="/async-await" component={AsyncAwait} />
        <Route path="/streams" component={Streams} />
        <Route path="/isolates" component={Isolates} />
        <Route path="/stateless" component={Stateless} />
        <Route path="/stateful" component={Stateful} />
        <Route path="/widget-tree" component={WidgetTree} />
        <Route path="/keys" component={Keys} />
        <Route path="/container" component={Container} />
        <Route path="/row-column" component={RowColumn} />
        <Route path="/stack" component={Stack} />
        <Route path="/expanded-flex" component={ExpandedFlex} />
        <Route path="/listview" component={ListView} />
        <Route path="/slivers" component={Slivers} />
        <Route path="/material" component={Material} />
        <Route path="/cupertino" component={Cupertino} />
        <Route path="/themes" component={Themes} />
        <Route path="/navigator-1" component={Navigator1} />
        <Route path="/navigator-2" component={Navigator2} />
        <Route path="/go-router" component={GoRouter} />
        <Route path="/setstate" component={SetState} />
        <Route path="/provider" component={Provider} />
        <Route path="/riverpod" component={Riverpod} />
        <Route path="/bloc" component={Bloc} />
        <Route path="/inherited-widget" component={InheritedWidget} />
        <Route path="/http" component={Http} />
        <Route path="/dio" component={Dio} />
        <Route path="/json" component={Json} />
        <Route path="/shared-preferences" component={SharedPreferences} />
        <Route path="/sqflite" component={Sqflite} />
        <Route path="/hive" component={Hive} />
        <Route path="/isar" component={Isar} />
        <Route path="/forms" component={Forms} />
        <Route path="/animacoes-implicitas" component={AnimacoesImplicitas} />
        <Route path="/animacoes-explicitas" component={AnimacoesExplicitas} />
        <Route path="/hero" component={Hero} />
        <Route path="/platform-channels" component={PlatformChannels} />
        <Route path="/plugins" component={Plugins} />
        <Route path="/ffi" component={Ffi} />
        <Route path="/unit-tests" component={UnitTests} />
        <Route path="/widget-tests" component={WidgetTests} />
        <Route path="/integration-tests" component={IntegrationTests} />
        <Route path="/build-android" component={BuildAndroid} />
        <Route path="/build-ios" component={BuildIos} />
        <Route path="/build-web" component={BuildWeb} />
        <Route path="/build-desktop" component={BuildDesktop} />
        <Route path="/devtools" component={DevTools} />
        <Route path="/profiling" component={Profiling} />
        <Route path="/repaint-boundary" component={RepaintBoundary} />
        <Route path="/clean-architecture" component={CleanArchitecture} />
        <Route path="/repository" component={Repository} />
        <Route path="/mvvm" component={Mvvm} />
        <Route path="/firebase" component={Firebase} />
        <Route path="/i18n" component={I18n} />
        <Route path="/referencias" component={Referencias} />
                  <Route component={NotFound} />
                </Switch>
              </Suspense>
            </main>
        </div>
      </Router>
    );
  }
  