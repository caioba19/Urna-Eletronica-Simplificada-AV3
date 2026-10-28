package br.unijorge.urna.model;

public abstract class Candidato {
    private final String nome;
    private final String numero;
    private final Partido partido;
    private final Cargo cargo;

    protected Candidato(String nome, String numero, Partido partido, Cargo cargo) {
        this.nome = nome;
        this.numero = numero;
        this.partido = partido;
        this.cargo = cargo;
    }

    public String getNome() {
        return nome;
    }

    public String getNumero() {
        return numero;
    }

    public Partido getPartido() {
        return partido;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public abstract String getDetalhes();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Candidato that = (Candidato) o;
        return java.util.Objects.equals(numero, that.numero) && cargo == that.cargo;
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(numero, cargo);
    }

    @Override
    public String toString() {
        return nome + " (" + numero + " - " + partido.sigla() + ")";
    }
}
