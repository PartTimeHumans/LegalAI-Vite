import React from 'react';
import CaseCard from '../components/CaseCard';
import Calendar from '../components/Calender';

const LawyerDashboard: React.FC = () => {
  const cases = [
    {
      title: 'Corporate Merger',
      description: 'Advising on legal aspects of a major corporate merger.',
      priority: 'High' as const,
      date: '2023-06-16',
    },
    {
      title: 'Intellectual Property Dispute',
      description: 'Representing client in a patent infringement case.',
      priority: 'Medium' as const,
      date: '2023-06-19',
    },
    {
      title: 'Employment Law Consultation',
      description: 'Providing legal advice on employee rights and regulations.',
      priority: 'Low' as const,
      date: '2023-06-21',
    },
  ];

  const events = [
    { date: '2023-06-16', title: 'Corporate Merger Meeting' },
    { date: '2023-06-19', title: 'IP Dispute Hearing' },
    { date: '2023-06-21', title: 'Employment Law Consultation' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lawyer Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Active Cases</h2>
          <div className="space-y-4">
            {cases.map((case_, index) => (
              <CaseCard key={index} {...case_} />
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Case Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="card text-center">
                <h3 className="text-2xl font-bold text-yellow-600">15</h3>
                <p className="text-sm">Active Cases</p>
              </div>
              <div className="card text-center">
                <h3 className="text-2xl font-bold text-green-600">8</h3>
                <p className="text-sm">Won Cases</p>
              </div>
              <div className="card text-center">
                <h3 className="text-2xl font-bold text-blue-600">3</h3>
                <p className="text-sm">Pending Appeals</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Calendar events={events} />
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">To-Do List</h2>
            <ul className="space-y-2">
              <li className="text-sm">Prepare documents for Corporate Merger case</li>
              <li className="text-sm">Research recent patent law changes</li>
              <li className="text-sm">Schedule client meeting for Employment Law case</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;