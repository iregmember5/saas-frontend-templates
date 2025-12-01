// src/components/blogs/BlogGeneralSection.tsx
import type { BlogPageData } from "../../types/blog";
import { ArrowRight } from "lucide-react";

interface BlogGeneralSectionProps {
  data: BlogPageData["general_section"];
}

export function BlogGeneralSection({ data }: BlogGeneralSectionProps) {
  if (!data) return null;

  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://esign-admin.signmary.com${url}`;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={getFullImageUrl(data.image.url)}
                alt={data.image.title || data.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {data.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {data.description}
            </p>

            {data.cta_text && data.cta_url && (
              <a
                href={data.cta_url}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                <span>{data.cta_text}</span>
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
