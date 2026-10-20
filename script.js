// ==========================================================================
// Little Star Playhouse - Interactive Scripts
// Bilingual Support, Mobile Navigation, Admission Form & Photo Gallery
// ==========================================================================

const toggle = document.getElementById("languageToggle");
let currentLanguage = "en";

// Bilingual Language Switcher
function setLanguage(next) {
  currentLanguage = next;
  document.documentElement.lang = next;

  // Update text content of bilingual elements
  document.querySelectorAll("[data-en][data-ne]").forEach((el) => {
    // Skip select options if they are handled separately or if el is an option
    if (el.tagName === "OPTION") {
      el.textContent = el.dataset[next];
    } else {
      el.textContent = el.dataset[next];
    }
  });

  // Update input & textarea placeholders
  document.querySelectorAll("[data-placeholder-en][data-placeholder-ne]").forEach((el) => {
    const key = `placeholder${next.charAt(0).toUpperCase() + next.slice(1)}`;
    if (el.dataset[key]) {
      el.placeholder = el.dataset[key];
    }
  });

  // Toggle button label
  if (toggle) {
    toggle.textContent = next === "en" ? "नेपाली" : "English";
  }

  // Update open lightbox caption if active
  const lightbox = document.getElementById("lightboxModal");
  if (lightbox && lightbox.classList.contains("active") && activeTrigger) {
    const nextCaption = currentLanguage === "ne" ? activeTrigger.dataset.captionNe : activeTrigger.dataset.captionEn;
    const lightboxCaption = document.getElementById("lightboxCaption");
    if (lightboxCaption && nextCaption) {
      lightboxCaption.textContent = nextCaption;
    }
  }
}

if (toggle) {
  toggle.addEventListener("click", () => {
    setLanguage(currentLanguage === "en" ? "ne" : "en");
  });
}

// Mobile Navigation Toggle
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  document.querySelectorAll("#nav a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

// Footer Current Year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ==========================================================================
// Lightbox Modal for Photo Gallery & Notices
// ==========================================================================
const lightbox = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
let activeTrigger = null;

function openLightbox(trigger) {
  activeTrigger = trigger;
  const imgSrc = trigger.dataset.img || trigger.querySelector("img")?.src;
  const caption = (currentLanguage === "ne" ? trigger.dataset.captionNe : trigger.dataset.captionEn) 
    || trigger.querySelector("img")?.alt 
    || "Little Star Playhouse";

  if (imgSrc && lightbox && lightboxImg) {
    lightboxImg.src = imgSrc;
    if (lightboxCaption) {
      lightboxCaption.textContent = caption;
    }
    lightbox.removeAttribute("hidden");
    void lightbox.offsetWidth; // force browser reflow for opacity transition
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

function attachLightboxTriggers(container = document) {
  container.querySelectorAll(".gallery-item, .view-poster-btn").forEach((item) => {
    if (item.dataset.hasLightbox) return;
    item.dataset.hasLightbox = "true";

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
}

attachLightboxTriggers();

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

// ==========================================================================
// Local Photo Preview Helper
// Connects to "images/" folder and lets users test local photos live
// ==========================================================================
const localPhotoInput = document.getElementById("localPhotoInput");
const galleryGrid = document.getElementById("galleryGrid");

if (localPhotoInput && galleryGrid) {
  localPhotoInput.addEventListener("change", (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        const figure = document.createElement("figure");
        figure.className = "gallery-item";
        figure.dataset.img = dataUrl;
        figure.dataset.captionEn = `Preview: ${file.name} (from local computer)`;
        figure.dataset.captionNe = `पूर्वावलोकन: ${file.name} (कम्प्युटरबाट)`;

        figure.innerHTML = `
          <div class="gallery-img-wrap">
            <img src="${dataUrl}" alt="${file.name}" loading="lazy">
            <div class="gallery-overlay">
              <span class="gallery-zoom-icon">🔍</span>
              <span class="gallery-overlay-text">Click to Enlarge</span>
            </div>
          </div>
          <figcaption>
            <strong>${file.name}</strong>
            <small style="color:#2E7D32;">✓ Local Photo Preview (Saved in images/)</small>
          </figcaption>
        `;

        // Prepend to show at top of gallery
        galleryGrid.insertBefore(figure, galleryGrid.firstChild);
        attachLightboxTriggers(figure);
      };
      reader.readAsDataURL(file);
    });

    alert(
      currentLanguage === "ne"
        ? "तपाईंको फोटो ग्यालरीमा पूर्वावलोकन गरिएको छ! यसलाई स्थायी बनाउन आफ्नो 'little-star-playhouse/images' फोल्डरमा राख्नुहोस्।"
        : "Photo preview added to gallery! To make it permanent, keep the file in your 'little-star-playhouse/images' folder."
    );
  });
}

// ==========================================================================
// Admission Enquiry Form (WhatsApp & Email Submission)
// ==========================================================================
const parentNameInput = document.getElementById("parentName");
const phoneNumInput = document.getElementById("phoneNum");
const childNameInput = document.getElementById("childName");
const programSelect = document.getElementById("programSelect");
const childAgeInput = document.getElementById("childAge");
const formMessageInput = document.getElementById("formMessage");
const submitWhatsAppBtn = document.getElementById("submitWhatsApp");
const submitEmailBtn = document.getElementById("submitEmail");
const formFeedback = document.getElementById("formFeedback");

function validateForm() {
  const parentName = parentNameInput?.value.trim() || "";
  const phone = phoneNumInput?.value.trim() || "";
  const program = programSelect?.value || "";

  if (!parentName) {
    showFeedback(
      currentLanguage === "ne" ? "कृपया अभिभावकको पूरा नाम लेख्नुहोस्।" : "Please enter parent / guardian name.",
      "error"
    );
    parentNameInput?.focus();
    return false;
  }

  if (!phone || phone.length < 8) {
    showFeedback(
      currentLanguage === "ne" ? "कृपया मान्य फोन वा ह्वाट्सएप नम्बर लेख्नुहोस्।" : "Please enter a valid phone or WhatsApp number.",
      "error"
    );
    phoneNumInput?.focus();
    return false;
  }

  if (!program) {
    showFeedback(
      currentLanguage === "ne" ? "कृपया इच्छुक कार्यक्रम रोज्नुहोस्।" : "Please select a program of interest.",
      "error"
    );
    programSelect?.focus();
    return false;
  }

  return true;
}

function showFeedback(msg, type = "success") {
  if (!formFeedback) return;
  formFeedback.textContent = msg;
  formFeedback.className = `form-feedback ${type}`;
  formFeedback.removeAttribute("hidden");
}

function buildEnquiryMessage() {
  const parentName = parentNameInput?.value.trim();
  const phone = phoneNumInput?.value.trim();
  const childName = childNameInput?.value.trim() || "Not specified";
  const program = programSelect?.value || "General Enquiry";
  const age = childAgeInput?.value.trim() || "Not specified";
  const message = formMessageInput?.value.trim() || "Looking forward to hearing from you.";

  return `Hello Little Star Playhouse (Janakpurdham),
I would like to enquire about admission:

• Parent/Guardian: ${parentName}
• Contact Phone/WhatsApp: ${phone}
• Child's Name: ${childName}
• Child's Age: ${age}
• Program of Interest: ${program}
• Notes / Preferred Visit: ${message}

Thank you!`;
}

if (submitWhatsAppBtn) {
  submitWhatsAppBtn.addEventListener("click", () => {
    if (!validateForm()) return;

    const message = buildEnquiryMessage();
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/9779709142797?text=${encoded}`;

    showFeedback(
      currentLanguage === "ne" 
        ? "ह्वाट्सएप खुल्दैछ... धन्यवाद!" 
        : "Opening WhatsApp with your enquiry details... Thank you!",
      "success"
    );

    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
}

if (submitEmailBtn) {
  submitEmailBtn.addEventListener("click", () => {
    if (!validateForm()) return;

    const message = buildEnquiryMessage();
    const subject = encodeURIComponent("Admission Enquiry - Little Star Playhouse");
    const body = encodeURIComponent(message);
    const mailtoUrl = `mailto:littlestarplayhouse2026@gmail.com?subject=${subject}&body=${body}`;

    showFeedback(
      currentLanguage === "ne" 
        ? "इमेल खुल्दैछ... धन्यवाद!" 
        : "Opening your email app... Thank you!",
      "success"
    );

    window.location.href = mailtoUrl;
  });
}
