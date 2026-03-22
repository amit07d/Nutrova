import mongoose from "mongoose";
import { BmiHistory } from "../models/BmiHistory.model.js";

export const saveBmi = async (req, res) => {
  const { weight, height, status } = req.body;
  
  const userId = req.auth?.userId || req.userId;

  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }

  if (!weight || !height || weight <= 0 || height <= 0) {
    return res.status(400).json({ message: "Invalid weight or height" });
  }

  try {
    const newEntry = new BmiHistory({
      userId,
      weight,
      height,
      status,
    });

    await newEntry.save();

    res.status(201).json({
      success: true,
      message: "BMI saved successfully",
      data: newEntry,
    });
  } catch (error) {
    console.error("Error saving BMI:", error);
    res.status(500).json({
      message: "Failed to save BMI",
      error: error.message,
    });
  }
};

export const getBmiHistory = async (req, res) => {
  const userId = req.auth?.userId || req.userId;
  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }
  try {
    const history = await BmiHistory.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: history.length,
      bmiHistory: history,
    });
  } catch (error) {
    console.error("Error fetching BMI history:", error);
    res.status(500).json({
      message: "Failed to fetch BMI history",
      error: error.message,
    });
  }
};

export const deleteBmiEntry = async (req, res) => {
  const userId = req.auth?.userId || req.userId;
  const entryId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }

  if (!mongoose.Types.ObjectId.isValid(entryId)) {
    return res.status(400).json({ message: "Invalid entry ID" });
  }

  try {
    const deletedEntry = await BmiHistory.findOneAndDelete({
      _id: entryId,
      userId,
    });

    if (!deletedEntry) {
      return res.status(404).json({
        message: "BMI entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "BMI entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting BMI entry:", error);
    res.status(500).json({
      message: "Failed to delete BMI entry",
      error: error.message,
    });
  }
};
