import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const activity = location.state?.activity;
  const selectedDate = location.state?.selectedDate;
  const selectedTime = location.state?.selectedTime;

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header showSearch={false} />
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 text-center">
          <h2 className="text-2xl font-bold text-black">No booking information found</h2>
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

  const bookingDetails = {
    activity: activity.name,
    date: selectedDate || new Date().toISOString().split('T')[0],
    time: selectedTime || '09:00 AM',
    image: activity.image,
    breakdown: [
      ...activity.breakdown.filter(item => item.label !== 'Total'),
      { label: 'Tax', amount: 50 },
      { label: 'Total', amount: activity.breakdown.find(item => item.label === 'Total').amount + 50 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header showSearch={false} />
      <div className="bg-white border-b px-4 md:px-10 py-5 mb-6">
        <h2 className="text-2xl font-semibold text-black">Checkout</h2>
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-10">
        <div className="bg-white rounded-lg p-6 md:p-10 shadow-md">
          <div className="relative h-52 rounded-lg overflow-hidden mb-8">
            <img src={bookingDetails.image} alt={bookingDetails.activity} className="w-full h-full object-cover" />
            <span className="absolute top-2 right-2 bg-primary px-3 py-1 rounded text-xs font-semibold text-black">
              New
            </span>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-5 text-black">{bookingDetails.activity}</h3>
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-gray-300">
                <span className="text-black mb-2 sm:mb-0">Date:</span>
                <span className="font-semibold text-black">{new Date(bookingDetails.date).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between py-3">
                <span className="text-black mb-2 sm:mb-0">Time:</span>
                <span className="font-semibold text-black">{bookingDetails.time}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-5 text-black">Select Payment Method</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-5 border-2 border-gray-300 rounded-lg hover:border-primary transition-all flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-8 object-contain" />
              </button>
              <button className="p-5 border-2 border-gray-300 rounded-lg hover:border-primary transition-all flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 object-contain" />
              </button>
              <button className="p-5 border-2 border-gray-300 rounded-lg hover:border-primary transition-all flex items-center justify-center font-semibold text-black">
                UPI
              </button>
              <button className="p-5 border-2 border-gray-300 rounded-lg hover:border-primary transition-all flex items-center justify-center font-semibold text-black">
                Net Banking
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-5 text-black">Price Breakdown</h4>
            {bookingDetails.breakdown.map((item, index) => (
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
          </div>

          <button 
            className="w-full py-4 bg-primary hover:bg-primary-hover rounded-lg font-semibold text-lg text-black transition-colors"
            onClick={() => navigate('/checkout-details', { state: { bookingDetails, activity } })}
          >
            Pay ₹{bookingDetails.breakdown.find(i => i.label === 'Total').amount}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

