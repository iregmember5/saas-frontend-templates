import React, { useState } from "react";
import { Lock } from "lucide-react";
import { prependImageUrl } from "../types/maverick";

interface WorkbookProps {
  data: any;
}

const styles = `
  .geometric-bg {
    background-color: #000000;
    background-image: 
      linear-gradient(30deg, #0a0a0a 12%, transparent 12.5%, transparent 87%, #0a0a0a 87.5%, #0a0a0a),
      linear-gradient(150deg, #0a0a0a 12%, transparent 12.5%, transparent 87%, #0a0a0a 87.5%, #0a0a0a),
      linear-gradient(30deg, #0a0a0a 12%, transparent 12.5%, transparent 87%, #0a0a0a 87.5%, #0a0a0a),
      linear-gradient(150deg, #0a0a0a 12%, transparent 12.5%, transparent 87%, #0a0a0a 87.5%, #0a0a0a);
    background-size: 80px 140px;
    background-position: 0 0, 0 0, 40px 70px, 40px 70px;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .blink-arrow {
    animation: blink 1s infinite;
  }
`;

export default function WorkbookOfferPage({ data }: WorkbookProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United States",
    state: "",
    subscribe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Order placed successfully!");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="bg-black text-white fixed inset-0 w-screen h-screen overflow-y-auto">
        {/* Top Yellow Banner */}
        <div className="bg-yellow-500 text-black text-center py-2 px-4 font-bold text-xl">
          <u>{data?.header_line_before}</u>
        </div>

        {/* Hero Section */}
        <div className="geometric-bg py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {data?.header_title}
                </h1>
                <p className="text-yellow-500 font-bold mb-6">
                  {data?.header_subtitle}
                </p>

                <p className="text-gray-300 text-sm mb-6">
                  {data?.header_description}
                </p>

                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform">
                  {data?.header_cta_text}
                </button>

                <p className="text-xs text-gray-400 mt-4">
                  {data?.header_line_after_button}
                </p>
              </div>

              <div className="relative">
                <iframe
                  className="w-full aspect-video rounded-lg border-4 border-yellow-500"
                  src={data?.header_video?.video_url?.replace('youtu.be/', 'www.youtube.com/embed/')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="geometric-bg py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="border-2 border-white rounded-lg p-1 mb-8">
              <div className="bg-black p-6 rounded">
                <h2 className="text-2xl font-bold text-center mb-8">
                  {data?.how_it_works_heading}
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <h3 className="text-yellow-500 font-bold text-xl mb-6">
                      {data?.how_it_works_steps?.steps?.[0]?.content?.[0]?.title}
                    </h3>

                    <div className="space-y-6">
                      {data?.how_it_works_steps?.steps?.[0]?.content?.[0]?.description?.split('\n\n').map((item: string, idx: number) => (
                        <div key={idx} className="border-b border-gray-700 pb-4">
                          <p className="text-white font-bold mb-2">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <h3 className="text-yellow-500 font-bold text-xl mb-6">
                      {data?.how_it_works_steps?.steps?.[1]?.content?.[0]?.title}
                    </h3>

                    <div className="space-y-6 text-gray-300 text-sm">
                      {data?.how_it_works_steps?.steps?.[1]?.content?.[0]?.description?.split('\n\n').map((item: string, idx: number) => (
                        <div key={idx} className="border-b border-gray-700 pb-4">
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform">
                {data?.secondary_cta_buttons?.[0]?.text}
              </button>
              <p className="text-xs text-gray-400 mt-3">{data?.header_subtitle}</p>
            </div>
          </div>
        </div>

        {/* Product Image Section */}
        <div className="bg-white py-16 px-4">
          <div className="container mx-auto max-w-4xl border border-gray-300 rounded-lg p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
              <img src={prependImageUrl(data?.card_sections?.items?.[0]?.card_image?.url)} alt={data?.card_sections?.items?.[0]?.card_image?.title} />
            </div>

            <div className="bg-yellow-500 text-black text-center py-4 px-6 rounded-lg font-bold mb-6">
              {data?.card_sections?.items?.[0]?.subtitle}
            </div>

            <div className="text-center">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform">
                {data?.card_sections?.items?.[0]?.button_text}
              </button>
              <p className="text-gray-600 text-xs mt-3">
                {data?.card_sections?.items?.[0]?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Workbook Value Section */}
        <div className="geometric-bg py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data?.pricing_heading}
            </h2>
            <div className="text-xl mb-8" dangerouslySetInnerHTML={{ __html: data?.pricing_description?.replace(/\n\n/g, '<br/><br/>').replace(/✓/g, '<span class="text-green-500 text-xl">✓</span>') }} />

            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform">
              {data?.pricing_cta_text}
            </button>
            <p className="text-xs text-gray-400 mt-3">{data?.header_subtitle}</p>
          </div>
        </div>

        {/* Don't Sit This Out Section */}
        <div className="bg-white py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-black mb-6">
              {data?.secondary_cta_heading}
            </h2>

            <div className="bg-black text-white p-6 rounded-lg mb-6">
              <p className="font-bold mb-4">
                {data?.secondary_cta_subheading}
              </p>
              <p className="text-sm text-gray-300">
                {data?.secondary_cta_description}
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <p className="text-black font-bold mb-2">
                {data?.secondary_cta_subdescription}
              </p>
            </div>

            <button className="bg-black text-yellow-500 font-bold py-3 px-8 rounded mb-4 hover:scale-105 transition-transform block w-full max-w-md mx-auto">
              {data?.secondary_cta_buttons?.[0]?.text}
            </button>

            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform block w-full max-w-md mx-auto">
              {data?.secondary_cta_buttons?.[1]?.text}
            </button>
            <p className="text-gray-600 text-xs mt-3">
              {data?.card_sections?.items?.[0]?.description}
            </p>
          </div>
        </div>

        {/* Secure Order Form */}
        <div className="geometric-bg py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-white text-black rounded-lg p-8 shadow-2xl border-8 border-dashed border-gray-300">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Lock className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">Secure Order Form</h2>
              </div>

              <h3 className="text-center text-xl mb-6 italic">
                Yes! I want my 100k Workbook & Replay (Offers Access):
              </h3>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:border-yellow-500 focus:outline-none"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:border-yellow-500 focus:outline-none"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:border-yellow-500 focus:outline-none"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:border-yellow-500 focus:outline-none"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:border-yellow-500 focus:outline-none"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:border-yellow-500 focus:outline-none"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-400 rounded p-4">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 text-xl blink-arrow mt-0">
                      ➤
                    </span>
                    <input
                      type="checkbox"
                      className="mt-2"
                      checked={formData.subscribe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subscribe: e.target.checked,
                        })
                      }
                    />
                    <label className="text-sm">
                      <strong>YES!</strong> Get both books by David A. Perez for
                      $17 Build Your Own Economy & Get Paid First Book Bundle
                    </label>
                  </div>
                  <ul className="ml-6 mt-2 text-xs space-y-1">
                    <li>• First name access</li>
                    <li>
                      • Get on the list for early access to upcoming products
                      that will save you time, money and effort!
                    </li>
                    <li>
                      • Get INSTANT access to my free "AI-Powered Tax Advisor
                      Newsletter that's 100% free right now!
                    </li>
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Item</span>
                    <div className="flex gap-8">
                      <span className="font-medium">Quantity</span>
                      <span className="font-medium">Amount</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span className="text-sm">
                      100K Tax Advisor Workshop - 2 Days Recording
                    </span>
                    <div className="flex gap-8">
                      <span>1</span>
                      <span className="font-bold">$17.00</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3 text-lg font-bold">
                    <span>Order Total:</span>
                    <span>$17.00</span>
                  </div>
                </div>

                {/* Payment Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert("PayPal payment selected");
                    }}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded flex items-center justify-center gap-2"
                  >
                    <span>PayPal</span>
                  </button>

                  <div className="text-center text-gray-500 text-sm">OR</div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded"
                  >
                    💳 PAY $17.00
                  </button>
                </div>

                <div className="text-center text-xs text-gray-500 mt-4">
                  <p>🔒 SECURE CHECKOUT via Stripe</p>
                  <div className="flex justify-center gap-2 mt-2">
                    {["VISA", "MC", "AMEX", "DISC"].map((card) => (
                      <span
                        key={card}
                        className="border px-2 py-1 rounded text-xs"
                      >
                        {card}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 rounded-full hover:scale-105 transition-transform mt-6"
                >
                  🎯 GET $17 WORKBOOK & REPLAY
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
              {data?.card_sections?.items?.[0]?.description}
            </p>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="bg-black border-t border-gray-800 py-8 px-4">
          <div className="container mx-auto max-w-4xl text-center text-lg text-white space-y-4">
            <div dangerouslySetInnerHTML={{ __html: data?.footer_config?.additional_footer_text?.replace(/\n\n/g, '</p><p>') }} />
          </div>
        </div>
      </div>
    </>
  );
}
