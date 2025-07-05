import express from 'express';
import { signup, login, getMe, logout, appleSignIn, googleSignIn } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/me', getMe);

router.post('/logout', logout);

router.post('/apple', appleSignIn);

router.post('/google', googleSignIn);

export default router;
