// sanity/schemaTypes/seo.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "openGraph",
      title: "Open Graph",
      type: "object",
      fields: [
        defineField({
          name: "ogTitle",
          title: "OG Title",
          type: "string",
        }),
        defineField({
          name: "ogDescription",
          title: "OG Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ogImage",
          title: "OG Image",
          type: "image",
          description: "Recommended size: 1200×630px",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "extraMeta",
      title: "Extra Meta (Unlimited)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "content", type: "string" },
          ],
        },
      ],
    }),
  ],
});