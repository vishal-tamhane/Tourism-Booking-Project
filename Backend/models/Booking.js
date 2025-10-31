import pool from '../config/database.js';

class Booking {
  static generateBookingId() {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `HWD-${randomNum}`;
  }

  static async create(bookingData) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Check for duplicate booking
      const duplicateCheck = await client.query(
        `SELECT id FROM bookings 
         WHERE experience_id = $1 
         AND booking_date = $2 
         AND time_slot = $3 
         AND customer_email = $4`,
        [bookingData.experienceId, bookingData.date, bookingData.timeSlot, bookingData.customerEmail]
      );
      
      if (duplicateCheck.rows.length > 0) {
        throw new Error('You already have a booking for this experience at this time');
      }
      
      // Check availability
      const availabilityCheck = await client.query(
        `SELECT COUNT(*) as count, ts.max_capacity
         FROM time_slots ts
         LEFT JOIN bookings b ON b.experience_id = ts.experience_id 
           AND b.time_slot = ts.slot_time 
           AND b.booking_date = $2
           AND b.status != 'cancelled'
         WHERE ts.experience_id = $1 AND ts.slot_time = $3
         GROUP BY ts.max_capacity`,
        [bookingData.experienceId, bookingData.date, bookingData.timeSlot]
      );
      
      if (availabilityCheck.rows.length === 0) {
        throw new Error('Time slot not available');
      }
      
      const { count, max_capacity } = availabilityCheck.rows[0];
      if (parseInt(count) >= parseInt(max_capacity)) {
        throw new Error('This time slot is fully booked');
      }
      
      // Create booking
      const bookingId = this.generateBookingId();
      const query = `
        INSERT INTO bookings (
          booking_id, experience_id, booking_date, time_slot,
          customer_name, customer_email, customer_phone,
          address, city, state, zip_code,
          payment_method, subtotal, tax, total_amount,
          promo_code, discount, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *
      `;
      
      const values = [
        bookingId,
        bookingData.experienceId,
        bookingData.date,
        bookingData.timeSlot,
        bookingData.customerName,
        bookingData.customerEmail,
        bookingData.customerPhone,
        bookingData.address || null,
        bookingData.city || null,
        bookingData.state || null,
        bookingData.zipCode || null,
        bookingData.paymentMethod,
        bookingData.subtotal,
        bookingData.tax,
        bookingData.totalAmount,
        bookingData.promoCode || null,
        bookingData.discount || 0,
        'confirmed'
      ];
      
      const result = await client.query(query, values);
      
      await client.query('COMMIT');
      return result.rows[0];
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getById(bookingId) {
    const query = `
      SELECT b.*, e.name as experience_name, e.location
      FROM bookings b
      JOIN experiences e ON b.experience_id = e.id
      WHERE b.booking_id = $1
    `;
    
    const result = await pool.query(query, [bookingId]);
    return result.rows[0];
  }
}

export default Booking;
