import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import bmiRoutes from "./routes/bmi.routes.js";
import { clerkMiddleware } from "@clerk/express"; 

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

// ✅ Use Clerk middleware BEFORE any route using `getAuth`
app.use(clerkMiddleware());

connectDB();

app.use("/api/bmi", bmiRoutes);

app.get("/", (req, res) => {
  res.send("Nutrova Backend is Running!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
