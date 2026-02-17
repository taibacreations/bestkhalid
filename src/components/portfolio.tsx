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
      <div className="min-h-screen bg-gray-950 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bricolage font-bold text-white text-center mb-4">
            Projects
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Among the thousands of completed website projects, the ones below
            are a few of my favorites. Web Design is always evolving, and it's
            been fascinating to see how my work has changed and grown over the
            years.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-64 bg-white/5 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bricolage font-bold text-white text-center mb-4">
          Projects
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Among the thousands of completed website projects, the ones below are
          a few of my favorites. Web Design is always evolving, and it's been
          fascinating to see how my work has changed and grown over the years.
        </p>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}

          {/* Skeleton Loader for Load More */}
          {isLoadingMore &&
            [...Array(6)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-64 bg-white/5 rounded-2xl animate-pulse"
              />
            ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bricolage font-medium rounded-full transition-all duration-300 disabled:opacity-50"
            >
              {isLoadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
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

  // Use Sanity value if it's a positive number, otherwise fall back to the default
  const panDuration =
    project.scrollSpeed && project.scrollSpeed > 0
      ? project.scrollSpeed
      : DEFAULT_SCROLL_SPEED;

  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Image — scrolls from top → bottom on hover at the speed set in Sanity */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full object-cover object-top"
          style={{
            height: "150%",
            transform: isHovering ? "translateY(-33.33%)" : "translateY(0%)",
            transition: `transform ${panDuration}ms ease-in-out`,
          }}
        />
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: project.color || "#6366f1" }}
        >
          {project.category}
        </span>
      </div>

      {/* Title */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
          isHovering ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h3 className="text-white font-bricolage font-semibold text-lg">
          {project.title}
        </h3>
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
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

export default Portfolio;