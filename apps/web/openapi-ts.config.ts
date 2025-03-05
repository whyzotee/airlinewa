import { defaultPlugins, defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  // input: "http://127.0.0.1:8000/openapi.json",
  input: {
    path: "http://127.0.0.1:8000/openapi.json",
  },
  // output: "src/client",
  output: {
    path: "src/client",
    format: false,
  },
  plugins: [
    ...defaultPlugins,
    "@hey-api/client-axios",
    "zod",
    "@tanstack/react-query",
  ],
});
