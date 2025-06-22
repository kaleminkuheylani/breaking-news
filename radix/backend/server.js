import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import  newsRoutes from "./routes/newsRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB bağlı"))
.catch((err) => console.error(err));

// Router'lar burada tanımlanacak
app.use("", newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
