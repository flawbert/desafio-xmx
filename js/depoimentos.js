(function () {
  'use strict';

  // --- Seletores ---
  const track = document.getElementById('depoimentoTrack');
  const dotsContainer = document.getElementById('depoimentoDots');

  if (!track || !dotsContainer) return;

  const cards = Array.from(track.querySelectorAll('.depoimento__card'));
  const dots  = Array.from(dotsContainer.querySelectorAll('.depoimento__dot'));

  // --- Utilitário: ativar dot ---
  function setActiveDot(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('depoimento__dot--active', i === index);
    });
  }

  // --- Clique no dot → scroll para o card ---
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const card = cards[index];
      if (!card) return;

      // Centraliza o card dentro do track
      const trackRect = track.getBoundingClientRect();
      const cardRect  = card.getBoundingClientRect();
      const offset    = cardRect.left - trackRect.left + track.scrollLeft
                        - (trackRect.width / 2 - cardRect.width / 2);

      track.scrollTo({ left: offset, behavior: 'smooth' });
      setActiveDot(index);
    });
  });

  // --- IntersectionObserver: detecta qual card está visível ---
  const observerOptions = {
    root: track,
    rootMargin: '0px',
    threshold: 0.6, // 60% do card precisa estar visível para ativar o dot
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = cards.indexOf(entry.target);
        if (index !== -1) setActiveDot(index);
      }
    });
  }, observerOptions);

  cards.forEach((card) => observer.observe(card));

  // --- Inicializa primeiro dot como ativo ---
  setActiveDot(0);

})();