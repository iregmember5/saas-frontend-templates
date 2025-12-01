// new
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import type { LandingPageData, FeaturesPageData } from "../../types/landing";
import { fetchAllFeaturesPages } from "../../types/landing";

interface NavigationItem {
  id: number;
  title: string;
  url: string | null;
  link_type: "page" | "url" | "dropdown";
  order: number;
  children?: NavigationItem[];
}

interface GlassNavbarProps {
  data: LandingPageData;
  onShowLogin?: () => void;
}

function GlassNavbar({ data, onShowLogin }: GlassNavbarProps) {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const [featuresPages, setFeaturesPages] = useState<FeaturesPageData[]>([]);

  // Get header config
  const headerConfig =
    data.header_config ||
    data.sections?.find((section) => section.type === "header")?.data?.config;

  const { header_cta_primary } = data;

  // Dummy data for testing
  const dummyFeaturesPages: FeaturesPageData[] = [];

  // Load FeaturesPages on mount, fallback to dummy if none
  useEffect(() => {
    const loadFeaturesPages = async () => {
      const pages = await fetchAllFeaturesPages();
      // Use API data if available, otherwise use dummy data
      if (pages && pages.length > 0) {
        setFeaturesPages(pages);
      } else {
        setFeaturesPages(dummyFeaturesPages);
      }
    };
    loadFeaturesPages();
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Process navigation items
  const rawNavigationItems = headerConfig?.navigation_items || [];
  const processedLinks: NavigationItem[] = rawNavigationItems.map(
    (item: any) => ({
      ...item,
      link_type: (item.link_type as "page" | "url" | "dropdown") || "url",
      url: getNavigationItemUrl(item),
      children: item.children || [],
    })
  );

  const links: NavigationItem[] =
    processedLinks.length > 0
      ? processedLinks
      : [
          {
            id: 1,
            title: "Home",
            url: "#",
            link_type: "url" as const,
            order: 1,
            children: [],
          },
          {
            id: 2,
            title: "Features",
            url: "#features",
            link_type: "dropdown" as const,
            order: 2,
            children: [],
          },
          {
            id: 3,
            title: "Pricing",
            url: "#pricing",
            link_type: "url" as const,
            order: 3,
            children: [],
          },
          {
            id: 4,
            title: "Contact",
            url: "#contact",
            link_type: "url" as const,
            order: 4,
            children: [],
          },
          {
            id: 3,
            title: "Blog",
            url: "/blog",
            link_type: "url" as const,
            order: 3,
            children: [],
          },
        ].sort((a, b) => a.order - b.order);

  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://esign-admin.signmary.com${url}`;
  };

  const logo = headerConfig?.logo;
  const siteName = headerConfig?.site_name || data.title;
  const navbarCTA = headerConfig?.navbar_cta;
  const navbarStyle = headerConfig?.navbar_style || "default";
  const stickyNavbar = headerConfig?.sticky_navbar !== false;
  const transparentOnHome = headerConfig?.transparent_on_home || false;

  function getNavigationItemUrl(item: any): string {
    if (item.link_type === "page" && !item.url) {
      return "#";
    }
    return item.url || "#";
  }

  function isFeatureDropdown(item: NavigationItem): boolean {
    return (
      item.link_type === "dropdown" &&
      (item.title.toLowerCase().includes("feature") ||
        item.title.toLowerCase() === "features")
    );
  }

  function hasDropdownChildren(item: NavigationItem): boolean {
    return (
      item.link_type === "dropdown" ||
      Boolean(item.children && item.children.length > 0)
    );
  }

  const getNavbarStyleClass = () => {
    switch (navbarStyle) {
      case "centered":
        return "justify-center";
      case "with_cta":
        return "justify-between";
      case "transparent":
        return "bg-transparent border-transparent shadow-none";
      default:
        return "justify-between";
    }
  };

  return (
    <nav
      className={`${
        stickyNavbar ? "fixed" : "absolute"
      } top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-theme-background/90 shadow-2xl border-b-2 border-theme-primary/30"
          : transparentOnHome
          ? "bg-transparent"
          : "backdrop-blur-md bg-theme-background/30 border-b border-theme-primary/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center ${getNavbarStyleClass()} py-3 ${
            !transparentOnHome && !scrolled && "border-b border-white/10"
          }`}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer -my-2">
            {logo ? (
              <div className="flex items-center gap-2">
                <img
                  src={getFullImageUrl(logo.url)}
                  alt={logo.title || siteName}
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 gradient-theme-primary shadow-lg border border-theme-primary/30">
                  <span className="font-bold text-base sm:text-lg">
                    {siteName.charAt(0)}
                  </span>
                </div>
                <div className="font-bold text-lg sm:text-xl md:text-2xl transition-all duration-300 group-hover:scale-105 text-theme-text">
                  {siteName}
                </div>
              </div>
            )}
          </div>
          {/* Desktop Navigation */}
          {navbarStyle !== "centered" && (
            <div className="hidden md:flex items-center gap-8 mx-8 flex-1 justify-center">
              {links
                .sort((a, b) => a.order - b.order)
                .map((link) => (
                  <div key={link.id} className="relative">
                    {isFeatureDropdown(link) ? (
                      <div
                        className="relative h-full"
                        onMouseEnter={() => setActiveDropdown(link.id)}
                        onMouseLeave={() => {
                          setActiveDropdown(null);
                        }}
                      >
                        <div className="h-full flex items-center">
                          <button className="flex items-center gap-1 text-sm font-semibold transition-all duration-300 hover:scale-105 relative group py-2 text-theme-text">
                            {link.title}
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${
                                activeDropdown === link.id ? "rotate-180" : ""
                              }`}
                            />
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full gradient-theme-primary" />
                          </button>
                        </div>

                        {/* Features Pages Dropdown - Connected to button with padding */}

                        {activeDropdown === link.id &&
                          featuresPages.length > 0 && (
                            <div
                              className="absolute top-full left-1/2 mt-2 w-[650px] bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50"
                              style={{
                                transform: "translateX(-50%)",
                                opacity: 1,
                                animation:
                                  "dropdownFadeIn 0.2s ease-out forwards",
                              }}
                            >
                              {/* Drop shadow hover area */}
                              <div
                                className="absolute -top-2 left-0 right-0 h-2"
                                onMouseEnter={() => setActiveDropdown(link.id)}
                              />

                              {/* Dropdown Header */}
                              <div className="px-6 py-4 border-b border-gray-100">
                                <h3 className="font-bold text-lg text-theme-primary">
                                  Features
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Everything you need to grow your business
                                </p>
                              </div>

                              {/* Features Grid */}
                              <div className="p-6 grid grid-cols-3 gap-5">
                                {featuresPages.map((page, index) => (
                                  <a
                                    key={page.id}
                                    href={`/#features/${page.slug}`}
                                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all group"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
                                      {index === 0 && "📧"}
                                      {index === 1 && "👥"}
                                      {index === 2 && "📊"}
                                      {index === 3 && "📋"}
                                      {index === 4 && "💬"}
                                      {index === 5 && "🔒"}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-sm leading-tight group-hover:text-blue-600 text-theme-text">
                                        {page.title}
                                      </h4>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    ) : hasDropdownChildren(link) ? (
                      // Regular dropdown
                      <div
                        className="relative h-full flex items-center justify-center"
                        onMouseEnter={() => setActiveDropdown(link.id)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="h-full flex items-center">
                          <button className="flex items-center gap-1 text-sm font-semibold transition-all duration-300 hover:scale-105 relative group py-2 text-theme-text">
                            {link.title}
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${
                                activeDropdown === link.id ? "rotate-180" : ""
                              }`}
                            />
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full gradient-theme-primary" />
                          </button>
                        </div>

                        {activeDropdown === link.id &&
                          link.children &&
                          link.children.length > 0 && (
                            <div className="absolute top-full left-0 mt-0 w-48 backdrop-blur-md bg-white/95 border rounded-xl shadow-lg py-2 z-50 border-theme-primary/30 shadow-2xl">
                              {/* Invisible hover area above dropdown */}
                              <div
                                className="absolute -top-4 left-0 right-0 h-4 bg-transparent"
                                onMouseEnter={() => setActiveDropdown(link.id)}
                              />

                              {link.children.map((child) => (
                                <a
                                  key={child.id}
                                  href={getNavigationItemUrl(child)}
                                  className="block px-4 py-2 text-sm transition-all duration-200 hover:scale-105 relative group text-theme-text"
                                >
                                  {child.title}
                                  <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1 transition-all duration-300 gradient-theme-primary" />
                                </a>
                              ))}
                            </div>
                          )}
                      </div>
                    ) : (
                      // Regular link
                      <a
                        href={getNavigationItemUrl(link)}
                        className="text-sm font-semibold transition-all duration-300 hover:scale-105 relative group py-2 inline-block text-theme-text"
                      >
                        {link.title}
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full gradient-theme-primary" />
                      </a>
                    )}
                  </div>
                ))}
            </div>
          )}

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            {navbarCTA?.text ? (
              <button
                onClick={onShowLogin}
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group gradient-theme-primary"
              >
                <span className="relative z-10">{navbarCTA.text}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-theme-secondary" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
            ) : header_cta_primary ? (
              <button
                onClick={onShowLogin}
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group gradient-theme-primary"
              >
                <span className="relative z-10">{header_cta_primary}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-theme-secondary" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
            ) : null}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md md:hidden hover:bg-white/20 transition-all duration-300 hover:scale-110 text-theme-text"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-500 ${
            open
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col gap-3 mt-2 mb-4 bg-theme-background/95 border border-theme-primary/30">
            {links
              .sort((a, b) => a.order - b.order)
              .map((link) => (
                <div key={link.id}>
                  {isFeatureDropdown(link) ? (
                    <div>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === link.id ? null : link.id
                          )
                        }
                        className="w-full flex items-center justify-between text-base font-semibold py-2 px-2 transition-all duration-300 hover:scale-105 relative text-theme-text"
                      >
                        {link.title}
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform duration-300 ${
                            activeDropdown === link.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === link.id &&
                        featuresPages.length > 0 && (
                          <div className="ml-4 mt-2 space-y-1 max-h-64 overflow-y-auto">
                            {featuresPages.map((page) => (
                              <a
                                key={page.id}
                                href={`/features/${page.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm py-2 px-3 rounded-lg transition-all duration-200 relative overflow-hidden group text-theme-text"
                                onClick={() => setOpen(false)}
                              >
                                <div className="relative z-10 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-theme-primary" />
                                  {page.title}
                                </div>
                                <div
                                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  style={{
                                    background: `linear-gradient(90deg, var(--color-primary)10 0%, var(--color-accent)10 100%)`,
                                  }}
                                />
                              </a>
                            ))}
                          </div>
                        )}
                    </div>
                  ) : hasDropdownChildren(link) ? (
                    <div>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === link.id ? null : link.id
                          )
                        }
                        className="w-full flex items-center justify-between text-base font-medium py-2 px-2 hover:text-blue-600 transition-colors text-theme-text"
                      >
                        {link.title}
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform ${
                            activeDropdown === link.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === link.id &&
                        link.children &&
                        link.children.length > 0 && (
                          <div className="ml-4 mt-2 space-y-2">
                            {link.children.map((child) => (
                              <a
                                key={child.id}
                                href={getNavigationItemUrl(child)}
                                className="block text-sm py-2 px-2 rounded transition hover:bg-blue-50 hover:text-blue-600 text-theme-text"
                                onClick={() => setOpen(false)}
                              >
                                {child.title}
                              </a>
                            ))}
                          </div>
                        )}
                    </div>
                  ) : (
                    <a
                      href={getNavigationItemUrl(link)}
                      className="block text-base font-medium py-2 px-2 rounded transition hover:text-blue-600 text-theme-text"
                      onClick={() => setOpen(false)}
                    >
                      {link.title}
                    </a>
                  )}
                </div>
              ))}

            {/* Mobile CTA */}
            {navbarCTA?.text ? (
              <button
                onClick={() => {
                  if (onShowLogin) {
                    onShowLogin();
                    setOpen(false);
                  }
                }}
                className="mt-2 w-full px-4 py-3 rounded-xl text-white font-semibold text-center shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group gradient-theme-primary"
              >
                <span className="relative z-10">{navbarCTA.text}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-theme-secondary" />
              </button>
            ) : header_cta_primary ? (
              <button
                onClick={() => {
                  if (onShowLogin) {
                    onShowLogin();
                    setOpen(false);
                  }
                }}
                className="mt-2 w-full px-4 py-3 rounded-xl text-white font-semibold text-center shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group gradient-theme-primary"
              >
                <span className="relative z-10">{header_cta_primary}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-theme-secondary" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--color-background, #F8F9FA);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
          @keyframes dropdownFadeIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      `}</style>
    </nav>
  );
}

export default GlassNavbar;
