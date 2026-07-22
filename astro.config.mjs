import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  integrations: [svelte()],
  output: "static",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
});
