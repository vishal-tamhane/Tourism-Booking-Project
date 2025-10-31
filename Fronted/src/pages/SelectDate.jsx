import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getActivityById } from '../data/activities';

function SelectDate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState('');

  const activity = getActivityById(id);

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header showSearch={false} />
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 text-center">
          <h2 className="text-2xl font-bold text-black">Activity not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-3 bg-primary hover:bg-primary-hover rounded font-semibold text-black transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Generate dates for the next 60 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const dates = generateDates();

  const handleContinue = () => {
    if (selectedDate) {
      navigate(`/select-time/${id}`, { state: { selectedDate, activity } });
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header showSearch={false} />
      <div className="bg-white border-b px-4 md:px-10 py-5 mb-6">
        <h2 className="text-2xl font-semibold text-black">Select Date</h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg p-6 md:p-8">
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 bg-primary px-3 py-1 rounded text-xs font-semibold text-black">
                New
              </span>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-3 text-black">{activity.name}</h3>
              <p className="text-black leading-relaxed">{activity.description}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-5 text-black">Choose date</h4>
              <div className="mb-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={formatDate(new Date())}
                  max={formatDate(dates[dates.length - 1])}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black text-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 max-h-96 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                {dates.map((date, index) => {
                  const dateStr = formatDate(date);
                  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                  const dayNum = date.getDate();
                  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
                  
                  return (
                    <button
                      key={index}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        selectedDate === dateStr 
                          ? 'border-primary bg-primary' 
                          : 'border-gray-300 hover:border-primary hover:bg-yellow-50'
                      } ${isToday(date) ? 'ring-2 ring-blue-400' : ''}`}
                      onClick={() => setSelectedDate(dateStr)}
                    >
                      <div className="text-xs text-black mb-1">{dayName}</div>
                      <div className="text-xl font-semibold text-black">{dayNum}</div>
                      <div className="text-xs text-black">{monthName}</div>
                      {isToday(date) && <div className="text-xs text-blue-600 font-semibold mt-1">Today</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-6">
              <h4 className="text-lg font-semibold mb-5 text-black">Price Breakdown</h4>
              {activity.breakdown.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between py-3 ${
                    item.label === 'Total' 
                      ? 'border-t-2 border-black mt-3 pt-4 font-semibold text-lg' 
                      : 'border-b border-gray-200'
                  }`}
                >
                  <span className="text-black">{item.label}</span>
                  <span className="text-black">₹{item.amount}</span>
                </div>
              ))}
              <button 
                className={`w-full mt-6 py-3 rounded font-semibold transition-colors ${
                  selectedDate 
                    ? 'bg-primary hover:bg-primary-hover text-black' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleContinue}
                disabled={!selectedDate}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectDate;

