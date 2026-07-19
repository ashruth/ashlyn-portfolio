/* ----------------------------------------------------------------
    DATA 
---------------------------------------------------------------- */

// PHOTOGRAPHY DATA
const PHOTOGRAPHY_DATA = [
  { img: "assets/images/beach.jpeg", caption: "Ullal Beach, Mangalore" },
  { img: "assets/images/food.jpeg", caption: "Capella, Mangalore" },
  { img: "assets/images/rainbow.jpeg", caption: "Rainbow, Bangalore" },
  { img: "assets/images/temple.jpeg", caption: "Halebidu Temple, Karnataka" },
  { img: "assets/images/varkala.jpeg", caption: "Cliffs, Varkala" },
  { img: "assets/images/flowers.jpeg", caption: "Roadside Flowers, Bangalore" },
  { img: "assets/images/tanisha.jpeg", caption: "Photoshoot, Bahrain" }
];

// DESIGN DATA
const DESIGN_DATA = [
  { img: "assets/images/quaternis-val.jpg", caption: "Quaternis Valetines Theme Poster" },
  { img: "assets/images/abacus-cccall.png", caption: "Abacus Core Commitee Interview Poster" },
  { img: "assets/images/carousel.png", caption: "Carousel Instagram Post" },
  { img: "assets/images/certificate.png", caption: "Certificate Design" },
  { img: "assets/images/isa-poster.png", caption: "Event Poster" },
  { img: "assets/images/quaternis-music.png", caption: "Quaternis Music Theme Poster" },
];

// INSTAGRAM DATA
const INSTAGRAM_DATA = [
  "assets/images/insta-1.png",
  "assets/images/insta-2.png",
  "assets/images/insta-3.png",
  "assets/images/insta-4.png",
  "assets/images/insta-5.png",
  "assets/images/insta-6.png",
  "assets/images/insta-7.png",
];

// Role labels
const HERO_ROLES = ["VIDEOGRAPHER", "PHOTOGRAPHER", "CREATIVE STORYTELLER"];


/* ----------------------------------------------------------------
   LOADING PAGE
---------------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById("loader");
  const bar = document.getElementById("loaderProgress");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => loader.classList.add("is-hidden"), 300);
    }
    bar.style.width = progress + "%";
  }, 150);
}

/* ----------------------------------------------------------------
   SCROLL PROGRESS BAR + HEADER + BACK TO TOP + REC TIME
---------------------------------------------------------------- */
function initScrollEffects() {
  const progressBar = document.getElementById("scrollProgress");
  const header = document.getElementById("siteHeader");
  const backToTop = document.getElementById("backToTop");
  const recTimecode = document.getElementById("recTimecode");

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";

    header.classList.toggle("is-scrolled", scrollTop > 40);
    backToTop.classList.toggle("is-visible", scrollTop > 500);

    const totalFrames = Math.floor(pct * 10);
    const hh = String(Math.floor(totalFrames / 360)).padStart(2, "0");
    const mm = String(Math.floor((totalFrames / 6) % 60)).padStart(2, "0");
    const ss = String(Math.floor(totalFrames % 60)).padStart(2, "0");
    const ff = String(Math.floor((pct * 10) % 10)).padStart(2, "0");
    recTimecode.textContent = `${hh}:${mm}:${ss}:${ff}`;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ----------------------------------------------------------------
   MOBILE NAV
---------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", isOpen);
  });

  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ----------------------------------------------------------------
   HERO - bg
---------------------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    const count = Math.floor((canvas.width * canvas.height) / 22000);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.4 + 0.1,
      drift: Math.random() * 0.4 - 0.2,
      alpha: Math.random() * 0.5 + 0.2,
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();
  window.addEventListener("resize", () => { resize(); createParticles(); });
}

/* ----------------------------------------------------------------
   HERO - mouse 
---------------------------------------------------------------- */
function initSpotlight() {
  const hero = document.getElementById("hero");
  const spotlight = document.getElementById("heroSpotlight");
  if (!hero || !spotlight) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.setProperty("--x", x + "%");
    spotlight.style.setProperty("--y", y + "%");
  });
}

/* ----------------------------------------------------------------
   HERO - typing animation 
---------------------------------------------------------------- */
function initTypingAnimation() {
  const el = document.getElementById("typedRole");
  if (!el) return;
  let roleIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const word = HERO_ROLES[roleIndex];
    el.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex === word.length + 1) { delay = 1600; deleting = true; }
    else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % HERO_ROLES.length; delay = 400; }

    setTimeout(tick, delay);
  }
  tick();
}

/* ----------------------------------------------------------------
   SCROLL REVEAL
---------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((item) => observer.observe(item));
}

/* ----------------------------------------------------------------
   ANIMATED COUNTERS
---------------------------------------------------------------- */
function initCounters() {
  const nums = document.querySelectorAll(".stat__num");
  if (!nums.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach((el) => observer.observe(el));
}

/* ----------------------------------------------------------------
   GOLD RIPPLE BUTTONS
---------------------------------------------------------------- */
function initRippleButtons() {
  document.querySelectorAll(".ripple").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple-effect";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

/* ----------------------------------------------------------------
   GALLERIES + FILTERS + LIGHTBOX
---------------------------------------------------------------- */
let lightboxItems = [];
let lightboxIndex = 0;

function renderMasonry(containerId, data) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = data.map((item, i) => {
    const caption = item.caption || "";
    const overlay = caption ? `<div class="masonry-item__overlay"><span>${caption}</span></div>` : "";
    return `
      <div class="masonry-item" data-category="${item.category || "all"}" data-index="${i}" data-group="${containerId}">
        <img src="${item.img}" alt="${caption}" loading="lazy" />
        ${overlay}
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".masonry-item").forEach((el) => {
    el.addEventListener("click", () => openLightbox(data, parseInt(el.dataset.index, 10)));
  });
}

function initFilters(filterGroupId, gridId) {
  const group = document.getElementById(filterGroupId);
  if (!group) return;
  group.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    group.querySelectorAll(".filter").forEach((f) => f.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    document.querySelectorAll(`#${gridId} .masonry-item`).forEach((item) => {
      const show = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("is-hidden", !show);
    });
  });
}

function openLightbox(dataset, index) {
  lightboxItems = dataset;
  lightboxIndex = index;
  updateLightbox();
  document.getElementById("lightbox").classList.add("is-open");
  document.getElementById("lightbox").setAttribute("aria-hidden", "false");
}

function updateLightbox() {
  const item = lightboxItems[lightboxIndex];
  const caption = item.caption || "";
  document.getElementById("lightboxImg").src = item.img;
  document.getElementById("lightboxImg").alt = caption;
  document.getElementById("lightboxCaption").textContent = caption;
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("is-open");
  document.getElementById("lightbox").setAttribute("aria-hidden", "true");
}

function initLightboxControls() {
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.getElementById("lightboxPrev").addEventListener("click", () => {
    lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    updateLightbox();
  });
  document.getElementById("lightboxNext").addEventListener("click", () => {
    lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
    updateLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("lightbox").classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") document.getElementById("lightboxNext").click();
    if (e.key === "ArrowLeft") document.getElementById("lightboxPrev").click();
  });
}

/* ----------------------------------------------------------------
   INSTAGRAM GRID
---------------------------------------------------------------- */
function renderInstagram() {
  const grid = document.getElementById("instaGrid");
  if (!grid) return;
  grid.innerHTML = INSTAGRAM_DATA.map((src) => `
    <a class="insta__item" href="https://www.instagram.com/archives.zippp/?hl=en" target="_blank" rel="noopener">
      <img src="${src}" alt="Instagram post" loading="lazy" />
    </a>
  `).join("");
}

/* ----------------------------------------------------------------
   REEL PLAY BUTTON
---------------------------------------------------------------- */
function initReelPlay() {
  const poster = document.getElementById("reelPoster");
  const video = document.getElementById("reelVideo");
  const source = video ? video.querySelector("source") : null;
  const btn = document.getElementById("reelPlayBtn");
  const runtime = document.getElementById("reelRuntime");
  const player = document.querySelector(".reel__player");
  if (!video) return;

  function updateRuntimeLabel(value) {
    if (runtime) runtime.textContent = value;
  }

  function isVideoFullscreen() {
    return document.fullscreenElement === video
      || document.webkitFullscreenElement === video
      || document.mozFullScreenElement === video
      || document.msFullscreenElement === video;
  }

  function updatePlayerOrientation(videoSrc) {
    if (!player) return;
    const isVertical = String(videoSrc || "").includes("association-recap");
    player.dataset.orientation = isVertical ? "vertical" : "landscape";
    player.classList.toggle("reel__player--vertical", isVertical);
    video.classList.toggle("reel__video--fullscreen-vertical", false);
    if (isVertical) {
      video.classList.toggle("reel__video--vertical", true);
    } else {
      video.classList.toggle("reel__video--vertical", false);
    }
  }

  function syncFullscreenState() {
    if (!player) return;
    const isVerticalClip = String(source?.src || "").includes("association-recap");
    const isFullscreen = isVerticalClip && isVideoFullscreen();
    document.body.classList.toggle("reel-fullscreen-portrait", isFullscreen);
    video.classList.toggle("reel__video--fullscreen-vertical", isFullscreen);

    if (isFullscreen) {
      video.style.width = "100vw";
      video.style.height = "100vh";
      video.style.objectFit = "contain";
      video.style.transform = "rotate(90deg)";
      video.style.transformOrigin = "center center";
      video.style.background = "#000";
    } else {
      video.style.width = "";
      video.style.height = "";
      video.style.objectFit = "";
      video.style.transform = "";
      video.style.transformOrigin = "";
      video.style.background = "";
    }
  }

  btn.addEventListener("click", () => {
    poster.style.display = "none";
    btn.style.display = "none";
    video.style.display = "block";
    video.play();
  });

  updatePlayerOrientation(source?.src || "");

  video.addEventListener("fullscreenchange", syncFullscreenState);
  video.addEventListener("webkitfullscreenchange", syncFullscreenState);
  video.addEventListener("mozfullscreenchange", syncFullscreenState);
  video.addEventListener("MSFullscreenChange", syncFullscreenState);
  document.addEventListener("fullscreenchange", syncFullscreenState);
  document.addEventListener("webkitfullscreenchange", syncFullscreenState);
  document.addEventListener("mozfullscreenchange", syncFullscreenState);
  document.addEventListener("MSFullscreenChange", syncFullscreenState);

  document.querySelectorAll(".reel__thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const thumbImg = thumb.querySelector("img");
      const thumbCaption = thumb.querySelector(".reel__thumb-caption");
      const thumbRuntime = thumb.querySelector(".reel__thumb-runtime");

      const oldVideoSrc = source.src;
      const oldPosterSrc = poster.src;
      const oldCaption = poster.alt;
      const oldRuntime = runtime ? runtime.textContent : "00:00:00";
      const newRuntime = thumb.dataset.runtime || (thumbRuntime ? thumbRuntime.textContent : "00:00:00");

      source.src = thumb.dataset.video;
      poster.src = thumbImg.src;
      poster.alt = thumbCaption.textContent;
      video.load();
      video.pause();
      video.style.display = "none";
      poster.style.display = "block";
      btn.style.display = "flex";
      updateRuntimeLabel(newRuntime);
      updatePlayerOrientation(thumb.dataset.video || "");

      thumb.dataset.video = oldVideoSrc;
      thumb.dataset.runtime = oldRuntime;
      thumbImg.src = oldPosterSrc;
      thumbCaption.textContent = oldCaption;
      if (thumbRuntime) thumbRuntime.textContent = oldRuntime;

      document.querySelector(".reel__player").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}
/* ----------------------------------------------------------------
   footer year
---------------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ----------------------------------------------------------------
   INIT
---------------------------------------------------------------- */
function init() {
  initLoader();
  initScrollEffects();
  initMobileNav();
  initParticles();
  initSpotlight();
  initTypingAnimation();
  initCounters();
  initRippleButtons();

  renderMasonry("photoGrid", PHOTOGRAPHY_DATA);
  initFilters("photoFilters", "photoGrid");

  renderMasonry("designGrid", DESIGN_DATA);
  initFilters("designFilters", "designGrid");

  renderInstagram();
  initLightboxControls();
  initReelPlay();
  initFooterYear();

  initScrollReveal();
}

document.addEventListener("DOMContentLoaded", init);
