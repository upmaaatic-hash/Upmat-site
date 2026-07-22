/* =========================================================
UPMAT WEBSITE — SCRIPT.JS
Versão 3.2
Hero, navegação mobile e animações da seção Sobre
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menuButton = document.querySelector(".menu-mobile");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  /* =========================================================
  HEADER
  ========================================================= */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  /* =========================================================
  MENU MOBILE
  ========================================================= */

  function closeMenu() {
    if (!menuButton || !navMenu) return;

    menuButton.classList.remove("active");
    navMenu.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    if (!menuButton || !navMenu) return;

    const isOpen = navMenu.classList.toggle("active");

    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));

    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", toggleMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!menuButton || !navMenu) return;

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (
      navMenu.classList.contains("active") &&
      !clickedInsideMenu &&
      !clickedMenuButton
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) {
      closeMenu();
    }
  });

  /* =========================================================
  ANIMAÇÕES DA SEÇÃO SOBRE
  ========================================================= */

  const revealElements = document.querySelectorAll(
    [
      ".about-kicker",
      ".about-manifesto-header h2",
      ".about-manifesto-image",
      ".about-manifesto-content p",
      ".about-manifesto-statement",
      ".about-manifesto-signature"
    ].join(",")
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -70px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =========================================================
  EVENTOS DA PÁGINA
  ========================================================= */

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();
});
