import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Workbook from "./Workbook";
import IconRenderer from "./IconRenderer";
import {
  fetchLandingPageData,
  fetchAllFeaturesPages,
  fetchWorkbookPageData,
  prependImageUrl,
  type SalesPages,
  type FeaturesPageData,
} from "../types/maverick";

const styles = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .geometric-bg {
    background-color: #000000;
    background-image: 
      linear-gradient(30deg, #050505 12%, transparent 12.5%, transparent 87%, #050505 87.5%, #050505),
      linear-gradient(150deg, #050505 12%, transparent 12.5%, transparent 87%, #050505 87.5%, #050505),
      linear-gradient(30deg, #050505 12%, transparent 12.5%, transparent 87%, #050505 87.5%, #050505),
      linear-gradient(150deg, #050505 12%, transparent 12.5%, transparent 87%, #050505 87.5%, #050505),
      linear-gradient(60deg, #0a0a0a 25%, transparent 25.5%, transparent 75%, #0a0a0a 75%, #0a0a0a),
      linear-gradient(60deg, #0a0a0a 25%, transparent 25.5%, transparent 75%, #0a0a0a 75%, #0a0a0a);
    background-size: 80px 140px;
    background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
  }
`;

export default function TaxAdvisorLandingPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 2,
    minutes: 36,
    seconds: 44,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showWorkbook, setShowWorkbook] = useState(false);
  const [pageData, setPageData] = useState<SalesPages | null>(null);
  const [workbookData, setWorkbookData] = useState<SalesPages | null>(null);
  const [featuresData, setFeaturesData] = useState<FeaturesPageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchLandingPageData(),
      fetchAllFeaturesPages(),
      fetchWorkbookPageData()
    ])
      .then(([landingData, featuresData, workbookData]) => {
        setPageData(landingData);
        setFeaturesData(featuresData);
        setWorkbookData(workbookData);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  console.log('Landing Page Data:', pageData);
  console.log('Features Pages Data:', featuresData);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // const speakers = [
  //   { name: "DAVID A. PEREZ", image: "/david.webp" },
  //   { name: "DANIEL TAPIA", image: "/daniel.webp" },
  //   { name: "GEORGE NIÑO", image: "/george.webp" },
  //   { name: "RUTH CREAPO", image: "/ruth.webp" },
  // ];

  // const faqs = [
  //   "What if I miss the live event? Will the workshop still be free for me?",
  //   "Do I need to have software systems in place yet?",
  //   "What can I learn in the tax advisory niche? What if I want just deductions?",
  //   "What's the time commitment?",
  //   "Can this work even with $0 STARTING CAPITAL (no existing services)?",
  //   "What if I am a sole practitioner or brand new starting out how will this help?",
  //   "Is this for beginners or advanced too?",
  //   "Will this show me what exactly to say/do or just AI tools?",
  //   "Can you walk everybody step by step concept?",
  //   "How much time will it take? We would find the class all times or just?",
  // ];

  if (showWorkbook) {
    return <Workbook data={workbookData} />;
  }

  if (loading) {
    return (
      <div className="geometric-bg text-white fixed inset-0 w-screen h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="geometric-bg text-white fixed inset-0 w-screen h-screen overflow-y-auto">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-3 px-4 text-center font-bold">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm">
              {pageData?.header_section?.title ||
                "From Tax Preparer to $100K/Month In 90 Days"}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              {pageData?.header_section?.button?.text || "Save my Spot"}
            </button>
          </div>
        </div>
        <p className="text-xl sm:text-sm mt-2 text-center font-bold text-yellow-300">
          {pageData?.header_section?.line_one ||
            "🔥 DON'T LIVE VIRTUAL EVENT FOR CPAS, EAS, TAX BUSINESS OWNERS"}
        </p>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"></div>

          <div className="container mx-auto px-4 py-12 relative max-w-7xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                  {pageData?.main_hero_section?.heading ||
                    "THE $100K/MONTH TAX ADVISOR WORKSHOP"}
                </h1>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
                  {pageData?.main_hero_section?.subheading ||
                    "Join this to transform today's transforming clients seeking cash in $3K-$10K per client over the holidays at lightning speed, WITHOUT ANY AI expertise."}
                </p>

                {/* Countdown Timer */}
                <div className="flex justify-center gap-4 mb-8">
                  <div className="text-center">
                    <div className="bg-white text-black rounded-lg px-4 py-2 text-3xl font-bold">
                      {timeLeft.days}
                    </div>
                    <div className="text-xs mt-1">DAYS</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white text-black rounded-lg px-4 py-2 text-3xl font-bold">
                      {timeLeft.hours}
                    </div>
                    <div className="text-xs mt-1">HRS</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white text-black rounded-lg px-4 py-2 text-3xl font-bold">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-xs mt-1">MIN</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white text-black rounded-lg px-4 py-2 text-3xl font-bold">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-xs mt-1">SEC</div>
                  </div>
                </div>

                <div className="text-yellow-500 font-bold mb-4 text-center">
                  DECEMBER 16-17, 2025 9AM-3PM CST
                  <br />
                  <span className="text-white text-sm">
                    ON ZOOM (Link Sent to Email)
                  </span>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform"
                >
                  🎯{" "}
                  {pageData?.main_hero_section?.button?.text ||
                    "REGISTER FOR FREE WORKSHOP"}
                </button>
              </div>
              <div>
                <img
                  src={
                    prependImageUrl(pageData?.main_hero_section?.image?.url) ||
                    "/hero.webp"
                  }
                  alt="Workshop Hero"
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured On Section */}
        <div className="py-12 border-y border-gray-800 overflow-hidden">
          <p className="text-center text-gray-400 mb-6">
            {pageData?.featured_on_section?.heading || "FEATURED ON"}
          </p>
          <div className="flex items-center gap-12 px-4 animate-[scroll_20s_linear_infinite]">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-12 shrink-0">
                {pageData?.featured_on_section?.items?.map(
                  (item: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.icon ? (
                        <IconRenderer
                          iconPath={item.icon}
                          className="w-8 h-8 text-white"
                        />
                      ) : (
                        <svg
                          className="w-8 h-8 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      )}
                      <span className="text-gray-500 text-2xl font-bold whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-6">WHAT YOU'LL LEARN</h2>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-4 px-6 rounded-lg max-w-4xl mx-auto">
              <p className="font-bold text-lg">
                In 2 days, I'll show you how to turn free advice into a
                $25K-per-week advisory business.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 md:p-12 rounded-2xl max-w-4xl mx-auto border border-gray-700 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-500">
                {pageData?.main_hero_section?.heading ||
                  "THE $100K/MONTH TAX ADVISOR WORKSHOP"}
              </h2>
            </div>

            {(() => {
              const groupedCards: {
                [key: string]: { title: string; cards: any[] };
              } = {};
              pageData?.card_sections?.cards?.forEach((card: any) => {
                const dayKey = card.title.toUpperCase().trim();
                if (!groupedCards[dayKey]) {
                  groupedCards[dayKey] = { title: card.title, cards: [] };
                }
                groupedCards[dayKey].cards.push(card);
              });
              return Object.values(groupedCards).map((group, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx < Object.values(groupedCards).length - 1 ? "mb-8" : ""
                  } bg-gradient-to-br from-gray-700 to-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-600`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-br from-gray-600 to-gray-700 text-white font-bold px-6 py-3 rounded-lg text-xl border border-gray-500">
                      {group.title}
                    </div>
                  </div>
                  <div className="space-y-6">
                    {group.cards.map((card: any, i: number) => (
                      <div key={i}>
                        <h3 className="text-yellow-500 font-bold text-lg mb-3">
                          {card.subtitle}
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                          {card.description
                            ?.split("\n")
                            .map((line: string, j: number) => (
                              <li key={j} className="flex items-start gap-2">
                                <span className="text-yellow-500 mt-1">•</span>
                                <span>{line.replace(/^•\s*/, "")}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}

            <div className="text-center mt-12">
              <p className="text-2xl font-bold text-white">
                {pageData?.card_sections?.footer_title || "TAX MAVERICK"}
              </p>
            </div>
          </div>
        </div>

        {/* Free Registration Banner */}
        <div className="container mx-auto px-4 py-8">
          <div className="border-4 border-yellow-500 rounded-lg p-8 text-center bg-black">
            <h2 className="text-2xl font-bold mb-4">
              {pageData?.secondary_cta_section?.heading ||
                "Join The $100K/Month Tax Advisor Workshop"}
              <br />
              <span className="text-yellow-500">
                {pageData?.secondary_cta_section?.description ||
                  "FOR A ONE-TIME CHANCE OF GETTING IT FOR FREE!"}
              </span>
            </h2>
            <p className="text-xl mb-4">
              {pageData?.secondary_cta_section?.announcement ||
                "DECEMBER 16-17, 2025 9AM-3PM CST"}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform"
            >
              🎯{" "}
              {pageData?.secondary_cta_section?.button?.text ||
                "REGISTER FOR FREE WORKSHOP"}
            </button>
          </div>
        </div>

        {/* Meet Your Speakers */}
        <div className="container mx-auto px-4 py-16">
          <div className="border-2 border-dashed border-yellow-500 rounded-full py-3 px-8 text-center inline-block mx-auto mb-12 block w-fit">
            <h2 className="text-2xl font-bold">
              {pageData?.images_gallery_section?.heading ||
                "MEET YOUR SPEAKERS"}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {pageData?.images_gallery_section?.images
              ?.filter((img: any) => img.image)
              .map((img: any, i: number) => (
                <div key={i} className="text-center">
                  <img
                    src={prependImageUrl(img.image?.url) || "/placeholder.webp"}
                    alt={img.caption || "Speaker"}
                    className="w-64 h-64 rounded-full mx-auto object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 text-black p-8 rounded-lg max-w-md mx-auto text-center">
            <p className="text-sm mb-2">
              {pageData?.primary_cta_section?.heading ||
                "Join The $100K/Month Tax Advisor Workshop"}
            </p>
            <h2 className="text-4xl font-bold mb-2">
              {pageData?.primary_cta_section?.subtitle ||
                "TODAY'S PRICE: 100% FREE"}
            </h2>
            <p className="text-xs mb-6">
              {pageData?.primary_cta_section?.description ||
                "(Normally $2,997 If You Were To Miss Today)"}
            </p>
            <p className="text-sm font-bold mb-4">
              {pageData?.primary_cta_section?.subdescription ||
                "DECEMBER 16-17, 2025 9AM - 3PM CST"}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-full w-full hover:scale-105 transition-transform"
            >
              🎯{" "}
              {pageData?.primary_cta_section?.button?.text ||
                "REGISTER FOR FREE WORKSHOP"}
            </button>
          </div>
        </div>

        {/* Don't Wait Section */}
        {pageData?.reusable_sections?.[0] && (
          <div className="container mx-auto px-4 py-16 text-center">
            <p className="text-sm mb-2">
              {pageData.reusable_sections[0].heading}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {pageData.reusable_sections[0].subheading}
            </h2>
            <p className="text-yellow-500 text-2xl md:text-3xl font-bold mb-8">
              {pageData.reusable_sections[0].description}
            </p>
            <p className="text-xl mb-8">
              {pageData.reusable_sections[0].subdescription}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform mb-12"
            >
              🎯{" "}
              {pageData.reusable_sections[0].button?.text ||
                "REGISTER FOR FREE WORKSHOP"}
            </button>

            {pageData.reusable_sections[0].image && (
              <div className="max-w-4xl mx-auto mb-12">
                <img
                  src={prependImageUrl(pageData.reusable_sections[0].image.url)}
                  alt="Workshop Preview"
                  className="rounded-lg mx-auto"
                />
              </div>
            )}

            {/* What, When, Why */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              {pageData.reusable_sections[0].cards?.map(
                (card: any, i: number) => (
                  <div key={i}>
                    <h3 className="text-yellow-500 text-xl font-bold mb-2">
                      {card.name}
                    </h3>
                    <p
                      className="text-lg font-bold"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {card.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Simple CTA */}
        {pageData?.simple_cta_sections?.[0] && (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {pageData.simple_cta_sections[0].heading}
            </h2>
            <p className="text-xl mb-8">
              {pageData.simple_cta_sections[0].subtitle}
            </p>
            <p className="mb-4">
              {pageData.simple_cta_sections[0].description}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform"
            >
              🎯{" "}
              {pageData.simple_cta_sections[0].button?.text ||
                "REGISTER FOR FREE WORKSHOP"}
            </button>
          </div>
        )}

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-4 px-6 rounded-t-lg text-center">
            <h2 className="text-2xl font-bold">
              {pageData?.faq_section?.heading || "FREQUENTLY ASKED QUESTIONS"}
            </h2>
          </div>
          <div className="bg-white text-black rounded-b-lg overflow-hidden">
            {pageData?.faq_section?.faqs?.map((faq: any, i: number) => (
              <div key={i} className="border-b border-gray-200">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {openFaq === i && (
                  <div
                    className="px-4 pb-4 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA with Countdown */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="bg-white text-black rounded-lg px-4 py-2 text-3xl font-bold">
                {timeLeft.days}
              </div>
              <div className="text-xs mt-1">DAYS</div>
            </div>
            <div className="text-center">
              <div className="bg-white text-black rounded-lg px-4 py-2 text-3xl font-bold">
                {timeLeft.hours}
              </div>
              <div className="text-xs mt-1">HRS</div>
            </div>
            <div className="text-center">
              <div className="bg-white text-black rounded-lg px-4 py-2 text-3xl font-bold">
                {timeLeft.minutes}
              </div>
              <div className="text-xs mt-1">MIN</div>
            </div>
            <div className="text-center">
              <div className="bg-white text-black rounded-lg px-4 py-2 text-3xl font-bold">
                {timeLeft.seconds}
              </div>
              <div className="text-xs mt-1">SEC</div>
            </div>
          </div>

          <p className="text-xl mb-8">DECEMBER 16-17, 2025 9AM-3PM CST</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform"
          >
            🎯 REGISTER FOR FREE WORKSHOP
          </button>
        </div>

        {/* Registration Modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500 rounded-lg max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-yellow-500 hover:text-yellow-400 text-3xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">
                The $100k/Month Tax Advisor Workshop
              </h2>
              <p className="text-yellow-500 mb-6 font-semibold">
                DECEMBER 16-17, 2025 9AM-5PM CST
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                  setShowWorkbook(true);
                }}
              >
                <div>
                  <label className="block text-white font-medium mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border-2 border-gray-700 bg-gray-800 rounded px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border-2 border-gray-700 bg-gray-800 rounded px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1">
                    Phone*
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full border-2 border-gray-700 bg-gray-800 rounded px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-full hover:scale-105 transition-transform"
                >
                  🎯 REGISTER NOW
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-800 py-8 px-4">
          <div className="container mx-auto text-center text-xl text-gray-200">
            <p className="mb-4">
              {pageData?.footer_section?.title ||
                "© 2025 By TAXMAVERICK. tax Advisor Workshop. All rights reserved."}
            </p>
            <p className="mb-4">
              {pageData?.footer_section?.subtitle ||
                "This site is not a part of the Facebook website or Facebook, Inc."}
            </p>
            <p>
              {pageData?.footer_section?.description ||
                "DISCLAIMER: Your level of success in attaining the results you desire depends on many factors..."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
