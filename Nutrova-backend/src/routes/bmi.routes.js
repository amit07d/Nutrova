import express from "express";
import { saveBmi, getBmiHistory, deleteBmiEntry } from '../controllers/bmi.controller.js';
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.post("/save", requireAuth, saveBmi);
router.get("/history", requireAuth, getBmiHistory);
router.delete("/:id", requireAuth, deleteBmiEntry);


export default router;
