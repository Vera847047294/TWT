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
      alert('Added to cart!');
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

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Hero section should be visible immediately
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
  }
});
