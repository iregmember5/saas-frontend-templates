import React from "react";
import type { Theme } from "../../../../types/features-page";

interface VideoBlockProps {
  value: any;
  theme: Theme;
  getFullImageUrl: (url: string) => string;
}

export const VideoBlock: React.FC<VideoBlockProps> = ({
  value,
  theme,
  getFullImageUrl,
}) => {
  if (!value || !value.video) return null;

  const video = value.video;
  const autoplay = value.autoplay === "true";
  const controls = value.controls !== "false";
  const loop = value.loop === "true";
  const muted = value.muted === "true";

  return (
    <section className="py-16" style={{ backgroundColor: theme.bgColor }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
          {video.video_source === "youtube" && (
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${video.video_url}?autoplay=${
                autoplay ? 1 : 0
              }&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}&mute=${
                muted ? 1 : 0
              }`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          )}

          {video.video_source === "vimeo" && (
            <iframe
              src={`https://player.vimeo.com/video/${video.video_url}`}
              width="100%"
              height="500"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          )}

          {video.video_source === "upload" && video.video_url && (
            <video
              width="100%"
              height="500"
              controls={controls}
              autoPlay={autoplay}
              loop={loop}
              muted={muted}
              className="w-full"
            >
              <source src={getFullImageUrl(video.video_url)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {video.video_source === "external" && (
            <video
              width="100%"
              height="500"
              controls={controls}
              autoPlay={autoplay}
              loop={loop}
              muted={muted}
              className="w-full"
            >
              <source src={video.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <div className="p-6">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: theme.textColor }}
            >
              {video.title}
            </h3>
            {video.description && (
              <p style={{ color: theme.neutralColor }}>{video.description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
