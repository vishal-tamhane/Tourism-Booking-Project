import pool from '../config/database.js';

class PromoCode {
  static async validate(code, amount) {
    const query = `
      SELECT * FROM promo_codes
      WHERE code = $1 
        AND is_active = true
        AND valid_from <= CURRENT_DATE
        AND valid_until >= CURRENT_DATE
        AND (usage_limit IS NULL OR times_used < usage_limit)
    `;
    
    const result = await pool.query(query, [code.toUpperCase()]);
    
    if (result.rows.length === 0) {
      return {
        valid: false,
        message: 'Invalid or expired promo code'
      };
    }
    
    const promo = result.rows[0];
    
    // Convert string values to numbers
    const minOrderAmount = parseFloat(promo.min_order_amount);
    const discountValue = parseFloat(promo.discount_value);
    const maxDiscount = promo.max_discount ? parseFloat(promo.max_discount) : null;
    
    // Check minimum amount
    if (amount < minOrderAmount) {
      return {
        valid: false,
        message: `Minimum order amount of ₹${minOrderAmount.toFixed(2)} required`
      };
    }
    
    // Calculate discount
    let discount = 0;
    if (promo.discount_type === 'percentage') {
      discount = (amount * discountValue) / 100;
      if (maxDiscount && discount > maxDiscount) {
        discount = maxDiscount;
      }
    } else {
      discount = discountValue;
    }
    
    // Ensure discount is a number
    discount = parseFloat(discount) || 0;
    
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
      SET times_used = times_used + 1
      WHERE code = $1
    `;
    
    await pool.query(query, [code.toUpperCase()]);
  }
}

export default PromoCode;
