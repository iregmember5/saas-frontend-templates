export const preloadCriticalResources = () => {
  const resources = [
    { href: '/src/pages/LandingPage.tsx', as: 'script' },
  ];

  resources.forEach(({ href, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  });
};

if (typeof window !== 'undefined') {
  preloadCriticalResources();
}
