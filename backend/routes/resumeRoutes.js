/* --- File: backend/routes/resumeRoutes.js --- */
const express = require('express');
const router = express.Router();
const { uploadResume, getAllResumes, getResumeById, deleteResume, matchResume, getFreshJobs, getDashboardStats } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', protect, uploadResume);
router.get('/', protect, getAllResumes);
router.get('/:id', protect, getResumeById);
router.delete('/:id', protect, deleteResume);
router.post('/match', protect, matchResume);
router.post('/search-jobs', protect, getFreshJobs);
router.get('/stats/dashboard', protect, getDashboardStats);

module.exports = router;
