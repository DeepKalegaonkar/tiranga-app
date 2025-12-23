const express = require('express');
const {
  createEnquiry,
  getEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
  addNote,
  exportToExcel,
  getStats
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/', createEnquiry);

// Protected routes
router.get('/', protect, getEnquiries);
router.get('/stats/dashboard', protect, getStats);
router.get('/export/excel', protect, exportToExcel);
router.get('/:id', protect, getEnquiry);
router.put('/:id', protect, updateEnquiry);
router.delete('/:id', protect, deleteEnquiry);
router.post('/:id/notes', protect, addNote);

module.exports = router;
