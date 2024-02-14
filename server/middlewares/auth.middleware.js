import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/user.model.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.JWT_AUTH;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // set the req.user, bcz this req.user we can access from any routes (can fetch the product or user details or whatever using userId)
            req.user = await User.findById(decoded.userId).select('-password');     // password will not be returned

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, Token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, No token');
    }
})