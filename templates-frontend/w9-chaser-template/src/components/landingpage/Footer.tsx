import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { LandingPageData, Section } from "../../types/landing";

interface FooterProps {
  data: LandingPageData;
}

function Footer({ data }: FooterProps) {
  const footerSection = data.sections?.find(
    (section: Section) => section.type === "footer"
  );
  const footerConfig = data.footer_config || footerSection?.data;

  // If no footer config found, return null
  if (!footerConfig) {
    console.log("No footer config found in data:", data);
    return null;
  }

  // Debug log to see what we're working with
  console.log("Footer config:", footerConfig);

  // Social media links from API
  const socialIconMap: Record<string, any> = {
    Facebook: Facebook,
    Twitter: Twitter,
    LinkedIn: Linkedin,
    Instagram: Instagram,
    YouTube: Youtube,
  };

  const socialLinks = (footerConfig.social_links || []).map((link: any) => ({
    icon: socialIconMap[link.platform] || Facebook,
    url: link.url,
    label: link.platform,
  }));

  // Get dynamic links from nested structure
  const quickLinks = footerConfig.sections?.quick_links?.links || [];
  const serviceLinks = footerConfig.sections?.services?.links || [];
  const resourceLinks = footerConfig.sections?.resources?.links || [];
  const legalLinks = footerConfig.sections?.legal?.links || [];

  const companyInfo = {
    description: footerConfig.company_info?.description || "",
    logo: footerConfig.company_info?.logo,
  };

  const contactInfo = {
    address: footerConfig.contact_info?.address || "",
    phone: footerConfig.contact_info?.phone || "",
    email: footerConfig.contact_info?.email || "",
  };

  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://esign-admin.signmary.com${url}`;
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-theme-background via-theme-background to-theme-neutral/5 border-t border-theme-neutral/20">
      {/* Subtle Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-primary)20 0%, transparent 50%), radial-gradient(circle at 80% 80%, var(--color-primary)15 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Company Info Section - ALWAYS SHOW */}
          <div className="space-y-4 sm:space-y-6 text-left">
            {companyInfo.logo ? (
              <div className="w-16 h-16 sm:w-20 sm:h-20">
                <img
                  src={getFullImageUrl(companyInfo.logo.url)}
                  alt={companyInfo.logo.title || "Company Logo"}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg gradient-theme-primary">
                {data.title?.charAt(0) || "L"}
              </div>
            )}

            {companyInfo.description && (
              <p className="text-base sm:text-lg md:text-xl leading-relaxed font-bold text-left text-theme-text">
                {companyInfo.description}
              </p>
            )}

            {/* Social Links - ALWAYS SHOW IF LINKS EXIST */}
            {socialLinks.length > 0 && (
              <div className="flex gap-2 sm:gap-3 justify-start">
                {socialLinks.map((social: any, idx: any) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-theme-background border-2 border-theme-neutral/20 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg text-theme-neutral hover:gradient-theme-primary hover:text-white"
                    >
                      <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links Section */}
          {footerConfig.sections?.quick_links?.show &&
            quickLinks.length > 0 && (
              <div className="text-left">
                <h3 className="text-theme-text font-bold text-base sm:text-lg mb-4 sm:mb-6 relative inline-block">
                  {footerConfig.sections.quick_links.heading || "Quick Links"}
                  <div className="absolute -bottom-2 left-0 w-12 h-1 rounded-full bg-theme-primary" />
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {quickLinks.map((link: any, idx: number) => (
                    <li key={idx}>
                      <a
                        href={link.url || "#"}
                        className="text-xs sm:text-sm text-theme-neutral hover:text-theme-primary transition-all duration-200 flex items-center justify-start gap-2 group"
                      >
                        <span className="w-0 h-0.5 group-hover:w-4 transition-all duration-200 bg-theme-primary" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Services Section */}
          {footerConfig.sections?.services?.show && serviceLinks.length > 0 && (
            <div className="text-left">
              <h3 className="text-theme-text font-bold text-base sm:text-lg mb-4 sm:mb-6 relative inline-block">
                {footerConfig.sections.services.heading || "Services"}
                <div className="absolute -bottom-2 left-0 w-12 h-1 rounded-full bg-theme-primary" />
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {serviceLinks.map((link: any, idx: number) => (
                  <li key={idx}>
                    <a
                      href={link.url || "#"}
                      className="text-xs sm:text-sm text-theme-neutral hover:text-theme-primary transition-all duration-200 flex items-center justify-start gap-2 group"
                    >
                      <span className="w-0 h-0.5 group-hover:w-4 transition-all duration-200 bg-theme-primary" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources Section */}
          {footerConfig.sections?.resources?.show &&
            resourceLinks.length > 0 && (
              <div className="text-center sm:text-left">
                <h3 className="text-theme-text font-bold text-base sm:text-lg mb-4 sm:mb-6 relative inline-block">
                  {footerConfig.sections.resources.heading || "Resources"}
                  <div className="absolute -bottom-2 left-0 w-12 h-1 rounded-full bg-theme-primary" />
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {resourceLinks.map((link: any, idx: number) => (
                    <li key={idx}>
                      <a
                        href={link.url || "#"}
                        className="text-xs sm:text-sm text-theme-neutral hover:text-theme-primary transition-all duration-200 flex items-center justify-start gap-2 group"
                      >
                        <span className="w-0 h-0.5 group-hover:w-4 transition-all duration-200 bg-theme-primary" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Contact Section */}
          {footerConfig.sections?.contact?.show && (
            <div className="text-left">
              <h3 className="text-theme-text font-bold text-base sm:text-lg mb-4 sm:mb-6 relative inline-block">
                {footerConfig.sections.contact.heading || "Contact"}
                <div className="absolute -bottom-2 left-0 w-12 h-1 rounded-full bg-theme-primary" />
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {contactInfo.address && (
                  <li className="flex items-start justify-start gap-2 sm:gap-3 group">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-theme-neutral/10 border border-theme-neutral/20 group-hover:shadow-md transition-all text-theme-primary">
                      <MapPin size={14} className="sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm whitespace-pre-line text-theme-neutral leading-relaxed text-left">
                      {contactInfo.address}
                    </span>
                  </li>
                )}
                {contactInfo.phone && (
                  <li className="flex items-center justify-start gap-2 sm:gap-3 group">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-theme-neutral/10 border border-theme-neutral/20 group-hover:shadow-md transition-all text-theme-primary">
                      <Phone size={14} className="sm:w-4 sm:h-4" />
                    </div>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                      className="text-xs sm:text-sm text-theme-neutral hover:text-theme-primary transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </li>
                )}
                {contactInfo.email && (
                  <li className="flex items-center justify-start gap-2 sm:gap-3 group">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-theme-neutral/10 border border-theme-neutral/20 group-hover:shadow-md transition-all text-theme-primary">
                      <Mail size={14} className="sm:w-4 sm:h-4" />
                    </div>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-xs sm:text-sm text-theme-neutral hover:text-theme-primary transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar - ALWAYS SHOW */}
        <div className="pt-6 sm:pt-8 mt-8 sm:mt-10 lg:mt-12 border-t border-theme-neutral/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* DYNAMIC COPYRIGHT TEXT */}
            <p className="text-xs sm:text-sm text-theme-neutral text-center md:text-left flex items-center gap-2 justify-center md:justify-start">
              {footerConfig.copyright_text ||
                `${new Date().getFullYear()} ${
                  data.title
                }. All rights reserved.`}
            </p>

            {/* Legal Links */}
            {legalLinks.length > 0 && (
              <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm flex-wrap justify-center md:justify-end">
                {legalLinks.map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={link.url}
                    className="text-theme-neutral hover:text-theme-primary transition-all duration-200 relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200 bg-theme-primary" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;