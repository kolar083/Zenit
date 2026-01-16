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

window.onload = function() {
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == span) {
      modal.style.display = "none";
    }
  }
};

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
        
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        localStorage.setItem("isLoggedIn", "true");
        checkAuthAndDisplay(); // Refresh the view
    });

    
    // logoutBtn.addEventListener("click", () => {
    //     localStorage.removeItem("isLoggedIn");
    //     checkAuthAndDisplay();
    // });

    
    document.querySelector(".close").onclick = () => modal.style.display = "none";
    
    
    checkAuthAndDisplay();
});

document.getElementById("planForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const fiveK = parseFloat(document.getElementById("5k").value);
    const tenK = parseFloat(document.getElementById("10k").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);


    let B,P,I;

  B= weight/(height*height);
  P=((fiveK/5)+(tenK/10))/2;
  I=P*Math.sqrt(B/22)

  if(I<4.5) {
    fetch();
  }
  else if(I>=4.5 && I<6.5) {
    fetch();
  }
  else {
    fetch();
  }
});



const registrationForm = document.getElementById('register-form');

registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('.login-input').forEach(el => el.classList.remove('invalid'));

    const email = document.getElementById('Email');
    const username = document.getElementById('username');
    const pass = document.getElementById('password');
    const repeatPass = document.getElementById('repeat-password');

    let isValid = true;

    
    const showError = (inputEl, errorId, message) => {
        document.getElementById(errorId).textContent = message;
        inputEl.classList.add('invalid');
        isValid = false;
    };

    
    [email, username, pass, repeatPass].forEach(input => {
        if (input.value.length > 32) {
            showError(input, `${input.id}-error`, "Maximum 32 characters allowed.");
        }
    });

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(email.value)) {
        showError(email, 'email-error', "Invalid email (must end in .com)");
    }

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (pass.value !== repeatPass.value) {
        showError(repeatPass, 'repeat-error', "Passwords do not match.");
    } else if (!passwordRegex.test(pass.value)) {
        showError(pass, 'pass-error', "Need 8+ chars, 1 uppercase, 1 lowercase, 1 number.");
    }

    if (!isValid) return;

    
    try {
        const result = await mockBackendCheck(email.value, username.value);
        if (!result.success) {
            if (result.type === 'email') showError(email, 'email-error', result.message);
            if (result.type === 'user') showError(username, 'user-error', result.message);
        } else {
            alert("Registration Successful!");
            registrationForm.submit();
        }
    } catch (err) {
        showError(email, 'email-error', "Server error. Try again later.");
    }
});

async function mockBackendCheck(email, username) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const dbEmails = ['test@test.com'];
            const dbUsers = ['admin'];

            if (dbEmails.includes(email)) {
                resolve({ success: false, type: 'email', message: "Email already registered." });
            } else if (dbUsers.includes(username)) {
                resolve({ success: false, type: 'user', message: "Username already taken." });
            } else {
                resolve({ success: true });
            }
        }, 600);
    });
}