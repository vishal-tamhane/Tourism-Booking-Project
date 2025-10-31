import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingDetails = location.state?.bookingDetails;
  const formData = location.state?.formData;

  // Default values if no data is passed
  const activity = bookingDetails?.activity || 'Activity';
  const date = bookingDetails?.date || new Date().toISOString().split('T')[0];
  const time = bookingDetails?.time || '09:00 AM';
  const total = bookingDetails?.breakdown?.find(i => i.label === 'Total')?.amount || 900;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header showSearch={false} />
      <div className="bg-white border-b px-4 md:px-10 py-5 mb-6">
        <h2 className="text-2xl font-semibold text-black">Confirmation</h2>
      </div>
      <div className="max-w-3xl mx-auto px-4 md:px-10 py-10">
        <div className="bg-white rounded-lg p-8 md:p-16 shadow-md text-center">
          <div className="flex justify-center mb-8 animate-bounce">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="40" fill="#4CAF50"/>
              <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Booking Confirmed!</h2>
          <p className="text-base md:text-lg text-black mb-10 leading-relaxed">
            Your booking has been successfully confirmed. We've sent a confirmation email with all the details.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 md:p-8 mb-8 text-left">
            <h3 className="text-xl font-semibold mb-6 text-center text-black">Booking Details</h3>
            <div className="flex justify-between py-4 border-b border-gray-300">
              <span className="text-black">Booking ID:</span>
              <strong className="text-black">HWD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong>
            </div>
            <div className="flex justify-between py-4 border-b border-gray-300">
              <span className="text-black">Activity:</span>
              <strong className="text-black">{activity}</strong>
            </div>
            <div className="flex justify-between py-4 border-b border-gray-300">
              <span className="text-black">Date:</span>
              <strong className="text-black">{new Date(date).toLocaleDateString()}</strong>
            </div>
            <div className="flex justify-between py-4 border-b border-gray-300">
              <span className="text-black">Time:</span>
              <strong className="text-black">{time}</strong>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-black">Total Amount:</span>
              <strong className="text-black">₹{total}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-3 bg-primary hover:bg-primary-hover rounded-lg font-semibold text-black transition-colors min-w-[180px]"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
            <button 
              className="px-8 py-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-semibold text-black transition-colors min-w-[180px]"
              onClick={() => window.print()}
            >
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;

