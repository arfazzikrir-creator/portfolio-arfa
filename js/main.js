/**
 * ARFAZZIKRI RAMADHANI - PORTFOLIO JAVASCRIPT (PREMIUM LIGHT THEME)
 * Features:
 * - Robust, Non-Blocking Animations (100% Fallback Safe)
 * - Sequential Smooth Project Filtering (Zero Layout Collision)
 * - Floating Pill Navigation with Scrollspy & Smooth Scrolling
 * - 3D Parallax Tilt for Hero Profile Card
 * - Workplace Documentation Photo Lightbox
 * - Project Detail Modal Dialog
 * - Lucide Line Icons Initialization
 * - 1-Click Clipboard Copy & Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Lucide Icons Initializer ---
  const initLucide = () => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };
  initLucide();

  // --- 2. Floating Pill Nav Shrink & Scrollspy ---
  const floatingNav = document.getElementById('floatingNav');
  const navItems = document.querySelectorAll('.nav-pill-item');
  const sections = document.querySelectorAll('section[id]');

  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      floatingNav.classList.add('scrolled');
    } else {
      floatingNav.classList.remove('scrolled');
    }

    const scrollPos = window.scrollY + 220;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach((item) => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- 3. 3D Parallax Tilt for Hero Card ---
  const heroTiltCard = document.getElementById('heroCardTilt');
  if (heroTiltCard && window.matchMedia('(hover: hover)').matches) {
    heroTiltCard.addEventListener('mousemove', (e) => {
      const rect = heroTiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      heroTiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    heroTiltCard.addEventListener('mouseleave', () => {
      heroTiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  // --- 4. Sequential & Smooth Project Filtering (No Layout Overlap) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.getElementById('projectsGrid');
  let isFiltering = false;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isFiltering || btn.classList.contains('active')) return;
      isFiltering = true;

      // Active button styling
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Step 1: Fade out old cards
      projectCards.forEach((card) => {
        card.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96) translateY(6px)';
      });

      // Step 2: Swap visibility after fade-out finishes
      setTimeout(() => {
        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          const shouldShow = filterValue === 'all' || category === filterValue;

          if (shouldShow) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });

        // Step 3: Fade in matching cards sequentially
        requestAnimationFrame(() => {
          setTimeout(() => {
            projectCards.forEach((card) => {
              const category = card.getAttribute('data-category');
              const shouldShow = filterValue === 'all' || category === filterValue;

              if (shouldShow) {
                card.style.transition = 'opacity 0.25s ease, transform 0.25s ease, border-color 0.3s ease, box-shadow 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1) translateY(0)';
              }
            });
            if (typeof AOS !== 'undefined') {
              AOS.refresh();
            }
            isFiltering = false;
          }, 30);
        });
      }, 180);
    });
  });

  // --- 5. Workplace Documentation Lightbox ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxTriggers = document.querySelectorAll('.open-lightbox-btn');

  const openLightbox = (src, caption) => {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-img-src') || btn.querySelector('img')?.src;
      const caption = btn.getAttribute('data-caption') || '';
      openLightbox(src, caption);
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // --- 6. Project Detail Modal Data & Handler ---
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalContent');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const projectDetails = {
    profisiensi: {
      title: 'Academic Researcher — PROFISIENSI Journal (Dec 2024)',
      category: 'Peer-Reviewed Research Publication',
      description: 'Conducted rigorous empirical research published in PROFISIENSI Journal to determine standard production times, eliminate workstation bottlenecks, and substantially improve labor efficiency using the Stopwatch Time Study methodology.',
      highlights: [
        'Applied structured Stopwatch Time Study to measure cycle, normal, and standard times across critical assembly stations.',
        'Calculated performance ratings (Westing House system) and ergonomic allowances to optimize baseline workforce planning.',
        'Identified operational bottlenecks, providing data-backed recommendations that improve labor throughput.'
      ],
      techStack: ['Stopwatch Time Study', 'Standard Time Computation', 'Labor Efficiency Analysis', 'Work Sampling', 'Bottleneck Elimination']
    },
    phoneholder: {
      title: '3D-Printed Phone Holder Prototype',
      category: 'CAD Design & Additive Manufacturing',
      description: 'Engineered and manufactured a functional, ergonomic 3D-printed phone holder prototype designed as part of an integrated industrial engineering practicum project.',
      highlights: [
        'Modeled technical 2D blueprints and 3D solid geometries in AutoCAD adhering to strict GD&T (Geometric Dimensioning and Tolerancing).',
        'Optimized structural strength-to-weight ratio and ergonomic viewing angles for hands-free productivity.',
        'Executed 3D printing slicing and fabrication with precision tolerance validation.'
      ],
      techStack: ['AutoCAD 2D/3D', 'Additive Manufacturing (3D Printing)', 'Geometric Dimensioning & Tolerancing', 'Ergonomic Product Design']
    },
    arduinotimer: {
      title: 'Arduino-Based Timer Device',
      category: 'Hardware Prototyping & Operational Instrumentation',
      description: 'Developed an Arduino-based digital timer prototype device designed for accurate workstation cycle-time tracking, empirical time studies, and manufacturing process auditing.',
      highlights: [
        'Programmed embedded C/C++ logic on Arduino IDE to provide precise microsecond operational time capture.',
        'Integrated physical tactile trigger buttons and an intuitive digital display readout for real-time workstation logging.',
        'Tested repeatability and accuracy against industrial benchmark timing devices.'
      ],
      techStack: ['Arduino IDE', 'Embedded C/C++', 'Circuit Prototyping', 'Cycle Time Measurement', 'Instrumentation']
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectDetails[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <span class="project-category-badge" style="position: static; display: inline-block; margin-bottom: 1.25rem;">${data.category}</span>
      <h3 style="font-family: var(--font-heading); font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">${data.title}</h3>
      <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.75; margin-bottom: 1.75rem;">${data.description}</p>
      
      <h4 style="font-size: 1.08rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.85rem;">Key Highlights &amp; Methodology:</h4>
      <ul style="list-style: disc; padding-left: 1.35rem; color: var(--text-secondary); margin-bottom: 1.75rem; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.98rem; line-height: 1.65;">
        ${data.highlights.map((item) => `<li>${item}</li>`).join('')}
      </ul>

      <h4 style="font-size: 1.08rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.85rem;">Competencies &amp; Tools Used:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.25rem;">
        ${data.techStack.map((tech) => `<span class="tech-chip blue">${tech}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="mailto:arfazzikrir@gmail.com" class="btn btn-primary">
          <span>Contact via Email</span>
          <i data-lucide="mail" style="width: 15px; height: 15px;"></i>
        </a>
        <button class="btn btn-secondary" onclick="document.getElementById('modalCloseBtn').click()">Close Details</button>
      </div>
    `;

    initLucide();
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('active')) closeProjectModal();
      if (lightboxModal && lightboxModal.classList.contains('active')) closeLightbox();
    }
  });

  // --- 7. Toast Notification Helper ---
  const toastBox = document.getElementById('toastBox');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  const showToast = (message) => {
    toastMessage.textContent = message;
    toastBox.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastBox.classList.remove('show');
    }, 3500);
  };

  // --- 8. Copy Email to Clipboard ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email');
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Email ${email} copied to clipboard!`);
      } catch (err) {
        showToast(`Email: ${email}`);
      }
    });
  }

  // --- 9. Contact Form Handling (Formspree AJAX Integration) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all form fields.');
        return;
      }

      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showToast('Thank you! Your message has been sent successfully.');
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => null);
          if (data && data.errors && data.errors.length) {
            showToast(data.errors.map(err => err.message).join(', '));
          } else {
            showToast('Oops! There was a problem submitting your form.');
          }
        }
      } catch (error) {
        // Fallback: submit natively if fetch fails
        contactForm.submit();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        initLucide();
      }
    });
  }
});
