import { create } from "zustand";

const useHaberStore = create((set) => ({
  haberler: [],

  // GET: Tüm haberleri listele (opsiyonel kategori filtresi)
  haberleriYukle: async (kategori="") => {
    try {
      const url = kategori
        ? `http://localhost:5000/?kategori=${encodeURIComponent(kategori)}`
        : "http://localhost:5000/";
      const res = await fetch(url);
      if (!res.ok) throw new Error("API isteği başarısız");
      const data = await res.json();

      console.log("Gelen haberler (store içinde):", data); // ✅ kontrol
      set(() => ({ haberler: data }));
    } catch (err) {
      console.error("Haberler yüklenirken hata oluştu:", err);
    }
  },

  // GET: Tekil haber
  haberDetayGetir: async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/haber/${id}`);
      if (!res.ok) throw new Error("Detay isteği başarısız");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Haber detay getirilemedi:", err);
      return null;
    }
  },

  // POST: Yeni haber ekle
  haberEkle: async ({ baslik, metin, kategori }) => {
    try {
      const res = await fetch("http://localhost:5000/haber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baslik, metin, kategori }),
      });

      if (!res.ok) throw new Error("Ekleme isteği başarısız");

      const data = await res.json();
      set((state) => ({ haberler: [data, ...state.haberler] }));
    } catch (err) {
      console.error("Haber eklenirken hata oluştu:", err);
    }
  },
}));

export default useHaberStore;
