import { defineType } from "sanity";

export const blogSeo = defineType({
  name: "blogSeo",
  title: "Blog SEO",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "excerpt", type: "text" },
    { name: "content", type: "array", of: [{ type: "block" }] },
    { name: "seo", type: "seo" },
  ],
});
