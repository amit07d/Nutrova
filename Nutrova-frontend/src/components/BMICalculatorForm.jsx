import React, { useState } from "react";
import { toast } from "react-toastify";
import BMIGauge from "./BMIGauge";
import BmiHistory from "./BmiHistory";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const BMICalculatorForm = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const { getToken } = useAuth();

  const calculateBMI = async () => {
    if (!gender || !age || !height || !weight) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (age < 2 || age > 120) {
      toast.error("Age must be between 2 and 120 years!");
      return;
    }

    const heightInMeters = height / 100;
    const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    const parsedBMI = parseFloat(calculatedBMI);
    setBmi(parsedBMI);

    const status =
      parsedBMI < 18.5
        ? "Underweight"
        : parsedBMI < 25
        ? "Normal"
        : parsedBMI < 30
        ? "Overweight"
        : "Obese";

    try {
      const token = await getToken();
      await axios.post(
        "http://localhost:8000/api/bmi/save",
        { weight, height, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("BMI saved to history!");
    } catch (error) {
      console.error("Failed to save BMI:", error);
      toast.error("Failed to save BMI.");
    }
  };

  const getMessage = (bmi) => {
    if (bmi < 18.5) return "You need to gain some weight!";
    else if (bmi >= 18.5 && bmi < 25) return "You are healthy! Keep it up!";
    else if (bmi >= 25 && bmi < 30) return "Time to exercise more!";
    else return "Consult a doctor or trainer!";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">BMI Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          {/* Gender Buttons */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setGender("Male")}
              className={`border px-4 py-2 rounded ${gender === "Male" ? "bg-orange-400 text-white" : "bg-white"}`}
            >
              Male
            </button>
            <button
              onClick={() => setGender("Female")}
              className={`border px-4 py-2 rounded ${gender === "Female" ? "bg-orange-400 text-white" : "bg-white"}`}
            >
              Female
            </button>
          </div>

          {/* Age Input */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border w-full p-2 rounded"
              placeholder="Enter your age"
            />
          </div>

          {/* Height Input */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Height (in cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border w-full p-2 rounded"
              placeholder="Enter your height"
            />
          </div>

          {/* Weight Input */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Weight (in kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border w-full p-2 rounded"
              placeholder="Enter your weight"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateBMI}
            className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-2 rounded mt-4 w-full"
          >
            Calculate
          </button>

          {/* View History Toggle Button */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-orange-600 font-medium mt-6 underline w-full"
          >
            {showHistory ? "Hide History" : "View Your BMI History"}
          </button>
        </div>

        {/* BMI Result Section */}
        {bmi !== null && (
          <div className="border rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Your BMI is</h2>
            <div className="text-5xl font-extrabold mb-2">{bmi}</div>
            <BMIGauge bmi={bmi} />
            <div className="text-lg font-semibold text-red-600 mt-4">
              {getMessage(bmi)}
            </div>
            <p className="text-sm mt-4 text-gray-500">
              Healthy BMI range: 18.5 - 25 kg/m²
            </p>
          </div>
        )}
      </div>

      {/* Conditionally Rendered BMI History */}
      {showHistory && (
        <div className="mt-10">
          <BmiHistory />
        </div>
      )}
    </div>
  );
};

export default BMICalculatorForm;
