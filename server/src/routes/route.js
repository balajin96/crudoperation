import express from 'express'
import { createUser, getUser, updateUser, deleteUser, signup, login } from '../controllers/controllers.js';

const router = express.Router();

router.post('/createUserData', createUser);
router.get('/getUserData', getUser);
router.put('/modifyUserData/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);


router.post('/signup', signup);
router.post('/login', login);

export default router;
