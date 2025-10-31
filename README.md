# 🏔️ Highway Delite - Tourism Booking Platform

A full-stack tourism booking platform with React frontend and Node.js/Express backend.

## 📁 Project Structure

```
Project_Highway_Delite/
├── Backend/          # Node.js + Express + PostgreSQL API
└── Fronted/         # React + Vite + Tailwind CSS
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 20+ installed
- PostgreSQL 14+ installed and running
- Git

---

## 🏠 Local Development Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/vishal-tamhane/Tourism-Booking-Project.git
cd Tourism-Booking-Project
```

### **2. Backend Setup**
```bash
cd Backend
npm install

# Create environment file
cp .env.example .env
```

**Edit `.env` file with your database credentials:**
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=Tourism-Booking-Project
DB_USER=postgres
DB_PASSWORD=your_password
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
```

**Setup Database:**
```bash
# Create database in PostgreSQL
# Then run setup scripts
npm run db:setup  # Setup database schema
npm run db:seed   # Seed initial data

# Start backend server
npm start
```

Backend will run at: `http://localhost:5000`

---

### **3. Frontend Setup**
```bash
cd ../Fronted
npm install

# Environment file (optional - defaults to localhost:5000)
cp .env.example .env.local
```

**Start frontend development server:**
```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🎯 Features

- 🗓️ **Activity Booking** - Browse and book adventure activities
- 📅 **Date/Time Selection** - Choose from available time slots
- 💳 **Multiple Payment Options** - UPI, Cards, Net Banking, Wallets
- 🎟️ **Promo Codes** - Apply discount codes (WELCOME10, SUMMER25, FLAT200)
- 🔍 **Real-time Search** - Filter activities by name, location, or description
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 💰 **Dynamic Pricing** - Automatic tax calculation (18%)
- ✅ **Booking Validation** - Prevents double-booking and validates availability

---

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite 7
- Tailwind CSS 4
- React Router DOM 7

**Backend:**
- Node.js 20+
- Express.js 4
- PostgreSQL 14+
- CORS, Dotenv, Express-validator

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/db-status` | Database status |
| GET | `/api/experiences` | List all activities |
| GET | `/api/experiences/:id` | Get activity details |
| GET | `/api/experiences/:id/availability` | Check availability |
| POST | `/api/bookings` | Create new booking |
| POST | `/api/promo/validate` | Validate promo code |

---

## 🎟️ Available Promo Codes

| Code | Discount | Min Amount | Max Discount |
|------|----------|------------|--------------|
| WELCOME10 | 10% | ₹1,000 | ₹500 |
| SUMMER25 | 25% | ₹1,500 | ₹1,000 |
| FLAT200 | ₹200 flat | ₹800 | ₹200 |

---

## 🗄️ Database Schema

The project includes 5 main tables:
- `experiences` - Activity listings
- `price_breakdowns` - Pricing details
- `time_slots` - Available booking slots
- `bookings` - Customer bookings
- `promo_codes` - Discount codes

Schemas are located in `Backend/database/` and `Backend/scripts/`

---

## 📸 Screenshots

### Home Page
Browse through various adventure activities with search functionality.

### Booking Flow
1. Select activity
2. Choose date and time slot
3. Enter customer details
4. Apply promo code (optional)
5. Complete payment
6. Get booking confirmation

---

## 🧪 Testing

### **Test Backend API**
```bash
# Health check
curl http://localhost:5000/api/health

# Database status
curl http://localhost:5000/api/db-status

# Get all activities
curl http://localhost:5000/api/experiences
```

### **Test Frontend**
1. Open `http://localhost:5173`
2. Search for activities (e.g., "paragliding")
3. Click on an activity
4. Select date and time
5. Fill booking details
6. Apply promo code
7. Complete booking

---

## 🔧 Available Scripts

### **Backend**
```bash
npm start          # Start server
npm run dev        # Start with auto-reload
npm run db:setup   # Setup database schema
npm run db:seed    # Seed initial data
```

### **Frontend**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## � Project Structure

```
Backend/
├── config/
│   └── database.js       # PostgreSQL connection
├── database/
│   └── update-images.sql # Database updates
├── models/
│   ├── Booking.js        # Booking model
│   ├── Experience.js     # Activity model
│   └── PromoCode.js      # Promo code model
├── routes/
│   ├── bookings.js       # Booking endpoints
│   ├── experiences.js    # Activity endpoints
│   └── promo.js          # Promo code endpoints
├── scripts/
│   ├── seed-data.js      # Seed database
│   └── setup-database.js # Setup schema
├── .env.example          # Environment template
└── server.js             # Main entry point

Fronted/
├── public/               # Static assets
├── src/
│   ├── components/
│   │   ├── Footer.jsx    # Footer component
│   │   └── Header.jsx    # Header with search
│   ├── config/
│   │   └── api.js        # API configuration
│   ├── pages/
│   │   ├── Checkout.jsx          # Payment page
│   │   ├── CheckoutDetails.jsx   # Customer details
│   │   ├── Confirmation.jsx      # Booking confirmation
│   │   ├── Home.jsx              # Activity listing
│   │   └── SelectDate.jsx        # Date/time selection
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── index.html            # HTML template
└── vite.config.js        # Vite configuration
```

---

## 🐛 Troubleshooting

### **Database Connection Issues**
- Ensure PostgreSQL is running
- Check credentials in `.env` file
- Verify database exists: `Tourism-Booking-Project`

### **Frontend Can't Connect to Backend**
- Ensure backend is running on port 5000
- Check CORS settings in `Backend/server.js`
- Verify API URL in `Fronted/src/config/api.js`

### **Port Already in Use**
```bash
# Backend (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

## 📄 License

MIT License - Feel free to use this project for learning and development!
