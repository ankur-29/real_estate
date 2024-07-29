import express from 'express';
import { loginUser, registerUser, googleAuth } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/googleAuth', googleAuth);

export default userRouter;