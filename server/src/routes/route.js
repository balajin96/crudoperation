import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { createUser, getUser, updateUser, deleteUser, signup, login } from '../controllers/controllers.js';

const router = express.Router();

router.post('/createUserData', authMiddleware, createUser);
router.get('/getUserData', authMiddleware, getUser);
router.put('/modifyUserData/:id', authMiddleware, updateUser);
router.delete('/deleteUser/:id', authMiddleware, deleteUser);

router.post('/signup', signup);
router.post('/login', login);

export default router;
