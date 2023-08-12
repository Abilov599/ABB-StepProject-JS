import Visit from "./Visit.js";
class VisitCardiologist extends Visit {
  constructor(
    fullName,
    title,
    description,
    urgencyLevel,
    bloodPressure,
    bodyMassIndex,
    cardiovascularDiseases,
    age
  ) {
    super(fullName, "Cardiologist", title, description, urgencyLevel);
    this.bloodPressure = bloodPressure;
    this.bodyMassIndex = bodyMassIndex;
    this.cardiovascularDiseases = cardiovascularDiseases;
    this.age = age;
  }

  renderAdditionalInfo() {
    return `
        <p class="card-text">Blood Pressure: ${this.bloodPressure}</p>
        <p class="card-text">Body Mass Index: ${this.bodyMassIndex}</p>
        <p class="card-text">Cardiovascular Diseases: ${this.cardiovascularDiseases}</p>
        <p class="card-text">Age: ${this.age}</p>
      `;
  }
}

export default VisitCardiologist;
