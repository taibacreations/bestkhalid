import { type SchemaTypeDefinition } from 'sanity'
import category from './category'
import project from './project'
import blog from './blog'
import blogCategory from './blogCategory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, category, blog, blogCategory],
}
  