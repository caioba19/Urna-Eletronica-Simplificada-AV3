package br.unijorge.urna.service;

import br.unijorge.urna.model.Apuracao;
import br.unijorge.urna.model.Candidato;
import br.unijorge.urna.model.Cargo;
import br.unijorge.urna.model.TipoVoto;
import br.unijorge.urna.model.Voto;
import br.unijorge.urna.repository.VotoRepository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.CompletableFuture;

public class UrnaService {
    private final VotoRepository repository;
    private final CatalogoCandidatos catalogo;
    private final ExecutorService executor = Executors.newSingleThreadExecutor(r -> {
        Thread t = new Thread(r, "gravacao-votos");
        t.setDaemon(true);
        return t;
    });

    public UrnaService(VotoRepository repository, CatalogoCandidatos catalogo) {
        this.repository = repository;
        this.catalogo = catalogo;
    }

    public Optional<Candidato> buscarCandidato(Cargo cargo, String numero) {
        return catalogo.buscar(cargo, numero);
    }

    public CompletableFuture<Void> registrarValido(Cargo cargo, String numero) {
        return gravar(Voto.valido(cargo, numero));
    }

    public CompletableFuture<Void> registrarBranco(Cargo cargo) {
        return gravar(Voto.branco(cargo));
    }

    public CompletableFuture<Void> registrarNulo(Cargo cargo) {
        return gravar(Voto.nulo(cargo));
    }

    private CompletableFuture<Void> gravar(Voto voto) {
        return CompletableFuture.runAsync(() -> {
            try {
                repository.salvar(voto);
            } catch (Exception e) {
                throw new java.util.concurrent.CompletionException(e);
            }
        }, executor);
    }

    public List<Apuracao> apurar() throws Exception {
        List<Voto> votos = aguardarGravacoes();
        List<Apuracao> resultado = new ArrayList<>();

        for (Cargo cargo : Cargo.values()) {
            Map<Candidato, Long> porCandidato = new LinkedHashMap<>();
            catalogo.listar(cargo).forEach(c -> porCandidato.put(c, 0L));
            long brancos = 0;
            long nulos = 0;

            for (Voto voto : votos) {
                if (voto.getCargo() != cargo) {
                    continue;
                }
                if (voto.getTipo() == TipoVoto.BRANCO) {
                    brancos++;
                } else if (voto.getTipo() == TipoVoto.NULO) {
                    nulos++;
                } else {
                    Optional<Candidato> candidato = catalogo.buscar(cargo, voto.getNumero());
                    if (candidato.isPresent()) {
                        porCandidato.merge(candidato.get(), 1L, Long::sum);
                    } else {
                        nulos++;
                    }
                }
            }
            resultado.add(new Apuracao(cargo, porCandidato, brancos, nulos));
        }
        return resultado;
    }

    private List<Voto> aguardarGravacoes() throws Exception {
        return executor.submit(repository::listar).get();
    }

    public String getFonteDados() {
        return repository.getDescricao();
    }
}
