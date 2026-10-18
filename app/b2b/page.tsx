'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  Leaf, 
  Waves, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Scale, 
  Droplet, 
  Share2,
  TreeDeciduous,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  AreaChart, 
  Area 
} from 'recharts';

export default function B2BPage() {
  const [reportPeriod, setReportPeriod] = useState('Outubro / 2026');
  const [entityName, setEntityName] = useState('Consórcio Baía Viva & Parceiros');
  const [showPrintView, setShowPrintView] = useState(false);

  // Métricas Consolidadas
  const totalKg = 194.7;
  const recyclabilityRate = 86; // %
  const co2AvoidedKg = Math.round(totalKg * 1.82); // ~354 kg de CO2
  const waterSavedLiters = Math.round(totalKg * 26.5); // ~5,160 litros de água
  const equivalentTrees = (co2AvoidedKg / 22).toFixed(1); // 1 árvore compensa ~22kg CO2/ano

  // Dados para Gráficos
  const wasteComposition = [
    { name: 'Plásticos (PET/PEAD/PP)', value: 110.5, color: '#0ea5e9' },
    { name: 'Metais (Alumínio/Aço)', value: 34.2, color: '#eab308' },
    { name: 'Redes de Pesca (Nylon)', value: 24.1, color: '#f97316' },
    { name: 'Vidro', value: 16.8, color: '#10b981' },
    { name: 'Outros Rejeitos', value: 9.1, color: '#94a3b8' }
  ];

  const monthlyEvolution = [
    { month: 'Jul', kg: 65, co2: 118 },
    { month: 'Ago', kg: 110, co2: 200 },
    { month: 'Set', kg: 145, co2: 264 },
    { month: 'Out', kg: 195, co2: 354 }
  ];

  const zoneRiskData = [
    { zone: 'Praia Vermelha / Urca', totalKg: 48.5, risk: 'Alto' },
    { zone: 'Foz do Canal do Mangue', totalKg: 112.0, risk: 'Crítico' },
    { zone: 'Orla da Lagoa', totalKg: 34.2, risk: 'Médio' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Módulo 3 • B2B, Licenciamento Ambiental & Governança ESG</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Painel de Impacto & <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">Relatório ESG</span>
          </h1>
          <p className="mt-1 text-slate-300 text-sm max-w-2xl">
            Dados auditáveis de captura de resíduos, créditos de reciclabilidade e métricas de emissões evitadas para órgãos públicos, diretorias de ensino e empresas patrocinadoras.
          </p>
        </div>

        {/* Botão de Exportação */}
        <button
          type="button"
          onClick={() => {
            setShowPrintView(true);
            setTimeout(() => window.print(), 200);
          }}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 shadow-lg shadow-amber-500/20 transition-all self-start md:self-auto no-print"
        >
          <FileText className="w-4 h-4" />
          <span>Gerar Relatório de Licenciamento / ESG (PDF)</span>
        </button>
      </div>

      {/* KPI Cards de Impacto */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-5 rounded-2xl border border-ocean-700/50 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Recolhido</span>
            <Scale className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-black text-white">{totalKg}</span>
            <span className="text-xs text-slate-400 font-semibold">kg</span>
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center space-x-1 font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>+34% em relação ao mês anterior</span>
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-emerald-700/50 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>CO₂ Evitado Estimado</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-black text-emerald-400">{co2AvoidedKg}</span>
            <span className="text-xs text-slate-400 font-semibold">kg CO₂e</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            ≈ {equivalentTrees} árvores adultas preservadas/ano
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-cyan-700/50 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Água Doce Poupada</span>
            <Droplet className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-black text-cyan-300">{waterSavedLiters.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-semibold">Litros</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Evitado em extração de polímeros virgens
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-700/50 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Taxa de Reciclabilidade</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-black text-amber-400">{recyclabilityRate}%</span>
            <span className="text-xs text-slate-400 font-semibold">auditável</span>
          </div>
          <span className="text-[11px] text-emerald-400 block font-semibold">
            Destinado para cooperativas locais
          </span>
        </div>
      </div>

      {/* Gráficos de Visualização ESG (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Composição de Resíduos (lg:col-span-6) */}
        <div className="lg:col-span-6 glass-panel p-5 sm:p-6 rounded-2xl border border-ocean-700/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Composição de Resíduos Capturados</h3>
              <p className="text-xs text-slate-400">Classificação por categoria e peso relativo</p>
            </div>
            <span className="text-xs font-semibold text-cyan-400 bg-ocean-950 px-2.5 py-1 rounded-lg border border-ocean-800">
              {totalKg} kg Total
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteComposition}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {wasteComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {wasteComposition.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="flex items-center space-x-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 truncate">{item.name}</span>
                </span>
                <span className="font-bold text-white shrink-0 ml-1">{item.value} kg</span>
              </div>
            ))}
          </div>
        </div>

        {/* Evolução de Captura e CO2 (lg:col-span-6) */}
        <div className="lg:col-span-6 glass-panel p-5 sm:p-6 rounded-2xl border border-ocean-700/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Evolução Mensal de Vazamento Mitigado</h3>
              <p className="text-xs text-slate-400">Volume de lixo desviado do mar e impacto de carbono</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
              Tendência Positiva
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyEvolution}>
                <defs>
                  <linearGradient id="colorKg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="kg" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorKg)" name="Lixo Coletado (kg)" />
                <Area type="monotone" dataKey="co2" stroke="#10b981" fillOpacity={1} fill="url(#colorCo2)" name="CO2 Evitado (kg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="flex justify-between font-semibold">
              <span className="text-cyan-400">Taxa de Crescimento de Coletas:</span>
              <span>+200% em 90 dias</span>
            </div>
            <p className="text-[11px] text-slate-400">
              O envolvimento contínuo de novas turmas de escolas e ONGs aumentou a cobertura de monitoramento em 3 novas sub-bacias hidrográficas.
            </p>
          </div>
        </div>
      </div>

      {/* Relatório Imprimível Formatado (A4 Auditável para Órgãos Públicos e Patrocinadores) */}
      <div className="glass-panel p-6 sm:p-10 rounded-2xl border-2 border-emerald-500/40 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Laudo Oficial de Auditoria Socioambiental
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Relatório de Licenciamento & Impacto ESG: "Capture the Leak"
            </h2>
          </div>

          <div className="flex items-center space-x-2 no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center space-x-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>
          </div>
        </div>

        {/* Metadados Auditáveis */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-500 text-[10px] block">Período de Referência</span>
            <strong className="text-white">{reportPeriod}</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Entidade Proponente</span>
            <strong className="text-white">{entityName}</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Protocolo Blockchain / Hash</span>
            <strong className="text-cyan-400 font-mono text-[11px]">0x7F2...b84C</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Status de Conformidade</span>
            <strong className="text-emerald-400">100% Auditado</strong>
          </div>
        </div>

        {/* Resumo Executivo */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <h4 className="font-bold text-white uppercase text-xs tracking-wider text-slate-200">
            1. Resumo Executivo
          </h4>
          <p>
            No período de monitoramento correspondente, a iniciativa articulou 3 organizações da sociedade civil e 5 turmas escolares (com ênfase na Educação de Jovens e Adultos - EJA e Ensino Fundamental II). Através do aplicativo de IA de Visão Computacional EcoLeak, foram mapeados e recolhidos com precisão cirúrgica <strong>{totalKg} kg</strong> de resíduos sólidos costeiros com elevado risco de fragmentação marinha.
          </p>
        </div>

        {/* Tabela de Zonas e Conformidade */}
        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase text-xs tracking-wider text-slate-200">
            2. Mapeamento Territorial e Destinação
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-slate-400 font-semibold">
                <tr>
                  <th className="p-3">Zona Costeira / Bairro</th>
                  <th className="p-3">Volume Coletado (kg)</th>
                  <th className="p-3">Risco Mitigado</th>
                  <th className="p-3">Destinação Final</th>
                  <th className="p-3 text-right">Crédito Circular</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {zoneRiskData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="p-3 font-semibold text-white">{row.zone}</td>
                    <td className="p-3">{row.totalKg} kg</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.risk === 'Crítico' ? 'bg-red-500/20 text-red-300' :
                        row.risk === 'Alto' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {row.risk}
                      </span>
                    </td>
                    <td className="p-3 text-cyan-300">Cooperativas de Catadores Parceiras</td>
                    <td className="p-3 text-right font-mono text-emerald-400 font-bold">
                      +{(row.totalKg * 1.5).toFixed(0)} ECO-CRED
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rodapé do Laudo com Assinaturas */}
        <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-slate-400">
          <div>
            <div className="border-t border-slate-700 pt-2 font-semibold text-slate-300">
              Dr. Maurício Rocha
            </div>
            <span className="text-[10px] text-slate-500">Perito Ambiental & Oceanógrafo</span>
          </div>

          <div>
            <div className="border-t border-slate-700 pt-2 font-semibold text-slate-300">
              Conselho de Gestão EcoLeak
            </div>
            <span className="text-[10px] text-slate-500">Comitê de Ética e Transparência</span>
          </div>

          <div>
            <div className="border-t border-slate-700 pt-2 font-semibold text-emerald-400 font-mono">
              VALIDAÇÃO DIGITAL OK
            </div>
            <span className="text-[10px] text-slate-500">Chave Criptográfica SHA-256</span>
          </div>
        </div>
      </div>
    </div>
  );
}
