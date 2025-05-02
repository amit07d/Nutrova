import { BmiHistory } from '../models/BmiHistory.model.js';

export const saveBmi = async (req, res) => {
  
  const { userId, weight, height, status } = req.body;
  try {
    const newEntry = new BmiHistory({ userId, weight, height, status });
    await newEntry.save();
    res.status(201).json({ message: "BMI saved successfully" });
  } catch (error) {
    console.error("Error saving BMI:", error);
    res.status(500).json({ message: "Failed to save BMI" });
  }
};

export const getBmiHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const history = await BmiHistory.find({ userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch BMI history" });
  }
};





