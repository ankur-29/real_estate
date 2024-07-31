import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/db.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/listing', listingRouter);

app.listen(port, () => {
    connectDatabase();
    console.log(`App is running on port ${port}`);
})