import './style.css';

// ===== COUNTDOWN TIMER =====
const BIRTHDAY = new Date('2026-02-26T00:00:00+05:30');

function updateCountdown() {
    const now = new Date();
    const diff = BIRTHDAY - now;

    if (diff <= 0) {
        // Birthday has arrived! Hide countdown, show message
        document.getElementById('countdown').style.display = 'none';
        const msg = document.getElementById('birthdayMessage');
        if (msg) {
            msg.classList.add('active');
        }
        // Unlock the NEW DRIVER nav link and DRS zone
        const navLink = document.getElementById('navNewDriver');
        const drsZone = document.getElementById('drsZone');
        if (navLink) navLink.classList.remove('locked');
        if (drsZone) drsZone.classList.remove('locked');
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.transitionDuration = '0.6s';
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
});


// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const nav = document.querySelector('.f1-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        nav.style.background = 'rgba(21, 21, 30, 0.97)';
    } else {
        nav.style.background = 'rgba(21, 21, 30, 0.92)';
    }

    lastScroll = currentScroll;
}, { passive: true });
