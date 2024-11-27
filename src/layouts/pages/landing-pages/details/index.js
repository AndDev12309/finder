import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsFound from "./DetailFound";
import DetailsLost from "./Detailslost";

function DetailPage({ action }) {
  const { id } = useParams();
  const [idlost, setIdLost] = useState(null);

  useEffect(() => {
    if (id) {
      setIdLost(id);
    }
  }, [id]);

  if (action === "lost") return idlost && <DetailsLost id={idlost} />;
  if (action === "found") return idlost && <DetailsFound id={idlost} />;
}

export default DetailPage;

DetailPage.propTypes = {
  action: PropTypes.string.isRequired,
};
