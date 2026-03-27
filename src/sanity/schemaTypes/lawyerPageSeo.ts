// sanity/schemas/lawyerPageseo.ts
import { defineType } from "sanity";

export const lawyerPageSeo = defineType({
  name: "lawyerPageSeo",
  title: "Lawyer Page SEO",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "seo", type: "seo" },
  ],
  preview: {
    select: { title: "title" },
  },
});