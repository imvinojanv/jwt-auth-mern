import express from "express";
import asyncHandler from 'express-async-handler';

import User from '../models/user.model.js';
import generateToken from "../utils/generateToken.js";

const router = express.Router();

// Using try-catch method
export const test = async (req, res) => {
    try {
        res.status(200).json({ message: 'Test user controller is working' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Something went wrong' });
    }
}

// ### Using asyncHandler method - It will handle the error through the errorMiddleware

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email
    });

    // If the user exist && password is matched
    if (user && (await user.matchPassword(password))) {     // call the method which we created on the user model
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({
        email
    });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const createUser = await User.create({
        name,
        email,
        password,
    });

    if (createUser) {
        generateToken(res, createUser._id);

        // Just passing the data, not the token. Token only for HTTP cookie (Best Practice)
        res.status(201).json({
            _id: createUser._id,
            name: createUser.name,
            email: createUser.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = (req, res) => {       // we don't throw any error here, so no need to handle the error with asyncHandler
    res.cookie('JWT_AUTH', '', {        // set the cookie to  null
        httpOnly: true,
        expires: new Date(0),       // expire now
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;     // if the body is not containing name then stay what it is
        user.email = req.body.email || user.email;

        if (req.body.password) {            // if the password is changed
            user.password = req.body.password;
        }

        const updatedUser = await user.save();      // dafault function to save updated data

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


export default router;