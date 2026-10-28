package br.unijorge.urna.repository;

import br.unijorge.urna.model.Voto;

import java.util.List;

public interface VotoRepository {
    void salvar(Voto voto) throws Exception;

    List<Voto> listar() throws Exception;

    String getDescricao();
}
