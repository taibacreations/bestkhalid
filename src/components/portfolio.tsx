"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

// Types
interface SanityCategory {
  title: string;
}

interface SanityProject {
  _id: string;
  title: string;
  category: string;
  mainImage: string;
  color: string;
  scrollSpeed?: number; // optional — falls back to DEFAULT_SCROLL_SPEED if not set in Sanity
}

// Default scroll speed in ms — matches the original hardcoded duration-[2500ms]
const DEFAULT_SCROLL_SPEED = 2500;

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes: SanityCategory[] = await client.fetch(
          `*[_type == "category"]{ title }`
        );
        const categoryTitles = categoryRes.map((c) => c.title);
        setCategories(["All", ...categoryTitles]);

        const projectsRes: SanityProject[] = await client.fetch(
          `*[_type == "project"]{
            _id,
            title,
            "category": category->title,
            "mainImage": mainImage.asset->url,
            color,
            scrollSpeed
          } | order(_createdAt desc)`
        );
        setProjects(projectsRes);
      } catch (err) {
        console.error("Failed to fetch data from Sanity:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 800);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(6);
  };

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
              are a few of my favorites. Web Design is always evolving, and it's
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
    <section className="flex justify-center items-center min-h-screen contact-bg bg-contain bg-center md:pb-[12vh] md:pt-[18vh] pb-[8vh] pt-[14vh]">
      <div className="max-w-[1525px] mx-auto px-4 xl:px-10 w-full">
        <div className="2xl:max-w-[942px] xl:max-w-[880px] lg:max-w-[800px] md:max-w-[650px] max-w-full mx-auto text-center mb-12">
          <h3 className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[142%] capitalize text-white">
            Projects
          </h3>
          <p className="xl:mt-5 mt-3 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] text-white">
            Among the thousands of completed website projects, the ones below
            are a few of my favorites. Web Design is always evolving, and it's
            been fascinating to see how my work has changed and grown over the
            years.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center items-center flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                px-6 py-2.5 rounded-full font-bricolage font-medium text-sm
                transition-all duration-300 ease-out
                ${
                  activeCategory === category
                    ? "bg-white text-gray-900 shadow-lg shadow-white/20 scale-105"
                    : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}

          {/* Skeleton Loader for Load More */}
          {isLoadingMore &&
            [...Array(6)].map((_, index) => (
              <div
                key={"loader-" + index}
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

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className={`lg:px-10 lg:py-4 px-8 py-3 rounded-full font-bricolage font-semibold text-lg transition-all duration-300 transform ${
                isLoadingMore
                  ? "bg-white/20 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-900 text-white hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
              }`}
            >
              {isLoadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// ProjectCard — Y-axis pan speed driven by project.scrollSpeed from Sanity
const ProjectCard = ({
  project,
  index,
}: {
  project: SanityProject;
  index: number;
}) => {
  const [isHovering, setIsHovering] = useState(false);

  // Use Sanity value if set, otherwise fall back to the original default
  const panDuration = project.scrollSpeed ?? DEFAULT_SCROLL_SPEED;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="relative h-[350px] overflow-hidden">
        {/* Image — scrolls from top → bottom on hover at the speed set in Sanity */}
        <div className="relative w-full h-[500px]">
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{
              objectPosition: isHovering ? "center bottom" : "center top",
              transform: isHovering ? "scale(1.05)" : "scale(1)",
              // Y-pan uses panDuration; the quick snap-back on mouse-leave uses 700ms
              transition: isHovering
                ? `object-position ${panDuration}ms linear, transform ${panDuration}ms ease`
                : `object-position 700ms ease, transform 700ms ease`,
            }}
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="px-4 py-1.5 rounded-full text-white text-xs font-bricolage font-semibold backdrop-blur-md shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${project.color}dd, ${project.color})`,
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-bricolage font-bold text-xl text-white mb-2 text-center">
          {project.title}
        </h4>
      </div>
    </div>
  );
};

// Fade-in animation
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

export default Portfolio;