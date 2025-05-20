// Electric cursor effect
document.addEventListener("DOMContentLoaded", function () {
  const electricCursor = document.createElement("div");
  electricCursor.classList.add("electric-cursor");
  document.body.appendChild(electricCursor);

  // Create sparks
  for (let i = 0; i < 5; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    electricCursor.appendChild(spark);
  }

  document.addEventListener("mousemove", (e) => {
    electricCursor.style.left = e.clientX + "px";
    electricCursor.style.top = e.clientY + "px";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const body = document.querySelector("body");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    mainNav.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mainNav.classList.remove("active");
      body.classList.remove("menu-open");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".main-nav") &&
      !e.target.closest(".menu-toggle") &&
      mainNav.classList.contains("active")
    ) {
      menuToggle.classList.remove("active");
      mainNav.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // Active Link Highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-item");

  function highlightNavLink() {
    const scrollPosition = window.scrollY + 100; // Offset to trigger slightly earlier

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active class from all links
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to the corresponding link
        document
          .querySelector(`.nav-item[href="#${sectionId}"]`)
          ?.classList.add("active");
      }
    });

    // If at the top of the page, highlight the Home link
    if (scrollPosition < 200) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      document.querySelector('.nav-item[href="#"]').classList.add("active");
    }
  }

  window.addEventListener("scroll", highlightNavLink);
  window.addEventListener("load", highlightNavLink);

  // Scroll Animation
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  // Initially show elements that are already in viewport on page load
  checkAnimationScroll();

  // Add animation on scroll
  window.addEventListener("scroll", checkAnimationScroll);

  function checkAnimationScroll() {
    const triggerBottom = window.innerHeight * 0.8;

    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.classList.add("show");
      }
    });
  }

  // Header Scroll Effect
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (testimonialSlides.length > 0) {
    let currentSlide = 0;

    // Hide all slides initially except the first one
    testimonialSlides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.display = "none";
      }
    });

    // Previous slide button
    prevBtn.addEventListener("click", () => {
      testimonialSlides[currentSlide].style.display = "none";
      currentSlide =
        (currentSlide - 1 + testimonialSlides.length) %
        testimonialSlides.length;
      testimonialSlides[currentSlide].style.display = "block";
    });

    // Next slide button
    nextBtn.addEventListener("click", () => {
      testimonialSlides[currentSlide].style.display = "none";
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      testimonialSlides[currentSlide].style.display = "block";
    });

    // Auto slider (every 5 seconds)
    setInterval(() => {
      testimonialSlides[currentSlide].style.display = "none";
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      testimonialSlides[currentSlide].style.display = "block";
    }, 5000);
  }

  // Parallax Effect for Hero Section
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const parallaxBg = document.querySelector(".parallax-bg");

    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
  });

  // Form Validation
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      // Simple validation
      let isValid = true;

      if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required");
        isValid = false;
      } else {
        removeError(nameInput);
      }

      if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required");
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email");
        isValid = false;
      } else {
        removeError(emailInput);
      }

      if (messageInput.value.trim() === "") {
        showError(messageInput, "Message is required");
        isValid = false;
      } else {
        removeError(messageInput);
      }

      if (isValid) {
        // Form is valid - in a real scenario, you would submit the form or use AJAX here
        alert("Form submitted successfully!");
        contactForm.reset();
      }
    });
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector(".error-message");

    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "error-message";
      errorElement.style.color = "red";
      errorElement.style.fontSize = "0.85rem";
      errorElement.style.marginTop = "5px";
      formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    input.style.borderColor = "red";
  }

  function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector(".error-message");

    if (errorElement) {
      formGroup.removeChild(errorElement);
    }

    input.style.borderColor = "";
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Service Card Hover Effect
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    });
  });

  // Gallery Image Lightbox (simplified version)
  const galleryItems = document.querySelectorAll(".gallery-item img");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Create lightbox elements
      const lightbox = document.createElement("div");
      lightbox.className = "lightbox";
      lightbox.style.position = "fixed";
      lightbox.style.top = "0";
      lightbox.style.left = "0";
      lightbox.style.width = "100%";
      lightbox.style.height = "100%";
      lightbox.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      lightbox.style.display = "flex";
      lightbox.style.alignItems = "center";
      lightbox.style.justifyContent = "center";
      lightbox.style.zIndex = "9999";

      const lightboxImg = document.createElement("img");
      lightboxImg.src = item.src;
      lightboxImg.style.maxWidth = "90%";
      lightboxImg.style.maxHeight = "90%";
      lightboxImg.style.border = "3px solid white";
      lightboxImg.style.borderRadius = "5px";

      const closeBtn = document.createElement("span");
      closeBtn.innerHTML = "&times;";
      closeBtn.style.position = "absolute";
      closeBtn.style.top = "20px";
      closeBtn.style.right = "30px";
      closeBtn.style.color = "white";
      closeBtn.style.fontSize = "40px";
      closeBtn.style.fontWeight = "bold";
      closeBtn.style.cursor = "pointer";

      // Add elements to lightbox
      lightbox.appendChild(lightboxImg);
      lightbox.appendChild(closeBtn);
      document.body.appendChild(lightbox);

      // Close lightbox on click or on close button
      const closeLightbox = () => {
        if (document.body.contains(lightbox)) {
          document.body.removeChild(lightbox);
        }
      };

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          // Only close if clicking on the background
          closeLightbox();
        }
      });
      closeBtn.addEventListener("click", closeLightbox);
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isActive = question.classList.contains("active");

      // Close all other active FAQs
      faqItems.forEach((otherItem) => {
        const otherQuestion = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (
          otherQuestion !== question &&
          otherQuestion.classList.contains("active")
        ) {
          otherQuestion.classList.remove("active");
          otherAnswer.style.maxHeight = null;
          otherAnswer.style.paddingTop = null;
          otherAnswer.style.paddingBottom = null;
        }
      });

      // Toggle current FAQ
      if (isActive) {
        question.classList.remove("active");
        answer.style.maxHeight = null;
        answer.style.paddingTop = null;
        answer.style.paddingBottom = null;
      } else {
        question.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.paddingTop = "1.5rem";
        answer.style.paddingBottom = "1.5rem";
      }
    });
  });
});
