// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import PropTypes from "prop-types";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";

function Informationnn({ cardFounds = [], cardLosts = [] }) {
  // Combine both lists into a single array
  const combinedCards = [...cardFounds, ...cardLosts];

  return (
    <MKBox component="section" py={2} my={2}>
      <Container>
        <Grid container item xs={12} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          {combinedCards.map((card) => {
            const frontImage =
              card.photos && card.photos[0]
                ? `${process.env.REACT_APP_API_HOST_URL}${
                    card.photos[0].formats?.medium?.url || card.photos[0].url
                  }`
                : "path/to/default/image.jpg";
            const backImage =
              card.photos && card.photos[1]
                ? `${process.env.REACT_APP_API_HOST_URL}${
                    card.photos[1].formats?.medium?.url || card.photos[1].url
                  }`
                : frontImage;

            // Determine if card is "found" or "lost" for dynamic field access
            const isLost = card.last_seen_location !== undefined;

            return (
              <Grid item xs={12} lg={3} sx={{ mx: "auto" }} key={card.id}>
                <RotatingCard>
                  <RotatingCardFront
                    image={frontImage}
                    icon="pets"
                    title={isLost ? card.name : card.species}
                    description={
                      isLost
                        ? `${card.species}, ${card.breed}, ${card.age} años`
                        : `${card.breed}, ${card.color}`
                    }
                  />
                  <RotatingCardBack
                    image={backImage}
                    title={isLost ? card.last_seen_location : card.found_location}
                    description={card.description}
                    action={{
                      type: "internal",
                      route: isLost ? `/lost/${card.id}` : `/found/${card.id}`,
                      label: "Ver detalles",
                    }}
                  />
                </RotatingCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </MKBox>
  );
}

Informationnn.propTypes = {
  cardFounds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      species: PropTypes.string.isRequired,
      breed: PropTypes.string,
      color: PropTypes.string,
      description: PropTypes.string,
      found_location: PropTypes.string,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          formats: PropTypes.shape({
            medium: PropTypes.shape({
              url: PropTypes.string,
            }),
          }),
          url: PropTypes.string,
        })
      ),
    })
  ),
  cardLosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      breed: PropTypes.string,
      age: PropTypes.number,
      description: PropTypes.string,
      last_seen_location: PropTypes.string,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          formats: PropTypes.shape({
            medium: PropTypes.shape({
              url: PropTypes.string,
            }),
          }),
          url: PropTypes.string,
        })
      ),
    })
  ),
};

export default Informationnn;
