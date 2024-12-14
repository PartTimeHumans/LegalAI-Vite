import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, Bell, Plus, Search, MoreVertical, CalendarIcon } from 'lucide-react';

interface Case {
  id: string;
  title: string;
  court: string;
  nextHearing: string;
  status: 'upcoming' | 'completed' | 'pending';
  documents: string[];
}

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

const mockCases: Case[] = [
  {
    id: '1',
    title: 'Smith vs. Tech Corp',
    court: 'Supreme Court',
    nextHearing: '2025-03-15',
    status: 'upcoming',
    documents: ['Complaint.pdf', 'Evidence A.pdf', 'Witness Statement.pdf']
  },
  {
    id: '2',
    title: 'Johnson Property Dispute',
    court: 'High Court',
    nextHearing: '2025-04-02',
    status: 'pending',
    documents: ['Property Deed.pdf', 'Survey Report.pdf']
  },
  {
    id: '3',
    title: 'Corporate Merger Review',
    court: 'Commercial Court',
    nextHearing: '2025-03-20',
    status: 'upcoming',
    documents: ['Merger Agreement.pdf', 'Financial Reports.pdf']
  }
];

const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'File Motion for Smith Case',
    date: '2025-03-10',
    time: '09:00',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Client Meeting - Johnson',
    date: '2025-03-12',
    time: '14:30',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Document Review',
    date: '2025-03-14',
    time: '11:00',
    priority: 'low'
  }
];

const AdvocateDiary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cases' | 'calendar' | 'reminders'>('cases');
  const [searchQuery, setSearchQuery] = useState('');

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container p-4 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Advocate Diary</h1>
          <p className="text-gray-600">Manage your cases, schedules, and deadlines efficiently</p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search cases, documents, or reminders..."
              className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary-dark">
            <Plus className="w-5 h-5 mr-2" />
            Add New Case
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 space-x-4 border-b">
          {[
            { id: 'cases', label: 'Cases', icon: FileText },
            { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
            { id: 'reminders', label: 'Reminders', icon: Bell }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center px-4 py-2 space-x-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Cases List */}
          <div className="md:col-span-2">
            <div className="p-6 bg-white shadow-sm rounded-xl">
              <h2 className="mb-4 text-xl font-semibold">Active Cases</h2>
              <div className="space-y-4">
                {mockCases.map((case_) => (
                  <motion.div
                    key={case_.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 transition-shadow border rounded-lg hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{case_.title}</h3>
                        <p className="text-sm text-gray-600">{case_.court}</p>
                      </div>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                    <div className="flex items-center mt-4 space-x-4">
                      <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                        statusColors[case_.status]
                      }`}>
                        {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        Next Hearing: {new Date(case_.nextHearing).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="mb-2 text-sm font-medium text-gray-700">Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {case_.documents.map((doc, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Reminders Panel */}
          <div className="space-y-6">
            {/* Calendar Widget */}
            <div className="p-6 bg-white shadow-sm rounded-xl">
              <h2 className="mb-4 text-xl font-semibold">Calendar</h2>
              <div className="p-4 text-center border rounded-lg">
                <Calendar className="w-full" />
              </div>
            </div>

            {/* Upcoming Reminders */}
            <div className="p-6 bg-white shadow-sm rounded-xl">
              <h2 className="mb-4 text-xl font-semibold">Upcoming Reminders</h2>
              <div className="space-y-3">
                {mockReminders.map((reminder) => (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 transition-colors border rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-medium">{reminder.title}</h3>
                      <div className="flex items-center mt-1 space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(reminder.date).toLocaleDateString()} at {reminder.time}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                      priorityColors[reminder.priority]
                    }`}>
                      {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
                    </div>
                  </motion.div>
                ))}
              </div>
              <button className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 transition-colors border rounded-lg text-primary border-primary hover:bg-primary hover:text-white">
                <Plus className="w-5 h-5" />
                Add Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvocateDiary;