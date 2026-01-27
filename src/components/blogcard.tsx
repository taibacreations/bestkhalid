import Link from "next/link";
import { useState } from "react";

interface SanityBlog {
  slug: string;
  mainImage: string;
  title: string;
  color: string;
  category: string;
  excerpt: string;
}

const BlogCard = ({ post, index }: { post: SanityBlog; index: number }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10 cursor-pointer"
        style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
      >
        <div className="relative 2xl:h-[300px] xl:h-[250px] h-[200px] overflow-hidden">
          <div className="relative w-full h-[500px]">
            <img
              src={post.mainImage}
              alt={post.title}
              className={`w-full h-auto object-contain transition-all ease-linear ${
                hover ? "duration-[2500ms]" : "duration-700"
              }`}
              style={{
                objectPosition: hover ? "center bottom" : "center top",
                transform: hover ? "scale(1.05)" : "scale(1)",
              }}
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="px-4 py-1.5 rounded-full text-white text-xs font-bricolage font-semibold backdrop-blur-md shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${post.color}dd, ${post.color})`,
              }}
            >
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-bricolage font-bold text-xl text-white mb-2">
            {post.title}
          </h3>
          <p className="text-white/70 text-sm line-clamp-3">{post.excerpt}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;