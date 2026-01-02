import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterConfig {
  name: string;
  company_info: {
    description: string;
    logo: string | null;
  };
  contact_info: {
    address: string;
    phone: string;
    email: string;
  };
  social_links: Array<{
    platform: string;
    url: string;
    icon_class: string;
  }>;
  sections: {
    quick_links: {
      show: boolean;
      heading: string;
      links: Array<{ name: string; url: string; order: number }>;
    };
    services: {
      show: boolean;
      heading: string;
      links: Array<{ name: string; url: string; order: number }>;
    };
    resources: {
      show: boolean;
      heading: string;
      links: Array<{ name: string; url: string; order: number }>;
    };
    contact: {
      show: boolean;
      heading: string;
    };
  };
  copyright_text: string;
  additional_footer_text: string;
}

interface FooterProps {
  config?: FooterConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  if (!config) return null;

  return (
    <footer className="bg-theme-text text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">{config.name}</h3>
            <p className="text-white/80 mb-4">{config.company_info.description}</p>
            {config.social_links.length > 0 && (
              <div className="flex gap-4">
                {config.social_links.map((social, idx) => (
                  <a key={idx} href={social.url} className="text-white/80 hover:text-white transition-colors">
                    <i className={`${social.icon_class} w-5 h-5`}></i>
                  </a>
                ))}
              </div>
            )}
          </div>

          {config.sections.quick_links.show && (
            <div>
              <h4 className="text-lg font-semibold mb-4">{config.sections.quick_links.heading}</h4>
              <ul className="space-y-2">
                {config.sections.quick_links.links.sort((a, b) => a.order - b.order).map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url || '#'} className="text-white/80 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {config.sections.resources.show && (
            <div>
              <h4 className="text-lg font-semibold mb-4">{config.sections.resources.heading}</h4>
              <ul className="space-y-2">
                {config.sections.resources.links.sort((a, b) => a.order - b.order).map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url || '#'} className="text-white/80 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {config.sections.contact.show && (
            <div>
              <h4 className="text-lg font-semibold mb-4">{config.sections.contact.heading}</h4>
              <ul className="space-y-3">
                {config.contact_info.address && (
                  <li className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{config.contact_info.address}</span>
                  </li>
                )}
                {config.contact_info.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span className="text-white/80">{config.contact_info.phone}</span>
                  </li>
                )}
                {config.contact_info.email && (
                  <li className="flex items-center gap-2">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span className="text-white/80">{config.contact_info.email}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-white/60">{config.copyright_text}</p>
          {config.additional_footer_text && (
            <p className="text-white/60 mt-2">{config.additional_footer_text}</p>
          )}
        </div>
      </div>
    </footer>
  );
};
