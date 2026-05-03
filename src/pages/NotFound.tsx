import { Link } from "wouter";
  import { ArrowLeft } from "lucide-react";

  export default function NotFound() {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="text-[8rem] font-display font-bold text-[#0175C2] leading-none">404</div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-[#0175C2]">$</span> Página não encontrada
          </h1>
          <p className="text-[#888A85] mb-8">
            O widget que você procurou não foi montado — talvez a rota tenha mudado ou ainda esteja em construção.
          </p>
          <div className="rounded-xl overflow-hidden border border-[#1F1F1F]/60 bg-[#0A0A0A] shadow-2xl text-left mb-8 max-w-xl mx-auto">
            <div className="px-4 py-2 bg-[#151515] border-b border-[#1F1F1F]/60 text-xs font-mono text-[#888A85]">
              main.dart — análise estática
            </div>
            <pre className="p-5 text-sm font-mono text-[#D3D7CF] leading-relaxed">
  {`$ flutter analyze
  error • Undefined name 'PaginaProcurada' • lib/pages/pagina_procurada.dart:1:1 • undefined_identifier

  1 error found.`}
            </pre>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0175C2] hover:bg-[#13B9FD] text-black font-bold rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }
  