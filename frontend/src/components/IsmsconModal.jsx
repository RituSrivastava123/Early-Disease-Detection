import React, { useState } from 'react';
import { X, Award, BarChart3, TrendingUp, CheckCircle2, FileText, Database, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CORRELATION_DATA = {
  diabetes: {
    title: "Type 2 Diabetes (Pima Metabolic Cohort, n = 768)",
    target: "Binary Outcome (Diabetic vs Non-Diabetic)",
    auc: "0.833",
    sensitivity: "67.2%",
    specificity: "81.4%",
    correlations: [
      { feature: "Plasma Fasting Glucose", r: "+0.467", p: "< 0.001", role: "Primary metabolic driver" },
      { feature: "Body Mass Index (BMI)", r: "+0.293", p: "< 0.001", role: "Adiposity & insulin resistance" },
      { feature: "Patient Age", r: "+0.238", p: "< 0.001", role: "Beta-cell secretory decline" },
      { feature: "Pregnancies (Parity)", r: "+0.222", p: "< 0.001", role: "Gestational metabolic stress" },
      { feature: "Diabetes Pedigree (DPF)", r: "+0.174", p: "< 0.001", role: "Genetic familial liability" },
      { feature: "Fasting Serum Insulin", r: "+0.131", p: "0.002", role: "Compensatory hyperinsulinemia" }
    ],
    insight: "The interaction term (Glucose × BMI) accounts for 23.1% of predictive split weight, confirming that simultaneous adiposity and glycemic elevation creates synergistic risk beyond linear additive models."
  },
  heart: {
    title: "Coronary Artery Disease (CAD Cohort, n = 920)",
    target: "Angiographic Disease Burden (Stages 0-4)",
    auc: "0.785",
    sensitivity: "78.4%",
    specificity: "83.6%",
    correlations: [
      { feature: "Thallium Defect (thal)", r: "+0.499", p: "< 0.001", role: "Fixed/reversible myocardial ischemia" },
      { feature: "Chest Pain Type (cp_4.0)", r: "+0.472", p: "< 0.001", role: "Asymptomatic ischemia representation" },
      { feature: "Exercise-Induced Angina", r: "+0.464", p: "< 0.001", role: "Exertional coronary hypoperfusion" },
      { feature: "Major Vessels Colored (ca)", r: "+0.456", p: "< 0.001", role: "Coronary calcification burden" },
      { feature: "ST Depression (oldpeak)", r: "+0.386", p: "< 0.001", role: "Subendocardial ischemic response" },
      { feature: "Max Heart Rate (thalach)", r: "-0.395", p: "< 0.001", role: "Chronotropic incompetence marker" }
    ],
    insight: "Peak exercise heart rate shows an inverse correlation (r = -0.395, p < 0.001). Chronotropic incompetence frequently manifests in subclinical CAD long before overt anginal symptoms emerge."
  },
  kidney: {
    title: "Chronic Kidney Disease (Renal Registry, n = 400)",
    target: "CKD Stage 1-5 vs Healthy Control",
    auc: "0.992",
    sensitivity: "98.4%",
    specificity: "99.0%",
    correlations: [
      { feature: "Hemoglobin (hemo)", r: "-0.769", p: "< 0.001", role: "Early renal anemia hallmark" },
      { feature: "Packed Cell Volume (pcv)", r: "-0.741", p: "< 0.001", role: "Hematocrit concentration drop" },
      { feature: "Specific Gravity (sg)", r: "-0.732", p: "< 0.001", role: "Loss of tubular concentration capacity" },
      { feature: "Albuminuria (al)", r: "+0.627", p: "< 0.001", role: "Glomerular basement membrane leakage" },
      { feature: "Blood Glucose Random (bgr)", r: "+0.420", p: "< 0.001", role: "Diabetic nephropathy driver" },
      { feature: "Serum Creatinine (sc)", r: "+0.300", p: "< 0.001", role: "Glomerular filtration degradation" }
    ],
    insight: "Hemoglobin (r = -0.769) and urine specific gravity (r = -0.732) correlate more strongly with early CKD onset than serum creatinine alone (r = 0.300), showing silent erythropoietin deficiency precedes azotemic spikes."
  },
  lung: {
    title: "Chronic Obstructive Pulmonary Disease (COPD, n = 101)",
    target: "Spirometric Airflow Limitation Severity",
    auc: "0.914",
    sensitivity: "91.8%",
    specificity: "92.5%",
    correlations: [
      { feature: "FEV1% Predicted (FEV1PRED)", r: "-0.865", p: "< 0.001", role: "Primary expiratory airflow limitation" },
      { feature: "FEV1 Absolute Volume (L)", r: "-0.768", p: "< 0.001", role: "Forced expiratory capacity loss" },
      { feature: "FVC% Predicted (FVCPRED)", r: "-0.643", p: "< 0.001", role: "Lung volume restriction" },
      { feature: "6-Minute Walk Distance (MWT)", r: "-0.418", p: "< 0.001", role: "Functional exercise intolerance" },
      { feature: "SGRQ Symptom Score", r: "+0.328", p: "< 0.001", role: "Quality-of-life health impairment" },
      { feature: "Smoking Pack-Years", r: "+0.067", p: "0.048", role: "Cumulative airway inflammatory injury" }
    ],
    insight: "Spirometric FEV1% predicted drops dramatically (r = -0.865) alongside functional walk distance (r = -0.418), exposing silent pulmonary capacity reduction prior to self-reported dyspnea."
  }
};

export default function IsmsconModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('diabetes');

  if (!isOpen) return null;

  const current = CORRELATION_DATA[activeTab];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-4xl bg-[#fdfbf7] rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-[#122644] text-white px-6 py-5 flex items-start justify-between border-b border-neutral-800">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 bg-cyan-950/80 text-cyan-300 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase border border-cyan-800/60">
                <Award className="h-3.5 w-3.5 mr-1" /> ISMSCON-2026 • SGPGIMS LUCKNOW
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Correlation-Based Analysis of Silent Disease Progression
              </h2>
              <p className="text-neutral-300 text-xs sm:text-sm">
                Scientific Presentation: Abstract ID <span className="font-semibold text-cyan-300">ABS-ISMS26-0015</span> • Presenter: <span className="font-semibold text-white">Ms. Ritu Srivastava</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Sub Navigation Bar */}
          <div className="bg-[#ece4d4] px-6 py-3 border-b border-neutral-300/80 flex items-center space-x-2 overflow-x-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 mr-2 flex items-center">
              <BarChart3 className="h-4 w-4 mr-1.5 text-neutral-700" /> Disease Cohorts:
            </span>
            {[
              { id: 'diabetes', label: 'Diabetes (n=768)' },
              { id: 'heart', label: 'Heart CAD (n=920)' },
              { id: 'kidney', label: 'Kidney CKD (n=400)' },
              { id: 'lung', label: 'Lung COPD (n=101)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#122644] text-white shadow-sm'
                    : 'bg-white/70 text-neutral-700 hover:bg-white hover:text-neutral-900 border border-neutral-300/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-neutral-800">
            {/* Top Stat Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200/90 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Validation ROC-AUC</div>
                <div className="text-2xl font-black text-[#122644] mt-0.5">{current.auc}</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">5-Fold Stratified CV</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200/90 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Sensitivity (Recall)</div>
                <div className="text-2xl font-black text-[#122644] mt-0.5">{current.sensitivity}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">At screening cutoff τ=0.40</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200/90 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Clinical Specificity</div>
                <div className="text-2xl font-black text-[#122644] mt-0.5">{current.specificity}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">True negative rate</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200/90 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Methodological Engine</div>
                <div className="text-sm font-bold text-teal-800 mt-1">XGBoost / LightGBM</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">+ SHAP Attribution</div>
              </div>
            </div>

            {/* Correlation Table */}
            <div className="bg-white rounded-xl border border-neutral-200/90 shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 bg-neutral-100/70 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-teal-700" />
                  Key Clinical Feature Correlations ({current.title})
                </h3>
                <span className="text-xs font-medium text-neutral-500">Pearson r / Spearman ρ</span>
              </div>
              <div className="divide-y divide-neutral-100">
                {current.correlations.map((item, idx) => (
                  <div key={idx} className="px-5 py-2.5 flex items-center justify-between text-xs sm:text-sm hover:bg-neutral-50/80">
                    <div className="font-semibold text-neutral-800 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                      <span>{item.feature}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-neutral-500 text-xs hidden sm:inline">{item.role}</span>
                      <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded text-xs">
                        {item.r}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono w-14 text-right">
                        {item.p}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Insight Callout */}
            <div className="bg-[#f0f6ff] border border-blue-200 rounded-xl p-4 text-xs sm:text-sm text-neutral-800 space-y-1">
              <div className="font-bold text-[#122644] flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-700" /> Biostatistical & Pathophysiological Correlation Insight:
              </div>
              <p className="leading-relaxed text-neutral-700">
                {current.insight}
              </p>
            </div>

            {/* Conference Presentation Summary Footnote */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-200 text-xs text-neutral-500">
              <span>Presented at ISMSCON-2026, SGPGIMS Lucknow (Nov 26-28, 2026)</span>
              <span className="font-semibold text-neutral-700">Presenter: Ms. Ritu Srivastava</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
