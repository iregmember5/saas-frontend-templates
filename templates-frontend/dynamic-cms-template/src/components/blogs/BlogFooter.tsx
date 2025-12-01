// src/components/blogs/BlogFooter.tsx
import type { BlogPageData } from "../../types/blog";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

interface BlogFooterProps {
  data: BlogPageData;
}

export function BlogFooter({ data }: BlogFooterProps) {
  const footerConfig = data.footer_config;

  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://esign-admin.signmary.com${url}`;
  };

  const getSocialIcon = (platform: string) => {
    const iconProps = {
      size: 20,
      className:
        "text-gray-400 group-hover:text-white transition-colors duration-300",
    };

    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook {...iconProps} />;
      case "twitter":
        return <Twitter {...iconProps} />;
      case "instagram":
        return <Instagram {...iconProps} />;
      case "linkedin":
        return <Linkedin {...iconProps} />;
      case "github":
        return <Github {...iconProps} />;
      default:
        return null;
    }
  };

  const logo = footerConfig?.logo;
  const siteName = footerConfig?.site_name || data.title;
  const description = footerConfig?.description;
  const socialLinks = footerConfig?.social_links || [];
  const footerSections = footerConfig?.footer_sections || [];
  const copyrightText =
    footerConfig?.copyright_text ||
    `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {logo ? (
                <img
                  src={getFullImageUrl(logo.url)}
                  alt={logo.title || siteName}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
                    <span className="font-bold text-lg">
                      {siteName.charAt(0)}
                    </span>
                  </div>
                  <span className="font-bold text-xl text-white">
                    {siteName}
                  </span>
                </>
              )}
            </div>
            {description && (
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {description}
              </p>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 group"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-white text-lg mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="h-1 w-1 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors duration-300" />
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">{copyrightText}</p>
            <div className="flex gap-6">
              <a
                href="/terms"
                className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/privacy"
                className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
