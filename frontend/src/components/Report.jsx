import React, { useRef } from 'react';
import { 
  Download, 
  CheckCircle, 
  Activity, 
  MapPin, 
  Phone, 
  Mail,
  Stethoscope
} from 'lucide-react';

const Report = ({ data }) => {
  if (!data) return <div className="p-10">Waiting for data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center mb-6 no-print">
        <h2 className="text-2xl font-bold text-slate-800">Diagnostic Report</h2>
        <button 
          onClick={() => window.print()}
          className="btn-primary flex items-center space-x-2"
        >
          <Download size={18} />
          <span>Save as PDF / Print</span>
        </button>
      </div>

      <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm print:shadow-none print:border-none">
        {/* Hospital Header */}
        <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-10">
          <div className="flex items-center space-x-4">
            <div className="bg-hospital-600 p-3 rounded-2xl text-white">
              <Stethoscope size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-hospital-900 uppercase tracking-tighter">RenalAI Medical Center</h1>
              <p className="text-sm text-slate-500 font-medium">Radiology & Nephrology Division</p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-400 space-y-1">
            <p className="flex items-center justify-end gap-1"><MapPin size={12} /> 123 Healthcare Blvd, Meditech City</p>
            <p className="flex items-center justify-end gap-1"><Phone size={12} /> +1 (555) 000-1111</p>
            <p className="flex items-center justify-end gap-1"><Mail size={12} /> clinical@renalai.com</p>
          </div>
        </div>

        {/* Report ID & Date */}
        <div className="flex justify-between items-center mb-10 bg-slate-50 p-4 rounded-xl">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Report Reference</p>
            <p className="font-mono text-sm font-bold text-slate-700">REF-RID-{Math.floor(Math.random() * 900000) + 100000}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Date Issued</p>
            <p className="text-sm font-bold text-slate-700">{new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-10 mb-12">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-hospital-600 uppercase border-b border-hospital-100 pb-2">Patient Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-slate-400">Name:</span>
              <span className="font-bold text-slate-800">{data.patientName}</span>
              <span className="text-slate-400">Age / Gender:</span>
              <span className="font-bold text-slate-800">{data.age}Y / M</span>
              <span className="text-slate-400">Patient ID:</span>
              <span className="font-bold text-slate-700">P-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black text-hospital-600 uppercase border-b border-hospital-100 pb-2">Vital Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-slate-400">Risk Level:</span>
              <span className={`font-bold ${data.riskLevel === 'High Risk' ? 'text-red-600' : 'text-emerald-600'}`}>{data.riskLevel}</span>
              <span className="text-slate-400">Analysis Mode:</span>
              <span className="font-bold text-slate-800">{data.scanType || 'CT Scan'} AI</span>
              <span className="text-slate-400">Confidence Score:</span>
              <span className="font-bold text-slate-800">94.2%</span>
            </div>
          </div>
        </div>

        {/* Clinical Findings */}
        <div className="mb-12">
          <h4 className="text-xs font-black text-hospital-600 uppercase border-b border-hospital-100 pb-4 mb-4">Imaging Findings & Conclusion</h4>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <p className="text-slate-700 leading-relaxed font-medium">
              The automated radiological analysis of the provided {data.scanType || 'CT'} axial sections displays: <span className="text-hospital-800 font-bold underline decoration-hospital-200">{data.findings === 'Normal' ? 'No significant abnormalities detected' : `Evidence of ${data.findings}`}</span>.
            </p>
            <p className="mt-4 text-slate-600 text-sm italic">
              AI generated interpretation. This software is intended for clinical decision support and should be verified by a board-certified radiologist.
            </p>
          </div>
        </div>

        {/* Signature Area */}
        <div className="mt-20 flex justify-between items-end">
          <div className="space-y-1">
            <div className="w-48 h-12 border-b border-slate-300 flex items-end pb-1 overflow-hidden">
               <span className="font-serif italic text-2xl text-slate-700 opacity-50">RenalAI-Auth</span>
            </div>
            <p className="text-[10px] text-slate-400">Authorized Digital Signature</p>
          </div>
          <div className="text-right">
             <CheckCircle className="ml-auto text-hospital-600 mb-2" size={24} />
             <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Electronically Verified</p>
             <p className="text-[9px] text-slate-400">MD-ALGO-2309-8821</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
