import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Fragment } from "react";

import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { routeTree } from "./routeTree.gen";
import { theme } from "./theme";

const router = createRouter({
  routeTree,
  context: {
    user: null,
  },
  defaultStaleTime: 1_500,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />

          <Toaster position="bottom-right" />
        </ThemeProvider>
      </Provider>
    </Fragment>
  );
}

export default App;
