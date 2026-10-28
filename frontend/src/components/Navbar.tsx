import React from 'react';
import { Vote, BarChart3, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface NavbarProps {
  abaAtiva: 'urna' | 'apuracao' | 'educativo';
  setAbaAtiva: (aba: 'urna' | 'apuracao' | 'educativo') => void;
  totalVotos: number;
  onAbrirBoletim: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ abaAtiva, setAbaAtiva, totalVotos, onAbrirBoletim }) => {
  return (
    <header className="bg-[#00223d] text-white sticky top-0 z-40 shadow-lg border-b border-[#083763]">
      
      {/* 1. BARRA BRASIL OFICIAL (PADRÃO GOV.BR / JUSTIÇA ELEITORAL) */}
      <div className="bg-[#001424] text-[11px] font-sans px-4 py-1.5 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-black tracking-widest uppercase text-amber-400">BRASIL</span>
            <span className="text-slate-600">|</span>
            <span className="font-semibold text-slate-200">Justiça Eleitoral</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">Tribunal Regional Eleitoral da Bahia (TRE-BA)</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
            <span>SEÇÃO: 0142 / ZONA: 018</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-bold uppercase">SISTEMA AUDITADO</span>
          </div>
        </div>
      </div>

      {/* 2. LOGOMARCA E CONTEXTO INSTITUCIONAL */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Identidade Visual */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-white rounded-lg flex flex-col items-center justify-center text-[#00223d] shadow-sm shrink-0 border border-slate-300 p-1">
            <span className="text-[#00223d] font-display font-black text-xs leading-none">TRE</span>
            <span className="text-[7px] font-mono font-bold tracking-tight text-amber-700 uppercase">BAHIA</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-display font-black tracking-tight text-white uppercase leading-none">
                Urna Cidadã
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-amber-500/30">
                UNIJORGE 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans mt-0.5">
              Simulador Oficial de Votação & Plataforma de Literacia Digital Cívica
            </p>
          </div>
        </div>

        {/* Informações da Eleição & Ação Rápida */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="hidden lg:block text-right border-r border-white/15 pr-3 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Município / Pleito</span>
            <span className="font-bold text-white">Salvador - BA • Eleições Gerais 2026</span>
          </div>

          <button
            onClick={onAbrirBoletim}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#001424] hover:bg-[#002a4d] text-amber-300 font-mono font-bold text-xs rounded border border-amber-500/40 shadow-sm transition"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Boletim de Urna (BU)</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>

      </div>

      {/* 3. MENU DE NAVEGAÇÃO EM ABAS OFICIAIS */}
      <nav className="bg-[#001b33] border-t border-[#083763]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
            
            <button
              onClick={() => setAbaAtiva('urna')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 font-display uppercase tracking-wide ${
                abaAtiva === 'urna'
                  ? 'border-amber-400 text-white bg-white/5 font-black'
                  : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Vote className={`w-4 h-4 ${abaAtiva === 'urna' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>Cabine de Votação</span>
            </button>

            <button
              onClick={() => setAbaAtiva('apuracao')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 font-display uppercase tracking-wide ${
                abaAtiva === 'apuracao'
                  ? 'border-amber-400 text-white bg-white/5 font-black'
                  : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className={`w-4 h-4 ${abaAtiva === 'apuracao' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>Resultados Oficiais</span>
              {totalVotos > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                  {totalVotos}
                </span>
              )}
            </button>

            <button
              onClick={() => setAbaAtiva('educativo')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 font-display uppercase tracking-wide ${
                abaAtiva === 'educativo'
                  ? 'border-amber-400 text-white bg-white/5 font-black'
                  : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${abaAtiva === 'educativo' ? 'text-sky-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Dossiê: Segurança da Urna & IA</span>
              <span className="sm:hidden">Dossiê IA</span>
            </button>

          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>TERMINAL ELEITORAL ATIVO</span>
          </div>
        </div>
      </nav>

    </header>
  );
};
