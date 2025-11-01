import pool from '../config/database.js';

class Experience {
  static async getAll() {
    const query = `
      SELECT e.*, 
        COALESCE(
          json_agg(
            json_build_object('label', pb.person_type, 'amount', pb.price)
            ORDER BY pb.id
          ) FILTER (WHERE pb.id IS NOT NULL),
          '[]'
        ) as breakdown
      FROM experiences e
      LEFT JOIN price_breakdowns pb ON e.id = pb.experience_id
      GROUP BY e.id
      ORDER BY e.id
    `;
    
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = `
      SELECT e.*, 
        COALESCE(
          json_agg(
            json_build_object('label', pb.person_type, 'amount', pb.price)
            ORDER BY pb.id
          ) FILTER (WHERE pb.id IS NOT NULL),
          '[]'
        ) as breakdown
      FROM experiences e
      LEFT JOIN price_breakdowns pb ON e.id = pb.experience_id
      WHERE e.id = $1
      GROUP BY e.id
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async checkAvailability(experienceId, date, timeSlot) {
    const query = `
      SELECT COUNT(b.id) as booking_count, ts.available_seats
      FROM time_slots ts
      LEFT JOIN bookings b ON b.experience_id = ts.experience_id 
        AND b.time_slot = ts.slot_time 
        AND b.booking_date = $2
        AND b.status != 'cancelled'
      WHERE ts.experience_id = $1 
        AND ts.slot_time = $3
      GROUP BY ts.available_seats
    `;
    
    const result = await pool.query(query, [experienceId, date, timeSlot]);
    
    if (result.rows.length === 0) {
      return { available: false, message: 'Time slot not found' };
    }
    
    const { booking_count, available_seats } = result.rows[0];
    const available = parseInt(booking_count) < parseInt(available_seats);
    
    return {
      available,
      spotsLeft: available_seats - booking_count,
      message: available ? 'Available' : 'Fully booked'
    };
  }
}

export default Experience;
