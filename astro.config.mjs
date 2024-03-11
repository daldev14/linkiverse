import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  integrations: [tailwind()],
});
