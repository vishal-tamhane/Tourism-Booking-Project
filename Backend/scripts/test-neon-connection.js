import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  console.log('🔍 Testing Neon database connection...\n');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env file');
    process.exit(1);
  }
  
  console.log('📝 Connection string format: postgresql://user:***@host/database');

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected to Neon database successfully!\n');
    
    const result = await client.query('SELECT NOW(), version()');
    console.log('⏰ Server time:', result.rows[0].now);
    console.log('📊 PostgreSQL version:', result.rows[0].version.split(',')[0]);
    
    // Check if tables exist
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('\n📋 Existing tables:');
    if (tables.rows.length === 0) {
      console.log('   No tables found. Run: npm run db:setup-neon');
    } else {
      tables.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
    }
    
    console.log('\n✨ Connection test completed!');
    
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    if (error.stack) {
      console.error('\n   Stack:', error.stack);
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

testConnection();
