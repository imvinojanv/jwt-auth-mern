import express from "express";

import { sample } from '../controllers/user.controller.js';

const router = express.Router();

// Route to the controllers
router.get('/', sample);

export default router;