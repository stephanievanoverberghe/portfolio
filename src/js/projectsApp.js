import { ProjectApi } from './api/api.js';

const projectApi = new ProjectApi('../src/data/projects.json');
let currentPage = 1;
const projectsPerPage = 8;

document.addEventListener('DOMContentLoaded', async () => {
    await loadProjects(currentPage);

    document.getElementById('prev-page').addEventListener('click', async (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            await loadProjects(currentPage);
        }
    });

    document.getElementById('next-page').addEventListener('click', async (e) => {
        e.preventDefault();
        currentPage++;
        await loadProjects(currentPage);
    });

    await loadRecentProjects(); // Charger les trois derniers projets
});

async function loadProjects(page) {
    const projectsContainer = document.querySelector('#projects-container');
    const paginationInfo = document.getElementById('pagination-info');
    projectsContainer.innerHTML = '';

    const { projects, total } = await projectApi.getProjectsPaginated(page, projectsPerPage);

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';
        projectElement.innerHTML = `
      <a href="../${project.link}">
        <article class="group relative flex h-96 flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br from-red-pink-100 to-red-pink-50 shadow-light-default">
          <div class="relative h-full overflow-hidden rounded-lg">
            <img src="../${project.image}" alt="" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-red-pink-300 opacity-25"></div>
          </div>
          <div class="absolute inset-0 flex flex-col justify-between lg:translate-y-full lg:transform lg:transition-transform lg:duration-500 lg:group-hover:translate-y-0">
            <div class="flex h-32 items-center justify-center rounded-t-lg">
              <div class="rounded-lg bg-red-pink-50">
                <h3 class="p-5 font-Patua text-base md:text-lg">${project.title}</h3>
              </div>
            </div>
            <div class="rounded-b-lg bg-gradient-to-br from-red-pink-100 to-red-pink-50 p-5 shadow-light-default">
              <h4 class="font-Patua text-sm uppercase tracking-[1px] text-red-pink-600 md:text-base">${project.category}</h4>
              <p class="mb-5 mt-3 text-sm leading-relaxed md:text-base">${project.description}</p>
              <div class="flex gap-4 md:gap-6">
                ${project.skills.map(skill => `
                  <div class="group flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-red-pink-100 to-red-pink-50 shadow-light-default transition-transform duration-300 md:h-12 md:w-12 lg:transform lg:hover:scale-95 lg:hover:shadow-light-pressed">
                    <img class="h-6 w-6 transition-transform duration-300 md:h-9 md:w-9 lg:transform lg:group-hover:scale-90" src="../src/assets/img/${skill}.png" alt="${skill}" />
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </article>
      </a>
    `;
        projectsContainer.appendChild(projectElement);
    });

    paginationInfo.textContent = `${page}`;

    document.getElementById('prev-page').disabled = page === 1;
    document.getElementById('next-page').disabled = (page * projectsPerPage) >= total;
}

async function loadRecentProjects() {
    const recentProjectsContainer = document.querySelector('.recent-projects');
    if (recentProjectsContainer) {
        const data = await projectApi.get();
        const projects = data.projects;
        const recentProjects = projects.slice(-3);
        recentProjects.forEach(project => {
            const projectElement = document.createElement('a');
            projectElement.href = `project.html?id=${project.id}`;
            projectElement.className = 'relative overflow-hidden rounded-lg shadow-light-default sm:h-64 lg:h-96';
            projectElement.innerHTML = `
        <img src="../${project.image}" alt="${project.title}" class="h-full w-full object-cover" />
        <div class="absolute inset-0 bg-red-pink-300 opacity-25"></div>
      `;
            recentProjectsContainer.appendChild(projectElement);
        });
    }
}
