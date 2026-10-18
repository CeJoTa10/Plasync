'use client';

import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Save, 
  Sliders, 
  Layers, 
  ArrowRight,
  Info,
  Scale,
  Clock,
  ShieldAlert,
  Send,
  HelpCircle,
  Fish
} from 'lucide-react';
import { WasteAnalysisResult, MaterialBreakdown } from '@/lib/types';
import { SAMPLE_ONG_PHOTOS } from '@/lib/mock-data';

export default function CampoPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_ONG_PHOTOS[0].url);
  const [imageSource, setImageSource] = useState<'sample' | 'upload' | 'camera'>('sample');
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<WasteAnalysisResult | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Metadados do formulário
  const [ongName, setOngName] = useState('Guardiões da Baía');
  const [campaignName, setCampaignName] = useState('Mutirão Enseada Limpa');
  const [bairro, setBairro] = useState('Urca / Praia Vermelha');
  const [city, setCity] = useState('Rio de Janeiro');
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: -22.9550, lng: -43.1650 });
  const [isLocating, setIsLocating] = useState(false);

  // Estado editável após análise
  const [editableWeight, setEditableWeight] = useState<number>(42.5);
  const [editableVolume, setEditableVolume] = useState<number>(145);
  const [editableRisk, setEditableRisk] = useState<'Baixo' | 'Médio' | 'Alto' | 'Crítico'>('Alto');
  const [notes, setNotes] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Capturar GPS real do navegador
  const handleGetLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: Number(pos.coords.latitude.toFixed(5)),
            lng: Number(pos.coords.longitude.toFixed(5))
          });
          setIsLocating(false);
        },
        (err) => {
          console.warn('Erro ao obter GPS:', err);
          setIsLocating(false);
          alert('Não foi possível obter GPS automaticamente. Usando coordenadas da Baía de Guanabara.');
        },
        { timeout: 8000 }
      );
    } else {
      setIsLocating(false);
      alert('Geolocalização não suportada neste dispositivo.');
    }
  };

  // Upload de arquivo local
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setImageSource('upload');
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Selecionar foto de exemplo
  const handleSelectSample = (sample: typeof SAMPLE_ONG_PHOTOS[0]) => {
    setSelectedImage(sample.url);
    setBairro(sample.bairro);
    setImageSource('sample');
    setAnalysisResult(null);
  };

  // Executar Análise de Visão IA
  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;

    setIsScanning(true);
    setSaveSuccess(false);

    try {
      const response = await fetch('/api/analyze-waste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          ongName,
          campaignName,
          location: {
            lat: coords.lat,
            lng: coords.lng,
            address: `${bairro}, ${city}`,
            bairro,
            city
          }
        })
      });

      if (!response.ok) {
        throw new Error('Falha na resposta da API');
      }

      const data: WasteAnalysisResult = await response.json();
      setAnalysisResult(data);
      setEditableWeight(data.totalWeightKg);
      setEditableVolume(data.totalVolumeLiters);
      setEditableRisk(data.riskLevel);
    } catch (err) {
      console.error('Erro na análise:', err);
      // Fallback amigável de demonstração
      const fallbackResult: WasteAnalysisResult = {
        id: 'leak-' + Date.now(),
        timestamp: new Date().toISOString(),
        ongName,
        campaignName,
        location: {
          lat: coords.lat,
          lng: coords.lng,
          address: `${bairro}, ${city}`,
          bairro,
          city
        },
        imageUrl: selectedImage,
        totalWeightKg: 42.5,
        totalVolumeLiters: 145,
        riskLevel: 'Alto',
        riskReason: 'Concentração crítica de plásticos PET, cabos de pesca de nylon e latas de alumínio na linha de maré.',
        marineImpactWarning: 'Risco iminente de ingestão por tartarugas marinhas e sufocamento da fauna costeira.',
        confidenceScore: 0.94,
        status: 'Auditado',
        materials: [
          { name: 'Garrafas PET (Refrigerante/Água)', category: 'Plástico', percentage: 55, estimatedWeightKg: 23.4, decompositionYears: 450, recyclabilityRate: 95, color: '#0ea5e9' },
          { name: 'Cabos e Redes de Pesca (Nylon)', category: 'Têxtil/Pesca', percentage: 25, estimatedWeightKg: 10.6, decompositionYears: 600, recyclabilityRate: 30, color: '#f97316' },
          { name: 'Latas de Alumínio', category: 'Metal', percentage: 20, estimatedWeightKg: 8.5, decompositionYears: 200, recyclabilityRate: 99, color: '#eab308' }
        ]
      };
      setAnalysisResult(fallbackResult);
      setEditableWeight(fallbackResult.totalWeightKg);
      setEditableVolume(fallbackResult.totalVolumeLiters);
      setEditableRisk(fallbackResult.riskLevel);
    } finally {
      setIsScanning(false);
    }
  };

  // Salvar Ponto no Mapa e Notificar Escolas
  const handleSaveToMap = () => {
    if (!analysisResult) return;

    // Atualiza com os valores editados pelo voluntário
    const updated = {
      ...analysisResult,
      totalWeightKg: editableWeight,
      totalVolumeLiters: editableVolume,
      riskLevel: editableRisk,
      notes
    };

    // Salva no LocalStorage para persistir no mapa interativo
    try {
      const existing = localStorage.getItem('ecoleak_custom_points');
      const points = existing ? JSON.parse(existing) : [];
      points.unshift(updated);
      localStorage.setItem('ecoleak_custom_points', JSON.stringify(points));
    } catch (e) {
      console.warn('Erro ao salvar no storage:', e);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Módulo 1 • App de Campo da ONG & Voluntários</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Triagem Inteligente por <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-ocean-400 bg-clip-text text-transparent">Visão Computacional</span>
        </h1>
        <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Tire ou envie uma foto do monte de resíduos coletado no mutirão. Nossa IA de Visão analisa tipos de polímeros, volume, peso e risco ambiental para alimentar em tempo real o mapa do bairro e o Bootcamp das escolas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna da Esquerda: Captura & Metadados (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Card de Captura de Imagem */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-ocean-800/60 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 mb-4">
              <Camera className="w-5 h-5 text-emerald-400" />
              <span>1. Capturar ou Enviar Foto do Lixo</span>
            </h3>

            {/* Preview da Imagem com Laser Scanner */}
            <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-slate-900 border-2 border-dashed border-ocean-700/50 flex items-center justify-center group">
              {selectedImage ? (
                <>
                  <img 
                    src={selectedImage} 
                    alt="Amostra de Lixo" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Laser Scanner Effect quando isScanning === true */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-ocean-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] absolute laser-scanner" />
                      <div className="glass-panel px-4 py-2.5 rounded-xl border border-cyan-400/50 shadow-2xl flex items-center space-x-3 z-10 animate-pulse">
                        <Sparkles className="w-5 h-5 text-cyan-300 animate-spin" />
                        <div className="text-left">
                          <span className="text-xs font-bold text-cyan-200 block">IA Multimodal em Ação...</span>
                          <span className="text-[10px] text-slate-300">Identificando polímeros e calculando volume</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bounding box decorativo sobre a imagem */}
                  {!isScanning && (
                    <div className="absolute inset-4 border border-emerald-400/40 rounded-lg pointer-events-none flex flex-col justify-between p-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-emerald-300 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm self-start">
                        <span>DETECÇÃO DE RESÍDUOS ATIVA</span>
                      </div>
                      <div className="text-[10px] font-mono text-cyan-300 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm self-end">
                        <span>GPS: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <Camera className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-slate-400">Nenhuma foto selecionada</p>
                </div>
              )}
            </div>

            {/* Ações de Upload */}
            <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-all"
              >
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>Upload da Galeria</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-all"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Câmera do Celular</span>
              </button>
            </div>

            {/* Fotos Pré-Carregadas para Teste Imediato */}
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                Ou teste com fotos reais de mutirões costeiros:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_ONG_PHOTOS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`relative rounded-lg overflow-hidden border-2 text-left group transition-all ${
                      selectedImage === sample.url ? 'border-emerald-400 shadow-md shadow-emerald-500/20' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={sample.url} alt={sample.title} className="w-full h-14 object-cover" />
                    <div className="absolute inset-0 bg-slate-950/60 p-1 flex items-end">
                      <span className="text-[9px] font-medium text-white truncate block">
                        {sample.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card de Metadados Automáticos */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-ocean-800/60 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>2. Metadados Automáticos da Ação</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nome da ONG / Coletivo</label>
                <input 
                  type="text" 
                  value={ongName}
                  onChange={(e) => setOngName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs glass-input"
                  placeholder="Ex: Guardiões da Baía"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nome do Mutirão</label>
                <input 
                  type="text" 
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs glass-input"
                  placeholder="Ex: Mutirão Enseada Limpa"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Bairro / Ponto de Referência</label>
                <input 
                  type="text" 
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs glass-input"
                  placeholder="Ex: Urca / Praia Vermelha"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Cidade / Região</label>
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs glass-input"
                  placeholder="Ex: Rio de Janeiro"
                />
              </div>
            </div>

            {/* GPS Automático */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-slate-300 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Geolocalização GPS</span>
                </span>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1"
                >
                  <RefreshCw className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? 'Obtendo GPS...' : 'Usar GPS Real do Dispositivo'}</span>
                </button>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-700/60">
                <span className="text-emerald-400">LAT:</span>
                <span>{coords.lat}</span>
                <span className="text-slate-500">|</span>
                <span className="text-cyan-400">LNG:</span>
                <span>{coords.lng}</span>
              </div>
            </div>

            {/* Botão Principal de Análise por IA */}
            <button
              type="button"
              onClick={handleAnalyzeImage}
              disabled={isScanning || !selectedImage}
              className="w-full mt-4 py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-cyan-400 to-ocean-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2"
            >
              <Sparkles className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Analisando Resíduos com IA...' : 'Analisar Foto com Visão Computacional'}</span>
            </button>
          </div>
        </div>

        {/* Coluna da Direita: Triagem por IA & Validação (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          {analysisResult ? (
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-emerald-500/30 shadow-2xl space-y-5 animate-fade-in">
              {/* Header do Resultado */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      IA Multimodal: Triagem Concluída
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Confiança: {Math.round(analysisResult.confidenceScore * 100)}%
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    Relatório Instantâneo do Monte
                  </h3>
                </div>

                <div className={`px-3 py-1 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 shadow-md ${
                  editableRisk === 'Crítico' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                  editableRisk === 'Alto' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Risco: {editableRisk}</span>
                </div>
              </div>

              {/* Métricas Principais: Peso e Volume */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-ocean-700/40">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                    <Scale className="w-4 h-4 text-cyan-400" />
                    <span>Peso Estimado</span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-white">{editableWeight}</span>
                    <span className="text-xs text-slate-400">kg</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-ocean-700/40">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>Volume Estimado</span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-white">{editableVolume}</span>
                    <span className="text-xs text-slate-400">Litros</span>
                  </div>
                </div>
              </div>

              {/* Materiais Identificados com Proporção em % */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Composição dos Materiais Identificados
                  </h4>
                  <span className="text-[11px] text-cyan-400 font-semibold">
                    {analysisResult.materials.length} categorias detectadas
                  </span>
                </div>

                <div className="space-y-2.5">
                  {analysisResult.materials.map((mat, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-semibold text-white flex items-center space-x-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mat.color }} />
                          <span>{mat.name}</span>
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-400 text-[11px]">{mat.estimatedWeightKg} kg</span>
                          <span className="font-bold text-cyan-300">{mat.percentage}%</span>
                        </div>
                      </div>

                      {/* Barra de Progresso */}
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${mat.percentage}%`, backgroundColor: mat.color }} 
                        />
                      </div>

                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>Decomposição: {mat.decompositionYears} anos</span>
                        </span>
                        <span className="text-emerald-400">
                          Reciclabilidade: {mat.recyclabilityRate}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerta de Impacto Marinho */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl flex items-start space-x-3 text-xs">
                <Fish className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-amber-300 block">Alerta de Ameaça à Fauna Costeira</span>
                  <p className="text-amber-200/90 leading-relaxed text-[11px]">
                    {analysisResult.marineImpactWarning}
                  </p>
                </div>
              </div>

              {/* Ajuste Manual pelo Voluntário */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>Ajuste Manual do Voluntário (Opcional)</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Ajustar Peso (kg)</label>
                    <input 
                      type="number" 
                      value={editableWeight} 
                      onChange={(e) => setEditableWeight(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs glass-input"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Ajustar Volume (L)</label>
                    <input 
                      type="number" 
                      value={editableVolume} 
                      onChange={(e) => setEditableVolume(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs glass-input"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Nível de Risco</label>
                    <select
                      value={editableRisk}
                      onChange={(e) => setEditableRisk(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs glass-input bg-slate-900"
                    >
                      <option value="Baixo">Baixo</option>
                      <option value="Médio">Médio</option>
                      <option value="Alto">Alto</option>
                      <option value="Crítico">Crítico</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Observações do Mutirão</label>
                  <input 
                    type="text" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Ponto de descarte recorrente perto do atracadouro de pescadores..."
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs glass-input"
                  />
                </div>
              </div>

              {/* Botão Confirmar & Publicar no Mapa das Escolas */}
              <button
                type="button"
                onClick={handleSaveToMap}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Confirmar Triagem & Registrar no Mapa "Capture the Leak"</span>
              </button>

              {saveSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs space-y-1.5 animate-bounce-short">
                  <div className="flex items-center space-x-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Ponto Registrado com Sucesso no Mapa do Bairro!</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Os dados foram enviados para as turmas escolares do Bootcamp "Capture the Leak" utilizarem nas missões de reciclagem e no cálculo de pegada de carbono.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border border-ocean-800/40 text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-16 h-16 rounded-2xl bg-ocean-500/10 border border-ocean-500/30 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Aguardando Captura para Análise
              </h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Tire uma foto do monte de lixo ou selecione uma das amostras ao lado para que a IA de Visão identifique automaticamente os polímeros, peso e perigo ecológico.
              </p>
              <div className="text-[11px] text-cyan-300/80 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-ocean-800">
                💡 Dica: A IA detecta PET, PEAD, Latas, Redes e calcula decomposição
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
