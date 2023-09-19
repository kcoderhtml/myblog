import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { vritePlugin } from "@vrite/sdk/astro";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";
import svelte from "@astrojs/svelte";

const { VRITE_ACCESS_TOKEN, VRITE_CONTENT_GROUP_ID } = loadEnv(
	import.meta.env.MODE,
	process.cwd(),
	""
);

export default defineConfig({
	site: "https://kieranklukas.com/",
	integrations: [
		mdx(),
		svelte(),
		sitemap(),
		vritePlugin({
			accessToken: VRITE_ACCESS_TOKEN,
			contentGroupId: VRITE_CONTENT_GROUP_ID,
		}),
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
