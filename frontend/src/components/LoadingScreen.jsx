import React from 'react';
import { LOADING_PHASES } from '../constants/diseases';
import { Stethoscope, Activity } from 'lucide-react';

export default function LoadingScreen({ loadingPhase }) {
  return (
    <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in zoom-in-95 duration-400">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-[#0284c7] animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-[#0284c7]">
          <Activity className="w-6 h-6 animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-3 max-w-md">
        <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200 uppercase tracking-wider">
          <Stethoscope className="w-3 h-3" />
          <span>Biostatistical Triage Engine</span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Analyzing Clinical Biomarkers</h3>
        
        <div className="space-y-2 text-left mx-auto pt-2">
          {LOADING_PHASES.map((phase, idx) => (
            <div key={idx} className={`flex items-center space-x-3 text-xs sm:text-sm transition-all duration-300 ${idx === loadingPhase ? 'text-slate-900 font-bold scale-[1.01]' : idx < loadingPhase ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
              <div className={`h-2 w-2 rounded-full shrink-0 ${idx === loadingPhase ? 'bg-[#0284c7] animate-ping' : idx < loadingPhase ? 'bg-emerald-600' : 'bg-slate-300'}`}></div>
              <span>{phase}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
