import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  FileText, 
  ArrowLeft,
  Share2,
  Printer,
  Apple,
  Coffee,
  Droplets,
  Wind,
  Search
} from 'lucide-react';

const AnalysisResult = ({ result }) => {
  const navigate = useNavigate();

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AlertCircle size={48} className="text-slate-300 mb-4" />
        <p className="text-slate-500">No analysis results found. Please start a new scan.</p>
        <button onClick={() => navigate('/new-patient')} className="mt-4 text-hospital-600 font-semibold underline">
          New Patient Entry
        </button>
      </div>
    );
  }

  const getRiskStyles = (risk) => {
    switch(risk) {
      case 'High Risk': return { 
        bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-700', 
        icon: <ShieldAlert className="text-red-600" size={32} />,
        label: 'High Severity'
      };
      case 'Medium Risk': return { 
        bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', 
        icon: <AlertCircle className="text-amber-600" size={32} />,
        label: 'Moderate Stake'
      };
      default: return { 
        bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700', 
        icon: <CheckCircle2 className="text-emerald-600" size={32} />,
        label: 'Low Risk'
      };
    }
  };

  const styles = getRiskStyles(result.riskLevel);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate('/upload')}
          className="flex items-center space-x-2 text-slate-500 hover:text-hospital-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Upload</span>
        </button>
        <div className="flex space-x-3">
          <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"><Share2 size={20} /></button>
          <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"><Printer size={20} /></button>
        </div>
      </div>

      <div className={`${styles.bg} ${styles.border} border-2 rounded-3xl p-8`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white rounded-2xl shadow-sm">
              {styles.icon}
            </div>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${styles.text}`}>{styles.label}</span>
              <h1 className={`text-4xl font-black ${styles.text}`}>{result.riskLevel}</h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Analysis ID: #REN-9382</p>
            <p className="text-sm font-medium text-slate-700">{new Date(result.timestamp).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-50 pb-4">Detection Summary</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-400 mb-1">AI Findings</p>
              <p className="text-lg font-semibold text-slate-800">{result.findings}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Patient Name</p>
              <p className="text-lg font-semibold text-slate-800">{result.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Age</p>
              <p className="text-lg font-semibold text-slate-800">{result.age} Years</p>
            </div>
          </div>
        </div>

        <div className="bg-hospital-900 p-8 rounded-3xl text-white shadow-xl shadow-hospital-200">
          <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">AI Vision Insight</h3>
          <div className="relative h-48 bg-black rounded-2xl mb-6 overflow-hidden border border-white/20 group">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154235602-3c35bd7993a6?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-1000"></div>
             {/* Scanning Line Animation */}
             <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_cyan] animate-[scan_3s_ease-in-out_infinite]"></div>
             <style>{`
               @keyframes scan {
                 0%, 100% { top: 0% }
                 50% { top: 100% }
               }
             `}</style>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[10px] font-mono text-cyan-300 bg-black/60 p-2 rounded border border-cyan-500/30">
                   {result.findings === 'Normal' ? 'NO ANOMALIES DETECTED' : 'LESION DETECTED: 12.4mm'}
                </div>
             </div>
          </div>
          <p className="text-hospital-100 leading-relaxed text-sm mb-8 italic">
            "{result.recommendations}"
          </p>
          <button 
            onClick={() => navigate('/report')}
            className="w-full bg-white text-hospital-900 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-hospital-50 transition-all shadow-lg"
          >
            <FileText size={20} />
            <span>Generate Full Report</span>
          </button>
        </div>
      </div>

      {/* Personalized Health Action Plan */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <Apple className="text-emerald-500" /> Personalized Health Action Plan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AdviceCard 
            icon={<Coffee className="text-amber-500" />} 
            title="Dietary Adjustment" 
            desc={result.riskLevel === 'High Risk' ? "Strict low-sodium and low-potassium diet. Avoid processed foods." : "Balanced protein intake. Increase fiber from green leafy vegetables."} 
            color="bg-amber-50"
          />
          <AdviceCard 
            icon={<Droplets className="text-blue-500" />} 
            title="Hydration Strategy" 
            desc={result.riskLevel === 'High Risk' ? "Controlled fluid intake as per nephrologist directive (approx 1.5L/day)." : "Consistent hydration: 2.5L to 3L daily. Avoid sugary beverages."} 
            color="bg-blue-50"
          />
          <AdviceCard 
            icon={<Wind className="text-emerald-500" />} 
            title="Lifestyle Note" 
            desc="Regular blood pressure monitoring. Light aerobic exercise (20 min walk) highly recommended." 
            color="bg-emerald-50"
          />
        </div>
      </div>
    </div>
  );
};

const AdviceCard = ({ icon, title, desc, color }) => (
  <div className={`${color} p-6 rounded-2xl border border-white shadow-sm`}>
    <div className="bg-white p-3 w-fit rounded-xl mb-4 shadow-sm">{icon}</div>
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default AnalysisResult;
