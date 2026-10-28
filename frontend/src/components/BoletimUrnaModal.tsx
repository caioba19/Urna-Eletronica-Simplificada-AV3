import React from 'react';
import { Voto } from '../types';
import { CANDIDATOS } from '../data/candidatos';
import { Printer, X } from 'lucide-react';

interface BoletimUrnaModalProps {
  votos: Voto[];
  onFechar: () => void;
}

export const BoletimUrnaModal: React.FC<BoletimUrnaModalProps> = ({ votos, onFechar }) => {
  const dataHoje = new Date().toLocaleDateString('pt-BR');
  const horaHoje = new Date().toLocaleTimeString('pt-BR');

  const contarVotos = (cargo: 'VEREADOR' | 'PREFEITO') => {
    const doCargo = votos.filter((v) => v.cargo === cargo);
    const validos = doCargo.filter((v) => v.tipo === 'VALIDO');
    const brancos = doCargo.filter((v) => v.tipo === 'BRANCO').length;
    const nulos = doCargo.filter((v) => v.tipo === 'NULO').length;

    const contagemCandidatos = CANDIDATOS.filter((c) => c.cargo === cargo).map((c) => ({
      candidato: c,
      votos: validos.filter((v) => v.numero === c.numero).length,
    }));

    return { total: doCargo.length, brancos, nulos, validos: validos.length, contagemCandidatos };
  };

  const apuracaoVereador = contarVotos('VEREADOR');
  const apuracaoPrefeito = contarVotos('PREFEITO');

  return (
    <div className="fixed inset-0 z-50 bg-[#001424]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-[#002b49] rounded-lg max-w-lg w-full p-4 sm:p-6 shadow-2xl relative animate-fade-in my-8">
        
        {/* Botão de Fechar */}
        <button
          onClick={onFechar}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 p-1 rounded transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between border-b border-slate-300 pb-3 mb-4">
          <div>
            <h3 className="text-base font-display font-black text-[#00223d] uppercase">
              Boletim de Urna Oficial (BU)
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              Documento público auditável emitido pela urna eletrônica às 17h
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002b49] hover:bg-[#001f35] text-amber-300 font-mono font-bold text-xs rounded transition shadow-sm mr-6 sm:mr-0"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            Imprimir BU
          </button>
        </div>

        {/* Papel Térmico Simulado */}
        <div className="boletim-papel p-6 rounded-lg text-slate-900 text-[11px] leading-tight font-mono border border-slate-300 select-all max-h-[70vh] overflow-y-auto">
          <div className="text-center font-bold pb-2 border-b border-dashed border-slate-500 mb-3 space-y-0.5">
            <div>JUSTIÇA ELEITORAL</div>
            <div>BOLETIM DE URNA (BU)</div>
            <div className="text-[10px] font-normal">ELEIÇÕES GERAIS 2026 - SIMULAÇÃO EXTENSÃO</div>
          </div>

          <div className="space-y-1 pb-2 border-b border-dashed border-slate-500 mb-3 text-[10px]">
            <div>MUNICÍPIO: SALVADOR - BA</div>
            <div>ZONA ELEITORAL: 018 | SEÇÃO: 0142</div>
            <div>LOCAL: ESCOLA ESTADUAL PARCEIRA</div>
            <div>DATA DA EMISSÃO: {dataHoje} ÀS {horaHoje}</div>
            <div>STATUS: VOTAÇÃO ENCERRADA / LACRADA</div>
          </div>

          {/* Votos Prefeito */}
          <div className="mb-3 pb-2 border-b border-dashed border-slate-500">
            <div className="font-bold text-xs mb-1">CARGO: PREFEITO(A)</div>
            <div className="space-y-0.5">
              {apuracaoPrefeito.contagemCandidatos.map((item) => (
                <div key={item.candidato.numero} className="flex justify-between">
                  <span>{item.candidato.numero} - {item.candidato.nome.substring(0, 18)}</span>
                  <span className="font-bold">{item.votos}</span>
                </div>
              ))}
              <div className="flex justify-between text-slate-600">
                <span>VOTOS EM BRANCO:</span>
                <span>{apuracaoPrefeito.brancos}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VOTOS NULOS:</span>
                <span>{apuracaoPrefeito.nulos}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-dotted border-slate-400 pt-0.5 mt-1">
                <span>TOTAL DE VOTOS APURADOS:</span>
                <span>{apuracaoPrefeito.total}</span>
              </div>
            </div>
          </div>

          {/* Votos Vereador */}
          <div className="mb-4 pb-2 border-b border-dashed border-slate-500">
            <div className="font-bold text-xs mb-1">CARGO: VEREADOR(A)</div>
            <div className="space-y-0.5">
              {apuracaoVereador.contagemCandidatos.map((item) => (
                <div key={item.candidato.numero} className="flex justify-between">
                  <span>{item.candidato.numero} - {item.candidato.nome.substring(0, 18)}</span>
                  <span className="font-bold">{item.votos}</span>
                </div>
              ))}
              <div className="flex justify-between text-slate-600">
                <span>VOTOS EM BRANCO:</span>
                <span>{apuracaoVereador.brancos}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VOTOS NULOS:</span>
                <span>{apuracaoVereador.nulos}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-dotted border-slate-400 pt-0.5 mt-1">
                <span>TOTAL DE VOTOS APURADOS:</span>
                <span>{apuracaoVereador.total}</span>
              </div>
            </div>
          </div>

          {/* Assinatura Criptográfica */}
          <div className="text-[9px] text-slate-600 space-y-1">
            <div className="font-bold">HASH CRIPTOGRÁFICO DE INTEGRIDADE (SHA-256):</div>
            <div className="break-all font-mono bg-slate-200/60 p-1.5 rounded">
              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </div>
            <div className="text-center pt-2 italic text-[9px]">
              Documento assinado digitalmente pelo Sistema Eleitoral Unijorge 2026
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
