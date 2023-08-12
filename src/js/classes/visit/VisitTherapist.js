import Visit from "./Visit.js";
class VisitTherapist extends Visit {
  constructor(fullName, title, description, urgencyLevel, age) {
    super(fullName, "Therapist", title, description, urgencyLevel);
    this.age = age;
  }

  renderAdditionalInfo() {
    return `
        <p class="card-text">Age: ${this.age}</p>
      `;
  }
}

export default VisitTherapist;
