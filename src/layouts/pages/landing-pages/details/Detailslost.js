import LoadingSpinner from "components/Loading/LoadingSpinner";
import { useLost } from "data/useLost";
import DetailsPage from "pages/LandingPages/Details";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function DetailsLost({ id }) {
  const [idlost, setIdLost] = useState(null);
  const lost = useLost(idlost, {
    populate: { photos: true },
  });

  useEffect(() => {
    if (id) {
      setIdLost(id);
    }
  }, [id]);

  if (!lost) {
    return <LoadingSpinner />;
  }

  return lost.lost && <DetailsPage item={lost.lost} type="lost" />;
}

export default DetailsLost;

DetailsLost.propTypes = {
  id: PropTypes.string.isRequired,
};
