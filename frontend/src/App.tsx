import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UrnaWeb } from './components/UrnaWeb';
import { DashboardApuracao } from './components/DashboardApuracao';
import { ModuloEducativo } from './components/ModuloEducativo';
import { BoletimUrnaModal } from './components/BoletimUrnaModal';
import { Voto } from './types';
import { CANDIDATOS } from './data/candidatos';

const STORAGE_KEY = 'urna_cidada_votos_v2';

export function App() {
  const [abaAtiva, setAbaAtiva] = useState<'urna' | 'apuracao' | 'educativo'>('urna');
  const [mostrarBoletim, setMostrarBoletim] = useState<boolean>(false);

  const [votos, setVotos] = useState<Voto[]>(() => {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch {
        return [];
      }
    }
    // Votos de exemplo prévios para visualização do painel
    return [
      { cargo: 'VEREADOR', numero: '11111', tipo: 'VALIDO', data: new Date().toISOString() },
      { cargo: 'VEREADOR', numero: '22333', tipo: 'VALIDO', data: new Date().toISOString() },
      { cargo: 'VEREADOR', numero: '33555', tipo: 'VALIDO', data: new Date().toISOString() },
      { cargo: 'VEREADOR', numero: '11111', tipo: 'VALIDO', data: new Date().toISOString() },
      { cargo: 'PREFEITO', numero: '11', tipo: 'VALIDO', data: new Date().toISOString() },
      { cargo: 'PREFEITO', numero: '22', tipo: 'VALIDO', data: new Date().toISOString() },
      { cargo: 'PREFEITO', numero: '11', tipo: 'VALIDO', data: new Date().toISOString() },
      { cargo: 'PREFEITO', numero: '33', tipo: 'VALIDO', data: new Date().toISOString() },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votos));
  }, [votos]);

  const registrarVotos = (novosVotos: Voto[]) => {
    setVotos((prev) => [...prev, ...novosVotos]);
  };

  const zerarVotos = () => {
    setVotos([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const adicionarVotosAleatorios = (quantidade: number) => {
    const novos: Voto[] = [];
    const vereadores = CANDIDATOS.filter((c) => c.cargo === 'VEREADOR');
    const prefeitos = CANDIDATOS.filter((c) => c.cargo === 'PREFEITO');

    for (let i = 0; i < quantidade; i++) {
      // Voto vereador
      const sortV = Math.random();
      if (sortV < 0.08) {
        novos.push({ cargo: 'VEREADOR', numero: '', tipo: 'BRANCO', data: new Date().toISOString() });
      } else if (sortV < 0.12) {
        novos.push({ cargo: 'VEREADOR', numero: '99999', tipo: 'NULO', data: new Date().toISOString() });
      } else {
        const c = vereadores[Math.floor(Math.random() * vereadores.length)];
        novos.push({ cargo: 'VEREADOR', numero: c.numero, tipo: 'VALIDO', data: new Date().toISOString() });
      }

      // Voto prefeito
      const sortP = Math.random();
      if (sortP < 0.06) {
        novos.push({ cargo: 'PREFEITO', numero: '', tipo: 'BRANCO', data: new Date().toISOString() });
      } else if (sortP < 0.1) {
        novos.push({ cargo: 'PREFEITO', numero: '99', tipo: 'NULO', data: new Date().toISOString() });
      } else {
        const c = prefeitos[Math.floor(Math.random() * prefeitos.length)];
        novos.push({ cargo: 'PREFEITO', numero: c.numero, tipo: 'VALIDO', data: new Date().toISOString() });
      }
    }

    setVotos((prev) => [...prev, ...novos]);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-900">
      <div>
        <Navbar
          abaAtiva={abaAtiva}
          setAbaAtiva={setAbaAtiva}
          totalVotos={votos.length}
          onAbrirBoletim={() => setMostrarBoletim(true)}
        />

        <main className="py-6">
          {abaAtiva === 'urna' && (
            <UrnaWeb
              onRegistrarVotos={registrarVotos}
              onAbrirBoletim={() => setMostrarBoletim(true)}
            />
          )}

          {abaAtiva === 'apuracao' && (
            <DashboardApuracao
              votos={votos}
              onZerarVotos={zerarVotos}
              onAdicionarVotosAleatorios={adicionarVotosAleatorios}
              onAbrirBoletim={() => setMostrarBoletim(true)}
            />
          )}

          {abaAtiva === 'educativo' && <ModuloEducativo />}
        </main>
      </div>

      {/* Modal do Boletim de Urna (BU) */}
      {mostrarBoletim && (
        <BoletimUrnaModal
          votos={votos}
          onFechar={() => setMostrarBoletim(false)}
        />
      )}

      {/* Rodapé Oficial da Aplicação */}
      <footer className="bg-[#0b2545] text-slate-300 py-6 text-center text-xs border-t border-slate-700 mt-12">
        <div className="max-w-5xl mx-auto px-4 space-y-1">
          <p className="font-bold text-white text-sm">
            Urna Cidadã – Projeto de Extensão Curricular (Ciência da Computação – UNIJORGE)
          </p>
          <p className="text-slate-400 text-xs">
            Salvador – BA • Eleições Gerais 2026 • Sistema de Simulação Eleitoral e Literacia Digital
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
