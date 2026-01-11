(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const nav = $("#nav");
  const toggle = $(".navToggle");
  const year = $("#year");
  const topbar = $(".topbar");

  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile menu toggle
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu on link click
    $$("a[href^='#']", nav).forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Elevation on scroll
  const onScroll = () => {
    if (!topbar) return;
    if (window.scrollY > 8) topbar.classList.add("is-elevated");
    else topbar.classList.remove("is-elevated");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Simple reveal animation
  const animated = $$('[data-animate]');
  if ("IntersectionObserver" in window && animated.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.14 }
    );

    animated.forEach((el) => io.observe(el));
  } else {
    animated.forEach((el) => el.classList.add("in-view"));
  }
})();
