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
        setHistory(response.data.bmiHistory);
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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your BMI History</h2>
      {loading? ( 
        <p className="text-gray-500 text-center">Loading...</p>
      ): history.length === 0 ? (
        <p className="text-gray-500 text-center">No history found.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((entry) => (
            <li key={entry._id} className="border p-4 rounded shadow">
              <p className="text-sm text-gray-500">
                Date:{" "}
                {new Date(entry.createdAt).toLocaleString("en-US", {
                  dateStyle: "long",
                  timeStyle: "medium",
                })}
              </p>
              <p className="text-sm text-gray-500">User ID: {entry.userId}</p>
              <p className="font-semibold">BMI: {entry.bmi}</p>
              <p>Weight: {entry.weight} kg</p>
              <p>Height: {entry.height} cm</p>
              <p>Status: {entry.status}</p>
              <button
                onClick={() => deleteEntry(entry._id)}
                className="mt-2 text-sm text-red-600 underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BmiHistory;
