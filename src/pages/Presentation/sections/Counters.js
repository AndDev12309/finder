// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import propTypes from "prop-types";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React layouts/pages/shared
import DefaultCounterCard from "layouts/pages/shared/Cards/CounterCards/DefaultCounterCard";

function Counters({ lost, found, rescued }) {
  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard count={lost} suffix="+" title="Mascotas Perdidas" />
          </Grid>
          <Grid item xs={12} md={4} display="flex">
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, mx: 0 }} />
            <DefaultCounterCard count={found} suffix="+" title="Mascotas Encontradas" />
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, ml: 0 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard count={rescued} title="Mascotas Rescatadas" />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}
Counters.propTypes = {
  lost: propTypes.number.isRequired,
  found: propTypes.number.isRequired,
  rescued: propTypes.number.isRequired,
};

export default Counters;
