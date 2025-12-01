// src/components/blogs/BlogCard.tsx
import type { BlogPost } from "../../types/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  onReadMore?: (slug: string) => void;
}

export function BlogCard({ post, onReadMore }: BlogCardProps) {
  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://esign-admin.signmary.com${url}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleClick = () => {
    console.log(`BlogCard clicked - post slug: ${post.slug}`, post);
    if (onReadMore) {
      onReadMore(post.slug);
    } else {
      window.location.href = `/blog/${post.slug}`;
    }
  };

  return (
    <>
      <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Image */}
        {post.featured_image && post.featured_image.url && (
          <div className="relative overflow-hidden aspect-[16/10]">
            <img
              src={getFullImageUrl(post.featured_image.url)}
              alt={post.featured_image.title || post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category Badge */}
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
                  {post.categories[0].name}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
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

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              {post.author.avatar && post.author.avatar.url ? (
                <img
                  src={getFullImageUrl(post.author.avatar.url)}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {post.author.name.charAt(0)}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700">
                {post.author.name}
              </span>
            </div>
          )}

          {/* Read More Button */}
          <button
            onClick={handleClick}
            className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
          >
            Read More
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </article>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
