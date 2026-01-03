// Handle mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

// Close mobile menu when clicking a nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

// Highlight active nav link on scroll (basic)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentId = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
    }
  });
});

// Form validation
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;
  formStatus.textContent = "";
  clearErrors();

  const nameInput = contactForm.name;
  const emailInput = contactForm.email;
  const messageInput = contactForm.message;

  // Name validation
  if (!nameInput.value.trim()) {
    showError(nameInput, "Please enter your name.");
    isValid = false;
  }

  // Email validation (basic pattern)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    showError(emailInput, "Please enter your email.");
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email address.");
    isValid = false;
  }

  // Message validation
  if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Message should be at least 10 characters.");
    isValid = false;
  }

  if (isValid) {
    // Simulate successful submit
    contactForm.reset();
    formStatus.style.color = "#1b5e20";
    formStatus.textContent = "Thank you! Your message has been sent.";
  } else {
    formStatus.style.color = "#c62828";
    formStatus.textContent = "Please fix the errors above and try again.";
  }
});

function showError(inputEl, message) {
  const fieldGroup = inputEl.closest(".field-group");
  const errorEl = fieldGroup.querySelector(".error-message");
  errorEl.textContent = message;
  inputEl.style.borderColor = "#c62828";
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });
  document
    .querySelectorAll(".field-group input, .field-group textarea")
    .forEach((input) => {
      input.style.borderColor = "#ccc";
    });
}
