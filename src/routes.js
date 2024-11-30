// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import PublishPage from "layouts/pages/landing-pages/publish";
import PublishhPage from "layouts/pages/landing-pages/publishh";

// Sections

const routes = [
  {
    name: "Reportar Mascota",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "¡Quiero Ayuda!",
        collapse: [
          {
            name: "Reportar Pérdida",
            route: "/publish-lost",
            component: <PublishPage />,
          },
        ],
      },
      {
        name: "Quiero Ayudar",
        collapse: [
          {
            name: "Reportar Hallazgo",
            route: "/publish-found",
            component: <PublishhPage />,
          },
        ],
      },
    ],
  },
];
export const routesPublic = [];

export const routesPrivate = [
  {
    name: "Reportar Mascota",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "¡Quiero Ayuda!",
        collapse: [
          {
            name: "Reportar Pérdida",
            route: "/publish-lost",
            component: <PublishPage />,
          },
        ],
      },
      {
        name: "Quiero Ayudar",
        collapse: [
          {
            name: "Reportar Hallazgo",
            route: "/publish-found",
            component: <PublishhPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
