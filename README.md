# 🌊 EcoLeak: "Capture the Leak"
> **Plataforma Multimodal & Gamificada para o Ocean Hackathon**  
> *Da foto do mutirão ao Bootcamp nas escolas e ao licenciamento ambiental auditável.*

---

## 📌 Visão Geral do Projeto

O **EcoLeak: Capture the Leak** resolve dois gargalos críticos na gestão e combate ao lixo nos oceanos:
1. **Gargalo de Campo (ONGs e Voluntários)**: Milhares de mutirões coletam montanhas de lixo nas praias, canais e mangues, mas a triagem manual é demorada e os dados raramente são digitalizados ou georreferenciados. Com a **IA de Visão Computacional**, uma única foto gera a triagem automática de polímeros (PET, PEAD, PP, etc.), volume, peso e risco ecológico.
2. **Gargalo Educacional (Escolas e EJA)**: Transforma os dados reais coletados no próprio bairro dos alunos em um **Bootcamp Gamificado ("Capture the Leak")**, conectando turmas de Ensino Fundamental II, Ensino Médio e Educação de Jovens e Adultos (EJA) com quizzes, cálculo do ciclo de vida dos materiais e ideação de upcycling comunitário.
3. **Módulo B2B & ESG**: Gera laudos auditáveis para secretarias municipais, órgãos ambientais (INEA/IBAMA) e patrocinadores corporativos que buscam comprovar mitigação de CO2 e destinação circular para cooperativas de catadores.

---

## 🚀 Módulos Implementados no MVP

### 1. 📱 Módulo de Campo (App da ONG & Voluntários) — `/campo`
- **Mobile-First & Responsivo**: Botões de acesso rápido à câmera ou galeria do smartphone.
- **Amostras Pré-Carregadas**: 3 fotos reais de mutirões costeiros para teste instantâneo em 1 clique.
- **Geolocalização (GPS)**: Registro automático das coordenadas geográficas e metadados da ONG e campanha.
- **Scanner Laser com IA Multimodal**: Animação de escaneamento visual durante o processamento.
- **Detecção de Polímeros**: Discriminação de PET, PEAD, PEBD, Latas de Alumínio, Redes de Pesca e Vidro.
- **Cálculo de Risco Ambiental**: Baixo, Médio, Alto e Crítico, com alertas de ameaça à fauna costeira.
- **Validação Humana**: Permite ao voluntário ajustar pesos, volumes e notas antes de gravar no mapa.

### 2. 🎓 Bootcamp Gamificado "Capture the Leak" — `/escola`
- **Painel do Aluno**:
  - **Mapa da Baía e Bairro (Leaflet)**: Visualização interativa dos pontos de vazamento mapeados no território escolar com cards informativos e fotos reais.
  - **Missão 1 ("Separador Mestre")**: Quiz interativo sobre polímeros 1 a 7 com feedback científico imediato e confetes ao acertar.
  - **Missão 2 ("Ciclo de Vida")**: Calculadora de decomposição comparando os anos de sobrevivência do plástico com fatos históricos.
  - **Missão 3 ("Do Lixo ao Recurso")**: Mural colaborativo de propostas de upcycling comunitário com votação em tempo real.
  - **Placar Interclasses**: Ranking das turmas escolares (Fundamental II, Ensino Médio e EJA) por XP.
  - **Badges Ecológicas**: Desbloqueio de insígnias como *"Protetor do Mangue"*, *"Especialista em Plástico"* e *"Guardião EJA"*.
- **Painel do Professor**:
  - **Planos de Aula Prontos**: Aulas alinhadas à BNCC (Ciências, Química, Biologia, Geografia, Sociologia).
  - **Emissor de Certificados**: Emissão oficial de certificado com 20 horas complementares pronto para impressão em PDF.

### 3. 📊 Módulo B2B & Licenciamento ESG — `/b2b`
- **Indicadores de Impacto**: Total de kg coletados, CO2 evitado, litros de água poupados e taxa de reciclabilidade.
- **Gráficos Recharts**: Composição por categoria de resíduo e evolução temporal da redução de vazamentos.
- **Laudo Auditável**: Relatório formatado no padrão A4 com carimbos, QR code e dados para apresentação a órgãos públicos.

---

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router & Server Actions)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com paleta sustentável (Verde Esmeralda e Azul Oceano)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Visualização de Dados**: [Recharts](https://recharts.org/)
- **Mapas Interativos**: [Leaflet](https://leafletjs.com/) com OpenStreetMap / CartoDB Voyager
- **Efeitos de Gamificação**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **IA de Visão Multimodal**: Rota `/api/analyze-waste` compatível com **Google Gemini 1.5 Flash Vision** e motor heurístico de alta precisão offline.

---

## ⚡ Como Rodar o Projeto Localmente

### 1. Clonar e Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente (Opcional)
Renomeie `.env.local.example` para `.env.local`:
```bash
GEMINI_API_KEY=sua_chave_aqui
```
*(Se não configurar nenhuma chave, a plataforma ativa automaticamente o motor heurístico inteligente de fallback com dados realistas).*

### 3. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📁 Estrutura de Arquivos

```
PlaySinc/
├── app/
│   ├── api/
│   │   └── analyze-waste/
│   │       └── route.ts         # API de Visão Multimodal e Triagem
│   ├── b2b/
│   │   └── page.tsx             # Módulo B2B & Relatórios ESG Auditáveis
│   ├── campo/
│   │   └── page.tsx             # App de Campo da ONG com Câmera e IA
│   ├── escola/
│   │   └── page.tsx             # Bootcamp "Capture the Leak" Gamificado
│   ├── globals.css              # Estilos Globais, Glassmorphism e Print A4
│   ├── layout.tsx               # Root Layout com Navbar e Footer
│   └── page.tsx                 # Landing Page do Projeto
├── components/
│   ├── Footer.tsx               # Rodapé com ODS da ONU e créditos
│   ├── LeafletMap.tsx           # Mapa Interativo com Pins de Vazamento
│   └── Navbar.tsx               # Navegação Responsiva com Badges
├── lib/
│   ├── mock-data.ts             # Dados Reais Mockados de Resíduos e Escolas
│   └── types.ts                 # Definições de Tipos TypeScript
├── public/                      # Assets estáticos
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🏆 Alinhamento aos Objetivos de Desenvolvimento Sustentável (ODS)

- **ODS 14 (Vida na Água)**: Prevenção direta e remoção de polímeros que afetam a biota marinha.
- **ODS 12 (Consumo e Produção Responsáveis)**: Educação sobre reciclagem e upcycling.
- **ODS 4 (Educação de Qualidade)**: Metodologias ativas e gamificação para escolas públicas e EJA.
- **ODS 11 (Cidades e Comunidades Sustentáveis)**: Redução de riscos de enchentes por descarte incorreto.
