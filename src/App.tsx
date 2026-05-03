import { useState, useEffect, lazy, Suspense } from "react";
  import { Switch, Route, Router as WouterRouter } from "wouter";
  import { useHashLocation } from "wouter/use-hash-location";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

  import { Sidebar } from "@/components/layout/Sidebar";
  import { Header } from "@/components/layout/Header";

  import Home from "@/pages/Home";
  import NotFound from "@/pages/NotFound";

  const InstalarSdk = lazy(() => import("@/pages/InstalarSdk"));
  const HelloWorld = lazy(() => import("@/pages/HelloWorld"));

  const queryClient = new QueryClient();

  function ScrollToTop() {
    const [location] = useHashLocation();
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, [location]);
    return null;
  }

  function PageLoader() {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
      <QueryClientProvider client={queryClient}>
        <WouterRouter hook={useHashLocation}>
          <ScrollToTop />
          <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
              <Header onMenuClick={() => setSidebarOpen(true)} />
              <main className="flex-1">
                <Suspense fallback={<PageLoader />}>
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/instalar-sdk" component={InstalarSdk} />
                    <Route path="/hello-world" component={HelloWorld} />
                    <Route component={NotFound} />
                  </Switch>
                </Suspense>
              </main>
            </div>
          </div>
        </WouterRouter>
      </QueryClientProvider>
    );
  }
  