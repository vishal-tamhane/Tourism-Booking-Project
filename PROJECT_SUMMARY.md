# Highway Delite - Full Stack Tourism Booking Platform

## 🎯 Project Overview

A complete tourism booking application with React frontend and Node.js backend, featuring dynamic activity booking, payment processing, and promo code support.

## 📦 What Was Built

### Backend (Node.js + Express + PostgreSQL)
Located in: `Backend/`

**Core Features:**
- ✅ RESTful API with 4 main endpoints
- ✅ PostgreSQL database with 5 tables
- ✅ Double-booking prevention system
- ✅ Promo code validation engine
- ✅ Availability checking for time slots
- ✅ Input validation using express-validator
- ✅ CORS support for frontend integration
- ✅ Transaction support for data consistency

**API Endpoints:**
1. `GET /api/experiences` - Fetch all tourism activities
2. `GET /api/experiences/:id` - Get specific activity details
3. `POST /api/bookings` - Create new booking with validation
4. `POST /api/promo/validate` - Validate discount codes

**Database Schema:**
- `experiences` - 8 tourism activities (Kayaking, Paragliding, etc.)
- `price_breakdowns` - Itemized pricing per activity
- `time_slots` - 5 time slots per activity (9 AM to 5 PM)
- `bookings` - Customer reservations with duplicate prevention
- `promo_codes` - 3 active promo codes with usage tracking

**Built-in Promo Codes:**
- `WELCOME10` - 10% discount (min ₹1000, max ₹500 off)
- `SUMMER25` - 25% discount (min ₹3000, max ₹1000 off)
- `FLAT200` - Fixed ₹200 discount (min ₹1500)

### Frontend (React + Vite + Tailwind CSS v4)
Located in: `Fronted/`

**Pages:**
1. **Home** (`/`) - Activity grid with search
2. **Activity Details** (`/activity/:id`) - Detailed view
3. **Select Date** (`/select-date/:id`) - 60-day calendar picker
4. **Select Time** (`/select-time/:id`) - Time slot selection
5. **Checkout** (`/checkout`) - Payment method & review
6. **Checkout Details** (`/checkout-details`) - Contact form
7. **Confirmation** (`/confirmation`) - Success page with booking ID

**Features:**
- ✅ Fully responsive design (mobile/tablet/desktop)
- ✅ Tailwind CSS v4 with custom theme
- ✅ React Router DOM navigation
- ✅ Dynamic activity data (currently static, ready for API)
- ✅ Calendar date picker (today + 60 days)
- ✅ Form validation
- ✅ Brand logo integration

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL 14+
- npm or yarn

### Backend Setup

1. **Install PostgreSQL**
   - Download from: https://www.postgresql.org/download/
   - Remember your postgres password!

2. **Configure Backend**
   ```bash
   cd Backend
   
   # Update .env file with your PostgreSQL password
   # Edit: DB_PASSWORD=your_password
   
   # Setup database
   npm run db:setup
   
   # Seed initial data
   npm run db:seed
   
   # Start server
   npm start
   ```
   Server runs on: http://localhost:5000

3. **Test API**
   Open browser: http://localhost:5000/api/experiences

### Frontend Setup

1. **Install & Run**
   ```bash
   cd Fronted
   npm install
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

2. **Add Logo**
   - Place your `logo.png` in `Fronted/public/`

## 🔗 Next Steps: Connect Frontend to Backend

The frontend currently uses static data from `src/data/activities.js`. To integrate with the backend API:

### Update API Configuration

Create `Fronted/src/config/api.js`:
```javascript
export const API_BASE_URL = 'http://localhost:5000/api';
```

### Update Pages to Use API

**Home.jsx** - Fetch experiences:
```javascript
import { API_BASE_URL } from '../config/api';

useEffect(() => {
  fetch(`${API_BASE_URL}/experiences`)
    .then(res => res.json())
    .then(data => setActivities(data.data))
    .catch(err => console.error(err));
}, []);
```

**SelectDate.jsx** - Get single experience:
```javascript
useEffect(() => {
  fetch(`${API_BASE_URL}/experiences/${id}`)
    .then(res => res.json())
    .then(data => setActivity(data.data))
    .catch(err => console.error(err));
}, [id]);
```

**CheckoutDetails.jsx** - Create booking:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const bookingData = {
    experienceId: activity.id,
    date: selectedDate,
    timeSlot: selectedTime,
    customerName: formData.name,
    customerEmail: formData.email,
    customerPhone: formData.phone,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    zipCode: formData.zipCode,
    paymentMethod: paymentMethod,
    subtotal: activity.price,
    tax: activity.price * 0.18,
    totalAmount: activity.price * 1.18
  };
  
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  
  const result = await response.json();
  if (result.success) {
    navigate('/confirmation', { state: { booking: result.data } });
  }
};
```

**Checkout.jsx** - Validate promo code:
```javascript
const handlePromoCodeApply = async () => {
  const response = await fetch(`${API_BASE_URL}/promo/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: promoCode, amount: totalAmount })
  });
  
  const result = await response.json();
  if (result.success) {
    setDiscount(result.data.discount);
    setPromoMessage(result.data.message);
  } else {
    setPromoMessage(result.error);
  }
};
```

## 📁 Project Structure

```
Project_Highway_Delite/
├── Backend/
│   ├── config/
│   │   └── database.js           # DB connection
│   ├── database/
│   │   └── schema.sql            # Table definitions
│   ├── models/
│   │   ├── Booking.js            # Booking logic
│   │   ├── Experience.js         # Experience queries
│   │   └── PromoCode.js          # Promo validation
│   ├── routes/
│   │   ├── bookings.js           # Booking endpoints
│   │   ├── experiences.js        # Experience endpoints
│   │   └── promo.js              # Promo endpoints
│   ├── scripts/
│   │   ├── setup-database.js     # DB setup
│   │   └── seed-data.js          # Initial data
│   ├── .env                      # Environment variables
│   ├── .env.example              # Template
│   ├── package.json              # Dependencies
│   ├── server.js                 # Express app
│   ├── README.md                 # Full documentation
│   └── QUICK_START.md            # Quick reference
│
├── Fronted/
│   ├── public/
│   │   └── logo.png              # Brand logo (add this!)
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.jsx        # Navigation bar
│   │   ├── data/
│   │   │   └── activities.js     # Static data (replace with API)
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── SelectDate.jsx
│   │   │   ├── SelectTime.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── CheckoutDetails.jsx
│   │   │   └── Confirmation.jsx
│   │   ├── App.jsx               # Router
│   │   ├── index.css             # Tailwind config
│   │   └── main.jsx              # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
```

## 🧪 Testing the Full Stack

1. **Start Backend:**
   ```bash
   cd Backend
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd Fronted
   npm run dev
   ```

3. **Test Flow:**
   - Browse activities on homepage
   - Click "View Details" on any activity
   - Select date (calendar picker)
   - Choose time slot
   - Review booking at checkout
   - Try promo code: `WELCOME10`
   - Fill contact details
   - See confirmation with booking ID

## 🎟️ Testing Promo Codes

| Code | Discount | Min Amount | Expected Result |
|------|----------|------------|-----------------|
| `WELCOME10` | 10% | ₹1000 | Works on ₹1999+ bookings |
| `SUMMER25` | 25% | ₹3000 | Works on ₹3000+ bookings |
| `FLAT200` | ₹200 | ₹1500 | Works on ₹1500+ bookings |
| `INVALID` | - | - | Should show error |

## 🔒 Backend Features in Detail

### Double-Booking Prevention
- Database constraint: `UNIQUE(experience_id, booking_date, time_slot, customer_email)`
- Application-level check before insert
- Transaction support (ROLLBACK on error)
- Capacity checking per time slot (max 20)

### Validation Rules
- Email format validation
- 10-digit phone number
- Required fields enforcement
- Date format (ISO 8601)
- Numeric amount validation

### Error Responses
- `400` - Validation error
- `404` - Resource not found
- `409` - Conflict (duplicate booking)
- `500` - Server error

## 📊 Database Info

**Total Records:**
- 8 Experiences (activities)
- 24 Price Breakdowns (3 items × 8 activities)
- 40 Time Slots (5 slots × 8 activities)
- 3 Promo Codes
- 0 Bookings (initially empty)

**Connection Details:**
- Host: localhost
- Port: 5432
- Database: highway_delite
- User: postgres

## 🛠️ Tech Stack Summary

**Backend:**
- Node.js (Runtime)
- Express.js (Web framework)
- PostgreSQL (Database)
- pg (PostgreSQL client)
- express-validator (Validation)
- cors (Cross-origin)
- dotenv (Environment vars)

**Frontend:**
- React 18 (UI library)
- Vite 7 (Build tool)
- Tailwind CSS v4 (Styling)
- React Router DOM v7 (Routing)

## 📝 Environment Variables

**Backend (.env):**
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=highway_delite
DB_USER=postgres
DB_PASSWORD=your_password
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
```

**Frontend (.env - if needed):**
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

**Backend won't start:**
- Check PostgreSQL is running
- Verify `.env` credentials
- Run `npm run db:setup`

**Frontend shows old data:**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check API URL in code

**CORS errors:**
- Ensure backend is running
- Check `ALLOWED_ORIGINS` in `.env`
- Restart backend after `.env` changes

**Database errors:**
- Verify PostgreSQL service is running
- Check password in `.env`
- Try `npm run db:setup` again

## 📚 Documentation

- Backend: `Backend/README.md` (detailed API docs)
- Backend Quick Start: `Backend/QUICK_START.md`
- Frontend: `Fronted/README.md`
- Database Schema: `Backend/database/schema.sql`

## ✅ What's Complete

- [x] Backend API with 4 endpoints
- [x] PostgreSQL database schema
- [x] Database seeding scripts
- [x] Frontend UI (7 pages)
- [x] Responsive design
- [x] Tailwind CSS v4 integration
- [x] React Router navigation
- [x] Form validation
- [x] Double-booking prevention
- [x] Promo code system

## 🔜 To Complete

- [ ] Place logo.png in Fronted/public/
- [ ] Update frontend to use backend API
- [ ] Add loading states in frontend
- [ ] Add error handling in frontend
- [ ] Test end-to-end booking flow
- [ ] Add email confirmation (optional)
- [ ] Deploy to production (optional)

## 🎉 Ready to Use!

Your Highway Delite platform is ready! Follow the setup steps above to start both servers and begin testing. The backend is fully functional and ready for frontend integration.

---

**Need help?** Check the README files in each folder for detailed documentation.
