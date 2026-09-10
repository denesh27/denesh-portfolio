/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO SCRIPTS — DENESH BASKARAN
   1. Scroll Progress Bar & Back to Top
   2. Typed.js Hero Typewriter
   3. AOS Scroll Animations
   4. Mobile Menu Toggle
   5. Interactive Draggable Hero Badges (Playable Physics)
   6. Dynamic Timeline Scroll Progress Line & Checkpoints
   7. Copy to Clipboard Email
   8. 3D Card Perspective Tilt
   9. Active Navigation Spy
   10. Contact Form Transmission Simulation
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  /* ═══════════════════ 1. SCROLL PROGRESS BAR & BACK TO TOP ═══════════════════ */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrolled + '%';
    }

    if (backToTopBtn) {
      if (winScroll > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ═══════════════════ 2. TYPED.JS HERO TYPEWRITER ═══════════════════ */
  const typedTarget = document.getElementById('hero-typed');
  if (typedTarget && typeof Typed !== 'undefined') {
    new Typed('#hero-typed', {
      strings: [
        'Software Engineer &amp; Full-Stack Developer',
        'Enterprise Automation Builder (Flask &amp; Microsoft Graph)',
        'PERN Stack Specialist (PostgreSQL, React, Node)',
        '10x Dean\'s List Honoree (CGPA 3.75)',
        'Chin Hin Group Property Alum'
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1600,
      startDelay: 300,
      loop: true,
      showCursor: true,
      cursorChar: '▋'
    });
  }

  /* ═══════════════════ 3. AOS (ANIMATE ON SCROLL) ═══════════════════ */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 500,
      offset: 50,
      once: true,
      easing: 'ease-out-cubic'
    });
  }

  /* ═══════════════════ 4. MOBILE MENU TOGGLE ═══════════════════ */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileNavItems.forEach((item) => {
      item.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }



  /* ═══════════════════ 6. DYNAMIC TIMELINE SCROLL PROGRESS LINE ═══════════════════ */
  const journeyContainer = document.getElementById('journeyTimelineContainer');
  const progressLine = document.getElementById('journeyProgressLine');
  const checkpoints = [
    { dot: document.getElementById('checkpoint-exp-2026'), row: document.querySelector('[data-milestone="2026-work"]') },
    { dot: document.getElementById('checkpoint-2026'), row: document.querySelector('[data-milestone="2026"]') },
    { dot: document.getElementById('checkpoint-2022'), row: document.querySelector('[data-milestone="2022"]') },
    { dot: document.getElementById('checkpoint-2021'), row: document.querySelector('[data-milestone="2021"]') }
  ];

  if (journeyContainer && progressLine) {
    let ticking = false;

    function updateTimelineSpine() {
      const containerRect = journeyContainer.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Focus point where line expands (at 52% of viewport height)
      const focalY = windowH * 0.52;
      const scrollDistance = focalY - containerRect.top;
      const totalAvailable = containerRect.height - 40;

      // Calculate progress between 0 and 1
      const progress = Math.max(0, Math.min(1, scrollDistance / totalAvailable));
      const currentHeight = progress * totalAvailable;

      progressLine.style.height = `${currentHeight}px`;

      // Update checkpoint positions dynamically & active states
      checkpoints.forEach(({ dot, row }) => {
        if (!dot || !row) return;

        // Vertical position of dot aligned with milestone card header
        const rowTop = row.offsetTop + 40;
        dot.style.top = `${rowTop}px`;

        if (currentHeight >= rowTop - 15) {
          dot.classList.add('active');
          row.classList.add('timeline-passed');
        } else {
          dot.classList.remove('active');
          row.classList.remove('timeline-passed');
        }
      });

      ticking = false;
    }

    function requestTimelineUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateTimelineSpine);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
    window.addEventListener('resize', requestTimelineUpdate);
    // Initial call
    updateTimelineSpine();
  }

  /* ═══════════════════ 7. COPY TO CLIPBOARD EMAIL ═══════════════════ */
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyFeedback = document.getElementById('copyFeedback');

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener('click', async () => {
      const emailText = 'denesh040427@gmail.com';
      try {
        await navigator.clipboard.writeText(emailText);
        copyFeedback.textContent = 'COPIED TO CLIPBOARD ✓';
        copyFeedback.style.color = '#09090b';
        copyFeedback.style.fontWeight = '800';
        setTimeout(() => {
          copyFeedback.textContent = 'Click to Copy ❐';
          copyFeedback.style.color = '';
          copyFeedback.style.fontWeight = '';
        }, 3000);
      } catch (err) {
        copyFeedback.textContent = 'COPIED: ' + emailText;
      }
    });
  }

  /* ═══════════════════ 8. 3D CARD PERSPECTIVE TILT ═══════════════════ */
  const tiltCards = document.querySelectorAll(
    '.project-viewport-card-light, .journey-card-shell-dark, .contact-form-card-light'
  );

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  /* ═══════════════════ 9. ACTIVE NAV LINK SPY ═══════════════════ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-center a');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + currentId);
          });
          mobileLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + currentId);
          });
        }
      });
    },
    { threshold: 0.25 }
  );

  sections.forEach((sec) => navObserver.observe(sec));

  /* ═══════════════════ 10. FUNCTIONAL CONTACT FORM HANDLER ═══════════════════ */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const subjectInput = document.getElementById('formSubject');
      const messageInput = document.getElementById('formMsg');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value : 'Portfolio Contact Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-dot" style="width: 14px; height: 14px; border-width: 2px; border-color: rgba(255,255,255,0.3); border-top-color: #ffffff; display: inline-block;"></span>
        <span>Transmitting...</span>
      `;

      // Check if user has configured Formspree ID
      const actionUrl = contactForm.getAttribute('action') || '';
      const isEndpointConfigured = actionUrl.includes('formspree.io/f/') && !actionUrl.includes('YOUR_FORM_ID');

      if (isEndpointConfigured) {
        try {
          const formData = new FormData(contactForm);
          const response = await fetch(actionUrl, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            submitBtn.innerHTML = '<span>Message Transmitted ✓</span>';
            submitBtn.style.background = '#10b981';
            submitBtn.style.borderColor = '#10b981';
            submitBtn.style.color = '#ffffff';
            contactForm.reset();

            setTimeout(() => {
              submitBtn.innerHTML = originalHTML;
              submitBtn.style.background = '';
              submitBtn.style.borderColor = '';
              submitBtn.style.color = '';
              submitBtn.disabled = false;
            }, 4500);
            return;
          } else {
            const data = await response.json();
            throw new Error((data.errors && data.errors.map(err => err.message).join(', ')) || 'Transmission failed');
          }
        } catch (err) {
          console.warn('Formspree dispatch error, falling back to direct email:', err);
        }
      }

      // Seamless Direct Fallback: Pre-fills email to denesh040427@gmail.com
      const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - ${name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Denesh,\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\n--\nSent from denesh-portfolio website`
      );
      window.location.href = `mailto:denesh040427@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      submitBtn.innerHTML = '<span>Opening Email Client... ✓</span>';
      submitBtn.style.background = '#09090b';
      submitBtn.style.color = '#ffffff';

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 4000);
    });
  }

  /* ═══════════════════ 11. CASE STUDY DATA & MODAL CONTROLLER ═══════════════════ */
  const caseStudies = {
    'mr-tasky': {
      category: 'FULL-STACK WEB APP',
      title: 'MR. TASKY',
      problem:
        'The local home contractor sector suffers from extreme fragmentation, opaque pricing, and lack of verified contractor credentials. Homeowners waste hours calling unvetted classifieds, while skilled providers lack a standardized digital platform to manage bookings and prove their track record.',
      solution:
        'Engineered a complete full-stack PERN (PostgreSQL, Express.js, React.js, Node.js) marketplace featuring three distinct portals: Customer, Provider, and Administrator. Implemented live Leaflet.js interactive geolocation mapping, JWT RBAC security, and an automated booking and status progression workflow.',
      background:
        'Developed as an intensive agile software engineering project to modernize on-demand services across the Klang Valley region. Prioritized 3NF relational database schema design, resilient error handling, responsive mobile layouts, and strict data validation across client and server.',
      features: [
        'Multi-Role JWT Authentication & Role-Based Access Control (RBAC)',
        'Interactive Geolocation Service Provider Map (Leaflet.js API)',
        'Dynamic Service Booking & Real-Time Status Lifecycle',
        'Relational 3NF PostgreSQL Database with Connection Pooling',
        'Mobile-First Responsive Interface built with Tailwind CSS & daisyUI'
      ],
      visitUrl: 'https://mr-tasky-frontend-trial.vercel.app/main',
      visitText: 'VISIT SITE ↗'
    },
    'book4u': {
      category: 'FULL-STACK WEB APP',
      title: 'BOOK4U',
      problem:
        'Event coordinators experienced frequent manual registration discrepancies, double-allocated seat reservations, and lengthy delays in distributing entry tickets via paper receipts and manual bank transfers during high-turnout events.',
      solution:
        'Engineered a centralized event management and ticketing platform in PHP and MySQL with integrated Stripe Sandbox payment checkout. Automatically locks seat inventory during checkout and dispatches verifiable e-tickets with QR transaction tokens directly to attendees.',
      background:
        'Architected using the Model-View-Controller (MVC) pattern to separate business rules, view templates, and relational data queries. Verified through automated unit test suites and rigorous boundary testing under simulated peak load conditions.',
      features: [
        'Stripe Sandbox Payment Gateway Integration with Webhook Verification',
        'Dynamic Tiered Seat Allocation with Instant Lock Logic',
        'Automated Confirmation Email & E-Ticket Generation Engine',
        'Modular PHP MVC Architecture & Unit-Tested Business Logic',
        'Relational MySQL Schema with Normalized Booking Transaction Tables'
      ],
      visitUrl: 'https://book4u-r3vx.onrender.com/homepage.html',
      visitText: 'VISIT SITE ↗'
    },
    'saviour': {
      category: 'HEALTHCARE UI/UX PROTOTYPE',
      title: 'SAVIOUR',
      problem:
        'During critical health emergencies, patients experience extreme panic and cognitive impairment. Conventional healthcare apps overload users with complex multi-level menus and medical jargon that delay urgent intervention.',
      solution:
        'Designed an ultra-accessible, minimalist mobile emergency healthcare application prototype. Built around an immediate 1-tap SOS broadcast, dynamic closest-hospital routing, and an interactive Dr. AI symptom triage workflow.',
      background:
        'Researched and designed following Human-Computer Interaction (HCI) standards, Don Norman’s design principles, and Jakob Nielsen’s 10 Usability Heuristics. Evaluated through wireframing iterations, user journey testing, and WCAG AAA color contrast validation.',
      features: [
        '1-Tap Emergency SOS Broadcast with Live GPS Coordinates Dispatch',
        'Real-Time Nearby Hospital & Emergency Clinic Radar Map',
        'Dr. AI Interactive Conversational Symptom Triage Tree',
        'Appointment Booking & Medical Record Management Interface',
        'High-Contrast WCAG AAA Accessible Typography & Color System'
      ],
      visitUrl: 'https://www.figma.com/',
      visitText: 'VISIT FIGMA PROTOTYPE ↗'
    },
    'gmc': {
      category: 'PRODUCTION WEB PLATFORM',
      title: 'G.M.C MULTIMEDIA CENTER',
      problem:
        'A local computer and multimedia hardware business had no online footprint, forfeiting qualified regional search traffic and struggling to showcase custom PC builds and repair services to local customers.',
      solution:
        'Engineered and deployed a zero-bloat, high-performance responsive landing page deployed directly to Netlify’s global edge CDN. Achieved sub-second loading without bulky external CSS frameworks, backed by automated GitHub CI/CD webhooks.',
      background:
        'Engineered with an emphasis on production performance engineering and search engine optimization. Achieved near-perfect 99+ Lighthouse metrics across Performance, Accessibility, Best Practices, and SEO.',
      features: [
        'Sub-Second Global Asset Delivery on Netlify Edge CDN',
        'Automated Continuous Deployment via GitHub Webhook Integration',
        '100% Fluid Responsive Layout across Mobile, Tablet, and Desktop',
        'Zero-Dependency Vanilla JavaScript Interactive Product Components',
        'Semantic HTML5 Architecture with Schema Structured Data'
      ],
      visitUrl: 'https://gmc-multimedia-computer.netlify.app/',
      visitText: 'VISIT SITE ↗'
    },
    'movie-listing': {
      category: 'REACT.JS WEB APP',
      title: 'MOVIE LISTING',
      problem:
        'Entertainment enthusiasts often deal with sluggish movie discovery portals that trigger full page reloads, lack debounced search capabilities, and present cluttered, unresponsive grid layouts on mobile devices.',
      solution:
        'Built a high-performance React.js single-page application integrating The Movie Database (TMDB) RESTful API. Implements asynchronous fetch queries, debounced live keyword filtering, and responsive poster cards with comprehensive modal details.',
      background:
        'Developed to master modern React component architecture, custom state management hooks (`useState`, `useEffect`), clean component separation, error boundary fallbacks, and production deployment on Netlify.',
      features: [
        'Real-Time TMDB REST API Integration with Dynamic Pagination',
        'Debounced Search Input with Asynchronous Result Handling',
        'Interactive Modal Flyout with Detailed Cast, Synopsis, and Ratings',
        'Responsive CSS Grid Layout with Graceful Skeleton Loading States',
        'Single Page Application (SPA) Client-Side Route State'
      ],
      visitUrl: 'https://movies-den.netlify.app/',
      visitText: 'VISIT SITE ↗'
    }
  };

  const caseStudyModal = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategoryTag = document.getElementById('modalCategoryTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalProblemText = document.getElementById('modalProblemText');
  const modalSolutionText = document.getElementById('modalSolutionText');
  const modalBackgroundText = document.getElementById('modalBackgroundText');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const modalVisitSiteLink = document.getElementById('modalVisitSiteLink');

  const openCaseStudy = (projectId) => {
    const data = caseStudies[projectId];
    if (!data || !caseStudyModal) return;

    if (modalCategoryTag) modalCategoryTag.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalProblemText) modalProblemText.textContent = data.problem;
    if (modalSolutionText) modalSolutionText.textContent = data.solution;
    if (modalBackgroundText) modalBackgroundText.textContent = data.background;

    if (modalFeaturesList) {
      modalFeaturesList.innerHTML = data.features
        .map((feat) => `<li>${feat}</li>`)
        .join('');
    }

    if (modalVisitSiteLink) {
      modalVisitSiteLink.href = data.visitUrl;
      modalVisitSiteLink.textContent = data.visitText || 'VISIT SITE ↗';
    }

    caseStudyModal.classList.add('open');
    caseStudyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCaseStudy = () => {
    if (!caseStudyModal) return;
    caseStudyModal.classList.remove('open');
    caseStudyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.btn-read-case-study[data-project]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const proj = btn.getAttribute('data-project');
      openCaseStudy(proj);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCaseStudy);
  }

  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) {
        closeCaseStudy();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseStudyModal && caseStudyModal.classList.contains('open')) {
      closeCaseStudy();
    }
  });

  /* ═══════════════════ 12. BROWSER FRAME VIEW TOGGLES (LIVE / ARCH) ═══════════════════ */
  document.querySelectorAll('.project-browser-frame').forEach((frame) => {
    const toggleBtns = frame.querySelectorAll('.view-toggle-btn');
    const liveView = frame.querySelector('.browser-live-view');
    const archView = frame.querySelector('.browser-arch-view');

    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-view');
        toggleBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (targetView === 'live') {
          if (liveView) liveView.classList.add('active');
          if (archView) archView.classList.remove('active');
          scaleProjectIframes();
        } else if (targetView === 'arch') {
          if (archView) archView.classList.add('active');
          if (liveView) liveView.classList.remove('active');
        }
      });
    });
  });

  /* ═══════════════════ 13. IFRAME ZOOM-OUT DESKTOP FIT & LOAD DETECTION ═══════════════════ */
  function scaleProjectIframes() {
    const screens = document.querySelectorAll('.browser-viewport-screen');
    screens.forEach((screen) => {
      const iframe = screen.querySelector('.live-project-iframe');
      if (!iframe) return;

      const containerWidth = screen.clientWidth;
      const containerHeight = screen.clientHeight;
      if (!containerWidth || !containerHeight) return;

      // Target standard desktop width to force full desktop layout without mobile drawers
      const targetWidth = parseInt(iframe.getAttribute('data-target-width') || '1280', 10);
      const scale = containerWidth / targetWidth;
      const scaledHeight = containerHeight / scale;

      screen.style.setProperty('--iframe-width', `${targetWidth}px`);
      screen.style.setProperty('--iframe-height', `${scaledHeight}px`);
      screen.style.setProperty('--iframe-scale', scale);

      iframe.style.width = `${targetWidth}px`;
      iframe.style.height = `${scaledHeight}px`;
      iframe.style.transform = `scale(${scale})`;
      iframe.style.transformOrigin = '0 0';
    });
  }

  // Initial scaling calculation
  scaleProjectIframes();

  // Watch for container resizes (responsive window, orientation, zoom)
  if (window.ResizeObserver) {
    const iframeResizeObserver = new ResizeObserver(() => {
      scaleProjectIframes();
    });
    document.querySelectorAll('.browser-viewport-screen').forEach((screen) => {
      iframeResizeObserver.observe(screen);
    });
  } else {
    window.addEventListener('resize', scaleProjectIframes);
  }

  document.querySelectorAll('.live-project-iframe').forEach((iframe) => {
    const parentLiveView = iframe.closest('.browser-live-view');
    const loader = parentLiveView ? parentLiveView.querySelector('.iframe-loading-indicator') : null;

    if (loader) {
      iframe.addEventListener('load', () => {
        loader.classList.add('loaded');
        scaleProjectIframes();
      });
      setTimeout(() => {
        loader.classList.add('loaded');
        scaleProjectIframes();
      }, 3500);
    }
  });

  /* ═══════════════════ 14. SAVIOUR PROTOTYPE SIMULATOR TABS ═══════════════════ */
  const saviourTabs = document.querySelectorAll('.prototype-tab-btn');
  const saviourTitle = document.getElementById('saviourFlowTitle');
  const saviourDesc = document.getElementById('saviourFlowDesc');

  const saviourFlowData = {
    sos: {
      title: '1-Tap Emergency SOS Broadcast',
      desc: 'Triggers instant high-priority GPS coordinates transmission to nearest responders with audible confirmation countdown and silent override option.'
    },
    map: {
      title: 'Real-Time Nearest Hospital Radar',
      desc: 'Calculates live travel time to closest accredited emergency departments with real-time bed availability and turn-by-turn navigation.'
    },
    ai: {
      title: 'Dr. AI Symptom Triage Conversational Tree',
      desc: 'Natural language heuristic symptom intake providing immediate risk categorization (Red: Call 999, Amber: Urgent Care, Green: Self Care).'
    }
  };

  saviourTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const flow = tab.getAttribute('data-flow');
      saviourTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      if (saviourFlowData[flow]) {
        if (saviourTitle) saviourTitle.textContent = saviourFlowData[flow].title;
        if (saviourDesc) saviourDesc.textContent = saviourFlowData[flow].desc;
      }
    });
  });

  /* ═══════════════════ 15. AWARDS MULTI-PICTURE GALLERY & LIGHTBOX ═══════════════════ */
  /**
   * 📁 AWARDS PHOTO CONFIGURATION
   * Put or swap your pictures from the "awards" folder right here!
   * - src: Image path from the awards folder (e.g. 'awards/your_photo.jpeg')
   * - label: Button label shown on thumbnail strip (e.g. 'Stage Award', 'Presentation')
   * - caption: Descriptive text shown inside the full-screen Lightbox
   */
  const awardGalleries = {
    'award-1': {
      title: 'Final Year Project Best Presenter Award',
      institution: 'UNITAR International University · 04/2026',
      photos: [
        {
          src: 'awards/WhatsApp Image 2026-09-10 at 21.16.43.jpeg',
          label: 'Stage Award',
          caption: 'Stage Commendation & Award Presentation by Faculty Dean'
        },
        {
          src: 'awards/WhatsApp Image 2026-09-10 at 21.16.42.jpeg',
          label: 'Presentation',
          caption: 'Final Year Project Technical Defense & Live Demonstration'
        },
        {
          src: 'awards/WhatsApp Image 2026-09-10 at 21.16.42 (1).jpeg',
          label: 'Defense Room',
          caption: 'Full-Stack Architecture Defense before Faculty Assessment Panel'
        }
      ]
    },
    'award-2': {
      title: 'System Analysis & Design Best Idea Pitching',
      institution: 'UNITAR International University · 09/2024',
      photos: [
        {
          src: 'awards/WhatsApp Image 2026-09-10 at 21.16.44.jpeg',
          label: '1st Prize Team',
          caption: '1st Place Winner Team Presentation with Award Hamper'
        },
        {
          src: 'awards/WhatsApp Image 2026-09-10 at 21.16.44 (1).jpeg',
          label: 'Award Hamper',
          caption: 'Best Idea Pitching Winner Hamper & Recognition'
        },
        {
          src: 'awards/WhatsApp Image 2026-09-10 at 21.16.43 (3).jpeg',
          label: 'Project Poster',
          caption: 'Mr. Tasky Systems Analysis & Design Exhibition Board'
        }
      ]
    },
    'award-3': {
      title: "10x Consecutive Dean's List Distinction",
      institution: 'UNITAR International University · 2023 – 2026',
      photos: [
        {
          src: 'awards/WhatsApp Image 2026-09-10 at 21.16.43 (1).jpeg',
          label: 'Dean Award 1',
          caption: "Dean's List Award Ceremony Certificate"
        },
        {
          src: 'awards/WhatsApp Image 2026-09-10 at 21.16.43 (2).jpeg',
          label: 'Dean Award 2',
          caption: "Dean's List Academic Distinction Certificate"
        },
        {
          src: 'awards/WhatsApp Image 2026-09-10 at 21.16.44 (2).jpeg',
          label: 'Dean Award 3',
          caption: "Continuous Academic Excellence Honor Citation"
        }
      ]
    },
    'award-4': {
      title: 'Project Lead – AI Education Workshop',
      institution: 'Petaling Jaya, Selangor · 08/2025',
      photos: [
        {
          src: 'awards/WhatsApp Image 2026-09-10 at 21.36.57.jpeg',
          label: 'Speaker',
          caption: 'Project Lead conducting GenAI Prompt Engineering session for 200 secondary students'
        },
        {
          src: 'awards/DSC05733-web.jpg',
          label: '200 Students',
          caption: '200 High School Students & Organizing Committee in Hall'
        },
        {
          src: 'awards/DSC05476-web.jpg',
          label: 'Interactive Lab',
          caption: 'Hands-on Interactive AI Prompt Engineering Lab across 5 Regional Schools'
        }
      ]
    }
  };

  function renderAwardGraphicHTML(photo) {
    if (photo && photo.src && photo.src.trim() !== '') {
      return `<img src="${photo.src}" class="award-real-photo" alt="${photo.caption || photo.label || 'Award Photo'}" loading="lazy" />`;
    }

    // Fallback simulated graphic if photo.src is not yet specified
    let ribbonModifier = '';
    if (photo && photo.theme === 'emerald-theme') ribbonModifier = 'emerald';
    else if (photo && photo.theme === 'purple-theme') ribbonModifier = 'purple';
    else if (photo && photo.theme === 'blue-theme') ribbonModifier = 'blue';

    return `
      <div class="award-cert-graphic ${photo ? (photo.theme || 'gold-theme') : 'gold-theme'}">
        <div class="cert-gold-ribbon ${ribbonModifier}">${photo ? (photo.ribbon || '★ AWARD HONORS ★') : '★ AWARD HONORS ★'}</div>
        <div class="cert-big-icon">${photo ? (photo.icon || '🏆') : '🏆'}</div>
        <h4 class="cert-main-head">${photo ? (photo.head || photo.label || 'Award Certificate') : 'Award Certificate'}</h4>
        <p class="cert-sub-head">${photo ? (photo.sub || photo.caption || '') : ''}</p>
        <span class="cert-institution">${photo ? (photo.inst || '') : ''}</span>
      </div>
    `;
  }

  // Active state tracker for each award
  const awardActivePhotoIndex = {
    'award-1': 1,
    'award-2': 1,
    'award-3': 1,
    'award-4': 1
  };

  window.switchAwardPhoto = function(awardId, photoNumber) {
    const data = awardGalleries[awardId];
    if (!data || !data.photos[photoNumber - 1]) return;

    awardActivePhotoIndex[awardId] = photoNumber;
    const photo = data.photos[photoNumber - 1];

    const displayFrame = document.getElementById(`display-${awardId}`);
    if (displayFrame) {
      displayFrame.style.opacity = '0';
      setTimeout(() => {
        displayFrame.innerHTML = renderAwardGraphicHTML(photo);
        displayFrame.style.opacity = '1';
      }, 150);
    }

    const counter = document.getElementById(`counter-${awardId}`);
    if (counter) {
      counter.textContent = `Photo ${photoNumber} of ${data.photos.length}`;
    }

    // Update thumbnail buttons
    const galleryCol = document.getElementById(`gallery-${awardId}`);
    if (galleryCol) {
      const thumbBtns = galleryCol.querySelectorAll('.award-thumb-btn');
      thumbBtns.forEach((btn, index) => {
        btn.classList.toggle('active', index === (photoNumber - 1));
      });
    }
  };

  // Initialize and synchronize all award galleries
  function initAwardGalleries() {
    Object.keys(awardGalleries).forEach((awardId) => {
      const data = awardGalleries[awardId];
      if (!data || !data.photos || !data.photos.length) return;

      const firstPhoto = data.photos[0];
      const displayFrame = document.getElementById(`display-${awardId}`);
      if (displayFrame && firstPhoto.src && firstPhoto.src.trim() !== '') {
        displayFrame.innerHTML = renderAwardGraphicHTML(firstPhoto);
      }

      const counter = document.getElementById(`counter-${awardId}`);
      if (counter) {
        counter.textContent = `Photo 1 of ${data.photos.length}`;
      }

      const galleryCol = document.getElementById(`gallery-${awardId}`);
      if (galleryCol) {
        const thumbBtns = galleryCol.querySelectorAll('.award-thumb-btn');
        thumbBtns.forEach((btn, index) => {
          const photo = data.photos[index];
          if (!photo) return;
          const labelSpan = btn.querySelector('span');
          if (labelSpan && photo.label) labelSpan.textContent = photo.label;

          const mini = btn.querySelector('.thumb-mini');
          if (mini && photo.src && photo.src.trim() !== '') {
            mini.innerHTML = `<img src="${photo.src}" class="thumb-mini-img" alt="${photo.label || ''}">`;
          }
        });
      }
    });
  }

  initAwardGalleries();

  // Lightbox state
  let currentLightboxAward = 'award-1';
  let currentLightboxIndex = 0;

  const lightboxModal = document.getElementById('awardLightboxModal');
  const lightboxStage = document.getElementById('lightboxStage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');

  function updateLightboxView() {
    const data = awardGalleries[currentLightboxAward];
    if (!data) return;

    const photo = data.photos[currentLightboxIndex];
    if (lightboxStage) {
      lightboxStage.innerHTML = renderAwardGraphicHTML(photo);
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = photo.caption || photo.head;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${data.photos.length}`;
    }
  }

  window.openAwardLightbox = function(awardId, photoNumber) {
    currentLightboxAward = awardId;
    if (typeof photoNumber === 'number') {
      currentLightboxIndex = photoNumber - 1;
    } else {
      currentLightboxIndex = (awardActivePhotoIndex[awardId] || 1) - 1;
    }

    if (lightboxModal) {
      updateLightboxView();
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeAwardLightbox = function(event) {
    if (event && event.target && !event.target.classList.contains('award-lightbox-modal') && !event.target.classList.contains('lightbox-close-btn')) {
      return;
    }
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.nextLightboxPhoto = function() {
    const data = awardGalleries[currentLightboxAward];
    if (!data) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % data.photos.length;
    updateLightboxView();
  };

  window.prevLightboxPhoto = function() {
    const data = awardGalleries[currentLightboxAward];
    if (!data) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + data.photos.length) % data.photos.length;
    updateLightboxView();
  };

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') {
      window.closeAwardLightbox();
    } else if (e.key === 'ArrowRight') {
      window.nextLightboxPhoto();
    } else if (e.key === 'ArrowLeft') {
      window.prevLightboxPhoto();
    }
  });

  // Touch swipe gesture support for mobile/tablet lightbox navigation
  if (lightboxModal) {
    let touchStartX = 0;
    let touchStartY = 0;

    lightboxModal.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches && e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      },
      { passive: true }
    );

    lightboxModal.addEventListener(
      'touchend',
      (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.changedTouches && e.changedTouches.length === 1) {
          const diffX = e.changedTouches[0].clientX - touchStartX;
          const diffY = e.changedTouches[0].clientY - touchStartY;

          // Only trigger if primarily horizontal swipe of at least 40px
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
              window.nextLightboxPhoto();
            } else {
              window.prevLightboxPhoto();
            }
          }
        }
      },
      { passive: true }
    );
  }
});
