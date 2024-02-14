import express from "express";

import { 
    test, 
    authUser, 
    registerUser, 
    logoutUser,
    getUserProfile, 
    updateUserProfile 
} from '../controllers/user.controller.js';
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Routes to the controllers
router.get('/test', test);
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
    .get(protect ,getUserProfile)
    .put(protect, updateUserProfile);


export default router;