import React from 'react';
import { BarChart3, FileText, ShieldCheck, Vote } from 'lucide-react';

interface NavbarProps {
  abaAtiva: 'urna' | 'apuracao' | 'educativo';
  setAbaAtiva: (aba: 'urna' | 'apuracao' | 'educativo') => void;
  totalVotos: number;
  onAbrirBoletim: () => void;
}

const navigation = [
  { id: 'urna', label: 'Simulador', icon: Vote },
  { id: 'apuracao', label: 'Apuração', icon: BarChart3 },
  { id: 'educativo', label: 'Aprenda', icon: ShieldCheck },
] as const;

export const Navbar: React.FC<NavbarProps> = ({ abaAtiva, setAbaAtiva, totalVotos, onAbrirBoletim }) => (
  <header className="site-header">
    <div className="site-header__main">
      <a className="brand" href="#inicio" onClick={(event) => event.preventDefault()} aria-label="Urna Cidadã, início">
        <span className="brand__mark" aria-hidden="true">uc</span>
        <span className="brand__text">
          <strong>Urna Cidadã</strong>
          <small>Laboratório cívico</small>
        </span>
      </a>

      <div className="site-header__meta">
        <span className="status-dot" />
        Simulação educativa
      </div>
    </div>

    <div className="site-header__nav-wrap">
      <nav className="site-nav" aria-label="Navegação principal">
        {navigation.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setAbaAtiva(id)}
            className={`site-nav__item ${abaAtiva === id ? 'is-active' : ''}`}
            aria-current={abaAtiva === id ? 'page' : undefined}
          >
            <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
            <span>{label}</span>
            {id === 'apuracao' && totalVotos > 0 && <span className="site-nav__count">{totalVotos}</span>}
          </button>
        ))}
      </nav>
      <button type="button" onClick={onAbrirBoletim} className="button button--quiet site-header__report">
        <FileText aria-hidden="true" size={16} strokeWidth={1.8} />
        <span>Boletim simulado</span>
      </button>
    </div>
  </header>
);
