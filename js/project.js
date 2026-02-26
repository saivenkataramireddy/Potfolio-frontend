/**
 * project.js — Logic for project_detail.html
 * Reads project ID from URL params and fetches/renders the project details.
 */

async function loadProjectDetails() {
    const projectId  = new URLSearchParams(window.location.search).get('id');
    const container  = document.getElementById('project-detail');

    if (!projectId) {
        container.innerHTML = '<p>Error: No project ID provided. <a href="index.html">← Back</a></p>';
        return;
    }

    try {
        const project = await getProjectById(projectId);

        const galleryHtml = project.media?.length
            ? `<h3>Project Gallery:</h3>
               <div class="project-gallery">
                   ${project.media.map(m => `<img src="${m.image}" alt="Project media">`).join('')}
               </div><br>`
            : '';

        const videoHtml = project.video
            ? `<h3>Demo Video:</h3>
               <video controls width="500">
                   <source src="${project.video}">
               </video>`
            : '';

        container.innerHTML = `
            <div class="main-preview">
                <img src="${project.image}" class="main-img" alt="${project.title}">
            </div>

            <div class="project-info">
                <h1>${project.title}</h1>
                <p>${project.description}</p><br><br>
                <h3>Technologies Used:</h3><br>
                <p>${project.technologies}</p>
                ${galleryHtml}
                ${videoHtml}
            </div>

            <div class="project-links">
                ${project.github_link
                    ? `<a href="${project.github_link}" target="_blank" class="project-btn small-btn">💻 GitHub</a>`
                    : ''}
                ${project.live_link
                    ? `<a href="${project.live_link}" target="_blank" class="project-btn small-btn">🚀 Live</a>`
                    : ''}
                <a class="project-btn" href="index.html#projects">⬅️ Back to Projects</a>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `<p>Error: ${error.message}. <a href="index.html">← Back</a></p>`;
    }
}

loadProjectDetails();
