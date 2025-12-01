import React, { useState, useEffect } from "react";
import type { LandingPageData, Video } from "../../types/landing";

interface VideoSectionProps {
  data: LandingPageData;
}

const VideoSection: React.FC<VideoSectionProps> = ({ data }) => {
  const { video_section, color_theme } = data;
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video_section || !video_section.featured_video) return null;

  const { heading, introduction, featured_video } = video_section;
  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";
  const bgColor = color_theme?.background_color || "#FFFFFF";

  const getVideoEmbedUrl = (video: Video, autoplay = false) => {
    if (video.video_source === "youtube") {
      const videoId = video.video_url.includes("watch?v=")
        ? video.video_url.split("watch?v=")[1]?.split("&")[0]
        : video.video_url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}${
        autoplay ? "?autoplay=1" : ""
      }`;
    } else if (video.video_source === "vimeo") {
      const videoId = video.video_url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}${
        autoplay ? "?autoplay=1" : ""
      }`;
    }
    return video.video_url;
  };

  const backendBaseUrl = "https://esign-admin.signmary.com";

  // Automatically play YouTube or Vimeo videos
  useEffect(() => {
    setIsPlaying(false);
    // if (["youtube", "vimeo"].includes(featured_video.video_source)) {
    //   setIsPlaying(true);
    // }
  }, [featured_video.video_source]);

  const gradientBg = `linear-gradient(135deg, ${primaryColor} 0%, ${color_theme?.accent_color || "#10B981"} 100%)`;

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{ background: gradientBg }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {heading && (
            <div className="relative inline-block mb-4">
              <h2
                className="text-3xl sm:text-4xl font-bold relative z-10"
                style={{ color: textColor }}
              >
                {heading}
              </h2>
              <div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full w-20"
                style={{ background: gradientBg }}
              />
            </div>
          )}

          {introduction && (
            <p
              className="text-lg leading-relaxed"
              style={{ color: neutralColor }}
            >
              {introduction}
            </p>
          )}
        </div>

        {/* Video Player */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]" style={{ border: `2px solid ${primaryColor}20` }}>
            {isPlaying ? (
              <div className="aspect-video">
                {featured_video.video_source === "upload" ? (
                  <video
                    className="w-full h-full object-cover rounded-3xl"
                    controls
                    autoPlay
                    src={featured_video.video_url}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    className="w-full h-full rounded-3xl"
                    src={getVideoEmbedUrl(featured_video, true)}
                    title={featured_video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            ) : (
              <div className="relative aspect-video">
                <img
                  src={
                    featured_video.thumbnail?.url?.startsWith("http")
                      ? featured_video.thumbnail.url
                      : `${backendBaseUrl}${featured_video.thumbnail?.url}`
                  }
                  alt={featured_video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40"></div>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Play video"
                >
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md"
                    style={{
                      backgroundColor: primaryColor,
                      boxShadow: `0 0 30px ${primaryColor}55`,
                    }}
                  >
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
