
console.log("Welcome to my portfolio!");

const typingElement = document.getElementById("typing");

const roles = ["Web Developer", "AI Enthusiast"];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    typingElement.textContent = currentRole.substring(0, charIndex);

    if (!deleting && charIndex < currentRole.length) {
        charIndex++;
        setTimeout(typeEffect, 120);
    } 
    else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 60);
    } 
    else {
        deleting = !deleting;

        if (!deleting) {
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, 800);
    }
}

if (typingElement) {
    typeEffect();
}
// Scroll Reveal Animation

const revealElements = document.querySelectorAll(
    "section, .project-card, .skill-card, .info-card, .contact-card"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});
// Back to Top Button

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// Custom Cursor Glow

const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";
});