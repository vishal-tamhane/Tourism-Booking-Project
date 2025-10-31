# Highway Delite Backend API

Node.js + Express + PostgreSQL backend for the Highway Delite Tourism Booking Platform.

## 🚀 Features

- **RESTful API** with Express.js
- **PostgreSQL Database** with connection pooling
- **Input Validation** using express-validator
- **Double-Booking Prevention** with transaction support
- **Promo Code System** with usage tracking
- **Availability Checking** for time slots
- **CORS Support** for frontend integration

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. **Navigate to Backend folder:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   # Copy the example env file
   copy .env.example .env
   
   # Edit .env and set your PostgreSQL credentials
   ```

   Update the following in `.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=highway_delite
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   ```

4. **Setup PostgreSQL database:**
   ```bash
   npm run db:setup
   ```

5. **Seed initial data:**
   ```bash
   npm run db:seed
   ```

## 🏃 Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
- **GET** `/api/health` - Check if API is running

### Experiences
- **GET** `/api/experiences` - Get all tourism experiences
- **GET** `/api/experiences/:id` - Get single experience by ID
- **GET** `/api/experiences/:id/availability?date=YYYY-MM-DD&timeSlot=HH:MM AM/PM` - Check availability

### Bookings
- **POST** `/api/bookings` - Create new booking
- **GET** `/api/bookings/:bookingId` - Get booking details

### Promo Codes
- **POST** `/api/promo/validate` - Validate promo code

## 📝 API Usage Examples

### Get All Experiences
```javascript
fetch('http://localhost:5000/api/experiences')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Get Single Experience
```javascript
fetch('http://localhost:5000/api/experiences/1')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Check Availability
```javascript
fetch('http://localhost:5000/api/experiences/1/availability?date=2024-06-15&timeSlot=09:00 AM')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Create Booking
```javascript
fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    experienceId: 1,
    date: '2024-06-15',
    timeSlot: '09:00 AM',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '9876543210',
    address: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    paymentMethod: 'Visa',
    subtotal: 1999,
    tax: 359.82,
    totalAmount: 2358.82
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Validate Promo Code
```javascript
fetch('http://localhost:5000/api/promo/validate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    code: 'WELCOME10',
    amount: 1999
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## 🎟️ Available Promo Codes

| Code | Type | Discount | Min Amount | Max Discount |
|------|------|----------|------------|--------------|
| `WELCOME10` | Percentage | 10% | ₹1000 | ₹500 |
| `SUMMER25` | Percentage | 25% | ₹3000 | ₹1000 |
| `FLAT200` | Fixed | ₹200 | ₹1500 | - |

## 🗄️ Database Schema

### Tables
- **experiences** - Tourism activities/experiences
- **price_breakdowns** - Itemized pricing for experiences
- **time_slots** - Available time slots for bookings
- **bookings** - Customer booking records
- **promo_codes** - Promotional discount codes

### Key Features
- Foreign key constraints
- Unique constraints to prevent double-booking
- Indexes for query optimization
- Automatic timestamp tracking
- Cascade delete support

## 🔒 Business Logic

### Double-Booking Prevention
- Checks existing bookings before creating new ones
- Prevents same email from booking same experience/time
- Validates capacity constraints per time slot
- Uses database transactions for data consistency

### Promo Code Validation
- Checks expiration dates
- Validates minimum order amount
- Enforces usage limits
- Automatically increments usage counter
- Supports percentage and fixed discounts

## 📂 Project Structure

```
Backend/
├── config/
│   └── database.js          # PostgreSQL connection pool
├── database/
│   └── schema.sql            # Database schema
├── models/
│   ├── Booking.js            # Booking model & logic
│   ├── Experience.js         # Experience model & queries
│   └── PromoCode.js          # Promo code validation
├── routes/
│   ├── bookings.js           # Booking endpoints
│   ├── experiences.js        # Experience endpoints
│   └── promo.js              # Promo code endpoints
├── scripts/
│   ├── setup-database.js     # DB setup script
│   └── seed-data.js          # Data seeding script
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
└── server.js                 # Express server entry point
```

## 🧪 Testing

Test the API using:
- **Postman** - Import endpoints and test manually
- **cURL** - Command-line testing
- **Frontend** - Connect your React app

Example cURL:
```bash
curl http://localhost:5000/api/experiences
```

## 🛡️ Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `409` - Conflict (double-booking)
- `500` - Internal Server Error

## 🚨 Troubleshooting

**Database connection error:**
- Verify PostgreSQL is running
- Check credentials in `.env` file
- Ensure database exists (run `npm run db:setup`)

**Port already in use:**
- Change `PORT` in `.env` file
- Kill process using port 5000

**Module not found errors:**
- Run `npm install` again
- Check Node.js version (v18+)

## 📦 Dependencies

- **express** - Web framework
- **pg** - PostgreSQL client
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **express-validator** - Input validation

## 🔄 Integration with Frontend

Update your React frontend to use API:

```javascript
// In your React component
const API_URL = 'http://localhost:5000/api';

// Fetch experiences
const response = await fetch(`${API_URL}/experiences`);
const data = await response.json();
```

Remember to:
1. Start backend server first (`npm start`)
2. Update frontend API URLs
3. Handle CORS if needed

## 📄 License

MIT

---

**Need help?** Check the logs in the terminal for detailed error messages.
