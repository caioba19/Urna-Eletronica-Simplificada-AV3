package br.unijorge.urna.model;

import java.util.Map;

public record Apuracao(Cargo cargo, Map<Candidato, Long> votosPorCandidato, long brancos, long nulos) {

    public long totalValidos() {
        return votosPorCandidato.values().stream().mapToLong(Long::longValue).sum();
    }

    public long total() {
        return totalValidos() + brancos + nulos;
    }
}
