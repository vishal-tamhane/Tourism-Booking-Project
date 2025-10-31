# 🏔️ Highway Delite - Tourism Booking Platform

A full-stack tourism booking platform with React frontend and Node.js/Express backend.

## 📁 Project Structure

```
Project_Highway_Delite/
├── Backend/          # Node.js + Express + PostgreSQL API
└── Fronted/         # React + Vite + Tailwind CSS
```

## 🚀 Deployment on Vercel

### **Backend Deployment**

1. **Push Backend to Vercel:**
   - Create a new Vercel project from the `Backend` folder
   - Set Framework Preset: **Other**
   - Root Directory: `Backend`

2. **Set Environment Variables in Vercel:**
   ```
   PORT=5000
   NODE_ENV=production
   DB_HOST=your-database-host
   DB_PORT=5432
   DB_NAME=your-database-name
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
   ```

3. **Database Options:**
   - Use **Vercel Postgres** (recommended)
   - Or external provider: **Neon**, **Supabase**, **Railway**

4. **After Deployment:**
   - Run database setup scripts via Vercel CLI or connect to DB directly
   - Get your backend URL: `https://your-backend.vercel.app`

---

### **Frontend Deployment**

1. **Push Frontend to Vercel:**
   - Create a new Vercel project from the `Fronted` folder
   - Set Framework Preset: **Vite**
   - Root Directory: `Fronted`

2. **Set Environment Variables in Vercel:**
   ```
   VITE_API_BASE_URL=https://your-backend.vercel.app/api
   ```

3. **Deploy!**

---

## 🏠 Local Development

### **Backend**
```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run db:setup  # Setup database schema
npm run db:seed   # Seed initial data
npm start
```

### **Frontend**
```bash
cd Fronted
npm install
cp .env.example .env.local
# Edit .env.local if needed (defaults to localhost:5000)
npm run dev
```

---

## 🎯 Features

- 🗓️ Activity booking with date/time selection
- 💳 Multiple payment options
- 🎟️ Promo code validation (WELCOME10, SUMMER25, FLAT200)
- 🔍 Real-time search and filtering
- 📱 Fully responsive design
- 💰 Dynamic pricing with 18% tax calculation
- ✅ Double-booking prevention

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

- `GET /api/experiences` - List all activities
- `GET /api/experiences/:id` - Get activity details
- `GET /api/experiences/:id/availability` - Check availability
- `POST /api/bookings` - Create booking
- `POST /api/promo/validate` - Validate promo code
- `GET /api/health` - Health check
- `GET /api/db-status` - Database status

---

## 📧 Support

For issues or questions, contact the development team.

---

## 📄 License

MIT License - Feel free to use for your projects!
