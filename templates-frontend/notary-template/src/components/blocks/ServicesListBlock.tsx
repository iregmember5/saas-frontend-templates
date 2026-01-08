import React from "react";
import type { ServicesListBlock as ServicesListBlockType } from "../../types/wagtail";
import { Clock, DollarSign, ArrowRight, Sparkles } from "lucide-react";

interface ServicesListBlockProps {
  block: ServicesListBlockType;
}

export const ServicesListBlock: React.FC<ServicesListBlockProps> = ({
  block,
}) => {
  const { value } = block;

  return (
    <section id={block.id} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Notary Services
          </h2>
          <p className="text-xl text-gray-600">
            Professional, certified, and convenient
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {value.services && value.services.length > 0 ? (
            value.services.map((service, index) => (
            <div
              key={index}
              data-service-name={service.service_name}
              className={`group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 ${
                service.is_popular
                  ? "border-theme-accent shadow-xl scale-105"
                  : "border-gray-200 hover:border-theme-primary"
              }`}
            >
              {service.is_popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-theme-accent to-orange-500 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    POPULAR
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-black text-gray-900 mb-4 mt-2">
                {service.service_name}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
                {service.description}
              </p>

              <div className="space-y-3 mb-8">
                {service.starting_price && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-bold text-gray-900">
                      Starting at {service.starting_price}
                    </span>
                  </div>
                )}

                {service.duration && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-600">{service.duration}</span>
                  </div>
                )}
              </div>

              {service.cta_label && (
                <button className="group/btn w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-theme-primary to-theme-secondary text-white rounded-xl font-bold hover:shadow-xl transition-all">
                  {service.cta_label}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No services available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
