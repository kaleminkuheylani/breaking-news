import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import newsRoutes from "./routes/newsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();


dotenv.config()
app.use(cors());
app.use(express.json());
// MongoDB connection with proper error handling
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/breaking-news";
    await mongoose.connect(mongoURI);
    console.log("MongoDB bağlı");
  } catch (err) {
    console.error("MongoDB bağlantı hatası:", err.message);
    process.exit(1);
  }
};

connectDB();

// Router'lar burada tanımlanacak
app.use("/", newsRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
