package br.unijorge.urna.repository;

import br.unijorge.urna.model.Voto;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MemoriaVotoRepository implements VotoRepository {
    private final List<Voto> votos = Collections.synchronizedList(new ArrayList<>());

    @Override
    public void salvar(Voto voto) {
        votos.add(voto);
    }

    @Override
    public List<Voto> listar() {
        synchronized (votos) {
            return new ArrayList<>(votos);
        }
    }

    @Override
    public String getDescricao() {
        return "Memória local (sem Firebase)";
    }
}
