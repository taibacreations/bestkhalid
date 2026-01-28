import { defineType } from "sanity";

export const portfolioSeo = defineType({
  name: "portfolioSeo",
  title: "Portfolio SEO",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "seo", type: "seo" },
  ],
});
