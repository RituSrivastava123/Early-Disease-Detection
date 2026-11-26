# Wellcore: Early Disease Detection Platform
## Correlation-Based Analysis of Silent Disease Progression: A Multi-Disease Clinical Feature Study

[![ISMSCON-2026](https://img.shields.io/badge/Conference-ISMSCON--2026%20SGPGIMS-navy?style=for-the-badge)](https://ismsconlucknow2026.com/)
[![Abstract ID](https://img.shields.io/badge/Abstract%20ID-ABS--ISMS26--0015-teal?style=for-the-badge)](https://ismsconlucknow2026.com/)
[![Presenter](https://img.shields.io/badge/Presenter-Ms.%20Ritu%20Srivastava-0284c7?style=for-the-badge)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

**Wellcore** is an evidence-based clinical decision-support and disease-screening platform presented at the **44th Annual National Conference of the Indian Society for Medical Statistics (ISMSCON–2026)** held at the **Sanjay Gandhi Postgraduate Institute of Medical Sciences (SGPGIMS), Lucknow, India** (November 26–28, 2026).

The platform leverages multi-cohort bivariate and multivariate correlation modeling to identify early subclinical ("silent") pathophysiological shifts across four vital organ systems before irreversible anatomical or functional deterioration occurs.

---

## 🔬 Scientific Background & Clinical Rationale

Non-communicable diseases (NCDs) such as **Type 2 Diabetes Mellitus**, **Chronic Kidney Disease (CKD)**, **Coronary Artery Disease (CAD)**, and **Chronic Obstructive Pulmonary Disease (COPD)** frequently undergo asymptomatic latent phases lasting 5 to 10 years. In resource-constrained and high-volume clinical settings, patients often present to tertiary care hospitals only when advanced organ damage has developed.

Conventional diagnostic triage relies heavily on single-parameter threshold tests (e.g., isolated fasting plasma glucose or serum creatinine). This study demonstrates that **multivariate biomarker covariance networks** capture subclinical risk trajectories significantly earlier than univariable cutoffs.

---

## 📊 Study Cohorts & Biostatistical Correlation Profile

The platform models clinical and biochemical parameters across **2,189 harmonized patient records**:

| Disease Module | Cohort ($n$) | Primary Biomarkers | Key Correlation ($r$ / $\rho$) | Diagnostic AUC |
| :--- | :---: | :--- | :--- | :---: |
| **Type 2 Diabetes** | $n = 768$ | Fasting Glucose, BMI, Insulin, Age, Blood Pressure, Pedigree (DPF) | Glucose ($+0.467^{***}$), BMI ($+0.293^{***}$), Age ($+0.238^{***}$) | **0.833** |
| **Coronary Artery Disease** | $n = 920$ | Resting BP, Chol, Max Heart Rate, ST Depression ($oldpeak$), Fluo. Vessels ($ca$) | Defect ($+0.499^{***}$), Chest Pain ($+0.472^{***}$), Max HR ($-0.395^{***}$) | **0.785** |
| **Chronic Kidney Disease** | $n = 400$ | Serum Creatinine, Blood Urea, Albumin, Specific Gravity, Hemoglobin, PCV | Hemoglobin ($-0.769^{***}$), PCV ($-0.741^{***}$), Spec. Gravity ($-0.732^{***}$) | **0.992** |
| **COPD / Lung Disease** | $n = 101$ | $\text{FEV}_1$, $\text{FEV}_1\%$ pred, FVC, 6-Min Walk Test ($MWT$), Pack-Years | $\text{FEV}_1\%$ pred ($-0.865^{***}$), 6MWT ($-0.418^{***}$), SGRQ ($+0.328^{***}$) | **0.914** |

$***p < 0.001$; statistical significance confirmed via two-tailed Student's $t$-test and permutation analysis.

### Key Biostatistical Insights:
1. **Insulin Resistance Synergy:** Interaction modeling of $\text{Glucose} \times \text{BMI}$ accounts for 23.1% of predictive tree splits, confirming supra-additive metabolic risk.
2. **Chronotropic Incompetence:** Peak exercise heart rate ($thalach$) exhibits a significant inverse correlation ($r = -0.395, p < 0.001$), reflecting early autonomic and vascular stiffening before overt angina.
3. **Silent Renal Anemia:** Erythropoietin hyposecretion reflected by hemoglobin ($r = -0.769$) and packed cell volume ($r = -0.741$) precedes acute serum creatinine elevation in asymptomatic CKD progression.
4. **Subclinical Functional Loss:** Decline in 6-minute walk distance ($r = -0.418$) detects physiological limitation prior to subjective dyspnea reporting.

---

## 🛠️ Machine Learning & Diagnostic Validation

- **Validation Protocol:** Stratified 5-Fold Cross-Validation with strict imputer and pipeline enclosure to prevent data leakage.
- **Algorithms:** Extreme Gradient Boosting (XGBoost), LightGBM, and Support Vector Classifiers.
- **Screening Calibration:** Decision threshold calibrated to $\tau = 0.40$ (40%) to prioritize sensitivity and minimize Type II errors (false negatives) in asymptomatic community triage.
- **Explainable AI (SHAP):** Local Interpretable Explanations based on Shapley additive values ($f(x) = \phi_0 + \sum_{i=1}^M \phi_i$). Dynamic partitioning into **Risk Increasers** and **Protective Factors** provides transparent bedside clinical justification.

---

## 🌐 Dual-Mode Deployment Architecture

Wellcore features a resilient dual-mode operational architecture designed for seamless clinical and conference demonstration:

1. **Full-Stack Mode:** Connects to the Python Flask microservice utilizing trained scikit-learn/XGBoost `.pkl` models and SHAP kernel explainers.
2. **Edge Biostatistical Mode (Offline & Netlify-Ready):** When deployed to static edge hosting (Netlify) or operating without internet connectivity, the embedded client-side inference engine (`clinicalInferenceEngine.js`) executes validated parametric equations, delivering identical risk scoring, clinical factor rankings, and recommendations without downtime or connection errors.

---

## 🚀 Deployment Instructions

### Option 1: 30-Second Drag & Drop Deployment on Netlify
1. Open **[https://app.netlify.com/drop](https://app.netlify.com/drop)** in your browser.
2. Drag and drop the **`dist`** folder from the project directory directly into the Netlify upload pane.
3. Your live application will be instantly deployed with an active HTTPS URL.

### Option 2: 1-Click Local Offline Demo
On Windows machines, simply double-click:
```cmd
Run_Demo_Local.bat
```
This automatically launches a local web server and opens the platform in your browser at `http://localhost:8080`.

### Option 3: Full-Stack Local Development
```bash
# 1. Clone repository
git clone https://github.com/RituSrivastava123/Early-Disease-Detection.git
cd Early-Disease-Detection

# 2. Start Backend (Flask)
cd backend
python -m venv venv
venv\Scripts\activate      # On Windows
pip install -r requirements.txt
python app.py

# 3. Start Frontend (React + Vite)
cd ../frontend
npm install
npm run dev
```

---

## 📑 Conference Presentation Deck

The complete academic presentation slide deck prepared for **ISMSCON–2026** is titled:
**`ISMSCON2026_Correlation_Analysis_Silent_Disease.pptx`**

- **Slide 1:** Title Slide (SGPGIMS Lucknow, ISMSCON-2026, Abstract ABS-ISMS26-0015)
- **Slide 2:** Background & Clinical Rationale (The Asymptomatic Latency Burden in India)
- **Slide 3:** Study Datasets & Cohort Characterization ($n = 2,189$ Patient Records)
- **Slide 4:** Biostatistical Methodology & Correlation Profiles across 4 Organ Systems
- **Slide 5:** 5-Fold Stratified Cross-Validation Benchmarks & Threshold Calibration ($\tau = 0.40$)
- **Slide 6:** Model Interpretability & SHAP Feature Attribution for Attending Clinicians
- **Slide 7:** Translational Impact, Platform Deployment & Institutional Conclusions

*Includes comprehensive oral speaker notes embedded on every slide.*

---

## 🏛️ Acknowledgments & Citation

- **Indian Society for Medical Statistics (ISMS)** — 44th Annual Conference (ISMSCON–2026)
- **Sanjay Gandhi Postgraduate Institute of Medical Sciences (SGPGIMS)**, Lucknow, Uttar Pradesh, India
- **Department of Biostatistics & Health Informatics**, SGPGIMS Lucknow

```bibtex
@inproceedings{srivastava2026correlation,
  title={Correlation-Based Analysis of Silent Disease Progression: A Multi-Disease Clinical Feature Study},
  author={Srivastava, Ritu},
  booktitle={Proceedings of the 44th Annual Conference of the Indian Society for Medical Statistics (ISMSCON-2026)},
  year={2026},
  address={SGPGIMS, Lucknow, India},
  note={Abstract ID: ABS-ISMS26-0015}
}
```

---

## ⚖️ Clinical Disclaimer
Wellcore is an academic research and clinical decision-support screening tool. It is designed to assist healthcare professionals in risk stratification and does not replace professional diagnostic evaluation, pathological laboratory confirmation, or formal medical consultation.
