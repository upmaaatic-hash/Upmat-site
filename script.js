/* =========================================================
UPMAT WEBSITE — SCRIPT.JS
Versão 3.1
Atualização focada na Hero e navegação mobile
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menuButton = document.querySelector(".menu-mobile");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

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

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();
});
