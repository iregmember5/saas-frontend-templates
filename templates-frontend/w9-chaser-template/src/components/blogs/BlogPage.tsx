// components/blogs/BlogPage.tsx
import { useState, useEffect } from "react";
import { BlogIndexPage } from "./BlogIndexPage";
import { BlogPostPage } from "./BlogPostPage";

interface BlogPageProps {
  slug?: string;
}

export function BlogPage({ slug }: BlogPageProps) {
  const [currentSlug, setCurrentSlug] = useState(slug);

  useEffect(() => {
    setCurrentSlug(slug);
  }, [slug]);

  const handleNavigateToPost = (postSlug: string) => {
    // Update URL and trigger route check
    window.history.pushState({}, "", `/blog/${postSlug}`);
    setCurrentSlug(postSlug);
    // Also dispatch popstate to ensure App component updates
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  // If slug exists, show blog post page
  if (currentSlug) {
    return <BlogPostPage slug={currentSlug} />;
  }

  // Otherwise show blog index page
  return <BlogIndexPage onNavigateToPost={handleNavigateToPost} />;
}
