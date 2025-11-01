import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function setupNeonDatabase() {
  console.log('🚀 Setting up Neon PostgreSQL database...\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env file');
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 30000, // 30 seconds timeout
  });

  try {
    await client.connect();
    console.log('✅ Connected to Neon database\n');

    // Create experiences table
    console.log('📋 Creating experiences table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS experiences (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500),
        base_price DECIMAL(10, 2) NOT NULL,
        duration VARCHAR(100),
        difficulty_level VARCHAR(50),
        max_group_size INTEGER,
        min_age INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ experiences table created');

    // Create price_breakdowns table
    console.log('📋 Creating price_breakdowns table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS price_breakdowns (
        id SERIAL PRIMARY KEY,
        experience_id INTEGER REFERENCES experiences(id) ON DELETE CASCADE,
        person_type VARCHAR(50) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ price_breakdowns table created');

    // Create time_slots table
    console.log('📋 Creating time_slots table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS time_slots (
        id SERIAL PRIMARY KEY,
        experience_id INTEGER REFERENCES experiences(id) ON DELETE CASCADE,
        slot_time VARCHAR(20) NOT NULL,
        available_seats INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ time_slots table created');

    // Create bookings table
    console.log('📋 Creating bookings table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        booking_id VARCHAR(50) UNIQUE NOT NULL,
        experience_id INTEGER REFERENCES experiences(id),
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        booking_date DATE NOT NULL,
        time_slot VARCHAR(20) NOT NULL,
        number_of_people INTEGER NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50),
        promo_code VARCHAR(50),
        discount DECIMAL(10, 2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(experience_id, booking_date, time_slot)
      );
    `);
    console.log('✅ bookings table created');

    // Create promo_codes table
    console.log('📋 Creating promo_codes table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS promo_codes (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount_type VARCHAR(20) NOT NULL,
        discount_value DECIMAL(10, 2) NOT NULL,
        min_order_amount DECIMAL(10, 2) DEFAULT 0,
        max_discount DECIMAL(10, 2),
        valid_from DATE,
        valid_until DATE,
        is_active BOOLEAN DEFAULT true,
        usage_limit INTEGER,
        times_used INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ promo_codes table created');

    console.log('\n✨ Database setup completed successfully!');
    console.log('📝 Now run: npm run db:seed');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupNeonDatabase();
