import express from 'express';
import { verifyUser } from '../utils/userVerification.js';
import { createListing } from '../controllers/listing.controller.js';

const listingRouter = express.Router();

listingRouter.post('/create', verifyUser, createListing)

export default listingRouter;