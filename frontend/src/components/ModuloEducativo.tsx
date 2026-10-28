import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, Search, Cpu, Eye, ArrowRight, FileCheck2, Binary, Lock } from 'lucide-react';

interface CasoAnalise {
  id: number;
  titulo: string;
  tipo: 'VÍDEO' | 'ÁUDIO';
  descricao: string;
  conteudoFalso: string;
  veredito: 'DEEPFAKE DETECTADO';
  pistasForense: { ponto: string; explicacao: string }[];
}

const CASOS_FORENSES: CasoAnalise[] = [
  {
    id: 1,
    titulo: 'Vídeo Viral no TikTok: Candidato a Prefeito supostamente admitindo fraude',
    tipo: 'VÍDEO',
    descricao: 'Vídeo curto de 15 segundos encaminhado em grupos de WhatsApp afirmando que o candidato teria confessado um crime em reunião fechada.',
    conteudoFalso: 'O candidato fala sem piscar os olhos e com iluminação facial inconsistente com o ambiente ao fundo.',
    veredito: 'DEEPFAKE DETECTADO',
    pistasForense: [
      {
        ponto: 'Dessincronia Labial & Fonemas Bilabiais',
        explicacao: 'O fechamento dos lábios não coincide fisicamente com os sons de "b", "p" e "m", evidenciando remapeamento labial por modelo gerativo.',
      },
      {
        ponto: 'Reflexo Estático da Córnea',
        explicacao: 'O brilho nos olhos permanece imóvel mesmo com a cabeça em rotação — falha clássica de renderização de luz em redes neurais.',
      },
      {
        ponto: 'Bordas de Interpolação na Mandíbula',
        explicacao: 'Micro-borrões e perda de textura de poros na transição entre o queixo e o colarinho (artefato típico de face-swap).',
      },
    ],
  },
  {
    id: 2,
    titulo: 'Áudio no WhatsApp: Suposto mesário afirmando que a urna "anulou votos"',
    tipo: 'ÁUDIO',
    descricao: 'Gravação sem identificação de autoria, com tom alarmista, distribuída às vésperas da votação com etiqueta "Frequentemente encaminhada".',
    conteudoFalso: 'Voz mecânica alegando que ao apertar a tecla Confirma a tela não gravava o voto digitado.',
    veredito: 'DEEPFAKE DETECTADO',
    pistasForense: [
      {
        ponto: 'Espectrograma de Áudio Sintetizado',
        explicacao: 'Ausência de ruído de fundo natural, ar nos pulmões e micro-pausas respiratórias humanas. Onda sonora perfeitamente quantizada (TTS).',
      },
      {
        ponto: 'Cadência Monótona e Não Natural',
        explicacao: 'Curva de entonação (pitch) robótica em finais de orações interrogativas.',
      },
      {
        ponto: 'Inconsistência Técnica Crítica',
        explicacao: 'A urna grava os votos no Registro Digital do Voto (RDV) de forma embaralhada e emite o Boletim de Urna (BU) impresso auditável.',
      },
    ],
  },
];

export const ModuloEducativo: React.FC = () => {
  const [casoAtivo, setCasoAtivo] = useState<number>(1);
  const [analiseRevelada, setAnaliseRevelada] = useState<boolean>(false);
  const [camadaAtiva, setCamadaAtiva] = useState<number>(0);

  const camadasSeguranca = [
    {
      titulo: '1. Hardware Air-Gapped (Isolamento Total)',
      resumo: 'Sem placa de rede, sem Wi-Fi, sem Bluetooth, sem conexão externa.',
      detalhe: 'A urna eletrônica brasileira é fisicamente isolada de qualquer rede. Não existe placa de rede, modem, antena sem fio nem porta de comunicação com a internet. Nenhum ataque cibernético remoto pode atingir o terminal.',
      icone: Cpu,
      tag: 'FISICAMENTE ISOLADA',
    },
    {
      titulo: '2. Módulo de Segurança Criptográfico (HSM)',
      resumo: 'Chaves criptográficas assimétricas gravadas em chip de hardware.',
      detalhe: 'Cada urna possui um módulo criptográfico de hardware homologado pelo TSE. Cada arquivo e biblioteca de software precisa ser assinado com chaves criptográficas de 2048+ bits antes de ser executado pelo sistema operacional.',
      icone: Lock,
      tag: 'CHAVE ASSIMÉTRICA',
    },
    {
      titulo: '3. Assinatura Digital e Cerimônia Pública de Lacração',
      resumo: 'Auditoria aberta por universidades, partidos, PF e OAB.',
      detalhe: 'Meses antes da eleição, o código-fonte fica aberto na sede do TSE para testes públicos de segurança (TPS) por especialistas e universidades federais. O software final é assinado digitalmente pelas autoridades e lacrado em cofre.',
      icone: FileCheck2,
      tag: 'CÓDIGO AUDITADO',
    },
    {
      titulo: '4. Boletim de Urna (BU) e Auditoria Descentralizada',
      resumo: 'Impressão física instantânea na presença dos fiscais e eleitores.',
      detalhe: 'Às 17h em ponto, a urna encerra a votação e imprime instantaneamente o Boletim de Urna em papel térmico com QR Code e hash de integridade, antes de qualquer transmissão. O BU é colado na porta da seção eleitoral.',
      icone: CheckCircle2,
      tag: 'IMPRESSÃO PÚBLICA',
    },
  ];

  const casoSelecionado = CASOS_FORENSES.find((c) => c.id === casoAtivo) || CASOS_FORENSES[0];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 font-sans text-slate-800 space-y-8 animate-fade-in">
      
      {/* 1. DOSSIÊ HEADER: IDENTIDADE FATO OU BOATO DO TSE */}
      <div className="bg-white border border-slate-300 rounded p-6 shadow-sm border-l-4 border-l-[#002b49]">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#002b49] text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
              TSE • FATO OU BOATO
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              PROGRAMA PERMANENTE DE ENFRENTAMENTO À DESINFORMAÇÃO
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-500">
            OFICINA DE EXTENSÃO UNIJORGE • SALVADOR/BA
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-black text-[#00223d] tracking-tight">
          Dossiê Forense: Criptografia da Urna & Verificação de IA
        </h1>

        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl mt-2">
          Guia investigativo desenvolvido para jovens estudantes do Ensino Médio, demonstrando os princípios 
          de Ciência da Computação que garantem a inviolabilidade do sistema eleitoral brasileiro e as técnicas 
          periciais para desmascarar áudios e vídeos forjados por inteligência artificial generativa.
        </p>
      </div>

      {/* 2. ARQUITETURA DE SEGURANÇA DA URNA EM 4 NÍVEIS */}
      <div className="bg-white border border-slate-300 rounded shadow-sm overflow-hidden">
        <div className="bg-[#002b49] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Binary className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-display font-black uppercase tracking-wider">
              Níveis de Blindagem Criptográfica da Urna Eletrônica
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-300">ARQUITETURA EM PROFUNDIDADE</span>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {camadasSeguranca.map((camada, idx) => {
              const Icone = camada.icone;
              const isAtiva = camadaAtiva === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCamadaAtiva(idx)}
                  className={`p-3.5 rounded text-left transition-all border ${
                    isAtiva
                      ? 'bg-[#002b49] text-white border-[#002b49] shadow-sm ring-1 ring-[#002b49]'
                      : 'bg-[#f8fafc] border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icone className={`w-4 h-4 ${isAtiva ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className="text-[9px] font-mono font-bold opacity-75">NÍVEL 0{idx + 1}</span>
                  </div>
                  <div className="font-display font-bold text-xs leading-snug">{camada.titulo}</div>
                  <span className={`inline-block mt-2 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    isAtiva ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {camada.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Ficha Explicativa do Nível Selecionado */}
          <div className="bg-[#f8fafc] border border-slate-300 p-5 rounded flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-10 h-10 rounded bg-[#002b49] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-display font-black text-[#00223d]">
                {camadasSeguranca[camadaAtiva].titulo}
              </h3>
              <p className="text-xs font-mono font-bold text-emerald-800 my-1">
                {camadasSeguranca[camadaAtiva].resumo}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-sans mt-2">
                {camadasSeguranca[camadaAtiva].detalhe}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LABORATÓRIO FORENSE DE DEEPFAKES (ATIVIDADE INVESTIGATIVA) */}
      <div className="bg-white border border-slate-300 rounded shadow-sm overflow-hidden">
        <div className="bg-[#00223d] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-display font-black uppercase tracking-wider">
              Laboratório Pericial: Detecção Forense de Deepfakes
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-300">ANÁLISE DE INCIDENTES REAIS</span>
        </div>

        <div className="p-6 space-y-5">
          {/* Seletor de Casos */}
          <div className="flex gap-2">
            {CASOS_FORENSES.map((caso) => (
              <button
                key={caso.id}
                onClick={() => {
                  setCasoAtivo(caso.id);
                  setAnaliseRevelada(false);
                }}
                className={`px-4 py-2 rounded text-xs font-mono font-bold transition border ${
                  casoAtivo === caso.id
                    ? 'bg-[#002b49] text-white border-[#002b49]'
                    : 'bg-[#f8fafc] text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                CASO #{caso.id} • {caso.tipo}
              </button>
            ))}
          </div>

          {/* Ficha Pericial do Caso */}
          <div className="border border-slate-300 rounded bg-[#f8fafc] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-300 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                  INCIDENTE ELEITORAL EM EXAME
                </span>
                <h3 className="text-base font-display font-black text-slate-900 mt-0.5">
                  {casoSelecionado.titulo}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#002b49] text-white self-start">
                MÍDIA: {casoSelecionado.tipo}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              <b className="text-slate-900">Contexto da Disseminação: </b>
              {casoSelecionado.descricao}
            </p>

            {/* Simulação da Mídia em Foco */}
            <div className="bg-white p-4 rounded border border-slate-300 font-mono text-xs text-slate-800 italic border-l-4 border-l-amber-500">
              "{casoSelecionado.conteudoFalso}"
            </div>

            {/* Ação do Perito / Aluno */}
            <div className="pt-2">
              {!analiseRevelada ? (
                <button
                  onClick={() => setAnaliseRevelada(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#002b49] hover:bg-[#001f35] text-amber-300 font-mono font-bold text-xs rounded transition shadow-sm"
                >
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>Executar Perícia Forense Digital</span>
                </button>
              ) : (
                <div className="space-y-3 animate-fade-in pt-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-800 text-white font-mono font-bold text-xs px-2.5 py-1 rounded">
                      VEREDITO PERICIAL: {casoSelecionado.veredito}
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded border border-red-300 space-y-2">
                    <span className="text-xs font-display font-black text-slate-900 block uppercase">
                      Artefatos e Evidências Matemáticas de IA:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                      {casoSelecionado.pistasForense.map((pista, idx) => (
                        <div key={idx} className="bg-red-50/60 p-3 rounded border border-red-200">
                          <span className="text-[11px] font-mono font-bold text-red-900 block mb-1">
                            {pista.ponto}
                          </span>
                          <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                            {pista.explicacao}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
