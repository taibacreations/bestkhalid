import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogCategory",
  title: "Blog Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "color",
      title: "Accent Color",
      type: "string",
      description: "Used for gradient badges on blog cards",
      initialValue: "#3B82F6",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-F]{3}){1,2}$/i).error(
          "Must be a valid hex color"
        ),
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});
