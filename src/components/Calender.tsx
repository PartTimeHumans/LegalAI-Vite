import React from 'react';

interface CalendarProps {
  events: Array<{
    date: string;
    title: string;
  }>;
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const currentDate = new Date();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h2>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium text-sm">
            {day}
          </div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const hasEvent = events.some((event) => new Date(event.date).toDateString() === date.toDateString());

          return (
            <div
              key={day}
              className={`text-center p-2 ${
                hasEvent ? 'bg-secondary font-semibold' : ''
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;