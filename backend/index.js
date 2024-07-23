import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());


app.listen(port, () => {
    connectDatabase();
    console.log(`App is running on port ${port}`);
})