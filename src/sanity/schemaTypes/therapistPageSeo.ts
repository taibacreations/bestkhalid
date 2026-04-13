// sanity/schemas/lawyerPageseo.ts
import { defineType } from "sanity";

export const therapistPageSeo = defineType({
  name: "therapistPageSeo",
  title: "Therapist Page SEO",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "seo", type: "seo" },
  ],
  preview: {
    select: { title: "title" },
  },
});