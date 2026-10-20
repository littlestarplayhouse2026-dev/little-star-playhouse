const toggle = document.getElementById("languageToggle");
let language = "en";

function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll("[data-en][data-ne]").forEach((el) => {
    el.textContent = el.dataset[next];
  });
  toggle.textContent = next === "en" ? "नेपाली" : "English";

  // If lightbox is currently open, update its caption
  const lightbox = document.getElementById("lightboxModal");
  if (lightbox && lightbox.classList.contains("active") && activeTrigger) {
    const nextCaption = language === "ne" ? activeTrigger.dataset.captionNe : activeTrigger.dataset.captionEn;
    const lightboxCaption = document.getElementById("lightboxCaption");
    if (lightboxCaption && nextCaption) {
      lightboxCaption.textContent = nextCaption;
    }
  }
}

toggle.addEventListener("click", () => setLanguage(language === "en" ? "ne" : "en"));

// Mobile navigation toggle
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach((a) =>
  a.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("open");
  })
);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Lightbox Modal for Gallery & Notices
const lightbox = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
let activeTrigger = null;

function openLightbox(trigger) {
  activeTrigger = trigger;
  const imgSrc = trigger.dataset.img || trigger.querySelector("img")?.src;
  const caption = (language === "ne" ? trigger.dataset.captionNe : trigger.dataset.captionEn) || trigger.querySelector("img")?.alt || "";

  if (imgSrc && lightbox && lightboxImg) {
    lightboxImg.src = imgSrc;
    if (lightboxCaption) {
      lightboxCaption.textContent = caption;
    }
    lightbox.removeAttribute("hidden");
    void lightbox.offsetWidth;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    activeTrigger = null;
    setTimeout(() => {
      if (!lightbox.classList.contains("active")) {
        lightbox.setAttribute("hidden", "");
      }
    }, 250);
  }
}

document.querySelectorAll(".gallery-item, .view-poster-btn").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    openLightbox(item);
  });
  if (item.classList.contains("gallery-item")) {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });
  }
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});
