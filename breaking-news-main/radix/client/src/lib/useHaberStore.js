import { create } from "zustand";

const useHaberStore = create((set) => ({
  haberler: [],

  // ✅ GET: Tüm haberleri listele
  haberleriYukle: async (kategori = "") => {
    try {
      let url = "http://localhost:5000";
      if (kategori) {
        url += `?kategori=${encodeURIComponent(kategori)}`;
      }
      
      console.log("Gönderilen URL:", url);
      console.log("Kategori:", kategori);
      
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`API isteği başarısız: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Yüklenen haberler:", data);
      set({ haberler: data });
    } catch (err) {
      console.error("Haberler yüklenirken hata oluştu:", err);
    }
  },

  // ✅ POST: Yeni haber ekle
  haberEkle: async ({ baslik, metin, kategori, token }) => {
    try {
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch("http://localhost:5000/", {
        method: "POST",
        headers,
        body: JSON.stringify({ baslik, metin, kategori }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Ekleme isteği başarısız");
      }

      const data = await res.json();
      set((state) => ({
        haberler: [data, ...state.haberler],
      }));
    } catch (err) {
      console.log(err.message);
      console.error("Haber eklenirken hata oluştu:", err);
      throw err; // Re-throw to handle in component
    }
  },
}));

export default useHaberStore;
