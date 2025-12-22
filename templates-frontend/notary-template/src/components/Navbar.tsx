import React, { useState, useEffect } from "react";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { name: "General Notarization", price: "$15", popular: true, icon: "📝" },
    { name: "Mobile Notary", price: "$75", popular: false, icon: "🚗" },
    {
      name: "Remote Online Notarization (RON)",
      price: "$25",
      popular: true,
      icon: "💻",
    },
    { name: "Loan Signing", price: "$125", popular: false, icon: "🏠" },
    { name: "Apostille Services", price: "$50", popular: false, icon: "🌍" },
    { name: "I-9 Verification", price: "$20", popular: false, icon: "✅" },
  ];

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
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-theme-primary to-theme-secondary rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-theme-primary to-theme-secondary bg-clip-text text-transparent">
              Notary Services
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-theme-primary transition-colors font-semibold">
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 py-4">
                  {services.map((service, index) => (
                    <a
                      key={index}
                      href="#services"
                      className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        {service.popular && (
                          <span className="px-2 py-1 bg-theme-accent text-white text-xs font-bold rounded">
                            HOT
                          </span>
                        )}
                        <span className="font-semibold text-gray-900 group-hover:text-theme-primary">
                          {service.name}
                        </span>
                      </div>
                      <span className="text-theme-primary font-bold">
                        {service.price}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#about"
              className="text-gray-700 hover:text-theme-primary transition-colors font-semibold"
            >
              About
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-theme-primary transition-colors font-semibold"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-theme-primary transition-colors font-semibold"
            >
              Contact
            </a>
          </div>

          <button className="hidden md:flex px-6 py-3 bg-gradient-to-r from-theme-accent to-orange-500 text-white rounded-xl font-bold hover:shadow-xl transition-all items-center gap-2">
            <Calendar className="w-4 h-4" />
            Book Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
          <div className="md:hidden mt-6 py-6 border-t border-gray-200">
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
                {isServicesOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    {services.map((service, index) => (
                      <a
                        key={index}
                        href="#services"
                        className="flex items-center justify-between py-2 text-sm"
                      >
                        <span className="text-gray-600 flex items-center gap-2">
                          <span>{service.icon}</span>
                          {service.name}
                        </span>
                        <span className="text-theme-primary font-bold">
                          {service.price}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <a
                href="#about"
                className="text-gray-700 hover:text-theme-primary transition-colors font-semibold py-2"
              >
                About
              </a>
              <a
                href="#faq"
                className="text-gray-700 hover:text-theme-primary transition-colors font-semibold py-2"
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-theme-primary transition-colors font-semibold py-2"
              >
                Contact
              </a>
              <button className="px-6 py-3 bg-gradient-to-r from-theme-accent to-orange-500 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2">
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
