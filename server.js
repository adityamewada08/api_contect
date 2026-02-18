import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { contactRoutes } from "./routes/contactRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "ContactAPI",
  })
  .then(() => {
    console.log("MongoDB is connected....");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
