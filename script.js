const LANDING_CONFIG = {
  businessName: "System De Vente",
  priceDzd: "8,500",
  whatsappNumber: "213699279119",
  whatsappDisplay: "+213699279119",
  whatsappMessage:
    "السلام عليكم، أريد شراء النسخة الاحترافية من System De Vente بسعر 8,500 دج ومعرفة طريقة التفعيل.",
  downloadUrl: "https://www.mediafire.com/file/eqlnzjvzby4ngku/System+De+Vente-win32-x64.rar/file",
  downloadLabel:
    "سيفتح رابط MediaFire لتحميل ملف RAR للنسخة التجريبية. غيّر الرابط في script.js بعد رفع الملف.",
};

// --- Slider Logic ---
function initSlider() {
  const wrapper = document.getElementById("app-slider");
  if (!wrapper) return;

  const slides = wrapper.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  let currentIndex = 0;
  let autoPlayInterval;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoPlay();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 3000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
  });

  // Pause on hover
  wrapper.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
  wrapper.addEventListener("mouseleave", startAutoPlay);

  startAutoPlay();
}

const whatsappUrl = `https://wa.me/${LANDING_CONFIG.whatsappNumber}?text=${encodeURIComponent(
  LANDING_CONFIG.whatsappMessage
)}`;

document.querySelectorAll("[data-whatsapp-link]").forEach((element) => {
  element.setAttribute("href", whatsappUrl);
  element.setAttribute("target", "_blank");
  element.setAttribute("rel", "noreferrer");
});

document.querySelectorAll("[data-download-link]").forEach((element) => {
  element.setAttribute("href", LANDING_CONFIG.downloadUrl);
  element.setAttribute("target", "_blank");
  element.setAttribute("rel", "noreferrer");
});

const whatsappDisplay = document.querySelector("[data-whatsapp-display]");
if (whatsappDisplay) {
  whatsappDisplay.textContent = LANDING_CONFIG.whatsappDisplay;
}

const downloadLabel = document.querySelector("[data-download-label]");
if (downloadLabel) {
  downloadLabel.textContent = LANDING_CONFIG.downloadLabel;
}

document.title = `${LANDING_CONFIG.businessName} | نظام نقاط بيع احترافي`;

// Initialize components
document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  initThemeToggle();
  initScrollReveal();
});

// --- Theme Toggle Logic ---
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  // Set initial theme
  setTheme(getPreferredTheme());

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

// --- Scroll Reveal Logic ---
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optionally unobserve if you want it to reveal only once
          // revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((reveal) => revealObserver.observe(reveal));
}
