'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  GraduationCap, 
  MapPin, 
  Trophy, 
  Award, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Layers, 
  FileText, 
  Printer, 
  Share2, 
  ThumbsUp, 
  PlusCircle, 
  Clock, 
  Calendar, 
  School, 
  BookOpen, 
  Compass, 
  Flame,
  ArrowRight,
  Info,
  Sliders
} from 'lucide-react';
import { 
  INITIAL_LEAK_POINTS, 
  QUIZ_QUESTIONS, 
  CLASS_LEADERBOARDS, 
  BADGES, 
  INITIAL_UPCYCLING_PROJECTS, 
  LESSON_PLANS 
} from '@/lib/mock-data';
import { WasteAnalysisResult, UpcyclingProject } from '@/lib/types';
import confetti from 'canvas-confetti';

// Dynamic import do mapa Leaflet para evitar erros de SSR no Next.js
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl glass-panel flex flex-col items-center justify-center space-y-3">
      <Compass className="w-8 h-8 text-cyan-400 animate-spin" />
      <span className="text-xs text-slate-400">Carregando mapa interativo de vazamentos...</span>
    </div>
  )
});

export default function EscolaPage() {
  const [activeTab, setActiveTab] = useState<'aluno' | 'professor'>('aluno');

  // Dados do Mapa
  const [leakPoints, setLeakPoints] = useState<WasteAnalysisResult[]>(INITIAL_LEAK_POINTS);
  const [selectedPoint, setSelectedPoint] = useState<WasteAnalysisResult | null>(INITIAL_LEAK_POINTS[0]);

  // Carregar pontos adicionais do LocalStorage (criados no Módulo de Campo)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ecoleak_custom_points');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeakPoints([...parsed, ...INITIAL_LEAK_POINTS]);
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar pontos do storage:', e);
    }
  }, []);

  // Missão 1: Quiz Separador Mestre
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Missão 2: Calculadora de Ciclo de Vida
  const [selectedMaterialYears, setSelectedMaterialYears] = useState(450); // Default PET
  const [materialName, setMaterialName] = useState('Garrafa PET');

  // Missão 3: Mural de Upcycling
  const [projects, setProjects] = useState<UpcyclingProject[]>(INITIAL_UPCYCLING_PROJECTS);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newMaterial, setNewMaterial] = useState('');
  const [newClass, setNewClass] = useState('9º Ano A');
  const [showNewProjModal, setShowNewProjModal] = useState(false);

  // Visão do Professor: Certificado
  const [studentCertName, setStudentCertName] = useState('Gabriel dos Santos Lima');
  const [certSchoolName, setCertSchoolName] = useState('Escola Municipal Barão de Mauá');
  const [certClass, setCertClass] = useState('9º Ano A');
  const [showCertificate, setShowCertificate] = useState(false);

  // Manipular Resposta do Quiz
  const handleSelectQuizOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    setHasAnswered(true);

    const isCorrect = index === QUIZ_QUESTIONS[currentQuizIdx].correctIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + QUIZ_QUESTIONS[currentQuizIdx].points);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setQuizFinished(true);
      try {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  // Votar em projeto de Upcycling
  const handleVoteProject = (id: string) => {
    setProjects(projects.map((p) => p.id === id ? { ...p, votes: p.votes + 1 } : p));
  };

  // Adicionar novo projeto
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const newProj: UpcyclingProject = {
      id: 'proj-' + Date.now(),
      title: newTitle,
      author: 'Você (Aluno)',
      className: newClass,
      schoolName: 'Sua Escola Local',
      description: newDesc,
      materialTarget: newMaterial || 'Materiais Recicláveis Coletados',
      votes: 1,
      createdAt: 'Hoje',
      tags: ['Iniciativa Aluno', 'Upcycling']
    };

    setProjects([newProj, ...projects]);
    setNewTitle('');
    setNewDesc('');
    setNewMaterial('');
    setShowNewProjModal(false);

    try {
      confetti({ particleCount: 50, spread: 70 });
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
      {/* Header com Seletor Aluno / Professor */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Módulo 2 • Educação Ambiental Prática & Gamificada</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bootcamp <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-ocean-400 bg-clip-text text-transparent">"Capture the Leak"</span>
          </h1>
          <p className="mt-1 text-slate-300 text-sm max-w-2xl">
            Dados reais coletados pelas ONGs no bairro transformados em missões práticas, investigações científicas e upcycling para Fundamental II, Ensino Médio e EJA.
          </p>
        </div>

        {/* Tab Toggle: Aluno vs Professor */}
        <div className="glass-panel p-1 rounded-xl flex items-center space-x-1 border border-ocean-700/50 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('aluno')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'aluno'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Painel do Aluno</span>
          </button>

          <button
            onClick={() => setActiveTab('professor')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'professor'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Painel do Professor</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. VISÃO DO ALUNO */}
      {/* ============================================================== */}
      {activeTab === 'aluno' && (
        <div className="space-y-10">
          {/* SEÇÃO 1: Mapa da Baía / Bairro (Capture the Leak) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>1. Mapa da Baía e Bairro: Identificação de Vazamentos</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Clique nos pontos do mapa para investigar os resíduos mapeados por ONGs e voluntários locais.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Atualizado em tempo real</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Mapa Interativo (lg:col-span-8) */}
              <div className="lg:col-span-8">
                <LeafletMap 
                  points={leakPoints} 
                  selectedPoint={selectedPoint} 
                  onSelectPoint={(pt) => setSelectedPoint(pt)} 
                />
              </div>

              {/* Detalhe do Ponto Selecionado (lg:col-span-4) */}
              <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-ocean-700/50 space-y-4">
                {selectedPoint ? (
                  <>
                    <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
                      <img 
                        src={selectedPoint.imageUrl} 
                        alt="Foto do Ponto" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          selectedPoint.riskLevel === 'Crítico' ? 'bg-red-500 text-white' :
                          selectedPoint.riskLevel === 'Alto' ? 'bg-orange-500 text-white' :
                          'bg-emerald-500 text-slate-950'
                        }`}>
                          Risco: {selectedPoint.riskLevel}
                        </span>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 p-2">
                        <span className="text-[10px] text-cyan-300 font-semibold block">
                          ONG: {selectedPoint.ongName}
                        </span>
                        <h4 className="text-xs font-bold text-white truncate">
                          {selectedPoint.location.address}
                        </h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Total Coletado</span>
                        <span className="font-extrabold text-white text-sm">{selectedPoint.totalWeightKg} kg</span>
                      </div>
                      <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Volume Estimado</span>
                        <span className="font-extrabold text-cyan-400 text-sm">{selectedPoint.totalVolumeLiters} L</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Materiais Predominantes:
                      </span>
                      <div className="space-y-1.5">
                        {selectedPoint.materials.map((mat, i) => (
                          <div key={i} className="flex justify-between items-center text-xs bg-slate-900/50 px-2.5 py-1.5 rounded-lg border border-slate-800/80">
                            <span className="text-slate-200 truncate pr-2">{mat.name}</span>
                            <span className="font-bold text-cyan-300 shrink-0">{mat.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 italic bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                      "{selectedPoint.riskReason}"
                    </p>
                  </>
                ) : (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Clique em um ponto do mapa para ver os detalhes
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: Missões e Desafios Semanais */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>2. Desafios & Missões Semanais do Bootcamp</span>
              </h2>
              <p className="text-xs text-slate-400">
                Ganhe pontos para sua turma, desbloqueie badges e aprenda a resolver os vazamentos plásticos.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Missão 1: Separador Mestre (Quiz de Polímeros) */}
              <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Missão 1 • Quiz Interativo
                    </span>
                    <span className="text-xs font-bold text-emerald-400">+{QUIZ_QUESTIONS[currentQuizIdx]?.points || 50} XP</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Separador Mestre: Polímeros 1 a 7</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Classifique corretamente os tipos de plástico encontrados no bairro.
                  </p>

                  {!quizFinished ? (
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Pergunta {currentQuizIdx + 1} de {QUIZ_QUESTIONS.length}</span>
                        <span>Pontuação: <strong>{quizScore} XP</strong></span>
                      </div>

                      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs font-medium text-slate-200">
                        {QUIZ_QUESTIONS[currentQuizIdx].question}
                      </div>

                      <div className="space-y-1.5">
                        {QUIZ_QUESTIONS[currentQuizIdx].options.map((opt, idx) => {
                          const isCorrect = idx === QUIZ_QUESTIONS[currentQuizIdx].correctIndex;
                          const isChosen = selectedAnswer === idx;

                          let btnStyle = 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800';
                          if (hasAnswered) {
                            if (isCorrect) btnStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
                            else if (isChosen) btnStyle = 'bg-red-500/20 text-red-300 border-red-500/50';
                          }

                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSelectQuizOption(idx)}
                              disabled={hasAnswered}
                              className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />}
                              {hasAnswered && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-1" />}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 text-[11px] text-slate-300 animate-fade-in space-y-2">
                          <p className="leading-relaxed">
                            💡 <strong>Fato Científico:</strong> {QUIZ_QUESTIONS[currentQuizIdx].explanation}
                          </p>
                          <button
                            type="button"
                            onClick={handleNextQuizQuestion}
                            className="w-full py-1.5 px-3 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center justify-center space-x-1"
                          >
                            <span>{currentQuizIdx < QUIZ_QUESTIONS.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2 animate-fade-in">
                      <Trophy className="w-10 h-10 text-emerald-400 mx-auto" />
                      <h4 className="text-sm font-bold text-white">Missão Concluída com Sucesso!</h4>
                      <p className="text-xs text-slate-300">
                        Você somou <strong>{quizScore} XP</strong> para a sua turma no Placar Interclasses!
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setQuizFinished(false);
                          setCurrentQuizIdx(0);
                          setSelectedAnswer(null);
                          setHasAnswered(false);
                        }}
                        className="text-xs text-cyan-400 underline font-semibold mt-2"
                      >
                        Jogar novamente
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Missão 2: Ciclo de Vida e Decomposição */}
              <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Missão 2 • Cálculo Real
                    </span>
                    <span className="text-xs font-bold text-emerald-400">+100 XP</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Calculadora do Ciclo de Vida</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Descubra quanto tempo o material mais comum do bairro sobreviverá no oceano.
                  </p>

                  <div className="mt-4 space-y-3">
                    <label className="text-[11px] text-slate-300 block">Selecione o resíduo detectado:</label>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {[
                        { name: 'Garrafa PET', years: 450, icon: '🥤' },
                        { name: 'Rede de Nylon', years: 600, icon: '🕸️' },
                        { name: 'Lata Alumínio', years: 200, icon: '🥫' },
                        { name: 'Vidro', years: 4000, icon: '🍾' },
                        { name: 'Copo Descartável', years: 400, icon: '☕' },
                        { name: 'Sacola Plástica', years: 300, icon: '🛍️' }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedMaterialYears(item.years);
                            setMaterialName(item.name);
                          }}
                          className={`p-2 rounded-lg border text-left flex items-center space-x-1.5 text-[11px] transition-all ${
                            materialName === item.name
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span>{item.icon}</span>
                          <span className="truncate">{item.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Comparador Histórico */}
                    <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between items-baseline">
                        <span className="text-slate-400">Tempo de Decomposição:</span>
                        <span className="text-lg font-black text-amber-400">{selectedMaterialYears} Anos</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500" 
                          style={{ width: `${Math.min(100, (selectedMaterialYears / 600) * 100)}%` }} 
                        />
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                        ⏱️ Se descartada hoje, a <strong>{materialName}</strong> ainda existirá no ano de <strong>{new Date().getFullYear() + selectedMaterialYears}</strong> — durando mais que impérios históricos inteiros!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="p-2.5 rounded-lg bg-ocean-950/60 border border-ocean-700/50 text-[11px] text-cyan-300 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span>Conclusão: 98% dos plásticos recolhidos na Baía ainda estão na fase inicial de fragmentação.</span>
                  </div>
                </div>
              </div>

              {/* Missão 3: Do Lixo ao Recurso (Upcycling) */}
              <div className="glass-panel p-5 rounded-2xl border border-ocean-500/30 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-ocean-500/20 text-ocean-300 border border-ocean-500/30">
                      Missão 3 • Ideação Prática
                    </span>
                    <span className="text-xs font-bold text-emerald-400">+150 XP</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Do Lixo ao Recurso (Upcycling)</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Crie ou vote em propostas de reutilização para os resíduos mapeados pelas ONGs.
                  </p>

                  <div className="mt-4 space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {projects.map((proj) => (
                      <div key={proj.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-white text-[12px] leading-tight">{proj.title}</h4>
                          <button
                            type="button"
                            onClick={() => handleVoteProject(proj.id)}
                            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-all font-semibold text-[10px] shrink-0 ml-1"
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>{proj.votes}</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                          {proj.description}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                          <span className="text-cyan-400">{proj.className}</span>
                          <span className="truncate max-w-[130px]">{proj.materialTarget}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowNewProjModal(true)}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Propor Projeto de Reuso da Minha Turma</span>
                </button>
              </div>
            </div>
          </div>

          {/* Modal para Submeter Novo Projeto */}
          {showNewProjModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="glass-panel p-6 rounded-2xl max-w-lg w-full border border-cyan-500/40 shadow-2xl space-y-4 animate-scale-up">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span>Submeter Projeto de Reuso (Upcycling)</span>
                  </h3>
                  <button 
                    onClick={() => setShowNewProjModal(false)}
                    className="text-slate-400 hover:text-white text-xs font-bold"
                  >
                    ✕ Fechar
                  </button>
                </div>

                <form onSubmit={handleAddProject} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Título do Projeto</label>
                    <input 
                      type="text" 
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Ex: Vasos Auto-irrigáveis com Garrafas PET"
                      className="w-full p-2.5 rounded-lg glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Material Alvo</label>
                    <input 
                      type="text" 
                      value={newMaterial}
                      onChange={(e) => setNewMaterial(e.target.value)}
                      placeholder="Ex: Garrafas PET e Tampinhas PEAD"
                      className="w-full p-2.5 rounded-lg glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Sua Turma / Escola</label>
                    <select
                      value={newClass}
                      onChange={(e) => setNewClass(e.target.value)}
                      className="w-full p-2.5 rounded-lg glass-input bg-slate-900 text-xs"
                    >
                      <option value="9º Ano A">9º Ano A - E.M. Barão de Mauá</option>
                      <option value="1º Módulo B EJA">1º Módulo B - CIEP 218 Darcy Ribeiro (EJA)</option>
                      <option value="2ª Série C Médio">2ª Série C - Colégio Estadual Guanabara</option>
                      <option value="Outra Turma">Outra Turma Parceira</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Como Funciona o Projeto?</label>
                    <textarea 
                      rows={3}
                      required
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Descreva como o material recolhido no bairro será transformado e qual o benefício para a escola ou comunidade..."
                      className="w-full p-2.5 rounded-lg glass-input text-xs"
                    />
                  </div>

                  <div className="pt-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowNewProjModal(false)}
                      className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold text-xs"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-xs"
                    >
                      Publicar Projeto (+150 XP)
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* SEÇÃO 3: Placar Interclasses & Badges */}
          <div id="ranking" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Placar Interclasses (lg:col-span-7) */}
            <div className="lg:col-span-7 glass-panel p-5 sm:p-6 rounded-2xl border border-ocean-700/50 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span>Placar Interclasses: Ranking Geral</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Pontos obtidos com quizzes, missões de upcycling e kg de lixo mapeados.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Semana 4
                </span>
              </div>

              <div className="space-y-2">
                {CLASS_LEADERBOARDS.map((turma) => (
                  <div 
                    key={turma.rank}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      turma.rank === 1
                        ? 'bg-amber-500/10 border-amber-500/40 shadow-md shadow-amber-500/10'
                        : turma.rank === 2
                        ? 'bg-slate-900/90 border-slate-700/60'
                        : 'bg-slate-900/50 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-amber-400">
                        {turma.rank === 1 ? '🥇' : turma.rank === 2 ? '🥈' : turma.rank === 3 ? '🥉' : turma.rank}
                      </div>
                      <span className="text-lg">{turma.avatar}</span>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h4 className="text-xs font-bold text-white">{turma.className}</h4>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                            {turma.segment}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{turma.schoolName}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-cyan-300 block">{turma.points} XP</span>
                      <span className="text-[10px] text-slate-400">{turma.collectedEquivalentKg} kg equivalentes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges & Conquistas (lg:col-span-5) */}
            <div className="lg:col-span-5 glass-panel p-5 sm:p-6 rounded-2xl border border-ocean-700/50 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <span>Minhas Badges & Conquistas</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Insígnias ecológicas desbloqueadas no Bootcamp.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400">
                  {BADGES.filter(b => b.unlocked).length}/{BADGES.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-start space-x-3 p-3 rounded-xl border transition-all ${
                      badge.unlocked 
                        ? 'bg-slate-900/80 border-emerald-500/30 text-white' 
                        : 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="text-2xl shrink-0 p-1 bg-slate-800/80 rounded-lg">
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold truncate">{badge.name}</h4>
                        {badge.unlocked ? (
                          <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-semibold">
                            Conquistado
                          </span>
                        ) : (
                          <span className="text-[9px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                            Bloqueado
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300/80 leading-snug mt-0.5">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. VISÃO DO PROFESSOR */}
      {/* ============================================================== */}
      {activeTab === 'professor' && (
        <div className="space-y-10 animate-fade-in">
          {/* SEÇÃO 1: Planos de Aula Baseados nos Dados Locais */}
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Alinhado à BNCC & Dados Reais do Bairro</span>
              </div>
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>Planos de Aula Prontos para Aplicação</span>
              </h2>
              <p className="text-xs text-slate-400">
                Aulas interdisciplinares de Química, Biologia, Geografia e Sociologia (EJA) integrando os dados de vazamento mapeados no território escolar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LESSON_PLANS.map((plan) => (
                <div key={plan.id} className="glass-panel p-5 sm:p-6 rounded-2xl border border-ocean-700/50 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {plan.subject} • {plan.duration}
                      </span>
                      <span className="text-xs font-semibold text-emerald-400">{plan.targetAudience}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{plan.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{plan.summary}</p>

                    <div>
                      <span className="text-[11px] font-bold text-slate-200 block mb-1">Competências BNCC:</span>
                      <div className="flex flex-wrap gap-1">
                        {plan.bnccCompetencies.map((comp, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-cyan-300 border border-slate-700">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-200 block mb-1">Passo a Passo da Atividade:</span>
                      <div className="space-y-1.5 text-xs text-slate-300">
                        {plan.steps.map((st, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                            <strong className="text-cyan-400 block text-[11px]">{st.step}</strong>
                            <p className="text-[11px] text-slate-400 mt-0.5">{st.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Printer className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Imprimir Plano de Aula para a Coordenação</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEÇÃO 2: Emissão Automática de Certificados do Bootcamp */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Emissão Automática de Certificados do Bootcamp</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Gere certificados oficiais de participação com carga horária de 20 horas complementares para seus alunos.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCertificate(!showCertificate)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md transition-all self-start"
              >
                {showCertificate ? 'Ocultar Pré-visualização' : 'Gerar Certificado em Tela'}
              </button>
            </div>

            {/* Formulário de Configuração do Certificado */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome do(a) Aluno(a)</label>
                <input 
                  type="text" 
                  value={studentCertName}
                  onChange={(e) => setStudentCertName(e.target.value)}
                  className="w-full p-2.5 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Escola / Unidade Escolar</label>
                <input 
                  type="text" 
                  value={certSchoolName}
                  onChange={(e) => setCertSchoolName(e.target.value)}
                  className="w-full p-2.5 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Turma</label>
                <input 
                  type="text" 
                  value={certClass}
                  onChange={(e) => setCertClass(e.target.value)}
                  className="w-full p-2.5 rounded-lg glass-input text-xs"
                />
              </div>
            </div>

            {/* Certificado Renderizado Pronto para Impressão */}
            {showCertificate && (
              <div className="pt-4 space-y-4 animate-scale-up">
                <div className="print-page bg-slate-950 text-white p-8 sm:p-12 rounded-2xl border-4 border-double border-cyan-400/60 shadow-2xl relative overflow-hidden text-center space-y-6">
                  {/* Selo Decorativo */}
                  <div className="absolute top-4 right-4 opacity-15 text-6xl">🌊</div>
                  <div className="absolute bottom-4 left-4 opacity-15 text-6xl">🌿</div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-400">
                      OCEAN HACKATHON • PROGRAMA DE EDUCAÇÃO AMBIENTAL
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                      CERTIFICADO DE MÉRITO ECOLÓGICO
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Certificamos com distinção que o(a) estudante <strong className="text-cyan-300 underline font-bold">{studentCertName}</strong>, da turma <strong className="text-white">{certClass}</strong> da <strong className="text-white">{certSchoolName}</strong>, participou com êxito do Bootcamp Gamificado <strong className="text-emerald-400">"Capture the Leak"</strong>, atuando na triagem de dados de resíduos costeiros, cálculos de impacto ecológico e propostas de upcycling comunitário.
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Carga Horária</span>
                      <strong className="text-white text-sm">20 Horas</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Data de Emissão</span>
                      <strong className="text-white text-sm">{new Date().toLocaleDateString('pt-BR')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Autenticação Digital</span>
                      <strong className="text-emerald-400 text-sm font-mono">ECOLEAK-{Math.floor(100000 + Math.random() * 900000)}</strong>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-around text-xs text-slate-400 border-t border-slate-800/60">
                    <div className="border-t border-slate-600 pt-1 w-44">
                      <span>Coordenação Pedagógica</span>
                    </div>
                    <div className="border-t border-slate-600 pt-1 w-44">
                      <span>Equipe EcoLeak / ONGs</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 no-print">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-2.5 px-5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center space-x-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir Certificado (PDF)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
