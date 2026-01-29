// GSAP + ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(0,0,0,0.95)';
  } else {
    navbar.style.background = 'rgba(0,0,0,0.8)';
  }
});

// Hero animations
gsap.from('.animate-slide', {
  opacity: 0,
  y: 100,
  duration: 1.2,
  stagger: 0.2,
  ease: 'power3.out'
});

// Scroll animations
gsap.utils.toArray('.animate-slide-up').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 60,
    duration: 1,
    delay: i * 0.1
  });
});

// Skill bars
gsap.utils.toArray('.skill-fill').forEach(bar => {
  gsap.to(bar, {
    scrollTrigger: {
      trigger: bar.parentElement,
      start: 'top 80%'
    },
    width: bar.style.width,
    duration: 2,
    ease: 'power2.out'
  });
});

// Parallax
gsap.utils.toArray('.parallax').forEach(section => {
  gsap.to(section, {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

// Project hover 3D
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.transform = `rotateY(${(x - rect.width / 2) * 0.005}deg) rotateX(${(rect.height / 2 - y) * 0.005}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
});

// Particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.radius / 10})`;
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
