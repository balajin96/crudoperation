import express from 'express'
import { createUser, getUser, updateUser, deleteUser, signup, login } from '../controllers/controllers.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


router.post('/signup', signup);
router.post('/login', login);

export default router;
