/* ==========================================================================
   ENSON WÄRMEPUMPEN - INTERACTIVE JAVASCRIPT
   KfW Subsidy Calculator | Modals | Mobile Nav & Lead Form | High-Performance Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize KfW Subsidy Calculator
  initSubsidyCalculator();

  // 2. Initialize 3D Modal & Interactive Badges
  init3DModal();

  // 3. Initialize Mobile Menu Navigation & Smooth Scrolling
  initNavigation();

  // 4. Initialize Lead Form & Toast Notification
  initLeadForm();

  // 5. Initialize Hero Background Video (Mobile Autoplay Safeguard & GPU Pause)
  initHeroBackgroundVideo();
});

/* ==========================================================================
   2. FÖRDERUNGS-CHECK & WÄRMEPUMPEN + PV MULTI-STEP WIZARD 2026
   ========================================================================== */
function initSubsidyCalculator() {
  const steps = document.querySelectorAll('.calc-step');
  const totalSteps = steps.length || 4;
  let currentStep = 1;

  // Step Indicators & Progress
  const currentStepNum = document.getElementById('currentStepNum');
  const stepTitleHint = document.getElementById('stepTitleHint');
  const wizardProgressFill = document.getElementById('wizardProgressFill');
  const indicatorDots = document.querySelectorAll('.step-dot-item');

  // Summary Elements
  const sumSystem = document.getElementById('sumSystem');
  const sumBuilding = document.getElementById('sumBuilding');
  const sumHeating = document.getElementById('sumHeating');
  const sumArea = document.getElementById('sumArea');
  const sumDistribution = document.getElementById('sumDistribution');

  // Interactive Inputs
  const systemCards = document.querySelectorAll('#calcSystemType .calc-choice-card');
  const buildingCards = document.querySelectorAll('#calcBuildingType .calc-choice-card');
  const heatingCards = document.querySelectorAll('#calcCurrentHeating .calc-choice-card');
  const distributionCards = document.querySelectorAll('#calcHeatDistribution .calc-choice-card');
  const areaRange = document.getElementById('areaRange');
  const areaDisplay = document.getElementById('areaDisplay');

  // Nav Buttons
  const nextBtns = document.querySelectorAll('.wizard-btn-next');
  const prevBtns = document.querySelectorAll('.wizard-btn-prev');
  const form = document.getElementById('subsidyInquiryForm');
  const toast = document.getElementById('toastNotification');

  const stepHints = [
    'System & Gebäudetyp auswählen',
    'Bestehende Heizung wählen',
    'Wohnfläche & Wärmeverteilung',
    'Kontaktdaten eingeben'
  ];

  function goToStep(stepNum) {
    if (stepNum < 1 || stepNum > totalSteps) return;

    currentStep = stepNum;

    // 1. Update Step Containers
    steps.forEach(step => {
      const s = parseInt(step.dataset.step, 10);
      if (s === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // 2. Update Progress Bar & Counter
    const progressPercent = (currentStep / totalSteps) * 100;
    if (wizardProgressFill) {
      wizardProgressFill.style.width = `${progressPercent}%`;
    }
    if (currentStepNum) {
      currentStepNum.textContent = currentStep;
    }
    if (stepTitleHint) {
      stepTitleHint.textContent = stepHints[currentStep - 1] || '';
    }

    // 3. Update Indicator Dots
    indicatorDots.forEach(dot => {
      const target = parseInt(dot.dataset.stepTarget, 10);
      dot.classList.remove('active', 'completed');
      if (target === currentStep) {
        dot.classList.add('active');
      } else if (target < currentStep) {
        dot.classList.add('completed');
      }
    });
  }

  // Next / Prev button listeners
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.dataset.nextStep, 10) || currentStep + 1;
      goToStep(nextStep);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prevStep = parseInt(btn.dataset.prevStep, 10) || currentStep - 1;
      goToStep(prevStep);
    });
  });

  // Step 1: System Preference Choices
  systemCards.forEach(card => {
    card.addEventListener('click', () => {
      systemCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const val = card.dataset.val || card.querySelector('.choice-title')?.textContent.trim();
      if (sumSystem) sumSystem.textContent = val;
    });
  });

  // Step 1: Gebäudeart Choices
  buildingCards.forEach(card => {
    card.addEventListener('click', () => {
      buildingCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const val = card.dataset.val || card.querySelector('.choice-title')?.textContent.trim();
      if (sumBuilding) sumBuilding.textContent = val;

      // Smooth auto-advance to step 2
      setTimeout(() => {
        if (currentStep === 1) goToStep(2);
      }, 250);
    });
  });

  // Step 2: Aktuelle Heizung Choices
  heatingCards.forEach(card => {
    card.addEventListener('click', () => {
      heatingCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const val = card.dataset.val || card.querySelector('.choice-title')?.textContent.trim();
      if (sumHeating) sumHeating.textContent = val;

      // Smooth auto-advance to step 3
      setTimeout(() => {
        if (currentStep === 2) goToStep(3);
      }, 250);
    });
  });

  // Step 3: Wohnfläche Slider & Heat Distribution
  if (areaRange && areaDisplay) {
    areaRange.addEventListener('input', (e) => {
      const val = `${e.target.value} m²`;
      areaDisplay.textContent = val;
      if (sumArea) sumArea.textContent = val;
    });
  }

  distributionCards.forEach(card => {
    card.addEventListener('click', () => {
      distributionCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const val = card.dataset.val || card.querySelector('.choice-title')?.textContent.trim();
      if (sumDistribution) sumDistribution.textContent = val;
    });
  });

  // Direct Click on step indicators (if already reached)
  indicatorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.dataset.stepTarget, 10);
      if (target <= currentStep || dot.classList.contains('completed')) {
        goToStep(target);
      }
    });
  });

  // Step 4: Final Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('calcUserName')?.value.trim();
      const phone = document.getElementById('calcUserPhone')?.value.trim();
      const email = document.getElementById('calcUserEmail')?.value.trim();

      if (!name || !phone || !email) {
        alert('Bitte füllen Sie alle erforderlichen Kontaktdaten aus (Name, Telefon und E-Mail).');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return;
      }

      if (toast) {
        toast.classList.add('active');

        // Reset inputs
        const nameInput = document.getElementById('calcUserName');
        const phoneInput = document.getElementById('calcUserPhone');
        const emailInput = document.getElementById('calcUserEmail');
        const msgInput = document.getElementById('calcUserMsg');
        if (nameInput) nameInput.value = '';
        if (phoneInput) phoneInput.value = '';
        if (emailInput) emailInput.value = '';
        if (msgInput) msgInput.value = '';

        // Return to step 1 after success
        setTimeout(() => {
          goToStep(1);
          toast.classList.remove('active');
        }, 5000);
      }
    });
  }

  // Initialize at step 1
  goToStep(1);
}

/* ==========================================================================
   3. 3D CUTAWAY MODAL (DESKTOP & MOBILE RESPONSIVE)
   ========================================================================== */
function init3DModal() {
  const trigger = document.getElementById('cutawayTrigger');
  const modal = document.getElementById('cutawayModal');
  const closeBtn = document.getElementById('modalClose');

  function openModal() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (trigger) trigger.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   4. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    const setMenuState = (isOpen) => {
      navMenu.classList.toggle('open', isOpen);
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    };

    mobileToggle.setAttribute('aria-controls', 'navMenu');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenuState(!navMenu.classList.contains('open'));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        setMenuState(false);
      }
    });
  }

  // Active Link Highlight on Scroll via IntersectionObserver (Zero forced reflows, locked 60FPS)
  const sections = document.querySelectorAll('section[id]');
  if (sections.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const isMatch = link.getAttribute('href') === `#${currentId}`;
            link.classList.toggle('active', isMatch);
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    });

    sections.forEach(sec => navObserver.observe(sec));
  }
}

/* ==========================================================================
   5. LEAD FORM SUBMISSION & TOAST
   ========================================================================== */
function initLeadForm() {
  const form = document.getElementById('leadForm');
  const toast = document.getElementById('toastNotification');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const email = document.getElementById('userEmail').value.trim();

      if (!name || !phone || !email) {
        alert('Bitte füllen Sie alle erforderlichen Felder aus.');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return;
      }

      if (toast) {
        toast.classList.add('active');
        form.reset();

        setTimeout(() => {
          toast.classList.remove('active');
        }, 5000);
      }
    });
  }
}

/* ==========================================================================
   6. HERO DYNAMIC BACKGROUND VIDEO INITIALIZER & GPU RESOURCE OPTIMIZER
   ========================================================================== */
function initHeroBackgroundVideo() {
  const video = document.querySelector('.hero-main-video');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (prefersReducedMotion || connection?.saveData) return;

  const source = video.querySelector('source[data-src]');
  if (!source) return;

  let isLoaded = false;
  const loadVideo = () => {
    if (isLoaded) return;
    isLoaded = true;
    source.src = source.dataset.src;
    source.removeAttribute('data-src');
    video.load();
    tryPlay();
  };

  const scheduleVideo = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadVideo, { timeout: 3000 });
    } else {
      window.setTimeout(loadVideo, 2000);
    }
  };

  const tryPlay = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser prevented autoplay (e.g. iOS Low Power Mode).
        const onFirstTouch = () => {
          video.play().catch(() => {});
          window.removeEventListener('touchstart', onFirstTouch);
          window.removeEventListener('scroll', onFirstTouch);
          window.removeEventListener('click', onFirstTouch);
        };
        window.addEventListener('touchstart', onFirstTouch, { passive: true, once: true });
        window.addEventListener('scroll', onFirstTouch, { passive: true, once: true });
        window.addEventListener('click', onFirstTouch, { passive: true, once: true });
      });
    }
  };

  // Viewport Observer: Only load when visible and PAUSE when scrolled out of view to free GPU/CPU
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!isLoaded) {
          scheduleVideo();
        } else {
          tryPlay();
        }
      } else {
        // Scrolled away: Pause 1080p decoding so scrolling remains 100% smooth!
        if (isLoaded && !video.paused) {
          video.pause();
        }
      }
    }, { threshold: 0.05 });
    videoObserver.observe(video);
  } else {
    scheduleVideo();
  }
}
