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
// Carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "utils/carouselSettings";

function Information({ cardLosts }) {
  return (
    <MKBox component="section" py={2} my={2}>
      <Container>
        <Slider {...settings}>
          {cardLosts.map((lost) => {
            const attributes = lost.attributes || {};
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
              <Grid item xs={12} lg={3} sx={{ mx: "auto" }} key={lost.id}>
                <RotatingCard>
                  <RotatingCardFront
                    image={frontImage}
                    icon="pets"
                    title={attributes.name}
                    description={`${attributes.species}, ${attributes.breed}, ${attributes.age} años`}
                    color="warning"
                  />
                  <RotatingCardBack
                    image={backImage}
                    title={attributes.last_seen_location}
                    description={attributes.description}
                    action={{
                      type: "internal",
                      route: `/lost/${lost.id}`,
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

Information.propTypes = {
  cardLosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        species: PropTypes.string.isRequired,
        breed: PropTypes.string,
        age: PropTypes.number,
        color: PropTypes.string,
        description: PropTypes.string,
        last_seen_location: PropTypes.string,
        state: PropTypes.string,
        date_reported: PropTypes.string,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        publishedAt: PropTypes.string,
        photos: PropTypes.shape({
          data: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              attributes: PropTypes.shape({
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

export default Information;
