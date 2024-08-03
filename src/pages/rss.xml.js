import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection("blog");

  return rss({
    stylesheet: "/rss/pretty-rss.xsl",
    title: "Kieran's Blog",
    description: "A few musings and a smattering of tutorials",
    site: context.site,
    items: blog.map((post) => {
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/blog/${post.slug}`,
      };
    }),
  });
}
