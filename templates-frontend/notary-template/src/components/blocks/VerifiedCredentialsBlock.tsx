import React from 'react';
import type { VerifiedCredentialsBlock as VerifiedCredentialsBlockType } from '../../types/wagtail';
import { Shield, Award, CheckCircle, Calendar } from 'lucide-react';

interface VerifiedCredentialsBlockProps {
  block: VerifiedCredentialsBlockType;
}

export const VerifiedCredentialsBlock: React.FC<VerifiedCredentialsBlockProps> = ({ block }) => {
  const { value } = block;

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-100">
          <div className="flex items-center justify-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 bg-theme-primary/20 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-theme-primary to-theme-secondary p-6 rounded-2xl">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-center bg-gradient-to-r from-theme-primary to-theme-secondary bg-clip-text text-transparent mb-3">
            Verified & Licensed Notary
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Certified, bonded, and trusted professional</p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all border border-blue-100">
              <p className="text-gray-500 text-sm mb-2 font-semibold uppercase tracking-wide">Notary Public</p>
              <p className="text-3xl font-black text-gray-900">{value.notary_name}</p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all border border-purple-100">
              <p className="text-gray-500 text-sm mb-2 font-semibold uppercase tracking-wide">State of Commission</p>
              <p className="text-3xl font-black text-gray-900">{value.state_of_commission}</p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all border border-green-100">
              <p className="text-gray-500 text-sm mb-2 font-semibold uppercase tracking-wide">License Number</p>
              <p className="text-2xl font-black text-gray-900">{value.license_number}</p>
            </div>

            <div className="group bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all border border-orange-100">
              <p className="text-gray-500 text-sm mb-2 font-semibold uppercase tracking-wide flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Commission Expires
              </p>
              <p className="text-2xl font-black text-gray-900">
                {new Date(value.commission_expiry).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {value.certifications && value.certifications.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="w-7 h-7 text-theme-accent" />
                Certifications & Credentials
              </h3>
              <div className="flex flex-wrap gap-4">
                {value.certifications.map((cert, index) => (
                  <div key={index} className="group flex items-center gap-3 bg-gradient-to-r from-theme-accent/10 to-theme-accent/5 px-6 py-4 rounded-xl border-2 border-theme-accent/20 hover:border-theme-accent/40 transition-all hover:scale-105">
                    <CheckCircle className="w-6 h-6 text-theme-accent" />
                    <span className="font-bold text-gray-900">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {value.disclaimer_text && (
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="text-sm text-gray-600 leading-relaxed">{value.disclaimer_text}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
