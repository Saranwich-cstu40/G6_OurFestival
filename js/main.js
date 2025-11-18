// ส่วนของ ที่เป็นเลื่อนๆ
(function () {
  const carousel = document.getElementById('ss6-carousel');
  const prevBtn = document.querySelector('.ss6-prev');
  const nextBtn = document.querySelector('.ss6-next');

  if (!carousel) return;

  function scrollByCard(direction = 1) {
    const cards = Array.from(carousel.querySelectorAll('.ss6-card'));
    if (!cards.length) return;
    const card = cards[0];
    const gap = parseFloat(getComputedStyle(carousel).gap || 28);
    const step = Math.round(card.offsetWidth + gap);
    carousel.scrollBy({ left: step * direction, behavior: 'smooth' });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => scrollByCard(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollByCard(1));

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByCard(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1); }
  });

  // update nav opacity (ไม่จำเป็น แต่ช่วยให้เห็นสถานะ)
  function updateNavVisibility() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.style.opacity = carousel.scrollLeft > 10 ? '1' : '0.35';
    const maxScroll = carousel.scrollWidth - carousel.clientWidth - 4;
    nextBtn.style.opacity = carousel.scrollLeft < maxScroll ? '1' : '0.35';
  }
  carousel.addEventListener('scroll', updateNavVisibility);
  window.addEventListener('resize', updateNavVisibility);
  updateNavVisibility();
})();