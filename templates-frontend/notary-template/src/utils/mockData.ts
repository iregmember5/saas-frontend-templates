import type { NotaryPageData } from "../types/wagtail";

export const mockNotaryData: NotaryPageData = {
  id: 1,
  title: "Professional Notary Services",
  meta: {
    type: "notary.NotaryPage",
    slug: "home",
    seo_title: "Professional Notary Services - Certified & Trusted",
    search_description:
      "Licensed notary public offering mobile, office, and remote online notarization services.",
  },
  color_theme: {
    id: 1,
    name: "Professional Blue",
    primary_color: "#2563eb",
    secondary_color: "#1e40af",
    accent_color: "#f59e0b",
    neutral_color: "#6b7280",
    background_color: "#ffffff",
    text_color: "#1f2937",
  },
  blocks: [
    {
      type: "hero",
      value: {
        headline: "Trusted Notary Services at Your Convenience",
        subheadline:
          "Professional, certified notary public serving your community with mobile, office, and remote online notarization.",
        primary_cta_label: "Book Appointment",
        primary_cta_action: "book",
        secondary_cta_label: "Learn More",
        secondary_cta_action: "contact",
        background_type: "gradient",
        show_location_badge: true,
        location_text: "📍 Serving California",
      },
      id: "hero-1",
    },
    {
      type: "verified_credentials",
      value: {
        notary_name: "John Smith",
        state_of_commission: "California",
        license_number: "CA-123456789",
        commission_expiry: "2026-12-31",
        certifications: [
          "NNA Certified",
          "Background Screened",
          "RON Authorized",
          "E&O Insured",
        ],
        display_badge_icons: true,
        disclaimer_text:
          "Licensed and bonded notary public in the State of California. Commission number CA-123456789.",
      },
      id: "credentials-1",
    },
    {
      type: "services_list",
      value: {
        services: [
          {
            service_name: "Mobile Notary",
            description:
              "We come to your location for convenient notarization services.",
            starting_price: "Starting at $50",
            duration: "30-60 minutes",
            cta_label: "Schedule Visit",
            cta_action: "contact",
            is_popular: true,
          },
          {
            service_name: "General Notarization",
            description:
              "Notarize affidavits, powers of attorney, deeds, and contracts.",
            starting_price: "$15",
            duration: "15-30 minutes",
            cta_label: "Book Now",
            cta_action: "contact",
            is_popular: false,
          },
          {
            service_name: "Real Estate Signing",
            description:
              "Certified loan signing agent for mortgage closings and refinances.",
            starting_price: "$125",
            duration: "60-90 minutes",
            cta_label: "Contact Us",
            cta_action: "contact",
            is_popular: false,
          },
          {
            service_name: "Remote Online Notarization",
            description:
              "Secure video-based notarization from anywhere, available 24/7.",
            starting_price: "$25",
            duration: "20-40 minutes",
            cta_label: "Start Session",
            cta_action: "contact",
            is_popular: true,
          },
          {
            service_name: "Apostille Services",
            description: "Document authentication for international use.",
            starting_price: "$50",
            duration: "3-5 business days",
            cta_label: "Learn More",
            cta_action: "contact",
            is_popular: false,
          },
          {
            service_name: "I-9 Verification",
            description: "Employment eligibility verification services.",
            starting_price: "$20",
            duration: "15-20 minutes",
            cta_label: "Book Now",
            cta_action: "contact",
            is_popular: false,
          },
        ],
      },
      id: "services-1",
    },
    {
      type: "service_area",
      value: {
        service_modes: ["office", "mobile", "remote"],
        cities_served: [
          "Los Angeles",
          "San Diego",
          "San Francisco",
          "Sacramento",
          "San Jose",
          "Fresno",
        ],
        travel_radius: 50,
        show_map: true,
        map_type: "google",
        office_address: "123 Main Street, Los Angeles, CA 90001",
      },
      id: "service-area-1",
    },
    {
      type: "booking",
      value: {
        booking_type: "office",
        calendar_source: "internal",
        duration_options: ["15 min", "30 min", "60 min"],
        buffer_time: 15,
        require_payment: false,
        confirmation_message: "You will receive a confirmation email shortly.",
      },
      id: "booking-1",
    },
    {
      type: "document_upload",
      value: {
        allowed_file_types: [".pdf", ".jpg", ".png", ".docx"],
        max_file_size: 10,
        require_before_booking: false,
        instructions:
          "Upload your documents securely. All files are encrypted and stored safely.",
        privacy_notice:
          "Your documents are encrypted using 256-bit SSL encryption and stored securely. We never share your information with third parties.",
      },
      id: "upload-1",
    },
    {
      type: "testimonials",
      value: {
        display_type: "manual",
        testimonials: [
          {
            client_name: "Sarah Johnson",
            rating: 5,
            testimonial_text: "Absolutely exceptional service! The notary came to my home within hours and made the entire process seamless. Professional, friendly, and incredibly efficient. I highly recommend their mobile notary services to anyone needing quick and reliable document notarization.",
          },
          {
            client_name: "Michael Chen",
            rating: 5,
            testimonial_text: "I needed urgent notarization for a real estate closing and they saved the day! Available 24/7, arrived on time, and walked me through every step with patience and expertise. The pricing was fair and transparent. This is the only notary service I'll use from now on.",
          },
          {
            client_name: "Emily Rodriguez",
            rating: 5,
            testimonial_text: "Outstanding experience from start to finish! The remote online notarization was so convenient - I completed everything from my office in just 20 minutes. The notary was knowledgeable, courteous, and made me feel completely at ease. Five stars all the way!",
          },
        ],
        max_reviews: 3,
      },
      id: "testimonials-1",
    },
    {
      type: "faq",
      value: {
        category: "General",
        faqs: [
          {
            question: "What documents do I need to bring?",
            answer:
              "You need a valid government-issued photo ID (driver's license, passport, or state ID) and the documents to be notarized. The documents should be unsigned.",
          },
          {
            question: "How much does notarization cost?",
            answer:
              "California law sets the maximum fee at $15 per signature for most documents. Mobile notary services start at $75 which includes travel. RON services start at $25.",
          },
          {
            question: "Do you offer mobile notary services?",
            answer:
              "Yes! We come to your location anywhere within 50 miles. Perfect for home closings, hospital visits, or office signings.",
          },
          {
            question: "What is Remote Online Notarization (RON)?",
            answer:
              "RON allows you to get documents notarized via secure video call. It's legal in California and available 24/7 for your convenience.",
          },
          {
            question: "How long does the notarization process take?",
            answer:
              "Most notarizations take 15-30 minutes. Loan signings typically take 60-90 minutes. We always schedule enough time to answer your questions.",
          },
        ],
        expand_first: true,
      },
      id: "faq-1",
    },
    {
      type: "payment",
      value: {
        payment_type: "full",
        amount: "15.00",
        description: "Secure payment for notary services",
        require_before_proceeding: false,
        success_message: "Payment successful! Your appointment is confirmed.",
      },
      id: "payment-1",
    },
    {
      type: "contact_form",
      value: {
        form_fields: ["name", "email", "phone", "message"],
        enable_file_upload: true,
        route_to: "email",
        success_message:
          "Thank you for contacting us! We'll respond within 24 hours.",
      },
      id: "contact-1",
    },
  ],
  footer_config: {
    name: "Notary Services",
    company_info: {
      description: "Professional notary services you can trust.",
      logo: null,
    },
    contact_info: {
      address: "123 Main Street, Los Angeles, CA 90001",
      phone: "(555) 123-4567",
      email: "contact@notaryservices.com",
    },
    social_links: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/people/WeAssure-Screening-Services/61575534218707/",
        icon_class: "fab fa-facebook",
      },
      {
        platform: "Twitter",
        url: "https://x.com/WeAssureKC",
        icon_class: "fab fa-twitter",
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/weassure-biometrics-and-screening-services",
        icon_class: "fab fa-linkedin",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/weassurekc",
        icon_class: "fab fa-instagram",
      },
      {
        platform: "YouTube",
        url: "https://www.youtube.com/@weassurekc",
        icon_class: "fab fa-youtube",
      },
    ],
    sections: {
      quick_links: {
        show: true,
        heading: "Quick Links",
        links: [
          { name: "Home", url: "#", order: 1 },
          { name: "About", url: "#", order: 2 },
          { name: "Services", url: "#services-1", order: 3 },
        ],
      },
      services: {
        show: false,
        heading: "Services",
        links: [],
      },
      resources: {
        show: true,
        heading: "Resources",
        links: [
          { name: "FAQ", url: "#faq-1", order: 1 },
          { name: "Privacy Policy", url: "#", order: 2 },
        ],
      },
      contact: {
        show: true,
        heading: "Contact Us",
      },
    },
    copyright_text: "© 2024 Notary Services. All rights reserved.",
    additional_footer_text: "",
  },
};
