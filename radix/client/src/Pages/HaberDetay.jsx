import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useHaberStore from "../lib/useHaberStore"
import { Container } from "reactstrap";

const HaberDetay = () => {
  const { id } = useParams();
  const haberler = useHaberStore((state) => state.haberler);
  const haberleriYukle = useHaberStore((state) => state.haberleriYukle);

  const [haber, setHaber] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (haberler.length === 0) {
        await haberleriYukle();
      }
      const secilen = useHaberStore.getState().haberler.find((h) => h._id === id);
      setHaber(secilen);
    };

    fetchData();
  }, [id, haberler, haberleriYukle]);

  if (!haber) return <div>Yükleniyor...</div>;

  return (
    <Container className="mt-4">
      <h2>{haber.baslik}</h2>
      <p>{haber.metin}</p>
      <span className="badge bg-info">{haber.kategori}</span>
    </Container>
  );
};

export default HaberDetay;
