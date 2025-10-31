import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { API_ENDPOINTS, apiCall, getActivityImage } from '../config/api';

function CheckoutDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const activity = location.state?.activity;
  const selectedDate = location.state?.selectedDate;
  const selectedTime = location.state?.selectedTime;
  const paymentMethod = location.state?.paymentMethod;
  const subtotal = location.state?.subtotal;
  const tax = location.state?.tax;
  const totalAmount = location.state?.totalAmount;
  const promoCode = location.state?.promoCode;
  const discount = location.state?.discount;

  if (!activity || !selectedDate || !selectedTime) {
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
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      const bookingData = {
        experienceId: parseInt(activity.id),
        date: selectedDate,
        timeSlot: selectedTime,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip,
        paymentMethod: paymentMethod,
        subtotal: subtotal,
        tax: tax,
        totalAmount: totalAmount,
        promoCode: promoCode || '',
        discount: discount || 0
      };

      const response = await apiCall(API_ENDPOINTS.bookings, {
        method: 'POST',
        body: JSON.stringify(bookingData)
      });

      if (response.success) {
        navigate('/confirmation', { 
          state: { 
            booking: response.data,
            activity: activity,
            formData: formData
          } 
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to create booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
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
              <img src={getActivityImage(activity.id)} alt={activity.name} className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 bg-primary px-3 py-1 rounded text-xs font-semibold text-black">
                New
              </span>
            </div>            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              
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
                  <label className="block mb-2 font-medium text-black">State *</label>
                  <input 
                    type="text" 
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
              <div className="mb-8">
                <label className="block mb-2 font-medium text-black">Zip Code *</label>
                <input 
                  type="text" 
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:border-primary"
                  required
                  pattern="[0-9]{6}"
                  title="Please enter a 6-digit zip code"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-primary hover:bg-primary-hover rounded-lg font-semibold text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Complete Booking'
                )}
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
                <span className="text-black">{new Date(selectedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-black">Time:</span>
                <span className="text-black">{selectedTime}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-black">Payment:</span>
                <span className="text-black">{paymentMethod}</span>
              </div>
              
              <div className="mt-5 pt-5 border-t border-gray-300">
                <h4 className="text-base font-semibold mb-4 text-black">Price Breakdown</h4>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-black">Subtotal</span>
                  <span className="text-black">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-black">Tax (18%)</span>
                  <span className="text-black">₹{tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-green-600">Discount ({promoCode})</span>
                    <span className="text-green-600">- ₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-t-2 border-black mt-3 pt-4 font-semibold text-lg">
                  <span className="text-black">Total</span>
                  <span className="text-black">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutDetails;

