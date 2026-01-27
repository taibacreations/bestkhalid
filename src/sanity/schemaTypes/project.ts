import { Rule } from 'sanity'

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      description: 'Single featured image for the project',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'color',
      title: 'Accent Color (Hex)',
      type: 'string',
      description: 'Used for UI badges (e.g., #FF6B6B)',
      validation: (Rule: Rule) => Rule
        .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)
        .error('Must be a valid hex color (e.g., #FF6B6B or #F00)')
    }
  ]
}