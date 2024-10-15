import { ProjectApi } from './api/api.js';

const projectApi = new ProjectApi('../src/data/projects.json');
let currentPage = 1;
const projectsPerPage = 8;

// Définit le tri par défaut (du plus récent au plus ancien)
let currentSort = 'recent';

document.addEventListener('DOMContentLoaded', async () => {
  await populateFilters();
  updateCategoryTitle("Tous les projets");

  // Charger les projets triés par défaut (du plus récent au plus ancien)
  await loadProjects(currentPage, '', '', currentSort);

  // Écouteur pour la sélection de catégorie
  document.querySelector('#categories').addEventListener('change', async (e) => {
    const selectedCategory = e.target.value;
    const selectedLanguage = document.querySelector('#languages').value;
    updateCategoryTitle(selectedCategory || "Tous les projets");
    await loadProjects(currentPage, selectedCategory, selectedLanguage, currentSort);
  });

  // Écouteur pour la sélection de langage
  document.querySelector('#languages').addEventListener('change', async (e) => {
    const selectedLanguage = e.target.value;
    const selectedCategory = document.querySelector('#categories').value;
    await loadProjects(currentPage, selectedCategory, selectedLanguage, currentSort);
  });

  // Écouteur pour la sélection du tri (plus récent ou plus ancien)
  document.querySelector('#sort').addEventListener('change', async (e) => {
    const selectedSort = e.target.value;
    const selectedCategory = document.querySelector('#categories').value;
    const selectedLanguage = document.querySelector('#languages').value;
    await loadProjects(currentPage, selectedCategory, selectedLanguage, selectedSort);
  });

  // Écouteurs pour la pagination
  document.querySelector('#prev-page').addEventListener('click', async (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      const selectedCategory = document.querySelector('#categories').value;
      const selectedLanguage = document.querySelector('#languages').value;
      await loadProjects(currentPage, selectedCategory, selectedLanguage, currentSort);
    }
  });

  document.querySelector('#next-page').addEventListener('click', async (e) => {
    e.preventDefault();
    currentPage++;
    const selectedCategory = document.querySelector('#categories').value;
    const selectedLanguage = document.querySelector('#languages').value;
    await loadProjects(currentPage, selectedCategory, selectedLanguage, currentSort);
  });

  await loadRecentProjects();
});

async function loadProjects(page, category = '', language = '', sort = 'recent') {
  const projectsContainer = document.querySelector('#projects-container');
  const paginationInfo = document.querySelector('#pagination-info');
  projectsContainer.innerHTML = '';

  // Obtenez les projets paginés et triés par la méthode getProjectsPaginated
  let { projects, total } = await projectApi.getProjectsPaginated(page, projectsPerPage, sort);

  // Appliquez les filtres pour la catégorie et le langage
  if (category) {
    projects = projects.filter(project => project.category === category);
  }
  if (language) {
    projects = projects.filter(project => project.skills.includes(language));
  }

  // Générez l'affichage des projets
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
  document.querySelector('#prev-page').disabled = page === 1;
  document.querySelector('#next-page').disabled = (page * projectsPerPage) >= total;
}

async function populateFilters() {
  const categoriesSelect = document.querySelector('#categories');
  const languagesSelect = document.querySelector('#languages');
  const data = await projectApi.get();

  const uniqueCategories = [...new Set(data.projects.map(p => p.category))];
  const uniqueLanguages = [...new Set(data.projects.flatMap(p => p.skills))];

  categoriesSelect.innerHTML = `<option value="">-- Catégories --</option>`;
  uniqueCategories.forEach(category => {
    categoriesSelect.innerHTML += `<option value="${category}">${category}</option>`;
  });

  languagesSelect.innerHTML = `<option value="">-- Langages --</option>`;
  uniqueLanguages.forEach(language => {
    const capitalizedLanguage = language.charAt(0).toUpperCase() + language.slice(1);
    languagesSelect.innerHTML += `<option value="${language}">${capitalizedLanguage}</option>`;
  });
}

function updateCategoryTitle(selectedCategory) {
  const titleElement = document.querySelector('h2');
  titleElement.textContent = selectedCategory || 'Tous les projets';
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
