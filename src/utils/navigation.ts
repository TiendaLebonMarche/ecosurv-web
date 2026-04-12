export function updateActiveNav(): void {
  const sections = ['inicio', 'servicios', 'nosotros', 'faq', 'contacto'];
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]'));

  let current = '#inicio';

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const offsetTop = section.offsetTop - 120;
    if (window.scrollY >= offsetTop) {
      current = `#${sectionId}`;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === current;
    link.classList.toggle('text-primary-600', isActive);
    link.classList.toggle('font-semibold', isActive);
  });
}

export function initRevealAnimations(): void {
  const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add('active');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((element) => observer.observe(element));
}

export function initSmoothAnchorScroll(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

export function initNavigationUX(): void {
  initRevealAnimations();
  initSmoothAnchorScroll();
  updateActiveNav();

  window.addEventListener('scroll', updateActiveNav, { passive: true });
}
