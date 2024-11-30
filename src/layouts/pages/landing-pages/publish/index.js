import { useLost } from "data/useLost";
import LostForm from "pages/LandingPages/PublishLost";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PublishPage() {
  const { id } = useParams();
  const [idlost, setIdLost] = useState(null);
  const lost = useLost(idlost, {
    populate: { photos: true },
  });

  useEffect(() => {
    if (id) {
      setIdLost(id);
    }
  }, [id]);
  if (idlost && lost.lost) {
    return <LostForm item={lost.lost} />;
  } else if (!id) {
    return <LostForm />;
  }
}
