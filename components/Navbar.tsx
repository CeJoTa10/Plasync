'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Camera, 
  GraduationCap, 
  BarChart3, 
  Waves, 
  Compass, 
  Sparkles, 
  Menu, 
  X,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: '/',
      label: 'Início',
      icon: Compass,
      badge: null
    },
    {
      href: '/campo',
      label: 'App de Campo (ONG)',
      icon: Camera,
      badge: 'IA Visão'
    },
    {
      href: '/escola',
      label: 'Bootcamp "Capture the Leak"',
      icon: GraduationCap,
      badge: 'Gamificado'
    },
    {
      href: '/b2b',
      label: 'Relatório ESG & B2B',
      icon: BarChart3,
      badge: 'Auditável'
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-ocean-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-ocean-500 to-cyan-400 p-0.5 shadow-lg shadow-ocean-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Waves className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-300 to-ocean-400 bg-clip-text text-transparent">
                EcoLeak
              </span>
              <span className="ml-1 text-xs font-semibold text-ocean-300 tracking-wider uppercase block -mt-1">
                Capture the Leak
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-ocean-600/20 text-cyan-300 border border-ocean-500/30 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Hackathon Tag */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 text-xs text-slate-300 bg-slate-900/60 border border-slate-700/60 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-medium text-emerald-300">Ocean Hackathon</span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-300">MVP 1.0</span>
            </div>

            <Link
              href="/campo"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Camera className="w-4 h-4" />
              <span>Nova Coleta</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/campo"
              className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              title="Nova Coleta"
            >
              <Camera className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-ocean-800/40 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-ocean-600/20 text-cyan-300 border border-ocean-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
