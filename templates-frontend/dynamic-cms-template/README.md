# Dynamic CMS

A modern, dynamic content management system built with React, TypeScript, and Vite. This project enables dynamic rendering of landing pages and feature pages with customizable themes, content blocks, and sections.

## Features

- **Dynamic Content Rendering**: Flexible content blocks that can be configured and rendered dynamically
- **Multi-Page Support**: Landing pages and feature pages with URL-based routing
- **Customizable Themes**: Color themes with primary, secondary, accent, and neutral colors
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive layouts
- **Rich Components**: Pre-built sections including headers, features, benefits, testimonials, FAQs, CTAs, and more
- **SEO Optimized**: Dynamic meta tags and Open Graph support
- **Type-Safe**: Full TypeScript support for better development experience

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets
- **React RND** - Drag and resize components

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── features/          # Feature page components
│   │   ├── dynamic-content/   # Dynamic content renderer
│   │   ├── features-page/     # Feature page logic
│   │   ├── sections/          # Reusable sections
│   │   ├── ui/                # UI components
│   │   └── utils/             # Utility functions
│   └── landingpage/       # Landing page components
├── pages/                 # Page components
├── types/                 # TypeScript type definitions
├── App.tsx               # Main app component
└── main.tsx              # Entry point
```

## Available Pages

- **Landing Page** (`/`) - Main landing page with dynamic content
- **Features Pages** (`/features/:slug`) - Dynamic feature pages based on slug
- **Debug Page** (`/debug`) - API debugging interface

## Configuration

The project uses:
- **Tailwind CSS** for styling (configured in `tailwind.config.js`)
- **PostCSS** for CSS processing
- **ESLint** for code linting
- **TypeScript** for type checking

## License

Private project
