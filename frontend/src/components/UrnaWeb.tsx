import React, { useState, useEffect, useCallback } from 'react';
import { CONFIG_CARGOS, CANDIDATOS } from '../data/candidatos';
import { Candidato, CargoConfig, Voto } from '../types';
import { playConfirmaSound, playErrorSound, playKeySound } from '../utils/audio';
import { FileText, HelpCircle, Shield, Volume2 } from 'lucide-react';

interface UrnaWebProps {
  onRegistrarVotos: (votos: Voto[]) => void;
  onAbrirBoletim?: () => void;
}

export const UrnaWeb: React.FC<UrnaWebProps> = ({ onRegistrarVotos, onAbrirBoletim }) => {
  const [cargoIndex, setCargoIndex] = useState<number>(0);
  const [digitos, setDigitos] = useState<string>('');
  const [isBranco, setIsBranco] = useState<boolean>(false);
  const [isFinalizada, setIsFinalizada] = useState<boolean>(false);
  const [votosSessao, setVotosSessao] = useState<Voto[]>([]);
  const [mostrarCola, setMostrarCola] = useState<boolean>(true);
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);

  const cargoAtual: CargoConfig = CONFIG_CARGOS[cargoIndex];

  // Cursor piscante
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Busca do candidato
  const candidatoEncontrado: Candidato | undefined =
    digitos.length === cargoAtual.digitos
      ? CANDIDATOS.find((c) => c.cargo === cargoAtual.id && c.numero === digitos)
      : undefined;

  const isNumeroInvalido = digitos.length === cargoAtual.digitos && !candidatoEncontrado;

  const digitarNumero = useCallback((digito: string) => {
    if (isFinalizada || isBranco) return;
    if (digitos.length < cargoAtual.digitos) {
      playKeySound();
      setDigitos((prev) => prev + digito);
    }
  }, [cargoAtual.digitos, digitos.length, isBranco, isFinalizada]);

  const votarBranco = useCallback(() => {
    if (isFinalizada || digitos.length > 0) return;
    playKeySound();
    setIsBranco(true);
  }, [digitos.length, isFinalizada]);

  const corrigir = useCallback(() => {
    if (isFinalizada) return;
    playKeySound();
    setDigitos('');
    setIsBranco(false);
  }, [isFinalizada]);

  const confirmar = useCallback(() => {
    if (isFinalizada) return;

    if (!isBranco && digitos.length < cargoAtual.digitos) {
      playErrorSound();
      return;
    }

    const tipoVoto = isBranco ? 'BRANCO' : candidatoEncontrado ? 'VALIDO' : 'NULO';
    const novoVoto: Voto = {
      cargo: cargoAtual.id,
      numero: isBranco ? '' : digitos,
      tipo: tipoVoto,
      data: new Date().toISOString(),
    };

    const novosVotos = [...votosSessao, novoVoto];
    setVotosSessao(novosVotos);

    // Próximo cargo (Vereador -> Prefeito)
    if (cargoIndex < CONFIG_CARGOS.length - 1) {
      playKeySound();
      setCargoIndex((prev) => prev + 1);
      setDigitos('');
      setIsBranco(false);
    } else {
      // Votação finalizada
      playConfirmaSound();
      setIsFinalizada(true);
      onRegistrarVotos(novosVotos);

      setTimeout(() => {
        setCargoIndex(0);
        setDigitos('');
        setIsBranco(false);
        setVotosSessao([]);
        setIsFinalizada(false);
      }, 3500);
    }
  }, [cargoAtual.digitos, cargoAtual.id, cargoIndex, candidatoEncontrado, digitos, isBranco, isFinalizada, onRegistrarVotos, votosSessao]);

  // Teclado físico
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        digitarNumero(e.key);
      } else if (e.key === 'Enter') {
        confirmar();
      } else if (e.key === 'Backspace' || e.key === 'Escape') {
        corrigir();
      } else if (e.key.toLowerCase() === 'b') {
        votarBranco();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmar, corrigir, digitarNumero, votarBranco]);

  return (
    <div className="voting-page">
      
      {/* 1. BARRA SUPERIOR DE INFORMAÇÕES DA SEÇÃO ELEITORAL */}
      <div className="voting-toolbar">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <div className="text-xs font-mono text-slate-700">
            <span className="font-bold text-[#00223d]">CABINE DE SIMULAÇÃO 01</span> • SEÇÃO FICTÍCIA: 0142 | ZONA: 018 • SALVADOR - BA
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onAbrirBoletim && (
            <button
              onClick={onAbrirBoletim}
              className="button"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              Ver BU
            </button>
          )}

          <button
            onClick={() => setMostrarCola(!mostrarCola)}
            className="button"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            {mostrarCola ? 'Ocultar Colinha' : 'Colinha do Eleitor'}
          </button>
        </div>
      </div>

      {/* 2. COMPOSIÇÃO DA CABINE: URNA FÍSICA + CÉDULA DE COLINHA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LADO ESQUERDO: GABINETE DA URNA ELETRÔNICA MODELO UE-2022 */}
        <div className="lg:col-span-8 voting-device">
          
          {/* Header Metálico do Gabinete */}
          <div className="voting-device__header">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs font-display font-bold tracking-wide text-slate-100 uppercase block leading-none">
                  SIMULAÇÃO EDUCATIVA
                </span>
              <span className="text-[9px] font-mono text-slate-400 uppercase">
                  TECLADO INTERATIVO
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">SINTETIZADOR ATIVO</span>
              </div>
              <div className="voting-device__state">
                PRONTA
              </div>
            </div>
          </div>

          {/* Interior: Visor LCD + Teclado 3D */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* TELA LCD DA URNA */}
            <div className="md:col-span-7 urna-screen-bevel rounded-lg border-2 border-[#24292e] p-5 flex flex-col justify-between min-h-[420px] relative overflow-hidden select-none">
              
              {isFinalizada ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in my-auto">
                  <span className="text-8xl sm:text-9xl font-display font-black tracking-widest text-slate-950 mb-3">
                    FIM
                  </span>
                  <div className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                    ✔ VOTO GRAVADO COM SUCESSO
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-3">
                    Reiniciando terminal para o próximo eleitor em 3s...
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase text-slate-500 mb-1">
                      SEU VOTO PARA
                    </div>
                    <div className="text-2xl font-display font-black text-slate-950 tracking-wide border-b-2 border-slate-300 pb-2 mb-4">
                      {cargoAtual.nome}
                    </div>

                    {isBranco ? (
                      <div className="py-20 text-center animate-fade-in">
                        <span className="text-3xl font-display font-black text-slate-900 tracking-wider">
                          VOTO EM BRANCO
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Dígitos com cursor piscante */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-slate-800 uppercase">
                            Número:
                          </span>
                          <div className="flex gap-2">
                            {Array.from({ length: cargoAtual.digitos }).map((_, index) => {
                              const digito = digitos[index];
                              const isAtivo = digitos.length === index;
                              return (
                                <div
                                  key={index}
                                  className={`w-9 h-13 flex items-center justify-center text-2xl font-mono font-black border-2 rounded ${
                                    digito
                                      ? 'bg-white border-slate-900 text-slate-950 shadow-sm'
                                      : isAtivo
                                      ? 'bg-amber-50 border-blue-700 text-slate-950'
                                      : 'bg-slate-200/60 border-slate-300 text-slate-300'
                                  }`}
                                >
                                  {digito ? (
                                    digito
                                  ) : isAtivo && cursorVisible ? (
                                    <span className="w-3.5 h-1 bg-slate-900 mt-5" />
                                  ) : null}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Candidato Identificado */}
                        {candidatoEncontrado && (
                          <div className="bg-white p-3.5 rounded border border-slate-300 shadow-sm flex items-start justify-between gap-3 animate-fade-in">
                            <div className="space-y-1.5 flex-1 font-sans">
                              <div>
                                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                                  Nome Parlamentar:
                                </span>
                                <span className="text-base font-black text-slate-950 uppercase leading-snug">
                                  {candidatoEncontrado.nome}
                                </span>
                              </div>

                              <div>
                                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                                  Partido / Coligação:
                                </span>
                                <span className="text-xs font-bold text-slate-800">
                                  {candidatoEncontrado.partido.sigla} • {candidatoEncontrado.partido.nome}
                                </span>
                              </div>

                              {candidatoEncontrado.vice && (
                                <div className="pt-1 border-t border-slate-100">
                                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                                    Vice-Prefeito(a):
                                  </span>
                                  <span className="text-xs font-semibold text-slate-700">
                                    {candidatoEncontrado.vice}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Foto 3x4 do Candidato com Selo Oficial */}
                            <div className="w-20 h-28 bg-slate-100 border-2 border-slate-400 rounded overflow-hidden relative shadow shrink-0">
                              <img
                                src={candidatoEncontrado.fotoUrl}
                                alt={candidatoEncontrado.nome}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 text-[8px] text-white font-mono text-center py-0.5">
                                FICTÍCIO
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Número Não Encontrado */}
                        {isNumeroInvalido && (
                          <div className="bg-red-50 border-2 border-red-400 p-4 rounded text-center animate-fade-in">
                            <div className="text-lg font-display font-black text-red-700 tracking-wider">
                              NÚMERO ERRADO
                            </div>
                            <div className="text-xs font-mono font-bold text-red-900 uppercase mt-0.5">
                              VOTO NULO
                            </div>
                          </div>
                        )}

                        {digitos.length < cargoAtual.digitos && (
                          <div className="text-xs text-slate-400 font-mono italic py-4">
                            Digite os {cargoAtual.digitos} dígitos do seu candidato...
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Instruções Oficiais no Rodapé da Tela */}
                  <div className="border-t-2 border-slate-300 pt-2.5 mt-4 text-[11px] text-slate-700 font-sans space-y-1">
                    <div className="font-bold text-slate-900 uppercase">Aperte a tecla:</div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded text-[10px] font-mono">
                        VERDE (CONFIRMA)
                      </span>
                      <span>para CONFIRMAR este voto</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-orange-800 bg-orange-100 px-1.5 py-0.2 rounded text-[10px] font-mono">
                        LARANJA (CORRIGE)
                      </span>
                      <span>para REINICIAR este voto</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* TECLADO FÍSICO COM RELEVO 3D E ACESSIBILIDADE */}
            <div className="md:col-span-5 voting-keypad">
              
              <div className="text-center pb-2 border-b border-neutral-800">
              <span className="text-[10px] font-display font-bold tracking-wide text-neutral-300 uppercase block">
                  TECLADO NUMÉRICO
                </span>
                <span className="text-[8px] text-neutral-500 font-mono uppercase">
                  TECLADO DA URNA
                </span>
              </div>

              {/* Teclado 1 a 0 */}
              <div className="grid grid-cols-3 gap-2.5 my-3 px-1">
                {[
                  { n: '1' },
                  { n: '2' },
                  { n: '3' },
                  { n: '4' },
                  { n: '5', braille: '⠢' }, // Braille tátil na tecla 5
                  { n: '6' },
                  { n: '7' },
                  { n: '8' },
                  { n: '9' },
                ].map(({ n, braille }) => (
                  <button
                    key={n}
                    onClick={() => digitarNumero(n)}
                    disabled={isFinalizada}
                    className="urna-key h-11 text-white font-mono font-bold text-xl rounded-md flex items-center justify-center relative select-none disabled:opacity-40"
                  >
                    <span>{n}</span>
                    {braille && (
                      <span className="absolute bottom-1 right-1.5 text-[9px] text-neutral-400 select-none">
                        {braille}
                      </span>
                    )}
                  </button>
                ))}
                <div />
                <button
                  onClick={() => digitarNumero('0')}
                  disabled={isFinalizada}
                  className="urna-key h-11 text-white font-mono font-bold text-xl rounded-md flex items-center justify-center select-none disabled:opacity-40"
                >
                  0
                </button>
                <div />
              </div>

              {/* Botoeira Inferior: BRANCO, CORRIGE, CONFIRMA */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-neutral-800 items-end">
                <button
                  onClick={votarBranco}
                  disabled={isFinalizada || digitos.length > 0}
                  className="urna-key-branco h-11 rounded font-mono font-bold text-[10px] tracking-tight select-none disabled:opacity-30"
                >
                  BRANCO
                </button>

                <button
                  onClick={corrigir}
                  disabled={isFinalizada}
                  className="urna-key-corrige h-11 rounded font-mono font-bold text-[10px] tracking-tight select-none disabled:opacity-30"
                >
                  CORRIGE
                </button>

                {/* Confirma é mais alto e proeminente */}
                <button
                  onClick={confirmar}
                  disabled={isFinalizada}
                  className="urna-key-confirma h-14 rounded font-mono font-black text-xs tracking-wide select-none -mt-3 disabled:opacity-30"
                >
                  CONFIRMA
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Referência dos números fictícios */}
        {mostrarCola && (
          <div className="lg:col-span-4 cedula-papel p-5 rounded-lg border border-slate-200 relative font-sans text-xs animate-fade-in">
            
            <div className="border-b border-slate-200 pb-3 mb-4">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold tracking-wide">
                Referência rápida
              </span>
              <h3 className="text-base font-display font-semibold text-[#263b32] mt-1">
                Candidaturas fictícias
              </h3>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Utilize os números simulados abaixo para testar o voto na urna:
              </p>
            </div>

            <div className="space-y-4">
              <div className="candidate-reference-group">
                <span className="font-mono font-bold text-[#00223d] text-[11px] uppercase tracking-wider block border-b border-slate-200 pb-1 mb-1.5">
                  1º Voto: VEREADOR(A) (5 DÍGITOS)
                </span>
                <ul className="candidate-reference-list">
                  {CANDIDATOS.filter((candidato) => candidato.cargo === 'VEREADOR').map((candidato) => (
                    <li key={candidato.numero}>
                      <span>{candidato.nome}</span>
                      <strong>{candidato.numero} <small>{candidato.partido.sigla}</small></strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="candidate-reference-group">
                <span className="font-mono font-bold text-[#00223d] text-[11px] uppercase tracking-wider block border-b border-slate-200 pb-1 mb-1.5">
                  2º Voto: PREFEITO(A) (2 DÍGITOS)
                </span>
                <ul className="candidate-reference-list">
                  {CANDIDATOS.filter((candidato) => candidato.cargo === 'PREFEITO').map((candidato) => (
                    <li key={candidato.numero}>
                      <span>{candidato.nome}</span>
                      <strong>{candidato.numero} <small>{candidato.partido.sigla}</small></strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500 text-center">
              Dica: você também pode digitar os números direto no teclado do notebook.
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
