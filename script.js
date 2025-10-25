document.addEventListener('DOMContentLoaded', () => {
  const front = document.getElementById('front-page');
  const main = document.getElementById('main-content');
  const envelope = document.getElementById('envelope');
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('popupLetter');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');

  // Keep track of timeouts/intervals from typing so we can cancel them
  let typingTimeouts = [];
  function clearTyping() {
    typingTimeouts.forEach(id => clearTimeout(id));
    typingTimeouts = [];
  }

  // floating hearts
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-shape';
    heart.innerHTML = '💚';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (6 + Math.random() * 5) + 's';
    heart.style.fontSize = (14 + Math.random() * 28) + 'px';
    document.body.appendChild(heart);
  }

  // Typewriter effect for front page headline
  const frontText = document.querySelector('#front-page h1');
  const frontContent = frontText ? frontText.textContent : '';
  if (frontText) {
    frontText.textContent = '';
    let idx = 0;
    const frontInterval = setInterval(() => {
      frontText.textContent += frontContent.charAt(idx);
      idx++;
      if (idx >= frontContent.length) clearInterval(frontInterval);
    }, 50);
  }

  // Random floating mini hearts in main content
  setInterval(() => {
    const miniHeart = document.createElement('div');
    miniHeart.className = 'mini-heart';
    miniHeart.innerHTML = '💚';
    miniHeart.style.left = Math.random() * 100 + 'vw';
    miniHeart.style.fontSize = (10 + Math.random() * 15) + 'px';
    miniHeart.style.animationDuration = (5 + Math.random() * 5) + 's';
    document.body.appendChild(miniHeart);
    setTimeout(() => miniHeart.remove(), 8000);
  }, 800);

  // Buttons
  yesBtn.addEventListener('click', () => {
    front.style.opacity = '0';
    setTimeout(() => {
      front.style.display = 'none';
      main.classList.add('show');
      document.body.style.overflow = 'auto'; // enable scrolling for main page
    }, 700);
  });

  noBtn.addEventListener('click', () => {
    alert("Awww... okay maybe later 😢");
  });

  // Utility: open popup
  function openPopup() {
    const flap = envelope.querySelector('.flap');

    // If already showing, do nothing
    if (popup.classList.contains('show')) return;

    // Ensure popup responds to pointer events
    popup.style.pointerEvents = 'auto';

    flap.classList.add('open');
    overlay.classList.add('show');
    popup.classList.add('show');

    // Prevent background scroll while popup is open
    document.body.style.overflow = 'hidden';

    // Typing animation - clear any previous typing first
    clearTyping();
    const paragraphs = popup.querySelectorAll('.popup-para');
    paragraphs.forEach(p => p.textContent = '');

    // Stagger typing for each paragraph, but keep references to timeouts
    let delay = 0;
    paragraphs.forEach((p) => {
      const fullText = p.dataset.text || '';
      let i = 0;
      const typeStep = () => {
        if (i < fullText.length && popup.classList.contains('show')) {
          p.textContent += fullText.charAt(i);
          i++;
          const t = setTimeout(typeStep, 15);
          typingTimeouts.push(t);
        }
      };
      const tStart = setTimeout(typeStep, delay);
      typingTimeouts.push(tStart);
      delay += Math.max(300, fullText.length * 15) + 100;
    });

    spawnConfetti(80);
  }

  // Utility: close popup
  function closePopup() {
    const flap = envelope.querySelector('.flap');

    // Hide popup and overlay immediately
    overlay.classList.remove('show');
    popup.classList.remove('show');

    // Disable pointer interactions for popup while hidden
    popup.style.pointerEvents = 'none';

    // Stop typing animation timeouts
    clearTyping();

    // Re-enable background scroll
    document.body.style.overflow = 'auto';

    // Delay removing 'open' so the closing animation can play smoothly
    // Match this delay to your flap transition duration (CSS: transition: transform 1.2s)
    // We'll use a shorter delay (400ms) so it feels snappy but not instant.
    setTimeout(() => {
      flap.classList.remove('open');
    }, 400);
  }

  // Envelope click flap + popup (use openPopup)
  envelope.addEventListener('click', () => {
    openPopup();
  });

  // Close popup when overlay clicked
  overlay.addEventListener('click', () => {
    closePopup();
  });

  // Also allow pressing Escape to close the popup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('show')) {
      closePopup();
    }
  });

  // Confetti
  function spawnConfetti(count) {
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
      document.body.appendChild(confetti);

      const falling = setInterval(() => {
        const top = parseFloat(confetti.style.top);
        confetti.style.top = (top + Math.random() * 5 + 2) + 'px';
        confetti.style.left = (parseFloat(confetti.style.left) + Math.random() * 4 - 2) + 'px';
        if (top > window.innerHeight) {
          confetti.remove();
          clearInterval(falling);
        }
      }, 16);
    }
  }

  // Sparkle particles
  for (let i = 0; i < 25; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.animationDelay = Math.random() * 6 + 's';
    document.body.appendChild(sparkle);
  }

  // Floating birthday messages
  const messages = ['💚', '💚', '💚', '💚'];
  messages.forEach((msg, i) => {
    const span = document.createElement('div');
    span.className = 'floating-msg';
    span.textContent = msg;
    span.style.left = (10 + i * 20) + 'vw';
    span.style.animationDelay = (i * 2) + 's';
    document.body.appendChild(span);
  });
});
