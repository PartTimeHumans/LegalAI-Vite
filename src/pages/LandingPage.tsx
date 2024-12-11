import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Legal AI</h1>
        <p className="text-xl text-center mb-8">Empowering legal professionals with cutting-edge AI technology</p>
        <div className="flex justify-center space-x-4">
          <Link to="/judge" className="btn btn-primary">Judge Dashboard</Link>
          <Link to="/lawyer" className="btn btn-primary">Lawyer Dashboard</Link>
          <Link to="/user" className="btn btn-primary">User Dashboard</Link>
        </div>
      </main>
      <footer className="bg-primary py-4">
        <div className="container mx-auto text-center text-gray-800">
          &copy; 2025 Legal AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;