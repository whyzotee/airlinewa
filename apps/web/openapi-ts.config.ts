import { defaultPlugins, defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: {
    path: "http://127.0.0.1:8000/api/openapi.json",
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
