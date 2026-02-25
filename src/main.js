import './style.css';

// ===== LANDING OVERLAY =====
(function () {
    const overlay = document.getElementById('landingOverlay');
    if (!overlay) return;

    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const msgEl = document.getElementById('landingMessage');

    const messages = [
        "Nice try! 😂",
        "Nope!",
        "Not happening!",
        "Just press Yes already!",
        "You can't escape it! 🤣",
        "Still trying?",
        "Give up!",
        "YES is the only option!",
        "Seriously? 😂",
        "Accept your fate!",
    ];

    let attempts = 0;

    function moveNoButton() {
        attempts++;

        // Make it fixed position so it can fly around the viewport
        if (!btnNo.classList.contains('runaway')) {
            btnNo.classList.add('runaway');
        }

        const pad = 20;
        const btnW = btnNo.offsetWidth;
        const btnH = btnNo.offsetHeight;
        const maxX = window.innerWidth - btnW - pad;
        const maxY = window.innerHeight - btnH - pad;

        // Random position (avoid being too close to current spot)
        let newX, newY;
        const curX = parseFloat(btnNo.style.left) || 0;
        const curY = parseFloat(btnNo.style.top) || 0;
        do {
            newX = pad + Math.random() * (maxX - pad);
            newY = pad + Math.random() * (maxY - pad);
        } while (
            Math.abs(newX - curX) < 120 && Math.abs(newY - curY) < 120
        );

        btnNo.style.left = newX + 'px';
        btnNo.style.top = newY + 'px';

        // Shrink after several attempts
        if (attempts > 4) {
            const scale = Math.max(0.4, 1 - (attempts - 4) * 0.1);
            btnNo.style.transform = `scale(${scale})`;
        }

        // Show funny message
        msgEl.textContent = messages[(attempts - 1) % messages.length];
    }

    // Desktop: mouseenter
    btnNo.addEventListener('mouseenter', moveNoButton);

    // Mobile: touchstart (fires before click, so we prevent default)
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    }, { passive: false });

    // YES → reveal the real site
    btnYes.addEventListener('click', () => {
        // Fade out the overlay
        overlay.classList.add('fade-out');

        // Swap to real title + favicon
        document.title = 'Aryan Arora Birthday GP 2026 | The Ultimate F1 Celebration';
        const favicon = document.getElementById('favicon');
        if (favicon) {
            favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏎️</text></svg>";
        }

        // Remove overlay after animation
        setTimeout(() => {
            overlay.remove();
        }, 800);
    });
})();


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
