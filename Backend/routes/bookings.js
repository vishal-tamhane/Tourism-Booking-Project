import express from 'express';
import { body, validationResult } from 'express-validator';
import Booking from '../models/Booking.js';
import PromoCode from '../models/PromoCode.js';

const router = express.Router();

// Validation rules
const bookingValidation = [
  body('experienceId').isInt().withMessage('Valid experience ID is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
  body('customerName').trim().notEmpty().withMessage('Customer name is required'),
  body('customerEmail').isEmail().withMessage('Valid email is required'),
  body('customerPhone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone number is required'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  body('totalAmount').isFloat({ min: 0 }).withMessage('Valid total amount is required'),
];

// POST /api/bookings - Create new booking
router.post('/', bookingValidation, async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => err.msg)
      });
    }
    
    const bookingData = {
      experienceId: req.body.experienceId,
      date: req.body.date,
      timeSlot: req.body.timeSlot,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerPhone: req.body.customerPhone,
      numberOfPeople: 1, // Default to 1 person
      paymentMethod: req.body.paymentMethod,
      totalAmount: req.body.totalAmount,
      promoCode: req.body.promoCode,
      discount: req.body.discount || 0
    };
    
    const booking = await Booking.create(bookingData);
    
    // If promo code was used, increment usage
    if (bookingData.promoCode) {
      await PromoCode.incrementUsage(bookingData.promoCode);
    }
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
    
  } catch (error) {
    if (error.message.includes('already have a booking') || 
        error.message.includes('fully booked') ||
        error.message.includes('not available')) {
      return res.status(409).json({
        success: false,
        error: error.message
      });
    }
    next(error);
  }
});

// GET /api/bookings/:bookingId - Get booking details
router.get('/:bookingId', async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    
    const booking = await Booking.getById(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
    
  } catch (error) {
    next(error);
  }
});

export default router;
