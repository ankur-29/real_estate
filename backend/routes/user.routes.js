import express from 'express';
import { loginUser, registerUser, googleAuth, updateUser, deleteUser, logoutUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/userVerification.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/googleAuth', googleAuth);
userRouter.post('/update/:id', verifyUser, updateUser);
userRouter.delete('/delete/:id', verifyUser, deleteUser);
userRouter.get('/logout', logoutUser);

export default userRouter;