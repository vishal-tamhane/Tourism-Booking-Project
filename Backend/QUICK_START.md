# 🚀 Quick Start Guide - Highway Delite Backend

## Setup Steps (One-time)

### 1. Install PostgreSQL
Download and install from: https://www.postgresql.org/download/windows/

During installation:
- Set password for `postgres` user (remember this!)
- Default port: 5432
- Select all components

### 2. Configure Environment
Open `Backend\.env` and update your password:
```env
DB_PASSWORD=your_postgres_password_here
```

### 3. Create Database
```bash
cd Backend
npm run db:setup
```

### 4. Seed Initial Data
```bash
npm run db:seed
```

## Running the Server

```bash
cd Backend
npm start
```

Or with auto-reload:
```bash
npm run dev
```

## Testing the API

Open browser and visit:
- http://localhost:5000/api/health
- http://localhost:5000/api/experiences

## Common Issues

**"password authentication failed"**
→ Update `DB_PASSWORD` in `.env` file

**"database does not exist"**
→ Run `npm run db:setup`

**"port 5000 already in use"**
→ Change `PORT` in `.env` file

**"relation does not exist"**
→ Run `npm run db:setup` to create tables

## Next Steps

1. ✅ Backend is ready!
2. Update Frontend to use API endpoints
3. Test booking flow end-to-end

## API Base URL
```
http://localhost:5000/api
```

## Available Endpoints

- `GET /experiences` - All activities
- `GET /experiences/:id` - Single activity
- `POST /bookings` - Create booking
- `POST /promo/validate` - Check promo code

## Test Promo Codes

- `WELCOME10` - 10% off (min ₹1000)
- `SUMMER25` - 25% off (min ₹3000)
- `FLAT200` - ₹200 off (min ₹1500)
