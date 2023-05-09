const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function highlightNav() {
  const scrollPos = window.scrollY;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 50;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      const sectionId = section.getAttribute('id');
      navLinks.forEach((link) => {
        if (link.getAttribute('href').slice(1) === sectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', debounce(highlightNav));
