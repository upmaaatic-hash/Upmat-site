(() => {
  "use strict";

  /* Navegação principal (página inicial). */
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav nav");

  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 30);
    });
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
    document.querySelectorAll(".nav nav a").forEach((link) => {
      link.addEventListener("click", () => menu.classList.remove("open"));
    });
  }

  /* Animações de entrada. */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  }

  /* Lightbox da galeria. */
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const lightboxClose = lightbox?.querySelector(".lightbox-close");

  if (lightbox && lightboxImage && lightboxClose) {
    const closeLightbox = () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.src = "";
      document.body.style.overflow = "";
    };

    document.querySelectorAll(".shot").forEach((shot) => {
      shot.addEventListener("click", () => {
        lightboxImage.src = shot.dataset.src || "";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLightbox();
    });
  }

  /* Carrossel das aplicações de logo. */
  const logoCarousel = document.querySelector("[data-logo-carousel]");

  if (logoCarousel) {
    const viewport = logoCarousel.querySelector("[data-carousel-viewport]");
    const track = logoCarousel.querySelector("[data-carousel-track]");
    const slides = track ? [...track.children] : [];
    const dots = [...document.querySelectorAll("[data-carousel-dot]")];
    const name = document.querySelector("[data-carousel-name]");
    const download = document.querySelector("[data-carousel-download]");
    const previous = logoCarousel.querySelector("[data-carousel-prev]");
    const next = logoCarousel.querySelector("[data-carousel-next]");
    let index = 0;

    const update = (newIndex) => {
      if (!track || slides.length === 0) return;
      index = (newIndex + slides.length) % slides.length;
      track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;

      const slide = slides[index];
      if (name) name.textContent = slide.dataset.logoName || "";
      if (download) {
        download.href = slide.dataset.logoFile || "#";
        download.setAttribute("download", slide.dataset.logoDownload || "");
      }

      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", String(active));
      });
    };

    previous?.addEventListener("click", () => update(index - 1));
    next?.addEventListener("click", () => update(index + 1));
    dots.forEach((dot) => dot.addEventListener("click", () => update(Number(dot.dataset.carouselDot))));
    addSwipe(viewport, () => update(index - 1), () => update(index + 1));
    update(0);
  }

  /* Carrossel das fotos oficiais. */
  const photoCarousel = document.querySelector("[data-photo-carousel]");

  if (photoCarousel) {
    const viewport = photoCarousel.querySelector("[data-photo-viewport]");
    const track = photoCarousel.querySelector("[data-photo-track]");
    const slides = track ? [...track.children] : [];
    const dots = [...document.querySelectorAll("[data-photo-dot]")];
    const name = document.querySelector("[data-photo-name]");
    const view = document.querySelector("[data-photo-view]");
    const download = document.querySelector("[data-photo-download]");
    const previous = photoCarousel.querySelector("[data-photo-prev]");
    const next = photoCarousel.querySelector("[data-photo-next]");
    let index = 0;

    const update = (newIndex) => {
      if (!track || slides.length === 0) return;
      index = (newIndex + slides.length) % slides.length;
      track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;

      const slide = slides[index];
      const file = slide.dataset.photoFile || "#";
      if (name) name.textContent = slide.dataset.photoName || "";
      if (view) view.href = file;
      if (download) {
        download.href = file;
        download.setAttribute("download", slide.dataset.photoDownload || "");
      }

      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", String(active));
      });
    };

    previous?.addEventListener("click", () => update(index - 1));
    next?.addEventListener("click", () => update(index + 1));
    dots.forEach((dot) => dot.addEventListener("click", () => update(Number(dot.dataset.photoDot))));
    addSwipe(viewport, () => update(index - 1), () => update(index + 1));
    update(0);
  }

  /* Carrossel premium de vídeos. Para adicionar outro vídeo, inclua um slide no HTML e um item nesta lista. */
  const videos = [
    {
      title: "Last Dance - Encerramento OBECO",
      youtube: "https://youtube.com/shorts/mudVrhJ-7eE",
      download: "https://drive.google.com/uc?export=download&id=1d11tLapgGxjxqW7X3oRIYMBh1wpyJgV_"
    },
    {
      title: "Baile do Alissera - passando a pista pro Gabriel Boni",
      youtube: "https://youtube.com/shorts/4224laM7_wE",
      download: "https://drive.google.com/uc?export=download&id=1DN5ctqafWPSIhNHuF66VtSUf3VaHrrmc"
    },
    {
      title: "UNDERHOUSE - B2B com Luffs",
      youtube: "https://youtube.com/shorts/fNL2Yf0HRis",
      download: "https://drive.google.com/uc?export=download&id=1ME-KEXS8ijkbSDjzSFpCtO_jWxK4I-vz"
    }
  ];

  const videoCarousel = document.querySelector("[data-video-carousel]");

  if (videoCarousel) {
    const viewport = videoCarousel.querySelector("[data-video-viewport]");
    const track = videoCarousel.querySelector("[data-video-track]");
    const slides = track ? [...track.children] : [];
    const dots = [...document.querySelectorAll("[data-video-dot]")];
    const title = document.querySelector("[data-video-title]");
    const counter = document.querySelector("[data-video-index]");
    const youtube = document.querySelector("[data-video-youtube]");
    const download = document.querySelector("[data-video-download]");
    const previous = videoCarousel.querySelector("[data-video-prev]");
    const next = videoCarousel.querySelector("[data-video-next]");
    let index = 0;

    const update = (newIndex) => {
      const total = Math.min(slides.length, videos.length);
      if (!track || total === 0) return;

      index = (newIndex + total) % total;
      track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;

      const video = videos[index];
      if (title) title.textContent = video.title;
      if (counter) counter.textContent = `VÍDEO ${String(index + 1).padStart(2, "0")}`;
      if (youtube) youtube.href = video.youtube;
      if (download) download.href = video.download;

      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", String(active));
      });
    };

    previous?.addEventListener("click", () => update(index - 1));
    next?.addEventListener("click", () => update(index + 1));
    dots.forEach((dot) => dot.addEventListener("click", () => update(Number(dot.dataset.videoDot))));
    addSwipe(viewport, () => update(index - 1), () => update(index + 1));
    update(0);
  }

  function addSwipe(element, onPrevious, onNext) {
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let mouseStartX = 0;
    let dragging = false;

    element.addEventListener("touchstart", (event) => {
      const touch = event.changedTouches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    }, { passive: true });

    element.addEventListener("touchend", (event) => {
      const touch = event.changedTouches[0];
      const distanceX = touch.clientX - startX;
      const distanceY = touch.clientY - startY;
      if (Math.abs(distanceX) < 35 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
      distanceX < 0 ? onNext() : onPrevious();
    }, { passive: true });

    element.addEventListener("mousedown", (event) => {
      dragging = true;
      mouseStartX = event.clientX;
      event.preventDefault();
    });

    window.addEventListener("mouseup", (event) => {
      if (!dragging) return;
      const distanceX = event.clientX - mouseStartX;
      dragging = false;
      if (Math.abs(distanceX) < 45) return;
      distanceX < 0 ? onNext() : onPrevious();
    });

    window.addEventListener("blur", () => {
      dragging = false;
    });
  }
})();
