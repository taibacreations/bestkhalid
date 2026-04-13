// sanity/schemas/lawyerPageseo.ts
import { defineType } from "sanity";

export const fitnessPageSeo = defineType({
  name: "fitnessPageSeo",
  title: "Fitness Page SEO",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "seo", type: "seo" },
  ],
  preview: {
    select: { title: "title" },
  },
});