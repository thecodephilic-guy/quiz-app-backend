import express from 'express';
import { submitQuizAnswers } from '../controllers/submissionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// // POST: Submit quiz answers (requires authentication)
router.post('/:quizId/submit', verifyToken, submitQuizAnswers);

// // GET: Get quiz result (requires authentication)
// router.get('/:id/result', verifyToken, getQuizResult);

export default router;
