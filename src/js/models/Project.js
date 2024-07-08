export class Project {
    /**
     * Create a Project instance.
     * @param {Object} data - The project data.
     */
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.image = data.image;
        this.skills = data.skills;
        this.details = data.details;
        this.link = data.link;
        this.category = data.category;
    }

    getDetails() {
        return {
            introduction: this.details.introduction,
            objective: this.details.objective,
            technologies: this.details.technologies.join(', '),
            duration: this.details.duration,
            role: this.details.role
        };
    }
}
