// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import PropTypes from "prop-types";

// Material Kit 2 React layouts/pages/shared
import RotatingCard from "layouts/pages/shared/Cards/RotatingCard";
import RotatingCardBack from "layouts/pages/shared/Cards/RotatingCard/RotatingCardBack";
import RotatingCardFront from "layouts/pages/shared/Cards/RotatingCard/RotatingCardFront";
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
            const attributes = found.attributes || {};
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
            return (
              <Grid item xs={12} lg={3} sx={{ mx: "auto" }} key={found.id}>
                <RotatingCard>
                  <RotatingCardFront
                    image={frontImage}
                    icon="pets"
                    title={attributes.species}
                    description={`${attributes.breed}, ${attributes.color}`}
                    color="primary"
                  />
                  <RotatingCardBack
                    image={backImage}
                    title={attributes.found_location}
                    description={attributes.description}
                    action={{
                      type: "internal",
                      route: `/found/${found.id}`,
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
      attributes: PropTypes.shape({
        species: PropTypes.string.isRequired,
        breed: PropTypes.string,
        color: PropTypes.string,
        description: PropTypes.string,
        found_location: PropTypes.string,
        state: PropTypes.string,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        publishedAt: PropTypes.string,
        photos: PropTypes.shape({
          data: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              attributes: PropTypes.shape({
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
              }),
            })
          ),
        }),
      }).isRequired,
    })
  ).isRequired,
};

export default Informationn;
