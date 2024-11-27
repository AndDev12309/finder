// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/huellasPets.jpeg";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Rastro Animal",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/CreativeTim/",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/creativetim",
    },
    {
      icon: <GitHubIcon />,
      link: "https://github.com/creativetimofficial",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
    },
  ],
  menus: [
    {
      name: "Rastro Animal",
      items: [{ name: "about us", href: "/" }],
    },
    {
      name: "Recursos",
      items: [{ name: "affiliate program", href: "/" }],
    },
    {
      name: "Contactar",
      items: [
        { name: "contact us", href: "/contact-us" },
        { name: "sponsorships", href: "/sponsorships" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "/terms" },
        { name: "privacy policy", href: "/privacy" },
        { name: "licenses (EULA)", href: "/license" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Rastro Animal by{" "}
      <MKTypography
        component="a"
        href="/"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Rastro Animal Group.
      </MKTypography>
      .
    </MKTypography>
  ),
};
