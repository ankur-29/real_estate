import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/db.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);

app.listen(port, () => {
    connectDatabase();
    console.log(`App is running on port ${port}`);
})