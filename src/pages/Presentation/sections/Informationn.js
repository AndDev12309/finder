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
// Images
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "utils/carouselSettings";

function Informationn({ cardFounds }) {
  return (
    <MKBox component="section" py={2} my={2}>
      <Container>
        <Slider {...settings}>
          {cardFounds.map((found) => {
            const frontImage =
              found.photos && found.photos[0]
                ? `${process.env.REACT_APP_API_HOST_URL}${
                    found.photos[0].formats?.medium?.url || found.photos[0].url
                  }`
                : "path/to/default/image.jpg";
            const backImage =
              found.photos && found.photos[1]
                ? `${process.env.REACT_APP_API_HOST_URL}${
                    found.photos[1].formats?.medium?.url || found.photos[1].url
                  }`
                : frontImage;
            return (
              <Grid item xs={12} lg={3} sx={{ mx: "auto" }} key={found.id}>
                <RotatingCard>
                  <RotatingCardFront
                    image={frontImage}
                    icon="pets"
                    title={found.species}
                    description={`${found.breed}, ${found.color}`}
                    color="primary"
                  />
                  <RotatingCardBack
                    image={backImage}
                    title={found.found_location}
                    description={found.description}
                    action={{
                      type: "internal",
                      route: `/found/${found.documentId}`,
                      label: "Ver detalles",
                    }}
                  />
                </RotatingCard>
              </Grid>
            );
          })}
        </Slider>
      </Container>
    </MKBox>
  );
}
Informationn.propTypes = {
  cardFounds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      documentId: PropTypes.string,
      species: PropTypes.string.isRequired,
      breed: PropTypes.string,
      color: PropTypes.string,
      description: PropTypes.string,
      found_location: PropTypes.string,
      state: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      publishedAt: PropTypes.string,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          documentId: PropTypes.string,
          name: PropTypes.string,
          alternativeText: PropTypes.string,
          caption: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
          formats: PropTypes.shape({
            large: PropTypes.shape({
              ext: PropTypes.string,
              url: PropTypes.string.isRequired,
              mime: PropTypes.string,
              width: PropTypes.number,
              height: PropTypes.number,
            }),
            medium: PropTypes.shape({
              ext: PropTypes.string,
              url: PropTypes.string,
              mime: PropTypes.string,
              width: PropTypes.number,
              height: PropTypes.number,
            }),
            small: PropTypes.shape({
              ext: PropTypes.string,
              url: PropTypes.string,
              mime: PropTypes.string,
              width: PropTypes.number,
              height: PropTypes.number,
            }),
            thumbnail: PropTypes.shape({
              ext: PropTypes.string,
              url: PropTypes.string,
              mime: PropTypes.string,
              width: PropTypes.number,
              height: PropTypes.number,
            }),
          }),
          url: PropTypes.string,
          createdAt: PropTypes.string,
          updatedAt: PropTypes.string,
          publishedAt: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};
export default Informationn;
