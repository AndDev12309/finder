import LoadingSpinner from "components/Loading/LoadingSpinner";
import { useFound } from "data/useFound";
import DetailsPage from "pages/LandingPages/Details";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function DetailsFound({ id }) {
  const [idlost, setIdLost] = useState(null);
  const found = useFound(idlost, {
    populate: { photos: true, user: true },
  });

  useEffect(() => {
    if (id) {
      setIdLost(id);
    }
  }, [id]);

  if (!found) {
    return <LoadingSpinner />;
  }

  return found.found && <DetailsPage item={found.found} type="found" />;
}

export default DetailsFound;

DetailsFound.propTypes = {
  id: PropTypes.string.isRequired,
};
