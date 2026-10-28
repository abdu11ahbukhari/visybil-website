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

// homepage hero: running viewfinder timecode (HH:MM:SS:FF at 24fps)
const timecode = document.getElementById('vfTimecode');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (timecode && !reduceMotion) {
  const start = performance.now();
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    const t = (performance.now() - start) / 1000;
    timecode.textContent = `${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(Math.floor(t) % 60)}:${pad(Math.floor((t % 1) * 24))}`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// homepage work strip: seamless loop, play only on-screen reels, tap a reel for sound
const reelTrack = document.getElementById('reelTrack');
if (reelTrack) {
  if (!reduceMotion) {
    [...reelTrack.children].forEach(reel => {
      const copy = reel.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.tabIndex = -1;
      reelTrack.appendChild(copy);
    });
  }
  const reels = [...reelTrack.querySelectorAll('.reel')];
  const mute = reel => {
    reel.querySelector('video').muted = true;
    reel.classList.remove('is-loud');
    reel.setAttribute('aria-pressed', 'false');
  };
  const onScreen = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('video');
      if (entry.isIntersecting) { video.play().catch(() => {}); }
      else { video.pause(); mute(entry.target); }
    });
  }, { threshold: 0.05 });
  reels.forEach(reel => {
    onScreen.observe(reel);
    reel.addEventListener('click', () => {
      const video = reel.querySelector('video');
      const turnOn = video.muted;
      reels.forEach(mute);
      if (turnOn) {
        video.muted = false;
        video.play().catch(() => {});
        reel.classList.add('is-loud');
        reel.setAttribute('aria-pressed', 'true');
      }
    });
  });
}
