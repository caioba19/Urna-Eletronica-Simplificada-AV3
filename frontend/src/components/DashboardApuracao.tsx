import React, { useState } from 'react';
import { BarChart3, CheckCircle2, FileText, RotateCcw, Shuffle } from 'lucide-react';
import { ResultadoCargo, TipoCargo, Voto } from '../types';
import { CONFIG_CARGOS, CANDIDATOS } from '../data/candidatos';

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
    const candidatosContagem = CANDIDATOS.filter((c) => c.cargo === cargo).map((candidato) => {
      const contagem = votosCargo.filter((v) => v.tipo === 'VALIDO' && v.numero === candidato.numero).length;
      return {
        candidato,
        votos: contagem,
        porcentagemValidos: validos > 0 ? Number(((contagem / validos) * 100).toFixed(2)) : 0,
      };
    }).sort((a, b) => b.votos - a.votos);

    return { cargo, totalVotos: total, brancos, nulos, validos, candidatos: candidatosContagem };
  };

  const resultado = calcularResultado(cargoVisualizado);
  const metricas = [
    { label: 'Votos registrados', valor: resultado.totalVotos, detalhe: `para ${cargoVisualizado.toLowerCase()}`, tom: '' },
    { label: 'Votos válidos', valor: resultado.validos, detalhe: resultado.totalVotos ? `${((resultado.validos / resultado.totalVotos) * 100).toFixed(1)}% do total` : '0% do total', tom: 'summary-card--valid' },
    { label: 'Em branco', valor: resultado.brancos, detalhe: resultado.totalVotos ? `${((resultado.brancos / resultado.totalVotos) * 100).toFixed(1)}% do total` : '0% do total', tom: '' },
    { label: 'Nulos', valor: resultado.nulos, detalhe: resultado.totalVotos ? `${((resultado.nulos / resultado.totalVotos) * 100).toFixed(1)}% do total` : '0% do total', tom: 'summary-card--null' },
  ];

  return (
    <section className="results-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PAINEL DE APRENDIZAGEM</p>
          <h1>Apuração da simulação</h1>
          <p className="page-heading__description">Acompanhe como cada voto altera a distribuição de resultados.</p>
        </div>
        <div className="results-actions">
          <button type="button" onClick={() => onAdicionarVotosAleatorios(10)} className="button">
            <Shuffle size={15} aria-hidden="true" /> Gerar 10 votos
          </button>
          <button type="button" onClick={onAbrirBoletim} className="button button--primary">
            <FileText size={15} aria-hidden="true" /> Ver boletim
          </button>
          <button type="button" onClick={() => window.confirm('Apagar todos os votos desta simulação?') && onZerarVotos()} className="button button--danger-quiet" aria-label="Zerar os votos" title="Zerar votos">
            <RotateCcw size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="results-context">
        <span><span className="results-context__dot" /> Cenário fictício</span>
        <span>Salvador, BA</span>
        <span>Dados armazenados neste navegador</span>
      </div>

      <div className="results-toolbar">
        <div>
          <p className="field-label">Cargo</p>
          <div className="segmented-control" role="group" aria-label="Selecionar cargo">
            {CONFIG_CARGOS.map((cargo) => (
              <button type="button" key={cargo.id} onClick={() => setCargoVisualizado(cargo.id)} className={cargoVisualizado === cargo.id ? 'is-selected' : ''} aria-pressed={cargoVisualizado === cargo.id}>
                {cargo.nome}
              </button>
            ))}
          </div>
        </div>
        <p className="results-toolbar__note">Os números são apenas ilustrativos.</p>
      </div>

      <div className="summary-grid">
        {metricas.map((metrica) => (
          <article className={`summary-card ${metrica.tom}`} key={metrica.label}>
            <span className="summary-card__label">{metrica.label}</span>
            <strong>{metrica.valor}</strong>
            <span className="summary-card__detail">{metrica.detalhe}</span>
          </article>
        ))}
      </div>

      <section className="results-panel" aria-labelledby="candidate-results-title">
        <div className="results-panel__heading">
          <div>
            <p className="eyebrow">RESULTADO POR CANDIDATURA</p>
            <h2 id="candidate-results-title">Votos para {cargoVisualizado.toLowerCase()}</h2>
          </div>
          <span>{resultado.validos} {resultado.validos === 1 ? 'voto válido' : 'votos válidos'}</span>
        </div>

        {resultado.totalVotos === 0 ? (
          <div className="results-empty">
            <BarChart3 size={22} strokeWidth={1.5} aria-hidden="true" />
            <strong>A apuração começa com os primeiros votos</strong>
            <span>Use o simulador ou gere votos de exemplo para explorar o painel.</span>
          </div>
        ) : (
          <div className="candidate-list">
            {resultado.candidatos.map((item, index) => (
              <article key={item.candidato.numero} className="candidate-row">
                <span className="candidate-row__rank">{String(index + 1).padStart(2, '0')}</span>
                <img src={item.candidato.fotoUrl} alt="" className="candidate-row__photo" />
                <div className="candidate-row__identity">
                  <div className="candidate-row__name-line">
                    <strong>{item.candidato.nome}</strong>
                    <span className="candidate-row__number">{item.candidato.numero}</span>
                    {index === 0 && item.votos > 0 && <span className="candidate-row__leader">À frente</span>}
                  </div>
                  <span>{item.candidato.partido.sigla} · {item.candidato.partido.nome}{item.candidato.vice ? ` · Vice ${item.candidato.vice}` : ''}</span>
                  <div className="candidate-row__track" aria-label={`${item.porcentagemValidos.toFixed(1)}% dos votos válidos`}>
                    <div style={{ width: `${item.porcentagemValidos}%` }} />
                  </div>
                </div>
                <div className="candidate-row__result">
                  <strong>{item.porcentagemValidos.toFixed(1)}%</strong>
                  <span>{item.votos} {item.votos === 1 ? 'voto' : 'votos'}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <p className="results-footnote"><CheckCircle2 size={14} aria-hidden="true" /> Esta página demonstra contagem e percentuais; não indica resultado eleitoral real.</p>
    </section>
  );
};
