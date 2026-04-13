import { type SchemaTypeDefinition } from 'sanity'
import category from './category'
import project from './project'
import blog from './blog'
import blogCategory from './blogCategory'
import seo from './seo'
import homePageseo from './homePageseo'
import { portfolioSeo } from './portfolioseo'
import contactPageseo from './contactPageseo'
import { blogSeo } from './blogPageseo'
import testimonial from './testimonial'
import { lawyerPageSeo } from './lawyerPageSeo'
import { fitnessPageSeo } from './fitnessPageSeo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, category, testimonial, blog, blogCategory, seo, homePageseo, portfolioSeo, contactPageseo, blogSeo, lawyerPageSeo,fitnessPageSeo],
}
  