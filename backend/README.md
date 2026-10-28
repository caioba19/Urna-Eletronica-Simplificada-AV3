# Urna Cidadã

Simulador de urna eletrônica em Java (Swing) com votos salvos no Firebase Cloud Firestore.

## Rodar

Requisitos: JDK 17+ e Maven.

```
mvn package
java -jar target/urna-cidada-1.0.0.jar
```

## Firebase

1. Console do Firebase > criar projeto > Firestore Database (modo teste).
2. Configurações do projeto > Contas de serviço > Gerar nova chave privada.
3. Salvar o JSON como `firebase-key.json` na raiz do projeto (ou definir a variável `FIREBASE_CREDENTIALS` com o caminho).

Sem o arquivo, a urna roda com armazenamento em memória.

## Uso

- Vereador: 5 dígitos. Prefeito: 2 dígitos.
- Candidatos fictícios: vereador 11111, 11222, 22333, 22444, 33555, 33666. Prefeito 11, 22, 33.
- Menu Mesário > Apuração mostra a contagem dos votos.

## Estrutura

- `model`: Cargo, Candidato (abstrata), CandidatoProporcional, CandidatoMajoritario, Partido, Voto, Apuracao
- `repository`: VotoRepository (interface), FirestoreVotoRepository, MemoriaVotoRepository
- `service`: UrnaService, CatalogoCandidatos
- `view`: UrnaFrame, ApuracaoDialog
