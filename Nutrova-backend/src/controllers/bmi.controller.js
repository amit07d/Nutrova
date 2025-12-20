// controllers/bmi.controller.js - UPDATED
import { BmiHistory } from '../models/BmiHistory.model.js';

export const saveBmi = async (req, res) => {
  const { weight, height, status } = req.body;
  const userId = req.userId;

  try {
    const newEntry = new BmiHistory({ userId, weight, height, status });
    await newEntry.save();
    res.status(201).json({ message: "BMI saved successfully" });
  } catch (error) {
    console.error("Error saving BMI:", error);
    res.status(500).json({ 
      message: "Failed to save BMI",
      error: error.message 
    });
  }
};

export const getBmiHistory = async (req, res) => {
  const userId = req.auth?.userId || req.userId;

  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }

  try {
    console.log("Fetching BMI history for user:", userId);
    
    const history = await BmiHistory.find({ userId }).sort({ createdAt: -1 });
    
    console.log("Found entries:", history.length);
    
    res.json({ 
      success: true,
      bmiHistory: history 
    });
  } catch (error) {
    console.error("Error fetching BMI history:", error);
    res.status(500).json({ 
      message: "Failed to fetch BMI history",
      error: error.message 
    });
  }
};

export const deleteBmiEntry = async (req, res) => {
  const userId = req.auth?.userId || req.userId;
  const entryId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }

  try {
    const entry = await BmiHistory.findOneAndDelete({ 
      _id: entryId, 
      userId 
    });
    
    if (!entry) {
      return res.status(404).json({ message: "BMI entry not found" });
    }
    res.json({ message: "BMI entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting BMI entry:", error);
    res.status(500).json({ 
      message: "Failed to delete BMI entry",
      error: error.message 
    });
  }
};