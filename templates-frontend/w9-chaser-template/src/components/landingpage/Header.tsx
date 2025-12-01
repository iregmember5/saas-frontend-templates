import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface HeaderProps {
  data: LandingPageData;
  onShowLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ data, onShowLogin }) => {
  const {
    header_title,
    header_subtitle,
    header_description,
    header_cta_primary,
    header_cta_primary_url,
    header_cta_secondary,
    header_cta_secondary_url,
    header_section_image,
  } = data;

  const primaryColor = "var(--color-primary)";

  const [isBlinking, setIsBlinking] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const backendBaseUrl = "https://esign-admin.signmary.com";

  const backgroundImageUrl = data.header_background_image?.url
    ? data.header_background_image.url.startsWith("http")
      ? data.header_background_image.url
      : `${backendBaseUrl}${data.header_background_image.url}`
    : null;

  const rightImageUrl = header_section_image?.url?.startsWith("http")
    ? header_section_image.url
    : header_section_image?.url
    ? `${backendBaseUrl}${header_section_image.url}`
    : null;

  // Start blinking after component mounts
  useEffect(() => {
    const blinkTimer = setTimeout(() => {
      setIsBlinking(true);
    }, 1000);

    return () => clearTimeout(blinkTimer);
  }, []);

  const handleGetStartedClick = () => {
    // Stop blinking when button is clicked
    setIsBlinking(false);

    // Trigger the original onShowLogin if provided
    if (onShowLogin) {
      onShowLogin();
    }
  };

  return (
    <header
      ref={ref}
      className="relative top-7 flex items-center justify-center overflow-hidden min-h-screen bg-theme-background"
      style={{
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Simple background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-theme-neutral/5 to-theme-neutral/10"
        style={{ opacity: backgroundImageUrl ? 0.3 : 1 }}
      />

      {/* Content Container */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 max-w-7xl"
        style={{ y, opacity }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12">
          {/* Text Content - Left Side */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-xl mx-auto lg:mx-0">
              {/* Top Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 mb-6 sm:mb-8 bg-theme-primary/10 border-theme-primary/25"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <EasyIcon
                  icon="FiSmartphone"
                  size={14}
                  color="var(--color-primary)"
                  className="sm:w-4 sm:h-4"
                />
                <span className="text-xs sm:text-sm font-medium text-theme-primary">
                  {header_subtitle ||
                    "Add iOS 16 Passkeys to your website with OwnID"}
                </span>
              </motion.div>

              {/* Main Title */}
              {header_title && (
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-theme-text"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  {header_title.split(" ").map((word, i) => (
                    <span
                      key={i}
                      className={i >= 1 && i <= 3 ? "text-theme-primary" : ""}
                    >
                      {word}
                      {i < header_title.split(" ").length - 1 ? " " : ""}
                    </span>
                  ))}
                </motion.h1>
              )}

              {/* Subtitle */}
              {header_description && (
                <motion.p
                  className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed font-light text-theme-neutral"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.7 }}
                >
                  {header_description.split("\n")[0]}
                </motion.p>
              )}

              {/* Description Details */}
              <motion.div
                className="text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 leading-relaxed text-theme-neutral"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                {header_description &&
                  header_description
                    .split("\n")
                    .slice(1)
                    .map((line, index) => {
                      const trimmedLine = line.trim();
                      if (!trimmedLine) return null;
                      return (
                        <p key={index} className="mb-4">
                          {trimmedLine}
                        </p>
                      );
                    })}
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 mb-8 sm:mb-12 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {header_cta_primary && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {header_cta_primary_url ? (
                      <motion.a
                        href={header_cta_primary_url}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-white cursor-pointer inline-flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 gradient-theme-primary"
                      >
                        {header_cta_primary}
                        <EasyIcon
                          icon="FiArrowRight"
                          size={20}
                          color="#FFFFFF"
                        />
                      </motion.a>
                    ) : (
                      <motion.button
                        onClick={handleGetStartedClick}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-white cursor-pointer inline-flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden gradient-theme-primary"
                        animate={
                          isBlinking
                            ? {
                                boxShadow: [
                                  `0 0 0 0 color-mix(in srgb, var(--color-primary) 70%, transparent)`,
                                  `0 0 0 20px color-mix(in srgb, var(--color-primary) 0%, transparent)`,
                                  `0 0 0 0 color-mix(in srgb, var(--color-primary) 0%, transparent)`,
                                ],
                              }
                            : {}
                        }
                        transition={
                          isBlinking
                            ? {
                                boxShadow: {
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                },
                              }
                            : {}
                        }
                      >
                        {header_cta_primary}
                        <EasyIcon
                          icon="FiArrowRight"
                          size={20}
                          color="#FFFFFF"
                        />
                      </motion.button>
                    )}
                  </motion.div>
                )}

                {header_cta_secondary && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {header_cta_secondary_url &&
                    header_cta_secondary_url !== "#login" ? (
                      <motion.a
                        href={header_cta_secondary_url}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold cursor-pointer inline-flex items-center justify-center gap-2 text-sm sm:text-base border-2 border-theme-neutral/30 text-theme-neutral hover:border-theme-neutral/50 hover:text-theme-text transition-all duration-200"
                      >
                        {header_cta_secondary}
                      </motion.a>
                    ) : (
                      <motion.button
                        onClick={onShowLogin}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold cursor-pointer inline-flex items-center justify-center gap-2 text-sm sm:text-base border-2 border-theme-neutral/30 text-theme-neutral hover:border-theme-neutral/50 hover:text-theme-text transition-all duration-200"
                      >
                        {header_cta_secondary}
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>More registrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>More logins</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Section - Right Side */}
          <motion.div
            className="lg:w-1/2 flex items-center justify-center lg:justify-end mt-6 sm:mt-8 lg:mt-0 w-full"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-sm sm:max-w-md px-4 sm:px-0">
              {rightImageUrl ? (
                <div className="relative">
                  {/* Main Image Container */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden bg-theme-background shadow-2xl border border-theme-neutral/20"
                    whileHover={{
                      y: -5,
                      scale: 1.01,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={rightImageUrl}
                      alt="Header Visual"
                      className="w-full h-auto object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5 }}
                    />
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl flex flex-col items-center justify-center p-6 sm:p-8 text-center relative bg-theme-neutral/10 border-2 border-dashed border-theme-neutral/30"
                  whileHover={{
                    scale: 1.02,
                    borderColor: primaryColor,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <EasyIcon
                    icon="FiImage"
                    size={40}
                    color={primaryColor}
                    className="opacity-40 sm:w-12 sm:h-12"
                  />
                  <p className="text-sm sm:text-base font-medium mt-4 text-theme-neutral">
                    Add an image to showcase your product
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
