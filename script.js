(function initVersatileCarousel() {
  const track   = document.getElementById('versatileCards');
  const prevBtn = document.getElementById('versatilePrev');
  const nextBtn = document.getElementById('versatileNext');

  if (!track) return;

  const cardWidth   = 420;
  const cardGap     = 24;
  const step        = cardWidth + cardGap; /* 436px */
  const totalCards  = 6;

  /* Clone cards for infinite loop */
  const originalCards = Array.from(track.children);
  const totalOriginal = originalCards.length;

  /* Add clones before */
  originalCards.forEach(function(card) {
    track.insertBefore(card.cloneNode(true), track.firstChild);
  });

  /* Add clones after */
  originalCards.forEach(function(card) {
    track.appendChild(card.cloneNode(true));
  });

  /* Start at first original card index */
  let currentIndex = totalOriginal;

  function getInitialOffset() {
    /* Calculate dynamically based on actual screen width */
    const screenWidth   = window.innerWidth;

    /* How much space is taken by 2 full cards + 3 gaps */
    const twoFullCards  = 2 * cardWidth;  /* 840px */
    const threeGaps     = 3 * cardGap;    /* 48px */

    /* Remaining space for 2 partial cards */
    const remaining     = screenWidth - twoFullCards - threeGaps;

    /* Each partial card shows half of remaining */
    const eachPartial   = remaining / 2;

    /* Hidden part of each partial card */
    const hiddenPartial = cardWidth - eachPartial;

    /* Offset = hidden full card + gap + hidden part of partial */
    return cardWidth + cardGap + hiddenPartial;
  }

  function updatePosition(animate) {
    if (!animate) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.4s ease';
    }
    const initialOffset = getInitialOffset();
    const offset = initialOffset + (currentIndex * step);
    track.style.transform = 'translateX(-' + offset + 'px)';
  }

  /* Set initial position */
  updatePosition(false);

  nextBtn.addEventListener('click', function () {
    currentIndex++;
    updatePosition(true);

    setTimeout(function() {
      if (currentIndex >= totalOriginal * 2) {
        currentIndex = totalOriginal;
        updatePosition(false);
      }
    }, 400);
  });

  prevBtn.addEventListener('click', function () {
    currentIndex--;
    updatePosition(true);

    setTimeout(function() {
      if (currentIndex < totalOriginal) {
        currentIndex = totalOriginal * 2 - 1;
        updatePosition(false);
      }
    }, 400);
  });

  /* Recalculate on window resize */
  window.addEventListener('resize', function() {
    updatePosition(false);
  });

})();


/* ============================================================
   TESTIMONIALS CAROUSEL — positioning only
   No arrows, just sets correct initial position
============================================================ */
(function initTestimonialsCarousel() {
  const track = document.getElementById('testimonialsCards');
  if (!track) return;

  const cardWidth = 420;
  const cardGap   = 24;

  function setPosition() {
    const screenWidth   = window.innerWidth;
    const twoFullCards  = 2 * cardWidth;     /* 840px */
    const threeGaps     = 3 * cardGap;       /* 72px */
    const remaining     = screenWidth - twoFullCards - threeGaps;
    const eachPartial   = remaining / 2;
    const hiddenPartial = cardWidth - eachPartial;
    const offset        = cardWidth + cardGap + hiddenPartial;

    track.style.transform = 'translateX(-' + offset + 'px)';
  }

  setPosition();

  window.addEventListener('resize', setPosition);
})();


// ===== OPEN MODALS =====
const openButtons = document.querySelectorAll("[data-modal-target]");

openButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal-target");
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});


// ===== CLOSE MODALS =====
const closeButtons = document.querySelectorAll(".modal-close");
const overlays = document.querySelectorAll(".modal-overlay");

closeButtons.forEach(btn => {
  btn.addEventListener("click", closeModal);
});

overlays.forEach(overlay => {
  overlay.addEventListener("click", closeModal);
});

function closeModal(e) {
  const modal = e.target.closest(".modal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}


// ===== ESC CLOSE =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach(modal => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "auto";
  }
});