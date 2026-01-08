import React, { useState } from "react";
import type {
  TestimonialsBlock as TestimonialsBlockType,
  ServiceAreaBlock as ServiceAreaBlockType,
  ESignatureBlock as ESignatureBlockType,
  IdentityVerificationBlock as IdentityVerificationBlockType,
  ConsentBlock as ConsentBlockType,
  ContactFormBlock as ContactFormBlockType,
  ContentBlock as ContentBlockType,
} from "../../types/wagtail";
import { Star, MapPin, PenTool, Shield, CheckSquare, Mail } from "lucide-react";

// Testimonials Block
export const TestimonialsBlock: React.FC<{ block: TestimonialsBlockType }> = ({
  block,
}) => {
  const { value } = block;

  return (
    <section className="py-20 bg-gradient-to-br from-theme-secondary/5 to-theme-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-theme-text mb-12">
          Client Testimonials
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {value.display_type === "manual" &&
            value.testimonials?.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-theme-accent text-theme-accent"
                    />
                  ))}
                </div>
                <p className="text-theme-neutral mb-4 italic">
                  "{testimonial.testimonial_text}"
                </p>
                <div className="flex items-center gap-3">
                  {testimonial.client_photo && (
                    <img
                      src={`https://esign-admin.signmary.com${testimonial.client_photo.url}`}
                      alt={testimonial.client_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-theme-text">
                      {testimonial.client_name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

// Service Area Block
export const ServiceAreaBlock: React.FC<{ block: ServiceAreaBlockType }> = ({
  block,
}) => {
  const { value } = block;

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Service Areas
          </h2>
          <p className="text-xl text-gray-600">
            We come to you, wherever you are
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-blue-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-theme-primary to-theme-secondary rounded-2xl">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900">
                Service Modes
              </h3>
            </div>
            <div className="space-y-4">
              {value.service_modes.map((mode, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-white rounded-2xl border-2 border-blue-100 hover:border-theme-primary transition-all hover:scale-105"
                >
                  <div className="p-3 bg-theme-primary rounded-xl">
                    <CheckSquare className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-gray-900 text-lg capitalize">
                    {mode}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-purple-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900">
                Cities We Serve
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {value.cities_served.map((city, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-gray-900 rounded-xl font-bold border-2 border-purple-200 hover:border-purple-400 transition-all hover:scale-105"
                >
                  {city}
                </span>
              ))}
            </div>
            {value.travel_radius && (
              <div className="mt-8 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                <p className="text-gray-900 font-bold text-lg">
                  🚗 Travel radius:{" "}
                  <span className="text-green-600">
                    {value.travel_radius} miles
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {value.office_address && (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-2 border-gray-100">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-theme-accent to-orange-500 rounded-2xl mb-6">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Office Location
            </h3>
            <p className="text-xl text-gray-700 font-semibold">
              {value.office_address}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// eSignature Block
export const ESignatureBlock: React.FC<{ block: ESignatureBlockType }> = ({
  block,
}) => {
  const { value } = block;

  return (
    <section className="py-20 bg-gradient-to-br from-theme-primary/10 to-theme-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-theme-primary/10 rounded-full">
              <PenTool className="w-8 h-8 text-theme-primary" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-theme-text mb-4">
            Electronic Signature
          </h2>

          <p className="text-center text-theme-neutral mb-8">
            Sign your documents securely online with our compliant eSignature
            solution
          </p>

          <div className="space-y-4 mb-8">
            {value.signer_types.map((type, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-theme-background rounded-lg"
              >
                <CheckSquare className="w-5 h-5 text-theme-primary" />
                <span className="font-medium text-theme-text capitalize">
                  {type} Signature Required
                </span>
              </div>
            ))}
          </div>

          {value.require_auth && (
            <div className="p-4 bg-theme-accent/10 rounded-lg mb-6">
              <p className="text-sm text-theme-text flex items-center gap-2">
                <Shield className="w-5 h-5 text-theme-accent" />
                Identity verification required before signing
              </p>
            </div>
          )}

          <button className="w-full px-8 py-4 bg-theme-primary text-white rounded-lg font-bold hover:bg-theme-secondary transition-all">
            Start Signing Process
          </button>
        </div>
      </div>
    </section>
  );
};

// Identity Verification Block
export const IdentityVerificationBlock: React.FC<{
  block: IdentityVerificationBlockType;
}> = ({ block }) => {
  const { value } = block;
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <section className="py-20 bg-theme-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-theme-accent/10 rounded-full">
              <Shield className="w-8 h-8 text-theme-accent" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-theme-text mb-4">
            Identity Verification
          </h2>

          <p className="text-center text-theme-neutral mb-8">
            Verify your identity to proceed with notarization
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter code"
                className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
              />
            </div>

            <div className="p-4 bg-theme-neutral/5 rounded-lg">
              <p className="text-sm text-theme-neutral">
                {value.compliance_disclaimer}
              </p>
            </div>

            <button className="w-full px-8 py-4 bg-theme-accent text-white rounded-lg font-bold hover:opacity-90 transition-all">
              Verify Identity
            </button>

            <p className="text-center text-xs text-theme-neutral">
              Maximum attempts: {value.max_attempts}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Consent Block
export const ConsentBlock: React.FC<{ block: ConsentBlockType }> = ({
  block,
}) => {
  const { value } = block;
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="py-12 bg-theme-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose max-w-none mb-6">
            <div dangerouslySetInnerHTML={{ __html: value.consent_text }} />
          </div>

          <div className="flex items-start gap-3 p-4 bg-theme-primary/5 rounded-lg">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-theme-primary"
            />
            <label className="text-theme-text font-medium">
              {value.checkbox_label}
            </label>
          </div>

          {value.block_submission && !agreed && (
            <p className="mt-4 text-sm text-theme-accent">
              You must agree to the terms to continue
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

// Contact Form Block
export const ContactFormBlock: React.FC<{ block: ContactFormBlockType }> = ({
  block,
}) => {
  const { value } = block;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  return (
    <section className="py-20 bg-gradient-to-br from-theme-primary/5 to-theme-secondary/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-theme-primary/10 rounded-full">
              <Mail className="w-8 h-8 text-theme-primary" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-theme-text mb-8">
            Contact Us
          </h2>

          <div className="space-y-6">
            {value.form_fields.includes("name") && (
              <div>
                <label className="block text-sm font-semibold text-theme-text mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
                />
              </div>
            )}

            {value.form_fields.includes("email") && (
              <div>
                <label className="block text-sm font-semibold text-theme-text mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
                />
              </div>
            )}

            {value.form_fields.includes("phone") && (
              <div>
                <label className="block text-sm font-semibold text-theme-text mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
                />
              </div>
            )}

            {value.form_fields.includes("message") && (
              <div>
                <label className="block text-sm font-semibold text-theme-text mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
                />
              </div>
            )}

            <button className="w-full px-8 py-4 bg-theme-primary text-white rounded-lg font-bold hover:bg-theme-secondary transition-all">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Content Block
export const ContentBlock: React.FC<{ block: ContentBlockType }> = ({
  block,
}) => {
  const { value } = block;

  return (
    <section className="py-16 bg-theme-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`prose max-w-none ${
            value.enable_callout_styling ? "prose-lg" : ""
          }`}
        >
          <div dangerouslySetInnerHTML={{ __html: value.content }} />
        </div>
      </div>
    </section>
  );
};
