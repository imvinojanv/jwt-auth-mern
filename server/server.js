import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js'; 
import userRoutes from './routes/user.routes.js';

connectDB();

const app = express();

// Bodyparser middleware to allow to pass the form data through req body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});

/////////////// TODO: //////////////
// ** POST /api/users ** — Register a user
// ** POST /api/users/auth ** Authenticate a user and get token
// ** POST /api/users/logout ** - Logout user and clear cookie
// ** GET /api/users/profile ** Get user profile
// ** PUT /api/users/profite ** Update profile