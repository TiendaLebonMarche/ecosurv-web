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
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');
    if (!triggerElement) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: '0% 0%',
        end: '100% 0%',
        scrub: 0.3
      }
    });

    const layers = [
      { layer: '1', yPercent: 70 },
      { layer: '2', yPercent: 50 },
      { layer: '3', yPercent: 30 },
      { layer: '4', yPercent: 10 }
    ];

    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        {
          yPercent: layerObj.yPercent,
          ease: 'none'
        },
        idx === 0 ? undefined : '<'
      );
    });

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(triggerElement);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <section id="inicio" className="parallax relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-primary-950" ref={parallaxRef}>
      <div className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" />
          <div data-parallax-layers className="parallax__layers">
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.28),transparent_62%)]" />
          <div className="parallax__fade" />
        </div>

        <div className="container-custom absolute inset-0 z-20 flex items-center py-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-5 inline-flex items-center rounded-full border border-primary-300/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-200">
              Topografía e ingeniería de precisión
            </p>

            <h1 className="text-balance font-display text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              Soluciones topográficas
              <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-accent-400 bg-clip-text text-transparent">
                {' '}
                premium, confiables y escalables
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl">
              Levantamientos con drones, avalúos, peritajes y consultoría catastral en Bucaramanga y toda Colombia.
              Diseño técnico, trazabilidad legal y ejecución impecable.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#contacto" className="btn-primary">Solicitar cotización</a>
              <a href="#servicios" className="btn-secondary">Explorar servicios</a>
            </div>

            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <article className="glass p-5 text-center">
                <p className="text-2xl font-bold text-white">{metrics.kilometrosMedidos}</p>
                <p className="mt-1 text-sm text-neutral-300">Kilómetros medidos</p>
              </article>
              <article className="glass p-5 text-center">
                <p className="text-2xl font-bold text-white">{metrics.regionesAtendidas}</p>
                <p className="mt-1 text-sm text-neutral-300">Regiones atendidas</p>
              </article>
              <article className="glass p-5 text-center">
                <p className="text-2xl font-bold text-white">{metrics.puntosGPS}</p>
                <p className="mt-1 text-sm text-neutral-300">Puntos GPS</p>
              </article>
              <article className="glass p-5 text-center">
                <p className="text-2xl font-bold text-white">{metrics.sesionesIGAC}</p>
                <p className="mt-1 text-sm text-neutral-300">Sesiones IGAC</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
