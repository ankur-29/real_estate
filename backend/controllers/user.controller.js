import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'

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

export const loginUser = async(req,res) => {
    const {email, password} = req.body;
    try {
        const isValidUser = await User.findOne({email});
        if(!isValidUser) {
            res.status(400).json({
                message: 'Email not Registered!',
                success: false
            })
        }
        
        const isValidPassword = bcrypt.compareSync(password, isValidUser.password);
        if(!isValidPassword) {
            res.status(400).json({
                message: 'Password is Incorrect',
                success: false
            })
        }

        const token = jwt.sign({id : isValidUser._id}, process.env.JWT_SECRET_KEY);
        res.cookie('access_token', token, {
            maxAge : 24*60*60*1000, 
            httpOnly : true
        }).status(200).json(isValidUser);

    } catch(err) {
        res.status(501).json({
            message: err.message || 'Internal Server Error',
            success: false,
        })
    }
}