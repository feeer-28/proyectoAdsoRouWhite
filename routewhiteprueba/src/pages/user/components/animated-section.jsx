
import { useRef, useEffect, useState } from 'react';
import { cn } from "../lib/utils.js";


export function AnimatedSection({ children, className, ...props }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-in-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
} 