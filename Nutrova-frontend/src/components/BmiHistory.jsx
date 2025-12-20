import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const BmiHistory = () => {
  const [history, setHistory] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          "http://localhost:8000/api/bmi/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setHistory(response.data.bmiHistory);
      } catch (error) {
        console.error("Failed to fetch BMI history:", error);
      }
    };

    fetchHistory();
  }, [getToken]);

  const deleteEntry = async (id) => {
    try {
      const token = await getToken();
      await axios.delete(`http://localhost:8000/api/bmi/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory((prev) => prev.filter((entry) => entry._id !== id));
      toast.success("BMI entry deleted");
    } catch (error) {
      console.error("Failed to delete entry:", error);
      toast.error("Failed to delete BMI entry");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Underweight":
        return "bg-blue-100 text-blue-700";
      case "Normal":
        return "bg-green-100 text-green-700";
      case "Overweight":
        return "bg-yellow-100 text-yellow-700";
      case "Obese":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Omnify Search Box Future scope */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">Omnify</h2>
            <p className="text-purple-100">Analyze your BMI with Omnify</p>
          </div>
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask Omnify about your BMI..."
                className="w-full px-6 py-4 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-xl"
              />
              <button className="absolute right-2 top-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BMI History future scope */}
      <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent mb-2">
            BMI History
          </h2>
          <p className="text-gray-600 text-lg">Track and monitor your health progress</p>
        </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-xl">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No BMI records found</h3>
          <p className="text-gray-500">Calculate your BMI to start tracking</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((entry) => (
            <div
              key={entry._id}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-orange-100"
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`${getStatusStyle(
                    entry.status
                  )} px-4 py-2 rounded-full text-sm font-bold shadow-md`}
                >
                  {entry.status}
                </span>
              </div>

              <div className="text-center mb-6">
                <div className="text-sm text-gray-500 mb-1">BMI</div>
                <div className="text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                  {entry.bmi}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-3">
                  <span className="text-gray-700 font-medium">Height:</span>
                  <span className="font-bold text-gray-900">{entry.height} cm</span>
                </div>
                <div className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-3">
                  <span className="text-gray-700 font-medium">Weight:</span>
                  <span className="font-bold text-gray-900">{entry.weight} kg</span>
                </div>
                <div className="text-center text-sm text-gray-500 mt-4">
                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <button
                onClick={() => deleteEntry(entry._id)}
                className="w-full py-3 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-500 hover:text-white border-2 border-red-200 hover:border-red-500 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Delete Entry
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default BmiHistory;