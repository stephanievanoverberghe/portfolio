import { Project } from '../models/Project.js';
import { Course, Experience, Skill, Value } from '../models/About.js';

class Api {
    /**
     * Create an Api instance.
     * @param {string} url - The URL of the API.
     */
    constructor(url) {
        this._url = url;
    }

    async get() {
        return fetch(this._url)
            .then(response => response.json())
            .catch(error => {
                console.log('an error occurs', error);
                return null;
            });
    }
}

class ProjectApi extends Api {
    /**
     * Create a ProjectApi instance.
     * @param {string} url - The URL of the Project API.
     */
    constructor(url) {
        super(url);
    }

    async getProjects() {
        const data = await this.get();
        return data ? data.projects.map(project => new Project(project)) : [];
    }

    async getProjectById(id) {
        const data = await this.get();
        const project = data ? data.projects.find(project => project.id == id) : null;
        return project ? new Project(project) : null;
    }
}

class AboutApi extends Api {
    constructor(url) {
        super(url);
    }

    async getAboutData() {
        const data = await this.get();
        if (data) {
            const courses = data.courses.map(course => new Course(course));
            const experiences = data.experiences.map(exp => new Experience(exp));
            const skills = data.skills;
            const values = data.values.map(value => new Value(value));
            return { courses, experiences, skills, values };
        }
        return { courses: [], experiences: [], skills: [], values: [] };
    }
}

export { Api, ProjectApi, AboutApi };
