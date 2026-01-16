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
  const loginForm = document.getElementById("login-form");

  const checkAuthAndDisplay = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    modal.style.display = "block";

    if (isLoggedIn === "true") {
      loginSection.style.display = "none";
      planSection.style.display = "block";
    } else {
      loginSection.style.display = "block";
      planSection.style.display = "none";
    }
  };

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usernameValue = document.getElementById("Username").value;
    const passwordValue = document.getElementById("Password").value;

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: usernameValue,
          Password: passwordValue,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem('user_id', data.ID_user);
        console.log("Saved to storage:", localStorage.getItem('user_id'));
        loginSection.style.display = "none";
        planSection.style.display = "block";

        console.log("Uspešan login:", data.message);
      } else {
        alert(data.message || "Neispravni podaci za prijavu.");
      }
    } catch (error) {
      console.error("Greška pri komunikaciji sa serverom:", error);
      alert("Serverska greška. Proverite da li je backend pokrenut.");
    }
  });

  document.querySelector(".close").onclick = () => {
    modal.style.display = "none";
  };

  checkAuthAndDisplay();
});

document.getElementById("planForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const fiveK = parseFloat(document.getElementById("5k").value);
  const tenK = parseFloat(document.getElementById("10k").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const W = parseInt(
    document.querySelector('input[name="weeks"]:checked')?.value
  );
  function Choice(sport) {
    localStorage.setItem("izabraniSport", sport);
  }
  let sport = localStorage.getItem("izabraniSport");
  let B, P, I;

  B = weight / (height * height);
  P = (fiveK / 5 + tenK / 10) / 2;
  I = P * Math.sqrt(B / 22);




  async function SaveUserData(ID_user, Nb_Weeks, ID_Plan, ID_Race) {
    try {
      const response = await fetch("http://localhost:3000/user/statistics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID_User: ID_user,
          Nb_Weeks: Nb_Weeks,
          Date_Of_Start: new Date().toLocaleDateString(),
          ID_Plan: ID_Plan,
          ID_Race: ID_Race
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Saved to storage:", localStorage.getItem('user_id'));

        console.log("Uspešan login:", data.message);
      } else {
        alert(data.message || "Neispravni podaci za prijavu.");
      }
    } catch (error) {
      console.error("Greška pri komunikaciji sa serverom:", error);
      alert("Serverska greška. Proverite da li je backend pokrenut.");
    }
  };
  const ID = localStorage.getItem('user_id');

  switch (sport) {
    case "Marathon":
      if (I <= 5.5) {
        if (W == 12) {
          document.getElementById("pdf").src = "./assets/pdfs/Marathon/Marathon_12_hard.pdf#toolbar=0&navpanes=0"
          SaveUserData(ID,W,14,6);
        };
        if (W == 16) {
          document.getElementById("pdf").src = "./assets/pdfs/Marathon/Marathon_16_hard.pdf#toolbar=0&navpanes=0"
          SaveUserData(ID,W,16,6);
        };
        if (W == 20) {
          document.getElementById("pdf").src = "./assets/pdfs/Marathon/Marathon_20_hard.pdf#toolbar=0&navpanes=0"
          SaveUserData(ID,W,18,6);
        };
      } else if (I > 5.5) {
        if (W == 12) {
          document.getElementById("pdf").src = "./assets/pdfs/Marathon/Marathon_12_easy.pdf#toolbar=0&navpanes=0"
          SaveUserData(ID,W,13,6);
        };
        if (W == 16) {
          document.getElementById("pdf").src = "./assets/pdfs/Marathon/Marathon_16_easy.pdf#toolbar=0&navpanes=0"
          SaveUserData(ID,W,15,6);
        };
        if (W == 20) {
          document.getElementById("pdf").src = "./assets/pdfs/Marathon/Marathon_20_easy.pdf#toolbar=0&navpanes=0"
          SaveUserData(ID,W,17,6);
        };
      }
      break;
    case "HalfMarathon":
      if (I <= 5.5) {
        if (W == 12) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/HalfMarathon/HalfMarathon_12_hard.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,8,5);
        };
        if (W == 16) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/HalfMarathon/HalfMarathon_16_hard.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,10,5);
        };
        if (W == 20) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/HalfMarathon/HalfMarathon_20_hard.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,12,5);
        };
      } else if (I > 5.5) {
        if (W == 12) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/HalfMarathon/HalfMarathon_12_easy.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,7,5);
        };
        if (W == 16) {
          localStorage.setItem('plan_pdf_src',"./assets/pdfs/HalfMarathon/HalfMarathon_16_easy.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,9,5);
        };
        if (W == 20) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/HalfMarathon/HalfMarathon_20_easy.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,11,5);
        };
      }
      break;
    case "TenK":
      if (I <= 5.5) {
        if (W == 12) {
          localStorage.setItem('plan_pdf_src',"./assets/pdfs/10K/10K_12_hard.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,2,7);
        };
        if (W == 16) {
         localStorage.setItem('plan_pdf_src', "./assets/pdfs/10K/10K_16_hard.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,4,7);
        };
        if (W == 20) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/10K/10K_20_hard.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,6,7);
        };
      } else if (I > 5.5) {
        if (W == 12) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/10K/10K_12_easy.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,1,7);
        };
        if (W == 16) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/10K/10K_16_easy.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,3,7);
        };
        if (W == 20) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/10K/10K_20_easy.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,5,7);
        };
      }
      break;
    case "Triathlon":
      if (I <= 5.5) {
        if (W == 12) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/Triathlon/Triathlon_12_hard.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,20,8);
        };
        if (W == 16) {
         localStorage.setItem('plan_pdf_src', "./assets/pdfs/Triathlon/Triathlon_16_hard.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,22,8);
        };
        if (W == 20) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/Triathlon/Triathlon_20_hard.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,24,8);
        };
      } else if (I > 5.5) {
        if (W == 12) {
          dlocalStorage.setItem('plan_pdf_src', "./assets/pdfs/Triathlon/Triathlon_12_easy.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,19,8);
        };
        if (W == 16) {
          localStorage.setItem('plan_pdf_src', "./assets/pdfs/Triathlon/Triathlon_16_easy.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,21,8);
        };
        if (W == 20) {
         localStorage.setItem('plan_pdf_src', "./assets/pdfs/Triathlon/Triathlon_20_easy.pdf#toolbar=0&navpanes=0")
          SaveUserData(ID,W,23,8);
        };
      }
      break;
  }
  document.getElementById("myModal").style.display = "none";
  window.location.href = "Plan.html";
});