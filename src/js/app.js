import { ProjectApi, AboutApi } from './api/api.js';

// Initialisation des API
const projectApi = new ProjectApi('src/data/projects.json');
const aboutApi = new AboutApi('src/data/about.json');

document.addEventListener('DOMContentLoaded', async () => {

    const projectsContainer = document.querySelector('#projects-container');
    const projects = await projectApi.getProjects();

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';
        projectElement.innerHTML = `
            <a href="pages/project.html?id=${project.id}">
                <article class="group relative flex h-96 flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br from-red-pink-100 to-red-pink-50 shadow-light-default">
                    <div class="relative h-full overflow-hidden rounded-lg">
                        <img src="${project.image}" alt="" class="h-full w-full object-cover" />
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
                                        <img class="h-6 w-6 transition-transform duration-300 md:h-9 md:w-9 lg:transform lg:group-hover:scale-90" src="src/assets/img/${skill}.png" alt="${skill}" />
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

    const { courses, experiences, skills, values } = await aboutApi.getAboutData();

    const coursesContainer = document.getElementById('courses');
    const experiencesContainer = document.getElementById('experiences');
    const skillsContainer = document.getElementById('skills-job');
    const valuesContainer = document.getElementById('values');

    coursesContainer.innerHTML = `
        <h2 class="mb-5 text-center font-Patua text-lg text-red-pink-600 sm:mb-10 md:text-2xl">Mon parcours</h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            ${courses.map(course => `
                <div class="w-full border-l-8 border-red-pink-200 bg-gradient-to-br from-red-pink-100 to-red-pink-50 pr-2 shadow-light-default">
                    <div class="grid grid-cols-[1fr] items-center gap-5 pt-4">
                        <span class="rounded-e-full bg-red-pink-200 px-7 py-2 text-xs font-bold tracking-[3px] text-red-pink-950 shadow-light-default">${course.start} à ${course.end}</span>
                        <div class="pl-4">
                            <h3 class="font-Patua text-base text-red-pink-400 md:text-lg">${course.name}</h3>
                            <span class="text-xs uppercase tracking-[1px] text-red-pink-700">${course.place}</span>
                        </div>
                    </div>
                    <ul class="list-inside list-disc p-4 text-sm leading-relaxed text-red-pink-950 md:text-base">
                        ${course.skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;

    experiencesContainer.innerHTML = `
        <h2 class="mb-5 text-center font-Patua text-lg text-red-pink-600 sm:mb-10 md:text-2xl">Mon expérience</h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            ${experiences.map(exp => `
                <div class="w-full border-l-8 border-red-pink-200 bg-gradient-to-br from-red-pink-100 to-red-pink-50 pr-2 shadow-light-default">
                    <div class="grid grid-cols-[1fr] items-center gap-5 pt-4">
                        <span class="rounded-e-full bg-red-pink-200 px-7 py-2 text-xs font-bold tracking-[3px] text-red-pink-950 shadow-light-default">${exp.start} à ${exp.end}</span>
                        <div class="pl-4">
                            <h3 class="font-Patua text-base text-red-pink-400 md:text-lg">${exp.name}</h3>
                            <span class="text-xs uppercase tracking-[1px] text-red-pink-700">${exp.place}</span>
                        </div>
                    </div>
                    <ul class="list-inside list-disc p-4 text-sm leading-relaxed text-red-pink-950 md:text-base">
                        ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;

    skillsContainer.innerHTML = `
        <h2 class="mb-5 text-center font-Patua text-lg text-red-pink-600 sm:mb-10 md:text-2xl">Mes compétences</h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            ${skills.map(category => `
                <div class="mb-5">
                    <h3 class="font-Patua text-lg text-red-pink-600">${category.category}</h3>
                    ${category.skills.map(skill => `
                        <div class="w-full border-l-8 border-red-pink-200 bg-gradient-to-br from-red-pink-100 to-red-pink-50 pr-2 shadow-light-default mb-3">
                            <div class="grid grid-cols-[1fr] items-center gap-5 pt-4">
                                <div class="pl-4">
                                    <h4 class="font-Patua text-base text-red-pink-400 md:text-lg">${skill.name}</h4>
                                    <p class="text-sm leading-relaxed text-red-pink-950 md:text-base">${skill.description}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `;

    valuesContainer.innerHTML = `
        <h2 class="mb-5 text-center font-Patua text-lg text-red-pink-600 sm:mb-10 md:text-2xl">Mes valeurs</h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            ${values.map(value => `
                <div class="w-full border-l-8 border-red-pink-200 bg-gradient-to-br from-red-pink-100 to-red-pink-50 pr-2 shadow-light-default">
                    <div class="grid grid-cols-[1fr] items-center gap-5 pt-4">
                        <div class="pl-4">
                            <h4 class="font-Patua text-base text-red-pink-400 md:text-lg">${value.name}</h4>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
});
