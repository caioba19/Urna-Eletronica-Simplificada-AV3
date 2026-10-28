package br.unijorge.urna.repository;

import java.io.File;

public final class RepositorioFactory {
    private static final String ARQUIVO_PADRAO = "firebase-key.json";
    private static final String VARIAVEL = "FIREBASE_CREDENTIALS";

    private RepositorioFactory() {
    }

    public static VotoRepository criar() {
        String env = System.getenv(VARIAVEL);
        String caminho = env != null && !env.isBlank() ? env : ARQUIVO_PADRAO;

        if (!new File(caminho).exists()) {
            System.err.println("Credenciais do Firebase não encontradas em '" + caminho + "'. Usando memória local.");
            return new MemoriaVotoRepository();
        }

        try {
            return new FirestoreVotoRepository(caminho);
        } catch (Exception e) {
            System.err.println("Falha ao conectar no Firebase: " + e.getMessage() + ". Usando memória local.");
            return new MemoriaVotoRepository();
        }
    }
}
