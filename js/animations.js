// Animations douces (si GSAP + ScrollTrigger présents et si pas de "prefers-reduced-motion")
(() => {
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  const hasST = typeof window.ScrollTrigger !== "undefined";

  if (prefersReduced || !hasGSAP) return;

  const gsap = window.gsap;

  document.addEventListener("DOMContentLoaded", () => {
    // Fade-in global des sections "reveal"
    const items = document.querySelectorAll(".reveal");
    items.forEach((el) => {
      gsap.set(el, { autoAlpha: 0, y: 24 });
    });

    const animateIn = (el) => {
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    if (hasST) {
      gsap.registerPlugin(window.ScrollTrigger);
      items.forEach((el) => {
        window.ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          onEnter: () => animateIn(el),
          once: true
        });
      });
    } else {
      // Fallback sans ScrollTrigger: observer intersection
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.isIntersecting && (animateIn(e.target), io.unobserve(e.target)));
      }, { rootMargin: "0px 0px -20% 0px", threshold: 0.1 });
      items.forEach((el) => io.observe(el));
    }

    // Petite animation du bouton thème au survol/clic
    const btn = document.getElementById("btn-theme");
    if (btn) {
      btn.addEventListener("click", () => {
        gsap.fromTo(btn, { rotate: 0 }, { rotate: 360, duration: 0.6, ease: "power2.inOut" });
      });
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.05, duration: 0.15, ease: "power1.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1.0, duration: 0.15, ease: "power1.out" });
      });
    }
  });
})();
