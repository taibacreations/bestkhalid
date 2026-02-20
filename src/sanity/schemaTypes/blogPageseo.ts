import { defineType, defineField } from "sanity";

export const blogSeo = defineType({
  name: "blogSeo",
  title: "Blog SEO",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});