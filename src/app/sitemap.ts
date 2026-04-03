import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.bestkhalid.com";

  // Blogs
  const blogs = await client.fetch(`
    *[_type == "blog"]{
      "slug": slug.current,
      _updatedAt
    }
  `);

  return [
    // Static pages
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/lawyer-website-design`,
      lastModified: new Date(),
    },

    // Dynamic blog pages
    ...blogs.map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog._updatedAt,
    })),
  ];
}