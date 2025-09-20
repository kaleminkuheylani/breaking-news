import { useEffect } from "react";
import { Card, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import useHaberStore from "../lib/useHaberStore";

const HaberListesi = () => {
  const haberler = useHaberStore((state) => state.haberler);
  const haberleriYukle = useHaberStore((state) => state.haberleriYukle);

  useEffect(() => {
    haberleriYukle();
    console.log("haberler yüklendi");
  }, [haberleriYukle]);

  if (haberler.length === 0) return <p>Henüz haber yok.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {haberler.map((haber) => (
        <Card key={haber._id} style={{ cursor: "pointer" }}>
          <CardBody>
            <CardTitle tag="h5">
              <Link to={`/haber/${haber._id}`}>{haber.baslik}</Link>
            </CardTitle>
            <CardText>{haber.metin.substring(0, 100)}...</CardText>
            <Badge color="info">{haber.kategori}</Badge>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default HaberListesi;
