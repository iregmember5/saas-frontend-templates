const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        "eSignatures",
        "Tax Returns",
        "Secure File Transfer",
        "Client Experience",
        "Gather AI",
        "Integrations",
      ],
    },
    {
      title: "Solutions",
      links: [
        "Tax Professionals",
        "Legal Firms",
        "Accounting",
        "Small Business",
        "Enterprise",
        "API",
      ],
    },
    {
      title: "Resources",
      links: [
        "Help Center",
        "Webinars",
        "Success Stories",
        "Blog",
        "API Docs",
        "Status Page",
      ],
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Careers",
        "Partners",
        "Contact",
        "Privacy Policy",
        "Terms of Service",
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              My Powerly
            </div>
            <p className="text-gray-400 dark:text-slate-400 mb-6">
              The most trusted eSignature solution for tax and legal
              professionals.
            </p>
            <div className="flex space-x-4">
              {["📧", "💬", "📞"].map((icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gray-800 dark:bg-slate-900 rounded-lg flex items-center justify-center hover:bg-gray-700 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-white dark:text-slate-200">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 dark:text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 dark:border-slate-800 mt-12 pt-3 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 dark:text-slate-400 text-sm">
            © 2025 My Powerly. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 dark:text-slate-400 hover:text-white dark:hover:text-slate-200 text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 dark:text-slate-400 hover:text-white dark:hover:text-slate-200 text-sm transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 dark:text-slate-400 hover:text-white dark:hover:text-slate-200 text-sm transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
