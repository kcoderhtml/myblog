import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import mdx from "@astrojs/mdx";
import { vritePlugin } from "@vrite/sdk/astro";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const { VRITE_ACCESS_TOKEN, VRITE_CONTENT_GROUP_ID } = loadEnv(
	import.meta.env.MODE,
	process.cwd(),
	""
);

export default defineConfig({
	adapter: netlify(),
	site: "https://kieranklukas.com",
	integrations: [
		mdx(),
		sitemap(),
		vritePlugin({
			accessToken: VRITE_ACCESS_TOKEN,
			contentGroupId: VRITE_CONTENT_GROUP_ID,
		}),
	],
});
