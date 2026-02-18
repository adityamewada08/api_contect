import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { contactRoutes } from "./routes/contactRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection (Legacy String)
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Contactapia",  // optional
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
