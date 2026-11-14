/* =========================================
   PORTFOLIO 2.0 — INTERACTIONS
========================================= */


/* 1. TYPING ANIMATION */

const typingElement = document.getElementById("typing");

const roles = [
    "Web Developer",
    "AI Enthusiast",
    "Creative Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

    }

    setTimeout(typeEffect, deleting ? 45 : 100);
}

typeEffect();


/* 2. MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });

    });

}


/* 3. BACK TO TOP BUTTON */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* 4. SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-main, .about-stat, .about-side, " +
    ".education-card, .project-card, .contact-content, .contact-links"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});
// PREPARE CINEMATIC SECTION REVEAL
const cinematicSections = document.querySelectorAll(".section");

cinematicSections.forEach(section => {
    section.classList.add("cinematic-hidden");
});

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

    entry.target.classList.add("visible");

    if (entry.target.classList.contains("section")) {
        entry.target.classList.remove("cinematic-hidden");
        entry.target.classList.add("cinematic-visible");
    }

} else {

    entry.target.classList.remove("visible");

    if (entry.target.classList.contains("section")) {
        entry.target.classList.remove("cinematic-visible");
        entry.target.classList.add("cinematic-hidden");
    }

}

    });

}, {
    threshold: 0.01,
    rootMargin: "0px 0px 180px 0px"
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

cinematicSections.forEach(section => {
    revealObserver.observe(section);
});



/* 6. NAVBAR SCROLL EFFECT */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }

});


/* 7. CONSOLE MESSAGE */

console.log(
    "%cWelcome to Khushi's Digital Universe!",
    "color: #c084fc; font-size: 18px; font-weight: bold;"
);
/* =================================
   CUSTOM CURSOR GLOW EFFECT
================================= */

const cursorGlowEnabled = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (cursorGlowEnabled && !reducedMotion) {

    const cursorGlow = document.createElement("div");

    cursorGlow.classList.add("cursor-glow");

    document.body.appendChild(cursorGlow);
    // CURSOR TRAILING RING
const cursorRing = document.createElement("div");
cursorRing.classList.add("cursor-ring");
document.body.appendChild(cursorRing);
    let mouseX = 0;
    let mouseY = 0;
    let animationFrame;
let ringX = 0;
let ringY = 0;
    document.addEventListener("pointermove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;
cursorRing.style.opacity = "1";
        if (!animationFrame) {

            animationFrame = requestAnimationFrame(() => {

                cursorGlow.style.transform =
                    `translate(${mouseX - 140}px, ${mouseY - 140}px)`;

                cursorGlow.style.opacity = "1";

                animationFrame = null;

            });

        }

    });
// SMOOTH CURSOR RING FOLLOW
function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.25;
ringY += (mouseY - ringY) * 0.25;

    cursorRing.style.transform =
        `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursorRing);
}

animateCursorRing();
    document.addEventListener("pointerleave", () => {
    cursorGlow.style.opacity = "0";
    cursorRing.style.opacity = "0";
});

}
/* =================================
   3D PROJECT CARD TILT EFFECT
================================= */

const projectCards = document.querySelectorAll(".project-card");
const canTilt = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;
if (canTilt && !reducedMotion) {

    projectCards.forEach(card => {

        let cardRect = null;

        card.addEventListener("pointerenter", () => {
            cardRect = card.getBoundingClientRect();
        });

        card.addEventListener("pointermove", (event) => {

            if (!cardRect) return;

            const x = event.clientX - cardRect.left;
            const y = event.clientY - cardRect.top;

            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;

            const rotateX = ((centerY - y) / centerY) * 5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        card.addEventListener("pointerleave", () => {

            card.style.transform = "";

            cardRect = null;

        });

    });

}

/* =================================
   ABOUT CARDS 3D TILT EFFECT
================================= */

const aboutCards = document.querySelectorAll(".about-stat");

if (canTilt && !reducedMotion) {

    aboutCards.forEach(card => {

        function applyTilt(event) {

            const rect = card.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const rotateX = (0.5 - y) * 24;
            const rotateY = (x - 0.5) * 24;

            card.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        card.addEventListener("pointerenter", (event) => {

            card.style.transition = "transform 0.1s ease-out";

            applyTilt(event);

        });

        card.addEventListener("pointermove", (event) => {

            card.style.transition = "transform 0.1s ease-out";

            applyTilt(event);

        });

        card.addEventListener("pointerleave", () => {

            card.style.transform = "";
            card.style.transition = "";

        });

    });

}

/* =================================
   MAGNETIC BUTTON EFFECT
================================= */

if (canTilt && !reducedMotion) {

   const magneticButtons = document.querySelectorAll(
    ".button, .nav-links .nav-contact"

);

    magneticButtons.forEach(button => {

        button.addEventListener("pointermove", (event) => {

            const rect = button.getBoundingClientRect();

            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            button.style.translate = `${x * 0.25}px ${y * 0.25}px`;

        });

        button.addEventListener("pointerleave", () => {

            button.style.translate = "0 0";

        });

    });

}
/* =================================
   HERO PARALLAX EFFECT
================================= */

const heroSection = document.querySelector(".hero");
const heroArt = document.querySelector(".hero-art");

if (heroSection && heroArt && canTilt && !reducedMotion) {

    let heroAnimationFrame;

    heroSection.addEventListener("pointermove", (event) => {

        const rect = heroSection.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        cancelAnimationFrame(heroAnimationFrame);

        heroAnimationFrame = requestAnimationFrame(() => {

           heroArt.style.translate =
    `${x * -30}px ${y * -25}px`;

heroArt.style.rotate =
    `${y * -5}deg ${x * 5}deg 0deg`;
const heroOrb = document.querySelector(".hero-orb");

if (heroOrb) {
    heroOrb.style.translate =
        `${x * 12}px ${y * 12}px`;
}
        });

    });

    heroSection.addEventListener("pointerleave", () => {

        cancelAnimationFrame(heroAnimationFrame);

       heroArt.style.translate = "0px 0px";
heroArt.style.rotate = "0deg";
const heroOrb = document.querySelector(".hero-orb");

if (heroOrb) {
    heroOrb.style.translate = "0px 0px";
}

    });

}
// SCROLL PROGRESS INDICATOR
const progressBar = document.querySelector(".scroll-progress-bar");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
});
// ACTIVE NAVIGATION ON SCROLL
const sections = document.querySelectorAll("section[id]");
const navLinksActive = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinksActive.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );
                });
            }
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


// ATTENDANCE CHART SCROLL ANIMATION

const attendanceChart = document.querySelector(".attendance-bars");

if (attendanceChart) {
    const attendanceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                attendanceChart.classList.add("is-visible");
            } else {
                attendanceChart.classList.remove("is-visible");
            }
        });
    }, {
        threshold: 0.5
    });

    attendanceObserver.observe(attendanceChart);
}

// CINEMATIC INTRO
const portfolioIntro = document.getElementById("portfolioIntro");
const portfolioContent = document.querySelector(".portfolio-content");

if (portfolioIntro && portfolioContent) {

    // Show welcome text and portrait together
    portfolioIntro.classList.add("intro-ready");

    // Reveal the homepage after the intro
    setTimeout(() => {
        portfolioContent.classList.add("content-visible");
        portfolioIntro.classList.add("intro-hidden");
    }, 4000);

    // Remove the intro completely
    setTimeout(() => {
        portfolioIntro.remove();
    }, 5300);
}

// CINEMATIC SKILLS REVEAL
const skillsSection = document.querySelector(".skills");

if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                skillsSection.classList.remove("skills-visible");

                // Restart the animation
                void skillsSection.offsetWidth;

                skillsSection.classList.add("skills-visible");
            } else {
                skillsSection.classList.remove("skills-visible");
            }
        });
    }, {
        threshold: 0.25
    });

    skillsObserver.observe(skillsSection);
}