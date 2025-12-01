// src/components/blogs/BlogPostPage.tsx
import { useState, useEffect } from "react";
import { BlogNavbar } from "./BlogNavbar";
import { BlogFooter } from "./BlogFooter";
import type { BlogPostPageData, BlogPageData } from "../../types/blog";
import { fetchBlogPostBySlug, fetchBlogIndexPage } from "../../types/blog";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";

interface BlogPostPageProps {
  slug: string;
}

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPostPageData | null>(null);
  const [pageData, setPageData] = useState<BlogPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [postData, blogPage] = await Promise.all([
          fetchBlogPostBySlug(slug),
          fetchBlogIndexPage(),
        ]);
        setPost(postData);
        setPageData(blogPage);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
        console.error("Error loading post:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Unable to load article"}
          </p>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://esign-admin.signmary.com${url}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <BlogNavbar data={pageData} />

        {/* Article Header */}
        <article className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-8 transition-colors duration-300 group"
            >
              <ArrowLeft
                size={20}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Blog
            </a>

            {/* Title Section */}
            <div className="max-w-4xl mb-12">
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {post.categories.map((category) => (
                    <span
                      key={category.id}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight font-serif">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                {post.author && (
                  <div className="flex items-center gap-3">
                    {post.author.avatar && post.author.avatar.url ? (
                      <img
                        src={getFullImageUrl(post.author.avatar.url)}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {post.author.name}
                      </p>
                      {post.author.bio && (
                        <p className="text-sm text-gray-500">
                          {post.author.bio}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{formatDate(post.published_date)}</span>
                  </div>
                  {post.reading_time && (
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{post.reading_time} min read</span>
                    </div>
                  )}
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Newspaper-style Layout: Image + Content */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Featured Image - Left Side */}
              {post.featured_image && post.featured_image.url && (
                <div className="lg:col-span-5">
                  <div className="sticky top-24">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src={getFullImageUrl(post.featured_image.url)}
                        alt={post.featured_image.title || post.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {post.featured_image.title && (
                      <p className="text-sm text-gray-500 italic mt-3 text-center">
                        {post.featured_image.title}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Article Content - Right Side */}
              <div className="lg:col-span-7">
                {/* Excerpt/Lead */}
                <div className="text-xl text-gray-700 font-serif leading-relaxed mb-8 pb-8 border-b-2 border-gray-200">
                  {post.excerpt}
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none font-serif">
                  <div
                    className="text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {post.related_posts && post.related_posts.length > 0 && (
              <div className="mt-20 pt-12 border-t-2 border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {post.related_posts.map((relatedPost) => (
                    <a
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="aspect-video overflow-hidden rounded-xl mb-3">
                        <img
                          src={getFullImageUrl(relatedPost.featured_image.url)}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Footer */}
        <BlogFooter data={pageData} />
      </div>

      <style>{`
        .prose {
          color: #374151;
          line-height: 1.8;
        }

        .prose h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }

        .prose p {
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .prose strong {
          font-weight: 600;
          color: #111827;
        }

        .prose a {
          color: #2563eb;
          text-decoration: underline;
        }

        .prose a:hover {
          color: #1d4ed8;
        }

        .prose ul, .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .prose li {
          margin-bottom: 0.5rem;
        }

        .prose blockquote {
          border-left: 4px solid #2563eb;
          padding-left: 1rem;
          margin: 2rem 0;
          font-style: italic;
          color: #4b5563;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
