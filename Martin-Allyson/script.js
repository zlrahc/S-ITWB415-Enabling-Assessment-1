const projects = [
  {
    title: "AniSkolar — Scholarship Management System",
    initials: "AS",
    tag: "Undergraduate Thesis · 2026",
    color: "linear-gradient(135deg, #7FA871, #3C5A44)",
    description:
      "A web-based scholarship management system that streamlines applicant and scholarship record-keeping for a university. Structured the system workflow from the ground up and led UI/UX planning and frontend development.",
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    title: "CareerMatch — Swipe-Based Job Matching Platform",
    initials: "CM",
    tag: "Personal Project · 2025",
    color: "linear-gradient(135deg, #E1A83C, #C68A25)",
    description:
      "A web platform that turns job hunting into a swipe-based matching experience, with automated email notifications. Designed the system architecture and led end-to-end frontend development.",
    stack: ["React", "Vite", "JavaScript", "Tailwind CSS", "Node.js", "Firebase"],
    link: "#",
  },
  {
    title: "BanCo — Loan Management App",
    initials: "BC",
    tag: "Academic Project · 2025",
    color: "linear-gradient(135deg, #5E8A54, #23362A)",
    description:
      "An Android loan management app with intuitive, streamlined navigation. Led UI/UX and frontend development, translating loan management requirements into a clear mobile interface.",
    stack: ["Android Studio", "Java"],
    link: "#",
  },
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const header = document.getElementById("siteHeader");
const navLinks = document.querySelectorAll("[data-nav]");
const sections = document.querySelectorAll("main .section");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
});

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);
sections.forEach((section) => spyObserver.observe(section));

const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("mainNav");

function closeMobileNav() {
  hamburger.classList.remove("open");
  mainNav.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
}

hamburger.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeMobileNav));

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.setAttribute("data-theme", "dark");
}

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("portfolio-theme", next);
});

const typingPhrases = [
  "a web developer.",
  "a UI tinkerer.",
  "a designer.",
  "a cozy-interface builder.",
];
const typingEl = document.getElementById("typingText");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function runTypingLoop() {
  const currentPhrase = typingPhrases[phraseIndex];

  if (isDeleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  typingEl.textContent = currentPhrase.slice(0, charIndex);

  let delay = isDeleting ? 45 : 85;

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 1400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    delay = 400;
  }

  setTimeout(runTypingLoop, delay);
}
runTypingLoop();

const idCardWrapper = document.getElementById("idCardWrapper");
const idCardInner = document.getElementById("idCardInner");

let isDraggingCard = false;
let cardStartX = 0;
let cardDragMoved = false;

function pointerX(event) {
  return event.touches ? event.touches[0].clientX : event.clientX;
}

function startCardDrag(event) {
  isDraggingCard = true;
  cardDragMoved = false;
  cardStartX = pointerX(event);
  idCardWrapper.classList.add("dragging");
  idCardWrapper.classList.remove("snap-back");
}

function moveCardDrag(event) {
  if (!isDraggingCard) return;
  const delta = pointerX(event) - cardStartX;
  if (Math.abs(delta) > 6) cardDragMoved = true;
  const angle = Math.max(-32, Math.min(32, delta / 4));
  idCardWrapper.style.transform = `rotate(${angle}deg)`;
}

function endCardDrag() {
  if (!isDraggingCard) return;
  isDraggingCard = false;
  idCardWrapper.classList.remove("dragging");
  idCardWrapper.classList.add("snap-back");
  idCardWrapper.style.transform = "rotate(0deg)";

  setTimeout(() => {
    idCardWrapper.classList.remove("snap-back");
    idCardWrapper.style.transform = "";
  }, 650);

  if (!cardDragMoved) {
    idCardInner.classList.toggle("flipped");
  }
}

idCardWrapper.addEventListener("mousedown", startCardDrag);
window.addEventListener("mousemove", moveCardDrag);
window.addEventListener("mouseup", endCardDrag);

idCardWrapper.addEventListener("touchstart", startCardDrag, { passive: true });
window.addEventListener("touchmove", moveCardDrag, { passive: true });
window.addEventListener("touchend", endCardDrag);

function attachTiltEffect(elements, { maxTilt = 8, lift = 8 } = {}) {
  if (prefersReducedMotion) return;

  elements.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * 2 * maxTilt;
      const rotateX = (0.5 - py) * 2 * maxTilt;

      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${lift}px)`;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

attachTiltEffect(document.querySelectorAll(".skill-card"), { maxTilt: 9, lift: 6 });
attachTiltEffect(document.querySelectorAll(".about-photo-frame"), { maxTilt: 10, lift: 4 });

const projectsGrid = document.getElementById("projectsGrid");
const modalOverlay = document.getElementById("modalOverlay");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStack = document.getElementById("modalStack");
const modalLink = document.getElementById("modalLink");
const modalClose = document.getElementById("modalClose");

function buildProjectCards() {
  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View details for ${project.title}`);
    card.setAttribute("data-reveal", "");
    card.style.setProperty("--i", index % 3);

    card.innerHTML = `
      <div class="project-thumb" style="background:${project.color}">${project.initials}</div>
      <div class="project-body">
        <span class="project-tag">${project.tag}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <span class="project-more">View details &rarr;</span>
      </div>
    `;

    card.addEventListener("click", () => openProjectModal(index));
    card.addEventListener("keyup", (e) => {
      if (e.key === "Enter" || e.key === " ") openProjectModal(index);
    });

    projectsGrid.appendChild(card);
  });
}

function openProjectModal(index) {
  const project = projects[index];
  modalTag.textContent = project.tag;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalLink.href = project.link;

  modalStack.innerHTML = project.stack.map((item) => `<li>${item}</li>`).join("");

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeProjectModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeProjectModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProjectModal();
});

buildProjectCards();
attachTiltEffect(document.querySelectorAll(".project-card"), { maxTilt: 6, lift: 6 });

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const fields = {
  name: {
    input: document.getElementById("name"),
    error: document.getElementById("nameError"),
    validate: (value) => value.trim().length >= 2,
    message: "Please enter your full name (at least 2 characters).",
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("emailError"),
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: "Please enter a valid email address.",
  },
  message: {
    input: document.getElementById("message"),
    error: document.getElementById("messageError"),
    validate: (value) => value.trim().length >= 10,
    message: "Your message should be at least 10 characters long.",
  },
};

function validateField(key) {
  const field = fields[key];
  const value = field.input.value;
  const isValid = field.validate(value);

  field.input.closest(".form-field").classList.toggle("invalid", !isValid);
  field.error.textContent = isValid ? "" : field.message;
  return isValid;
}

Object.keys(fields).forEach((key) => {
  fields[key].input.addEventListener("blur", () => validateField(key));
  fields[key].input.addEventListener("input", () => {
    if (fields[key].input.closest(".form-field").classList.contains("invalid")) {
      validateField(key);
    }
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const results = Object.keys(fields).map((key) => validateField(key));
  const allValid = results.every(Boolean);

  if (!allValid) {
    formStatus.textContent = "Please fix the highlighted fields before sending.";
    formStatus.className = "form-status error";
    return;
  }

  formStatus.textContent = `Thanks, ${fields.name.input.value.trim()}! Your message is on its way.`;
  formStatus.className = "form-status success";
  contactForm.reset();
  Object.keys(fields).forEach((key) =>
    fields[key].input.closest(".form-field").classList.remove("invalid")
  );
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const cursorDot = document.getElementById("cursorDot");

window.addEventListener("mousemove", (e) => {
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
});

document.querySelectorAll("a, button, .project-card, .skill-card, input, textarea").forEach((el) => {
  el.addEventListener("mouseenter", () => cursorDot.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => cursorDot.classList.remove("cursor-hover"));
});

const parallaxItems = document.querySelectorAll(".parallax-item");

function updateParallax() {
  const scrollY = window.scrollY;
  parallaxItems.forEach((item) => {
    const speed = parseFloat(item.dataset.speed) || 0.2;
    const depth = parseFloat(item.dataset.depth) || 0;
    item.style.transform = `translateY(${scrollY * speed * -0.3}px) translateZ(${depth}px)`;
  });
}

const growthVineFill = document.getElementById("growthVineFill");
const growthVineBloom = document.getElementById("growthVineBloom");

function updateGrowthVine() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  growthVineFill.style.height = `${Math.min(100, Math.max(0, percent))}%`;
  growthVineBloom.classList.toggle("bloomed", percent > 92);
}

let scrollTicking = false;
function onScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    updateParallax();
    updateGrowthVine();
    scrollTicking = false;
  });
}
window.addEventListener("scroll", onScroll);
onScroll();

const petalsField = document.getElementById("petalsField");
const petalTones = ["", "tone-marigold", "tone-blush", "tone-sage-dark"];

function spawnPetal() {
  const petal = document.createElement("span");
  const size = 8 + Math.random() * 10;
  const tone = petalTones[Math.floor(Math.random() * petalTones.length)];

  petal.className = `petal ${tone}`;
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;
  petal.style.animationDuration = `${8 + Math.random() * 6}s, ${2 + Math.random() * 2}s`;

  petalsField.appendChild(petal);
  petal.addEventListener("animationend", (e) => {
    if (e.animationName === "petal-fall") petal.remove();
  });
}

if (!prefersReducedMotion) {
  setInterval(spawnPetal, 2200);
}

const revealTargets = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);
revealTargets.forEach((el) => revealObserver.observe(el));

const bloomObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.3 }
);
sections.forEach((section) => bloomObserver.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();