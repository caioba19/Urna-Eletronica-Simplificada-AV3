package br.unijorge.urna.service;

import br.unijorge.urna.model.Candidato;
import br.unijorge.urna.model.CandidatoMajoritario;
import br.unijorge.urna.model.CandidatoProporcional;
import br.unijorge.urna.model.Cargo;
import br.unijorge.urna.model.Partido;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CatalogoCandidatos {
    private static final Partido PAD = new Partido("PAD", "Partido Aurora Digital");
    private static final Partido PHV = new Partido("PHV", "Partido Horizonte Verde");
    private static final Partido PMA = new Partido("PMA", "Partido Maré Alta");

    private final List<Candidato> candidatos = new ArrayList<>();

    public CatalogoCandidatos() {
        candidatos.add(new CandidatoProporcional("Ana Beatriz Luz", "11111", PAD));
        candidatos.add(new CandidatoProporcional("Carlos Vento Sul", "11222", PAD));
        candidatos.add(new CandidatoProporcional("Marina Ribeiro Costa", "22333", PHV));
        candidatos.add(new CandidatoProporcional("Joaquim da Ladeira", "22444", PHV));
        candidatos.add(new CandidatoProporcional("Tereza Farol", "33555", PMA));
        candidatos.add(new CandidatoProporcional("Davi Recife Novo", "33666", PMA));

        candidatos.add(new CandidatoMajoritario("Helena Ventura", "11", PAD, "Rui Antunes"));
        candidatos.add(new CandidatoMajoritario("Otávio Campos", "22", PHV, "Lia Fontes"));
        candidatos.add(new CandidatoMajoritario("Beatriz Marés", "33", PMA, "Nilo Batista"));
    }

    public Optional<Candidato> buscar(Cargo cargo, String numero) {
        return candidatos.stream()
                .filter(c -> c.getCargo() == cargo && c.getNumero().equals(numero))
                .findFirst();
    }

    public List<Candidato> listar(Cargo cargo) {
        return candidatos.stream().filter(c -> c.getCargo() == cargo).toList();
    }
}
