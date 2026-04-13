'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

// Register plugin outside to avoid re-registration
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface HeroMetrics {
  kilometrosMedidos: string;
  regionesAtendidas: string;
  puntosGPS: string;
  sesionesIGAC: string;
}

interface ParallaxHeroProps {
  metrics: HeroMetrics;
}

export function ParallaxHero({ metrics }: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    let rafHandle: number;
    function raf(time: number) {
      lenis.raf(time);
      rafHandle = requestAnimationFrame(raf);
    }
    rafHandle = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafHandle);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const triggerElement = containerRef.current;
    if (!triggerElement) return;

    mainTimeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    mainTimeline.current
      .to('[data-parallax-layer="1"]', { yPercent: 15, ease: 'none' }, 0)
      .to('[data-parallax-layer="2"]', { yPercent: 25, ease: 'none' }, 0)
      .to('[data-parallax-layer="3"]', { yPercent: -40, opacity: 0, ease: 'none' }, 0)
      .to('[data-parallax-layer="4"]', { yPercent: 45, ease: 'none' }, 0)
      .to('.hero-content-main', { yPercent: -20, opacity: 0, ease: 'none' }, 0);

    // Elegant Intro Animation
    gsap.from('.hero-animate', {
      y: 60,
      opacity: 0,
      duration: 1.4,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.3
    });
  }, { scope: containerRef });

  return (
    <section 
      id="inicio" 
      ref={containerRef}
      className="relative min-h-[150vh] bg-neutral-950"
    >
      {/* Sticky Hero Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="parallax__visuals h-full w-full">
          <div className="parallax__layers h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80"
              loading="eager"
              data-parallax-layer="1"
              alt="Montañas de Colombia"
              className="parallax__layer-img opacity-55"
            />
            <img
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1800&q=80"
              loading="eager"
              data-parallax-layer="2"
              alt="Cordillera colombiana"
              className="parallax__layer-img opacity-45"
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title bg-gradient-to-r from-primary-200 via-white to-accent-300 bg-clip-text text-transparent">
                ECOSURVEY
              </h2>
            </div>
            <img
              src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1800&q=80"
              loading="eager"
              data-parallax-layer="4"
              alt="Paisaje montañoso colombiano"
              className="parallax__layer-img opacity-35"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_75%)]" />
        </div>

        <div className="hero-content-main container-custom absolute inset-0 z-20 flex flex-col items-center justify-center pt-24">
          <div className="max-w-5xl text-center">
            <p className="hero-animate mb-8 inline-flex items-center rounded-full border border-primary-400/20 bg-primary-500/5 px-6 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary-400 backdrop-blur-xl">
              Topografía e ingeniería de precisión
            </p>
            <h1 className="hero-animate text-balance font-display text-6xl font-black leading-[1.02] tracking-tight text-white md:text-8xl lg:text-9xl">
              Soluciones topográficas
              <span className="block bg-gradient-to-r from-primary-400 via-primary-200 to-accent-300 bg-clip-text text-transparent pb-2">
                {' '}
                premium y precisas
              </span>
            </h1>
            <p className="hero-animate mx-auto mt-12 max-w-3xl text-lg leading-relaxed text-neutral-400 md:text-xl lg:text-2xl font-light">
              Líderes en levantamientos con drones, avalúos RAA y consultoría catastral. Innovación técnica con más de 35 años de respaldo legal.
            </p>
            <div className="hero-animate mt-16 flex flex-wrap items-center justify-center gap-8">
              <a href="#contacto" className="btn-primary">Solicitar cotización</a>
              <a href="#servicios" className="btn-secondary">Explorar servicios</a>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section: Part of the page flow below the sticky hero */}
      <div className="container-custom relative z-30 -mt-20 pb-32">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="glass group p-12 text-center hover:scale-[1.02] transition-all duration-700">
            <p className="text-5xl font-black text-white group-hover:text-primary-400 transition-colors duration-500">{metrics.kilometrosMedidos}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-300 transition-colors">Kilómetros medidos</p>
          </article>
          <article className="glass group p-12 text-center hover:scale-[1.02] transition-all duration-700">
            <p className="text-5xl font-black text-white group-hover:text-primary-400 transition-colors duration-500">{metrics.regionesAtendidas}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-300 transition-colors">Regiones atendidas</p>
          </article>
          <article className="glass group p-12 text-center hover:scale-[1.02] transition-all duration-700">
            <p className="text-5xl font-black text-white group-hover:text-primary-400 transition-colors duration-500">{metrics.puntosGPS}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-300 transition-colors">Puntos GPS</p>
          </article>
          <article className="glass group p-12 text-center hover:scale-[1.02] transition-all duration-700">
            <p className="text-5xl font-black text-white group-hover:text-primary-400 transition-colors duration-500">{metrics.sesionesIGAC}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-300 transition-colors">Sesiones IGAC</p>
          </article>
        </div>
      </div>
    </section>
  );
}
