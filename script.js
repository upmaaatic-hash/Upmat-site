/* ==================================================
   UPMAT Website v3.0
   script.js
================================================== */

// ==============================
// MENU MOBILE
// ==============================

const menuButton = document.querySelector(".menu-mobile");
const navMenu = document.querySelector(".nav-menu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuButton.classList.toggle("active");
    });
}

// ==============================
// HEADER AO ROLAR
// ==============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

// ==============================
// SCROLL SUAVE
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

        if (navMenu) {
            navMenu.classList.remove("active");
        }

    });

});

// ==============================
// ANIMAÇÃO AO APARECER
// ==============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});

// ==============================
// LIGHTBOX DA GALERIA
// ==============================

const galleryImages = document.querySelectorAll(".gallery-grid img");

if (galleryImages.length > 0) {

    const lightbox = document.createElement("div");

    lightbox.id = "lightbox";

    lightbox.innerHTML = "<img>";

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");

    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            lightbox.classList.add("active");

            lightboxImage.src = image.src;

        });

    });

    lightbox.addEventListener("click", () => {

        lightbox.classList.remove("active");

    });

}

// ==============================
// ANO AUTOMÁTICO
// ==============================

const footer = document.querySelector(".footer p");

if (footer) {

    footer.innerHTML =
        "© " +
        new Date().getFullYear() +
        " UPMAT • Todos os direitos reservados.";

}

// ==============================
// FINALIZAÇÃO
// ==============================

console.log("UPMAT Website v3.0 carregado com sucesso.");
