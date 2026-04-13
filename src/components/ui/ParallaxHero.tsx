'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

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

  useEffect(() => {
    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP & ScrollTrigger Setup
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const triggerElement = containerRef.current;
      if (!triggerElement) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Background Parallax: Depth effect using different speeds
      tl.to('[data-parallax-layer="1"]', { y: '15%', ease: 'none' }, 0)
        .to('[data-parallax-layer="2"]', { y: '25%', ease: 'none' }, 0)
        .to('[data-parallax-layer="3"]', { y: '-40%', opacity: 0, ease: 'none' }, 0)
        .to('[data-parallax-layer="4"]', { y: '45%', ease: 'none' }, 0)
        .to('.hero-content-main', { y: '-15%', opacity: 0, ease: 'none' }, 0);
    }, containerRef);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

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

        <div className="hero-content-main container-custom absolute inset-0 z-20 flex flex-col items-center justify-center">
          <div className="max-w-5xl text-center">
            <p className="mb-6 inline-flex items-center rounded-full border border-primary-400/30 bg-primary-500/10 px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-300 backdrop-blur-md">
              Topografía e ingeniería de precisión
            </p>
            <h1 className="text-balance font-display text-5xl font-black leading-[1.1] text-white md:text-7xl lg:text-8xl">
              Soluciones topográficas
              <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-accent-400 bg-clip-text text-transparent">
                {' '}
                premium, confiables y escalables
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-2xl">
              Levantamientos con drones, avalúos, peritajes y consultoría catastral en Bucaramanga y toda Colombia.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              <a href="#contacto" className="btn-primary">Solicitar cotización</a>
              <a href="#servicios" className="btn-secondary">Explorar servicios</a>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section: Part of the page flow below the sticky hero */}
      <div className="container-custom relative z-30 -mt-32 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article className="glass group p-8 text-center border-white/10 hover:border-primary-500/50 transition-all duration-500">
            <p className="text-4xl font-black text-white group-hover:text-primary-400 transition-colors">{metrics.kilometrosMedidos}</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-wider text-neutral-400">Kilómetros medidos</p>
          </article>
          <article className="glass group p-8 text-center border-white/10 hover:border-primary-500/50 transition-all duration-500">
            <p className="text-4xl font-black text-white group-hover:text-primary-400 transition-colors">{metrics.regionesAtendidas}</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-wider text-neutral-400">Regiones atendidas</p>
          </article>
          <article className="glass group p-8 text-center border-white/10 hover:border-primary-500/50 transition-all duration-500">
            <p className="text-4xl font-black text-white group-hover:text-primary-400 transition-colors">{metrics.puntosGPS}</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-wider text-neutral-400">Puntos GPS</p>
          </article>
          <article className="glass group p-8 text-center border-white/10 hover:border-primary-500/50 transition-all duration-500">
            <p className="text-4xl font-black text-white group-hover:text-primary-400 transition-colors">{metrics.sesionesIGAC}</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-wider text-neutral-400">Sesiones IGAC</p>
          </article>
        </div>
      </div>
    </section>
  );
}
