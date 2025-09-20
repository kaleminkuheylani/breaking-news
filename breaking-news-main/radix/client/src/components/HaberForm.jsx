import  { useState } from "react";
import { Input, Button, Label, Alert } from "reactstrap";
import useHaberStore from "../lib/useHaberStore";
import useAuthStore from "../lib/useAuthStore";

const HaberForm = () => {
  const haberEkle = useHaberStore((state) => state.haberEkle);
  const { token, canPost } = useAuthStore();

  const [baslik, setBaslik] = useState("");
  const [metin, setMetin] = useState("");
  const [kategori, setKategori] = useState("tarot");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!baslik.trim() || !metin.trim()) {
      setError("Başlık ve metin boş olamaz!");
      return;
    }

    if (!canPost()) {
      setError("Bu işlem için yetkiniz yok!");
      return;
    }

    try {
      await haberEkle({ baslik, metin, kategori, token });
      console.log("Haber eklendi:", { baslik, metin, kategori });
      setBaslik("");
      setMetin("");
    } catch (err) {
      setError(err.message || "Haber eklenirken hata oluştu");
    }
  };

  if (!canPost()) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Alert color="warning">
          <h5>Yetki Gerekli</h5>
          <p>Yeni haber eklemek için giriş yapmanız gerekiyor.</p>
          <p>Sadece yetkili kullanıcılar yeni içerik ekleyebilir.</p>
        </Alert>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert color="danger" style={{ marginBottom: "1rem" }}>
          {error}
        </Alert>
      )}
      
      <Label for="baslik">Başlık</Label>
      <Input
        id="baslik"
        value={baslik}
        onChange={(e) => setBaslik(e.target.value)}
        placeholder="Başlık girin"
      />

      <Label for="metin" className="mt-2">Haber Metni</Label>
      <Input
        id="metin"
        type="textarea"
        rows="4"
        value={metin}
        onChange={(e) => setMetin(e.target.value)}
        placeholder="Haber metnini girin"
      />

      <Label for="kategori" className="mt-2">Kategori</Label>
      <Input
        id="kategori"
        type="select"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      >
        <option value="tarot">Tarot</option>
        <option value="okudugum kitaplar">Okuduğum Kitaplar</option>
        <option value="hedefler">Hedefler</option>
        <option value="spirituel dunya">Spirituel Dünya</option>
        <option value="psikoloji">Psikoloji</option>
      </Input>

      <Button type="submit" color="primary" className="mt-3" block>
        Haber Ekle
      </Button>
    </form>
  );
};

export default HaberForm;
