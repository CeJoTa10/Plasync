'use client';

import React, { useEffect, useState } from 'react';
import { WasteAnalysisResult } from '@/lib/types';
import { MapPin, AlertTriangle, ShieldCheck, Eye, Compass, Layers, CheckCircle } from 'lucide-react';

interface LeafletMapProps {
  points: WasteAnalysisResult[];
  selectedPoint: WasteAnalysisResult | null;
  onSelectPoint: (point: WasteAnalysisResult) => void;
}

export default function LeafletMap({ points, selectedPoint, onSelectPoint }: LeafletMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let mapInstance: any = null;

    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default;
       // Import leaflet css
// @ts-expect-error
await import('leaflet/dist/leaflet.css');

        const mapContainer = document.getElementById('ecoleak-map-container');
        if (!mapContainer) return;

        // Limpa se já existir instância
        // @ts-ignore
        if (mapContainer._leaflet_id) {
          // @ts-ignore
          mapContainer._leaflet_id = null;
        }

        const centerLat = selectedPoint ? selectedPoint.location.lat : -22.9150;
        const centerLng = selectedPoint ? selectedPoint.location.lng : -43.1900;

        mapInstance = L.map('ecoleak-map-container', {
          center: [centerLat, centerLng],
          zoom: 12,
          zoomControl: true,
          attributionControl: false
        });

        // OpenStreetMap Dark / CartoDB Dark Matter tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          subdomains: 'abcd',
        }).addTo(mapInstance);

        // Adiciona marcadores customizados
        points.forEach((pt) => {
          const isSelected = selectedPoint?.id === pt.id;
          const isCritical = pt.riskLevel === 'Crítico';
          const isHigh = pt.riskLevel === 'Alto';

          const markerColor = isCritical ? '#ef4444' : isHigh ? '#f97316' : '#10b981';

          const customIcon = L.divIcon({
            className: 'custom-leak-pin',
            html: `
              <div style="
                background: ${markerColor};
                width: ${isSelected ? '32px' : '26px'};
                height: ${isSelected ? '32px' : '26px'};
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 0 15px ${markerColor};
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 11px;
                cursor: pointer;
                transform: translate(-50%, -50%);
                transition: all 0.2s ease;
              ">
                ${pt.riskLevel === 'Crítico' ? '⚠️' : '📍'}
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          const marker = L.marker([pt.location.lat, pt.location.lng], { icon: customIcon }).addTo(mapInstance);

          marker.on('click', () => {
            onSelectPoint(pt);
          });
        });

        setMapInitialized(true);
      } catch (err) {
        console.error('Erro ao inicializar mapa Leaflet:', err);
      }
    };

    initMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [isClient, points, selectedPoint]);

  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden glass-panel border border-ocean-700/40 shadow-2xl">
      {/* Container Leaflet */}
      <div id="ecoleak-map-container" className="w-full h-full z-10" />

      {/* Floating Header */}
      <div className="absolute top-3 left-3 z-20 flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-xs">
        <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
        <span className="font-semibold text-slate-200">Mapa de Vazamento: Baía & Bairros</span>
        <span className="text-slate-500">|</span>
        <span className="text-emerald-400 font-bold">{points.length} Pontos Mapeados</span>
      </div>

      {/* Legenda de Risco */}
      <div className="absolute bottom-3 left-3 z-20 hidden sm:flex items-center space-x-3 bg-slate-950/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/60 text-[11px]">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
          <span className="text-slate-300">Crítico</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50" />
          <span className="text-slate-300">Alto</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          <span className="text-slate-300">Médio/Baixo</span>
        </div>
      </div>

      {/* Selected Point Badge Preview */}
      {selectedPoint && (
        <div className="absolute top-3 right-3 z-20 max-w-xs bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-ocean-500/50 shadow-xl animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block">
                {selectedPoint.ongName}
              </span>
              <h4 className="text-xs font-bold text-white line-clamp-1">
                {selectedPoint.location.address}
              </h4>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              selectedPoint.riskLevel === 'Crítico' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
              selectedPoint.riskLevel === 'Alto' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
              'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {selectedPoint.riskLevel}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300 border-t border-slate-800 pt-1.5">
            <span>Peso: <strong>{selectedPoint.totalWeightKg} kg</strong></span>
            <span>Volume: <strong>{selectedPoint.totalVolumeLiters} L</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}
