package br.unijorge.urna.model;

public class CandidatoProporcional extends Candidato {

    public CandidatoProporcional(String nome, String numero, Partido partido) {
        super(nome, numero, partido, Cargo.VEREADOR);
    }

    @Override
    public String getDetalhes() {
        return "";
    }
}
