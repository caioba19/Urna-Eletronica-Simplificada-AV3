# 🗳️ Urna Cidadã: Simulação Educativa e Combate à Desinformação

> **Proposta de Extensão Curricular – Curso de Ciência da Computação**  
> **Centro Universitário Jorge Amado (UNIJORGE) – Salvador/BA**  
> **Ano:** 2026

---

## 🎯 Sobre o Projeto

O **Urna Cidadã** é um projeto de extensão universitária concebido no âmbito da disciplina de **Programação Orientada a Objetos (POO)**. O projeto alia o rigor técnico do desenvolvimento de software à formação cidadã de jovens estudantes do Ensino Médio de escolas públicas em Salvador/BA, promovendo a literacia eleitoral e o combate a conteúdos falsos e manipulados por inteligência artificial (*deepfakes*).

O ecossistema é composto por:
1. **Core Backend / Desktop (Java 17 + Swing):** Aplicação focada nos conceitos clássicos de POO (abstração, herança, polimorfismo, encapsulamento e padrões de projeto), simulador de urna em Java Swing com sintetizador de áudio nativo e persistência em nuvem com Firebase (Cloud Firestore) e fallback em memória.
2. **Frontend Web Moderno (React + TypeScript + Tailwind CSS):** Simulador web interativo, painel de apuração em tempo real estilo cobertura eleitoral e módulo educativo com quiz sobre segurança da urna e combate a deepfakes.

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
* **Modo Firebase:** Coloque a chave `firebase-key.json` na raiz da pasta `backend/` para sincronizar os votos com o Google Cloud Firestore.

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

## 👨‍💻 Autor & Curso
* **Autor:** Caio Vitorino ,Caio Vinicius ,Daniel Oliveira ,Maicon Dias e Matheus Rosa
* **Curso:** Tecnologo em Analise em Desenvolvimento de Sistemas
* **Instituição:** UNIJORGE – Salvador/BA
