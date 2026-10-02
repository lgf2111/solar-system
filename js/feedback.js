// Self-contained feedback modal: open/close with focus management, an inline-SVG
// star rating (hover preview, click/keyboard commit) and a Submit that composes a
// mailto to lgf2111@gmail.com. No Font Awesome, no feedback.html, no inline on*.
const openBtn = document.querySelector('#feedback-open');
const modal = document.querySelector('#feedback-modal');
const closeBtn = modal?.querySelector('.feedback-close');
const submitBtn = document.querySelector('#feedback-submit');
const comment = document.querySelector('#feedback-comment');
const stars = Array.from(document.querySelectorAll('.star'));

const FEEDBACK_EMAIL = 'lgf2111@gmail.com';
let rate = 0; // committed rating (0 = none)

// Fill stars up to `n` by toggling the .filled class (gold vs empty via CSS).
function paint(n) {
  stars.forEach((star, i) => {
    star.classList.toggle('filled', i < n);
  });
}

function commit(n) {
  rate = n;
  paint(rate);
  stars.forEach((star, i) => {
    star.setAttribute('aria-checked', i + 1 === n ? 'true' : 'false');
  });
}

function openModal() {
  if (!modal) return;
  modal.hidden = false;
  (stars[0] || closeBtn)?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  openBtn?.focus();
}

if (openBtn && modal) {
  openBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);

  // Backdrop click (the modal element itself, outside the card) closes.
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  stars.forEach((star, index) => {
    const value = index + 1;
    star.addEventListener('mouseenter', () => paint(value));
    star.addEventListener('click', () => commit(value));
    star.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        event.preventDefault();
        const next = Math.min(stars.length, value + 1);
        commit(next);
        stars[next - 1].focus();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        event.preventDefault();
        const prev = Math.max(1, value - 1);
        commit(prev);
        stars[prev - 1].focus();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        commit(value);
      }
    });
  });

  // Restore to the committed rating when the pointer leaves the group.
  const group = document.querySelector('.star-rating');
  group?.addEventListener('mouseleave', () => paint(rate));

  submitBtn?.addEventListener('click', () => {
    const text = comment ? comment.value : '';
    const subject = encodeURIComponent('Solar System feedback');
    const body = encodeURIComponent(`Rating: ${rate}/5\n\n${text}`);
    window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
    commit(0);
    if (comment) comment.value = '';
    closeModal();
  });
}
