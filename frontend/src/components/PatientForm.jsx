import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Activity, Droplets, Thermometer, ArrowRight } from 'lucide-react';

const PatientForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    blood_pressure: '',
    creatinine: '',
    albumin: '0',
    sugar: '0',
    hemoglobin: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/upload');
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">New Patient Registration</h2>
        <p className="text-slate-500">Enter medical parameters for AI kidney disease risk assessment.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Demographic */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-hospital-700 flex items-center gap-2">
              <User size={20} /> Demographic Info
            </h3>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">Full Name</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                placeholder="John Doe" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-hospital-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">Age</label>
              <input 
                required
                name="age"
                value={formData.age}
                onChange={handleChange}
                type="number" 
                placeholder="45" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-hospital-500 transition-all"
              />
            </div>
          </div>

          {/* Medical Data */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-hospital-700 flex items-center gap-2">
              <Activity size={20} /> Vital Parameters
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600">Blood Pressure (mmHg)</label>
                <input 
                  required
                  name="blood_pressure"
                  value={formData.blood_pressure}
                  onChange={handleChange}
                  type="number" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-hospital-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600">Creatinine (mg/dL)</label>
                <input 
                  required
                  name="creatinine"
                  value={formData.creatinine}
                  onChange={handleChange}
                  type="number" 
                  step="0.1"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-hospital-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600">Albumin (0-5)</label>
                <select 
                  name="albumin"
                  value={formData.albumin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-hospital-500"
                >
                  {[0,1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600">Sugar (0-5)</label>
                <select 
                  name="sugar"
                  value={formData.sugar}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-hospital-500"
                >
                  {[0,1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">Hemoglobin (g/dL)</label>
              <input 
                required
                name="hemoglobin"
                value={formData.hemoglobin}
                onChange={handleChange}
                type="number" 
                step="0.1"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-hospital-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 flex justify-end px-8">
          <button 
            type="submit"
            className="btn-primary flex items-center space-x-2 px-8"
          >
            <span>Proceed to Scan Upload</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
