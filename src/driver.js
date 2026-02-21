import './style.css';

// ===== HANDLE VIDEO AVAILABILITY =====
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('driverVideo');
    const container = document.getElementById('videoContainer');

    if (video && container) {
        // Check if video source loads successfully
        video.addEventListener('error', () => {
            container.innerHTML = `
        <div class="video-placeholder">
          <div class="video-placeholder-icon">🎬</div>
          <div class="video-placeholder-text">VIDEO COMING SOON</div>
          <p class="video-placeholder-hint">
            The official announcement video will be available soon.<br>
            Place your video as <strong>aryan.mp4</strong> in the <strong>public/video/</strong> folder.
          </p>
        </div>
      `;
        }, true);

        // Also handle source element errors
        const source = video.querySelector('source');
        if (source) {
            source.addEventListener('error', () => {
                container.innerHTML = `
          <div class="video-placeholder">
            <div class="video-placeholder-icon">🎬</div>
            <div class="video-placeholder-text">VIDEO COMING SOON</div>
            <p class="video-placeholder-hint">
              The official announcement video will be available soon.<br>
              Place your video as <strong>aryan.mp4</strong> in the <strong>public/video/</strong> folder.
            </p>
          </div>
        `;
            });
        }
    }
});


// ===== NAVBAR SCROLL EFFECT =====
const nav = document.querySelector('.f1-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(21, 21, 30, 0.97)';
    } else {
        nav.style.background = 'rgba(21, 21, 30, 0.92)';
    }
}, { passive: true });
