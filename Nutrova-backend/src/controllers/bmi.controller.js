// controllers/bmi.controller.js - UPDATED
import { BmiHistory } from '../models/BmiHistory.model.js';

export const saveBmi = async (req, res) => {
  const { weight, height } = req.body; // Remove status from request
  const userId = req.auth?.userId || req.userId; // Handle both cases

  console.log("Save BMI request - User ID:", userId);
  console.log("Request body:", req.body);

  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }

  if (!weight || !height) {
    return res.status(400).json({ 
      message: "Weight and height are required",
      received: { weight, height }
    });
  }

  try {
    // Create BMI entry - status will be auto-calculated in pre-save hook
    const newEntry = new BmiHistory({ 
      userId, 
      weight: parseFloat(weight), 
      height: parseFloat(height) 
    });
    
    console.log("New entry to save:", newEntry);
    
    await newEntry.save();
    
    console.log("BMI saved successfully. Entry:", newEntry);
    
    res.status(201).json({ 
      message: "BMI saved successfully",
      data: newEntry 
    });
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
    
    res.json({ 
      success: true,
      message: "BMI entry deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting BMI entry:", error);
    res.status(500).json({ 
      message: "Failed to delete BMI entry",
      error: error.message 
    });
  }
};