import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({
            message: 'User created successfullly',
            success: true,
        })
    } catch (err) {
        res.status(501).json({
            message: err.message || 'Internal Server Error',
            success: false,
        })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isValidUser = await User.findOne({ email });
        if (!isValidUser) {
            res.status(400).json({
                message: 'Email not Registered!',
                success: false
            })
        }

        const isValidPassword = bcrypt.compareSync(password, isValidUser.password);
        if (!isValidPassword) {
            res.status(400).json({
                message: 'Password is Incorrect',
                success: false
            })
        }

        const token = jwt.sign({ id: isValidUser._id }, process.env.JWT_SECRET_KEY);
        res.cookie('access_token', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }).status(200).json(isValidUser);

    } catch (err) {
        res.status(501).json({
            message: err.message || 'Internal Server Error',
            success: false,
        })
    }
}

export const googleAuth = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
            const { password: password, ...rest } = user._doc;
            res.cookie('access_token', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
            }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (err) {
        res.status(501).json({
            message: err.message || 'Internal Server Error',
            success: false,
        })
    }
}

export const updateUser = async (req, res) => {
    if(req.id !== req.params.id) {
        return res.send(401).json({message : 'User can modify their account only'}); 
    }

    try {
        if(req.body.password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
        }
        const updateUser = await User.findByIdAndUpdate(req.param.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true});
        const {password, ...rest} = updateUser._doc;
        res.status(200).json({
            success: true,
            message: 'User updated succesfully',
            user: rest,
        })
    } catch(e) {
        res.status(501).json({
            message: err.message || 'Internal Server Error',
            success: false,
        })
    }
}