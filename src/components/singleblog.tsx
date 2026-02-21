"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { useParams } from "next/navigation";
import { SanityBlog } from "@/types/blog";
import { PortableText, PortableTextComponents } from "@portabletext/react";


const SingleBlogPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<SanityBlog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const res: SanityBlog = await client.fetch(
        `*[_type == "blog" && slug.current == $slug][0]{
          _id,
          title,
          excerpt,
          "slug": slug.current,
          "category": category->title,
          "mainImage": mainImage.asset->url,
          color,
          content,
          publishedAt
        }`,
        { slug },
        { next: { revalidate: 0 } }
      );

      setPost(res);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  // Custom components for PortableText
  const components: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="text-[36px] xl:text-[42px] font-bricolage font-bold text-white mt-[5vh] mb-[3vh] leading-tight">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-[28px] xl:text-[32px] font-bricolage font-bold text-white mt-[7vh] mb-[2.5vh] leading-tight">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-[22px] xl:text-[26px] font-bricolage font-semibold text-white mt-[3vh] mb-[2vh] leading-snug">
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className="text-gray-200 text-[17px] xl:text-[19px] mb-[3vh] leading-[1.8] font-light tracking-wide">
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-none ml-0 mb-[3vh] space-y-4 text-gray-200">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-none ml-0 mb-[3vh] space-y-4 text-gray-200 counter-reset-[item]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="pl-8 relative leading-[1.8] text-[17px] xl:text-[19px] before:content-['●'] before:absolute before:left-0 before:text-[#4F46E5] before:font-bold before:text-[20px]">
          {children}
        </li>
      ),
      number: ({ children }) => (
        <li className="pl-8 relative leading-[1.8] text-[17px] xl:text-[19px] counter-increment-[item] before:content-[counter(item)'.'] before:absolute before:left-0 before:text-[#4F46E5] before:font-bold">
          {children}
        </li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-white">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-100">{children}</em>
      ),
      link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline decoration-2 underline-offset-4 transition-colors duration-200"
        >
          {children}
        </a>
      ),
      code: ({ children }) => (
        <code className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-[16px] font-mono">
          {children}
        </code>
      ),
    },
    types: {
      code: ({ value }) => (
        <pre className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8 overflow-x-auto">
          <code className="text-gray-100 text-[15px] font-mono leading-relaxed">
            {value.code}
          </code>
        </pre>
      ),
    },
  };

  if (loading || !post) {
    return (
      <section className="min-h-screen bg-[#0A0A0A] bg-cover bg-center flex items-center justify-center">
        <div className="relative flex flex-col items-center gap-8">

          {/* Loading text with animation */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-white text-[28px] font-bricolage font-semibold tracking-wide animate-pulse">
              Loading Blog
            </p>
            
            {/* Animated dots */}
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
              <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>

          {/* Subtle background glow */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen contact-bg bg-cover bg-center lg:pt-[18vh] md:pt-[8vh] pt-[5vh] lg:pb-[10vh] pb-[5vh]">
      <div className="max-w-[1525px] mx-auto px-4 xl:px-10">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl mb-[-4vh] lg:mb-[6vh] md:mb-0 shadow-2xl">
          <img
            src={post.mainImage}
            alt={post.title}
            className="w-full h-[400px] md:h-[600px] lg:h-[700px] lg:object-cover object-contain"
          />

          {/* Badge */}
          <div className="absolute lg:top-6 md:top-18 top-20 lg:left-6 left-4 z-10">
            <span
              className="lg:px-5 py-2 px-3 rounded-full text-white md:text-sm text-[10px] font-bricolage font-semibold backdrop-blur-lg shadow-xl border border-white/20"
              style={{
                background: `linear-gradient(135deg, ${post.color}dd, ${post.color})`,
              }}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mb-[4vh]">
          <h1 className="font-bricolage font-bold text-[32px] md:text-[36px] lg:text-[46px] xl:text-[54px] text-white leading-tight tracking-tight">
            {post.title}
          </h1>
        </div>

        {/* Body */}
        <article className="max-w-none">
          <PortableText value={post.content} components={components} />
        </article>
      </div>
    </section>
  );
};

export default SingleBlogPage;