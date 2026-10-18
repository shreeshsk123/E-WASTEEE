/**
 * script.js — Interactivity, Animation Triggers & Modal PDF Viewer
 * Shreesh Khamkar | E-Waste Management Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initPhotoDropAnimation();
  renderAssignments();
  initIntersectionReveals();
  initStatsCountUp();
  initReusCardsTilt();
  initModalViewer();
  initSmoothScroll();
});

/**
 * 1. Photo Drop-In Animation
 * Animates in from the top of the screen (slide down + fade, ~1.2s ease-out with a slight bounce/settle)
 * on page load, then remains static on the right side.
 */
function initPhotoDropAnimation() {
  const photoFrame = document.querySelector('.photo-frame');
  if (photoFrame) {
    // Add animation trigger class if not already present
    photoFrame.classList.add('drop-in-animation');
  }
}

/**
 * 2. Render Assignments from assignments.js (Read-Only)
 */
function renderAssignments() {
  const container = document.getElementById('assignments-container');
  if (!container) return;

  const countEl = document.getElementById('assignment-count');
  if (countEl && typeof assignments !== 'undefined' && Array.isArray(assignments)) {
    countEl.textContent = `${assignments.length} Activities Active`;
  }

  if (typeof assignments === 'undefined' || !Array.isArray(assignments) || assignments.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: rgba(255,255,255,0.6);">
        No assignments loaded. Please check assignments.js.
      </div>
    `;
    return;
  }

  container.innerHTML = assignments.map((item, index) => {
    return `
      <article class="assignment-card reveal-item" style="transition-delay: ${index * 120}ms" data-id="${item.id}">
        <div class="card-top">
          <span class="assignment-badge">Assignment ${item.number || '0' + (index + 1)}</span>
          <span class="assignment-tag">${escapeHtml(item.category || 'Academic')}</span>
        </div>
        
        <h3 class="assignment-title">${escapeHtml(item.title)}</h3>
        <p class="assignment-desc">${escapeHtml(item.description)}</p>
        
        <div class="card-bottom">
          <div class="assignment-date">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity: 0.7"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>${formatDate(item.date)}</span>
          </div>

          <button type="button" class="btn-view-assignment" data-action="view-assignment" data-id="${item.id}" aria-label="View ${escapeHtml(item.title)}">
            <span>View</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * 3. In-Page Academic Activity Report Modal Viewer
 */
function initModalViewer() {
  const modal = document.getElementById('assignment-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  
  // Elements
  const mainTitle = document.getElementById('report-main-title');
  const courseEl = document.getElementById('report-course');
  const completionDateEl = document.getElementById('report-completion-date');
  const activityTitleEl = document.getElementById('report-activity-title');
  const activityDescEl = document.getElementById('report-activity-desc');
  const objectiveEl = document.getElementById('report-objective');
  const learnedHeadingEl = document.getElementById('report-learned-heading');
  const learnedTextEl = document.getElementById('report-learned-text');
  const sustainabilityHeadingEl = document.getElementById('report-sustainability-heading');
  const sustainabilityTextEl = document.getElementById('report-sustainability-text');

  // Media & Actions
  const imageWrap = document.getElementById('report-image-wrap');
  const previewImg = document.getElementById('report-preview-img');
  const pdfWrap = document.getElementById('report-pdf-wrap');
  const modalIframe = document.getElementById('modal-iframe');
  const externalLink = document.getElementById('modal-external-link');
  const downloadLabel = document.getElementById('report-download-label');
  const btnTogglePdf = document.getElementById('btn-toggle-pdf');
  const btnTogglePdfText = document.getElementById('btn-toggle-pdf-text');

  if (!modal) return;

  let isShowingPdf = false;

  // Toggle between image and PDF reader
  btnTogglePdf?.addEventListener('click', () => {
    isShowingPdf = !isShowingPdf;
    if (isShowingPdf) {
      if (imageWrap) imageWrap.style.display = 'none';
      if (pdfWrap) pdfWrap.style.display = 'block';
      if (btnTogglePdfText) btnTogglePdfText.textContent = 'Switch to Solution Sheet';
    } else {
      if (imageWrap) imageWrap.style.display = 'flex';
      if (pdfWrap) pdfWrap.style.display = 'none';
      if (btnTogglePdfText) btnTogglePdfText.textContent = 'Switch to PDF Reader';
    }
  });

  // Open modal handler (Event Delegation)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action="view-assignment"]');
    if (!trigger) return;

    const id = parseInt(trigger.getAttribute('data-id'), 10);
    const assignment = assignments.find(a => a.id === id);

    if (assignment) {
      // Populate text fields
      if (mainTitle) mainTitle.textContent = assignment.modalTitle || `${assignment.title.toUpperCase()} - ACADEMIC SUBMISSION`;
      if (courseEl) courseEl.textContent = assignment.course || 'EWEM (E-Waste & Environmental Management - VEC02)';
      if (completionDateEl) completionDateEl.textContent = assignment.completionDate || formatDate(assignment.date);
      if (activityTitleEl) activityTitleEl.textContent = assignment.activityTitle || assignment.title;
      if (activityDescEl) activityDescEl.textContent = assignment.description;
      if (objectiveEl) objectiveEl.textContent = assignment.objective || assignment.description;
      if (learnedHeadingEl) learnedHeadingEl.textContent = assignment.learnedHeading || 'Key Technical Learnings';
      if (learnedTextEl) learnedTextEl.textContent = assignment.learnedText || assignment.description;
      if (sustainabilityHeadingEl) sustainabilityHeadingEl.textContent = assignment.sustainabilityHeading || 'How This Activity Helps Reduce E-Waste';
      if (sustainabilityTextEl) sustainabilityTextEl.textContent = assignment.sustainabilityText || 'Promotes closed-loop e-waste management.';

      // Platform & Score rows
      const platformRow = document.getElementById('report-platform-row');
      const platformEl = document.getElementById('report-platform');
      const scoreRow = document.getElementById('report-score-row');
      const scoreAccuracyEl = document.getElementById('report-score-accuracy');

      if (assignment.assessmentPlatform) {
        if (platformRow) platformRow.style.display = 'flex';
        if (platformEl) platformEl.textContent = assignment.assessmentPlatform;
      } else {
        if (platformRow) platformRow.style.display = 'none';
      }

      if (assignment.scoreAccuracy) {
        if (scoreRow) scoreRow.style.display = 'flex';
        if (scoreAccuracyEl) scoreAccuracyEl.textContent = assignment.scoreAccuracy;
      } else {
        if (scoreRow) scoreRow.style.display = 'none';
      }

      // Quiz analytics stats grid
      const quizStatsWrap = document.getElementById('report-quiz-stats');
      const waygroundLink = document.getElementById('report-wayground-link');
      const imgHeader = document.getElementById('report-img-header');
      const evidenceHeading = document.getElementById('report-evidence-heading');

      if (assignment.quizStats) {
        if (quizStatsWrap) quizStatsWrap.style.display = 'grid';
        if (waygroundLink) {
          waygroundLink.style.display = 'inline-flex';
          waygroundLink.href = assignment.externalQuizUrl || 'https://wayground.com';
        }
        if (imgHeader) imgHeader.style.display = 'flex';
        if (evidenceHeading) evidenceHeading.textContent = 'Quiz Scorecard, Performance Analytics & Official Wayground Link';
        
        // Populate stats
        const sScore = document.getElementById('quiz-stat-score');
        const sCoins = document.getElementById('quiz-stat-coins');
        const sAcc = document.getElementById('quiz-stat-acc');
        const sCorrect = document.getElementById('quiz-stat-correct');
        const sTime = document.getElementById('quiz-stat-time');

        if (sScore) sScore.textContent = assignment.quizStats.score || '6,140';
        if (sCoins) sCoins.textContent = assignment.quizStats.coins || '+160 COINS';
        if (sAcc) sAcc.textContent = assignment.quizStats.accuracy || '80%';
        if (sCorrect) sCorrect.textContent = assignment.quizStats.correct || '8 / 10';
        if (sTime) sTime.textContent = assignment.quizStats.avgTime || '16 s';
      } else {
        if (quizStatsWrap) quizStatsWrap.style.display = 'none';
        if (waygroundLink) waygroundLink.style.display = 'none';
        if (imgHeader) imgHeader.style.display = 'none';
        if (evidenceHeading) evidenceHeading.textContent = assignment.title === 'Crossword' ? 'Crossword Solution Sheet & Downloadable PDF' : 'Submission Evidence & Official Document';
      }

      // References Card
      const refCard = document.getElementById('report-references-card');
      const refList = document.getElementById('report-references-list');
      if (assignment.references && Array.isArray(assignment.references) && assignment.references.length > 0) {
        if (refCard) refCard.style.display = 'flex';
        if (refList) {
          refList.innerHTML = assignment.references.map(ref => `<li>${escapeHtml(ref)}</li>`).join('');
        }
      } else {
        if (refCard) refCard.style.display = 'none';
      }

      // Media preview
      if (externalLink) externalLink.href = assignment.file;
      if (modalIframe) modalIframe.src = assignment.file;

      if (assignment.image) {
        if (previewImg) previewImg.src = assignment.image;
        if (imageWrap) imageWrap.style.display = 'flex';
        if (pdfWrap) pdfWrap.style.display = 'none';
        if (btnTogglePdf) btnTogglePdf.style.display = 'inline-flex';
        if (btnTogglePdfText) btnTogglePdfText.textContent = 'Switch to PDF Reader';
        if (downloadLabel) {
          if (assignment.title === 'Crossword') {
            downloadLabel.textContent = 'View / Download Full Crossword PDF';
          } else if (assignment.title.toLowerCase().includes('pledge')) {
            downloadLabel.textContent = 'View / Download Full Padlet Pledge PDF';
          } else if (assignment.title.toLowerCase().includes('quiz')) {
            downloadLabel.textContent = 'Download Scorecard PDF';
          } else {
            downloadLabel.textContent = 'View / Download Full Document PDF';
          }
        }
        isShowingPdf = false;
      } else {
        // Direct PDF view for other activities
        if (imageWrap) imageWrap.style.display = 'none';
        if (pdfWrap) pdfWrap.style.display = 'block';
        if (btnTogglePdf) btnTogglePdf.style.display = 'none';
        if (downloadLabel) downloadLabel.textContent = `View / Download ${assignment.title} PDF`;
        isShowingPdf = true;
      }

      // Show modal & scroll to top of report
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const scrollBody = modal.querySelector('.report-scroll-body');
      if (scrollBody) scrollBody.scrollTop = 0;
    }
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (modalIframe) modalIframe.src = '';
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/**
 * 4. Scroll-Triggered Text & Card Reveals
 */
function initIntersectionReveals() {
  const revealElements = document.querySelectorAll('.reveal-item');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 5. Animated Count-Up Numbers for Facts Section
 */
function initStatsCountUp() {
  const statsSection = document.querySelector('.stats-strip');
  const statNumbers = document.querySelectorAll('.stat-number');

  if (!statsSection || statNumbers.length === 0) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateAllCounters(statNumbers);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(statsSection);
}

function animateAllCounters(elements) {
  const duration = 2000; // ms

  elements.forEach(el => {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = (target * easeProgress).toFixed(decimals);

      el.textContent = currentVal;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

/**
 * 6. Interactive 3D Tilt for R-E-U-S Cards
 */
function initReusCardsTilt() {
  const cards = document.querySelectorAll('.reus-card');
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReducedMotion || window.innerWidth < 768) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/**
 * 7. Smooth Scroll & Navbar Highlight
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/**
 * Helper: Format YYYY-MM-DD to readable format (e.g. Sep 15, 2026)
 */
function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Helper: Sanitize HTML strings
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
