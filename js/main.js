/**
 * main.js — Main page logic for index.html
 * Handles intro animation, scroll reveal, navigation, and dynamic content loading.
 */

/* ─── Footer Year ─────────────────────────────────────── */
document.getElementById('current-year').innerText = new Date().getFullYear();

/* ─── Intro Typing Animation ─────────────────────────── */
const introText    = 'K. S. V. RAMI REDDY';
const typingEl     = document.getElementById('typing-name');
const introLogo    = document.getElementById('intro-logo');
let charIndex = 0;

function typeEffect() {
    if (charIndex < introText.length) {
        typingEl.innerHTML += introText.charAt(charIndex++);
        setTimeout(typeEffect, 120);
    } else {
        introLogo.style.opacity   = '1';
        introLogo.style.transform = 'scale(1)';
        setTimeout(() => document.body.classList.add('show-site'), 1200);
    }
}

window.addEventListener('load', () => setTimeout(typeEffect, 500));

/* ─── Navbar Toggle ──────────────────────────────────── */
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

/* ─── Scroll Reveal ──────────────────────────────────── */
const revealObserver = new IntersectionObserver(
    entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            revealObserver.unobserve(entry.target);
        }
    }),
    { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Render Helpers ─────────────────────────────────── */
function renderHome(blog) {
    return `
        <div class="home-wrapper reveal show">
            <div class="home-text reveal-left show">
                <h1>Hello, It's Me</h1>
                <p id="name">${blog.name}</p>
                <p id="iam">And I am a <span>${blog.iam}</span></p>
                <p id="about_you">${blog.about_you}</p>
                <button>
                    ${blog.resume ? `<a href="${blog.resume}" target="_blank">Resume</a>` : ''}
                </button>
            </div>
            <div class="home-image reveal-right show">
                ${blog.self_introduction
                    ? `<a href="${blog.self_introduction}" target="_blank">
                           <img src="${blog.self_introduction}" alt="Profile Image">
                       </a>`
                    : ''}
            </div>
        </div>`;
}

function renderProject(project) {
    return `
        <div class="proj card reveal reveal-zoom show">
            <img src="${project.image}" alt="Project Image">
            <h2>${project.title}</h2>
            <h3>Technologies Used : ${project.technologies}</h3>
            <a class="project-btn" href="project_detail.html?id=${project.id}">🔗 View Project</a>
        </div>`;
}

function renderSkill(skill) {
    return `
        <div class="skill-card reveal show">
            <img src="${skill.icon}" alt="${skill.name}">
            <h3>${skill.name}</h3>
            <p>${skill.level || ''}</p>
        </div>`;
}

function renderJourney(step) {
    return `
        <div class="timeline-item reveal show">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h2>${step.year}</h2>
                <h3>${step.title}</h3>
                <p>${step.description}</p>
            </div>
        </div>`;
}

function renderCertification(cert) {
    return `
        <div class="cert card reveal reveal-zoom show">
            <img src="${cert.image}" alt="Certification">
            <p>${cert.description}</p>
        </div>`;
}

/* ─── Load Portfolio Data ─────────────────────────────── */
async function loadPortfolioData() {
    try {
        const data = await getPortfolioData();

        document.getElementById('home-container').innerHTML =
            data.blogs.length > 0
                ? renderHome(data.blogs[0])
                : '';

        document.getElementById('projects-container').innerHTML =
            data.projects.length > 0
                ? data.projects.map(renderProject).join('')
                : '<p class="reveal show">No Projects Available. Add Your Own Data</p>';

        document.getElementById('skills-container').innerHTML =
            data.skills.map(renderSkill).join('');

        document.getElementById('journey-container').innerHTML =
            data.journeys.length > 0
                ? data.journeys.map(renderJourney).join('')
                : '<p class="reveal show">No Journey Added. Add Your Story in Admin Panel.</p>';

        document.getElementById('certifications-container').innerHTML =
            data.certifications.length > 0
                ? data.certifications.map(renderCertification).join('')
                : '<p class="reveal show">No Certifications Available. Add From Admin.</p>';

    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

/* ─── Contact Form ───────────────────────────────────── */
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formProps = Object.fromEntries(new FormData(this));
    const responseEl = document.getElementById('contact-response');

    try {
        const { ok, data } = await submitContact(formProps);
        if (ok) {
            responseEl.style.color = 'lightgreen';
            responseEl.innerText   = 'Your message has been sent successfully!';
            this.reset();
        } else {
            responseEl.style.color = 'red';
            responseEl.innerText   = 'Error: ' + (data.error || 'Something went wrong.');
        }
    } catch {
        responseEl.innerText = 'Network Error. Please try again.';
    }
});

/* ─── Init ───────────────────────────────────────────── */
loadPortfolioData();
