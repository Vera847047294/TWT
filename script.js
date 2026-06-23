document.addEventListener('DOMContentLoaded', function () {
  // Navigation scroll behavior
  const nav = document.querySelector('.nav');
  const scrollThreshold = 50;

  function handleNavScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navDrawer = document.querySelector('.nav-drawer');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navDrawer.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navDrawer.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navDrawer.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when clicking a link
  const drawerLinks = document.querySelectorAll('.nav-drawer a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  const backToTopThreshold = 300;

  function handleBackToTopVisibility() {
    if (window.scrollY > backToTopThreshold) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  window.addEventListener('scroll', handleBackToTopVisibility);

  if (backToTop) {
    backToTop.addEventListener('click', scrollToTop);
  }

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.product-card .btn');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const productName = this.closest('.product-card').querySelector('.product-name').textContent;
      alert('"' + productName + '" added to cart!');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Intersection Observer for fade-up animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe sections with fade-up class
  document.querySelectorAll('.fade-up').forEach(section => {
    observer.observe(section);
  });

  // Mouse-tracking glow effect for Hero buttons (desktop only)
  function initMouseTrackingGlow() {
    if (window.innerWidth < 768) return;

    const heroButtons = document.querySelectorAll('.hero-buttons .btn');

    heroButtons.forEach(button => {
      // Create glow element
      const glow = document.createElement('span');
      glow.className = 'glow';
      button.appendChild(glow);

      button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
        glow.style.width = '300px';
        glow.style.height = '300px';
      });

      button.addEventListener('mouseleave', function() {
        glow.style.width = '0';
        glow.style.height = '0';
      });
    });
  }

  // Initialize mouse tracking on load and on resize
  initMouseTrackingGlow();
  window.addEventListener('resize', initMouseTrackingGlow);

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('.newsletter-input');
      if (emailInput.value) {
        alert('Thank you for subscribing!');
        emailInput.value = '';
      }
    });
  }

  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      this.classList.toggle('active');
      const answer = this.nextElementSibling;
      answer.classList.toggle('active');
    });
  });

  // Filter buttons for shop page
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');

      const category = this.getAttribute('data-category');

      // Show/hide products based on category
      productCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Custom form submission
  const customForm = document.querySelector('.custom-inquiry-form');
  if (customForm) {
    customForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your inquiry! We will get back to you within 2 business days.');
      this.reset();
    });
  }

  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for contacting us! We will respond within 24 hours.');
      this.reset();
    });
  }
});
