import React from 'react';
import { DISEASES } from '../constants/diseases';
import { Activity, ShieldCheck, Zap, Database, ArrowRight, HeartPulse, Stethoscope, Award, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DiseaseSelection({ onSelect }) {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-8">
      
      {/* Clinical Hero Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0e7490] text-white p-8 md:p-10 shadow-xl border border-slate-800">
        
        {/* Subtle decorative grid/glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center space-x-2 bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border border-cyan-800/80 shadow-sm">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>ISMSCON–2026 Academic Research Study • SGPGIMS Lucknow</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Wellcore <span className="text-cyan-400">Clinical Early Disease Triage</span>
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-normal">
              An evidence-based biostatistical screening system designed to identify subclinical ("silent") disease progression across four major non-communicable conditions. Powered by multivariate correlation modeling and transparent Explainable AI (SHAP) feature attribution.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2.5 pt-2">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
              <span>Physician Decision Support</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>5-Fold Stratified Validation</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>N = 2,189 Clinical Profiles</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Low-Latency Bedside Triage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Box */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-5 md:p-6 shadow-sm flex items-start space-x-4">
        <div className="p-3 bg-blue-50 text-blue-700 rounded-xl shrink-0 mt-0.5 border border-blue-100">
          <FileText className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center space-x-2">
            <span>Clinical Biomarker Entry Standard</span>
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase">Protocol</span>
          </h3>
          <p>
            This platform analyzes quantitative physiological parameters—such as fasting plasma glucose, hemoglobin, serum creatinine, urine specific gravity, and spirometric FEV1—obtained from standard diagnostic lab panels.
          </p>
          <p className="text-slate-500 text-xs">
            For rapid live demonstration, each disease assessment form includes a <strong>"Load Sample Case Study"</strong> button to immediately populate verified clinical patient values.
          </p>
        </div>
      </div>

      {/* Disease Selection Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Select Diagnostic Module</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Choose an organ system module to perform patient risk stratification</p>
          </div>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">4 Validated Protocols</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DISEASES.map((disease) => {
            const Icon = disease.icon;
            return (
              <motion.button
                key={disease.id}
                onClick={() => onSelect(disease.id)}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.99 }}
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#0284c7] hover:shadow-xl transition-all duration-200 text-left flex items-start space-x-5 relative overflow-hidden"
              >
                {/* Active hover accent strip */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0284c7] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className={`p-3.5 rounded-xl ${disease.bg} flex items-center justify-center shrink-0 border border-slate-200 shadow-sm group-hover:scale-105 transition-transform`}>
                  {disease.image ? (
                    <img src={disease.image} alt={disease.name} className="h-14 w-14 object-contain" />
                  ) : (
                    <Icon className={`h-10 w-10 ${disease.color}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors truncate">
                      {disease.name}
                    </h3>
                    <span className="text-xs font-bold text-[#0284c7] opacity-0 group-hover:opacity-100 transition-opacity flex items-center shrink-0">
                      Triage <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {disease.description}
                  </p>
                  
                  <div className="mt-3 flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {disease.id === 'diabetes' ? 'Pima Cohort (n=768)' :
                       disease.id === 'heart' ? 'CAD Cohort (n=920)' :
                       disease.id === 'kidney' ? 'Renal Registry (n=400)' :
                       'COPD Cohort (n=101)'}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">
                      {disease.id === 'diabetes' ? 'AUC 0.833' :
                       disease.id === 'heart' ? 'AUC 0.785' :
                       disease.id === 'kidney' ? 'AUC 0.992' :
                       'F1 0.932'}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}
