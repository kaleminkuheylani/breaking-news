import News from "../models/news.js";

// 🔹 Debug: Tüm kategorileri listele
export const getKategoriler = async (req, res) => {
  try {
    const allNews = await News.find({});
    const kategoriler = [...new Set(allNews.map(n => n.kategori))];
    console.log("Veritabanındaki kategoriler:", kategoriler);
    res.json({ kategoriler, count: kategoriler.length });
  } catch (err) {
    res.status(500).json({ message: "Kategoriler alınamadı", error: err });
  }
};

// 🔹 Debug: Test verisi ekle
export const testVeriEkle = async (req, res) => {
  try {
    const testHaber = new News({
      baslik: "Test Kitap",
      metin: "Bu bir test kitabıdır",
      kategori: "okudugum kitaplar"
    });
    
    await testHaber.save();
    res.json({ message: "Test verisi eklendi", haber: testHaber });
  } catch (err) {
    res.status(500).json({ message: "Test verisi eklenemedi", error: err });
  }
};

// 🔹 Debug: Test kategori filtresi
export const testKategoriFiltresi = async (req, res) => {
  try {
    const { kategori } = req.query;
    console.log("Test filtresi için kategori:", kategori);
    
    // Test exact match
    const exactMatch = await News.find({ kategori: kategori });
    console.log("Exact match count:", exactMatch.length);
    
    // Test regex match
    const regexMatch = await News.find({ 
      kategori: { $regex: new RegExp(`^${kategori.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
    });
    console.log("Regex match count:", regexMatch.length);
    
    res.json({
      kategori,
      exactMatch: exactMatch.length,
      regexMatch: regexMatch.length,
      exactResults: exactMatch,
      regexResults: regexMatch
    });
  } catch (err) {
    res.status(500).json({ message: "Test başarısız", error: err });
  }
};

// 🔹 Tüm haberleri getir (kategori filtresi ile)
export const getTumHaberler = async (req, res) => {
  try {
    const { kategori } = req.query;
    let query = {};
    
    console.log("Gelen kategori parametresi:", kategori);
    
    if (kategori) {
      // Use regex for more flexible matching, especially for categories with spaces
      query.kategori = { $regex: new RegExp(`^${kategori.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') };
      console.log("MongoDB sorgusu (regex):", query);
    }
    
    const haberler = await News.find(query).sort({ createdAt: -1 });
    console.log("Bulunan haber sayısı:", haberler.length);
    
    // Debug: Show all categories in database
    if (kategori) {
      const allNews = await News.find({});
      const allCategories = [...new Set(allNews.map(n => n.kategori))];
      console.log("Veritabanındaki tüm kategoriler:", allCategories);
      console.log("Aranan kategori:", `"${kategori}"`);
      console.log("Kategori uzunluğu:", kategori.length);
      console.log("Kategori karakter kodları:", kategori.split('').map(c => c.charCodeAt(0)));
      
      // Test exact match
      const exactMatch = allNews.filter(n => n.kategori === kategori);
      console.log("Exact match count:", exactMatch.length);
      
      // Test if any category contains the search term
      const containsMatch = allNews.filter(n => n.kategori.includes(kategori));
      console.log("Contains match count:", containsMatch.length);
    }
    
    res.json(haberler);
  } catch (err) {
    console.error("Haber getirme hatası:", err);
    res.status(500).json({ message: "Tüm haberler alınamadı", error: err });
  }
};

// 🔹 Yeni haber ekle
export const haberEkle = async (req, res) => {
  try {
    const { baslik, metin, kategori } = req.body;

    if (!baslik || !metin || !kategori) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur."});
    }

    const yeniHaber = new News({ baslik, metin, kategori });
    
    try {
      await yeniHaber.save();
      res.status(201).json(yeniHaber);
    } catch (saveErr) {
      if (saveErr.name === "ValidationError") {
        return res.status(400).json({ message: "Geçersiz kategori", error: saveErr.message });
      }
      throw saveErr; // Diğer hatalar için
    }
  } catch (err) {
    res.status(500).json({ message: "Haber eklenemedi", error: err });
  }
};
