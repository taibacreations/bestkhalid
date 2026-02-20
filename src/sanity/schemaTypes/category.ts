// schemas/category.ts
import { Rule } from "sanity";

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    // ✅ NEW — optional display order
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Optional. Controls the order categories appear in the filter bar. Lower numbers appear first. Leave blank to fall back to alphabetical order.',
      // No validation — fully optional
    }
  ],
  // ✅ Show order in the list view inside Sanity Studio
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: { title: 'title', subtitle: 'order' },
    prepare({ title, subtitle }: { title: string; subtitle?: number }) {
      return {
        title,
        subtitle: subtitle != null ? `Order: ${subtitle}` : 'No order set'
      }
    }
  }
}