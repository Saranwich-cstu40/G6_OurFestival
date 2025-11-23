let slideIndex = 1; // <--- 1. ตั้งค่าเริ่มต้นกลับเป็น 1
showSlides(slideIndex);


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function autoSlide() {
  clearTimeout(autoSlideTimeout); 
  
  autoSlideTimeout = setTimeout(function() {
    slideIndex++;
    showSlides(slideIndex);
    autoSlide(); 
  }, 3000);
}

// Lineup carousel interactions: prev/next and drag-to-scroll
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('ss6-carousel');
  const prevBtn = document.querySelector('.ss6-prev');
  const nextBtn = document.querySelector('.ss6-next');

  if (!carousel) return;

  // Prev/Next buttons (if present)
  function getScrollAmount() {
    const card = carousel.querySelector('.ss6-card');
    if (!card) return Math.round(carousel.clientWidth * 0.8);
    const style = getComputedStyle(card);
    const marginRight = parseFloat(style.marginRight) || 0;
    return Math.round(card.getBoundingClientRect().width + marginRight);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
  }

  // Keyboard support
  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      if (nextBtn) nextBtn.click(); else carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
    if (e.key === 'ArrowLeft') {
      if (prevBtn) prevBtn.click(); else carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  });

  // Drag to scroll (pointer events)
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('pointerdown', function (e) {
    isDown = true;
    carousel.classList.add('grabbing');
    startX = e.clientX;
    scrollLeft = carousel.scrollLeft;
    // capture pointer so we still receive events outside element
    try { carousel.setPointerCapture(e.pointerId); } catch (err) {}
    e.preventDefault();
  });

  carousel.addEventListener('pointermove', function (e) {
    if (!isDown) return;
    const x = e.clientX;
    const walk = x - startX; // positive when moving right
    carousel.scrollLeft = scrollLeft - walk;
  });

  function endDrag(e) {
    if (!isDown) return;
    isDown = false;
    carousel.classList.remove('grabbing');
    try { carousel.releasePointerCapture && carousel.releasePointerCapture(e.pointerId); } catch (err) {}
  }

  carousel.addEventListener('pointerup', endDrag);
  carousel.addEventListener('pointercancel', endDrag);
  carousel.addEventListener('pointerleave', endDrag);
});