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
    res.status(500).json({ message: "Failed to save BMI" });
  }
};

export const getBmiHistory = async (req, res) => {
  const userId = req.userId;

  try {
    const history = await BmiHistory.find({ userId }).sort({ createdAt: -1 });
    res.json({ bmiHistory: history });
  } catch (error) {
    console.error("Error fetching BMI history:", error);
    res.status(500).json({ message: "Failed to fetch BMI history" });
  }
};

export const deleteBmiEntry = async (req, res) => {
  const userId = req.userId;
  const entryId = req.params.id;

  try {
    const entry = await BmiHistory.findOneAndDelete({ _id: entryId, userId });
    if (!entry) {
      return res.status(404).json({ message: "BMI entry not found" });
    }
    res.json({ message: "BMI entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting BMI entry:", error);
    res.status(500).json({ message: "Failed to delete BMI entry" });
  }
};
