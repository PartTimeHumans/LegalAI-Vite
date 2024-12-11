import React from 'react';
import CaseCard from '../components/CaseCard';
import Calendar from '../components/Calender';

const JudgeDashboard: React.FC = () => {
  const cases = [
    {
      title: 'Property Dispute',
      description: 'Handling a legal property dispute between two parties.',
      priority: 'High' as const,
      date: '2023-06-15',
    },
    {
      title: 'Contract Violation',
      description: 'Representing the client in a breach of contract lawsuit.',
      priority: 'Medium' as const,
      date: '2023-06-18',
    },
    {
      title: 'Civil Rights Case',
      description: 'Filing a case to protect civil rights under Indian law.',
      priority: 'Low' as const,
      date: '2023-06-20',
    },
  ];

  const events = [
    { date: '2023-06-15', title: 'Property Dispute Hearing' },
    { date: '2023-06-18', title: 'Contract Violation Case' },
    { date: '2023-06-20', title: 'Civil Rights Case Review' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Judge Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Upcoming Cases</h2>
          <div className="space-y-4">
            {cases.map((case_, index) => (
              <CaseCard key={index} {...case_} />
            ))}
          </div>
        </div>
        <div>
          <Calendar events={events} />
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2">
              <li className="text-sm">Reviewed case documents for Property Dispute</li>
              <li className="text-sm">Scheduled hearing for Contract Violation case</li>
              <li className="text-sm">Issued summons for Civil Rights Case</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeDashboard;