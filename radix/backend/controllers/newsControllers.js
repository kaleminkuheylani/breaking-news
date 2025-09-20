import News from "../models/news.js";

// GET /api/haber
export const getTumHaberler = async (req, res) => {
  try {
    const { kategori } = req.query;

    const filtre = kategori ? { kategori } : {};
    const haberler = await News.find(filtre).sort({ createdAt: -1 });

    res.json(haberler);
  } catch (err) {
    res.status(500).json({ message: "Haberler alınamadı", error: err });
  }
};

// GET /api/haber/:id
export const getTekHaber = async (req, res) => {
  try {
    const haber = await News.findById(req.params.id);
    if (!haber) {
      return res.status(404).json({ message: "Haber bulunamadı" });
    }
    res.json(haber);
  } catch (err) {
    res.status(500).json({ message: "Haber getirilemedi", error: err });
  }
};

// POST /api/haber
export const haberEkle = async (req, res) => {
  try {
    const { baslik, metin, kategori } = req.body;

    if (!baslik || !metin || !kategori) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur." });
    }

    const yeniHaber = new News({ baslik, metin, kategori });
    await yeniHaber.save();

    res.status(201).json(yeniHaber);
  } catch (err) {
    res.status(500).json({ message: "Haber eklenemedi", error: err });
  }
};

