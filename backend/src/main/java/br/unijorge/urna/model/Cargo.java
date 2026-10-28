package br.unijorge.urna.model;

public enum Cargo {
    VEREADOR("VEREADOR", 5),
    PREFEITO("PREFEITO", 2);

    private final String nome;
    private final int digitos;

    Cargo(String nome, int digitos) {
        this.nome = nome;
        this.digitos = digitos;
    }

    public String getNome() {
        return nome;
    }

    public int getDigitos() {
        return digitos;
    }
}
