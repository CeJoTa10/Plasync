import { WasteAnalysisResult, QuizQuestion, ClassLeaderboard, Badge, UpcyclingProject, LessonPlan } from './types';

export const INITIAL_LEAK_POINTS: WasteAnalysisResult[] = [
  {
    id: 'leak-001',
    timestamp: '2026-10-18T09:15:00Z',
    ongName: 'Guardiões da Baía',
    campaignName: 'Mutirão Enseada Limpa',
    location: {
      lat: -22.9068,
      lng: -43.1729,
      address: 'Encosta da Praia Vermelha - Urca',
      bairro: 'Urca',
      city: 'Rio de Janeiro'
    },
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    totalWeightKg: 48.5,
    totalVolumeLiters: 160,
    riskLevel: 'Alto',
    riskReason: 'Grande concentração de redes de pesca e garrafas PET fragmentadas na linha de maré alta.',
    confidenceScore: 0.94,
    marineImpactWarning: 'Alto risco de emalhe de tartarugas marinhas e sufocamento de aves costeiras.',
    status: 'Auditado',
    materials: [
      { name: 'Garrafas PET (Refrigerante/Água)', category: 'Plástico', percentage: 45, estimatedWeightKg: 21.8, decompositionYears: 450, recyclabilityRate: 95, color: '#0ea5e9' },
      { name: 'Redes e Cabos de Pesca (Nylon)', category: 'Têxtil/Pesca', percentage: 25, estimatedWeightKg: 12.1, decompositionYears: 600, recyclabilityRate: 35, color: '#f97316' },
      { name: 'Latas de Alumínio', category: 'Metal', percentage: 15, estimatedWeightKg: 7.3, decompositionYears: 200, recyclabilityRate: 99, color: '#eab308' },
      { name: 'Sacolas e Filmes Plásticos (PEBD)', category: 'Plástico', percentage: 10, estimatedWeightKg: 4.8, decompositionYears: 300, recyclabilityRate: 60, color: '#06b6d4' },
      { name: 'Embalagens Longa Vida', category: 'Papel/Papelão', percentage: 5, estimatedWeightKg: 2.5, decompositionYears: 5, recyclabilityRate: 75, color: '#10b981' }
    ]
  },
  {
    id: 'leak-002',
    timestamp: '2026-10-17T15:40:00Z',
    ongName: 'EcoMar Guanabara',
    campaignName: 'Operação Foz Viva',
    location: {
      lat: -22.8421,
      lng: -43.2355,
      address: 'Foz do Rio Irajá - Canal do Mangue',
      bairro: 'Ilha do Governador',
      city: 'Rio de Janeiro'
    },
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80',
    totalWeightKg: 112.0,
    totalVolumeLiters: 390,
    riskLevel: 'Crítico',
    riskReason: 'Lixo acumulado bloqueando drenagem pluvial com proliferação de vetores e microplásticos.',
    confidenceScore: 0.97,
    marineImpactWarning: 'Migração iminente de partículas para o canal principal da baía com a próxima preamar.',
    status: 'Auditado',
    materials: [
      { name: 'Copos e Potes Descartáveis (PP/PS)', category: 'Plástico', percentage: 50, estimatedWeightKg: 56.0, decompositionYears: 400, recyclabilityRate: 50, color: '#0284c7' },
      { name: 'Tampinhas e Lacres (PEAD)', category: 'Plástico', percentage: 20, estimatedWeightKg: 22.4, decompositionYears: 450, recyclabilityRate: 90, color: '#38bdf8' },
      { name: 'Garrafas e Fragmentos de Vidro', category: 'Vidro', percentage: 15, estimatedWeightKg: 16.8, decompositionYears: 4000, recyclabilityRate: 100, color: '#10b981' },
      { name: 'Metais diversos e aerossóis', category: 'Metal', percentage: 10, estimatedWeightKg: 11.2, decompositionYears: 250, recyclabilityRate: 95, color: '#eab308' },
      { name: 'Outros rejeitos', category: 'Outros', percentage: 5, estimatedWeightKg: 5.6, decompositionYears: 50, recyclabilityRate: 10, color: '#94a3b8' }
    ]
  },
  {
    id: 'leak-003',
    timestamp: '2026-10-16T11:20:00Z',
    ongName: 'Voz dos Manguezais',
    campaignName: 'Resgate Raízes Limpas',
    location: {
      lat: -22.9852,
      lng: -43.2045,
      address: 'Orla da Lagoa / Parque dos Patins',
      bairro: 'Lagoa',
      city: 'Rio de Janeiro'
    },
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    totalWeightKg: 34.2,
    totalVolumeLiters: 110,
    riskLevel: 'Médio',
    riskReason: 'Resíduos de consumo recreativo deixados em área verde próxima a ninhos de capivaras e garças.',
    confidenceScore: 0.91,
    marineImpactWarning: 'Ingestão por aves aquáticas que confundem pequenos fragmentos com pequenos peixes.',
    status: 'Recolhido',
    materials: [
      { name: 'Latas de Cerveja e Refrigerante', category: 'Metal', percentage: 40, estimatedWeightKg: 13.7, decompositionYears: 200, recyclabilityRate: 99, color: '#eab308' },
      { name: 'Embalagens de Salgadinho (BOPP)', category: 'Plástico', percentage: 30, estimatedWeightKg: 10.3, decompositionYears: 200, recyclabilityRate: 20, color: '#ec4899' },
      { name: 'Garrafas PET', category: 'Plástico', percentage: 20, estimatedWeightKg: 6.8, decompositionYears: 450, recyclabilityRate: 95, color: '#0ea5e9' },
      { name: 'Canudos e Talheres Plásticos', category: 'Plástico', percentage: 10, estimatedWeightKg: 3.4, decompositionYears: 300, recyclabilityRate: 15, color: '#f43f5e' }
    ]
  }
];

export const SAMPLE_ONG_PHOTOS = [
  {
    title: 'Mutirão Encosta Praia Vermelha',
    description: 'Montante de plásticos e redes coletados por voluntários nas pedras.',
    bairro: 'Urca, Rio de Janeiro',
    url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    mockAnalysis: {
      totalWeightKg: 42.5,
      totalVolumeLiters: 145,
      riskLevel: 'Alto' as const,
      materials: [
        { name: 'Garrafas PET', category: 'Plástico' as const, percentage: 55, estimatedWeightKg: 23.4, decompositionYears: 450, recyclabilityRate: 95, color: '#0ea5e9' },
        { name: 'Cabos e Redes Sintéticas', category: 'Têxtil/Pesca' as const, percentage: 25, estimatedWeightKg: 10.6, decompositionYears: 600, recyclabilityRate: 30, color: '#f97316' },
        { name: 'Latas de Alumínio', category: 'Metal' as const, percentage: 20, estimatedWeightKg: 8.5, decompositionYears: 200, recyclabilityRate: 99, color: '#eab308' }
      ]
    }
  },
  {
    title: 'Foz do Canal Urbano',
    description: 'Resíduos flutuantes retidos na margem do canal perto da escola.',
    bairro: 'São Cristóvão / Maracanã',
    url: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80',
    mockAnalysis: {
      totalWeightKg: 68.0,
      totalVolumeLiters: 230,
      riskLevel: 'Crítico' as const,
      materials: [
        { name: 'Copos e Potes Descartáveis', category: 'Plástico' as const, percentage: 40, estimatedWeightKg: 27.2, decompositionYears: 400, recyclabilityRate: 40, color: '#0284c7' },
        { name: 'Embalagens Metalizadas (BOPP)', category: 'Plástico' as const, percentage: 30, estimatedWeightKg: 20.4, decompositionYears: 250, recyclabilityRate: 15, color: '#ec4899' },
        { name: 'Garrafas e Cacos de Vidro', category: 'Vidro' as const, percentage: 20, estimatedWeightKg: 13.6, decompositionYears: 4000, recyclabilityRate: 100, color: '#10b981' },
        { name: 'Sucatas Metálicas', category: 'Metal' as const, percentage: 10, estimatedWeightKg: 6.8, decompositionYears: 150, recyclabilityRate: 98, color: '#eab308' }
      ]
    }
  },
  {
    title: 'Praça Comunitária & Orla',
    description: 'Descarte pontual pós-evento comunitário identificado no gramado.',
    bairro: 'Botafogo, Rio de Janeiro',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    mockAnalysis: {
      totalWeightKg: 18.2,
      totalVolumeLiters: 65,
      riskLevel: 'Médio' as const,
      materials: [
        { name: 'Latas de Alumínio', category: 'Metal' as const, percentage: 60, estimatedWeightKg: 10.9, decompositionYears: 200, recyclabilityRate: 99, color: '#eab308' },
        { name: 'Garrafas PET', category: 'Plástico' as const, percentage: 30, estimatedWeightKg: 5.5, decompositionYears: 450, recyclabilityRate: 95, color: '#0ea5e9' },
        { name: 'Guardanapos e Papéis', category: 'Papel/Papelão' as const, percentage: 10, estimatedWeightKg: 1.8, decompositionYears: 1, recyclabilityRate: 70, color: '#10b981' }
      ]
    }
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Qual polímero é comumente identificado nas garrafas de refrigerante e possui o código de reciclagem com triângulo número 1?',
    options: [
      'PET (Polietileno Tereftalato)',
      'PEAD (Polietileno de Alta Densidade)',
      'PVC (Policloreto de Vinila)',
      'PP (Polipropileno)'
    ],
    correctIndex: 0,
    polymerCode: '1 - PET',
    points: 50,
    explanation: 'O PET é o plástico mais reciclado do Brasil! É leve, transparente e ideal para garrafas, mas demora cerca de 450 anos para se degradar naturalmente no oceano.'
  },
  {
    id: 'q2',
    question: 'As tampinhas plásticas de garrafa e frascos de xampu costumam ser feitas de qual polímero mais resistente (Código 2)?',
    options: [
      'PS (Poliestireno)',
      'PEAD (Polietileno de Alta Densidade)',
      'PVC (Policloreto de Vinila)',
      'BOPP (Polipropileno Biorientado)'
    ],
    correctIndex: 1,
    polymerCode: '2 - PEAD',
    points: 50,
    explanation: 'O PEAD é muito resistente quimicamente, opaco e flutua na água doce e salgada, facilitando sua separação mecânica nos centros de triagem de cooperativas.'
  },
  {
    id: 'q3',
    question: 'Por que canudos e sacolinhas plásticas finas representam perigo crítico quando caem na Baía ou no Mar?',
    options: [
      'Porque eles aumentam o oxigênio da água.',
      'Porque se fragmentam em microplásticos que entram na cadeia alimentar marinha e sufocam animais.',
      'Porque eles dissolvem o sal da água do mar.',
      'Porque viram corais artificiais benéficos.'
    ],
    correctIndex: 1,
    points: 50,
    explanation: 'Plásticos de uso único quebram sob radiação solar e atrito mecânico em microplásticos (<5mm). Peixes e aves ingerem essas partículas acreditando ser alimento, gerando desnutrição e intoxicação.'
  },
  {
    id: 'q4',
    question: 'Qual destes materiais pode ser reciclado infinitas vezes sem perder NENHUMA de suas propriedades físicas e mecânicas?',
    options: [
      'Plástico Filme (PEBD)',
      'Alumínio e Vidro',
      'Papel Sulfite',
      'Tecido Sintético'
    ],
    correctIndex: 1,
    points: 50,
    explanation: 'O Alumínio e o Vidro são materiais circulares por excelência: podem ser fundidos e moldados infinitas vezes com consumo energético até 95% menor que a extração primária de bauxita!'
  }
];

export const CLASS_LEADERBOARDS: ClassLeaderboard[] = [
  {
    rank: 1,
    className: '9º Ano A - Maré Limpa',
    schoolName: 'E.M. Barão de Mauá',
    segment: 'Fundamental II',
    points: 2840,
    missionsCompleted: 12,
    collectedEquivalentKg: 142.5,
    avatar: '🐬'
  },
  {
    rank: 2,
    className: '1º Módulo B Noturno (EJA)',
    schoolName: 'CIEP 218 - Darcy Ribeiro',
    segment: 'EJA',
    points: 2690,
    missionsCompleted: 11,
    collectedEquivalentKg: 198.0,
    avatar: '🐢'
  },
  {
    rank: 3,
    className: '2ª Série C - Manguezais',
    schoolName: 'Colégio Estadual Guanabara',
    segment: 'Ensino Médio',
    points: 2310,
    missionsCompleted: 10,
    collectedEquivalentKg: 89.2,
    avatar: '🦀'
  },
  {
    rank: 4,
    className: '8º Ano B - BioGuard',
    schoolName: 'E.M. Orla da Baía',
    segment: 'Fundamental II',
    points: 1950,
    missionsCompleted: 8,
    collectedEquivalentKg: 64.0,
    avatar: '🌿'
  },
  {
    rank: 5,
    className: '3º Módulo A EJA - Guardiões',
    schoolName: 'CIEP 402 - Paulo Freire',
    segment: 'EJA',
    points: 1720,
    missionsCompleted: 7,
    collectedEquivalentKg: 115.4,
    avatar: '🌟'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge-1',
    name: 'Protetor do Mangue',
    description: 'Identificou e mapeou mais de 50kg de vazamentos de lixo perto de áreas estuarinas.',
    icon: '🌊',
    unlocked: true,
    unlockedAt: '15/10/2026',
    category: 'Campo'
  },
  {
    id: 'badge-2',
    name: 'Especialista em Plástico',
    description: 'Acertou 100% das questões do Quiz Separador Mestre sobre polímeros 1 a 7.',
    icon: '🧪',
    unlocked: true,
    unlockedAt: '17/10/2026',
    category: 'Ciência'
  },
  {
    id: 'badge-3',
    name: 'Guardião EJA',
    description: 'Integrou saberes da comunidade local de catadores ao projeto escolar de upcycling.',
    icon: '🤝',
    unlocked: true,
    unlockedAt: '18/10/2026',
    category: 'EJA'
  },
  {
    id: 'badge-4',
    name: 'Detetive de Microplásticos',
    description: 'Concluiu a análise de ciclo de vida de itens com tempo de decomposição superior a 400 anos.',
    icon: '🔬',
    unlocked: false,
    category: 'Ciência'
  },
  {
    id: 'badge-5',
    name: 'Mestre da Economia Circular',
    description: 'Submeteu um projeto de reuso comunitário que obteve mais de 25 votos dos colegas.',
    icon: '♻️',
    unlocked: false,
    category: 'Comunidade'
  }
];

export const INITIAL_UPCYCLING_PROJECTS: UpcyclingProject[] = [
  {
    id: 'proj-1',
    title: 'Vassouras e Fios Ecológicos com Garrafas PET',
    author: 'Equipe Maré Limpa (9º Ano A)',
    className: '9º Ano A',
    schoolName: 'E.M. Barão de Mauá',
    description: 'Filetador manual feito com lâminas de apontador para cortar garrafas PET em fios super resistentes para confecção de vassouras de pátio escolar e amarras de horta.',
    materialTarget: 'Garrafas PET 2L incolores e verdes',
    votes: 38,
    createdAt: '16/10/2026',
    tags: ['Upcycling', 'Horta Escolar', 'PET']
  },
  {
    id: 'proj-2',
    title: 'Tijolos Ecológicos e Vasos com Tampinhas Trituradas',
    author: 'Turma EJA Noturno (CIEP 218)',
    className: '1º Módulo B',
    schoolName: 'CIEP 218 - Darcy Ribeiro',
    description: 'Derretimento seguro e prensagem de tampinhas de PEAD e PP arrecadadas nas coletas para produzir vasos de mudas nativas da restinga e sinalizadores de pátio.',
    materialTarget: 'Tampinhas plásticas PEAD/PP',
    votes: 45,
    createdAt: '17/10/2026',
    tags: ['PEAD', 'EJA Prático', 'Comunidade']
  },
  {
    id: 'proj-3',
    title: 'Barreira Flutuante Caseira contra Vazamento Plástico',
    author: 'Grêmio Estudantil (Ensino Médio)',
    className: '2ª Série C',
    schoolName: 'Colégio Estadual Guanabara',
    description: 'Eco-barreira simples usando galões de 5L amarrados com redes descartadas para instalar na foz do canal antes do lixo atingir a praia durante chuvas fortes.',
    materialTarget: 'Galões de água e redes recolhidas',
    votes: 29,
    createdAt: '18/10/2026',
    tags: ['Prevenção', 'Canal Urbano', 'Ação Direta']
  }
];

export const LESSON_PLANS: LessonPlan[] = [
  {
    id: 'lp-1',
    title: 'Química dos Polímeros e a Saúde dos Oceanos',
    targetAudience: 'Ensino Médio e 9º Ano',
    subject: 'Química & Biologia',
    duration: '2 aulas (100 min)',
    summary: 'Investigação laboratorial e analítica das diferenças entre PET, PEAD, PVC e PP usando amostras coletadas pelas ONGs parceiras no bairro.',
    bnccCompetencies: ['EM13CNT104', 'EM13CNT307', 'EM13CNT309'],
    objectives: [
      'Identificar códigos de reciclagem através do teste de densidade em água doce e salina.',
      'Calcular o tempo de decomposição e entender a formação de microplásticos.',
      'Relacionar a poluição por plásticos ao colapso de cadeias tróficas marinhas.'
    ],
    materialsNeeded: ['Amostras de plásticos coletados', 'Béqueres com água e sal', 'Tabela de códigos ABNT', 'Acesso ao mapa EcoLeak'],
    steps: [
      { step: '1. Contextualização Local (20 min)', description: 'Apresentação dos dados reais do mapa de vazamento do bairro através do EcoLeak.' },
      { step: '2. Experimento de Flutuabilidade (40 min)', description: 'Separação prática de PEAD vs PET baseando-se na densidade relativa.' },
      { step: '3. Análise Crítica e Debate (25 min)', description: 'Discussão sobre responsabilidade compartilhada e políticas públicas de resíduos sólidos.' },
      { step: '4. Conclusão e Quiz no App (15 min)', description: 'Alunos respondem ao Quiz Separador Mestre no EcoLeak para acumular XP para a turma.' }
    ]
  },
  {
    id: 'lp-2',
    title: 'Economia Circular e Valorização do Saber Comunitário',
    targetAudience: 'Educação de Jovens e Adultos (EJA)',
    subject: 'Sociologia, Geografia & Projeto de Vida',
    duration: '1 encontro (60 min)',
    summary: 'Mapeamento da cadeia de reciclagem local, valorização dos catadores de materiais recicláveis e identificação de oportunidades de renda limpa no território.',
    bnccCompetencies: ['EM13CHS103', 'EM13CHS304'],
    objectives: [
      'Reconhecer o papel socioambiental fundamental das cooperativas de catadores.',
      'Calcular a viabilidade econômica do upcycling de tampinhas e alumínio.',
      'Desenvolver um plano de ação comunitária para mutirões de descarte correto.'
    ],
    materialsNeeded: ['Dados do painel ESG EcoLeak', 'Folhetos das cooperativas locais', 'Calculadora de pegada de carbono'],
    steps: [
      { step: '1. Roda de Conversa (15 min)', description: 'Relato de experiências dos alunos sobre o descarte e alagamentos no bairro.' },
      { step: '2. Leitura dos Dados do EcoLeak (20 min)', description: 'Análise dos kg coletados e valor estimado que foi desviado de aterros.' },
      { step: '3. Oficina Prática de Soluções (25 min)', description: 'Elaboração de proposta de melhoria para pontos críticos no entorno da escola.' }
    ]
  }
];
