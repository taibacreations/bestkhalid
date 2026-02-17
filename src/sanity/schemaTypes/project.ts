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
      validation: (Rule: Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/).error(
          'Must be a valid hex color (e.g., #FF6B6B or #F00)'
        )
    },
    {
      name: 'scrollSpeed',
      title: 'Image Scroll Speed (ms)',
      type: 'number',
      description:
        'Controls how fast the image pans from top to bottom on hover. Lower = faster, Higher = slower. Recommended range: 1000–5000ms. Leave blank to use the default (2500ms).',
      initialValue: 2500,
      validation: (Rule: Rule) =>
        Rule.min(500)
          .max(10000)
          .error('Scroll speed must be between 500ms and 10,000ms')
          .optional()
    }
  ]
}