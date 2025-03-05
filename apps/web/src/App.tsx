import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Fragment, useMemo } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { client } from "./client/client.gen";
import { routeTree } from "./routeTree.gen";
import { theme } from "./theme";

const token = localStorage.getItem("token");

client.setConfig({
  baseURL: "http://localhost:8000",
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

const router = createRouter({
  routeTree,
  context: {
    queryClient: null!,
    user: null,
    token: null!,
  },
  defaultStaleTime: 1_500,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <RouterProvider
              router={router}
              context={{
                queryClient,
                token: localStorage.getItem("token"),
              }}
            />

            <Toaster position="bottom-right" />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
