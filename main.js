// Shared behavior across all Visybil pages.
// Every block below checks the element exists first, since not every
// page has every feature (e.g. only work.html has the "show more" button).

// mobile menu
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (burger && mobileMenu && mobileClose) {
  burger.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// cursor glow (desktop only)
const glow = document.getElementById('glow');
if (glow) {
  if (window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  } else {
    glow.style.display = 'none';
  }
}

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}
