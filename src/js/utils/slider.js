import { ProjectApi } from '../api/api.js';

const projectApi = new ProjectApi('../src/data/projects.json');

export async function loadSliderImages() {
    const sliderContainer = document.querySelector('#slider');
    const counter = document.querySelector('#counter');
    let autoSlideInterval;

    try {
        const data = await projectApi.get();

        if (!data || !data.projects) {
            throw new Error("Erreur: Les projets ne sont pas définis dans le fichier JSON.");
        }

        const totalSlides = data.projects.length;

        // Génération du HTML avec les images et liens
        sliderContainer.innerHTML = `
            <a href="../${data.projects[totalSlides - 1].link}" class="w-full h-full flex-shrink-0">
                <img src="../${data.projects[totalSlides - 1].image}" class="w-full h-full object-cover" alt="Clone Last Image"/>
            </a>
            ${data.projects.map((project) => `
                <a href="../${project.link}" class="w-full h-full flex-shrink-0">
                    <img src="../${project.image}" class="w-full h-full object-cover" alt="Slide ${project.title}" />
                </a>
            `).join('')}
            <a href="../${data.projects[0].link}" class="w-full h-full flex-shrink-0">
                <img src="../${data.projects[0].image}" class="w-full h-full object-cover" alt="Clone First Image"/>
            </a>
        `;

        let currentIndex = 1;
        counter.textContent = `1 / ${totalSlides}`;

        function updateSlider(instant = false) {
            sliderContainer.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
            sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            counter.textContent = `${(currentIndex - 1 + totalSlides) % totalSlides + 1} / ${totalSlides}`;
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % (totalSlides + 2);
                updateSlider();
            }, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        sliderContainer.addEventListener('transitionend', () => {
            if (currentIndex === 0) {
                sliderContainer.style.transition = "none";
                currentIndex = totalSlides;
                sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            } else if (currentIndex === totalSlides + 1) {
                sliderContainer.style.transition = "none";
                currentIndex = 1;
                sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        });

        document.querySelector('#prev').addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = (currentIndex - 1 + totalSlides + 2) % (totalSlides + 2);
            updateSlider();
            startAutoSlide();
        });

        document.querySelector('#next').addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = (currentIndex + 1) % (totalSlides + 2);
            updateSlider();
            startAutoSlide();
        });

        updateSlider();
        startAutoSlide();

    } catch (error) {
        console.error("Erreur lors du chargement des images :", error);
    }
}

document.addEventListener('DOMContentLoaded', loadSliderImages);
