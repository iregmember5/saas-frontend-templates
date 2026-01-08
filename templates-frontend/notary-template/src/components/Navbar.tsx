import React, { useState, useEffect } from "react";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";
import type { ServiceItem } from "../types/wagtail";

interface NavbarProps {
  onServiceClick?: (serviceName: string) => void;
  headerConfig?: {
    logo?: { url: string; title: string } | null;
    site_name?: string;
  };
  services?: ServiceItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ onServiceClick, headerConfig, services = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setIsServicesOpen(false);
    }
  };

  const handleServiceClick = (serviceName: string) => {
    scrollToSection('services-list-1');
    setTimeout(() => {
      const cards = document.querySelectorAll('[data-service-name]');
      cards.forEach(card => {
        const cardName = card.getAttribute('data-service-name');
        if (cardName === serviceName) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('ring-4', 'ring-orange-500', 'scale-105');
          setTimeout(() => {
            card.classList.remove('ring-4', 'ring-orange-500', 'scale-105');
          }, 2000);
        }
      });
    }, 800);
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.services-dropdown')) {
        setIsServicesOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-xl py-4"
          : "bg-white/95 backdrop-blur-lg py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {headerConfig?.logo ? (
              <img src={`https://esign-admin.signmary.com${headerConfig.logo.url}`} alt={headerConfig.logo.title} className="h-8 sm:h-10 w-auto" />
            ) : (
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-theme-primary to-theme-secondary rounded-xl">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            )}
            <h1 className="text-base sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-theme-primary to-theme-secondary bg-clip-text text-transparent truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none">
              {headerConfig?.site_name || 'Notary Services'}
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <div className="relative services-dropdown">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-theme-primary transition-colors font-semibold"
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isServicesOpen && services.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-96 max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-100 py-2 z-50">
                  {services.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => handleServiceClick(service.service_name)}
                      className="flex items-start justify-between px-6 py-4 hover:bg-gray-50 transition-colors group w-full text-left border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-1 pr-4">
                        {service.is_popular && (
                          <span className="inline-block px-2 py-1 bg-theme-accent text-white text-xs font-bold rounded mb-2">
                            POPULAR
                          </span>
                        )}
                        <p className="font-semibold text-gray-900 group-hover:text-theme-primary text-sm">
                          {service.service_name}
                        </p>
                      </div>
                      {service.starting_price && (
                        <span className="text-theme-primary font-bold text-sm flex-shrink-0">
                          {service.starting_price}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('booking-1')}
              className="text-gray-700 hover:text-theme-primary transition-colors font-semibold"
            >
              Appointment
            </button>
            <button
              onClick={() => scrollToSection('upload-1')}
              className="text-gray-700 hover:text-theme-primary transition-colors font-semibold"
            >
              Upload
            </button>
            <button
              onClick={() => scrollToSection('payment-1')}
              className="text-gray-700 hover:text-theme-primary transition-colors font-semibold"
            >
              Payment
            </button>
            <button
              onClick={() => scrollToSection('faq-1')}
              className="text-gray-700 hover:text-theme-primary transition-colors font-semibold"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('contact-1')}
              className="text-gray-700 hover:text-theme-primary transition-colors font-semibold"
            >
              Contact
            </button>
          </div>

          <button
            onClick={() => scrollToSection('booking-1')}
            className="hidden lg:flex px-4 xl:px-6 py-2.5 xl:py-3 bg-gradient-to-r from-theme-accent to-orange-500 text-white rounded-xl font-bold hover:shadow-xl transition-all items-center gap-2 text-sm xl:text-base flex-shrink-0"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 py-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-theme-primary transition-colors font-semibold py-2"
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isServicesOpen && services.length > 0 && (
                  <div className="mt-2 ml-4 space-y-2 max-h-64 overflow-y-auto">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        onClick={() => handleServiceClick(service.service_name)}
                        className="flex items-start justify-between py-2 text-sm w-full text-left gap-2"
                      >
                        <span className="text-gray-600 flex-1">
                          {service.is_popular && (
                            <span className="inline-block px-1.5 py-0.5 bg-theme-accent text-white text-xs font-bold rounded mr-2">
                              HOT
                            </span>
                          )}
                          {service.service_name}
                        </span>
                        {service.starting_price && (
                          <span className="text-theme-primary font-bold text-xs flex-shrink-0">
                            {service.starting_price}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => scrollToSection('booking-1')}
                className="text-gray-700 hover:text-theme-primary transition-colors font-semibold py-2 text-left w-full"
              >
                Appointment
              </button>
              <button
                onClick={() => scrollToSection('upload-1')}
                className="text-gray-700 hover:text-theme-primary transition-colors font-semibold py-2 text-left w-full"
              >
                Upload
              </button>
              <button
                onClick={() => scrollToSection('payment-1')}
                className="text-gray-700 hover:text-theme-primary transition-colors font-semibold py-2 text-left w-full"
              >
                Payment
              </button>
              <button
                onClick={() => scrollToSection('faq-1')}
                className="text-gray-700 hover:text-theme-primary transition-colors font-semibold py-2 text-left w-full"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('contact-1')}
                className="text-gray-700 hover:text-theme-primary transition-colors font-semibold py-2 text-left w-full"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection('booking-1')}
                className="px-6 py-3 bg-gradient-to-r from-theme-accent to-orange-500 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
