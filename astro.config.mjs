import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";
import svelte from "@astrojs/svelte";

export default defineConfig({
	site: "https://kieranklukas.com/",
	integrations: [
		mdx(),
		svelte(),
		sitemap()
	],
	markdown: {
		shikiConfig: {
			theme: "nord",
		},
	},
	vite: {
		optimizeDeps: { exclude: ["fsevents"] },
	},
	experimental: {
		viewTransitions: true,
	},
});
