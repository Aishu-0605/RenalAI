import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import PatientForm from './components/PatientForm';
import ImageUpload from './components/ImageUpload';
import AnalysisResult from './components/AnalysisResult';
import Report from './components/Report';

// --- Voice Navigation Wrapper ---
function AppContent({ isAuthenticated, userRole, handleLogin, handleAnalysis, history, setIsAuthenticated, patientData, setPatientData, analysisResult }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {isAuthenticated && <Sidebar userRole={userRole} onLogout={() => setIsAuthenticated(false)} />}
      
      <main className={`flex-1 ${isAuthenticated ? 'ml-64 p-8' : 'w-full'}`}>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Dashboard userRole={userRole} history={history} /> : <Navigate to="/login" />} />
          <Route path="/new-patient" element={isAuthenticated ? <PatientForm onSubmit={(data) => setPatientData(data)} /> : <Navigate to="/login" />} />
          <Route path="/upload" element={isAuthenticated ? <ImageUpload patientData={patientData} onAnalysis={handleAnalysis} /> : <Navigate to="/login" />} />
          <Route path="/result" element={isAuthenticated ? <AnalysisResult result={analysisResult} /> : <Navigate to="/login" />} />
          <Route path="/report" element={isAuthenticated ? <Report data={analysisResult} /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      {/* --- 6.2 Voice Assistant (Final Debug Version) --- */}
      {isAuthenticated && (
        <div className="fixed bottom-8 right-8 z-50">
          <button 
            id="renal-voice-btn"
            className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-full shadow-2xl flex items-center space-x-3 transition-all active:scale-95 group border-4 border-white"
            onClick={() => {
              console.log("RenalAI Assistant Clicked");
              const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
              
              if (!SpeechRecognition) {
                alert("Speech recognition is NOT supported in this browser. Please use GOOGLE CHROME.");
                return;
              }

              const recognition = new SpeechRecognition();
              recognition.lang = 'en-US';
              
              recognition.onstart = () => {
                console.log("Recognition Started...");
                document.getElementById('voice-label').innerText = "🔴 LISTENING NOW...";
              };

              recognition.onerror = (event) => {
                console.error("Speech Error:", event.error);
                alert("Microphone Error: " + event.error + ". Make sure mic is allowed!");
              };

              recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                document.getElementById('voice-label').innerText = `CMD: "${transcript}"`;
                console.log("Heard:", transcript);

                if (transcript.includes('report') || transcript.includes('result')) {
                  alert("Voice Intent: REPORT. Navigating now...");
                  navigate('/report');
                } else if (transcript.includes('scan') || transcript.includes('analyze') || transcript.includes('upload')) {
                  alert("Voice Intent: SCAN. Opening analyzer...");
                  navigate('/upload');
                } else if (transcript.includes('home') || transcript.includes('dashboard')) {
                  navigate('/');
                } else {
                  alert("RenalAI heard: " + transcript + ". (Try saying 'Go to report')");
                }
              };

              recognition.onend = () => {
                setTimeout(() => { document.getElementById('voice-label').innerText = "RenalAI Assistant"; }, 3000);
              };

              recognition.start();
            }}
          >
            <div className="bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span id="voice-label" className="font-bold px-1 uppercase tracking-wider text-sm">RenalAI Assistant</span>
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('doctor');
  const [patientData, setPatientData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [history, setHistory] = useState([
    { patientName: "Sarah Miller", age: "32", riskLevel: "Low Risk", findings: "Normal", timestamp: new Date().toISOString() },
    { patientName: "Robert Chen", age: "58", riskLevel: "Medium Risk", findings: "Cyst Detected", timestamp: new Date().toISOString() }
  ]);

  const handleLogin = (role) => { setUserRole(role); setIsAuthenticated(true); };
  const handleAnalysis = (result) => { setAnalysisResult(result); setHistory(prev => [result, ...prev]); };

  return (
    <Router>
      <AppContent 
        isAuthenticated={isAuthenticated} 
        userRole={userRole} 
        handleLogin={handleLogin} 
        handleAnalysis={handleAnalysis} 
        history={history} 
        setIsAuthenticated={setIsAuthenticated}
        patientData={patientData}
        setPatientData={setPatientData}
        analysisResult={analysisResult}
      />
    </Router>
  );
}

export default App;
