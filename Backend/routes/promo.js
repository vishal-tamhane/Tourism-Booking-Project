import express from 'express';
import { body, validationResult } from 'express-validator';
import PromoCode from '../models/PromoCode.js';

const router = express.Router();

// Validation rules
const promoValidation = [
  body('code').trim().notEmpty().withMessage('Promo code is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
];

// POST /api/promo/validate - Validate promo code
router.post('/validate', promoValidation, async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => err.msg)
      });
    }
    
    const { code, amount } = req.body;
    
    const result = await PromoCode.validate(code, amount);
    
    if (!result.valid) {
      return res.status(400).json({
        success: false,
        error: result.message
      });
    }
    
    res.json({
      success: true,
      data: {
        code: result.code,
        discount: result.discount,
        message: result.message
      }
    });
    
  } catch (error) {
    next(error);
  }
});

export default router;
