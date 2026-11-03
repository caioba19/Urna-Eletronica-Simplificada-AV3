# Urna Cidadã

> Simulador educativo com candidatos e resultados fictícios; não é um sistema oficial de votação.

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
3. Salvar o JSON como `firebase-key.json` nesta pasta (`backend/`) ou definir `FIREBASE_CREDENTIALS` com o caminho completo.

Sem credencial válida, a urna roda com armazenamento em memória e os votos se perdem ao fechar o programa. A urna só avança após confirmar a gravação; falhas são mostradas e permitem nova tentativa.

## Uso

- Vereador: 5 dígitos. Prefeito: 2 dígitos.
- Candidatos fictícios: vereador 11111, 11222, 22333, 22444, 33555, 33666. Prefeito 11, 22, 33.
- Menu Mesário > Apuração mostra a contagem dos votos.

## Estrutura

- `model`: Cargo, Candidato (abstrata), CandidatoProporcional, CandidatoMajoritario, Partido, Voto, Apuracao
- `repository`: VotoRepository (interface), FirestoreVotoRepository, MemoriaVotoRepository
- `service`: UrnaService, CatalogoCandidatos
- `view`: UrnaFrame, ApuracaoDialog
