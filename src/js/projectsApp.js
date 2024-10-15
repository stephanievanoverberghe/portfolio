import { ProjectApi } from './api/api.js';

const projectApi = new ProjectApi('../src/data/projects.json');
let currentPage = 1;
const projectsPerPage = 8;
let currentSort = 'recent';

document.addEventListener('DOMContentLoaded', async () => {
  await populateFilters();
  await loadProjects(currentPage, '', '', currentSort);

  // Listener for category selection
  document.querySelector('#categories').addEventListener('change', async (e) => {
    const selectedCategory = e.target.value;
    updateSelectedItems(selectedCategory, 'category'); // Update category
    const selectedLanguages = getSelectedLanguages();
    await loadProjects(currentPage, selectedCategory, selectedLanguages, currentSort);
  });

  // Listener for language selection
  document.querySelector('#languages').addEventListener('change', async (e) => {
    const selectedLanguage = e.target.value;
    updateSelectedItems(selectedLanguage, 'language'); // Update languages
    const selectedCategory = document.querySelector('#categories').value;
    const selectedLanguages = getSelectedLanguages();
    await loadProjects(currentPage, selectedCategory, selectedLanguages, currentSort);
  });

  // Listener for sorting selection
  document.querySelector('#sort').addEventListener('change', async (e) => {
    currentSort = e.target.value === 'Le plus récent' ? 'recent' : 'old';
    const selectedCategory = document.querySelector('#categories').value;
    const selectedLanguages = getSelectedLanguages();
    await loadProjects(currentPage, selectedCategory, selectedLanguages, currentSort);
  });

  // Pagination controls
  document.querySelector('#prev-page').addEventListener('click', async (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      const selectedCategory = document.querySelector('#categories').value;
      const selectedLanguages = getSelectedLanguages();
      await loadProjects(currentPage, selectedCategory, selectedLanguages, currentSort);
    }
  });

  document.querySelector('#next-page').addEventListener('click', async (e) => {
    e.preventDefault();
    currentPage++;
    const selectedCategory = document.querySelector('#categories').value;
    const selectedLanguages = getSelectedLanguages();
    await loadProjects(currentPage, selectedCategory, selectedLanguages, currentSort);
  });

  await loadRecentProjects();
});

/**
 * Load projects based on page, category, languages, and sort order.
 * @param {number} page - The page number.
 * @param {string} [category] - The selected category.
 * @param {Array<string>} [languages] - The selected languages.
 * @param {string} [sort] - The sorting order ('recent' or 'old').
 */
async function loadProjects(page, category = '', languages = [], sort = 'recent') {
  const projectsContainer = document.querySelector('#projects-container');
  const paginationInfo = document.querySelector('#pagination-info');
  projectsContainer.innerHTML = '';

  // Get paginated and sorted projects
  let { projects, total } = await projectApi.getProjectsPaginated(page, projectsPerPage, sort);

  // Filter projects by category and language
  if (category) {
    projects = projects.filter(project => project.category === category);
  }
  if (languages.length > 0) {
    projects = projects.filter(project => languages.every(lang => project.skills.includes(lang)));
  }

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

/**
 * Updates selected items (category or language) and displays them as list items.
 * @param {string} selectedValue - The selected value.
 * @param {string} type - The type of selection ('category' or 'language').
 */
function updateSelectedItems(selectedValue, type) {
  const selectedItemsList = document.querySelector('#selected-items');

  if (type === 'category') {
    // Remove the old category if it exists
    const existingCategory = selectedItemsList.querySelector(`[data-type="category"]`);
    if (existingCategory) {
      existingCategory.remove();
    }

    // Add the new category
    const li = document.createElement('li');
    li.classList.add('flex', 'w-48', 'items-center', 'justify-between', 'rounded-lg', 'bg-red-pink-600', 'px-4', 'py-2', 'text-sm', 'text-red-pink-100');
    li.dataset.type = 'category';
    li.dataset.value = selectedValue;
    li.innerHTML = `
      ${selectedValue}
      <i class="fas fa-times cursor-pointer"></i>
    `;

    // Remove the item when clicking the cross
    li.querySelector('i').addEventListener('click', async () => {
      li.remove();
      document.querySelector('#categories').value = '';
      const selectedLanguages = getSelectedLanguages();
      await loadProjects(currentPage, '', selectedLanguages, currentSort);
    });

    selectedItemsList.appendChild(li);
  } else if (type === 'language') {
    // Check if the language is already selected
    if (!selectedItemsList.querySelector(`[data-type="language"][data-value="${selectedValue}"]`)) {
      const li = document.createElement('li');
      li.classList.add('flex', 'w-48', 'items-center', 'justify-between', 'rounded-lg', 'bg-red-pink-600', 'px-4', 'py-2', 'text-sm', 'text-red-pink-100');
      li.dataset.type = 'language';
      li.dataset.value = selectedValue;
      li.innerHTML = `
        ${selectedValue}
        <i class="fas fa-times cursor-pointer"></i>
      `;

      // Remove the item when clicking the cross
      li.querySelector('i').addEventListener('click', async () => {
        li.remove();
        const selectedCategory = document.querySelector('#categories').value;
        const selectedLanguages = getSelectedLanguages();
        await loadProjects(currentPage, selectedCategory, selectedLanguages, currentSort);
      });

      selectedItemsList.appendChild(li);
    }
  }
}

/**
 * Gets the selected languages from the displayed items in the list.
 * @returns {Array<string>} - An array of selected languages.
 */
function getSelectedLanguages() {
  const selectedItems = document.querySelectorAll('#selected-items [data-type="language"]');
  return Array.from(selectedItems).map(item => item.dataset.value);
}

/**
 * Populates the category and language selection filters.
 */
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

/**
 * Loads the most recent projects and displays them in the recent projects section.
 */
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
