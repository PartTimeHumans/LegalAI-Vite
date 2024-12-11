import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import JudgeDashboard from './pages/JudgeDashboard';
import LawyerDashboard from './pages/LawyerDashboard';
import UserDashboard from './pages/UserDashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<JudgeDashboard />} />
        <Route path="lawyer" element={<LawyerDashboard />} />
        <Route path="user" element={<UserDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;