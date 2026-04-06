/* ═══════════════════ TERMINAL TYPEWRITER ═══════════════════ */
const LINES = [
  { t: "cmd", text: "whoami" },
  {
    t: "out",
    text: "→ Software Engineer · 8th Semester · UNITAR International University",
  },
  { t: "out", text: "→ Full-Stack Developer · PERN · PHP/MySQL · Malaysia" },
  { t: "cmd", text: "ls ./projects/" },
  {
    t: "out",
    text: "mr-tasky/    book4u/    saviour/    gmc-multimedia/    movie-listing/",
  },
  { t: "cmd", text: "cat ./projects/index.log" },

  {
    t: "out",
    text: "[001] Mr. Tasky .......... PERN · PostgreSQL · Service App",
  },
  {
    t: "out",
    text: "[002] Book4U ............. PHP/MySQL · Full-Stack · Events",
  },
  {
    t: "out",
    text: "[003] Saviour ............ Figma · UX/UI · Healthcare App",
  },
  {
    t: "out",
    text: "[004] G.M.C Multimedia ... HTML/CSS/JS · Landing Page",
  },
  {
    t: "out",
    text: "[005] Movie Listing ...... React.js · TMDB API · Live Site",
  },
  { t: "cmd", text: "status --seeking-internship" },
  {
    t: "green",
    text: "→ ● OPEN TO WORK — Internship — Contact me below",
  },
  { t: "cursor" },
];

const body = document.getElementById("termBody");
let li = 0,
  ci = 0,
  el = null;

function type() {
  if (li >= LINES.length) return;
  const ln = LINES[li];

  if (!el) {
    el = document.createElement("div");
    if (ln.t === "cmd") {
      el.innerHTML =
        '<span class="t-prompt">denesh@portfolio</span>' +
        '<span class="t-sym">:</span><span class="t-path">~</span>' +
        '<span class="t-sym">$ </span><span class="t-cmd" id="tt"></span>';
    } else if (ln.t === "out") {
      el.innerHTML = '<span class="t-out" id="tt"></span>';
    } else if (ln.t === "green") {
      el.innerHTML = '<span class="t-green" id="tt"></span>';
    } else {
      el.innerHTML =
        '<span class="t-prompt">denesh@portfolio</span>' +
        '<span class="t-sym">:</span><span class="t-path">~</span>' +
        '<span class="t-sym">$ </span><span class="cursor"></span>';
      body.appendChild(el);
      li++;
      el = null;
      return;
    }
    body.appendChild(el);
    ci = 0;
  }

  const tt = el.querySelector("#tt");
  if (tt && ci < ln.text.length) {
    tt.textContent += ln.text[ci++];
    body.scrollTop = body.scrollHeight;
    setTimeout(type, ln.t === "cmd" ? 35 + Math.random() * 45 : 8);
  } else {
    li++;
    el = null;
    setTimeout(type, ln.t === "cmd" ? 280 : 60);
  }
}
setTimeout(type, 900);

/* ═══════════════════ INTERSECTION OBSERVER — FADE IN ═══════════════════ */
const fadeObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
);
document.querySelectorAll(".fade-in").forEach((el) => fadeObs.observe(el));

/* ═══════════════════ SKILL BAR ANIMATION ═══════════════════ */
const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".skill-fill").forEach((f, i) => {
          setTimeout(() => {
            f.style.width = f.dataset.w + "%";
          }, i * 80);
        });
        skillObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.25 },
);
const sg = document.getElementById("skillsGrid");
if (sg) skillObs.observe(sg);

/* ═══════════════════ ACTIVE NAV HIGHLIGHT ═══════════════════ */
const navLinks = document.querySelectorAll(".nav-links a");
const navObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((a) =>
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + e.target.id,
          ),
        );
      }
    });
  },
  { threshold: 0.45 },
);
document.querySelectorAll("section[id]").forEach((s) => navObs.observe(s));

/* ═══════════════════ CONTACT FORM ═══════════════════ */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  btn.textContent = "MESSAGE TRANSMITTED ✓";
  btn.classList.add("sent");
  setTimeout(() => {
    btn.textContent = "TRANSMIT MESSAGE →";
    btn.classList.remove("sent");
    this.reset();
  }, 3500);
});
