import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export const revalidate = 60; // 👈 IMPORTANT

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.bestkhalid.com";

  const blogs = await client.fetch(`
    *[_type == "blog"]{
      "slug": slug.current,
      _updatedAt
    }
  `);

  return [
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
    {
      url: `${baseUrl}/fitness-coach-website-design`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/therapist-website-design`,
      lastModified: new Date(),
    },

    ...blogs.map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog._updatedAt),
    })),
  ];
}
