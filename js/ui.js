// Petites interactions UI communes
(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener("DOMContentLoaded", () => {
    // 1) Année dynamique dans le footer
    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // 2) Lien "Aller au contenu" focusable correctement sur Safari
    const main = $("#contenu");
    if (main) {
      const skip = $(".skip-link");
      if (skip) {
        skip.addEventListener("click", () => {
          main.setAttribute("tabindex", "-1");
          main.focus({ preventScroll: false });
          // Nettoie le tabindex après focus
          setTimeout(() => main.removeAttribute("tabindex"), 200);
        });
      }
    }

    // 3) Marquer le lien de la nav actif selon data-page (progressive enhancement)
    const currentPage = document.body.getAttribute("data-page");
    if (currentPage) {
      $$(".site-nav a").forEach((a) => {
        const href = (a.getAttribute("href") || "").toLowerCase();
        if (href.includes(currentPage + ".html")) {
          a.setAttribute("aria-current", "page");
        } else {
          a.removeAttribute("aria-current");
        }
      });
    }

    // 4) Bouton "remonter en haut" visible après défilement
    const toTop = $(".to-top");
    if (toTop) {
      const onScroll = () => {
        const y = window.scrollY || window.pageYOffset;
        toTop.classList.toggle("visible", y > 600);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // 5) Petite gestion des <details> pour UX (fermer les autres dans .tip si souhaité)
    $$(".tip").forEach((d) => {
      d.addEventListener("toggle", () => {
        if (d.open) {
          $$(".tip").forEach((other) => (other === d ? null : (other.open = false)));
        }
      });
    });
  });
})();
