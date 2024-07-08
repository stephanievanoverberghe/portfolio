class Course {
    constructor(data) {
        this.start = data.start;
        this.end = data.end;
        this.name = data.name;
        this.place = data.place;
        this.skills = data.skills;
    }
}

class Experience {
    constructor(data) {
        this.start = data.start;
        this.end = data.end;
        this.name = data.name;
        this.place = data.place;
        this.responsibilities = data.responsibilities;
    }
}

class Skill {
    constructor(data) {
        this.category = data.category;
        this.skills = data.skills;
    }
}

class Value {
    constructor(data) {
        this.name = data.name;
    }
}

export { Course, Experience, Skill, Value };
