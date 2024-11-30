// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import PropTypes from "prop-types";

import RotatingCard from "layouts/pages/shared/Cards/RotatingCard";
import RotatingCardBack from "layouts/pages/shared/Cards/RotatingCard/RotatingCardBack";
import RotatingCardFront from "layouts/pages/shared/Cards/RotatingCard/RotatingCardFront";

function Informationnn({ cardFounds = [], cardLosts = [] }) {
  const combinedCards = [...cardFounds, ...cardLosts];

  return (
    <MKBox component="section" py={2} my={2}>
      <Container>
        <Grid container item xs={12} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          {combinedCards.map((card) => {
            const attributes = card.attributes || {};
            const photos = attributes.photos?.data || [];

            const frontImage = photos[0]?.attributes
              ? `${process.env.REACT_APP_API_HOST_URL}${
                  photos[0].attributes.formats?.medium?.url || photos[0].attributes.url
                }`
              : "path/to/default/image.jpg";

            const backImage = photos[1]?.attributes
              ? `${process.env.REACT_APP_API_HOST_URL}${
                  photos[1].attributes.formats?.medium?.url || photos[1].attributes.url
                }`
              : frontImage;

            const isLost = attributes.last_seen_location !== undefined;

            return (
              <Grid item xs={12} lg={3} sx={{ mx: "auto" }} key={card.id}>
                <RotatingCard>
                  <RotatingCardFront
                    image={frontImage}
                    icon="check"
                    title={isLost ? attributes.name : attributes.species}
                    description={
                      isLost
                        ? `${attributes.species}, ${attributes.breed}, ${attributes.age} años`
                        : `${attributes.breed}, ${attributes.color}`
                    }
                    color="success"
                  />
                  <RotatingCardBack
                    image={backImage}
                    title={isLost ? attributes.last_seen_location : attributes.found_location}
                    description={card.description}
                    color="success"
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
      attributes: PropTypes.shape({
        species: PropTypes.string.isRequired,
        breed: PropTypes.string,
        color: PropTypes.string,
        description: PropTypes.string,
        found_location: PropTypes.string,
        photos: PropTypes.shape({
          data: PropTypes.arrayOf(
            PropTypes.shape({
              attributes: PropTypes.shape({
                formats: PropTypes.shape({
                  medium: PropTypes.shape({
                    url: PropTypes.string,
                  }),
                }),
                url: PropTypes.string,
              }),
            })
          ),
        }),
      }).isRequired,
    })
  ),
  cardLosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        species: PropTypes.string.isRequired,
        breed: PropTypes.string,
        age: PropTypes.number,
        description: PropTypes.string,
        last_seen_location: PropTypes.string,
        photos: PropTypes.shape({
          data: PropTypes.arrayOf(
            PropTypes.shape({
              attributes: PropTypes.shape({
                formats: PropTypes.shape({
                  medium: PropTypes.shape({
                    url: PropTypes.string,
                  }),
                }),
                url: PropTypes.string,
              }),
            })
          ),
        }),
      }).isRequired,
    })
  ),
};

export default Informationnn;
