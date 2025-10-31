import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

function CheckoutDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const bookingDetails = location.state?.bookingDetails;
  const activity = location.state?.activity;

  if (!bookingDetails || !activity) {
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/confirmation', { state: { bookingDetails, formData } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header showSearch={false} />
      <div className="bg-white border-b px-4 md:px-10 py-5 mb-6">
        <h2 className="text-2xl font-semibold text-black">Checkout with Details</h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg p-6 md:p-8">
            <div className="relative h-64 rounded-lg overflow-hidden mb-8">
              <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 bg-primary px-3 py-1 rounded text-xs font-semibold text-black">
                New
              </span>
            </div>            <form onSubmit={handleSubmit}>
              <h4 className="text-lg font-semibold mb-5 text-black">Contact Information</h4>
              <div className="mb-5">
                <label className="block mb-2 font-medium text-black">Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium text-black">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium text-black">Phone *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <h4 className="text-lg font-semibold mb-5 mt-8 text-black">Billing Address</h4>
              <div className="mb-5">
                <label className="block mb-2 font-medium text-black">Address *</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className="block mb-2 font-medium text-black">City *</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-black">Zip Code *</label>
                  <input 
                    type="text" 
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-primary hover:bg-primary-hover rounded-lg font-semibold text-black transition-colors">
                Complete Booking
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-6">
              <h4 className="text-lg font-semibold mb-5 text-black">Booking Summary</h4>
              <div className="pb-3 border-b border-gray-200">
                <strong className="text-black">{activity.name}</strong>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-black">Date:</span>
                <span className="text-black">{new Date(bookingDetails.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-black">Time:</span>
                <span className="text-black">{bookingDetails.time}</span>
              </div>
              
              <div className="mt-5 pt-5 border-t border-gray-300">
                <h4 className="text-base font-semibold mb-4 text-black">Price Breakdown</h4>
                {bookingDetails.breakdown.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex justify-between py-2 ${
                      item.label === 'Total' 
                        ? 'border-t-2 border-black mt-3 pt-4 font-semibold text-lg' 
                        : 'border-b border-gray-100'
                    }`}
                  >
                    <span className="text-black">{item.label}</span>
                    <span className="text-black">₹{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutDetails;

