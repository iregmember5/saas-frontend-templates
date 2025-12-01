// src/components/blogs/BlogNavbar.tsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { BlogPageData } from "../../types/blog";

interface BlogNavbarProps {
  data: BlogPageData;
  onCtaClick?: () => void;
}

export function BlogNavbar({ data, onCtaClick }: BlogNavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerConfig = data.header_config;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://esign-admin.signmary.com${url}`;
  };

  const logo = headerConfig?.logo;
  const siteName = headerConfig?.site_name || data.title;
  const navbarCTA = headerConfig?.navbar_cta;
  const navigationItems = headerConfig?.navigation_items || [];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white/90 shadow-lg border-b border-gray-200"
          : "bg-white/80 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <a
            href="/"
            className="flex items-center gap-3 flex-shrink-0 group cursor-pointer"
          >
            {logo ? (
              <img
                src={getFullImageUrl(logo.url)}
                alt={logo.title || siteName}
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <>
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <span className="font-bold text-lg">
                    {siteName.charAt(0)}
                  </span>
                </div>
                <span className="font-bold text-xl text-gray-900 transition-all duration-300 group-hover:text-blue-600">
                  {siteName}
                </span>
              </>
            )}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item: any) => (
              <a
                key={item.id}
                href={item.url || "#"}
                className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 relative group"
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            {navbarCTA && (
              <button
                onClick={onCtaClick}
                className="hidden md:inline-flex px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {navbarCTA.text}
              </button>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg md:hidden hover:bg-gray-100 transition-all duration-300"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-3">
            {navigationItems.map((item: any) => (
              <a
                key={item.id}
                href={item.url || "#"}
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                {item.title}
              </a>
            ))}
            {navbarCTA && (
              <button
                onClick={() => {
                  onCtaClick?.();
                  setOpen(false);
                }}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg"
              >
                {navbarCTA.text}
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
