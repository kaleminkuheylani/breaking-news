import { useEffect, useState } from "react";
import useHaberStore from "../lib/useHaberStore";
import Sidebar from "./Sidebar";
import KategoriFiltresi from "./KategoriFiltresi";

const kategoriRenkleri = {
  dunya: "#3498db",
  siyaset: "#e74c3c",
  futbol: "#27ae60",
  dizi: "#9b59b6",
  sinema: "#f1c40f",
  magazin: "#e67e22",
};

const Home = () => {
  const haberler = useHaberStore((state) => state.haberler);
  const haberleriYukle = useHaberStore((state) => state.haberleriYukle);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aktifKategori, setAktifKategori] = useState(null);

  useEffect(() => {
    haberleriYukle();
  }, [haberleriYukle]);

  const filtreliHaberler = aktifKategori
    ? haberler.filter((haber) => haber.kategori === aktifKategori)
    : haberler;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* İçerik Alanı */}
      <div
        style={{
          flex: 1,
          padding: "1rem",
          marginLeft: sidebarOpen ? "300px" : "0",
          transition: "margin 0.3s ease-in-out",
        }}
      >
        {/* Kategori Filtresi */}
        <KategoriFiltresi
          aktifKategori={aktifKategori}
          onKategoriSec={(kategori) =>
            setAktifKategori((prev) => (prev === kategori ? null : kategori))
          }
        />

        {/* Haber Listesi */}
        {filtreliHaberler.length === 0 ? (
          <p>Henüz haber bulunamadı.</p>
        ) : (
          {/* Haber Listesi */}
        {filtreliHaberler.length === 0 ? (
          <p>Henüz haber bulunamadı.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
              gap: "1rem",
              paddingTop: "1rem",
            }}
          >
            {filtreliHaberler.map((haber) => {
              const renk = kategoriRenkleri[haber.kategori] || "#7f8c8d";
              return (
                <div
                  key={haber._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "1rem",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <h4 style={{ marginBottom: "0.5rem" }}>{haber.baslik}</h4>
                  <p style={{ color: "#444", fontSize: "0.95rem" }}>
                    {haber.metin.length > 150
                      ? haber.metin.substring(0, 150) + "..."
                      : haber.metin}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "0.5rem",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "12px",
                      backgroundColor: renk,
                      color: "#fff",
                      fontSize: "0.8rem",
                    }}
                  >
                    {haber.kategori.charAt(0).toUpperCase() +
                      haber.kategori.slice(1)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
        )}
      </div>
    </div>
  );
};

export default Home;

