import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Upload, 
  Activity, 
  FileText, 
  LogOut,
  Stethoscope
} from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50">
      <div className="p-6 flex items-center space-x-3">
        <div className="bg-hospital-600 p-2 rounded-lg text-white">
          <Stethoscope size={24} />
        </div>
        <h1 className="text-xl font-bold text-hospital-900 tracking-tight">RenalAI</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink to="/" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/new-patient" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <UserPlus size={20} />
          <span>Patient Entry</span>
        </NavLink>
        
        <NavLink to="/upload" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <Upload size={20} />
          <span>Scan Upload</span>
        </NavLink>
        
        <NavLink to="/result" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <Activity size={20} />
          <span>AI Analysis</span>
        </NavLink>
        
        <NavLink to="/report" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <FileText size={20} />
          <span>Medical Reports</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full p-3 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors rounded-xl font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
