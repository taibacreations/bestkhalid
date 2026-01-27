"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { SanityBlog } from "@/types/blog";
import BlogCard from "@/components/blogcard";

const BlogPage = () => {
  const [posts, setPosts] = useState<SanityBlog[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res: SanityBlog[] = await client.fetch(`
        *[_type == "blog"] | order(publishedAt desc){
          _id,
          title,
          excerpt,
          "slug": slug.current,
          "category": category->title,
          "mainImage": mainImage.asset->url,
          color,
          content,
          publishedAt
        }
      `);
      setPosts(res);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-screen contact-bg bg-cover bg-center md:pb-[12vh] md:pt-[18vh] pb-[8vh] pt-[14vh]">
        <div className="max-w-[1525px] mx-auto px-4 xl:px-10 w-full">
          <div className="2xl:max-w-[942px] xl:max-w-[880px] lg:max-w-[800px] md:max-w-[650px] max-w-full mx-auto text-center mb-12">
            <h3 className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[142%] capitalize text-white">
              Projects
            </h3>
            <p className="xl:mt-5 mt-3 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] text-white">
              Among the thousands of completed website projects, the ones below
              are a few of my favorites. Web Design is always evolving, and it’s
              been fascinating to see how my work has changed and grown over the
              years.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="relative h-[350px] bg-white/10 animate-pulse">
                  <div className="absolute top-4 left-4">
                    <div className="w-20 h-7 bg-white/20 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="h-6 bg-white/10 rounded w-3/4 mx-auto animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen contact-bg bg-cover bg-center md:pt-[18vh] pt-[14vh] pb-[10vh]">
      <div className="max-w-[1525px] mx-auto px-4 xl:px-10">
        {/* Header */}
        <div className="text-center mb-12 max-w-[900px] mx-auto">
          <h1 className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] text-[32px] text-white">
            Blog
          </h1>
          <p className="mt-4 text-white/80">
            Thoughts, case studies & deep dives into design, performance &
            systems.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {posts.slice(0, visibleCount).map((post, index) => (
            <BlogCard key={post._id} post={post} index={index} />
          ))}
        </div>

        {/* Load more */}
        {visibleCount < posts.length && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setVisibleCount((p) => p + 6)}
              className="lg:px-10 lg:py-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-900 text-white font-bricolage font-semibold text-lg rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};



if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}


export default BlogPage