# CENTRO UNIVERSITÁRIO JORGE AMADO
## CURSO SUPERIOR DE TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS (ADS)
### EXTENSÃO CURRICULAR – 2026.2

<br><br><br>

**INTEGRANTES DA EQUIPE:**
* CAIO VINÍCIUS SANTOS DA COSTA LEITE
* CAIO VITORINO
* DANIEL OLIVEIRA
* MAICON DIAS
* MATHEUS ROSA

<br><br><br>

### **URNA CIDADÃ: SIMULAÇÃO EDUCATIVA DO VOTO ELETRÔNICO E COMBATE À DESINFORMAÇÃO EM ANO ELEITORAL**
#### **Desafio 2: Memorial de Correlação com os Objetivos de Desenvolvimento Sustentável (ODS)**

<br><br><br>

**PROFESSOR ORIENTADOR:**
Prof. Anildo Matos

<br><br><br><br>

Salvador – BA  
2026

---

<!-- FOLHA DE ROSTO -->

**INTEGRANTES DA EQUIPE:**
* CAIO VINÍCIUS SANTOS DA COSTA LEITE
* CAIO VITORINO
* DANIEL OLIVEIRA
* MAICON DIAS
* MATHEUS ROSA

<br><br><br>

### **URNA CIDADÃ: SIMULAÇÃO EDUCATIVA DO VOTO ELETRÔNICO E COMBATE À DESINFORMAÇÃO EM ANO ELEITORAL**
#### **Desafio 2: Memorial de Correlação com os Objetivos de Desenvolvimento Sustentável (ODS)**

<br><br>

<div align="right" style="margin-left: 40%; text-align: justify; font-size: 11pt;">
Memorial acadêmico apresentado ao Centro Universitário Jorge Amado (UNIJORGE) como requisito obrigatório de entrega do Desafio 2 da Extensão Curricular vinculada à disciplina de Programação Orientada a Objetos (POO), no Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas (ADS).

<b>Professor Orientador:</b> Prof. Anildo Matos
</div>

<br><br><br><br>

Salvador – BA  
2026

---

### **RESUMO**

O projeto de extensão universitária **Urna Cidadã** integra o desenvolvimento técnico de software sob o paradigma de Programação Orientada a Objetos (POO) à formação sociopolítica e cidadã de estudantes do Ensino Médio de escolas públicas de Salvador – BA. Em 2026, ano de eleições gerais no Brasil, a iniciativa desenvolveu um ecossistema de simulação composto por uma urna eletrônica em Java Swing com persistência em nuvem e uma plataforma web responsiva, acompanhadas de oficinas presenciais sobre a segurança computacional do voto e técnicas forenses de identificação de *deepfakes* e desinformação eleitoral. O presente memorial fundamenta o alinhamento das ações com as metas 16.6, 16.7 e 16.10 do **ODS 16 (Paz, Justiça e Instituições Eficazes)**, bem como a meta 4.7 do **ODS 4 (Educação de Qualidade)** da Agenda 2030 da ONU, comprovando o impacto social da extensão no fortalecimento da confiança democrática e na literacia digital dos novos eleitores.

**Palavras-chave:** Extensão Curricular; Urna Eletrônica; Análise e Desenvolvimento de Sistemas; ODS 16; ODS 4; Desinformação; Inteligência Artificial; Literacia Digital.

---

### **SUMÁRIO**

* **1. INTRODUÇÃO** ............................................................................................................ 4
* **2. CARACTERIZAÇÃO DO PROJETO E DA COMUNIDADE BENEFICIÁRIA** ........ 4
* **3. CORRELAÇÃO COM O ODS 16 – PAZ, JUSTIÇA E INSTITUIÇÕES EFICAZES** ..... 5
  * 3.1 Meta 16.6: Transparência e Eficácia Institucional da Justiça Eleitoral ................. 5
  * 3.2 Meta 16.7: Participação e Tomada de Decisão Inclusiva dos Jovens Eleitores ...... 5
  * 3.3 Meta 16.10: Acesso à Informação e Enfrentamento a Deepfakes ........................... 6
* **4. CORRELAÇÃO COM O ODS 4 – EDUCAÇÃO DE QUALIDADE** ............................. 6
  * 4.1 Meta 4.7: Cidadania Global e Alfabetização Midiática na Escola Pública ............. 6
* **5. MATRIZ DE IMPACTO E INDICADORES DE EXECUÇÃO** ................................... 7
* **6. CONSIDERAÇÕES FINAIS** ......................................................................................... 7
* **REFERÊNCIAS** ............................................................................................................... 8

---

### **1. INTRODUÇÃO**

A extensão universitária representa o elo basilar de comunicação entre a produção científica e as demandas concretas da sociedade civil. No âmbito do curso de Análise e Desenvolvimento de Sistemas (ADS) do Centro Universitário Jorge Amado (UNIJORGE), sob orientação do **Prof. Anildo Matos**, o projeto **Urna Cidadã** emerge a partir da disciplina de Programação Orientada a Objetos (POO), desafiando os discentes a conceberem e executarem um ecossistema de software plenamente funcional e de relevância pública direta.

O cenário sociopolítico de 2026 destaca-se pela realização das eleições gerais brasileiras, momento em que uma parcela expressiva de adolescentes atinge a idade facultativa (16 anos) ou obrigatória (18 anos) para o exercício do voto. Simultaneamente, este público cresce inserido em ecossistemas de redes sociais e mensageria instantânea caracterizados pelo tráfego veloz de conteúdos manipulados por algoritmos e modelos de Inteligência Artificial generativa (*deepfakes*). 

Diante desse contexto, o presente trabalho atende às diretrizes institucionais do **Desafio 2**, estabelecendo a correlação formal e operacional das atividades do projeto com os **Objetivos de Desenvolvimento Sustentável (ODS)** da Agenda 2030 da Organização das Nações Unidas (ONU).

---

### **2. CARACTERIZAÇÃO DO PROJETO E DA COMUNIDADE BENEFICIÁRIA**

O projeto é estruturado em duas dimensões complementares:

1. **Dimensão Tecnológica:** Desenvolvimento de um simulador fiel de urna eletrônica (modelo UE-2022) em Java com aplicação dos pilares de POO (abstração, herança, polimorfismo e encapsulamento), arquitetura orientada a camadas (*Repository Pattern*), interface gráfica acessível e integração com banco de dados em nuvem via Firebase Firestore, associado a um portal web moderno com o simulador visual e o painel de apuração oficial (Divulga TSE).
2. **Dimensão Pedagógica e Social:** Realização de oficinas presenciais voltadas para estudantes do 2º e 3º ano do Ensino Médio de escola(s) pública(s) de Salvador – BA, oportunizando a experimentação prática da cabine de votação e conduzindo círculos de debate sobre a segurança computacional da urna e a checagem crítica de fatos.

A ação é rigorosamente apartidária, valendo-se de partidos e candidatos estritamente fictícios para que o foco educativo permaneça na transparência do processo e no desenvolvimento do pensamento crítico.

---

### **3. CORRELAÇÃO COM O ODS 16 – PAZ, JUSTIÇA E INSTITUIÇÕES EFICAZES**

O ODS 16 propõe *"promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável, proporcionar o acesso à justiça para todos e construir instituições eficazes, responsáveis e inclusivas em todos os níveis"* (ONU BRASIL, 2018). Este é o ODS de aderência primária do projeto, refletido nas seguintes metas:

#### **3.1 Meta 16.6 – Desenvolver instituições eficazes, responsáveis e transparentes em todos os níveis**
A narrativa de desconfiança infundada a respeito da lisura das eleições decorre, na maioria dos casos, do analfabetismo tecnológico acerca da engenharia da urna eletrônica. O projeto atua nesta meta ao traduzir os conceitos de Engenharia de Software e Desenvolvimento de Sistemas para a linguagem dos estudantes, demonstrando:
* O isolamento físico absoluto do equipamento (*air-gap*), comprovando a impossibilidade de ataques cibernéticos externos via internet;
* A assinatura digital de software com criptografia assimétrica de chaves públicas/privadas;
* A emissão do Boletim de Urna (BU) com hash criptográfico SHA-256 e auditoria descentralizada. 
Dessa forma, a iniciativa consolida na juventude a confiança na Justiça Eleitoral como instituição republicana transparente e eficaz.

#### **3.2 Meta 16.7 – Garantir a tomada de decisão responsiva, inclusiva, participativa e representativa em todos os níveis**
Muitos jovens de classes populares de Salvador deixam de votar ou votam de forma desorientada devido à inexperiência ou ao receio de errar o manuseio da urna no dia do pleito. Ao interagir com o teclado físico, visualizar a tela oficial e treinar a sequência correta de votos (proporcional e majoritário), o estudante adquire segurança procedimental. O projeto remove as barreiras psicológicas do primeiro voto, fomentando uma participação cidadã consciente, inclusiva e representativa.

#### **3.3 Meta 16.10 – Assegurar o acesso público à informação e proteger as liberdades fundamentais**
A desinformação digital compromete a livre manifestação da vontade popular. Ao incorporar nas oficinas um laboratório pericial de identificação de *deepfakes* e técnicas de checagem em fontes oficiais (como o portal *Fato ou Boato* do TSE e as agências de verificação), o projeto instrumentaliza os novos eleitores com critérios técnicos para reconhecer mídias forjadas por IA, assegurando o direito fundamental à informação íntegra e não manipulada, em sintonia com a campanha global *#InformaçãoDeVerdade* das Nações Unidas.

---

### **4. CORRELAÇÃO COM O ODS 4 – EDUCAÇÃO DE QUALIDADE**

O ODS 4 busca *"assegurar a educação inclusiva e equitativa de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todas e todos"* (ONU BRASIL, 2018). O projeto vincula-se secundariamente a este objetivo:

#### **4.1 Meta 4.7 – Garantir que todos os alunos adquiram conhecimentos e habilidades necessárias para promover o desenvolvimento sustentável e a cidadania global**
Ao transpor os conhecimentos produzidos no curso de Análise e Desenvolvimento de Sistemas para a realidade da educação básica pública da Bahia, a equipe de discentes atua na promoção da alfabetização midiática e da ética digital. Os estudantes secundaristas deixam de ser meros consumidores passivos de algoritmos de redes sociais e passam a atuar como agentes conscientes da sociedade da informação, alinhando-se aos pressupostos da cidadania global preconizados pela UNESCO.

---

### **5. MATRIZ DE IMPACTO E INDICADORES DE EXECUÇÃO**

| Meta ODS | Linha de Ação do Projeto | Indicador Mensurável na Oficina |
| :--- | :--- | :--- |
| **Meta 16.6** | Explicação didática da arquitetura de software e emissão do BU. | Relatório de auditoria e impressão de Boletins de Urna didáticos com os estudantes. |
| **Meta 16.7** | Treinamento simulado de votação para alunos de 16 a 18 anos. | Número de estudantes que realizaram a votação completa no simulador. |
| **Meta 16.10** | Oficina de detecção de fraudes audiovisuais e *deepfakes* de IA. | Índice de assertividade obtido na tabulação do questionário de percepção crítica. |
| **Meta 4.7** | Conexão curricular universidade-escola pública de Salvador. | Registros fotográficos, lista de presença da turma e ata de realização da oficina. |

---

### **6. CONSIDERAÇÕES FINAIS**

O projeto de extensão **Urna Cidadã** comprova que a análise e o desenvolvimento de sistemas não constituem saberes isolados em laboratórios. Pelo contrário: quando orientados para os desafios reais da comunidade, tornam-se ferramentas catalisadoras de transformação social e fortalecimento democrático. 

A dedicação conjunta da equipe no desenvolvimento dos módulos tecnológicos e no planejamento pedagógico das oficinas, sob a condução do **Prof. Anildo Matos**, materializa o compromisso da UNIJORGE e dos seus futuros analistas e desenvolvedores com as metas dos **ODS 16 e 4 da ONU**, deixando um legado cívico duradouro na formação dos novos cidadãos soteropolitanos.

---

### **REFERÊNCIAS**

1. **BRASIL. Tribunal Superior Eleitoral (TSE).** *Simulador de votação na urna eletrônica.* Brasília: TSE, 2026. Disponível em: <https://www.tse.jus.br/hotsites/simulador-de-votacao/>. Acesso em: 28 out. 2026.
2. **BRASIL. Ministério da Educação (MEC).** *Base Nacional Comum Curricular (BNCC): Educação é a Base.* Brasília: MEC, 2018.
3. **CENTRO DE INFORMAÇÃO DAS NAÇÕES UNIDAS PARA O BRASIL (UNIC Rio).** *Campanha #InformaçãoDeVerdade: Enfrentamento à desinformação nas plataformas digitais.* Rio de Janeiro: Nações Unidas Brasil, 2025.
4. **CENTRO UNIVERSITÁRIO JORGE AMADO (UNIJORGE).** *Calendário Acadêmico 2026.2 – Extensão Curricular da Graduação Presencial.* Salvador: Coordenação de Extensão, 2026.
5. **NAÇÕES UNIDAS BRASIL.** *Objetivo de Desenvolvimento Sustentável 16: Paz, Justiça e Instituições Eficazes.* Brasília: ONU, 2018. Disponível em: <https://brasil.un.org/pt-br/sdgs/16>. Acesso em: 28 out. 2026.
6. **NAÇÕES UNIDAS BRASIL.** *Objetivo de Desenvolvimento Sustentável 4: Assegurar a educação inclusiva, equitativa e de qualidade.* Brasília: ONU, 2018. Disponível em: <https://brasil.un.org/pt-br/sdgs/4>. Acesso em: 28 out. 2026.
