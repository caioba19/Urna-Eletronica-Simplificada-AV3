import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UrnaWeb } from './components/UrnaWeb';
import { DashboardApuracao } from './components/DashboardApuracao';
import { ModuloEducativo } from './components/ModuloEducativo';
import { BoletimUrnaModal } from './components/BoletimUrnaModal';
import { Voto } from './types';
import { CANDIDATOS } from './data/candidatos';

const STORAGE_KEY = 'urna_cidada_votos_v2';
const DEMO_KEY = 'urna_cidada_demo_incluida';

export function App() {
  const [abaAtiva, setAbaAtiva] = useState<'urna' | 'apuracao' | 'educativo'>('urna');
  const [mostrarBoletim, setMostrarBoletim] = useState<boolean>(false);
  const [incluiDadosDemo, setIncluiDadosDemo] = useState<boolean>(
    () => localStorage.getItem(DEMO_KEY) !== 'false'
  );

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
    setIncluiDadosDemo(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(DEMO_KEY, 'false');
  };

  const adicionarVotosAleatorios = (quantidade: number) => {
    setIncluiDadosDemo(true);
    localStorage.setItem(DEMO_KEY, 'true');
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
    <div className="app-shell">
      <div>
        <Navbar
          abaAtiva={abaAtiva}
          setAbaAtiva={setAbaAtiva}
          totalVotos={votos.length}
          onAbrirBoletim={() => setMostrarBoletim(true)}
        />

        <div role="note" className="simulation-note">
          <span className="simulation-note__label">Ambiente de demonstração</span>
          <span>Candidatos e resultados fictícios · dados salvos neste navegador</span>
          {incluiDadosDemo && <span className="simulation-note__demo">Inclui votos de exemplo</span>}
        </div>

        <main className="app-main">
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

      {/* Identificação do projeto */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <p className="site-footer__brand">Urna Cidadã <span>·</span> Projeto educativo UNIJORGE</p>
          <p>
            Simulação cívica para fins de aprendizagem. Não representa uma eleição oficial.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
