import confetti from 'canvas-confetti';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const stepQuestion = document.getElementById('step-question');
  const stepDetails = document.getElementById('step-details');
  const heartsContainer = document.getElementById('hearts-container');

  // 1. Initialize background hearts
  const createHeart = () => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 5 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);
  };

  setInterval(createHeart, 300);

  // 2. "No" Button Interaction (The playful part)
  const moveNoButton = () => {
    const btnRect = btnNo.getBoundingClientRect();

    // Calculate random position within the viewport
    const maxX = window.innerWidth - btnRect.width;
    const maxY = window.innerHeight - btnRect.height;

    const randomX = Math.random() * (maxX - 40) + 20;
    const randomY = Math.random() * (maxY - 40) + 20;

    // Apply fixed positioning only once
    if (btnNo.style.position !== 'fixed') {
      btnNo.style.left = `${btnRect.left}px`;
      btnNo.style.top = `${btnRect.top}px`;
      btnNo.style.width = `${btnRect.width}px`;
      btnNo.style.position = 'fixed';
      btnNo.style.margin = '0';
    }

    // Small delay to ensure the browser registers the initial position before moving
    setTimeout(() => {
      btnNo.style.left = `${randomX}px`;
      btnNo.style.top = `${randomY}px`;
    }, 10);

    btnNo.style.zIndex = '1000';
  };

  btnNo.addEventListener('mouseover', moveNoButton);
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  });

  // 3. "Yes" Button Interaction
  btnYes.addEventListener('click', () => {
    // Celebrate!
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Transition steps
    stepQuestion.classList.remove('active');
    stepDetails.classList.add('active');

    // Intensify hearts
    setInterval(createHeart, 100);

    // Start compliments
    startCompliments();
  });

  const compliments = [
    "You make my heart skip a beat every time I see you.",
    "I'm so lucky to have you in my life.",
    "Your smile is my favorite thing in the world.",
    "Every day with you is a new adventure.",
    "You're the most beautiful person I know, inside and out.",
    "I can't wait for our date! ❤️"
  ];

  function startCompliments() {
    const subtitle = stepDetails.querySelector('.subtitle');
    let index = 0;

    // Change compliment every 3 seconds
    setInterval(() => {
      subtitle.style.opacity = 0;
      setTimeout(() => {
        subtitle.textContent = compliments[index];
        subtitle.style.opacity = 1;
        index = (index + 1) % compliments.length;
      }, 500);
    }, 3000);
  }

  // 4. Add to Calendar logic (Mock)
  document.getElementById('btn-calendar').addEventListener('click', () => {
    alert('Adding to your calendar... See you then, beautiful! ❤️');
  });
});
