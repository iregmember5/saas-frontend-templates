// src/components/blogs/BlogIndexPage.tsx
import { useState, useEffect } from "react";
import { BlogNavbar } from "./BlogNavbar";
import { BlogCard } from "./BlogCard";
import { BlogGeneralSection } from "./BlogGeneralSection";
import { BlogFooter } from "./BlogFooter";
import type { BlogPageData, BlogPost } from "../../types/blog";
import { fetchBlogIndexPage, fetchAllBlogPosts } from "../../types/blog";

interface BlogIndexPageProps {
  onNavigateToPost?: (slug: string) => void;
}

export function BlogIndexPage({ onNavigateToPost }: BlogIndexPageProps) {
  const [pageData, setPageData] = useState<BlogPageData | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [blogPage, blogPosts] = await Promise.all([
          fetchBlogIndexPage(),
          fetchAllBlogPosts(),
        ]);
        setPageData(blogPage);
        setPosts(blogPosts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load blog data"
        );
        console.error("Error loading blog data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Blog
          </h2>
          <p className="text-gray-600">{error || "Unable to load blog data"}</p>
        </div>
      </div>
    );
  }

  const config = pageData.config;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <BlogNavbar data={pageData} />

      {/* Hero Section */}
      {config && (
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {config.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                {config.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onReadMore={onNavigateToPost}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Posts Yet
              </h3>
              <p className="text-gray-600">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>

      {/* General Section */}
      {pageData.general_section && (
        <BlogGeneralSection data={pageData.general_section} />
      )}

      {/* Footer */}
      <BlogFooter data={pageData} />
    </div>
  );
}
