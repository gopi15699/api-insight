'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Attach to a container ref — every direct child with
 * data-gsap="reveal" fades + slides in when scrolled into view.
 */
export function useGsapReveal(stagger = 0.12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll('[data-gsap="reveal"]');
      if (!els?.length) return;

      gsap.fromTo(
        els,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [stagger]);

  return ref;
}

/**
 * Hero — plays immediately on mount, no scroll trigger.
 */
export function useGsapHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll('[data-gsap="hero"]');
      if (!els?.length) return;

      gsap.fromTo(
        els,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.14,
          delay: 0.1,
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Horizontal slide — used for the feature row text side.
 * direction: 'left' | 'right'
 */
export function useGsapSlide(direction: 'left' | 'right' = 'left') {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: direction === 'left' ? -60 : 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [direction]);

  return ref;
}

/**
 * Scale-up reveal — used for cards/visuals.
 */
export function useGsapScale() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 0.93, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
