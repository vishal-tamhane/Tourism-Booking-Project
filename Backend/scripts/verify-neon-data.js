import pool from '../config/database.js';

async function verify() {
  try {
    console.log('🔍 Verifying Neon Database Setup...\n');
    
    // Check experiences
    const expResult = await pool.query('SELECT COUNT(*) FROM experiences');
    console.log(`✅ Experiences: ${expResult.rows[0].count} activities`);
    
    // Check price breakdowns
    const priceResult = await pool.query('SELECT COUNT(*) FROM price_breakdowns');
    console.log(`✅ Price Breakdowns: ${priceResult.rows[0].count} entries`);
    
    // Check time slots
    const slotsResult = await pool.query('SELECT COUNT(*) FROM time_slots');
    console.log(`✅ Time Slots: ${slotsResult.rows[0].count} slots`);
    
    // Check promo codes
    const promoResult = await pool.query('SELECT code, discount_type, discount_value, min_order_amount FROM promo_codes');
    console.log(`✅ Promo Codes: ${promoResult.rows.length} codes`);
    promoResult.rows.forEach(p => {
      const discount = p.discount_type === 'percentage' ? `${p.discount_value}%` : `₹${p.discount_value}`;
      console.log(`   - ${p.code}: ${discount} (min: ₹${p.min_order_amount})`);
    });
    
    // Sample activities
    const activities = await pool.query('SELECT id, name, location, base_price FROM experiences LIMIT 3');
    console.log('\n📋 Sample Activities:');
    activities.rows.forEach(a => {
      console.log(`   ${a.id}. ${a.name} - ${a.location} (₹${a.base_price})`);
    });
    
    console.log('\n✨ Neon Database is ready!');
    console.log('🚀 Start the server with: npm start');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

verify();
