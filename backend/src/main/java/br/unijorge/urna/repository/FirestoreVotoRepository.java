package br.unijorge.urna.repository;

import br.unijorge.urna.model.Cargo;
import br.unijorge.urna.model.TipoVoto;
import br.unijorge.urna.model.Voto;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FirestoreVotoRepository implements VotoRepository {
    private static final String COLECAO = "votos";

    private final Firestore db;

    public FirestoreVotoRepository(String caminhoCredenciais) throws IOException {
        try (FileInputStream stream = new FileInputStream(caminhoCredenciais)) {
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(stream))
                        .build();
                FirebaseApp.initializeApp(options);
            }
        }
        this.db = FirestoreClient.getFirestore();
    }

    @Override
    public void salvar(Voto voto) throws Exception {
        Map<String, Object> dados = new HashMap<>();
        dados.put("cargo", voto.getCargo().name());
        dados.put("numero", voto.getNumero());
        dados.put("tipo", voto.getTipo().name());
        dados.put("data", voto.getData());
        db.collection(COLECAO).add(dados).get();
    }

    @Override
    public List<Voto> listar() throws Exception {
        List<Voto> votos = new ArrayList<>();
        for (QueryDocumentSnapshot doc : db.collection(COLECAO).get().get().getDocuments()) {
            Cargo cargo = Cargo.valueOf(doc.getString("cargo"));
            String numero = doc.getString("numero");
            TipoVoto tipo = TipoVoto.valueOf(doc.getString("tipo"));
            Date data = doc.getDate("data");
            votos.add(new Voto(cargo, numero == null ? "" : numero, tipo, data));
        }
        return votos;
    }

    @Override
    public String getDescricao() {
        return "Firebase Cloud Firestore";
    }
}
