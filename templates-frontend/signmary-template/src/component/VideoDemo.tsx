import React from "react";

const VideoDemo: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-100 to-white py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">
          How SignMarrys Works
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Experience the fast, simple, and secure way to request and manage
          signatures online. From document upload to signature delivery — all in
          one smooth workflow.
        </p>
        <div className="relative pb-56.25% h-0 overflow-hidden rounded-lg shadow-lg animate-fadeIn">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/AoGo0Go2otg"
            title="How SignMarrys Works"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
