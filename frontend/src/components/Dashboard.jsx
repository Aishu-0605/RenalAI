import React from 'react';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Search,
  CheckCircle,
  Dna,
  Zap,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 19 },
  { name: 'Wed', count: 15 },
  { name: 'Thu', count: 22 },
  { name: 'Fri', count: 30 },
  { name: 'Sat', count: 10 },
  { name: 'Sun', count: 8 },
];

const riskData = [
  { month: 'Jan', cases: 40 },
  { month: 'Feb', cases: 35 },
  { month: 'Mar', cases: 55 },
  { month: 'Apr', cases: 45 },
  { month: 'May', cases: 60 },
  { month: 'Jun', cases: 75 },
];

const Dashboard = ({ userRole, history }) => {
  const isPatient = userRole === 'patient';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            {isPatient ? 'Patient Self-Portal' : 'Doctor Dashboard'}
          </h2>
          <p className="text-slate-500">
            {isPatient ? 'Welcome! Check your renal health status below.' : "Welcome back, Dr. Smith. Here's what's happening today."}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search patients..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-hospital-500 w-64"
          />
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Users className="text-blue-600" />} 
          label="Total Patients" 
          value={history ? history.length : "0"} 
          trend={history && history.length > 0 ? `+${history.length}` : "stable"} 
        />
        <StatCard 
          icon={<Clock className="text-amber-600" />} 
          label="Pending Analysis" 
          value={history && history.length > 0 ? "0" : "1"} 
          trend={history && history.length > 0 ? "Done" : "New"} 
        />
        <StatCard 
          icon={<AlertTriangle className="text-red-600" />} 
          label="High Risk Cases" 
          value={history ? history.filter(item => item.riskLevel === 'High Risk').length : "0"} 
          trend={history && history.filter(item => item.riskLevel === 'High Risk').length > 0 ? "Urgent" : "None"} 
        />
        <StatCard 
          icon={<TrendingUp className="text-emerald-600" />} 
          label="Avg. Prediction Accuracy" 
          value="97.4%" 
          trend="+0.6%" 
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <FindingCard 
          label="Normal" 
          value={history ? history.filter(h => h.findings === 'Normal').length : 0} 
          icon={<CheckCircle className="text-emerald-500" size={18} />}
          color="border-emerald-100 bg-emerald-50/20"
        />
        <FindingCard 
          label="Cysts" 
          value={history ? history.filter(h => h.findings === 'Cyst').length : 0} 
          icon={<Activity className="text-blue-500" size={18} />}
          color="border-blue-100 bg-blue-50/20"
        />
        <FindingCard 
          label="Stones" 
          value={history ? history.filter(h => h.findings === 'Stone').length : 0} 
          icon={<Zap className="text-amber-500" size={18} />}
          color="border-amber-100 bg-amber-50/20"
        />
        <FindingCard 
          label="Tumors" 
          value={history ? history.filter(h => h.findings === 'Tumor').length : 0} 
          icon={<Dna className="text-rose-500" size={18} />}
          color="border-rose-100 bg-rose-50/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700 mb-6">Weekly Patient Activity</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                />
                <Bar dataKey="count" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Trends */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700 mb-6">CKD Risk Trends</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskData}>
                <defs>
                  <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="cases" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorCases)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent Patients Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-700">Recent AI Analyses</h3>
          <button className="text-hospital-600 text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Patient Name</th>
                <th className="px-6 py-4 font-bold">Age</th>
                <th className="px-6 py-4 font-bold">Risk Level</th>
                <th className="px-6 py-4 font-bold">AI Findings</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history && history.length > 0 ? history.map((item, idx) => (
                <PatientRow 
                  key={idx} 
                  name={item.patientName} 
                  age={item.age} 
                  risk={item.riskLevel} 
                  findings={item.findings} 
                  status={item.riskLevel === 'High Risk' ? 'Critical' : item.riskLevel === 'Medium Risk' ? 'Urgent' : 'Stable'} 
                />
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                    No analyses recorded yet. Complete a scan to see results here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PatientRow = ({ name, age, risk, findings, status }) => (
  <tr className="hover:bg-slate-50/50 transition-colors">
    <td className="px-6 py-4 font-semibold text-slate-700">{name}</td>
    <td className="px-6 py-4 text-slate-500">{age}</td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
        risk === 'High Risk' ? 'bg-red-50 text-red-600' : 
        risk === 'Medium Risk' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
      }`}>
        {risk}
      </span>
    </td>
    <td className="px-6 py-4 text-sm text-slate-600">{findings}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <div className={`h-2 w-2 rounded-full ${
          status === 'Critical' ? 'bg-red-500' : 
          status === 'Urgent' ? 'bg-orange-500' : 
          status === 'Stable' ? 'bg-emerald-500' : 'bg-blue-500'
        }`} />
        {status}
      </div>
    </td>
  </tr>
);

const StatCard = ({ icon, label, value, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-hover hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
        trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 
        trend.startsWith('-') ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'
      }`}>
        {trend}
      </span>
    </div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    <div className="text-sm text-slate-500">{label}</div>
  </div>
);

const FindingCard = ({ label, value, icon, color }) => (
  <div className={`p-4 rounded-2xl border ${color} flex items-center justify-between`}>
    <div>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xl font-bold text-slate-800">{value}</div>
    </div>
    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
      {icon}
    </div>
  </div>
);

export default Dashboard;
