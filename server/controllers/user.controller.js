import express from "express";

const router = express.Router();

export const sample = async (req, res) => {
    res.status(200).json({ message: 'Sample constroller is working' })
}

export default router;