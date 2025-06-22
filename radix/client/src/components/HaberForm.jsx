import  { useState } from "react";
import { Input, Button, Label } from "reactstrap";
import useHaberStore from "../lib/useHaberStore";

const HaberForm = () => {
  const haberEkle = useHaberStore((state) => state.haberEkle);

  const [baslik, setBaslik] = useState("");
  const [metin, setMetin] = useState("");
  const [kategori, setKategori] = useState("dünya");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!baslik.trim() || !metin.trim()) {
      alert("Başlık ve metin boş olamaz!");
      return;
    }
    haberEkle({ baslik, metin, kategori });
    console.log("Haber eklendi:", { baslik, metin, kategori });
    setBaslik("");
    setMetin("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <option value="dunya">Dünya</option>
        <option value="siyaset">Siyaset</option>
        <option value="futbol">Futbol</option>
        <option value="dizi">Dizi</option>
        <option value="sinema">Sinema</option>
        <option value="magazin">Magazin</option>
      </Input>

      <Button type="submit" color="primary" className="mt-3" block>
        Haber Ekle
      </Button>
    </form>
  );
};

export default HaberForm;
