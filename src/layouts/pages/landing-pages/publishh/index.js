import { useFound } from "data/useFound";
import FoundForm from "pages/LandingPages/PublishFound";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PublishhPage() {
  const { id } = useParams();
  const [idFound, setIdFound] = useState(null);
  const found = useFound(idFound, {
    populate: { photos: true },
  });

  useEffect(() => {
    if (id) {
      setIdFound(id);
    }
  }, [id]);
  if (idFound && found.found) {
    return <FoundForm item={found.found} />;
  } else if (!id) {
    return <FoundForm />;
  }
}
