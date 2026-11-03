# 🗳️ Urna Cidadã: Simulação Educativa e Combate à Desinformação

> **Aviso:** este é um simulador educativo. Candidatos, seção, resultados e boletim são fictícios; não é um sistema oficial de votação. A versão web mantém os dados somente no armazenamento local do navegador. A versão desktop pode usar Firestore quando configurada.

> **Proposta de Extensão Curricular – Curso de Análise e Desenvolvimento de Sistemas (ADS)**  
> **Centro Universitário Jorge Amado (UNIJORGE) – Salvador/BA**  
> **Professor Orientador:** Prof. Anildo Matos  
> **Ano:** 2026

---

## 🎯 Sobre o Projeto

O **Urna Cidadã** é um projeto de extensão universitária concebido no âmbito da disciplina de **Programação Orientada a Objetos (POO)** do curso de **Análise e Desenvolvimento de Sistemas (ADS)**. O projeto alia o rigor técnico do desenvolvimento de software à formação cidadã de jovens estudantes do Ensino Médio de escolas públicas em Salvador/BA, promovendo a literacia eleitoral e o combate a conteúdos falsos e manipulados por inteligência artificial (*deepfakes*).

O ecossistema é composto por:
1. **Core Backend / Desktop (Java 17 + Swing):** Aplicação focada nos conceitos clássicos de POO (abstração, herança, polimorfismo, encapsulamento e padrões de projeto), simulador de urna em Java Swing com sintetizador de áudio nativo e persistência em nuvem com Firebase (Cloud Firestore) e fallback em memória.
2. **Frontend Web (React + TypeScript + Tailwind CSS):** Simulador interativo, painel demonstrativo de apuração e módulo educativo com quiz sobre segurança da urna e combate a deepfakes. A aplicação inicia com votos fictícios de demonstração; use **Zerar Urna** para começar sem eles. O botão **Simular +10 Votos** acrescenta dados gerados aleatoriamente.

---

## 🏛️ Arquitetura do Sistema

```
urna-cidada/
│
├── backend/                  # Módulo Java (POO, Swing, Firestore)
│   ├── src/main/java/
│   │   └── br/unijorge/urna/
│   │       ├── app/          # Ponto de entrada (Main)
│   │       ├── model/        # Domínio: Candidato, Cargo, Partido, Voto, Apuracao
│   │       ├── repository/   # Repository Pattern: Firestore & Memória
│   │       ├── service/      # Regras de negócio da urna e apuração
│   │       ├── util/         # Sintetizador sonoro da urna (javax.sound)
│   │       └── view/         # Interface gráfica em Java Swing
│   └── pom.xml
│
├── frontend/                 # Módulo Web (React 18, TypeScript, Tailwind)
│   ├── src/
│   │   ├── components/       # UrnaWeb, DashboardApuracao, ModuloEducativo, Navbar
│   │   ├── data/             # Catálogo de candidatos da simulação
│   │   ├── utils/            # Web Audio API (som oficial do TSE)
│   │   └── types/            # Tipagem TypeScript
│   ├── package.json
│   └── vite.config.ts
│
└── .gitignore
```

---

## 💻 Como Executar

### 1. Backend (Java Desktop)

**Pré-requisitos:** JDK 17+.

Abra a pasta `backend/` na sua IDE de preferência (**IntelliJ IDEA**, **VS Code** ou **Eclipse**):
* Execute a classe `br.unijorge.urna.app.Main`.

Ou via linha de comando com Maven:
```bash
cd backend
mvn clean package
java -jar target/urna-cidada-1.0.0.jar
```

* **Modo Offline:** Se não houver arquivo `firebase-key.json`, a urna inicializa automaticamente em memória local sem travar.
* **Modo Firebase:** Coloque a chave `firebase-key.json` na pasta `backend/` ou defina `FIREBASE_CREDENTIALS` com o caminho do arquivo.
* Sem credencial válida, o desktop usa armazenamento em memória; os votos desaparecem ao fechar o programa.

---

### 2. Frontend Web (React + TypeScript)

**Pré-requisitos:** Node.js 18+.

```bash
cd frontend
npm install
npm run dev
```

Acesse no navegador: `http://localhost:5173`.

---

## 📋 Regras de Votação (Simulação Fictícia)

A votação segue a ordem oficial do TSE com candidatos e partidos fictícios:

1. **Vereador(a) – 5 dígitos:**
   * `11111` – Ana Beatriz Luz (PAD)
   * `11222` – Carlos Vento Sul (PAD)
   * `22333` – Marina Ribeiro Costa (PHV)
   * `22444` – Joaquim da Ladeira (PHV)
   * `33555` – Tereza Farol (PMA)
   * `33666` – Davi Recife Novo (PMA)

2. **Prefeito(a) – 2 dígitos:**
   * `11` – Helena Ventura / Vice: Rui Antunes (PAD)
   * `22` – Otávio Campos / Vice: Lia Fontes (PHV)
   * `33` – Beatriz Marés / Vice: Nilo Batista (PMA)

* **Teclas de Ação:**
  * **BRANCO:** Voto em branco (apenas se nenhum número foi digitado).
  * **CORRIGE:** Limpa os dígitos digitados no cargo atual.
  * **CONFIRMA:** Registra o voto e avança para o próximo cargo ou finaliza.

No desktop, a urna só avança depois que o repositório confirma a gravação. Em caso de falha, exibe um aviso e mantém o voto na tela para nova tentativa.

---

## 🎓 Objetivos de Desenvolvimento Sustentável (ODS)

Este projeto de extensão está diretamente alinhado com:
* **ODS 16 – Paz, Justiça e Instituições Eficazes:**
  * *Meta 16.6:* Transparência e confiança nas instituições democráticas.
  * *Meta 16.7:* Participação inclusiva e informada de jovens novos eleitores.
  * *Meta 16.10:* Acesso à informação íntegra e combate à desinformação.
* **ODS 4 – Educação de Qualidade:**
  * *Meta 4.7:* Cidadania global e alfabetização midiática/digital na educação básica.

---

## 👨‍💻 Equipe & Orientação
* **Professor Orientador:** Prof. Anildo Matos
* **Curso:** Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas (ADS)
* **Instituição:** UNIJORGE – Salvador/BA
* **Integrantes da Equipe:**
  * Caio Vinícius Santos da Costa Leite
  * Caio Vitorino
  * Daniel Oliveira
  * Maicon Dias
  * Matheus Rosa
