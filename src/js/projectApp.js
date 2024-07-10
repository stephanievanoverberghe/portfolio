import { ProjectApi } from './api/api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const projectApi = new ProjectApi('../src/data/projects.json');
    const projects = await projectApi.getProjects();

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    const project = projects.find(p => p.id === parseInt(projectId));

    if (project) {
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-link').href = project.details.liveLink;
        document.getElementById('project-hero-image').src = `../${project.image}`;
        document.getElementById('project-image').src = `../${project.image}`;

        const objectiveContainer = document.getElementById('project-objective');
        project.details.objective.split('\n').forEach(obj => {
            const p = document.createElement('p');
            p.textContent = obj;
            objectiveContainer.appendChild(p);
        });

        const functionalitiesContainer = document.getElementById('project-functionalities');
        project.details.functionalities.forEach(func => {
            const article = document.createElement('article');
            article.className = 'rounded-lg bg-gradient-to-br from-red-pink-100 to-red-pink-50 p-5 shadow-light-default';
            const h4 = document.createElement('h4');
            h4.className = 'mb-3 font-Patua text-sm text-red-pink-700 lg:text-base';
            h4.textContent = func.title;
            article.appendChild(h4);
            const ul = document.createElement('ul');
            ul.className = 'my-3 text-sm leading-relaxed md:text-base';
            func.features.forEach(feature => {
                const li = document.createElement('li');
                const span = document.createElement('span');
                span.className = 'font-bold';
                span.textContent = feature.split(': ')[0] + ': ';
                li.appendChild(span);
                li.appendChild(document.createTextNode(feature.split(': ')[1]));
                ul.appendChild(li);
            });
            article.appendChild(ul);
            functionalitiesContainer.appendChild(article);
        });

        const toolsContainer = document.getElementById('project-tools');
        project.details.tools.forEach(tool => {
            const div = document.createElement('div');
            const span = document.createElement('span');
            span.className = 'text-xs font-semibold uppercase tracking-[1px] text-red-pink-900 md:text-sm';
            span.textContent = tool.category;
            div.appendChild(span);
            const divBtns = document.createElement('div');
            divBtns.className = 'mb-5 mt-4 flex gap-2 sm:mb-6 md:gap-3';
            tool.items.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'group flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-red-pink-100 to-red-pink-50 shadow-light-default transition-transform duration-300 ease-in-out hover:scale-95 hover:shadow-light-pressed md:h-16 md:w-16';
                const img = document.createElement('img');
                img.className = 'h-6 w-6 transition-transform duration-300 group-hover:scale-90 md:h-9 md:w-9';
                img.src = `../${item.image}`;
                img.alt = item.name;
                btn.appendChild(img);
                divBtns.appendChild(btn);
            });
            div.appendChild(divBtns);
            toolsContainer.appendChild(div);
        });

        const processContainer = document.getElementById('project-process');
        project.details.process.forEach(proc => {
            const article = document.createElement('article');
            article.className = 'grid grid-cols-[50px_auto] items-center rounded-lg bg-gradient-to-br from-red-pink-100 to-red-pink-50 p-5 shadow-light-default';
            const i = document.createElement('i');
            i.className = `fa-solid fa-${proc.icon} fa-lg md:fa-xl`;
            article.appendChild(i);
            const div = document.createElement('div');
            div.className = 'items-center text-red-pink-600';
            const h3 = document.createElement('h3');
            h3.className = 'font-Patua text-base md:text-lg';
            h3.textContent = proc.title;
            div.appendChild(h3);
            const ul = document.createElement('ul');
            ul.className = 'my-3 text-sm leading-relaxed text-red-pink-800 md:text-base';
            proc.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                ul.appendChild(li);
            });
            div.appendChild(ul);
            article.appendChild(div);
            processContainer.appendChild(article);
        });

        const otherProjectsContainer = document.getElementById('other-projects');
        projects.filter(p => p.id !== project.id).forEach(otherProject => {
            const a = document.createElement('a');
            a.href = `project.html?id=${otherProject.id}`;
            const article = document.createElement('article');
            article.className = 'group relative flex h-96 flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br from-red-pink-100 to-red-pink-50 shadow-light-default';
            const divImg = document.createElement('div');
            divImg.className = 'relative h-full overflow-hidden rounded-lg';
            const img = document.createElement('img');
            img.src = `../${otherProject.image}`;
            img.alt = otherProject.title;
            img.className = 'h-full w-full object-cover';
            divImg.appendChild(img);
            const divOverlay = document.createElement('div');
            divOverlay.className = 'absolute inset-0 bg-red-pink-300 opacity-25';
            divImg.appendChild(divOverlay);
            article.appendChild(divImg);
            const divContent = document.createElement('div');
            divContent.className = 'absolute inset-0 flex flex-col justify-between lg:translate-y-full lg:transform lg:transition-transform lg:duration-500 lg:group-hover:translate-y-0';
            const divTitle = document.createElement('div');
            divTitle.className = 'flex h-32 items-center justify-center rounded-t-lg';
            const divTitleContent = document.createElement('div');
            divTitleContent.className = 'rounded-lg bg-red-pink-50';
            const h3 = document.createElement('h3');
            h3.className = 'p-5 font-Patua text-base md:text-lg';
            h3.textContent = otherProject.title;
            divTitleContent.appendChild(h3);
            divTitle.appendChild(divTitleContent);
            divContent.appendChild(divTitle);
            const divDesc = document.createElement('div');
            divDesc.className = 'rounded-b-lg bg-gradient-to-br from-red-pink-100 to-red-pink-50 p-5 shadow-light-default';
            const h4 = document.createElement('h4');
            h4.className = 'font-Patua text-sm uppercase tracking-[1px] text-red-pink-600 md:text-base';
            h4.textContent = otherProject.category;
            divDesc.appendChild(h4);
            const p = document.createElement('p');
            p.className = 'mb-5 mt-3 text-sm leading-relaxed md:text-base';
            p.textContent = otherProject.description;
            divDesc.appendChild(p);
            const divSkills = document.createElement('div');
            divSkills.className = 'flex gap-4 md:gap-6';
            otherProject.skills.forEach(skill => {
                const divSkill = document.createElement('div');
                divSkill.className = 'group flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-red-pink-100 to-red-pink-50 shadow-light-default transition-transform duration-300 md:h-12 md:w-12 lg:transform lg:hover:scale-95 lg:hover:shadow-light-pressed';
                const imgSkill = document.createElement('img');
                imgSkill.className = 'h-6 w-6 transition-transform duration-300 md:h-9 md:w-9 lg:transform lg:group-hover:scale-90';
                imgSkill.src = `../src/assets/img/${skill}.png`;
                imgSkill.alt = skill;
                divSkill.appendChild(imgSkill);
                divSkills.appendChild(divSkill);
            });
            divDesc.appendChild(divSkills);
            divContent.appendChild(divDesc);
            article.appendChild(divContent);
            a.appendChild(article);
            otherProjectsContainer.appendChild(a);
        });
    } else {
        console.error('Project not found');
    }
});
