import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const BmiHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setHistory(response.data.bmiHistory || []);
      } catch (error) {
        console.error("Failed to fetch BMI history:", error);
        toast.error("Failed to load BMI history");
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading BMI history...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Your BMI History
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-500 text-center">No history found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((entry) => (
            <li key={entry._id} className="border p-4 rounded shadow">
              <p className="text-sm text-gray-500">
                Date:{" "}
                {new Date(entry.createdAt).toLocaleString("en-US", {
                  dateStyle: "long",
                  timeStyle: "medium",
                })}
              </p>

              <p className="font-semibold mt-2">BMI: {entry.bmi}</p>
              <p>Weight: {entry.weight} kg</p>
              <p>Height: {entry.height} cm</p>
              <p>Status: {entry.status}</p>

              <button
                onClick={() => deleteEntry(entry._id)}
                className="w-full mt-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-500 hover:text-white border-2 border-red-200 hover:border-red-500 rounded-xl transition-all"
              >
                Delete Entry
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BmiHistory;
