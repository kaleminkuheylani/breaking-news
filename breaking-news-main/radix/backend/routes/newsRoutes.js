import express from "express";
import {
  getTumHaberler,
  haberEkle,
  getKategoriler,
  testVeriEkle,
  testKategoriFiltresi,
} from "../controllers/newsControllers.js";
import { verifyToken, checkPostPermission } from "./authRoutes.js";

const router = express.Router();

// 🔁 Güncellenmiş route'lar:
router.get("/", getTumHaberler);
router.get("/kategoriler", getKategoriler);
router.get("/test-filter", testKategoriFiltresi);

// Protected routes - only authenticated and authorized users can create posts
router.post("/", verifyToken, checkPostPermission, haberEkle);
router.post("/test", verifyToken, checkPostPermission, testVeriEkle);



export default router;
