import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const registerUser = async(req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({
            message: 'User created successfullly',
            success: true,
        })
    } catch(err) {
        res.status(501).json({
            message: err.message || 'Internal Server Error',
            success: false,
        })
    }
}