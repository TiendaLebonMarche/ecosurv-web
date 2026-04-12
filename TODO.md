# ECOSURVEY Website Implementation Plan

## Information Gathered
- Astro project initialized with Tailwind, TypeScript, Sitemap.
- Configs updated (astro.config.mjs, tailwind.config.mjs, global.css).
- package.json fixed.
- Minor TS warnings (normal, fix with dev server).

## Plan
1. [ ] Create src/content/ (services.json, metrics.json, faq.json, company.json)
2. [ ] Create src/components/layout/ (Header.astro, Footer.astro, Layout.astro)
3. [ ] Create src/components/ui/ (Button.astro, Card.astro, Section.astro, AnchorLink.astro)
4. [ ] Create src/components/sections/ (HeroParallax.astro, Services.astro, About.astro, FAQ.astro, Contact.astro)
5. [ ] Create src/utils/navigation.ts
6. [ ] Update src/pages/index.astro with sections
7. [ ] Add public/ assets (favicons, og-image, hero.webp placeholder)
8. [ ] Run `npm run dev` to test & generate types
9. [ ] Test with browser_action
10. [ ] `astro build` & Lighthouse check
11. [ ] vercel.json, README.md

## Dependent Files
- All components depend on global.css & tailwind.config
- Services on services.json

## Next Steps
- Fix services.json JSON error
- Create content files
- `npm run dev`

Confirm plan?
