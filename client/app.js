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

document.addEventListener("DOMContentLoaded", async () => {
  const modal = document.getElementById("myModal");
  const loginSection = document.getElementById("loginSection");
  const planSection = document.getElementById("planSection");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");

  const checkAuthAndDisplay = async () => {
    const isLoggedIn = await simulateAuthCheck();

    modal.style.display = "block";

    if (isLoggedIn) {
      loginSection.style.display = "none";
      planSection.style.display = "block";
    } else {
      loginSection.style.display = "block";
      planSection.style.display = "none";
    }
  };

  async function simulateAuthCheck() {
    return new Promise((resolve) => {
      const user = localStorage.getItem("isLoggedIn");
      setTimeout(() => resolve(user === "true"), 500);
    });
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem("isLoggedIn", "true");
    checkAuthAndDisplay(); 
  });

  document.querySelector(".close").onclick = () =>
    (modal.style.display = "none");

  checkAuthAndDisplay();
});

document.getElementById("planForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const fiveK = parseFloat(document.getElementById("5k").value);
  const tenK = parseFloat(document.getElementById("10k").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const W = parseInt(
    document.querySelector('input[name="weeks"]:checked')?.value
  );
  function Choice(sport) {
    localStorage.setItem('izabraniSport', sport);
  }

  let B, P, I;

  B = weight / (height * height);
  P = (fiveK / 5 + tenK / 10) / 2;
  I = P * Math.sqrt(B / 22);

  function Choice(sport) {
    if (I <= 5.5) {
      if (W == 12) fetch();
      else if (W == 16) fetch();
      else if (W == 20) fetch();
    } else if (I > 5.5) {
      if (W == 12) fetch();
      else if (W == 16) fetch();
      else if (W == 20) fetch();
    }
  }
});


