package br.unijorge.urna.model;

import java.util.Date;

public class Voto {
    private final Cargo cargo;
    private final String numero;
    private final TipoVoto tipo;
    private final Date data;

    public Voto(Cargo cargo, String numero, TipoVoto tipo, Date data) {
        this.cargo = cargo;
        this.numero = numero;
        this.tipo = tipo;
        this.data = data;
    }

    public static Voto valido(Cargo cargo, String numero) {
        return new Voto(cargo, numero, TipoVoto.VALIDO, new Date());
    }

    public static Voto branco(Cargo cargo) {
        return new Voto(cargo, "", TipoVoto.BRANCO, new Date());
    }

    public static Voto nulo(Cargo cargo) {
        return new Voto(cargo, "", TipoVoto.NULO, new Date());
    }

    public Cargo getCargo() {
        return cargo;
    }

    public String getNumero() {
        return numero;
    }

    public TipoVoto getTipo() {
        return tipo;
    }

    public Date getData() {
        return data;
    }
}
