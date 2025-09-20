const kategoriler = [
  { value: "", label: "Tümü" },
  { value: "tarot", label: "Tarot" },
  { value: "okudugum kitaplar", label: "Okuduğum Kitaplar" },
  { value: "hedefler", label: "Hedefler" },
  { value: "spirituel dunya", label: "Spirituel Dünya" },
  { value: "psikoloji", label: "Psikoloji" }
];

const KategoriFiltresi = ({ aktifKategori, onKategoriSec }) => {
  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {kategoriler.map((kategori) => {
        const secili = aktifKategori === kategori.value;

        return (
          <button
            key={kategori.value}
            onClick={() => onKategoriSec(kategori.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              border: secili ? "2px solid #2c3e50" : "1px solid #ccc",
              backgroundColor: secili ? "#2c3e50" : "#fff",
              color: secili ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: secili ? "bold" : "normal",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {kategori.label}
          </button>
        );
      })}
    </div>
  );
};

export default KategoriFiltresi;
