import "./styles.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
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

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <Toaster position="bottom-right" />
    </ThemeProvider>
  </Provider>
);
