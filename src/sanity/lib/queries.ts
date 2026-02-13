import { groq } from 'next-sanity'

// Get all projects (with category reference)
export const projectsWithCategoryQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "image": image.asset->url,
    "category": category->title,
    "categorySlug": category->slug.current,
    color,
    projectUrl,
    description,
    order,
    featured
  }
`

// Get all categories (sorted by order)
export const categoriesWithOrderQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    order
  }
`

// Get projects by category reference
export const projectsByCategoryReferenceQuery = groq`
  *[_type == "project" && category->slug.current == $categorySlug] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "image": image.asset->url,
    "category": category->title,
    "categorySlug": category->slug.current,
    color,
    projectUrl,
    description,
    order,
    featured
  }
`

// ===== ORIGINAL QUERIES (for simple string category) =====

// Get all projects
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "image": image.asset->url,
    category,
    color,
    projectUrl,
    description,
    order,
    featured
  }
`

// Get projects by category
export const projectsByCategoryQuery = groq`
  *[_type == "project" && category == $category] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "image": image.asset->url,
    category,
    color,
    projectUrl,
    description,
    order,
    featured
  }
`

// Get featured projects
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "image": image.asset->url,
    category,
    color,
    projectUrl,
    description,
    order,
    featured
  }
`

// Get single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "image": image.asset->url,
    category,
    color,
    projectUrl,
    description,
    order,
    featured
  }
`

// Get all unique categories (from string field)
export const categoriesQuery = groq`
  array::unique(*[_type == "project"].category)
`

export const testimonialsQuery = groq`
  *[_type == "testimonial" && isActive == true] | order(order asc) {
    _id,
    name,
    role,
    quote,
    "image": image.asset->url,
    rating
  }
`;