import express from 'express';
import { createQuiz, getAllQuizzes, getQuizById } from '../controllers/quizController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST: Create a new quiz (requires authentication)
router.post('/create', verifyToken, createQuiz);

// // GET: Get all quizzes
router.get('/', getAllQuizzes);

// // GET: Get a specific quiz by ID
router.get('/:quizId', getQuizById);

// // PUT: Update a quiz (requires authentication)
// router.put('/:id', verifyToken, updateQuiz);

// // DELETE: Delete a quiz (requires authentication)
// router.delete('/:id', verifyToken, deleteQuiz);

export default router;
