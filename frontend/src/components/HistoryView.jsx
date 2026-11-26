import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Activity, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, FileSpreadsheet, Trash2, Calendar } from 'lucide-react';

const DEFAULT_CLINICAL_HISTORY = [
  {
    id: 'hist_diab_01',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    disease: 'diabetes',
    risk_score: 74,
    status: 'High Risk (Metabolic Indication)',
    input_data: {
      age: 48,
      glucose: 168,
      bmi: 33.2,
      bp: 138,
      insulin: 152,
      dpf: 0.62,
      pregnancies: 2
    }
  },
  {
    id: 'hist_cad_02',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    disease: 'heart',
    risk_score: 22,
    status: 'Low Risk (Normal Perfusion)',
    input_data: {
      age: 42,
      sex: 0,
      trestbps: 118,
      chol: 188,
      thalach: 164,
      oldpeak: 0.2,
      exang: 0,
      cp: 1
    }
  },
  {
    id: 'hist_ckd_03',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    disease: 'kidney',
    risk_score: 14,
    status: 'Low Risk (Normal Filtration)',
    input_data: {
      age: 38,
      bp: 76,
      hemo: 14.2,
      sc: 0.9,
      sg: 1.022,
      al: 0,
      pcv: 44
    }
  }
];

export default function HistoryView({ onBack }) {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // 1. Try to load saved local history
    try {
      const stored = localStorage.getItem('wellcore_history');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistory(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not read local history:", e);
    }

    // 2. Fall back to realistic clinical default records
    setHistory(DEFAULT_CLINICAL_HISTORY);
    localStorage.setItem('wellcore_history', JSON.stringify(DEFAULT_CLINICAL_HISTORY));
  }, []);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear assessment history?")) {
      localStorage.removeItem('wellcore_history');
      setHistory([]);
    }
  };

  const handleExportCSV = () => {
    if (history.length === 0) return;
    const rows = [
      ['Record ID', 'Assessment Date', 'Clinical Module', 'Calibrated Risk Score (%)', 'Stratification Status']
    ];
    history.forEach(r => {
      rows.push([
        r.id,
        new Date(r.created_at).toLocaleDateString(),
        r.disease.toUpperCase(),
        r.risk_score + '%',
        r.status
      ]);
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wellcore_Assessment_History_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200 mb-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Clinical Audit Trail</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Patient Assessment History</h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Chronological log of multi-disease clinical triage evaluations.
          </p>
        </div>
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-300 shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleClearHistory}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-xl text-xs font-bold transition-all border border-slate-300 hover:border-red-300 shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Log</span>
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <Clock className="w-10 h-10 mb-3 opacity-40 text-slate-400" />
            <p className="font-semibold text-sm">No clinical assessment records found.</p>
            <p className="text-xs text-slate-400 mt-1">Run an assessment from the Diagnostics menu to log clinical results.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Date</th>
                  <th className="p-4">Organ Module</th>
                  <th className="p-4">Calibrated Risk</th>
                  <th className="p-4">Clinical Stratification</th>
                  <th className="p-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {history.map((record) => {
                  const isHigh = record.risk_score >= 40 || record.status.toLowerCase().includes('high');
                  return (
                    <React.Fragment key={record.id}>
                      <tr 
                        className={`transition-colors cursor-pointer ${expandedId === record.id ? 'bg-slate-50' : 'hover:bg-slate-50/80'}`}
                        onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
                      >
                        <td className="p-4 whitespace-nowrap text-slate-600 text-xs font-mono">
                          {new Date(record.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="p-4 font-bold text-slate-900 capitalize">
                          {record.disease} Screening
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${isHigh ? 'bg-red-600' : 'bg-emerald-600'}`}
                                style={{ width: `${Math.min(100, record.risk_score)}%` }}
                              />
                            </div>
                            <span className="font-mono font-bold text-xs text-slate-800">
                              {record.risk_score}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                            isHigh 
                              ? 'bg-red-50 text-red-700 border-red-200' 
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {isHigh ? <AlertTriangle className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {record.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
                            {expandedId === record.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>
                      
                      {expandedId === record.id && (
                        <tr className="bg-slate-50/90 border-b border-slate-200">
                          <td colSpan="5" className="p-5">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                              Recorded Biomarkers & Clinical Measurements:
                            </h4>
                            {record.input_data && Object.keys(record.input_data).length > 0 ? (
                              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                {Object.entries(record.input_data).map(([k, v]) => (
                                  <div key={k} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                                      {k.replace(/_/g, ' ')}
                                    </div>
                                    <div className="text-xs font-semibold text-slate-900 mt-0.5 font-mono">
                                      {v !== null && v !== "" ? String(v) : "—"}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-500 italic">No input data recorded.</p>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
