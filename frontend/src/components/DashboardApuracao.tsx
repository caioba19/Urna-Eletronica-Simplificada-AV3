import React, { useState } from 'react';
import { ResultadoCargo, TipoCargo, Voto } from '../types';
import { CONFIG_CARGOS, CANDIDATOS } from '../data/candidatos';
import { CheckCircle2, FileText, RotateCcw, Shuffle } from 'lucide-react';

interface DashboardApuracaoProps {
  votos: Voto[];
  onZerarVotos: () => void;
  onAdicionarVotosAleatorios: (quantidade: number) => void;
  onAbrirBoletim: () => void;
}

export const DashboardApuracao: React.FC<DashboardApuracaoProps> = ({
  votos,
  onZerarVotos,
  onAdicionarVotosAleatorios,
  onAbrirBoletim,
}) => {
  const [cargoVisualizado, setCargoVisualizado] = useState<TipoCargo>('PREFEITO');

  const calcularResultado = (cargo: TipoCargo): ResultadoCargo => {
    const votosCargo = votos.filter((v) => v.cargo === cargo);
    const total = votosCargo.length;
    const brancos = votosCargo.filter((v) => v.tipo === 'BRANCO').length;
    const nulos = votosCargo.filter((v) => v.tipo === 'NULO').length;
    const validos = votosCargo.filter((v) => v.tipo === 'VALIDO').length;

    const candidatosDoCargo = CANDIDATOS.filter((c) => c.cargo === cargo);

    const candidatosContagem = candidatosDoCargo.map((candidato) => {
      const contagem = votosCargo.filter(
        (v) => v.tipo === 'VALIDO' && v.numero === candidato.numero
      ).length;
      const porcentagemValidos = validos > 0 ? (contagem / validos) * 100 : 0;
      return {
        candidato,
        votos: contagem,
        porcentagemValidos: Number(porcentagemValidos.toFixed(2)),
      };
    });

    candidatosContagem.sort((a, b) => b.votos - a.votos);

    return {
      cargo,
      totalVotos: total,
      brancos,
      nulos,
      validos,
      candidatos: candidatosContagem,
    };
  };

  const resultado = calcularResultado(cargoVisualizado);

  return (
    <div className="max-w-6xl mx-auto py-5 px-4 font-sans text-slate-900">
      
      {/* 1. BARRA DE FILTROS DO SISTEMA RESULTADOS TSE */}
      <div className="bg-white border border-slate-300 rounded-t-lg p-4 shadow-sm border-b-2 border-b-[#002b49]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Eleição</span>
              <span className="font-bold text-[#002b49]">Eleições Gerais Ordinárias 2026</span>
            </div>
            <div className="border-l border-slate-300 pl-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">UF / Município</span>
              <span className="font-bold text-[#002b49]">BA - Salvador (Código: 38490)</span>
            </div>
            <div className="border-l border-slate-300 pl-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Situação</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Totalização 100,00% Concluída
              </span>
            </div>
          </div>

          {/* Botões de Ação Mesário / Docente */}
          <div className="flex items-center gap-2">
            <button
              onClick={onAbrirBoletim}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002b49] hover:bg-[#001f35] text-white text-xs font-bold rounded shadow-sm transition"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Boletim de Urna (BU)
            </button>

            <button
              onClick={() => onAdicionarVotosAleatorios(10)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded border border-slate-300 transition"
              title="Gera votos simulados para demonstração da aula"
            >
              <Shuffle className="w-3.5 h-3.5 text-slate-500" />
              Simular +10 Votos
            </button>

            <button
              onClick={() => {
                if (window.confirm('Deseja zerar os votos da urna para nova votação?')) {
                  onZerarVotos();
                }
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-red-50 text-red-700 text-xs font-bold rounded border border-red-300 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Zerar Urna
            </button>
          </div>

        </div>
      </div>

      {/* 2. SELETOR DE CARGO (ESTILO RESULTADOS TSE) */}
      <div className="bg-[#f8fafc] border-x border-b border-slate-300 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 uppercase">Cargo Selecionado:</span>
          <div className="inline-flex rounded border border-slate-300 bg-white shadow-sm p-0.5">
            {CONFIG_CARGOS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCargoVisualizado(c.id)}
                className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                  cargoVisualizado === c.id
                    ? 'bg-[#002b49] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.nome}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Total de seções apuradas: <b>1 de 1 (100,00%)</b>
        </div>
      </div>

      {/* 3. QUADRO RESUMO ESTATÍSTICO OFICIAL */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
        <div className="bg-white border border-slate-300 rounded p-3 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-500 block">Total de Votos</span>
          <span className="text-xl font-black text-slate-900 block font-mono">{resultado.totalVotos}</span>
          <span className="text-[10px] text-slate-400">100,00% dos eleitores da seção</span>
        </div>

        <div className="bg-white border border-slate-300 rounded p-3 shadow-sm border-l-4 border-l-emerald-600">
          <span className="text-[10px] font-bold uppercase text-emerald-800 block">Votos Válidos (Nominais)</span>
          <span className="text-xl font-black text-emerald-700 block font-mono">{resultado.validos}</span>
          <span className="text-[10px] text-slate-500">
            {resultado.totalVotos > 0 ? `${((resultado.validos / resultado.totalVotos) * 100).toFixed(2)}% do total` : '0,00%'}
          </span>
        </div>

        <div className="bg-white border border-slate-300 rounded p-3 shadow-sm border-l-4 border-l-slate-400">
          <span className="text-[10px] font-bold uppercase text-slate-600 block">Votos em Branco</span>
          <span className="text-xl font-black text-slate-700 block font-mono">{resultado.brancos}</span>
          <span className="text-[10px] text-slate-500">
            {resultado.totalVotos > 0 ? `${((resultado.brancos / resultado.totalVotos) * 100).toFixed(2)}% do total` : '0,00%'}
          </span>
        </div>

        <div className="bg-white border border-slate-300 rounded p-3 shadow-sm border-l-4 border-l-red-500">
          <span className="text-[10px] font-bold uppercase text-red-700 block">Votos Nulos</span>
          <span className="text-xl font-black text-red-600 block font-mono">{resultado.nulos}</span>
          <span className="text-[10px] text-slate-500">
            {resultado.totalVotos > 0 ? `${((resultado.nulos / resultado.totalVotos) * 100).toFixed(2)}% do total` : '0,00%'}
          </span>
        </div>
      </div>

      {/* 4. LISTAGEM DE CANDIDATOS (PADRÃO RESULTADOS TSE) */}
      <div className="bg-white border border-slate-300 rounded shadow-sm overflow-hidden mb-6">
        <div className="bg-[#002b49] text-white px-4 py-2.5 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
          <span>Candidatos a {cargoVisualizado} • Ordem de Votação</span>
          <span>Percentual de Votos Válidos</span>
        </div>

        {resultado.totalVotos === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs font-mono">
            Aguardando votos da Urna Eletrônica... Realize votos no simulador para visualizar os resultados.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {resultado.candidatos.map((item, index) => {
              const isEleito = index === 0 && item.votos > 0;
              return (
                <div
                  key={item.candidato.numero}
                  className={`p-4 transition-colors ${isEleito ? 'bg-emerald-50/40' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    {/* Foto Oficial e Dados Eleitorais do TSE */}
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-7 text-center font-mono font-bold text-slate-400 text-sm shrink-0">
                        {index + 1}º
                      </div>

                      <div className="w-14 h-16 bg-slate-100 border border-slate-300 rounded overflow-hidden shrink-0 shadow-sm">
                        <img
                          src={item.candidato.fotoUrl}
                          alt={item.candidato.nome}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-black text-[#002b49] uppercase">
                            {item.candidato.nome}
                          </span>

                          <span className="bg-[#002b49] text-white font-mono font-bold text-xs px-2 py-0.5 rounded">
                            {item.candidato.numero}
                          </span>

                          {isEleito && (
                            <span className="bg-[#008037] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wide shadow-sm">
                              ELEITO
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-600 mt-1">
                          <span className="font-bold text-slate-800">{item.candidato.partido.sigla}</span> • {item.candidato.partido.nome}
                          {item.candidato.vice && (
                            <span className="text-slate-500"> • Vice: {item.candidato.vice}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Votos Válidos e Percentual Oficial */}
                    <div className="text-right sm:min-w-[140px] pl-10 sm:pl-0">
                      <div className="text-2xl font-black text-[#002b49] font-mono leading-none">
                        {item.porcentagemValidos.toFixed(2)}%
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-1">
                        {item.votos} {item.votos === 1 ? 'voto válido' : 'votos válidos'}
                      </div>
                    </div>

                  </div>

                  {/* Barra Oficial de Votação do TSE */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full rounded-full transition-all duration-700 bg-[#008037]"
                      style={{ width: `${item.porcentagemValidos}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
