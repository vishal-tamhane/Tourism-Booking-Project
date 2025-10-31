import pool from '../config/database.js';

class PromoCode {
  static async validate(code, amount) {
    const query = `
      SELECT * FROM promo_codes
      WHERE code = $1 
        AND is_active = true
        AND valid_from <= CURRENT_DATE
        AND valid_until >= CURRENT_DATE
        AND (usage_limit IS NULL OR used_count < usage_limit)
    `;
    
    const result = await pool.query(query, [code.toUpperCase()]);
    
    if (result.rows.length === 0) {
      return {
        valid: false,
        message: 'Invalid or expired promo code'
      };
    }
    
    const promo = result.rows[0];
    
    // Check minimum amount
    if (amount < promo.min_amount) {
      return {
        valid: false,
        message: `Minimum order amount of ₹${promo.min_amount} required`
      };
    }
    
    // Calculate discount
    let discount = 0;
    if (promo.discount_type === 'percentage') {
      discount = (amount * promo.discount_value) / 100;
      if (promo.max_discount && discount > promo.max_discount) {
        discount = promo.max_discount;
      }
    } else {
      discount = promo.discount_value;
    }
    
    return {
      valid: true,
      code: promo.code,
      discount: parseFloat(discount.toFixed(2)),
      message: `Promo code applied! You saved ₹${discount.toFixed(2)}`
    };
  }

  static async incrementUsage(code) {
    const query = `
      UPDATE promo_codes
      SET used_count = used_count + 1
      WHERE code = $1
    `;
    
    await pool.query(query, [code.toUpperCase()]);
  }
}

export default PromoCode;
