import { Activity, Wind, Droplet, HeartPulse } from 'lucide-react';

export const DISEASES = [
  {
    id: 'diabetes',
    name: 'Type 2 Diabetes',
    icon: Droplet,
    image: '/diabetes-layout.png',
    color: 'text-red-500',
    bg: 'bg-red-50',
    description: 'Impaired Fasting Glycemia & Insulin Resistance Synergy'
  },
  {
    id: 'heart',
    name: 'Coronary Artery Disease',
    icon: HeartPulse,
    image: '/heart-layout.png',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    description: 'Subclinical Myocardial Ischemia & Chronotropic Reserve'
  },
  {
    id: 'kidney',
    name: 'Chronic Kidney Disease',
    icon: Activity,
    image: '/kidney-layout.png',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    description: 'Glomerular Filtration & Silent Renal Anemia Markers'
  },
  {
    id: 'lung',
    name: 'COPD & Respiratory Impairment',
    icon: Wind,
    image: '/lung-layout.png',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    description: 'Spirometric Airflow Limitation & Exertional Hypoxia'
  }
];

export const LOADING_PHASES = [
  "Validating clinical biomarkers against cohort reference boundaries...",
  "Computing cross-variable correlation indices & interaction terms...",
  "Executing multi-tree parametric risk calculation (ROC-AUC calibrated)...",
  "Decomposing marginal feature weights via Shapley Additive exPlanations (SHAP)..."
];
