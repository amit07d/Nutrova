import mongoose from "mongoose";

const bmiHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
      min: 50,
    },
    weight: {
      type: Number,
      required: true,
      min: 2,
    },
    bmi: Number,
    status: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

bmiHistorySchema.pre("save", function (next) {
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100;
    this.bmi = parseFloat((this.weight / (heightInMeters ** 2)).toFixed(2));
  }
  next();
});

export const BmiHistory = mongoose.model("BmiHistory", bmiHistorySchema);
