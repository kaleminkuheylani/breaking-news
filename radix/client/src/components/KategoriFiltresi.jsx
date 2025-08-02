// src/components/KategoriFiltresi.js
import React from "react";

const kategoriler = ["Tarot","Spiritüel Dünya","Manifest","Psişik","Web Geliştirme"];

const KategoriFiltresi = ({ aktifKategori, onKategoriSec }) => {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
      {kategoriler.map((kategori) => (
        <button
          key={kategori}
          onClick={() => onKategoriSec(kategori)}
          style={{
            backgroundColor: aktifKategori === kategori ? "#343a40" : "#e0e0e0",
            color: aktifKategori === kategori ? "white" : "black",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default KategoriFiltresi;

