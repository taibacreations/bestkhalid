import { defineType } from "sanity";

export default defineType({
  name: "homePageSeo",
  title: "Home Page SEO",
  type: "document",
  fields: [
    { name: "seo", type: "seo" },
    {
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image shown when shared on social media (1200×630px recommended)",
      options: { hotspot: true },
    },
  ],
});