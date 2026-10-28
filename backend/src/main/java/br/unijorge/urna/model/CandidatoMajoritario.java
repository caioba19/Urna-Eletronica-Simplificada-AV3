package br.unijorge.urna.model;

public class CandidatoMajoritario extends Candidato {
    private final String vice;

    public CandidatoMajoritario(String nome, String numero, Partido partido, String vice) {
        super(nome, numero, partido, Cargo.PREFEITO);
        this.vice = vice;
    }

    public String getVice() {
        return vice;
    }

    @Override
    public String getDetalhes() {
        return "Vice: " + vice;
    }
}
