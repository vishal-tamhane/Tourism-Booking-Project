import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { API_ENDPOINTS, apiCall, getActivityImage } from '../config/api';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');

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

  const taxRate = 0.18; // 18% tax
  const subtotal = activity.price;
  const tax = subtotal * taxRate;
  const totalBeforeDiscount = subtotal + tax;
  const finalTotal = totalBeforeDiscount - promoDiscount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoMessage('Please enter a promo code');
      return;
    }

    try {
      setPromoLoading(true);
      setPromoMessage('');
      
      const response = await apiCall(API_ENDPOINTS.validatePromo, {
        method: 'POST',
        body: JSON.stringify({
          code: promoCode.toUpperCase(),
          amount: totalBeforeDiscount
        })
      });

      if (response.success) {
        setPromoDiscount(response.data.discount);
        setPromoMessage(response.data.message);
        setPromoApplied(true);
      }
    } catch (error) {
      setPromoMessage(error.message || 'Invalid promo code');
      setPromoDiscount(0);
      setPromoApplied(false);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoMessage('');
    setPromoApplied(false);
  };

  const handlePayment = () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    navigate('/checkout-details', { 
      state: { 
        activity,
        selectedDate,
        selectedTime,
        paymentMethod: selectedPayment,
        subtotal,
        tax,
        totalAmount: finalTotal,
        promoCode: promoApplied ? promoCode : '',
        discount: promoDiscount
      } 
    });
  };

  const bookingDetails = {
    activity: activity.name,
    date: selectedDate || new Date().toISOString().split('T')[0],
    time: selectedTime || '09:00 AM',
    image: getActivityImage(activity.id)
  };

  const paymentMethods = [
    { name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' },
    { name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
    { name: 'UPI', logo: null },
    { name: 'Net Banking', logo: null }
  ];

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
              {paymentMethods.map((method) => (
                <button 
                  key={method.name}
                  onClick={() => setSelectedPayment(method.name)}
                  className={`p-5 border-2 rounded-lg transition-all flex items-center justify-center ${
                    selectedPayment === method.name 
                      ? 'border-primary bg-yellow-50' 
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  {method.logo ? (
                    <img src={method.logo} alt={method.name} className="h-8 object-contain" />
                  ) : (
                    <span className="font-semibold text-black">{method.name}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-5 text-black">Promo Code</h4>
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Enter promo code"
                disabled={promoApplied}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:outline-none focus:border-primary disabled:bg-gray-100"
              />
              {!promoApplied ? (
                <button 
                  onClick={handleApplyPromo}
                  disabled={promoLoading}
                  className="px-6 py-3 bg-primary hover:bg-primary-hover rounded-lg font-semibold text-black transition-colors disabled:opacity-50"
                >
                  {promoLoading ? 'Checking...' : 'Apply'}
                </button>
              ) : (
                <button 
                  onClick={handleRemovePromo}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold text-white transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
            {promoMessage && (
              <p className={`text-sm ${promoApplied ? 'text-green-600' : 'text-red-600'}`}>
                {promoMessage}
              </p>
            )}
            <div className="mt-3">
              <p className="text-xs text-gray-600">Try: WELCOME10, SUMMER25, or FLAT200</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-5 text-black">Price Breakdown</h4>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-black">Subtotal</span>
              <span className="text-black">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-black">Tax (18%)</span>
              <span className="text-black">₹{tax.toFixed(2)}</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-green-600">Discount ({promoCode})</span>
                <span className="text-green-600">- ₹{promoDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-4 border-t-2 border-black font-semibold text-lg">
              <span className="text-black">Total</span>
              <span className="text-black">₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button 
            className="w-full py-4 bg-primary hover:bg-primary-hover rounded-lg font-semibold text-lg text-black transition-colors disabled:opacity-50"
            onClick={handlePayment}
            disabled={!selectedPayment}
          >
            {selectedPayment ? `Pay ₹${finalTotal.toFixed(2)}` : 'Select Payment Method'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

