import React, { useState } from 'react';
import { 
  Scale, 
  Clock, 
  FileText, 
  BookOpen, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Briefcase 
} from 'lucide-react';
import Calendar from '../components/Calender';

// Assuming we have a CaseCard component - if not, I'll provide an implementation
interface CaseCardProps {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  date: string;
}

const CaseCard: React.FC<CaseCardProps> = ({ title, description, priority, date }) => {
  const priorityColors = {
    Low: 'bg-green-50 border-green-200',
    Medium: 'bg-yellow-50 border-yellow-200',
    High: 'bg-red-50 border-red-200'
  };

  return (
    <div className={`
      border rounded-lg p-4 transition-all duration-300 
      hover:shadow-md ${priorityColors[priority]}
    `}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-primary-dark">{title}</h3>
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${priority === 'High' ? 'bg-red-500 text-white' :
            priority === 'Medium' ? 'bg-yellow-500 text-black' :
            'bg-green-500 text-white'}
        `}>
          {priority} Priority
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex items-center text-sm text-gray-500">
        <Clock className="mr-2 w-4 h-4" />
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

const JudgeDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cases' | 'documents' | 'notifications'>('cases');

  const cases = [
    {
      title: 'Property Dispute',
      description: 'Handling a legal property dispute between two parties.',
      priority: 'High' as const,
      date: '2024-06-15',
    },
    {
      title: 'Contract Violation',
      description: 'Representing the client in a breach of contract lawsuit.',
      priority: 'Medium' as const,
      date: '2024-06-18',
    },
    {
      title: 'Civil Rights Case',
      description: 'Filing a case to protect civil rights under Indian law.',
      priority: 'Low' as const,
      date: '2024-06-20',
    },
  ];

  const events = [
    { date: '2024-06-15', title: 'Property Dispute Hearing', type: 'hearing' },
    { date: '2024-06-18', title: 'Contract Violation Case', type: 'meeting' },
    { date: '2024-06-20', title: 'Civil Rights Case Review', type: 'deadline' },
  ];

  const notifications = [
    { 
      icon: <AlertTriangle className="text-yellow-500" />, 
      message: "Pending case documents for Property Dispute",
      time: "2 hours ago"
    },
    { 
      icon: <CheckCircle className="text-green-500" />, 
      message: "Case hearing for Contract Violation scheduled",
      time: "Yesterday"
    },
    { 
      icon: <Briefcase className="text-blue-500" />, 
      message: "New case assignment received",
      time: "3 days ago"
    }
  ];

  const documents = [
    { 
      title: "Property Dispute Case File", 
      type: "Legal Document", 
      date: "2024-06-10" 
    },
    { 
      title: "Contract Violation Evidence", 
      type: "Case Evidence", 
      date: "2024-06-12" 
    },
    { 
      title: "Civil Rights Case Brief", 
      type: "Legal Brief", 
      date: "2024-06-14" 
    }
  ];

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Scale className="mr-4 text-primary w-10 h-10" />
            <h1 className="text-3xl font-bold text-primary-dark">Judge Dashboard</h1>
          </div>
          <div className="bg-secondary rounded-full p-2">
            <Bell className="text-primary-dark" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-secondary/50 rounded-full p-1">
          {[
            { id: 'cases', label: 'Cases', icon: <FileText /> },
            { id: 'documents', label: 'Documents', icon: <BookOpen /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex-1 flex items-center justify-center p-3 rounded-full transition-all
                ${activeTab === tab.id 
                  ? 'bg-primary text-white' 
                  : 'text-primary-dark hover:bg-secondary'}
              `}
            >
              {tab.icon}
              <span className="ml-2 hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cases / Documents / Notifications Sections */}
          <div className="md:col-span-2 space-y-6">
            {activeTab === 'cases' && (
              <>
                <h2 className="text-xl font-semibold text-primary-dark flex items-center">
                  <Scale className="mr-2 text-primary" /> Upcoming Cases
                </h2>
                <div className="space-y-4">
                  {cases.map((case_, index) => (
                    <CaseCard key={index} {...case_} />
                  ))}
                </div>
              </>
            )}

            {activeTab === 'documents' && (
              <>
                <h2 className="text-xl font-semibold text-primary-dark flex items-center">
                  <BookOpen className="mr-2 text-primary" /> Case Documents
                </h2>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div 
                      key={index} 
                      className="bg-secondary/50 p-4 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-primary-dark">{doc.title}</h3>
                          <p className="text-sm text-gray-600">{doc.type}</p>
                        </div>
                        <span className="text-sm text-gray-500">{doc.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'notifications' && (
              <>
                <h2 className="text-xl font-semibold text-primary-dark flex items-center">
                  <Bell className="mr-2 text-primary" /> Recent Notifications
                </h2>
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <div 
                      key={index} 
                      className="bg-secondary/50 p-4 rounded-lg flex items-center hover:bg-secondary transition-colors"
                    >
                      <div className="mr-4">{notification.icon}</div>
                      <div className="flex-grow">
                        <p className="text-sm text-primary-dark">{notification.message}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar with Calendar */}
          <div>
            <Calendar events={events} />
            
            {/* Quick Stats */}
            <div className="mt-6 bg-secondary/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-primary-dark mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3 text-center">
                  <h4 className="text-sm text-gray-500">Pending Cases</h4>
                  <p className="text-2xl font-bold text-primary-dark">12</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <h4 className="text-sm text-gray-500">Resolved Cases</h4>
                  <p className="text-2xl font-bold text-primary-dark">38</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeDashboard;