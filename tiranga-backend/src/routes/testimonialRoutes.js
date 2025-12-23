const express = require('express');
const {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getTestimonials);
router.get('/:id', getTestimonial);

// Protected routes
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);
router.patch('/:id/approve', protect, approveTestimonial);

module.exports = router;
