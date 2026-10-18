export type WasteRiskLevel = 'Baixo' | 'Médio' | 'Alto' | 'Crítico';

export interface MaterialBreakdown {
  name: string;
  category: 'Plástico' | 'Metal' | 'Vidro' | 'Papel/Papelão' | 'Têxtil/Pesca' | 'Orgânico' | 'Outros';
  percentage: number;
  estimatedWeightKg: number;
  decompositionYears: number;
  recyclabilityRate: number; // 0 to 100%
  color: string;
}

export interface WasteAnalysisResult {
  id: string;
  timestamp: string;
  ongName: string;
  campaignName: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    bairro: string;
    city: string;
  };
  imageUrl: string;
  totalWeightKg: number;
  totalVolumeLiters: number;
  riskLevel: WasteRiskLevel;
  riskReason: string;
  materials: MaterialBreakdown[];
  marineImpactWarning: string;
  confidenceScore: number;
  status: 'Pendente' | 'Auditado' | 'Recolhido' | 'Em Análise';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  polymerCode?: string;
  points: number;
}

export interface ClassLeaderboard {
  rank: number;
  className: string;
  schoolName: string;
  segment: 'Fundamental II' | 'Ensino Médio' | 'EJA';
  points: number;
  missionsCompleted: number;
  collectedEquivalentKg: number;
  avatar: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'Campo' | 'Ciência' | 'Comunidade' | 'EJA';
}

export interface UpcyclingProject {
  id: string;
  title: string;
  author: string;
  className: string;
  schoolName: string;
  description: string;
  materialTarget: string;
  votes: number;
  createdAt: string;
  tags: string[];
}

export interface LessonPlan {
  id: string;
  title: string;
  targetAudience: string;
  subject: string;
  duration: string;
  summary: string;
  objectives: string[];
  bnccCompetencies: string[];
  materialsNeeded: string[];
  steps: { step: string; description: string }[];
}
