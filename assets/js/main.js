document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const findElements = (selector, all = false) => {
    selector = selector.trim();
    return all ? [...document.querySelectorAll(selector)] : document.querySelector(selector);
  };

  const addEventListenerTo = (eventType, element, listener, all = false) => {
    const targetElement = findElements(element, all);
    if (targetElement) {
      if (all) {
        targetElement.forEach(e => e.addEventListener(eventType, listener));
      } else {
        targetElement.addEventListener(eventType, listener);
      }
    }
  };

  const addScrollListener = (element, listener) => {
    element.addEventListener('scroll', listener);
  };

  const setActiveClassInView = (elements, offset = 200) => {
    const position = window.scrollY + offset;
    elements.forEach(element => {
      if (!element.hash) return;
      const section = findElements(element.hash);
      if (!section) return;
      const inView =
        position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight;
      element.classList.toggle('active', inView);
    });
  };

  const scrollToElement = selector => {
    const header = findElements('#header');
    let offset = header.offsetHeight;

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16;
    }

    const elementPosition = findElements(selector).offsetTop;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  };

  const toggleHeaderScrolledClass = () => {
    const header = findElements('#header');
    header.classList.toggle('header-scrolled', window.scrollY > 100);
  };

  const toggleBackToTopClass = () => {
    const backToTop = findElements('.back-to-top');
    backToTop.classList.toggle('active', window.scrollY > 100);
  };

  // Event Listeners on Load
  window.addEventListener('load', () => {
    setActiveClassInView(findElements('#navbar .scrollto', true));
    toggleHeaderScrolledClass();
    toggleBackToTopClass();
  });

  // Event Listener on Scroll
  addScrollListener(document, () => {
    setActiveClassInView(findElements('#navbar .scrollto', true));
    toggleHeaderScrolledClass();
    toggleBackToTopClass();
  });

  // Event Listener for Mobile Nav Toggle
  addEventListenerTo('click', '.mobile-nav-toggle', function () {
    findElements('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Event Listener for Navbar Dropdown
  addEventListenerTo('click', '.navbar .dropdown > a', function (e) {
    if (findElements('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('dropdown-active');
    }
  }, true);

  // Event Listener for Scrollto
  addEventListenerTo('click', '.scrollto', function (e) {
    if (findElements(this.hash)) {
      e.preventDefault();

      const navbar = findElements('#navbar');
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        const navbarToggle = findElements('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollToElement(this.hash);
    }
  }, true);

  // Handle initial scroll based on URL hash
  window.addEventListener('load', () => {
    if (window.location.hash && findElements(window.location.hash)) {
      scrollToElement(window.location.hash);
    }
  });

  // Initialize Lightbox
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  // Initialize Swipers
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // Remove preloader on window load
  const preloader = findElements('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  const showMoreButton = findElements('.Show-More');
  const moreInfoSection = findElements('.More-informations-about-me');

  const showMore = () => {
    moreInfoSection.classList.toggle('d-none');
    moreInfoSection.classList.toggle('fade-in');
    showMoreButton.textContent = moreInfoSection.classList.contains('d-none') ? 'Show more informations' : 'Hide informations';
  };

  addEventListenerTo('click', '.Show-More', showMore);

  // Initialize PureCounter
  new PureCounter();

  
});

