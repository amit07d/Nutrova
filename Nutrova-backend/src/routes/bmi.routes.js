import express from "express";
import { saveBmi, getBmiHistory } from '../controllers/bmi.controller.js'

const router = express.Router();

router.post("/save", saveBmi);
router.get("/history/:userId", getBmiHistory);

export default router;
