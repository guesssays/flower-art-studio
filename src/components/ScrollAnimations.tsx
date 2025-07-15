'use client';

import { useEffect, useRef } from 'react';

// Intersection Observer hook for scroll animations
export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const element = ref.current;
    if (element) {
      // Find all animated elements within this container
      const animatedElements = element.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale, .text-reveal');

      animatedElements.forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      if (element) {
        const animatedElements = element.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale, .text-reveal');
        animatedElements.forEach((el) => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  return ref;
};

// Parallax effect hook
export const useParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');

      parallaxElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const speed = parseFloat(htmlElement.dataset.speed || '0.5');
        const yPos = -(scrollY * speed);
        htmlElement.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Stagger animation hook for multiple elements
export const useStaggerAnimation = (delay: number = 100) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              const htmlChild = child as HTMLElement;
              if (htmlChild.classList.contains('animate-on-scroll')) {
                setTimeout(() => {
                  htmlChild.classList.add('visible');
                }, index * delay);
              }
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  return ref;
};

// Cinematic text reveal component
interface CinematicTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const CinematicText: React.FC<CinematicTextProps> = ({
  children,
  delay = 0,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  return (
    <div ref={ref} className={`text-reveal ${className}`}>
      <span className="text-reveal-inner">
        {children}
      </span>
    </div>
  );
};

// Animated card component
interface AnimatedCardProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}) => {
  const animationClass = direction === 'up' ? 'animate-on-scroll' :
                        direction === 'left' ? 'animate-on-scroll-left' :
                        direction === 'right' ? 'animate-on-scroll-right' :
                        'animate-on-scroll-scale';

  return (
    <div
      className={`${animationClass} card-hover ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Section with staggered children animation
interface StaggerSectionProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerSection: React.FC<StaggerSectionProps> = ({
  children,
  className = '',
  staggerDelay = 100
}) => {
  const ref = useStaggerAnimation(staggerDelay);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
};

// Hero text with cinematic entrance
interface HeroTextProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export const HeroText: React.FC<HeroTextProps> = ({
  title,
  subtitle,
  description,
  className = ''
}) => {
  return (
    <div className={`text-center ${className}`}>
      <CinematicText delay={200} className="font-serif text-s-h1 md:text-d-h1 mb-4 text-foreground">
        {title}
      </CinematicText>

      {subtitle && (
        <CinematicText delay={400} className="text-xl md:text-2xl text-primary mb-6">
          {subtitle}
        </CinematicText>
      )}

      {description && (
        <CinematicText delay={600} className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {description}
        </CinematicText>
      )}
    </div>
  );
};

// Floating action buttons with animations
interface FloatingActionsProps {
  actions: Array<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  }>;
  className?: string;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  actions,
  className = ''
}) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className}`}>
      {actions.map((action, index) => (
        <CinematicText key={action.href} delay={800 + index * 100}>
          <a
            href={action.href}
            className={`
              inline-block px-8 py-4 rounded-md font-medium transition-all duration-300 hover:transform hover:-translate-y-1
              ${action.variant === 'primary' ? 'bg-primary text-primary-foreground hover:bg-primary/90' :
                action.variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' :
                'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'}
            `}
          >
            {action.label}
          </a>
        </CinematicText>
      ))}
    </div>
  );
};

// Progressive image loading with fade-in
interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  placeholderClassName = ''
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.src = src;
            image.onload = () => {
              image.classList.add('loaded');
            };
            observer.unobserve(image);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(img);

    return () => observer.unobserve(img);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${placeholderClassName}`}>
      <img
        ref={imgRef}
        alt={alt}
        className={`transition-all duration-700 opacity-0 scale-105 ${className}`}
        style={{
          filter: 'blur(5px)'
        }}
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          target.classList.add('loaded');
          target.style.opacity = '1';
          target.style.transform = 'scale(1)';
          target.style.filter = 'blur(0px)';
        }}
      />
    </div>
  );
};

// Count-up animation for numbers
interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  className = '',
  prefix = '',
  suffix = ''
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const countRef = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLSpanElement;
            const startTime = Date.now();

            const updateCount = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing function
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              countRef.current = Math.floor(end * easeOutQuart);

              element.textContent = `${prefix}${countRef.current.toLocaleString()}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              }
            };

            updateCount();
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [end, duration, prefix, suffix]);

  return <span ref={ref} className={className}>0</span>;
};

const ScrollAnimations = {
  useScrollAnimation,
  useParallax,
  useStaggerAnimation,
  CinematicText,
  AnimatedCard,
  StaggerSection,
  HeroText,
  FloatingActions,
  ProgressiveImage,
  CountUp
};

export default ScrollAnimations;
