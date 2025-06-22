import express from "express";
import {
  getTumHaberler,
  getTekHaber,
  haberEkle,
} from "../controllers/newsControllers.js";

const router = express.Router();

// 🔁 Güncellenmiş route'lar:
router.get("/", getTumHaberler);         // Tüm haberleri getir (isteğe bağlı ?kategori filtreli)
router.get("/haber/:id", getTekHaber);   // Tekil haber getir (/haber/663aa...)
router.post("/haber", haberEkle);        // Yeni haber ekle

export default router;
