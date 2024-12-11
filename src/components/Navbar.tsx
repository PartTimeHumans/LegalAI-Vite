import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">Legal AI</Link>
        <div className="space-x-4">
          <Link to="/judge" className="text-gray-800 hover:text-gray-600">Judge</Link>
          <Link to="/lawyer" className="text-gray-800 hover:text-gray-600">Lawyer</Link>
          <Link to="/user" className="text-gray-800 hover:text-gray-600">User</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

