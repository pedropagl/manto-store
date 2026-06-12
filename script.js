const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const revealElements = document.querySelectorAll(".reveal");
const noResults = document.getElementById("noResults");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    let visibleCount = 0;

    productCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = filter === "todos" || filter === category;
      card.classList.toggle("hidden", !shouldShow);
      if (shouldShow) visibleCount++;
    });

    noResults.classList.toggle("visible", visibleCount === 0);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => observer.observe(element));

// Scroll spy: highlight current section link
const navSections = document.querySelectorAll("main .section[id]");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-50% 0px -50% 0px" }
);

navSections.forEach((section) => spyObserver.observe(section));

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
