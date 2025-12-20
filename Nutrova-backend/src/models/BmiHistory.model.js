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
    bmi: {
      type: Number,
    },
    status: {
      type: String,
      default: "Calculating..."
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

bmiHistorySchema.pre("validate", function (next) {
  console.log("Pre-validate hook running...");
  
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100;
    this.bmi = parseFloat((this.weight / (heightInMeters ** 2)).toFixed(2));
    
    // Calculate status based on BMI
    if (this.bmi < 18.5) this.status = "Underweight";
    else if (this.bmi < 25) this.status = "Normal";
    else if (this.bmi < 30) this.status = "Overweight";
    else this.status = "Obese";
    
    console.log(`Calculated: Height=${this.height}, Weight=${this.weight}, BMI=${this.bmi}, Status=${this.status}`);
  }
  
  next();
});

export const BmiHistory = mongoose.model("BmiHistory", bmiHistorySchema);