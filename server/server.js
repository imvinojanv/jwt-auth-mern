import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/user.routes.js';

const app = express();

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

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