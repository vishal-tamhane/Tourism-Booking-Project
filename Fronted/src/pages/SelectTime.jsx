import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { getActivityById } from '../data/activities';

function SelectTime() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [selectedTime, setSelectedTime] = useState('');

  const activity = getActivityById(id) || location.state?.activity;

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

  const times = [
    { time: '09:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '01:00 PM', available: false },
    { time: '03:00 PM', available: true },
    { time: '05:00 PM', available: true },
  ];

  const handleContinue = () => {
    if (selectedTime) {
      navigate('/checkout', { 
        state: { 
          selectedDate: location.state?.selectedDate,
          selectedTime,
          activity
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header showSearch={false} />
      <div className="bg-white border-b px-4 md:px-10 py-5 mb-6">
        <h2 className="text-2xl font-semibold text-black">Select Time</h2>
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
              <h4 className="text-lg font-semibold mb-5 text-black">Choose time</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {times.map((time) => (
                  <button
                    key={time.time}
                    className={`p-4 rounded-lg border-2 transition-all text-center font-semibold ${
                      selectedTime === time.time 
                        ? 'border-primary bg-primary' 
                        : time.available 
                        ? 'border-gray-300 hover:border-primary hover:bg-yellow-50' 
                        : 'border-gray-200 opacity-40 cursor-not-allowed'
                    }`}
                    onClick={() => time.available && setSelectedTime(time.time)}
                    disabled={!time.available}
                  >
                    <span className="text-black">{time.time}</span>
                  </button>
                ))}
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
                  selectedTime 
                    ? 'bg-primary hover:bg-primary-hover text-black' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleContinue}
                disabled={!selectedTime}
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectTime;

