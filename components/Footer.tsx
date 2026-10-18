import React from 'react';
import Link from 'next/link';
import { Waves, Heart, Shield, Award, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-ocean-900/60 bg-slate-950/80 backdrop-blur-md pt-12 pb-8 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-ocean-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Waves className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                EcoLeak
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma multimodal e gamificada para detecção de vazamento de resíduos costeiros, conectando voluntários de ONGs a escolas e comunidades através da IA de Visão Computacional.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <Award className="w-4 h-4" />
              <span>Ocean Hackathon Edition</span>
            </div>
          </div>

          {/* Módulos */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Módulos do Sistema</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/campo" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                  <span>› App de Campo & IA de Visão</span>
                </Link>
              </li>
              <li>
                <Link href="/escola" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                  <span>› Bootcamp & Mapa Interativo</span>
                </Link>
              </li>
              <li>
                <Link href="/escola#ranking" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                  <span>› Placar Interclasses & Badges</span>
                </Link>
              </li>
              <li>
                <Link href="/b2b" className="hover:text-amber-400 transition-colors flex items-center space-x-1.5">
                  <span>› Relatório ESG e Licenciamento</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ODS e Impacto */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">ODS da ONU Apoiados</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-ocean-950 text-cyan-300 border border-ocean-700/50">
                ODS 14: Vida na Água
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                ODS 12: Consumo Responsável
              </span>
              <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                ODS 4: Educação de Qualidade
              </span>
              <span className="px-2.5 py-1 rounded bg-teal-950 text-teal-300 border border-teal-700/50">
                ODS 11: Cidades Sustentáveis
              </span>
            </div>
          </div>

          {/* Tecnologia & Hackathon */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Tecnologia & Dados</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Desenvolvido com Next.js App Router, Tailwind CSS, IA Multimodal Gemini 1.5 Flash Vision, geolocalização e visualização espacial de vazamentos plásticos.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              <span>Status da API: </span>
              <span className="text-emerald-400 font-medium">● Operacional (IA Pronta)</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EcoLeak: Capture the Leak. Projeto Open-Source para Conservação Oceânica.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>para voluntários, escolas e o oceano.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
