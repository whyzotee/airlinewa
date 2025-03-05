import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans Thai, sans-serif",
  },
  palette: {
    primary: {
      main: "#ed6c02",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
            font-family: "Noto Sans Thai", sans-serif;
            font-optical-sizing: auto;
            font-weight: <weight>;
            font-style: normal;
            font-variation-settings:
              "wdth" 100;
        }
      `,
    },
  },
});
