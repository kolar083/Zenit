document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.15,
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === "index-home") {
          const homeDiv = entry.target.querySelector("div");
          if (homeDiv) homeDiv.classList.add("show");
        }

        const sportItems = entry.target.querySelectorAll(".sport-item");
        sportItems.forEach((item) => item.classList.add("show"));

        const generalCards = entry.target.querySelectorAll(".general-card");
        generalCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("show");
          }, index * 150);
        });

        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => scrollObserver.observe(section));

  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const header = document.querySelector("#index-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(44, 51, 51, 0.95)";
      header.style.padding = "10px 5%";
    } else {
      header.style.backgroundColor = "#2C3333";
      header.style.padding = "15px 5%";
    }
  });
});
