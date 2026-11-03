package br.unijorge.urna.service;

import br.unijorge.urna.model.Apuracao;
import br.unijorge.urna.model.Cargo;
import br.unijorge.urna.repository.MemoriaVotoRepository;
import br.unijorge.urna.repository.VotoRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.concurrent.CompletionException;

import static org.junit.jupiter.api.Assertions.*;

class UrnaServiceTest {

    @Test
    void apuraVotosValidosBrancosENulosPorCargo() throws Exception {
        UrnaService service = new UrnaService(new MemoriaVotoRepository(), new CatalogoCandidatos());

        service.registrarValido(Cargo.VEREADOR, "11111").join();
        service.registrarValido(Cargo.VEREADOR, "99999").join(); // número inexistente é contado como nulo
        service.registrarBranco(Cargo.VEREADOR).join();
        service.registrarValido(Cargo.PREFEITO, "22").join();

        List<Apuracao> resultado = service.apurar();
        Apuracao vereador = resultado.stream().filter(a -> a.cargo() == Cargo.VEREADOR).findFirst().orElseThrow();
        Apuracao prefeito = resultado.stream().filter(a -> a.cargo() == Cargo.PREFEITO).findFirst().orElseThrow();

        assertEquals(1, vereador.totalValidos());
        assertEquals(1, vereador.brancos());
        assertEquals(1, vereador.nulos());
        assertEquals(3, vereador.total());
        assertEquals(1, prefeito.totalValidos());
        assertEquals(1, prefeito.total());
    }

    @Test
    void falhaDePersistenciaEDevolvidaAoChamador() {
        VotoRepository repository = new VotoRepository() {
            @Override
            public void salvar(br.unijorge.urna.model.Voto voto) throws Exception {
                throw new Exception("armazenamento indisponível");
            }

            @Override
            public List<br.unijorge.urna.model.Voto> listar() {
                return List.of();
            }

            @Override
            public String getDescricao() {
                return "repositório de teste";
            }
        };
        UrnaService service = new UrnaService(repository, new CatalogoCandidatos());

        CompletionException erro = assertThrows(CompletionException.class,
                () -> service.registrarValido(Cargo.PREFEITO, "11").join());

        assertTrue(erro.getCause().getMessage().contains("armazenamento indisponível"));
    }
}
