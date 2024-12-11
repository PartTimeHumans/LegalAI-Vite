import React from 'react';
import CaseCard from '../components/CaseCard';
import Calendar from '../components/Calender';

const UserDashboard: React.FC = () => {
  const cases = [
    {
      title: 'Divorce Proceedings',
      description: 'Ongoing divorce case with property settlement.',
      priority: 'Medium' as const,
      date: '2023-06-17',
    },
    {
      title: 'Insurance Claim Dispute',
      description: 'Challenging a denied insurance claim for property damage.',
      priority: 'High' as const,
      date: '2023-06-22',
    },
    {
      title: 'Will Execution',
      description: 'Assistance with executing a family member\'s will.',
      priority: 'Low' as const,
      date: '2023-06-25',
    },
  ];

  const events = [
    { date: '2023-0617', title: 'Divorce Mediation' },
    { date: '2023-06-22', title: 'Insurance Claim Hearing' },
    { date: '2023-06-25', title: 'Will Execution Meeting' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">My Cases</h2>
          <div className="space-y-4">
            {cases.map((case_, index) => (
              <CaseCard key={index} {...case_} />
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Legal Resources</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">Understanding Divorce Proceedings</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">Guide to Insurance Claim Disputes</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">Will Execution: What You Need to Know</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Calendar events={events} />
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <ul className="space-y-2">
              <li className="text-sm">June 17 - Divorce Mediation with Atty. Johnson</li>
              <li className="text-sm">June 22 - Insurance Claim Hearing</li>
              <li className="text-sm">June 25 - Will Execution Meeting with Family</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;