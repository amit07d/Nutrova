import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const BmiHistory = () => {
  const { user } = useUser();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/bmi/history/${user.id}`
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch BMI history:", error);
      }
    };

    if (user?.id) fetchHistory();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your BMI History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500 text-center">No history found.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((entry) => (
            <li key={entry._id} className="border p-4 rounded shadow">
              <p className="text-sm text-gray-500">
                Date: {new Date(entry.createdAt).toLocaleDateString()}
              </p>
              <p className="font-semibold">BMI: {entry.bmi}</p>
              <p>Weight: {entry.weight} kg</p>
              <p>Height: {entry.height} cm</p>
              <p>Status: {entry.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BmiHistory;
