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

  // Initialize electric effects
  createElectricSparks();
  addElectricClickEffect();
  addElectricTextEffect();
  applyElectricPatterns();
});

// Create random electric sparks across the page - More subtle version
function createElectricSparks() {
  // Container for all sparks
  const sparkContainer = document.createElement("div");
  sparkContainer.className = "spark-container";
  document.body.appendChild(sparkContainer);

  // Create the sparks - less frequently (reduced from 30% to 15% chance)
  setInterval(() => {
    if (Math.random() > 0.85) {
      // 15% chance of creating a spark
      createSpark(sparkContainer);
    }
  }, 600); // Slower interval (was 300ms)
}

// Create a single spark - Improved aesthetics
function createSpark(container) {
  const spark = document.createElement("div");
  spark.className = "electric-spark";

  // Random position - keep closer to key sections
  const keySection = document.querySelector(
    "#services, #why-choose-us, #contact"
  );
  let x, y;

  if (keySection && Math.random() > 0.5) {
    // Position near a key section 50% of the time
    const rect = keySection.getBoundingClientRect();
    x = rect.left + Math.random() * rect.width;
    y = rect.top + Math.random() * rect.height;

    // Adjust for scroll
    y += window.scrollY;
  } else {
    // Random position across the page
    x = Math.random() * window.innerWidth;
    y = Math.random() * (document.body.scrollHeight * 0.8); // Keep in top 80% of page
  }

  // Set spark properties - more subtle
  spark.style.left = `${x}px`;
  spark.style.top = `${y}px`;
  spark.style.height = `${5 + Math.random() * 7}px`; // Varied height
  spark.style.width = `${1}px`; // Thinner
  spark.style.opacity = (0.2 + Math.random() * 0.4).toString(); // Less bright

  // Add to container
  container.appendChild(spark);

  // Animate and remove - smoother animation
  setTimeout(() => {
    spark.style.transform = `translateY(${10 + Math.random() * 20}px)`;
    spark.style.opacity = "0";

    setTimeout(() => {
      if (container.contains(spark)) {
        container.removeChild(spark);
      }
    }, 800);
  }, 50);
}

// Add electric "click" effect
function addElectricClickEffect() {
  document.addEventListener("click", function (e) {
    // Create the circle element
    const circle = document.createElement("div");
    circle.className = "click-effect";
    circle.style.position = "fixed";
    circle.style.left = e.clientX + "px";
    circle.style.top = e.clientY + "px";
    circle.style.width = "5px";
    circle.style.height = "5px";
    circle.style.borderRadius = "50%";
    circle.style.background =
      "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(92,198,255,0.7) 40%, transparent 70%)";
    circle.style.boxShadow =
      "0 0 10px rgba(92,198,255,0.8), 0 0 20px rgba(0,140,255,0.5)";
    circle.style.pointerEvents = "none";
    circle.style.zIndex = "9999";
    circle.style.transform = "translate(-50%, -50%) scale(0)";
    circle.style.transition = "transform 0.5s, opacity 0.5s";

    document.body.appendChild(circle);

    // Animate the circle
    setTimeout(() => {
      circle.style.transform = "translate(-50%, -50%) scale(8)";
      circle.style.opacity = "0";

      setTimeout(() => {
        document.body.removeChild(circle);
      }, 500);
    }, 10);
  });
}

// Electric flicker effect for hero text - Less intense
function addElectricTextEffect() {
  const heroTexts = document.querySelectorAll(
    ".hero-content h1, .hero-content h2"
  );

  heroTexts.forEach((text) => {
    setInterval(() => {
      if (Math.random() > 0.98) {
        // 2% chance of flicker (was 3%)
        text.style.opacity = "0.85"; // Less dramatic (was 0.7)
        setTimeout(() => {
          text.style.opacity = "1";
        }, 80); // Shorter duration
      }
    }, 1000); // Less frequent (was 500ms)
  });
}

// Apply electric pattern backgrounds to key sections - Enhanced
function applyElectricPatterns() {
  // Apply circuit pattern to services section
  const servicesSection = document.querySelector("#services");
  if (servicesSection) {
    const patternDiv = document.createElement("div");
    patternDiv.className = "pattern-overlay";
    patternDiv.style.position = "absolute";
    patternDiv.style.top = "0";
    patternDiv.style.left = "0";
    patternDiv.style.width = "100%";
    patternDiv.style.height = "100%";
    patternDiv.style.opacity = "0.05"; // Reduced opacity (was 0.07)
    patternDiv.style.pointerEvents = "none";
    patternDiv.style.background = "url(#circuit-pattern)";
    patternDiv.style.zIndex = "0";

    // Make the section position relative
    servicesSection.style.position = "relative";
    servicesSection.insertBefore(patternDiv, servicesSection.firstChild);
  }

  // Apply electric grid to safety commitment section
  const safetySection = document.querySelector("#safety-commitment");
  if (safetySection) {
    const gridDiv = document.createElement("div");
    gridDiv.className = "pattern-overlay";
    gridDiv.style.position = "absolute";
    gridDiv.style.top = "0";
    gridDiv.style.left = "0";
    gridDiv.style.width = "100%";
    gridDiv.style.height = "100%";
    gridDiv.style.opacity = "0.06"; // Reduced opacity (was 0.1)
    gridDiv.style.pointerEvents = "none";
    gridDiv.style.background = "url(#electric-grid)";
    gridDiv.style.zIndex = "0";

    safetySection.style.position = "relative";
    safetySection.insertBefore(gridDiv, safetySection.firstChild);
  }

  // Add flowing electric currents
  addFlowingCurrents();

  // Create random lightning bolts - less frequently
  setInterval(createRandomLightning, 15000); // Increased from 8000ms
}

// Add flowing electric current lines
function addFlowingCurrents() {
  // Add to why-choose-us section
  const whyChooseUs = document.querySelector("#why-choose-us");

  if (whyChooseUs) {
    whyChooseUs.style.position = "relative";
    whyChooseUs.style.overflow = "hidden";

    // Create 3 currents
    for (let i = 0; i < 3; i++) {
      createCurrent(whyChooseUs);
    }
  }
}

// Create an animated electric current line
function createCurrent(container) {
  const current = document.createElement("div");
  current.className = "electric-current";

  // Random position and size
  const y = 20 + Math.random() * (container.offsetHeight - 40);
  const width = container.offsetWidth * 1.5;

  current.style.position = "absolute";
  current.style.top = `${y}px`;
  current.style.left = "-50%";
  current.style.width = `${width}px`;
  current.style.opacity = "0";

  container.appendChild(current);

  // Animate
  setTimeout(() => {
    current.style.transition = "all 5s cubic-bezier(0.2, 0.8, 0.2, 1)";
    current.style.opacity = "0.15"; // Reduced from 0.5
    current.style.left = "100%";

    // Remove after animation and create a new one
    setTimeout(() => {
      if (container.contains(current)) {
        container.removeChild(current);
        createCurrent(container);
      }
    }, 5000);
  }, 100);
}

// Create a random animated lightning bolt - More refined
function createRandomLightning() {
  if (Math.random() > 0.7) {
    // 30% chance (was 50%)
    // Create the lightning element
    const lightning = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    lightning.setAttribute("width", "40"); // Smaller (was 50)
    lightning.setAttribute("height", "40"); // Smaller
    lightning.setAttribute("viewBox", "0 0 32 32");
    lightning.style.position = "fixed";
    lightning.style.zIndex = "9998";
    lightning.style.pointerEvents = "none";
    lightning.style.opacity = "0.5"; // Reduced from 0.7
    lightning.style.filter = "url(#electric-glow)";

    // Position randomly but mostly in visible areas
    const x = Math.random() * window.innerWidth;
    lightning.style.left = `${x}px`;
    lightning.style.top = "0px";

    // Create the use element to reference the lightning bolt symbol
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      "#lightning-bolt"
    );
    lightning.appendChild(use);

    // Add to body
    document.body.appendChild(lightning);

    // Animate down - faster animation
    const animationDuration = 400 + Math.random() * 800; // 0.4 to 1.2 seconds (was 0.5 to 1.5)
    lightning.animate(
      [
        { transform: "translateY(0) scale(1)", opacity: 0.5 }, // Reduced opacity
        {
          transform: `translateY(${window.innerHeight}px) scale(0.3)`,
          opacity: 0,
        },
      ],
      {
        duration: animationDuration,
        easing: "cubic-bezier(0.7, 0, 0.9, 0)", // Faster easing
      }
    );

    // Remove after animation
    setTimeout(() => {
      if (document.body.contains(lightning)) {
        document.body.removeChild(lightning);
      }
    }, animationDuration);
  }
}
