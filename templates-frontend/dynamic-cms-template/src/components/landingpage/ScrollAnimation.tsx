import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'fadeDown';
  delay?: number;
  className?: string;
}

export const ScrollAnimation = ({ 
  children, 
  animation = 'fadeUp', 
  delay = 0,
  className = ''
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const animationClass = {
    fadeUp: 'scroll-fade-up',
    fadeIn: 'scroll-fade-in',
    slideLeft: 'scroll-slide-left',
    slideRight: 'scroll-slide-right',
    scaleUp: 'scroll-scale-up',
    fadeDown: 'scroll-fade-down'
  }[animation];

  return (
    <div ref={ref} className={`${animationClass} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollAnimation;
