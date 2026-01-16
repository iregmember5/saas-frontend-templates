import React, { useEffect, useRef } from "react";
import type { DynamicContentBlock } from "../../types/landing";
import EasyIcon from "./IconRenderer"; // Add this import

const API_BASE_URL = "https://esign-admin.signmary.com";

const extractYouTubeId = (url: string): string => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
  );
  return match ? match[1] : "";
};

const getFullImageUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const ScrollAnimateItem: React.FC<any> = ({ item }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("animate-fadeInUp");
            element.classList.remove("opacity-0");
          } else {
            element.classList.remove("animate-fadeInUp");
            element.classList.add("opacity-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const parser = new DOMParser();
  const doc = parser.parseFromString(item.content || "", "text/html");
  const subtitle = doc.querySelector("p")?.textContent || "";
  const listItems = Array.from(doc.querySelectorAll("li")).map(
    (li) => li.textContent || ""
  );

  return (
    <div
      ref={itemRef}
      className="opacity-0 group bg-theme-background rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border-2 border-theme-primary/20 hover:border-theme-primary/40 hover:-translate-y-2"
    >
      {item.image && item.image.url && (
        <div className="w-full h-32 sm:h-48 rounded-xl mb-4 overflow-hidden">
          <img
            src={getFullImageUrl(item.image.url)}
            alt={item.image.title || item.title || "Content image"}
            className="w-full h-full object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <h4 className="text-lg sm:text-xl font-bold mb-2 text-theme-text group-hover:text-theme-primary transition-colors">
        {item.title || "Untitled"}
      </h4>

      {subtitle && (
        <p className="text-xs sm:text-sm mb-3 text-theme-neutral font-medium">
          {subtitle}
        </p>
      )}

      {listItems.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1.5 text-theme-neutral">
          {listItems.map((text: string, i: number) => (
            <li key={i} className="text-xs sm:text-sm flex items-center">
              <span className="mr-1.5 text-theme-primary">•</span>
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ScrollAnimateCard: React.FC<any> = ({
  bgClass,
  idx,
  cardData,
  title,
  description,
  icon,
  features,
  formatDescription,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.classList.add("animate-fadeInUp");
            card.classList.remove("opacity-0");
          } else {
            card.classList.remove("animate-fadeInUp");
            card.classList.add("opacity-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`opacity-0 group ${
        cardData.card_background ? "" : `bg-gradient-to-br ${bgClass}`
      } rounded-2xl p-4 md:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border`}
      style={
        cardData.card_background
          ? {
              backgroundImage: `url(${getFullImageUrl(
                cardData.card_background.url
              )})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {icon && (
        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 bg-blue-100">
          <EasyIcon icon={icon} size={24} color="#3B82F6" />
        </div>
      )}

      {cardData.card_image && (
        <div className="w-full h-48 rounded-xl mb-6 overflow-hidden">
          <img
            src={getFullImageUrl(cardData.card_image.url)}
            alt={cardData.card_image.title || title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h4
        className="text-xl md:text-2xl font-bold mb-4 leading-tight"
        style={{
          background: `linear-gradient(135deg, ${
            idx % 4 === 0
              ? "#3B82F6, #8B5CF6"
              : idx % 4 === 1
              ? "#10B981, #059669"
              : idx % 4 === 2
              ? "#F59E0B, #EF4444"
              : "#EC4899, #8B5CF6"
          })`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
        }}
      >
        {title || "Card Title"}
      </h4>

      {description && (
        <div className="text-gray-600 leading-relaxed text-base">
          <ul className="space-y-1">{formatDescription(description)}</ul>
        </div>
      )}

      {(cardData.price || cardData.price_period) && (
        <div className="mb-6">
          <span className="text-3xl font-bold text-gray-800">
            {cardData.price}
          </span>
          {cardData.price_period && (
            <span className="text-gray-600 ml-2">{cardData.price_period}</span>
          )}
        </div>
      )}

      {features && features.length > 0 && (
        <ul className="space-y-3">
          {features.map((feature: string, featureIdx: number) => (
            <li key={featureIdx} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100">
                <EasyIcon icon="FiCheck" size={12} color="#10B981" />
              </div>
              <span className="text-gray-700 text-base leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      {cardData.button_text && cardData.button_url && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <a
            href={cardData.button_url}
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 hover:gap-3 group/btn"
          >
            {cardData.button_text}
            <EasyIcon icon="FiArrowRight" size={16} color="#3B82F6" />
          </a>
        </div>
      )}
    </div>
  );
};

const DynamicContentRenderer: React.FC<{ block: DynamicContentBlock }> = ({
  block,
}) => {
  switch (block.type) {
    case "rich_text":
      const richRef = useRef<HTMLDivElement>(null);
      useEffect(() => {
        const el = richRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                el.classList.add("animate-fadeInUp");
                el.classList.remove("opacity-0");
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
      }, []);
      return (
        <div className="relative px-4 sm:pl-16 max-w-2xl mx-auto mb-8">
          <style>{`
            @keyframes colorBlink {
              0%, 14% { color: #ef4444; }
              14%, 28% { color: #f97316; }
              28%, 42% { color: #eab308; }
              42%, 56% { color: #22c55e; }
              56%, 70% { color: #3b82f6; }
              70%, 84% { color: #8b5cf6; }
              84%, 100% { color: #ec4899; }
            }
            .arrow-blink { animation: colorBlink 2.1s infinite; }
          `}</style>
          <div className="hidden sm:flex absolute left-10 top-10 -translate-x-full pl-6 font-bold arrow-blink items-center">
            <span className="text-2xl">&gt;</span>
            <span className="text-3xl">&gt;</span>
            <span className="text-4xl">&gt;</span>
            <span className="text-5xl">&gt;</span>
            <span className="text-6xl">&gt;</span>
          </div>

          <div className="hidden sm:flex absolute -right-5 top-10 translate-x-full pr-6 font-bold arrow-blink items-center">
            <span className="text-6xl">&lt;</span>
            <span className="text-5xl">&lt;</span>
            <span className="text-4xl">&lt;</span>
            <span className="text-3xl">&lt;</span>
            <span className="text-2xl">&lt;</span>
          </div>

          <div className="hidden absolute -left-20 -top-1/3 -translate-y-1/4 text-[10rem] font-bold arrow-blink">
            →
          </div>
          <div
            ref={richRef}
            style={{
              fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
            }}
            className="opacity-0 prose prose-sm sm:prose-base md:prose-lg px-3 sm:px-4 py-6 sm:py-8 rounded-xl sm:rounded-2xl border-2 border-theme-primary/30 shadow-lg hover:shadow-xl hover:border-theme-primary/50 transition-all duration-300 text-center gradient-theme-primary [&>h1]:text-2xl sm:[&>h1]:text-3xl md:[&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-4 sm:[&>h1]:mb-6 [&>h1]:text-white [&>h2]:text-xl sm:[&>h2]:text-2xl md:[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-3 sm:[&>h2]:mb-5 [&>h2]:text-white [&>h3]:text-lg sm:[&>h3]:text-xl md:[&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mb-3 sm:[&>h3]:mb-4 [&>h3]:text-white [&>h4]:text-base sm:[&>h4]:text-lg md:[&>h4]:text-xl [&>h4]:font-semibold [&>h4]:mb-2 sm:[&>h4]:mb-3 [&>h4]:text-white [&>p]:text-sm sm:[&>p]:text-base [&>p]:leading-relaxed [&>p]:mb-3 sm:[&>p]:mb-4 [&>p]:text-white [&>ul]:space-y-1.5 sm:[&>ul]:space-y-2 [&>ul]:mb-3 sm:[&>ul]:mb-4 [&>ul>li]:text-white [&>ol]:space-y-1.5 sm:[&>ol]:space-y-2 [&>ol]:mb-3 sm:[&>ol]:mb-4 [&>ol>li]:text-white [&>a]:text-white [&>a]:underline [&>a:hover]:text-white/80 [&>strong]:font-bold [&>strong]:text-white [&>em]:italic [&>em]:text-white [&>blockquote]:border-l-4 [&>blockquote]:border-white [&>blockquote]:pl-4 sm:[&>blockquote]:pl-6 [&>blockquote]:py-3 sm:[&>blockquote]:py-4 [&>blockquote]:bg-white/10 [&>blockquote]:rounded-r-lg [&>blockquote]:my-4 sm:[&>blockquote]:my-6 [&>blockquote]:text-white"
            dangerouslySetInnerHTML={{ __html: block.value }}
          />
        </div>
      );

    case "blockquote":
      return (
        <blockquote className="border-l-4 border-blue-500 pl-6 py-4 italic mb-8 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg">
          <p className="text-xl text-gray-700 font-medium leading-relaxed">
            "{block.value.text}"
          </p>
          {block.value.author && (
            <footer className="text-sm text-gray-600 mt-3 not-italic font-semibold">
              — {block.value.author}
              {block.value.source && (
                <span className="text-gray-500 font-normal">
                  {" "}
                  ({block.value.source})
                </span>
              )}
            </footer>
          )}
        </blockquote>
      );

    case "cta":
      return (
        <div
          className="relative p-12 rounded-2xl mb-12 text-white overflow-hidden shadow-2xl"
          style={{
            backgroundImage: block.value.background_image
              ? `url(${getFullImageUrl(block.value.background_image.url)})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: block.value.background_image
              ? "transparent"
              : "#3B82F6",
          }}
        >
          {block.value.background_image && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
          )}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">
              {block.value.title}
            </h3>
            {block.value.description && (
              <p className="text-xl mb-8 opacity-95 leading-relaxed">
                {block.value.description}
              </p>
            )}
            <a
              href={block.value.button_url}
              className={`inline-block px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                block.value.button_style === "primary"
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : block.value.button_style === "secondary"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border-3 border-white text-white hover:bg-white hover:text-blue-600"
              }`}
            >
              {block.value.button_text}
            </a>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="mb-12">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100">
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                block.value.video_url || ""
              )}?autoplay=${block.value.autoplay === "true" ? 1 : 0}&controls=${
                block.value.controls === "true" ? 1 : 0
              }&loop=${block.value.loop === "true" ? 1 : 0}&mute=${
                block.value.muted === "true" ? 1 : 0
              }`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video content"
            />
          </div>
        </div>
      );

    case "card_grid":
      return (
        <div className="mb-16">
          {block.value.heading && (
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center text-theme-text">
              {block.value.heading}
            </h3>
          )}
          {block.value.subheading && (
            <p className="text-gray-600 mb-12 text-center text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              {block.value.subheading}
            </p>
          )}
          <div
            className={`grid gap-6 md:gap-8 ${
              block.value.columns === "1"
                ? "grid-cols-1"
                : block.value.columns === "2"
                ? "grid-cols-1 md:grid-cols-2"
                : block.value.columns === "3"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : block.value.columns === "4"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {block.value.cards?.map((card: any, idx: number) => {
              const cardData = card.card_content || card;
              const title = card.custom_title || cardData.title || "";
              const description =
                card.custom_description || cardData.description || "";
              const icon = card.card_icon || cardData.icon || "";
              const image = card.card_image || cardData.card_image;
              const background =
                card.card_background || cardData.card_background;
              const features = cardData.features || [];

              const formatDescription = (desc: string) => {
                if (!desc) return null;
                const lines = desc.split(/\r?\n/).filter((line) => line.trim());
                return lines.map((line, i) => {
                  const trimmed = line.trim();
                  const isBullet =
                    trimmed.length < 80 &&
                    !trimmed.endsWith(":") &&
                    (i > 0 || lines.length > 2);
                  if (isBullet) {
                    return (
                      <li key={i} className="flex items-start gap-2 mb-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="flex-1">{trimmed}</span>
                      </li>
                    );
                  }
                  return (
                    <p key={i} className="mb-3 font-medium text-gray-700">
                      {trimmed}
                    </p>
                  );
                });
              };

              const bgColors = [
                "from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400",
                "from-green-50 to-emerald-50 border-green-200 hover:border-green-400",
                "from-orange-50 to-red-50 border-orange-200 hover:border-orange-400",
                "from-pink-50 to-purple-50 border-pink-200 hover:border-pink-400",
                "from-cyan-50 to-teal-50 border-cyan-200 hover:border-cyan-400",
                "from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-400",
              ];
              const bgClass = background ? "" : bgColors[idx % bgColors.length];

              return (
                <ScrollAnimateCard
                  key={idx}
                  bgClass={bgClass}
                  idx={idx}
                  cardData={{
                    ...cardData,
                    card_image: image,
                    card_background: background,
                  }}
                  title={title}
                  description={description}
                  icon={icon}
                  features={features}
                  formatDescription={formatDescription}
                />
              );
            })}
          </div>
        </div>
      );

    case "dynamic_list":
      const dynamicListData = block.value || {};

      return (
        <div className="mb-16">
          {dynamicListData.heading && (
            <h3 className="text-4xl font-bold mb-4 text-center text-theme-text">
              {dynamicListData.heading}
            </h3>
          )}
          {dynamicListData.description && (
            <p className="text-gray-600 mb-10 text-xl leading-relaxed text-center max-w-3xl mx-auto">
              {dynamicListData.description}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.isArray(dynamicListData.items) &&
              dynamicListData.items.map((item: any, idx: number) => {
                if (!item || typeof item !== "object") return null;

                return <ScrollAnimateItem key={idx} item={item} />;
              })}
          </div>
        </div>
      );

    case "dynamic_list_old":
      const dynamicListOldData = block.value || {};

      return (
        <div className="mb-16">
          {dynamicListOldData.heading && (
            <h3 className="text-4xl font-bold mb-4 text-center text-theme-text">
              {dynamicListOldData.heading}
            </h3>
          )}
          {dynamicListOldData.description && (
            <p className="text-gray-600 mb-10 text-xl leading-relaxed text-center max-w-3xl mx-auto">
              {dynamicListOldData.description}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.isArray(dynamicListOldData.items) &&
              dynamicListOldData.items.map((item: any, idx: number) => {
                if (!item || typeof item !== "object") return null;

                return (
                  <div
                    key={idx}
                    className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer"
                  >
                    {/* Blue hover effect from bottom right */}
                    <div
                      className="absolute inset-0 bg-blue-600 translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out origin-bottom-right"
                      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                    ></div>
                    {/* Background Image */}
                    {item.image && item.image.url && (
                      <div className="absolute inset-0">
                        <img
                          src={getFullImageUrl(item.image.url)}
                          alt={item.image.title || item.title || "Card image"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="relative h-full flex flex-col justify-end p-6 text-white">
                      <h4 className="text-2xl font-bold mb-2 drop-shadow-lg text-white">
                        {item.title || "Untitled"}
                      </h4>
                      <p className="text-lg opacity-90 drop-shadow">
                        {item.subtitle || "2025"}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );

    case "old_dynamic_list":
      const oldDynamicListData = block.value || {};

      return (
        <div className="mb-16">
          {oldDynamicListData.heading && (
            <h3 className="text-4xl font-bold mb-4 text-theme-text">
              {oldDynamicListData.heading}
            </h3>
          )}
          {oldDynamicListData.description && (
            <p className="text-gray-600 mb-10 text-xl leading-relaxed">
              {oldDynamicListData.description}
            </p>
          )}
          <div className="space-y-8">
            {Array.isArray(oldDynamicListData.items) &&
              oldDynamicListData.items.map((item: any, idx: number) => {
                if (!item || typeof item !== "object") return null;

                const itemType = item.type || "";
                const itemValue = item.value || {};

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    {itemType === "custom_item" && (
                      <>
                        {/* Icon for custom items with EasyIcon - UPDATED */}
                        {itemValue.icon && (
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-blue-50">
                            <EasyIcon
                              icon={itemValue.icon}
                              size={24}
                              color="#3B82F6"
                            />
                          </div>
                        )}

                        <h4 className="text-3xl font-bold mb-4 text-theme-text">
                          {itemValue.title || "Untitled"}
                        </h4>

                        {/* Safely handle content - could be string or RichText */}
                        {itemValue.content && (
                          <div
                            className="prose prose-lg max-w-none mb-6 text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html:
                                typeof itemValue.content === "string"
                                  ? itemValue.content
                                  : String(itemValue.content || ""),
                            }}
                          />
                        )}

                        {itemValue.image && itemValue.image.url && (
                          <img
                            src={getFullImageUrl(itemValue.image.url)}
                            alt={itemValue.image.title || "Content image"}
                            className="mt-6 rounded-xl w-full object-cover max-h-96 shadow-lg"
                          />
                        )}
                      </>
                    )}

                    {/* Add support for other item types */}
                    {itemType === "feature" && (
                      <>
                        {/* Icon with EasyIcon - UPDATED */}
                        {itemValue.icon && (
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-blue-50">
                            <EasyIcon
                              icon={itemValue.icon}
                              size={24}
                              color="#3B82F6"
                            />
                          </div>
                        )}

                        <h4 className="text-3xl font-bold mb-4 text-theme-text">
                          {itemValue.title || "Feature"}
                        </h4>

                        {itemValue.description && (
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {itemValue.description}
                          </p>
                        )}
                      </>
                    )}

                    {itemType === "benefit" && (
                      <>
                        {/* Icon with EasyIcon - UPDATED */}
                        {itemValue.icon && (
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-green-50">
                            <EasyIcon
                              icon={itemValue.icon}
                              size={24}
                              color="#10B981"
                            />
                          </div>
                        )}

                        <h4 className="text-3xl font-bold mb-4 text-theme-text">
                          {itemValue.title || "Benefit"}
                        </h4>

                        {itemValue.description && (
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {itemValue.description}
                          </p>
                        )}

                        {itemValue.stat && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-800">
                              {itemValue.stat}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default DynamicContentRenderer;
