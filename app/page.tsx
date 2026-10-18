'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Camera, 
  GraduationCap, 
  BarChart3, 
  Waves, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Award, 
  Users, 
  Scale, 
  Flame, 
  Leaf,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge Hackathon */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-lg shadow-emerald-500/10 backdrop-blur-md animate-float">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Ocean Hackathon MVP • Solução Completa</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-300 font-bold">Capture the Leak</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none max-w-5xl mx-auto">
            Da Foto do Mutirão ao{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-ocean-400 bg-clip-text text-transparent">
              Bootcamp nas Escolas
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            A plataforma que une <strong className="text-cyan-300">IA de Visão Computacional</strong> para triagem instantânea de lixo costeiro a um <strong className="text-emerald-300">Bootcamp Gamificado</strong> onde estudantes e turmas EJA transformam dados reais de poluição em projetos práticos de sustentabilidade e relatórios ESG auditáveis.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/campo"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>Experimentar IA de Campo</span>
            </Link>

            <Link
              href="/escola"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-200 glass-panel hover:bg-slate-800/80 border border-ocean-700/60 transition-all flex items-center justify-center space-x-2"
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Entrar no Bootcamp</span>
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="glass-panel p-4 rounded-xl border border-ocean-800/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Resíduos Mapeados</span>
              <span className="text-2xl font-black text-white">194.7 kg</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Triados por IA</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-ocean-800/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Turmas no Bootcamp</span>
              <span className="text-2xl font-black text-cyan-300">12 Turmas</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Fund. II, Médio e EJA</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-ocean-800/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">CO₂ Evitado Estimado</span>
              <span className="text-2xl font-black text-emerald-400">354 kg</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Desviado do oceano</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-ocean-800/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Taxa de Reciclabilidade</span>
              <span className="text-2xl font-black text-amber-400">86%</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Cooperativas locais</span>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos do MVP */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Os Três Módulos Essenciais da Solução
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            Projetados para atender aos voluntários em terra, às salas de aula e à governança corporativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Campo */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 flex flex-col justify-between group hover:border-emerald-400 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Módulo 1</span>
                <h3 className="text-xl font-bold text-white mt-1">App de Campo & IA de Visão</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Voluntários tiram fotos dos montes de lixo nos mutirões. A IA multimodal faz a triagem instantânea: tipos de polímeros (PET, PEAD, etc.), estimativa de peso, volume e risco ambiental.
              </p>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Captura móvel rápida com GPS automático</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Reconhecimento de polímeros e perigo marinho</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Confirmação e ajuste manual pelo voluntário</span>
                </li>
              </ul>
            </div>

            <Link
              href="/campo"
              className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Abrir App de Campo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Escola & Bootcamp */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 flex flex-col justify-between group hover:border-cyan-400 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Módulo 2</span>
                <h3 className="text-xl font-bold text-white mt-1">Bootcamp "Capture the Leak"</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Transforma o mapa de lixo do bairro em desafios gamificados para turmas do Fundamental II, Ensino Médio e EJA com quizzes, cálculo de ciclo de vida e propostas de upcycling.
              </p>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Mapa interativo de vazamentos do bairro</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Placar Interclasses & Badges gamificadas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Planos de aula BNCC & Certificados de 20h</span>
                </li>
              </ul>
            </div>

            <Link
              href="/escola"
              className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Acessar Bootcamp</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: B2B & Licenciamento */}
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 flex flex-col justify-between group hover:border-amber-400 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Módulo 3</span>
                <h3 className="text-xl font-bold text-white mt-1">B2B & Relatórios ESG</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Geração automatizada de relatórios em PDF com dados auditáveis de kg capturados, CO2 evitado e créditos circulares para órgãos públicos e patrocinadores.
              </p>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Gráficos de composição e evolução temporal</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Laudo de conformidade para órgãos ambientais</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Métricas de impacto para investidores ESG</span>
                </li>
              </ul>
            </div>

            <Link
              href="/b2b"
              className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Ver Relatório ESG</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona o Ciclo Circular */}
      <section className="py-16 bg-slate-950/60 border-y border-ocean-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              O Ciclo Virtuoso do "Capture the Leak"
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
              Como cada foto tirada por um voluntário vira aprendizado na escola e governança no município.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-2xl font-black text-cyan-400">01</span>
              <h4 className="text-sm font-bold text-white">Mutirão em Campo</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Voluntários e ONGs recolhem resíduos em praias e mangues e tiram uma foto pelo smartphone.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-2xl font-black text-emerald-400">02</span>
              <h4 className="text-sm font-bold text-white">Triagem por IA</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                A visão multimodal segmenta polímeros (PET, PEAD, etc.), calcula peso e identifica o risco.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-2xl font-black text-ocean-400">03</span>
              <h4 className="text-sm font-bold text-white">Bootcamp Escolar</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Os alunos analisam os vazamentos do próprio bairro, fazem cálculos e propõem upcycling.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-2xl font-black text-amber-400">04</span>
              <h4 className="text-sm font-bold text-white">Relatório Auditado</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Órgãos públicos e patrocinadores recebem relatórios em PDF com comprovação de impacto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
