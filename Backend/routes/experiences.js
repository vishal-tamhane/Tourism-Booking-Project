import express from 'express';
import Experience from '../models/Experience.js';

const router = express.Router();

// GET /api/experiences - Get all experiences
router.get('/', async (req, res, next) => {
  try {
    const experiences = await Experience.getAll();
    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/experiences/:id - Get single experience by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid experience ID'
      });
    }
    
    const experience = await Experience.getById(id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience not found'
      });
    }
    
    res.json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/experiences/:id/availability - Check availability for a specific date and time
router.get('/:id/availability', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, timeSlot } = req.query;
    
    if (!date || !timeSlot) {
      return res.status(400).json({
        success: false,
        error: 'Date and time slot are required'
      });
    }
    
    const availability = await Experience.checkAvailability(id, date, timeSlot);
    
    res.json({
      success: true,
      data: availability
    });
  } catch (error) {
    next(error);
  }
});

export default router;
