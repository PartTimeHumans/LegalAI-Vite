import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import JudgeDashboard from './pages/JudgeDashboard';
import LawyerDashboard from './pages/LawyerDashboard';
import UserDashboard from './pages/UserDashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-[55px]"> {/* Adds a 20px margin (mt-5 corresponds to 20px) */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/judge" element={<JudgeDashboard />} />
          <Route path="/lawyer" element={<LawyerDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;