import { defineType } from "sanity";

export default defineType({
  name: "homePageSeo",
  title: "Home Page SEO",
  type: "document",
  fields: [{ name: "seo", type: "seo" }],
});
